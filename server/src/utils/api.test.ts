import { describe, it, expect } from 'vitest';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';

// ─── ApiError ────────────────────────────────────────────────────────────────

describe('ApiError', () => {
  it('should set statusCode and message correctly', () => {
    const err = new ApiError(400, 'Bad Request');
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('Bad Request');
    expect(err.success).toBe(false);
  });

  it('should use default message when none is provided', () => {
    const err = new ApiError(500);
    expect(err.message).toBe('Something went wrong');
  });

  it('should be an instance of Error', () => {
    const err = new ApiError(404, 'Not found');
    expect(err).toBeInstanceOf(Error);
  });

  it('should capture stack trace', () => {
    const err = new ApiError(500, 'Server Error');
    expect(err.stack).toBeDefined();
  });

  it('should store additional error context', () => {
    const detail = { field: 'email', reason: 'invalid' };
    const err = new ApiError(422, 'Validation failed', detail);
    expect(err.error).toEqual(detail);
  });
});

// ─── ApiResponse ─────────────────────────────────────────────────────────────

describe('ApiResponse', () => {
  it('should set success = true for 2xx status codes', () => {
    const res = new ApiResponse(200, { name: 'Alice' }, 'OK');
    expect(res.success).toBe(true);
    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual({ name: 'Alice' });
    expect(res.message).toBe('OK');
  });

  it('should set success = false for 4xx status codes', () => {
    const res = new ApiResponse(400, null, 'Bad input');
    expect(res.success).toBe(false);
  });

  it('should use default message "Success" when none is provided', () => {
    const res = new ApiResponse(201, {});
    expect(res.message).toBe('Success');
  });

  it('should set error to null by default', () => {
    const res = new ApiResponse(200, {});
    expect(res.error).toBeNull();
  });
});
