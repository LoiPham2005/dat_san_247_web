import { useQuery } from '@tanstack/react-query';
import { ownerDashboardApi } from '../api/owner-dashboard.api';

export const useOwnerDashboard = () => {
    return useQuery({
        queryKey: ['owner_dashboard_stats'],
        queryFn: ownerDashboardApi.getStats,
        refetchInterval: 60000 // Refresh every minute
    });
};
