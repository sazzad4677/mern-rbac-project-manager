import { useState } from "react"
import Modal from "../ui/modal"
import { Button } from "../ui/button"
import { Copy, Check } from "lucide-react"
import { useToast } from "../../context/ToastContext"

interface CopyLinkModalProps {
    isOpen: boolean
    onClose: () => void
    link: string | null
}

export default function CopyLinkModal({ isOpen, onClose, link }: CopyLinkModalProps) {
    const [copied, setCopied] = useState(false)
    const { showToast } = useToast()

    const copyToClipboard = async () => {
        if (link) {
            await navigator.clipboard.writeText(link)
            setCopied(true)
            showToast("Link copied to clipboard!", "success")
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Invitation Created"
        >
            <div className="space-y-4">
                <p className="text-sm text-zinc-500">
                    Share this link with the user to let them create their account.
                </p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        readOnly
                        value={link || ""}
                        className="flex-1 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-sm"
                    />
                    <Button onClick={copyToClipboard} className="flex items-center gap-2">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied" : "Copy"}
                    </Button>
                </div>
                <div className="flex justify-end pt-4">
                    <Button onClick={onClose}>Done</Button>
                </div>
            </div>
        </Modal>
    )
}
