import * as React from "react"
import { cn } from "../../utils/cn"

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                type="checkbox"
                className={cn(
                    "peer h-4 w-4 shrink-0 rounded-sm border border-gray-200 border-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:border-gray-50 dark:focus-visible:ring-gray-300 accent-blue-600",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
