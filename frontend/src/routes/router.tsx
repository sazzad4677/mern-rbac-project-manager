import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import UsersPage from "../pages/UsersPage";
import ProtectedLayout from "./ProtectedLayout";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
    // PUBLIC ROUTES (No Sidebar, No Header)
    {
        path: "/login",
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <PublicRoute>
                <RegisterPage />
            </PublicRoute>
        ),
    },

    // PROTECTED ROUTES
    {
        path: "/",
        element: (
            <ProtectedLayout>
                <DashboardLayout />
            </ProtectedLayout>
        ),
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "users",
                element: <UsersPage />,
            },
            {
                path: "projects",
                element: <div>Projects Page</div>,
            },
            {
                index: true,
                element: <Dashboard />,
            }
        ],
    },
]);
