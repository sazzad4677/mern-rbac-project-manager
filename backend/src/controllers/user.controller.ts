import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import * as userService from '../services/user.service';

export const getUsers = catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '10', 10);

    const result = await userService.getAllUsers(page, limit);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Users retrieved successfully',
        data: result,
    });
});

export const updateRole = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { role } = req.body;

    const user = await userService.updateUserRole(id, role);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User role updated successfully',
        data: user,
    });
});

export const updateStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { status } = req.body;

    const user = await userService.updateUserStatus(id, status);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User status updated successfully',
        data: user,
    });
});
