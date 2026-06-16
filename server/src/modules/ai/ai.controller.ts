import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse.js';
import * as aiService from './ai.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

/**
 * Handle POST /api/v1/ai/analyze
 * Validates input then delegates to aiService — asyncHandler propagates
 * any thrown errors to the global errorHandler middleware.
 */
export const analyzeResume = asyncHandler(async (req: Request, res: Response) => {
  const { jd, resumeText } = req.body;
  const analysis = await aiService.checkATSScore(jd, resumeText);
  new ApiResponse(200, analysis, 'Resume ATS analysis complete.').send(res);
});

export const generateSummary = asyncHandler(async (req: Request, res: Response) => {
  const { text } = req.body;
  const summary = await aiService.getAISummary(text);
  new ApiResponse(200, { summary }, 'Summary generated successfully.').send(res);
});

/**
 * Handle POST /api/v1/ai/summary/stream
 */
export const generateSummaryStream = asyncHandler(async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ success: false, message: 'Text is required to generate summary.' });
    return;
  }

  // Set Server-Sent Events headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const stream = await aiService.getAISummaryStream(text);
  for await (const chunk of stream) {
    const chunkText = chunk.text();
    res.write(`data: ${JSON.stringify({ chunk: chunkText })}\n\n`);
  }
  res.write('data: [DONE]\n\n');
  res.end();
});

