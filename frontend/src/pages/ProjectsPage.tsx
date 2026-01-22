import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import Table from "../components/ui/table"
import { fetchProjectsAPI, deleteProjectAPI } from "@/features/projects/projectApi"
import ProjectModal from "@/features/projects/ProjectModal"
import { getProjectTableColumns } from "@/features/projects/ProjectTableColumns"
import ConfirmationModal from "@/components/ui/confirmation-modal"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/context/ToastContext"
import { Project } from "@/features/projects/projectType"

export default function ProjectsPage() {
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [editingProject, setEditingProject] = useState<Project | null>(null)
    const [deletingProject, setDeletingProject] = useState<Project | null>(null)
    const [page, setPage] = useState(1)
    const limit = 10

    const { user } = useAuth()
    const { showToast } = useToast()
    const queryClient = useQueryClient()
    const isAdmin = user?.role === "ADMIN"

    const { data, isLoading, isPlaceholderData } = useQuery({
        queryKey: ["projects", page],
        queryFn: () => fetchProjectsAPI({ page, limit }),
        placeholderData: (previousData) => previousData,
    })

    const projects = data?.projects || []
    const totalPages = data ? Math.ceil(data.total / limit) : 0
    const totalItems = data?.total || 0

    const { mutate: deleteProject, isPending: isDeleting } = useMutation({
        mutationFn: deleteProjectAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            showToast("Project deleted successfully", "success")
            setIsDeleteModalOpen(false)
            setDeletingProject(null)
        },
        onError: (error: any) => {
            showToast(error?.response?.data?.message || "Failed to delete project", "error")
        },
    })

    const handleEdit = (project: Project) => {
        setEditingProject(project)
        setIsProjectModalOpen(true)
    }

    const handleDeleteClick = (project: Project) => {
        setDeletingProject(project)
        setIsDeleteModalOpen(true)
    }

    const handleConfirmDelete = () => {
        if (deletingProject) {
            deleteProject(deletingProject._id)
        }
    }

    const handleCreateNew = () => {
        setEditingProject(null)
        setIsProjectModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsProjectModalOpen(false)
        setEditingProject(null)
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const columns = getProjectTableColumns({
        onEdit: handleEdit,
        onDelete: handleDeleteClick,
        isAdmin,
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Projects
                    </h1>
                    <p className="text-sm text-zinc-500">
                        Manage your projects and track their progress.
                    </p>
                </div>
                <Button onClick={handleCreateNew}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                </Button>
            </div>

            <Table
                columns={columns}
                data={projects}
                isLoading={isLoading && !isPlaceholderData}
                emptyMessage="No projects found. Create your first project to get started!"
                loadingMessage="Loading projects..."
                searchable
                searchPlaceholder="Search projects..."
                filterable={{
                    placeholder: "All Status",
                    options: [
                        { label: "Active", value: "ACTIVE" },
                        { label: "Archived", value: "ARCHIVED" },
                    ],
                }}
                pagination={{
                    currentPage: page,
                    totalPages,
                    totalItems,
                    onPageChange: handlePageChange,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1,
                }}
            />

            <ProjectModal
                isOpen={isProjectModalOpen}
                onClose={handleCloseModal}
                project={editingProject}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title={`Delete ${deletingProject?.name}?`}
                message="This action cannot be undone. This will permanently delete the project and all associated data."
                isDeleting={isDeleting}
            />
        </div>
    )
}
