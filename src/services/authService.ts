import { getErrorMessage } from '../utils/errorUtils';
import { API_BASE_URL } from '../config';
import { UserResponse } from '../types';

const BASE_URL = API_BASE_URL;


export const loginUser = async (email: string, password: string): Promise<UserResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Login failed');
    }
    return resData.data.user;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const signupUser = async (name: string, email: string, password: string): Promise<UserResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Signup failed');
    }
    return resData.data.user;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const googleAuthUser = async (token: string): Promise<UserResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ token }),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Google sign-in failed');
    }
    return resData.data.user;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Logout failed');
    }
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const checkSession = async (): Promise<UserResponse | null> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Session invalid');
    }
    return resData.data.user;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const requestPasswordResetOtp = async (email: string): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Failed to send verification code');
    }
    return resData.message;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const verifyPasswordResetOtp = async (email: string, otp: string): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Invalid verification code');
    }
    return resData.message;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const resetPasswordWithOtp = async (
  email: string,
  otp: string,
  newPassword: string
): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Failed to reset password');
    }
    return resData.message;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
