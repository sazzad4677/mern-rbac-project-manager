import { ROLES } from "@/config/roles";
import { z } from "zod"

// --- Login Schema ---
export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

// --- Registration Schema ---
export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    token: z.string().optional(), 
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// --- Invite User Schema ---
export const inviteSchema = z.object({
    email: z.email("Invalid email address"),
    role: z.enum(ROLES), 
})