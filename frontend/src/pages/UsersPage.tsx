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
import { USER_STATUSES, STATUS_CONFIG } from "@/config/statuses"

export default function UsersPage() {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [generatedLink, setGeneratedLink] = useState<string | null>(null)
    const [editingUser, setEditingUser] = useState<User | null>(null)

    // Pagination only (search/filter are client-side in Table component)
    const [page, setPage] = useState(1)
    const limit = 10

    const { data, isLoading, isPlaceholderData } = useQuery({
        queryKey: ["users", page],
        queryFn: () => fetchUsersAPI({ page, limit }),
        placeholderData: (previousData) => previousData,
    })

    const users = data?.users || []
    const totalPages = data ? Math.ceil(data.total / limit) : 0
    const totalItems = data?.total || 0

    const handleInviteSuccess = (token: string) => {
        const fullUrl = `${window.location.origin}/register?token=${token}`
        setGeneratedLink(fullUrl)
    }

    const handleResend = (user: User) => {
        // TODO: Implement resend invitation logic
        console.log("Resend invitation to:", user.email)
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
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
                        Users
                    </h1>
                    <p className="text-sm text-zinc-500">
                        Manage your users and their account permissions here.
                    </p>
                </div>
                <Button onClick={() => setIsInviteModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Invite Member
                </Button>
            </div>

            <Table
                columns={columns}
                data={users}
                isLoading={isLoading && !isPlaceholderData}
                emptyMessage="No members found."
                loadingMessage="Loading..."
                searchable
                searchPlaceholder="Search by name or email..."
                filterable={{
                    placeholder: "All Status",
                    options: USER_STATUSES.map((status) => ({
                        label: STATUS_CONFIG[status].label,
                        value: status,
                    })),
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