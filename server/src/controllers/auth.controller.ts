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

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 mins
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
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

  const isMatch = await authService.comparePassword(password, user.password!);
  if (!isMatch) {
    throw new ApiError(400, 'Invalid email or password.');
  }

  const accessToken = authService.generateAccessToken(user._id.toString());
  const refreshToken = authService.generateRefreshToken(user._id.toString());

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 mins
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
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
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  new ApiResponse(200, null, 'Logged out successfully.').send(res);
});
