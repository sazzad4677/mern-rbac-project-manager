import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as authService from '../services/auth.service';
import { sendResponse } from '../utils/sendResponse';
import { AppError } from '../utils/AppError';
import { env } from '../env';

// Private helper to set cookie and send response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendTokenResponse = (user: any, accessToken: string, refreshToken: string, res: Response) => {
    // Set Authorization Header
    res.setHeader('Authorization', `Bearer ${accessToken}`);

    // Set Refresh Token as HTTPOnly Cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    // Send Access Token in JSON
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Login successful',
        data: {
            user,
            token: accessToken,
        },
    });
};

export const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

    sendTokenResponse(user, accessToken, refreshToken, res);
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
    const { user, accessToken, refreshToken } = await authService.registerUserViaInvite(token, name, password);

    sendTokenResponse(user, accessToken, refreshToken, res);
});

export const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken: token } = req.cookies;

    if (!token) {
        throw new AppError('Refresh token not found', 401);
    }

    const { accessToken } = await authService.refreshAccessToken(token);

    // Set Authorization Header
    res.setHeader('Authorization', `Bearer ${accessToken}`);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Token refreshed successfully',
        data: { token: accessToken },
    });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Logged out successfully',
        data: null,
    });
});
