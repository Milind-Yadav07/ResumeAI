import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError.js';
import logger from '../utils/logger.js';
import { env } from '../config/env.js';

interface CustomError extends Error {
  statusCode?: number;
  error?: unknown;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error. Please try again later.";
  let error = err.error || null;

  // If error is not an instance of ApiError, wrap it and mask details in production
  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = env.NODE_ENV === 'production'
      ? "Internal server error. Please try again later."
      : err.message || "Internal server error. Please try again later.";
    error = err.stack || err;
  }

  logger.error('API Error:', err);

  const response: { success: boolean; message: string; data: unknown; error?: unknown; stack?: string } = {
    success: false,
    message,
    data: null,
  };

  // Only show stack and error details in development, NEVER in production
  if (process.env.NODE_ENV === 'development') {
    response.error = error ? (typeof error === 'string' ? error : String(error)) : null;
    response.stack = err.stack;
  } else {
    response.error = null;
  }

  res.status(statusCode).json(response);
};

