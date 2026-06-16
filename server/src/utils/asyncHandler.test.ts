import { describe, it, expect, vi } from 'vitest';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { Request, Response, NextFunction } from 'express';

// ─── asyncHandler ─────────────────────────────────────────────────────────────

describe('asyncHandler', () => {
  const mockReq = {} as Request;
  const mockRes = {} as Response;

  it('should call next() with the error when the async function throws', async () => {
    const error = new Error('Test error');
    const mockNext = vi.fn();
    const handler = asyncHandler(async () => { throw error; });

    await handler(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('should not call next() when the async function resolves successfully', async () => {
    const mockNext = vi.fn() as unknown as NextFunction;
    const handler = asyncHandler(async (_req, res) => {
      // successful handler — does not throw
    });

    await handler(mockReq, mockRes, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
  });
});
