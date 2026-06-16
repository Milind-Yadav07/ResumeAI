import { Request, Response } from 'express';
import * as resumeService from '../services/resume.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getResumes = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const resumes = await resumeService.getAllResumesByUser(userId, page, limit);
  new ApiResponse(200, resumes, 'Resumes retrieved successfully.').send(res);
});

export const saveResume = asyncHandler(async (req: Request, res: Response) => {
  const { name, title, format, resumeData, pdfData } = req.body;
  const userId = req.user!._id.toString();
  const userEmail = req.user!.email;

  if (!name || !format || !resumeData || !pdfData) {
    throw new ApiError(400, 'Required fields are missing.');
  }

  const updatedResume = await resumeService.createResume(userId, userEmail, {
    name,
    title,
    format,
    resumeData,
    pdfData,
  });

  new ApiResponse(200, { resume: updatedResume }, 'Resume saved successfully.').send(res);
});

export const deleteResume = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const userId = req.user!._id.toString();
  const deletedResume = await resumeService.deleteResume(id, userId);

  if (!deletedResume) {
    throw new ApiError(404, 'Resume not found or you are not authorized.');
  }

  new ApiResponse(200, null, 'Resume deleted successfully.').send(res);
});

export const getResumePdf = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const resume = await resumeService.getResumePdfById(
    id,
    req.user!._id.toString()
  );
  if (!resume) {
    throw new ApiError(404, 'Resume not found');
  }
  new ApiResponse(200, resume, 'PDF data fetched.').send(res);
});
