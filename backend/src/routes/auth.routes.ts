import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import {
  loginSchema,
  inviteSchema,
  registerSchema,
} from '../schemas/auth.schema';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { UserRole } from '../types';
import { authLimiter } from '../middlewares/rateLimit.middleware';

const router = Router();

router.post(
  '/login',
  authLimiter,
  validateRequest(loginSchema),
  authController.login,
);
router.post(
  '/invite',
  authLimiter,
  protect,
  restrictTo(UserRole.ADMIN),
  validateRequest(inviteSchema),
  authController.invite,
);
router.post(
  '/register-via-invite',
  authLimiter,
  validateRequest(registerSchema),
  authController.registerViaInvite,
);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

export const authRouter = router;
