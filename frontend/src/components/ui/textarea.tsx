import * as React from "react"
import { cn } from "../../utils/cn"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                        htmlFor={props.id}
                    >
                        {label}
                    </label>
                )}
                <textarea
                    className={cn(
                        "flex min-h-[60px] w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-blue-500 dark:text-gray-100",
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
Textarea.displayName = "Textarea"

export { Textarea }
