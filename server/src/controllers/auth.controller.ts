import { Request, Response } from 'express';
import * as authService from '../services/auth.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { env } from '../config/env.js';

// Named constants
const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, 'All fields (name, email, password) are required.');
  }

  const existingUser = await authService.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(400, 'Email is already registered.');
  }

  const hashedPassword = await authService.hashPassword(password);

  const newUser = await authService.createUser({
    name,
    email,
    password: hashedPassword,
  });

  const accessToken = authService.generateAccessToken(newUser._id.toString());
  const refreshToken = authService.generateRefreshToken(newUser._id.toString());

  const isProduction = env.NODE_ENV === 'production';
  const cookieSameSite = isProduction ? 'none' : 'strict';

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: cookieSameSite,
    maxAge: 15 * 60 * 1000 // 15 mins
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: cookieSameSite,
    maxAge: COOKIE_MAX_AGE_MS
  });

  new ApiResponse(201, {
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    }
  }, 'Account created successfully.').send(res);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required.');
  }

  const user = await authService.findUserByEmail(email, true);

  if (!user) {
    throw new ApiError(400, 'Invalid email or password.');
  }

  if (!user.password) {
    throw new ApiError(400, 'This account uses Google Sign-In. Please click "Continue with Google".');
  }

  const isMatch = await authService.comparePassword(password, user.password);
  if (!isMatch) {
    throw new ApiError(400, 'Invalid email or password.');
  }

  const accessToken = authService.generateAccessToken(user._id.toString());
  const refreshToken = authService.generateRefreshToken(user._id.toString());

  const isProduction = env.NODE_ENV === 'production';
  const cookieSameSite = isProduction ? 'none' : 'strict';

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: cookieSameSite,
    maxAge: 15 * 60 * 1000 // 15 mins
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: cookieSameSite,
    maxAge: COOKIE_MAX_AGE_MS
  });

  new ApiResponse(200, {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    }
  }, 'Logged in successfully.').send(res);
});

export const googleAuth = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    throw new ApiError(400, 'Google token is required.');
  }

  let googlePayload: authService.GoogleUserPayload;
  try {
    googlePayload = await authService.verifyGoogleToken(token);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Google authentication failed.';
    throw new ApiError(401, message);
  }

  const user = await authService.findOrCreateGoogleUser(googlePayload);

  const accessToken = authService.generateAccessToken(user._id.toString());
  const refreshToken = authService.generateRefreshToken(user._id.toString());

  const isProduction = env.NODE_ENV === 'production';
  const cookieSameSite = isProduction ? 'none' : 'strict';

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: cookieSameSite,
    maxAge: 15 * 60 * 1000 // 15 mins
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: cookieSameSite,
    maxAge: COOKIE_MAX_AGE_MS
  });

  new ApiResponse(200, {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    }
  }, 'Authenticated with Google successfully.').send(res);
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return new ApiResponse(200, { user: null }, 'No active session.').send(res);
  }
  new ApiResponse(200, {
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    }
  }, 'User session is active.').send(res);
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const isProduction = env.NODE_ENV === 'production';
  const cookieSameSite = isProduction ? 'none' : 'strict';

  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: isProduction,
    sameSite: cookieSameSite,
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: isProduction,
    sameSite: cookieSameSite,
  });
  new ApiResponse(200, null, 'Logged out successfully.').send(res);
});
