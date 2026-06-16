import { Response } from 'express';

class ApiError extends Error {
  statusCode: number;
  success: boolean;
  message: string;
  data: unknown;
  error: unknown;

  constructor(statusCode: number, message: string = "Something went wrong", error: unknown = null, stack: string = "") {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.data = null;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  send(res: Response): Response {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
      error: this.error || null
    });
  }
}

export { ApiError };
