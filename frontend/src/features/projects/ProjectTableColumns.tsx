import { Pencil, Trash2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Project } from "./projectApi"

interface ProjectTableColumnsProps {
    onEdit: (project: Project) => void
    onDelete: (project: Project) => void
    isAdmin: boolean
}

export const getProjectTableColumns = ({ onEdit, onDelete, isAdmin }: ProjectTableColumnsProps) => [
    {
        header: "Project Name",
        render: (project: Project) => (
            <div>
                <div className="font-medium text-zinc-900 dark:text-zinc-50">{project.name}</div>
                <div className="text-xs text-zinc-500 line-clamp-1">{project.description}</div>
            </div>
        ),
    },
    {
        header: "Status",
        render: (project: Project) => (
            <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${project.status === "ACTIVE"
                        ? "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400"
                        : "bg-zinc-50 text-zinc-700 ring-zinc-600/20 dark:bg-zinc-500/10 dark:text-zinc-400"
                    }`}
            >
                {project.status === "ACTIVE" ? "Active" : "Archived"}
            </span>
        ),
    },
    {
        header: "Created",
        render: (project: Project) => (
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {new Date(project.createdAt).toLocaleDateString()}
            </span>
        ),
    },
    {
        header: "Actions",
        align: "right" as const,
        render: (project: Project) => (
            <div className="flex items-center justify-end gap-2">
                {isAdmin && (
                    <>
                        <Button variant="ghost" size="sm" className="h-8" onClick={() => onEdit(project)}>
                            <Pencil className="mr-2 h-3.5 w-3.5" />
                            Edit
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => onDelete(project)}
                        >
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            Delete
                        </Button>
                    </>
                )}
                {!isAdmin && (
                    <span className="text-xs text-zinc-500">View only</span>
                )}
            </div>
        ),
    },
]
