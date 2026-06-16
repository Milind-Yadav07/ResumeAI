import { geminiModel } from '../../lib/gemini.js';
import logger from '../../utils/logger.js';
import { SUMMARY_PROMPT, ATS_PROMPT } from '../../constants/prompts.js';
import { GenerateContentResult } from '@google/generative-ai';
import { ApiError } from '../../utils/apiError.js';

/** Timeout (ms) for all Gemini API calls — 30s to handle complex ATS prompts */
const AI_TIMEOUT_MS = 30_000;

/**
 * Wraps a promise with a timeout. If the promise does not resolve within
 * `ms` milliseconds, it rejects with an ApiError.
 */
const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new ApiError(504, `AI request timed out after ${ms / 1000}s. Please try again.`)), ms)
  );
  return Promise.race([promise, timeout]);
};

/**
 * Maps a raw GoogleGenerativeAI error to an ApiError with the correct
 * HTTP status code, so the global error handler responds properly instead
 * of always returning 500.
 */
const handleGeminiError = (err: unknown): never => {
  if (err instanceof ApiError) {
    throw err;
  }
  if (err instanceof Error) {
    const msg = err.message;
    // 503 — model overloaded / high demand
    if (msg.includes('503') || msg.toLowerCase().includes('service unavailable') || msg.toLowerCase().includes('high demand')) {
      throw new ApiError(503, 'The AI service is currently overloaded. Please try again in a moment.');
    }
    // 404 — model name wrong or deprecated for this API version
    if (msg.includes('404') || msg.toLowerCase().includes('not found')) {
      throw new ApiError(502, 'AI model configuration error. Please contact support.');
    }
    // 429 — quota / rate limit exceeded
    if (msg.includes('429') || msg.toLowerCase().includes('quota') || msg.toLowerCase().includes('rate limit')) {
      throw new ApiError(429, 'AI request quota exceeded. Please try again later.');
    }
    // 400/401/403 — bad request or auth issue
    if (msg.includes('400') || msg.includes('401') || msg.includes('403')) {
      throw new ApiError(502, 'AI service authentication error. Please contact support.');
    }
    // Generic upstream error
    throw new ApiError(502, `AI service error: ${msg}`);
  }
  throw new ApiError(500, 'An unexpected error occurred while contacting the AI service.');
};

/**
 * Rewrite a resume summary using Gemini AI.
 * @param {string} currentText
 * @returns {Promise<string>}
 */
export const getAISummary = async (currentText: string): Promise<string> => {
  const prompt = SUMMARY_PROMPT(currentText);
  try {
    const result: GenerateContentResult = await withTimeout(geminiModel.generateContent(prompt), AI_TIMEOUT_MS);
    return result.response.text();
  } catch (err) {
    logger.error('Gemini getAISummary error:', err);
    return handleGeminiError(err);
  }
};

/**
 * Stream an improved resume summary using Gemini AI.
 */
export const getAISummaryStream = async (currentText: string) => {
  const prompt = SUMMARY_PROMPT(currentText);
  try {
    const result = await geminiModel.generateContentStream(prompt);
    return result.stream;
  } catch (err) {
    logger.error('Gemini getAISummaryStream error:', err);
    return handleGeminiError(err);
  }
};

/**
 * Perform ATS check on resume text against a job description.
 * @param {string} jd
 * @param {string} resumeText
 * @returns {Promise<object>}
 */
export const checkATSScore = async (jd: string, resumeText: string): Promise<Record<string, unknown>> => {
  const prompt = ATS_PROMPT(jd, resumeText);
  let text: string;
  try {
    const result: GenerateContentResult = await withTimeout(geminiModel.generateContent(prompt), AI_TIMEOUT_MS);
    text = result.response.text();
  } catch (err) {
    logger.error('Gemini checkATSScore error:', err);
    return handleGeminiError(err);
  }

  // Strip markdown code fences, then extract the outermost JSON object
  const stripped = text.replace(/```(?:json)?\s*/gi, '').replace(/```/g, '').trim();
  const jsonMatch = stripped.match(/\{[\s\S]*\}/);
  const jsonText = jsonMatch ? jsonMatch[0] : stripped;

  try {
    return JSON.parse(jsonText);
  } catch (e) {
    logger.error("Failed to parse AI response as JSON:", { text });
    throw new ApiError(502, "Failed to parse AI response. Please try again.");
  }
};
