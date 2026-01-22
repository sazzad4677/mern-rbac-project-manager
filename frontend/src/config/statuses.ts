export const USER_STATUSES = ["ACTIVE", "PENDING", "INACTIVE"] as const;
export type UserStatus = typeof USER_STATUSES[number];

interface StatusConfig {
    label: string;
    className: string;
}

export const STATUS_CONFIG: Record<UserStatus, StatusConfig> = {
    ACTIVE: {
        label: "Active",
        className: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400"
    },
    PENDING: {
        label: "Pending",
        className: "bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400"
    },
    INACTIVE: {
        label: "Inactive",
        className: "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400"
    }
};
