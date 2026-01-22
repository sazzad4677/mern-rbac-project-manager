import { Router } from 'express';
import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';
import { projectRouter } from './project.routes';
import { dashboardRouter } from './dashboard.routes';
import { apiLimiter } from '../middlewares/rateLimit.middleware';

const router = Router();

const moduleRoutes = [
  { path: '/auth', route: authRouter },
  { path: '/users', route: userRouter },
  { path: '/projects', route: projectRouter },
  { path: '/dashboard', route: dashboardRouter },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, apiLimiter, route.route);
});

export default router;
