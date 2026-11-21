import User, { IUser } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import mongoose from 'mongoose';
import { clearCache } from '../utils/cache.js';

/** Minimum bcrypt rounds for password hashing */
const BCRYPT_SALT_ROUNDS = 10;

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
}

/**
 * Find a user by their email address.
 * @param {string} email
 * @param {boolean} withPassword - Set to true to include hashed password (for login)
 * @returns {Promise<IUser|null>}
 */
export const findUserByEmail = async (email: string, withPassword = false): Promise<IUser | null> => {
  const query = User.findOne({ email: email.toLowerCase() });
  if (withPassword) {
    query.select('+password');
  }
  return await query;
};

/**
 * Create a new user in the database.
 * @param {CreateUserData} userData
 * @returns {Promise<IUser>}
 */
export const createUser = async (userData: CreateUserData): Promise<IUser> => {
  const newUser = new User({
    name: userData.name,
    email: userData.email.toLowerCase(),
    password: userData.password,
  });
  return await newUser.save();
};

/**
 * Find a user by their ID.
 * @param {string} id
 * @returns {Promise<IUser|null>}
 */
export const findUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

/**
 * Update a user by their ID.
 * @param {string} id
 * @param {UpdateUserData} userData
 * @returns {Promise<IUser|null>}
 */
export const updateUser = async (id: string, userData: UpdateUserData): Promise<IUser | null> => {
  clearCache(`user:${id}`);
  return await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
};

/**
 * Delete a user by their ID.
 * @param {string} id
 * @returns {Promise<{ deletedCount?: number }>}
 */
export const deleteUser = async (id: string): Promise<{ deletedCount?: number }> => {
  clearCache(`user:${id}`);
  return await User.deleteOne({ _id: id });
};

/**
 * Hash a plain text password.
 * @param {string} plainPassword
 * @returns {Promise<string>}
 */
export const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  return await bcrypt.hash(plainPassword, salt);
};

/**
 * Compare a plain text password with a hashed password.
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Generate a JWT token for a user.
 * @param {string} userId
 * @returns {string}
 */
export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
  );
};

/**
 * Generate a short-lived access token for a user.
 * @param {string} userId
 * @returns {string}
 */
export const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    { userId, tokenType: 'access' },
    env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

/**
 * Generate a long-lived refresh token for a user.
 * @param {string} userId
 * @returns {string}
 */
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId, tokenType: 'refresh' },
    env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export interface GoogleUserPayload {
  googleId: string;
  email: string;
  name: string;
}

/**
 * Verify a Google OAuth 2.0 access token or ID token against Google's official endpoints
 * and validate the audience (GOOGLE_CLIENT_ID).
 */
export const verifyGoogleToken = async (token: string): Promise<GoogleUserPayload> => {
  // 1. Check if it's a JWT ID token (3 dot-separated segments) or an OAuth2 access token
  const isJwtIdToken = token.split('.').length === 3;

  if (isJwtIdToken) {
    const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`);
    if (!res.ok) {
      throw new Error('Invalid Google ID token');
    }
    const data = (await res.json()) as {
      aud?: string;
      sub?: string;
      email?: string;
      email_verified?: string | boolean;
      name?: string;
    };

    if (data.aud !== env.GOOGLE_CLIENT_ID) {
      throw new Error('Google token audience mismatch');
    }
    if (!data.sub || !data.email || (data.email_verified !== 'true' && data.email_verified !== true)) {
      throw new Error('Google account email is not verified');
    }

    return {
      googleId: data.sub,
      email: data.email.toLowerCase(),
      name: data.name || data.email.split('@')[0],
    };
  }

  // 2. Otherwise verify OAuth2 access_token audience + fetch user profile
  const [tokenInfoRes, userInfoRes] = await Promise.all([
    fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${encodeURIComponent(token)}`),
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  if (!tokenInfoRes.ok || !userInfoRes.ok) {
    throw new Error('Invalid or expired Google access token');
  }

  const tokenInfo = (await tokenInfoRes.json()) as { aud?: string; azp?: string };
  if (tokenInfo.aud !== env.GOOGLE_CLIENT_ID && tokenInfo.azp !== env.GOOGLE_CLIENT_ID) {
    throw new Error('Google token audience mismatch');
  }

  const userInfo = (await userInfoRes.json()) as {
    sub?: string;
    email?: string;
    email_verified?: boolean;
    name?: string;
  };

  if (!userInfo.sub || !userInfo.email || !userInfo.email_verified) {
    throw new Error('Google account email is not verified');
  }

  return {
    googleId: userInfo.sub,
    email: userInfo.email.toLowerCase(),
    name: userInfo.name || userInfo.email.split('@')[0],
  };
};

/**
 * Find an existing user by email/googleId (linking Google if needed) or create a new Google user.
 */
export const findOrCreateGoogleUser = async (payload: GoogleUserPayload): Promise<IUser> => {
  let user = await User.findOne({
    $or: [{ googleId: payload.googleId }, { email: payload.email.toLowerCase() }],
  });

  if (user) {
    if (!user.googleId) {
      user.googleId = payload.googleId;
      await user.save();
      clearCache(`user:${user._id}`);
    }
    return user;
  }

  user = new User({
    name: payload.name,
    email: payload.email.toLowerCase(),
    googleId: payload.googleId,
    authProvider: 'google',
  });

  return await user.save();
};

/**
 * Verify a JWT token and return the decoded payload.
 * @param {string} token
 * @returns {jwt.JwtPayload | string}
 */
export const verifyToken = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, env.JWT_SECRET);
};
