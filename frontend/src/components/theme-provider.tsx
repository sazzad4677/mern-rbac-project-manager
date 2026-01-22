import { createContext, useContext, useEffect, useState, useMemo } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
    children,
}: ThemeProviderProps) {
    // Force theme to be always dark, ignoring storage and defaults
    const [theme] = useState<Theme>("dark")

    useEffect(() => {
        const root = document.documentElement
        root.classList.remove("light")
        root.classList.add("dark")
    }, [])

    const value = useMemo(() => ({
        theme,
        setTheme: () => null, // Disable theme switching
    }), [theme])

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}