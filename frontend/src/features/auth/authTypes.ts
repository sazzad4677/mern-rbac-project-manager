import { z } from "zod"
import { loginSchema, registerSchema, inviteSchema } from "./authSchemas"

// Infer Types from Zod
export type LoginCredentials = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type InviteUserPayload = z.infer<typeof inviteSchema>

// API Response Types
export interface UserResponse {
    _id: string
    name: string
    email: string
    role: string
}

export interface AuthResponse {
    success: boolean
    message: string
    data: {
        user: UserResponse
        token: string
    }
}