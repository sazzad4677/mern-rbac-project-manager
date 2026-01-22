import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import UsersPage from "../pages/UsersPage";
import ProjectsPage from "../pages/ProjectsPage";
import ProtectedLayout from "./ProtectedLayout";
import PublicRoute from "./PublicRoute";
import RoleGuard from "./RoleGuard";
import ErrorPage from "../pages/ErrorPage";

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
        errorElement: <ErrorPage />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "users",
                element: (
                    <RoleGuard allowedRoles={['ADMIN']}>
                        <UsersPage />
                    </RoleGuard>
                ),
            },
            {
                path: "projects",
                element: <ProjectsPage />,
            },
            {
                path: "settings",
                element: <>Settings Page</>,
            },
            {
                index: true,
                element: <Dashboard />,
            }
        ],
    },
]);
