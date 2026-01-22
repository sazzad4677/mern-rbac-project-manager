import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
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
                path: "projects",
                element: <div>Projects Page</div>,
            },
            // Redirect root "/" to dashboard
            {
                index: true,
                element: <Dashboard />,
            }
        ],
    },
]);
