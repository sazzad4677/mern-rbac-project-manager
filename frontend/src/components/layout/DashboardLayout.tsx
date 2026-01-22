import { useState, useRef, useEffect } from "react";
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Folder, Users, Settings, FlaskConical, ChevronRight, BarChart3, Shield, LogOut } from 'lucide-react';
import { useLogoutMutation } from "../../features/auth/useAuth";

export default function DashboardLayout() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { mutate: logout } = useLogoutMutation();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground bg-grid-pattern font-sans relative transition-colors duration-300">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300">
                <div className="flex h-16 items-center border-b border-border px-6">
                    <NavLink to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-sidebar-foreground">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                            <FlaskConical className="h-5 w-5" />
                        </div>
                        <span>SaaS Admin</span>
                    </NavLink>
                </div>

                <div className="h-[calc(100vh-4rem)] overflow-y-auto p-4">
                    <div className="space-y-6">
                        <NavGroup title="Overview">
                            <NavItem to="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" />
                            <NavItem to="/analytics" icon={<BarChart3 className="h-4 w-4" />} label="Analytics" />
                        </NavGroup>

                        <NavGroup title="Management">
                            <NavItem to="/projects" icon={<Folder className="h-4 w-4" />} label="Projects" />
                            <NavItem to="/users" icon={<Users className="h-4 w-4" />} label="Users" />
                            <NavItem to="/roles" icon={<Shield className="h-4 w-4" />} label="Roles & Permissions" />
                        </NavGroup>

                        <NavGroup title="Configuration">
                            <NavItem to="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
                        </NavGroup>
                    </div>
                </div>
            </aside>

            {/* Main Layout Content */}
            <div className="ml-64 min-h-screen flex flex-col">
                {/* Header */}
                <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border bg-sidebar/80 px-8 backdrop-blur-md transition-all duration-300">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Breadcrumbs />
                    </div>

                    <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="h-8 w-8 rounded-full bg-sidebar border border-zinc-700 flex items-center justify-center text-xs font-bold text-sidebar-foreground cursor-pointer hover:bg-zinc-800 transition-colors"
                        >
                            US
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-10 right-0 w-48 rounded-md border border-zinc-800 bg-zinc-900 shadow-lg z-50 py-1">
                                <button
                                    onClick={() => logout()}
                                    className="cursor-pointer flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Sign out</span>
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-8 animate-fade-in">
                    <div className="mx-auto max-w-8xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

// Helpers

function NavGroup({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <h3 className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                {title}
            </h3>
            {children}
        </div>
    )
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                }`
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
}

function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Home</span>
            {pathnames.length > 0 && <ChevronRight className="h-4 w-4" />}
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return (
                    <div key={to} className="flex items-center gap-2">
                        <span className={last ? "font-medium text-foreground" : ""}>
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                        </span>
                        {!last && <ChevronRight className="h-4 w-4" />}
                    </div>
                );
            })}
        </div>
    );
}
