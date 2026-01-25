import { create } from 'zustand';

interface DashboardStats {
    totalRevenue: number;
    activeBookings: number;
    activeUsers: number;
    liveSessions: number;
    pendingVenues: number;
    openTickets: number;
    pendingPayouts: number;
}

interface TopVenue {
    venue_id: string;
    venue_name: string;
    totalRevenue: string;
}

interface TopCustomer {
    user_id: string;
    user_fullName: string;
    user_email: string;
    totalBookings: string;
}

interface SportDistribution {
    label: string;
    count: string;
}

interface DashboardState {
    adminStats: DashboardStats | null;
    revenueData: any[];
    topVenues: TopVenue[];
    topCustomers: TopCustomer[];
    sportDistribution: SportDistribution[];
    setAdminStats: (stats: DashboardStats) => void;
    setRevenueData: (data: any[]) => void;
    setTopVenues: (venues: TopVenue[]) => void;
    setTopCustomers: (customers: TopCustomer[]) => void;
    setSportDistribution: (distribution: SportDistribution[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    adminStats: null,
    revenueData: [],
    topVenues: [],
    topCustomers: [],
    sportDistribution: [],
    setAdminStats: (adminStats) => set({ adminStats }),
    setRevenueData: (revenueData) => set({ revenueData }),
    setTopVenues: (topVenues) => set({ topVenues }),
    setTopCustomers: (topCustomers) => set({ topCustomers }),
    setSportDistribution: (sportDistribution) => set({ sportDistribution }),
}));
