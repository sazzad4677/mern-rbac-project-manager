import { createBrowserRouter, redirect } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import ErrorPage from "./pages/ErrorPage"
import FormPlayground from "./pages/FormPlayground"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                loader: () => redirect("/playground")
            },
            {
                path: "playground",
                element: <FormPlayground />,
            },
        ],
    },
])
