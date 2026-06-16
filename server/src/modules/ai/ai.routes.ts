import { Router } from 'express';
import { analyzeResume, generateSummary, generateSummaryStream } from './ai.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import validate from '../../middleware/validate.middleware.js';
import { analyzeResumeSchema, generateSummarySchema } from './ai.validation.js';

const router = Router();

// Routes already wrapped in asyncHandler inside the controllers!
router.post('/analyze', protect, validate(analyzeResumeSchema), analyzeResume);
router.post('/summary', protect, validate(generateSummarySchema), generateSummary);
router.post('/summary/stream', protect, validate(generateSummarySchema), generateSummaryStream);

export default router;

