import apiClient from '@/lib/api/axios';

export interface OwnerAnalyticsSummary {
    totalRevenue: number;
    totalBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    totalCustomers: number;
    averageRating: number;
    revenueGrowth: number; // percentage vs previous period
    bookingsGrowth: number;
}

export interface RevenueChartData {
    date: string; // YYYY-MM-DD
    revenue: number;
    bookings: number;
}

export interface BookingStatusData {
    name: string;
    value: number;
    color: string;
}

export interface PopularCourtData {
    courtId: string;
    courtName: string;
    bookingCount: number;
    revenue: number;
}

// Mock Data
const mockSummary: OwnerAnalyticsSummary = {
    totalRevenue: 45500000,
    totalBookings: 156,
    completedBookings: 120,
    cancelledBookings: 15,
    totalCustomers: 89,
    averageRating: 4.8,
    revenueGrowth: 15.4,
    bookingsGrowth: 8.2
};

const mockRevenueChart: RevenueChartData[] = [
    { date: '2026-03-10', revenue: 1500000, bookings: 5 },
    { date: '2026-03-11', revenue: 2100000, bookings: 7 },
    { date: '2026-03-12', revenue: 1800000, bookings: 6 },
    { date: '2026-03-13', revenue: 3200000, bookings: 12 },
    { date: '2026-03-14', revenue: 4500000, bookings: 18 },
    { date: '2026-03-15', revenue: 5100000, bookings: 22 },
    { date: '2026-03-16', revenue: 2000000, bookings: 8 },
    { date: '2026-03-17', revenue: 2500000, bookings: 9 },
    { date: '2026-03-18', revenue: 2800000, bookings: 10 },
    { date: '2026-03-19', revenue: 3900000, bookings: 15 },
    { date: '2026-03-20', revenue: 5500000, bookings: 20 },
    { date: '2026-03-21', revenue: 6200000, bookings: 24 },
];

const mockBookingStatus: BookingStatusData[] = [
    { name: 'Đã hoàn thành', value: 120, color: '#10b981' }, // Emerald 500
    { name: 'Khách không đến', value: 8, color: '#f59e0b' }, // Amber 500
    { name: 'Đã hủy', value: 15, color: '#ef4444' }, // Red 500
    { name: 'Chờ xác nhận', value: 5, color: '#6366f1' }, // Indigo 500
    { name: 'Đã xác nhận', value: 8, color: '#3b82f6' } // Blue 500
];

const mockPopularCourts: PopularCourtData[] = [
    { courtId: 'C-1', courtName: 'Sân số 1 (7 người)', bookingCount: 45, revenue: 18500000 },
    { courtId: 'C-2', courtName: 'Sân số 2 (7 người)', bookingCount: 42, revenue: 17200000 },
    { courtId: 'C-3', courtName: 'Sân VIP (5 người)', bookingCount: 35, revenue: 12500000 },
    { courtId: 'C-4', courtName: 'Sân số 4 (5 người)', bookingCount: 20, revenue: 6800000 },
    { courtId: 'C-5', courtName: 'Sân Cỏ Phụ (5 người)', bookingCount: 14, revenue: 4500000 },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ownerAnalyticsApi = {
    getSummary: async (venueId: string, periodType: string = '30_days', startDate?: string, endDate?: string): Promise<OwnerAnalyticsSummary> => {
        // Implement API call here later
        await delay(500);
        return mockSummary;
    },

    getRevenueChart: async (venueId: string, periodType: string = '30_days', startDate?: string, endDate?: string): Promise<RevenueChartData[]> => {
        await delay(600);
        return mockRevenueChart;
    },

    getBookingStatus: async (venueId: string, periodType: string = '30_days', startDate?: string, endDate?: string): Promise<BookingStatusData[]> => {
        await delay(400);
        return mockBookingStatus;
    },

    getPopularCourts: async (venueId: string, periodType: string = '30_days', startDate?: string, endDate?: string): Promise<PopularCourtData[]> => {
        await delay(500);
        return mockPopularCourts;
    }
};
