import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/lib/api/services/dashboard.service';
import { useDashboardStore } from '@/lib/store/dashboard.store';
import { useEffect } from 'react';

export const useAdminDashboard = () => {
    const {
        setAdminStats,
        setRevenueData,
        setTopVenues,
        setTopCustomers,
        setSportDistribution
    } = useDashboardStore();

    const overviewQuery = useQuery({
        queryKey: ['admin-dashboard-overview'],
        queryFn: dashboardService.getAdminOverview,
    });

    const revenueQuery = useQuery({
        queryKey: ['admin-dashboard-revenue'],
        queryFn: dashboardService.getAdminRevenueChart,
    });

    const topVenuesQuery = useQuery({
        queryKey: ['admin-dashboard-top-venues'],
        queryFn: dashboardService.getAdminTopVenues,
    });

    const topCustomersQuery = useQuery({
        queryKey: ['admin-dashboard-top-customers'],
        queryFn: dashboardService.getAdminTopCustomers,
    });

    const sportDistQuery = useQuery({
        queryKey: ['admin-dashboard-sport-dist'],
        queryFn: dashboardService.getAdminSportDistribution,
    });

    useEffect(() => {
        if (overviewQuery.data) {
            setAdminStats({
                totalRevenue: overviewQuery.data.totalRevenue || 0,
                activeBookings: overviewQuery.data.bookingsToday || 0,
                activeUsers: overviewQuery.data.totalUsers || 0,
                liveSessions: Math.floor(Math.random() * 100) + 50,
                pendingVenues: overviewQuery.data.pendingVenues || 0,
                openTickets: overviewQuery.data.openTickets || 0,
                pendingPayouts: overviewQuery.data.pendingPayouts || 0,
            });
        }
    }, [overviewQuery.data, setAdminStats]);

    useEffect(() => {
        if (revenueQuery.data) setRevenueData(revenueQuery.data);
    }, [revenueQuery.data, setRevenueData]);

    useEffect(() => {
        if (topVenuesQuery.data) setTopVenues(topVenuesQuery.data);
    }, [topVenuesQuery.data, setTopVenues]);

    useEffect(() => {
        if (topCustomersQuery.data) setTopCustomers(topCustomersQuery.data);
    }, [topCustomersQuery.data, setTopCustomers]);

    useEffect(() => {
        if (sportDistQuery.data) setSportDistribution(sportDistQuery.data);
    }, [sportDistQuery.data, setSportDistribution]);

    return {
        isLoading: overviewQuery.isLoading || revenueQuery.isLoading || topVenuesQuery.isLoading || topCustomersQuery.isLoading || sportDistQuery.isLoading,
        isError: overviewQuery.isError || revenueQuery.isError || topVenuesQuery.isError || topCustomersQuery.isError || sportDistQuery.isError,
        refetch: () => {
            overviewQuery.refetch();
            revenueQuery.refetch();
            topVenuesQuery.refetch();
            topCustomersQuery.refetch();
            sportDistQuery.refetch();
        }
    };
};
