import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "../theme-provider"
import { cn } from "../../utils/cn"

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme()

    const cycleTheme = () => {
        if (theme === 'system') setTheme('light')
        else if (theme === 'light') setTheme('dark')
        else setTheme('system')
    }

    return (
        <button
            onClick={cycleTheme}
            className={cn(
                // Base Layout
                "relative inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",

                // Light Mode Styling (White bg, visible border)
                "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 shadow-sm",

                // Dark Mode Styling (Dark bg, visible border, light text)
                "dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-100",

                className
            )}
            title={`Current theme: ${theme}`}
        >
            {/* Sun Icon (Visible only in Light Mode) */}
            <Sun
                className={cn(
                    "h-[1.2rem] w-[1.2rem] transition-all absolute",
                    theme === "light" ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"
                )}
            />

            {/* Moon Icon (Visible only in Dark Mode) */}
            <Moon
                className={cn(
                    "h-[1.2rem] w-[1.2rem] transition-all absolute",
                    theme === "dark" ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 rotate-90"
                )}
            />

            {/* Monitor Icon (Visible only in System Mode) */}
            <Monitor
                className={cn(
                    "h-[1.2rem] w-[1.2rem] transition-all absolute",
                    theme === "system" ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 rotate-90"
                )}
            />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}