import { api } from "../../lib/axios"
import { CreateProjectPayload, FetchProjectsParams, PaginatedProjectsResponse, Project, UpdateProjectPayload } from "./projectType"

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
