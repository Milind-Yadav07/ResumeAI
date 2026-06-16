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
