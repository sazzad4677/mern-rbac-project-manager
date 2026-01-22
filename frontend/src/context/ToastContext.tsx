import { createContext, useContext, useState, useCallback } from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

type ToastType = "success" | "error" | "info" | "warning"

interface Toast {
    id: string
    message: string
    type: ToastType
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(7)
        setToasts((prev) => [...prev, { id, message, type }])

        // Auto remove after 4 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id))
        }, 4000)
    }, [])

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    )
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    const icons = {
        success: <CheckCircle className="h-5 w-5" />,
        error: <AlertCircle className="h-5 w-5" />,
        warning: <AlertTriangle className="h-5 w-5" />,
        info: <Info className="h-5 w-5" />,
    }

    const styles = {
        success: "bg-green-80 text-green-800 border-green-200 dark:bg-green-900/80 dark:text-green-400 dark:border-green-800",
        error: "bg-red-80 text-red-800 border-red-200 dark:bg-red-900/80 dark:text-red-400 dark:border-red-800",
        warning: "bg-yellow-80 text-yellow-800 border-yellow-200 dark:bg-yellow-900/80 dark:text-yellow-400 dark:border-yellow-800",
        info: "bg-blue-80 text-blue-800 border-blue-200 dark:bg-blue-900/80 dark:text-blue-400 dark:border-blue-800",
    }

    return (
        <div
            className={`flex items-center gap-3 min-w-[300px] max-w-md rounded-lg border px-4 py-3 shadow-lg pointer-events-auto animate-in slide-in-from-right duration-300 ${styles[toast.type]}`}
        >
            {icons[toast.type]}
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
                onClick={onClose}
                className="rounded-md p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within ToastProvider")
    }
    return context
}
