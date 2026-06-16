import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock external dependencies before importing the module under test
vi.mock('bcryptjs', () => ({
  default: {
    genSalt: vi.fn().mockResolvedValue('mock_salt'),
    hash: vi.fn().mockResolvedValue('hashed_password_123'),
    compare: vi.fn().mockResolvedValue(true),
  }
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn().mockReturnValue('mock.jwt.token'),
    verify: vi.fn().mockReturnValue({ userId: 'user_123' }),
  }
}));

// Mock the env config
vi.mock('../config/env.js', () => ({
  env: {
    JWT_SECRET: 'test_secret_that_is_at_least_32_characters_long',
    JWT_EXPIRES_IN: '7d',
  }
}));

// Mock the user model
vi.mock('../models/user.model.js', () => {
  const mockUser = {
    _id: 'user_123',
    name: 'Test User',
    email: 'test@example.com',
    save: vi.fn().mockResolvedValue({
      _id: 'user_123',
      name: 'Test User',
      email: 'test@example.com',
    }),
  };

  const MockUserConstructor = vi.fn().mockImplementation(() => mockUser);
  const mockConstructor = MockUserConstructor as unknown as Record<string, unknown>;
  mockConstructor.findOne = vi.fn();
  mockConstructor.findById = vi.fn();
  mockConstructor.deleteOne = vi.fn();
  mockConstructor.findByIdAndUpdate = vi.fn();

  return { default: MockUserConstructor };
});

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  hashPassword,
  comparePassword,
  generateToken,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '../services/auth.service.js';

// ─── Auth Service ─────────────────────────────────────────────────────────────

describe('auth.service — hashPassword', () => {
  it('should call bcrypt.genSalt and bcrypt.hash', async () => {
    const result = await hashPassword('myPassword123');
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith('myPassword123', 'mock_salt');
    expect(result).toBe('hashed_password_123');
  });
});

describe('auth.service — comparePassword', () => {
  it('should return true when passwords match', async () => {
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
    const result = await comparePassword('plainText', 'hashed');
    expect(result).toBe(true);
  });

  it('should return false when passwords do not match', async () => {
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
    const result = await comparePassword('wrong', 'hashed');
    expect(result).toBe(false);
  });
});

describe('auth.service — generateToken', () => {
  it('should call jwt.sign with the userId and secret', () => {
    const token = generateToken('user_abc');
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 'user_abc' },
      'test_secret_that_is_at_least_32_characters_long',
      { expiresIn: '7d' }
    );
    expect(token).toBe('mock.jwt.token');
  });
});

describe('auth.service — generateAccessToken', () => {
  it('should call jwt.sign with access claim and 15m expiration', () => {
    const token = generateAccessToken('user_abc');
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 'user_abc', tokenType: 'access' },
      'test_secret_that_is_at_least_32_characters_long',
      { expiresIn: '15m' }
    );
    expect(token).toBe('mock.jwt.token');
  });
});

describe('auth.service — generateRefreshToken', () => {
  it('should call jwt.sign with refresh claim and 7d expiration', () => {
    const token = generateRefreshToken('user_abc');
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 'user_abc', tokenType: 'refresh' },
      'test_secret_that_is_at_least_32_characters_long',
      { expiresIn: '7d' }
    );
    expect(token).toBe('mock.jwt.token');
  });
});

describe('auth.service — verifyToken', () => {
  it('should call jwt.verify and return the decoded payload', () => {
    const payload = verifyToken('some.jwt.token');
    expect(jwt.verify).toHaveBeenCalledWith(
      'some.jwt.token',
      'test_secret_that_is_at_least_32_characters_long'
    );
    expect(payload).toEqual({ userId: 'user_123' });
  });

  it('should throw when jwt.verify throws (invalid token)', () => {
    vi.mocked(jwt.verify).mockImplementationOnce(() => {
      throw new Error('invalid signature');
    });
    expect(() => verifyToken('bad.token')).toThrow('invalid signature');
  });
});
