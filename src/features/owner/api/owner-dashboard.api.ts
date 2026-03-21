import apiClient from '@/lib/api/axios';

export interface DashboardStats {
    venuesCount: number;
    pendingVenuesCount: number;
    todayBookingsCount: number;
    bookingsGrowth: number;
    todayRevenue: number;
    activeStaffCount: number;
    recentBookings: {
        id: string;
        bookingCode: string;
        venueName: string;
        courtName: string;
        customerName: string;
        totalAmount: number;
        status: string;
        paymentStatus: string;
        createdAt: string;
    }[];
}

export const ownerDashboardApi = {
    getStats: async (): Promise<DashboardStats> => {
        const response = await apiClient.get('/owner/venues/dashboard/stats');
        return response.data.data;
    }
};
