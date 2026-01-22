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
        onSuccess: ({token, data}) => {
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
