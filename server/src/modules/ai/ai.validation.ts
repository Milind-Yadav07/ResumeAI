import { z } from 'zod';

export const analyzeResumeSchema = z.object({
  jd: z.string().min(1, 'Job description is required.'),
  resumeText: z.string().min(1, 'Resume text is required.')
});

export const generateSummarySchema = z.object({
  text: z.string().min(1, 'Text is required to generate summary.')
});
