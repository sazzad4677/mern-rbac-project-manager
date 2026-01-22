import jwt from 'jsonwebtoken';
import { env } from '../env';

export const signAccessToken = (id: string): string =>
    jwt.sign({ id }, env.JWT_SECRET, {
        expiresIn: '15m',
    });

export const signRefreshToken = (id: string): string =>
    jwt.sign({ id }, env.REFRESH_TOKEN_SECRET, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as any,
    });