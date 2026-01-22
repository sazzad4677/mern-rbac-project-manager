import { api } from "../../lib/axios"
import { User, PaginatedUsersResponse } from "./userTypes"

// Fetch all users
export const fetchUsersAPI = async (): Promise<User[]> => {
    const response = await api.get<PaginatedUsersResponse>("/users")
    return response.data.data.users
}