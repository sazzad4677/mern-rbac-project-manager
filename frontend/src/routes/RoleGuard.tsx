import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface RoleGuardProps {
    children?: React.ReactNode
    allowedRoles: string[]
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />
    }

    return children ? <>{children}</> : <Outlet />
}
