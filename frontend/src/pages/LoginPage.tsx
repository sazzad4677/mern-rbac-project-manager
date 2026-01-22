import { Button } from "../components/ui/button"
import GenericForm from "../components/form/GenericForm"
import TextField from "../components/form/fields/TextField"
import { loginSchema, LoginCredentials } from "../features/auth/authApi"
import { useLoginMutation } from "../features/auth/useAuth"

export default function LoginPage() {
    const { mutate, isPending, error, isError } = useLoginMutation()

    const onSubmit = (data: LoginCredentials) => {
        mutate(data)
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-sm rounded-lg border bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <h1 className="mb-6 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Sign In
                </h1>

                {isError && (
                    <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                        {error?.response?.data?.message || "Invalid credentials. Please try again."}
                    </div>
                )}

                <GenericForm
                    schema={loginSchema}
                    defaultValues={{ email: "", password: "" }}
                    onSubmit={onSubmit}
                    className="space-y-4"
                >
                    <div className="space-y-4">
                        <TextField
                            name="email"
                            label="Email Address"
                            type="email"
                            disabled={isPending}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            disabled={isPending}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isPending}
                    >
                        {isPending ? "Signing in..." : "Login"}
                    </Button>
                </GenericForm>
            </div>
        </div>
    )
}
