import { Router } from 'express';
import { signup, login, googleAuth, getMe, logout } from '../controllers/auth.controller.js';
import validate from '../middleware/validate.middleware.js';
import { signupSchema, loginSchema, googleAuthSchema } from '../modules/auth/auth.validation.js';
import { protect, optionalProtect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/google', validate(googleAuthSchema), googleAuth);
router.post('/logout', logout);
router.get('/me', optionalProtect, getMe);

export default router;
