import apiClient from '@/lib/api/axios';

export interface StaffUserInfo {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    role_name: string;
    status: 'ACTIVE' | 'BANNED' | 'SUSPENDED';
    created_at: string;
}

export interface StaffVenueInfo {
    id: string;
    name: string;
    address: string;
    district: string;
    city: string;
    phone_number: string;
    status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'SUSPENDED';
    active_courts_count: number;
}

export interface StaffBookingInfo {
    id: string;
    booking_code: string;
    customer_name: string;
    customer_phone: string;
    venue_name: string;
    total_price: number;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    created_at: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    totalPages: number;
}

export const staffInfoApi = {
    getUsers: async (search?: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<StaffUserInfo>> => {
        const response = await apiClient.get('/admin/lookup/users', { params: { search, page, limit } });
        return {
            items: response.data.data,
            total: response.data.meta?.total || 0,
            totalPages: response.data.meta?.totalPages || 1
        };
    },
    getVenues: async (search?: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<StaffVenueInfo>> => {
        const response = await apiClient.get('/admin/lookup/venues', { params: { search, page, limit } });
        return {
            items: response.data.data,
            total: response.data.meta?.total || 0,
            totalPages: response.data.meta?.totalPages || 1
        };
    },
    getBookings: async (search?: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<StaffBookingInfo>> => {
        const response = await apiClient.get('/admin/lookup/bookings', { params: { search, page, limit } });
        return {
            items: response.data.data,
            total: response.data.meta?.total || 0,
            totalPages: response.data.meta?.totalPages || 1
        };
    }
};
