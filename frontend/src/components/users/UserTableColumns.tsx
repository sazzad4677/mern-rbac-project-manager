import { Shield, Pencil, RefreshCw } from "lucide-react"
import { Button } from "../ui/button"
import { User } from "../../features/users/userTypes"
import { STATUS_CONFIG } from "../../config/statuses"

interface UserTableColumnsProps {
    onEdit: (user: User) => void
    onResend?: (user: User) => void
}

export const getUserTableColumns = ({ onEdit, onResend }: UserTableColumnsProps) => [
    {
        header: "User",
        render: (user: User) => (
            <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    {user.name ? user.name.slice(0, 2).toUpperCase() : user.email.slice(0, 2).toUpperCase()}
                </div>
                <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-50">
                        {user.name || "Pending Invite"}
                    </div>
                    <div className="text-xs text-zinc-500">{user.email}</div>
                </div>
            </div>
        ),
    },
    {
        header: "Role",
        render: (user: User) => (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 capitalize">
                <Shield className="h-3 w-3" />
                {user.role}
            </span>
        ),
    },
    {
        header: "Status",
        render: (user: User) => {
            const config = STATUS_CONFIG[user.status] || STATUS_CONFIG.INACTIVE

            return (
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${config.className}`}>
                    {config.label}
                </span>
            )
        },
    },
    {
        header: "Actions",
        align: "right" as const,
        render: (user: User) => (
            <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" className="h-8" onClick={() => onEdit(user)}>
                    <Pencil className="mr-2 h-3.5 w-3.5" />
                    Edit
                </Button>
                {user.status === "PENDING" && onResend && (
                    <Button variant="ghost" size="sm" className="h-8 text-indigo-600" onClick={() => onResend(user)}>
                        <RefreshCw className="mr-2 h-3.5 w-3.5" />
                        Resend
                    </Button>
                )}
            </div>
        ),
    },
]
