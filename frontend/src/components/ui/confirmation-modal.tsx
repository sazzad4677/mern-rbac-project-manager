import Modal from "../ui/modal"
import { Button } from "../ui/button"
import { AlertTriangle } from "lucide-react"

interface ConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
    isDeleting?: boolean
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    isDeleting = false,
}: ConfirmationModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirm Action">
            <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200">
                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <h4 className="font-medium">{title}</h4>
                        <p className="text-sm opacity-90">{message}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
