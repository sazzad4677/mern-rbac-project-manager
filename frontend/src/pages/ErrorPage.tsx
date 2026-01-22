import { useRouteError, isRouteErrorResponse } from "react-router-dom"
import { Button } from "../components/ui/button"

export default function ErrorPage() {
    const error = useRouteError()
    console.error(error)

    let errorMessage: string

    if (isRouteErrorResponse(error)) {
        // error is type `ErrorResponse`
        errorMessage = `${error.status} ${error.statusText}`
    } else if (error instanceof Error) {
        errorMessage = error.message
    } else if (typeof error === 'string') {
        errorMessage = error
    } else {
        errorMessage = 'Unknown error'
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
                Sorry, an unexpected error has occurred.
            </p>
            <p className="font-mono text-red-500">
                <i>{errorMessage}</i>
            </p>
            <Button onClick={() => window.location.href = '/'}>
                Go to Home
            </Button>
        </div>
    )
}
