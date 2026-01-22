import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';

export const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
    // Total Users
    const totalUsers = await User.countDocuments();

    // Active Projects
    const activeProjects = await Project.countDocuments({ isDeleted: { $ne: true } });

    // My Role
    const myRole = req.user.role;

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Dashboard stats retrieved successfully',
        data: {
            totalUsers,
            activeProjects,
            myRole,
        },
    });
});
