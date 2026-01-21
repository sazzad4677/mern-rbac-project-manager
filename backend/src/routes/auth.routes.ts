import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { loginSchema, inviteSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/invite', validateRequest(inviteSchema), authController.invite);
router.post('/register-via-invite', validateRequest(registerSchema), authController.registerViaInvite);

export const authRouter = router;
