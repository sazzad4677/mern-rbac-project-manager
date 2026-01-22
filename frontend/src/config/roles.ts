export const ROLES = ["ADMIN", "MANAGER", "STAFF"] as const;
export type Role = typeof ROLES[number];

export const ROLE_LABELS: Record<Role, string> = {
    ADMIN: "Admin (Manage Users & Edit Projects)",
    MANAGER: "Manager (Create & View Projects)",
    STAFF: "Staff (Create & View Projects)",
};