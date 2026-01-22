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
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 bg-grid-pattern relative">

            <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl p-8">
                <div className="mb-6 flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Sign In
                    </h1>
                    <p className="text-sm text-zinc-500">
                        Enter your credentials to access your account
                    </p>
                </div>

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
