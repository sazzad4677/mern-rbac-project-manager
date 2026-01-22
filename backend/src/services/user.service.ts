import { User } from '../models/user.model';
import { UserRole, UserStatus, AuditAction, AuditTargetType } from '../types';
import { AppError } from '../utils/AppError';
import * as auditService from './audit.service';

export const getAllUsers = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const users = await User.find().select('-password').skip(skip).limit(limit);
  const total = await User.countDocuments();

  return { users, total, page, limit };
};

export const updateUserRole = async (
  userId: string,
  role: UserRole,
  adminId: string,
) => {
  // Get old role for details
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const oldRole = user.role;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true },
  );

  // Capture Audit Log
  await auditService.logAction(
    adminId,
    AuditAction.ROLE_UPDATED,
    AuditTargetType.USER,
    userId,
    {
      oldRole,
      newRole: role,
    },
  );

  return updatedUser;
};

export const updateUserStatus = async (userId: string, status: UserStatus) => {
  const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};
