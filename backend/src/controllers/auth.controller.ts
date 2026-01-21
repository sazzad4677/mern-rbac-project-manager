import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as authService from '../services/auth.service';
import { sendResponse } from '../utils/sendResponse';

export const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Login successful',
        data: {
            user,
            token,
        },
    });
});

export const invite = catchAsync(async (req: Request, res: Response) => {
    const { email, role } = req.body;
    const token = await authService.createInvite(email, role);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Invite sent successfully',
        data: { token },
    });
});

export const registerViaInvite = catchAsync(async (req: Request, res: Response) => {
    const { token, name, password } = req.body;
    const { user } = await authService.registerUserViaInvite(token, name, password);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User registered successfully',
        data: { user },
    });
});
