import { z } from "zod"

export const createProjectSchema = z.object({
    name: z.string().min(3, "Project name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
})

export const updateProjectSchema = z.object({
    name: z.string().min(3, "Project name must be at least 3 characters").optional(),
    description: z.string().min(10, "Description must be at least 10 characters").optional(),
    status: z.enum(["ACTIVE", "ARCHIVED"]).optional(),
})
