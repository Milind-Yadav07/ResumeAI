import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import * as authService from '../services/auth.service.js';
import User, { IUser } from '../models/user.model.js';
import { env } from '../config/env.js';
import { getCache, setCache } from '../utils/cache.js';

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    throw new ApiError(401, 'Not authorized, no session token found');
  }

  let decoded: { userId: string; tokenType: string } | null = null;

  if (accessToken) {
    try {
      decoded = authService.verifyToken(accessToken) as { userId: string; tokenType: string };
      if (decoded.tokenType !== 'access') {
        decoded = null;
        accessToken = undefined;
      }
    } catch {
      // Access token expired or invalid, will attempt refresh below
      accessToken = undefined;
    }
  }

  // If access token is expired/missing but refresh token is present
  if (!accessToken && refreshToken) {
    try {
      decoded = authService.verifyToken(refreshToken) as { userId: string; tokenType: string };
      if (decoded.tokenType === 'refresh') {
        // Issue a new access token
        const newAccessToken = authService.generateAccessToken(decoded.userId);
        res.cookie('accessToken', newAccessToken, {
          httpOnly: true,
          secure: env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000 // 15 mins
        });
      } else {
        decoded = null;
      }
    } catch {
      throw new ApiError(401, 'Session expired, please log in again.');
    }
  }

  if (!decoded) {
    throw new ApiError(401, 'Not authorized, invalid session.');
  }

  const cacheKey = `user:${decoded.userId}`;
  let user = getCache<IUser>(cacheKey);

  if (!user) {
    user = await User.findById(decoded.userId).select('-password');
    if (user) {
      setCache(cacheKey, user, 60 * 1000); // 1 minute TTL
    }
  }

  if (!user) {
    throw new ApiError(401, 'Not authorized, user not found');
  }

  req.user = user;
  next();
});

export const optionalProtect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    return next();
  }

  let decoded: { userId: string; tokenType: string } | null = null;

  if (accessToken) {
    try {
      decoded = authService.verifyToken(accessToken) as { userId: string; tokenType: string };
      if (decoded.tokenType !== 'access') {
        decoded = null;
        accessToken = undefined;
      }
    } catch {
      accessToken = undefined;
    }
  }

  // If access token is expired/missing but refresh token is present
  if (!accessToken && refreshToken) {
    try {
      decoded = authService.verifyToken(refreshToken) as { userId: string; tokenType: string };
      if (decoded.tokenType === 'refresh') {
        // Issue a new access token
        const newAccessToken = authService.generateAccessToken(decoded.userId);
        res.cookie('accessToken', newAccessToken, {
          httpOnly: true,
          secure: env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000 // 15 mins
        });
      } else {
        decoded = null;
      }
    } catch {
      // Do not throw error here, just leave decoded as null
    }
  }

  if (!decoded) {
    return next();
  }

  const cacheKey = `user:${decoded.userId}`;
  let user = getCache<IUser>(cacheKey);

  if (!user) {
    user = await User.findById(decoded.userId).select('-password');
    if (user) {
      setCache(cacheKey, user, 60 * 1000); // 1 minute TTL
    }
  }

  if (user) {
    req.user = user;
  }
  next();
});
