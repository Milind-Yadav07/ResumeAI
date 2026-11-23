import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { env } from '../config/env.js';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

// Task-specific model chains with automatic failover:
// 1. Summary enhancement prioritizes low latency (1-2s) via flash-lite, falling back to flash models.
export const SUMMARY_MODEL_CHAIN = [
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
  'gemini-3.5-flash',
] as const;

// 2. ATS full-document analysis prioritizes reasoning depth via flash models, falling back to flash-lite.
export const ATS_MODEL_CHAIN = [
  'gemini-2.5-flash',
  'gemini-3.5-flash',
  'gemini-2.5-flash-lite',
] as const;

export const getGeminiModel = (modelName: string): GenerativeModel =>
  genAI.getGenerativeModel({ model: modelName });

const geminiModel = getGeminiModel(ATS_MODEL_CHAIN[0]);

export { genAI, geminiModel };
