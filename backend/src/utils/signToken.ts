import jwt from 'jsonwebtoken';
import { env } from '../env';

export const signToken = (id: string): string =>
    jwt.sign({ id }, env.JWT_SECRET, {
        expiresIn: '1d',
    });