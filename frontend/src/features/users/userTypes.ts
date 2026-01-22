import { z } from "zod"
import { userSchema, UserRoleEnum, UserStatusEnum } from "./userSchemas"

export type User = z.infer<typeof userSchema>
export type UserRole = z.infer<typeof UserRoleEnum>
export type UserStatus = z.infer<typeof UserStatusEnum>

export interface PaginatedUsersResponse {
    data: {
        users: User[]
        total: number
        page: number
        limit: number
    }
}

export interface FetchUsersParams {
    page?: number
    limit?: number
    status?: string
    search?: string
}