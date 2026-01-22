
export interface Project {
    _id: string
    name: string
    description: string
    status: "ACTIVE" | "ARCHIVED"
    createdBy: string
    createdAt: string
    updatedAt: string
}

export interface CreateProjectPayload {
    name: string
    description: string
}

export interface UpdateProjectPayload {
    name?: string
    description?: string
    status?: "ACTIVE" | "ARCHIVED"
}

export interface FetchProjectsParams {
    page?: number
    limit?: number
    search?: string
    status?: string
}

export interface PaginatedProjectsResponse {
    success: boolean
    data: {
        projects: Project[]
        total: number
        page: number
        limit: number
    }
}