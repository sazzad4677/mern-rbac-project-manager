import { api } from "../../lib/axios"

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

interface FetchProjectsParams {
    page?: number
    limit?: number
    search?: string
    status?: string
}

interface PaginatedProjectsResponse {
    success: boolean
    data: {
        projects: Project[]
        total: number
        page: number
        limit: number
    }
}

// Fetch all projects with pagination
export const fetchProjectsAPI = async (params: FetchProjectsParams = {}): Promise<PaginatedProjectsResponse['data']> => {
    const { page = 1, limit = 10 } = params

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    })

    const response = await api.get<PaginatedProjectsResponse>(`/projects?${queryParams.toString()}`)
    return response.data.data
}

// Create a new project
export const createProjectAPI = async (data: CreateProjectPayload): Promise<Project> => {
    const response = await api.post<{ data: Project }>("/projects", data)
    return response.data.data
}

// Update a project (Admin only)
export const updateProjectAPI = async (id: string, data: UpdateProjectPayload): Promise<Project> => {
    const response = await api.patch<{ data: Project }>(`/projects/${id}`, data)
    return response.data.data
}

// Delete a project (Admin only)
export const deleteProjectAPI = async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`)
}
