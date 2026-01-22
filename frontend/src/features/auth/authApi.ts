import { api } from "../../lib/axios"
import { LoginCredentials, AuthResponse, InviteUserPayload, RegisterInput } from "./authTypes"

// Login
export const loginUserAPI = async (data: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data)
    return response.data
}

// Logout
export const logoutUserAPI = async (): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>("/auth/logout")
    return response.data
}

// Invite
export const inviteUserAPI = async (data: InviteUserPayload): Promise<{ message: string; data: { token: string } }> => {
    const response = await api.post<{ message: string; data: { token: string } }>("/users/invite", data)
    return response.data
}

// Register
export const registerUserAPI = async (data: Omit<RegisterInput, "confirmPassword">): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data)
    return response.data
}