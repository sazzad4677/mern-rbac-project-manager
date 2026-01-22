import { useMutation, useQueryClient } from "@tanstack/react-query"
import Modal from "../ui/modal"
import { Button } from "../ui/button"
import TextField from "../form/fields/TextField"
import SelectField from "../form/fields/SelectField"
import GenericForm from "../form/GenericForm"
import { inviteUserAPI } from "../../features/auth/authApi"
import { inviteSchema } from "../../features/auth/authSchemas"
import { InviteUserPayload } from "../../features/auth/authTypes"
import { ROLES, ROLE_LABELS } from "../../config/roles"
import { useToast } from "../../context/ToastContext"

interface InviteUserModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: (token: string) => void
}

export default function InviteUserModal({ isOpen, onClose, onSuccess }: InviteUserModalProps) {
    const queryClient = useQueryClient()
    const { showToast } = useToast()

    const { mutate: inviteUser, isPending: isInviting } = useMutation({
        mutationFn: inviteUserAPI,
        onSuccess: (response) => {
            onClose()
            queryClient.invalidateQueries({ queryKey: ["users"] })
            onSuccess(response.data.token)
            showToast("Invitation created successfully", "success")
        },
        onError: (error: any) => {
            showToast(error?.response?.data?.message || "Failed to send invitation", "error")
        }
    })

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Invite User"
        >
            <div className="space-y-4">
                <p className="text-sm text-zinc-500">
                    Send an invitation email to add a new member.
                </p>
                <GenericForm
                    schema={inviteSchema}
                    defaultValues={{ email: "", role: "STAFF" }}
                    onSubmit={(data) => inviteUser(data as InviteUserPayload)}
                    className="space-y-4"
                >
                    <TextField
                        name="email"
                        label="Email Address"
                        placeholder="colleague@company.com"
                    />
                    <SelectField
                        name="role"
                        label="Role"
                        options={ROLES.map((role) => ({
                            label: ROLE_LABELS[role],
                            value: role,
                        }))}
                    />
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isInviting}>
                            {isInviting ? "Sending..." : "Send Invitation"}
                        </Button>
                    </div>
                </GenericForm>
            </div>
        </Modal>
    )
}
