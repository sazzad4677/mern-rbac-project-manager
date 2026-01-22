import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "../../utils/cn"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "secondary" | "outline" | "destructive" | "ghost"
    size?: "default" | "sm" | "lg" | "icon"
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                className={cn(
                    // Base styles
                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-50",
                    {
                        // Variants
                        "bg-zinc-100 text-zinc-950 hover:bg-zinc-200 shadow-sm": variant === "default",
                        "border border-zinc-800 bg-transparent text-zinc-100 hover:bg-zinc-900": variant === "secondary",
                        "bg-red-900/50 text-red-200 border border-red-900 hover:bg-red-900/70": variant === "destructive",
                        "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800": variant === "ghost",

                        // Sizes
                        "h-9 px-4 py-2": size === "default",
                        "h-8 rounded-md px-3 text-xs": size === "sm",
                        "h-11 rounded-md px-8": size === "lg",
                        "h-9 w-9": size === "icon",
                    },
                    className
                )}
                ref={ref}
                disabled={isLoading || disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button }
