import { useQuery } from "@tanstack/react-query";
import { Users, Folder, Shield } from "lucide-react";
import { fetchDashboardStats } from "../features/dashboard/dashboardApi";

export default function Dashboard() {
    const { data: stats, isLoading } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: fetchDashboardStats,
    });

    if (isLoading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back to your project overview.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <StatsCard
                    title="Total Team Members"
                    value={stats?.totalUsers || 0}
                    icon={<Users className="h-5 w-5 text-indigo-500" />}
                    description="Registered users"
                />
                <StatsCard
                    title="Active Projects"
                    value={stats?.activeProjects || 0}
                    icon={<Folder className="h-5 w-5 text-emerald-500" />}
                    description="Projects in progress"
                />
                <StatsCard
                    title="My Role"
                    value={stats?.myRole || "Unknown"}
                    icon={<Shield className="h-5 w-5 text-amber-500" />}
                    description="Current permissions"
                />
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon, description }: { title: string; value: string | number; icon: React.ReactNode; description: string }) {
    return (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 backdrop-blur-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
                <div className="p-2 rounded-full bg-zinc-50 dark:bg-zinc-800/50">
                    {icon}
                </div>
            </div>
            <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}
