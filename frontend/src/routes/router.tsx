import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import TeamMembersPage from "../pages/TeamMembersPage";
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
                element: <TeamMembersPage />,
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
