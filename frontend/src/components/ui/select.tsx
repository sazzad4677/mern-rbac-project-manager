import * as React from "react"
import { cn } from "../../utils/cn"

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options?: { label: string; value: string | number }[]
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, children, ...props }, ref) => {
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
                <div className="relative">
                    <select
                        className={cn(
                            "flex h-9 w-full items-center justify-between rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:placeholder:text-gray-400 dark:focus:ring-blue-500 dark:text-gray-100 appearance-none",
                            error && "border-red-500 focus:ring-red-500 dark:border-red-900 dark:focus:ring-red-900",
                            className
                        )}
                        ref={ref}
                        {...props}
                    >
                        {options
                            ? options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))
                            : children}
                    </select>
                    {/* Custom Arrow Icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <svg
                            className="h-4 w-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>

                {error && (
                    <p className="text-sm font-medium text-red-500 dark:text-red-400">
                        {error}
                    </p>
                )}
            </div>
        )
    }
)
Select.displayName = "Select"

export { Select }
