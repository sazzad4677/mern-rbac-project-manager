import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "../../utils/cn"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "danger" | "ghost"
    size?: "default" | "sm" | "lg" | "icon"
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
                    {
                        // Variants
                        "bg-blue-600 text-white hover:bg-blue-700 shadow-sm": variant === "primary",
                        "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm": variant === "secondary",
                        "border border-gray-200 bg-transparent hover:bg-gray-100 text-gray-900 dark:border-gray-800 dark:bg-transparent dark:text-gray-100 dark:hover:bg-gray-800": variant === "outline",
                        "bg-red-600 text-white hover:bg-red-700 shadow-sm": variant === "danger",
                        "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300": variant === "ghost",

                        // Sizes
                        "h-9 px-4 py-2": size === "default",
                        "h-8 rounded-md px-3 text-xs": size === "sm",
                        "h-10 rounded-md px-8": size === "lg",
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
