import { z } from 'zod';
import { ProjectStatus } from '../types';

export const createProjectSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Project Name is required'),
        description: z.string().optional(),
    }),
});

export const updateProjectSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.enum([ProjectStatus.ACTIVE, ProjectStatus.ARCHIVED, ProjectStatus.DELETED]).optional(),
    }),
});
