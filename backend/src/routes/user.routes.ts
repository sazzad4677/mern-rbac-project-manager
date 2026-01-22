import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { UserRole } from '../types';
import { querySchema, updateRoleSchema, updateStatusSchema } from '../schemas/user.schema';

const router = Router();

// Protect all routes
router.use(protect);
router.use(restrictTo(UserRole.ADMIN));

router.get('/', validateRequest(querySchema), userController.getUsers);
router.patch('/:id/role', validateRequest(updateRoleSchema), userController.updateRole);
router.patch('/:id/status', validateRequest(updateStatusSchema), userController.updateStatus);

export const userRouter = router;
