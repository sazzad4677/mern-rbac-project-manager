import { api } from "../../lib/axios"
import { z } from "zod"

// Types used in API
export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginCredentials = z.infer<typeof loginSchema>

export interface UserResponse {
    _id: string
    name: string
    email: string
    role: string
}

export interface AuthResponse {
    success: boolean
    message: string
    token: string
    data: {
        user: UserResponse
    }
}

// API Functions
export const loginUserAPI = async (data: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data)
    return response.data
}
