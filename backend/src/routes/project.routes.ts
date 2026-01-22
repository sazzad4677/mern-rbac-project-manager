import { Router } from 'express';
import * as projectController from '../controllers/project.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schema';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { UserRole } from '../types';

const router = Router();

// Protect all routes
router.use(protect);

router.post(
    '/',
    validateRequest(createProjectSchema),
    projectController.createProject
);

router.get('/', projectController.getAllProjects);

router.patch(
    '/:id',
    restrictTo(UserRole.ADMIN),
    validateRequest(updateProjectSchema),
    projectController.updateProject
);

router.delete(
    '/:id',
    restrictTo(UserRole.ADMIN),
    projectController.deleteProject
);

export const projectRouter = router;
