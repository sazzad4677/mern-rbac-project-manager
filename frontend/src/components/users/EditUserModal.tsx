import { useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Modal from "../ui/modal"
import { Button } from "../ui/button"
import { User, UserRole, UserStatus } from "../../features/users/userTypes"
import { updateUserRoleAPI, updateUserStatusAPI } from "../../features/users/userApi"
import { ROLES, ROLE_LABELS } from "../../config/roles"
import { useToast } from "../../context/ToastContext"
import { z } from "zod"
import { UserRoleEnum, UserStatusEnum } from "../../features/users/userSchemas"

const editUserSchema = z.object({
    role: UserRoleEnum,
    status: UserStatusEnum,
})

type EditUserForm = z.infer<typeof editUserSchema>

interface EditUserModalProps {
    user: User | null
    isOpen: boolean
    onClose: () => void
}

export default function EditUserModal({ user, isOpen, onClose }: EditUserModalProps) {
    const [formData, setFormData] = useState<EditUserForm>({
        role: "STAFF",
        status: "ACTIVE",
    })
    const queryClient = useQueryClient()
    const { showToast } = useToast()

    // Pre-fill form when user changes
    useEffect(() => {
        if (user) {
            setFormData({
                role: user.role,
                status: user.status,
            })
        }
    }, [user])

    const { mutate: updateUser, isPending } = useMutation({
        mutationFn: async (data: EditUserForm) => {
            if (!user) return

            const promises = []

            // Only update if changed
            if (data.role !== user.role) {
                promises.push(updateUserRoleAPI(user._id, data.role))
            }
            if (data.status !== user.status) {
                promises.push(updateUserStatusAPI(user._id, data.status))
            }

            if (promises.length === 0) {
                throw new Error("No changes detected")
            }

            await Promise.all(promises)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
            showToast("User updated successfully", "success")
            onClose()
        },
        onError: (error: any) => {
            showToast(error?.message || error?.response?.data?.message || "Failed to update user", "error")
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateUser(formData)
    }

    if (!user) return null

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Manage Access: ${user.name || user.email}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-zinc-500">
                    Update the role and status for this user.
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Role
                        </label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {ROLES.map((role) => (
                                <option key={role} value={role}>
                                    {ROLE_LABELS[role]}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
