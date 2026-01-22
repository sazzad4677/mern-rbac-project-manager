import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext" // Import from your global context
import { loginUserAPI } from "./authApi"
import { AxiosError } from "axios"
import { LoginCredentials, AuthResponse } from "./authTypes"

export const useLoginMutation = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    return useMutation<AuthResponse, AxiosError<{ message: string }>, LoginCredentials>({
        mutationFn: loginUserAPI,
        onSuccess: (response) => {
            login(response.data.token, {
                id: response.data.user._id,
                email: response.data.user.email,
                name: response.data.user.name,
                role: response.data.user.role
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
            try {
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
