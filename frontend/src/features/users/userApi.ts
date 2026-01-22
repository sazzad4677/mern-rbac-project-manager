import { api } from "../../lib/axios"
import { User, PaginatedUsersResponse, UserRole, UserStatus } from "./userTypes"

// Fetch all users
export const fetchUsersAPI = async (): Promise<User[]> => {
    const response = await api.get<PaginatedUsersResponse>("/users")
    return response.data.data.users
}

// Update user role
export const updateUserRoleAPI = async (userId: string, role: UserRole): Promise<User> => {
    const response = await api.patch<{ data: User }>(`/users/${userId}/role`, { role })
    return response.data.data
}

// Update user status
export const updateUserStatusAPI = async (userId: string, status: UserStatus): Promise<User> => {
    const response = await api.patch<{ data: User }>(`/users/${userId}/status`, { status })
    return response.data.data
}