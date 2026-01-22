import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import Table from "../components/ui/table"
import { fetchUsersAPI } from "@/features/users/userApi"
import { User } from "@/features/users/userTypes"
import EditUserModal from "@/components/users/EditUserModal"
import InviteUserModal from "@/components/users/InviteUserModal"
import CopyLinkModal from "@/components/users/CopyLinkModal"
import { getUserTableColumns } from "@/components/users/UserTableColumns"

export default function UsersPage() {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [generatedLink, setGeneratedLink] = useState<string | null>(null)
    const [editingUser, setEditingUser] = useState<User | null>(null)

    const { data: users, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsersAPI,
    })

    const handleInviteSuccess = (token: string) => {
        const fullUrl = `${window.location.origin}/register?token=${token}`
        setGeneratedLink(fullUrl)
    }

    const handleResend = (user: User) => {
        // TODO: Implement resend invitation logic
        console.log("Resend invitation to:", user.email)
    }

    const columns = getUserTableColumns({
        onEdit: setEditingUser,
        onResend: handleResend,
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Team Members
                    </h1>
                    <p className="text-sm text-zinc-500">
                        Manage your team members and their account permissions here.
                    </p>
                </div>
                <Button onClick={() => setIsInviteModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Invite Member
                </Button>
            </div>

            <Table
                columns={columns}
                data={users || []}
                isLoading={isLoading}
                emptyMessage="No members found."
                loadingMessage="Loading..."
            />

            {/* Modals */}
            <InviteUserModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                onSuccess={handleInviteSuccess}
            />

            <CopyLinkModal
                isOpen={generatedLink !== null}
                onClose={() => setGeneratedLink(null)}
                link={generatedLink}
            />

            <EditUserModal
                user={editingUser}
                isOpen={editingUser !== null}
                onClose={() => setEditingUser(null)}
            />
        </div>
    )
}