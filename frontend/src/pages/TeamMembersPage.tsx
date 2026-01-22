import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Shield, RefreshCw, Copy, Check } from "lucide-react"
import { Button } from "../components/ui/button"
import Modal from "../components/ui/modal"
import TextField from "../components/form/fields/TextField"
import SelectField from "../components/form/fields/SelectField"
import GenericForm from "../components/form/GenericForm"
import { useToast } from "../context/ToastContext"
import { fetchUsersAPI } from "@/features/users/userApi"
import { inviteUserAPI } from "@/features/auth/authApi"
import { inviteSchema } from "@/features/auth/authSchemas"
import { InviteUserPayload } from "@/features/auth/authTypes"
import { ROLES, ROLE_LABELS } from "@/config/roles"

export default function TeamMembersPage() {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [generatedLink, setGeneratedLink] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)
    
    const queryClient = useQueryClient()
    const { showToast } = useToast()

    const { data: users, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsersAPI,
    })

    const { mutate: inviteUser, isPending: isInviting } = useMutation({
        mutationFn: inviteUserAPI,
        onSuccess: (response) => {
            setIsInviteModalOpen(false)
            queryClient.invalidateQueries({ queryKey: ["users"] })

            // Create Link
            const fullUrl = `${window.location.origin}/register?token=${response.data.token}`
            setGeneratedLink(fullUrl)
            showToast("Invitation created successfully", "success")
        },
        onError: (error: any) => {
            showToast(error?.response?.data?.message || "Failed to send invitation", "error")
        }
    })

    const copyToClipboard = async () => {
        if (generatedLink) {
            await navigator.clipboard.writeText(generatedLink)
            setCopied(true)
            showToast("Link copied to clipboard!", "success")
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Team Members</h1>
                    <p className="text-sm text-zinc-500">Manage your team members and their account permissions here.</p>
                </div>
                <Button onClick={() => setIsInviteModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Invite Member
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 uppercase font-medium">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {isLoading ? (
                            <tr><td colSpan={4} className="px-6 py-8 text-center text-zinc-500">Loading...</td></tr>
                        ) : users?.length === 0 ? (
                            <tr><td colSpan={4} className="px-6 py-8 text-center text-zinc-500">No members found.</td></tr>
                        ) : (
                            users?.map((user) => (
                                <tr key={user._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-400">
                                                {user.name ? user.name.slice(0, 2).toUpperCase() : user.email.slice(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-zinc-900 dark:text-zinc-50">{user.name || "Pending Invite"}</div>
                                                <div className="text-xs text-zinc-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 capitalize">
                                            <Shield className="h-3 w-3" />
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                            user.status === 'ACTIVE' 
                                            ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400' 
                                            : 'bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400'
                                        }`}>
                                            {user.status === 'ACTIVE' ? 'Active' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {user.status === 'PENDING' && (
                                            <Button variant="ghost" size="sm" className="h-8 text-indigo-600">
                                                <RefreshCw className="mr-2 h-3.5 w-3.5" />
                                                Resend
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Invite Modal */}
            <Modal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                title="Invite Team Member"
            >
                <div className="space-y-4">
                    <p className="text-sm text-zinc-500">
                        Send an invitation email to add a new member.
                    </p>
                    <GenericForm
                        schema={inviteSchema} // Using the imported schema
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
                            <Button type="button" variant="outline" onClick={() => setIsInviteModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isInviting}>
                                {isInviting ? "Sending..." : "Send Invitation"}
                            </Button>
                        </div>
                    </GenericForm>
                </div>
            </Modal>

            {/* Success/Copy Modal */}
            <Modal
                isOpen={generatedLink !== null}
                onClose={() => setGeneratedLink(null)}
                title="Invitation Created"
            >
                <div className="space-y-4">
                    <p className="text-sm text-zinc-500">
                        Share this link with the user to let them create their account.
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            readOnly
                            value={generatedLink || ""}
                            className="flex-1 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-sm"
                        />
                        <Button onClick={copyToClipboard} className="flex items-center gap-2">
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            {copied ? "Copied" : "Copy"}
                        </Button>
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button onClick={() => setGeneratedLink(null)}>Done</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}