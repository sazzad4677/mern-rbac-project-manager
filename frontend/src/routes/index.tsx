import { createBrowserRouter, Navigate } from "react-router-dom"
import ProtectedLayout from "./ProtectedLayout"
import RootLayout from "../layouts/RootLayout"
import ErrorPage from "../pages/ErrorPage"
import LoginPage from "../pages/LoginPage"
import FormPlayground from "../pages/FormPlayground"

// Placeholder Dashboard until we create the real one
const Dashboard = () => <h1 className="text-3xl font-bold">Dashboard Overview</h1>

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            // Public Routes
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "playground",
                element: <FormPlayground />,
            },

            // Protected Routes
            {
                path: "dashboard",
                element: <ProtectedLayout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                ],
            },
        ],
    },
])
