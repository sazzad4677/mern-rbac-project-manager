import { z } from 'zod';

export const loginSchema = z.object({
    body: z.object({
        email: z.email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    }),
});

export const registerSchema = z.object({
    body: z.object({
        token: z.string(),
        name: z.string().min(2, 'Name must be at least 2 characters'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    }),
});

export const inviteSchema = z.object({
    body: z.object({
        email: z.email('Invalid email address'),
        role: z.string().min(1, 'Role is required'),
    }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
