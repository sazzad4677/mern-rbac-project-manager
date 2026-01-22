import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync';
import { User } from '../models/user.model';
import { env } from '../env';
import { UserRole } from '../types';

export const protect = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    // Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      [, token] = req.headers.authorization.split(' ');
    }

    if (!token) {
      next(new AppError('Please log in to get access', 401));
      return;
    }

    // Verification token
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      next(
        new AppError(
          'The user belonging to this token no longer does exist.',
          401,
        ),
      );
      return;
    }

    //  Check if user is INACTIVE
    if (currentUser.status === 'INACTIVE') {
      next(
        new AppError('Your account is inactive. Please contact support.', 401),
      );
      return;
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  },
);

// Removed the { return ... } wrapper around the outer function
export const restrictTo = (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      next(new AppError('You do not have permission to perform this action', 403));
      return;
    }

    next();
  };