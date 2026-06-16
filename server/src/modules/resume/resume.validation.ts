import { z } from 'zod';

const allowedFormats = ['row', 'column2', 'minimalist', 'corporate', 'analyst', 'showcase'] as const;

export const saveResumeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  title: z.string().optional(),
  format: z.enum(allowedFormats, {
    message: `Format must be one of: ${allowedFormats.join(', ')}`
  }),
  resumeData: z.object({
    personalInfo: z.object({
      name: z.string().default(''),
      email: z.string().default(''),
      phone: z.string().default(''),
      location: z.string().default(''),
      links: z.string().default(''),
      summary: z.string().default(''),
      photo: z.string().default('')
    }),
    skills: z.array(z.string()).default([]),
    experience: z.array(z.object({
      role: z.string().default(''),
      company: z.string().default(''),
      duration: z.string().default(''),
      description: z.string().default('')
    })).default([]),
    education: z.array(z.object({
      degree: z.string().default(''),
      school: z.string().default(''),
      year: z.string().default('')
    })).default([]),
    projects: z.array(z.object({
      title: z.string().default(''),
      link: z.string().default(''),
      description: z.string().default('')
    })).default([]),
    achievements: z.array(z.object({
      title: z.string().default(''),
      description: z.string().default('')
    })).default([]),
    certifications: z.array(z.string()).default([])
  }),
  pdfData: z.string()
    .min(1, 'PDF base64 data is required')
    .refine(
      (val) => val.startsWith('data:application/pdf;base64,'),
      { message: 'Invalid PDF format. Must be a base64 encoded PDF.' }
    )
    .refine(
      (val) => val.length <= 7000000, // ~5MB
      { message: 'PDF size exceeds the 5MB limit.' }
    )
});
