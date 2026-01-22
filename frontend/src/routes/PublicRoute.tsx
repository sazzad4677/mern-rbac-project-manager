import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function PublicRoute({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        )
    }

    if (user) {
        return <Navigate to="/dashboard" replace />
    }

    return children
}
