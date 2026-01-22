import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import * as dashboardController from '../controllers/dashboard.controller';

const router = Router();

// Protect all dashboard routes
router.use(protect);

router.get('/stats', dashboardController.getDashboardStats);

export const dashboardRouter = router;
