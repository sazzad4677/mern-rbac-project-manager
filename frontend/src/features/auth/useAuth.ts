import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext" // Import from your global context
import { loginUserAPI, LoginCredentials, AuthResponse } from "./authApi"
import { AxiosError } from "axios"

export const useLoginMutation = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    return useMutation<AuthResponse, AxiosError<{ message: string }>, LoginCredentials>({
        mutationFn: loginUserAPI,
        onSuccess: ({ token, data }) => {
            login(token, {
                id: data.user._id,
                email: data.user.email,
                name: data.user.name,
                role: data.user.role
            })
            navigate("/dashboard")
        },
        onError: (error) => {
            console.error("Login failed:", error.response?.data?.message || error.message)
        }
    })
}

export const useLogoutMutation = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()

    return useMutation<unknown, AxiosError<{ message: string }>, void>({
        mutationFn: async () => {
            // We'll try to call the API, but even if it fails, we should logout locally
            try {
                // If logoutUserAPI is not imported, we need to import it. 
                // But for now, assuming standard flow.
                const { logoutUserAPI } = await import("./authApi");
                await logoutUserAPI();
            } catch (error) {
                console.warn("Logout API call failed, proceeding with local logout", error);
            }
        },
        onSuccess: () => {
            logout()
            navigate("/login")
        },
        onError: () => {
            // Fallback: force logout anyway
            logout()
            navigate("/login")
        }
    })
}
