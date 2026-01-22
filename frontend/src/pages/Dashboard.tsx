export default function Dashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-foreground">Dashboard</h1>
            <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-muted-foreground">
                    Welcome to your dashboard. This is a protected area.
                </p>
            </div>
        </div>
    );
}
