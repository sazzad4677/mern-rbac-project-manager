import { api } from "../../lib/axios"
import { User, UserRole, UserStatus, PaginatedUsersResponse } from "./userTypes"

interface FetchUsersParams {
    page?: number
    limit?: number
}

// Fetch all users with pagination only
export const fetchUsersAPI = async (params: FetchUsersParams = {}): Promise<PaginatedUsersResponse['data']> => {
    const { page = 1, limit = 10 } = params

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    })

    const response = await api.get<PaginatedUsersResponse>(`/users?${queryParams.toString()}`)
    return response.data.data
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