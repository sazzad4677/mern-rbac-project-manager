import { api } from "../../lib/axios";
import { DashboardStats } from "./dashboardType";

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
    const response = await api.get<{ data: DashboardStats }>("/dashboard/stats");
    return response.data.data;
};
