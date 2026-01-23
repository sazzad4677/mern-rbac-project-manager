import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "../../utils/cn"

export interface SelectProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string
    error?: string
    options?: { label: string; value: string | number }[]
    onChange?: (e: { target: { value: string } }) => void
    value?: string | number
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
    ({ className, label, error, options = [], value, onChange, ...props }) => {
        const [isOpen, setIsOpen] = React.useState(false)
        const containerRef = React.useRef<HTMLDivElement>(null)

        const selectedOption = options.find(opt => String(opt.value) === String(value))

        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setIsOpen(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [])

        const handleSelect = (optionValue: string | number) => {
            if (onChange) {
                onChange({ target: { value: String(optionValue) } })
            }
            setIsOpen(false)
        }

        return (
            <div className="relative" ref={containerRef}>
                {label && (
                    <label
                        className="mb-2 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-200"
                        htmlFor={props.id}
                    >
                        {label}
                    </label>
                )}
                <div
                    className={cn(
                        "flex h-9 w-full items-center justify-between rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-300 cursor-pointer",
                        error && "border-red-500 focus:ring-red-500 dark:border-red-900 dark:focus:ring-red-900",
                        className
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={cn(!selectedOption && "text-muted-foreground")}>
                        {selectedOption ? selectedOption.label : "Select..."}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </div>

                {isOpen && (
                    <div className="absolute top-full left-0 z-50 mt-1 w-full min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
                        <div className="p-1">
                            {options.map((option) => (
                                <div
                                    key={option.value}
                                    className={cn(
                                        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none hover:bg-zinc-100 hover:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                                        String(value) === String(option.value) && "bg-zinc-100 dark:bg-zinc-800"
                                    )}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleSelect(option.value)
                                    }}
                                >
                                    <span className="flex-1 truncate">{option.label}</span>
                                    {String(value) === String(option.value) && (
                                        <Check className="ml-auto h-4 w-4 opacity-100" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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
