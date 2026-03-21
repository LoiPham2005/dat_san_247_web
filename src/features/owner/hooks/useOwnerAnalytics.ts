import { useQuery } from '@tanstack/react-query';
import { ownerAnalyticsApi } from '../api/owner-analytics.api';

export const useOwnerAnalytics = (venueId: string, periodType: string = '30_days', startDate?: string, endDate?: string) => {
    const summaryQuery = useQuery({
        queryKey: ['owner_analytics_summary', venueId, periodType, startDate, endDate],
        queryFn: () => ownerAnalyticsApi.getSummary(venueId, periodType, startDate, endDate),
        enabled: !!venueId
    });

    const revenueChartQuery = useQuery({
        queryKey: ['owner_analytics_revenue', venueId, periodType, startDate, endDate],
        queryFn: () => ownerAnalyticsApi.getRevenueChart(venueId, periodType, startDate, endDate),
        enabled: !!venueId
    });

    const bookingStatusQuery = useQuery({
        queryKey: ['owner_analytics_booking_status', venueId, periodType, startDate, endDate],
        queryFn: () => ownerAnalyticsApi.getBookingStatus(venueId, periodType, startDate, endDate),
        enabled: !!venueId
    });

    const popularCourtsQuery = useQuery({
        queryKey: ['owner_analytics_popular_courts', venueId, periodType, startDate, endDate],
        queryFn: () => ownerAnalyticsApi.getPopularCourts(venueId, periodType, startDate, endDate),
        enabled: !!venueId
    });

    return {
        summary: summaryQuery.data,
        isSummaryLoading: summaryQuery.isLoading,
        revenueChart: revenueChartQuery.data || [],
        isRevenueLoading: revenueChartQuery.isLoading,
        bookingStatus: bookingStatusQuery.data || [],
        isBookingStatusLoading: bookingStatusQuery.isLoading,
        popularCourts: popularCourtsQuery.data || [],
        isCourtsLoading: popularCourtsQuery.isLoading,
    };
};
