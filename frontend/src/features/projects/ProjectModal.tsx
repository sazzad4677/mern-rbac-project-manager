import { useMutation, useQueryClient } from "@tanstack/react-query"
import Modal from "../../components/ui/modal"
import { Button } from "../../components/ui/button"
import GenericForm from "../../components/form/GenericForm"
import TextField from "../../components/form/fields/TextField"
import TextAreaField from "../../components/form/fields/TextAreaField"
import SelectField from "../../components/form/fields/SelectField"
import { createProjectAPI, updateProjectAPI } from "./projectApi"
import { createProjectSchema, updateProjectSchema } from "./projectSchemas"
import { useToast } from "../../context/ToastContext"
import { Project, CreateProjectPayload, UpdateProjectPayload } from "./projectType"

interface ProjectModalProps {
    isOpen: boolean
    onClose: () => void
    project?: Project | null
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
    const queryClient = useQueryClient()
    const { showToast } = useToast()
    const isEditMode = !!project

    const defaultValues: CreateProjectPayload & { status?: "ACTIVE" | "ARCHIVED" } = project ? {
        name: project.name,
        description: project.description,
        status: project.status,
    } : {
        name: "",
        description: "",
    }

    const { mutate: createProject, isPending: isCreating } = useMutation({
        mutationFn: createProjectAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            showToast("Project created successfully", "success")
            onClose()
        },
        onError: (error: any) => {
            showToast(error?.response?.data?.message || "Failed to create project", "error")
        },
    })

    const { mutate: updateProject, isPending: isUpdating } = useMutation({
        mutationFn: (data: UpdateProjectPayload) => updateProjectAPI(project!._id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            showToast("Project updated successfully", "success")
            onClose()
        },
        onError: (error: any) => {
            showToast(error?.response?.data?.message || "Failed to update project", "error")
        },
    })

    const handleSubmit = (data: any) => {
        if (isEditMode) {
            updateProject(data)
        } else {
            createProject(data)
        }
    }

    const isPending = isCreating || isUpdating

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? "Edit Project" : "Create New Project"}
        >
            <div className="space-y-4">
                <p className="text-sm text-zinc-500">
                    {isEditMode ? "Update project details below." : "Fill in the details to create a new project."}
                </p>
                <GenericForm
                    key={project ? project._id : "create"}
                    schema={isEditMode ? updateProjectSchema : createProjectSchema}
                    defaultValues={defaultValues}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <TextField
                        name="name"
                        label="Project Name"
                        placeholder="Enter project name"
                    />
                    <TextAreaField
                        name="description"
                        label="Description"
                        placeholder="Enter project description"
                        className="min-h-[100px]"
                    />

                    {isEditMode && (
                        <SelectField
                            name="status"
                            label="Status"
                            options={[
                                { label: "Active", value: "ACTIVE" },
                                { label: "Archived", value: "ARCHIVED" },
                            ]}
                        />
                    )}

                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                        <Button type="button" variant="secondary" onClick={onClose} disabled={isPending} className="w-full sm:w-auto">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                            {isPending ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Project" : "Create Project")}
                        </Button>
                    </div>
                </GenericForm>
            </div>
        </Modal>
    )
}
