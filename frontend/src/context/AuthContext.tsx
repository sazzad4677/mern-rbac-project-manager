import React, { createContext, useContext, useEffect, useState } from "react"

const TOKEN_KEY = "token"
const USER_DATA_KEY = "user_data"

// User Type
export interface User {
    id: string
    email: string
    name: string
    role: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (token: string, userData: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_DATA_KEY)
        setUser(null)
    }

    const login = (token: string, userData: User) => {
        localStorage.setItem(TOKEN_KEY, token)
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
        setUser(userData)
    }

    useEffect(() => {
        const initAuth = () => {
            const token = localStorage.getItem(TOKEN_KEY)
            const storedUser = localStorage.getItem(USER_DATA_KEY)

            if (!token || !storedUser) {
                if (token || storedUser) {
                    logout()
                }
                setIsLoading(false)
                return
            }

            try {
                const parsedUser = JSON.parse(storedUser) as User
                setUser(parsedUser)
            } catch (error) {
                console.error("Auth Data Corruption detected. Logging out.", error)
                logout()
            } finally {
                setIsLoading(false)
            }
        }

        initAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
