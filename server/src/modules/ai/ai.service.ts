import {
  getGeminiModel,
  SUMMARY_MODEL_CHAIN,
  ATS_MODEL_CHAIN,
} from '../../lib/gemini.js';
import logger from '../../utils/logger.js';
import { SUMMARY_PROMPT, ATS_PROMPT } from '../../constants/prompts.js';
import { GenerateContentResult } from '@google/generative-ai';
import { ApiError } from '../../utils/apiError.js';

/** Per-model timeout (ms) before failing over to the next model in the chain */
const SUMMARY_ATTEMPT_TIMEOUT_MS = 15_000;
const ATS_ATTEMPT_TIMEOUT_MS = 25_000;

/**
 * Wraps a promise with a timeout and cleans up the timer upon settlement.
 */
const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new ApiError(504, `AI request timed out after ${ms / 1000}s. Please try again.`)),
      ms
    );
  });
  return Promise.race([promise, timeout]).finally(() => {
    if (timer) clearTimeout(timer);
  });
};

/**
 * Executes a Gemini prompt across an ordered model failover chain.
 * If the primary model times out or returns an upstream capacity/quota error,
 * automatically falls back to the next model in the chain.
 */
const generateWithFallback = async (
  prompt: string,
  modelChain: readonly string[],
  timeoutMs: number
): Promise<GenerateContentResult> => {
  let lastError: unknown;

  for (let i = 0; i < modelChain.length; i++) {
    const modelName = modelChain[i];
    try {
      const model = getGeminiModel(modelName);
      return await withTimeout(model.generateContent(prompt), timeoutMs);
    } catch (err) {
      lastError = err;
      const nextModel = modelChain[i + 1];
      if (nextModel) {
        logger.warn(
          `Gemini model "${modelName}" failed (${err instanceof Error ? err.message : 'unknown error'}). Failing over to "${nextModel}"...`
        );
      } else {
        logger.error(`All Gemini models in chain failed. Last model "${modelName}" error:`, err);
      }
    }
  }

  return handleGeminiError(lastError);
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
  const result = await generateWithFallback(prompt, SUMMARY_MODEL_CHAIN, SUMMARY_ATTEMPT_TIMEOUT_MS);
  return result.response.text();
};

/**
 * Stream an improved resume summary using Gemini AI with model failover.
 */
export const getAISummaryStream = async (currentText: string) => {
  const prompt = SUMMARY_PROMPT(currentText);
  let lastError: unknown;

  for (let i = 0; i < SUMMARY_MODEL_CHAIN.length; i++) {
    const modelName = SUMMARY_MODEL_CHAIN[i];
    try {
      const model = getGeminiModel(modelName);
      const result = await model.generateContentStream(prompt);
      return result.stream;
    } catch (err) {
      lastError = err;
      const nextModel = SUMMARY_MODEL_CHAIN[i + 1];
      if (nextModel) {
        logger.warn(`Gemini stream model "${modelName}" failed. Failing over to "${nextModel}"...`);
      }
    }
  }

  return handleGeminiError(lastError);
};

/**
 * Perform ATS check on resume text against a job description.
 * @param {string} jd
 * @param {string} resumeText
 * @returns {Promise<object>}
 */
export const checkATSScore = async (jd: string, resumeText: string): Promise<Record<string, unknown>> => {
  const prompt = ATS_PROMPT(jd, resumeText);
  const result = await generateWithFallback(prompt, ATS_MODEL_CHAIN, ATS_ATTEMPT_TIMEOUT_MS);
  const text = result.response.text();

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
