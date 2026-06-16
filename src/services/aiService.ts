import { API_BASE_URL } from '../config';
import { ATSAnalysisResult } from '../types';

const BASE_URL = API_BASE_URL;

/**
 * Request AI improved resume summary from backend.
 */
export const getAISummary = async (currentText: string): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/ai/summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ text: currentText }),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Failed to generate AI summary');
    }
    return resData.data.summary;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Failed to connect to AI summary service.');
  }
};


/**
 * Request ATS scoring analysis from backend.
 * On network/server failure, returns an error-state result so the UI
 * can display a graceful fallback instead of crashing.
 */
export const checkATSScore = async (jd: string, resumeText: string): Promise<ATSAnalysisResult> => {
  try {
    const response = await fetch(`${BASE_URL}/ai/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ jd, resumeText }),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || 'Failed to analyze ATS score');
    }
    return resData.data as ATSAnalysisResult;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to connect to AI service.';
    return {
      matchPercentage: 0,
      matchLevel: 'Error',
      matchDescription: 'Analysis failed.',
      foundKeywords: [],
      missingKeywords: [],
      quickTips: [{ type: 'warning', text: message }]
    };
  }
};
