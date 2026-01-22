import { z } from 'zod';
import { UserRole, UserStatus } from '../types';

export const updateRoleSchema = z.object({
    body: z.object({
        role: z.enum([UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF]),
    }),
});

export const updateStatusSchema = z.object({
    body: z.object({
        status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE]),
    }),
});

export const querySchema = z.object({
    query: z.object({
        page: z.string().optional(),
        limit: z.string().optional(),
    }),
});
