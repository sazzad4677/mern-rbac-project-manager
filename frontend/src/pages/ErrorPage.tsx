import { useRouteError, isRouteErrorResponse, Link, useNavigate } from "react-router-dom";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button } from "../components/ui/button";

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    let errorMessage = "An unexpected error has occurred.";
    let errorStatus = "Error";
    let errorDetails = "";

    if (isRouteErrorResponse(error)) {
        errorStatus = `${error.status}`;
        errorMessage = error.statusText;
        if (error.status === 404) {
            errorMessage = "Page not found";
            errorDetails = "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.";
        } else if (error.status === 401) {
            errorMessage = "Unauthorized";
            errorDetails = "You don't have permission to access this page.";
        } else if (error.status === 503) {
            errorMessage = "Service Unavailable";
            errorDetails = "The server is temporarily unable to service your request due to maintenance downtime or capacity problems.";
        }
    } else if (error instanceof Error) {
        errorMessage = error.message;
        errorDetails = error.stack || "";
    } else if (typeof error === 'string') {
        errorMessage = error;
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 bg-grid-pattern p-4">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    <AlertTriangle className="h-10 w-10" />
                </div>

                <div className="space-y-2 mb-6">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {errorStatus}
                    </h1>
                    <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                        {errorMessage}
                    </h2>
                    {errorDetails && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {errorDetails}
                        </p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Go Back
                    </Button>
                    <Link to="/">
                        <Button className="flex items-center gap-2 w-full sm:w-auto">
                            <Home className="h-4 w-4" />
                            Return Home
                        </Button>
                    </Link>
                </div>

                {process.env.NODE_ENV === 'development' && error instanceof Error && (
                    <div className="mt-8 p-4 bg-zinc-100 dark:bg-zinc-950 rounded-md overflow-x-auto text-left">
                        <p className="font-mono text-xs text-red-600 dark:text-red-400 whitespace-pre-wrap">
                            {error.stack}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
