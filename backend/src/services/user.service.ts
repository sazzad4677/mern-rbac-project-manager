import { User } from '../models/user.model';
import { UserRole, UserStatus } from '../types';
import { AppError } from '../utils/AppError';

export const getAllUsers = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const users = await User.find().select('-password').skip(skip).limit(limit);
    const total = await User.countDocuments();

    return { users, total, page, limit };
};

export const updateUserRole = async (userId: string, role: UserRole) => {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
        throw new AppError('User not found', 404);
    }
    return user;
};

export const updateUserStatus = async (userId: string, status: UserStatus) => {
    const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
    if (!user) {
        throw new AppError('User not found', 404);
    }
    return user;
};
