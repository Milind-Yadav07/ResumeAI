import { Request, Response } from 'express';
import * as authService from '../services/auth.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { env } from '../config/env.js';
import { sendPasswordResetOtpEmail } from '../utils/email.js';
import { clearCache } from '../utils/cache.js';

// Named constants
const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const MAX_OTP_ATTEMPTS = 5;

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

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await authService.findUserWithResetOtp(email);
  if (!user) {
    throw new ApiError(404, 'No account found with that email address.');
  }

  const otp = authService.generateOtp();
  user.resetPasswordOtp = authService.hashOtp(otp);
  user.resetPasswordExpires = new Date(Date.now() + OTP_EXPIRY_MS);
  user.resetOtpAttempts = 0;
  await user.save();

  await sendPasswordResetOtpEmail(user.email, user.name, otp);

  new ApiResponse(200, null, 'A 6-digit verification code has been sent to your email.').send(res);
});

export const verifyResetOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const user = await authService.findUserWithResetOtp(email);
  if (!user || !user.resetPasswordOtp || !user.resetPasswordExpires) {
    throw new ApiError(400, 'No active reset code found. Please request a new OTP.');
  }

  if (user.resetPasswordExpires.getTime() < Date.now()) {
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpires = undefined;
    user.resetOtpAttempts = 0;
    await user.save();
    throw new ApiError(400, 'OTP has expired. Please request a new code.');
  }

  if ((user.resetOtpAttempts || 0) >= MAX_OTP_ATTEMPTS) {
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpires = undefined;
    user.resetOtpAttempts = 0;
    await user.save();
    throw new ApiError(429, 'Too many failed attempts. Please request a new OTP.');
  }

  const hashedInput = authService.hashOtp(otp);
  if (hashedInput !== user.resetPasswordOtp) {
    user.resetOtpAttempts = (user.resetOtpAttempts || 0) + 1;
    await user.save();
    const remaining = MAX_OTP_ATTEMPTS - user.resetOtpAttempts;
    throw new ApiError(
      400,
      remaining > 0
        ? `Invalid OTP code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
        : 'Too many failed attempts. Please request a new OTP.'
    );
  }

  new ApiResponse(200, null, 'OTP verified successfully.').send(res);
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;

  const user = await authService.findUserWithResetOtp(email);
  if (!user || !user.resetPasswordOtp || !user.resetPasswordExpires) {
    throw new ApiError(400, 'Reset session expired. Please request a new OTP.');
  }

  if (user.resetPasswordExpires.getTime() < Date.now()) {
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpires = undefined;
    user.resetOtpAttempts = 0;
    await user.save();
    throw new ApiError(400, 'OTP has expired. Please request a new code.');
  }

  if ((user.resetOtpAttempts || 0) >= MAX_OTP_ATTEMPTS) {
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpires = undefined;
    user.resetOtpAttempts = 0;
    await user.save();
    throw new ApiError(429, 'Too many failed attempts. Please request a new OTP.');
  }

  const hashedInput = authService.hashOtp(otp);
  if (hashedInput !== user.resetPasswordOtp) {
    user.resetOtpAttempts = (user.resetOtpAttempts || 0) + 1;
    await user.save();
    throw new ApiError(400, 'Invalid OTP code.');
  }

  user.password = await authService.hashPassword(newPassword);
  user.resetPasswordOtp = undefined;
  user.resetPasswordExpires = undefined;
  user.resetOtpAttempts = 0;
  await user.save();
  clearCache(`user:${user._id}`);

  new ApiResponse(200, null, 'Password has been reset successfully. You can now sign in.').send(res);
});
