import { Outlet } from "react-router-dom"
import { ThemeProvider } from "../components/theme-provider"
import { ThemeToggle } from "../components/ui/theme-toggle"

export default function RootLayout() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-white transition-colors dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased">
                <header className="absolute top-4 right-4 z-50">
                    <ThemeToggle />
                </header>
                {/* Main Content Area */}
                <Outlet />
            </div>
        </ThemeProvider>
    )
}
