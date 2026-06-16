import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from '../config/env.js';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

// Primary model: gemini-3.5-flash works with the user's current API key and quota setup.
const GEMINI_MODEL_NAME = 'gemini-3.5-flash';
const geminiModel = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });

export { genAI, geminiModel };
