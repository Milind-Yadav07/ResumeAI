import { ResumeData, SavedResume, PaginatedResumes } from '../types';
import { getErrorMessage } from '../utils/errorUtils';
import { API_BASE_URL } from '../config';

const BASE_URL = API_BASE_URL;


/**
 * Fetch the authenticated user's saved resumes.
 * User identity is determined server-side from the httpOnly cookie — no email in query params.
 */
export const fetchResumes = async (page = 1, limit = 20): Promise<PaginatedResumes> => {
  try {
    const response = await fetch(`${BASE_URL}/resumes?page=${page}&limit=${limit}`, {
      credentials: 'include',
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Failed to fetch resumes');
    }
    return resData.data as PaginatedResumes;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const saveResume = async (payload: {
  name: string;
  title: string;
  format: string;
  resumeData: ResumeData;
  pdfData: string;
  userEmail: string;
}): Promise<SavedResume> => {
  try {
    const response = await fetch(`${BASE_URL}/resumes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Failed to save resume');
    }
    return resData.data.resume;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteResume = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/resumes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Failed to delete resume');
    }
    return true;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
