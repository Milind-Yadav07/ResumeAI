import { Router } from 'express';
import { getResumes, saveResume, deleteResume, getResumePdf } from '../controllers/resume.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';
import { saveResumeSchema } from '../modules/resume/resume.validation.js';

const router = Router();

router.get('/', protect, getResumes);
router.post('/', protect, validate(saveResumeSchema), saveResume);
router.delete('/:id', protect, deleteResume);
router.get('/:id/pdf', protect, getResumePdf);

export default router;
