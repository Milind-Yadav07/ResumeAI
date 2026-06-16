import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '../utils/apiError.js';

export const ensureDbConnected = (req: Request, res: Response, next: NextFunction) => {
  if (mongoose.connection.readyState !== 1) {
    throw new ApiError(503, 'Database connection is temporarily unavailable. Please try again shortly.');
  }
  next();
};
