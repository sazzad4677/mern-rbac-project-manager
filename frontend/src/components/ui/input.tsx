import * as React from "react"
import { cn } from "../../utils/cn"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-700 dark:text-zinc-300"
                        htmlFor={props.id}
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-1 text-sm text-zinc-900 dark:text-zinc-100 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-red-500 focus-visible:ring-red-500 dark:border-red-900 dark:focus-visible:ring-red-900",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="text-sm font-medium text-red-500 dark:text-red-400">
                        {error}
                    </p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
