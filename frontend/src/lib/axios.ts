import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

// Request Interceptor: Attach Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response Interceptor: Handle Global Errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // Check for 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Prevent infinite loops
            if (originalRequest.url?.includes("/auth/refresh-token")) {
                localStorage.removeItem("token")
                window.location.href = "/login"
                return Promise.reject(error)
            }

            originalRequest._retry = true

            try {
                // Attempt to refresh token
                const { data } = await api.post("/auth/refresh-token")
                const newToken = data.data.token

                // Update local storage
                localStorage.setItem("token", newToken)

                // Update Authorization header for the original request
                originalRequest.headers.Authorization = `Bearer ${newToken}`

                // Retry the original request
                return api(originalRequest)
            } catch (refreshError) {
                // Refresh failed - Clear auth and redirect
                localStorage.removeItem("token")
                window.location.href = "/login"
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)
