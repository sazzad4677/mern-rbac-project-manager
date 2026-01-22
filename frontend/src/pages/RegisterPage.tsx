import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useSearchParams, useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import GenericForm from "../components/form/GenericForm"
import TextField from "../components/form/fields/TextField"
import { registerUserAPI } from "../features/auth/authApi"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { RegisterInput } from "@/features/auth/authTypes"
import { registerSchema } from "@/features/auth/authSchemas"

export default function RegisterPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get("token")
    const [isSuccess, setIsSuccess] = useState(false)

    const { mutate, isPending, error, isError } = useMutation({
        mutationFn: registerUserAPI,
        onSuccess: () => {
            setIsSuccess(true)
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }
    })

    const onSubmit = (data: RegisterInput) => {
        if (!token) return
        mutate({ ...data, token })
    }

    // Token Validation UI
    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 bg-grid-pattern p-4">
                <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        <AlertCircle className="h-8 w-8" />
                    </div>
                    <h1 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">Invalid Invitation</h1>
                    <p className="mb-6 text-zinc-500">
                        This registration page requires a valid invitation token. Please check the link sent to your email.
                    </p>
                    <Link to="/login">
                        <Button variant="outline" className="w-full">Back to Login</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 bg-grid-pattern relative p-4">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl p-8">
                <div className="mb-6 flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Create Account
                    </h1>
                    <p className="text-sm text-zinc-500">
                        Set up your account to join the workspace
                    </p>
                </div>

                {isSuccess && (
                    <div className="mb-6 flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Account created! Redirecting...</span>
                    </div>
                )}

                {isError && (
                    <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                        {(error as any)?.response?.data?.message || "Registration failed. Please try again."}
                    </div>
                )}

                <GenericForm
                    schema={registerSchema}
                    defaultValues={{ name: "", email: "", password: "", confirmPassword: "", token }}
                    onSubmit={onSubmit}
                    className="space-y-4"
                >
                    <TextField
                        name="name"
                        label="Full Name"
                        placeholder="John Doe"
                        disabled={isPending || isSuccess}
                    />
                    <TextField
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        disabled={isPending || isSuccess}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        disabled={isPending || isSuccess}
                    />
                    <TextField
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        disabled={isPending || isSuccess}
                    />

                    <Button
                        type="submit"
                        className="w-full mt-2"
                        size="lg"
                        disabled={isPending || isSuccess}
                    >
                        {isPending ? "Creating Account..." : "Create Account"}
                    </Button>
                </GenericForm>

                <div className="mt-6 text-center text-sm">
                    <span className="text-zinc-500">Already have an account? </span>
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    )
}
