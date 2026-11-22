import { Router } from 'express';
import {
  signup,
  login,
  googleAuth,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  getMe,
  logout,
} from '../controllers/auth.controller.js';
import validate from '../middleware/validate.middleware.js';
import {
  signupSchema,
  loginSchema,
  googleAuthSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
} from '../modules/auth/auth.validation.js';
import { protect, optionalProtect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/google', validate(googleAuthSchema), googleAuth);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/verify-otp', validate(verifyOtpSchema), verifyResetOtp);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);
router.post('/logout', logout);
router.get('/me', optionalProtect, getMe);

export default router;
