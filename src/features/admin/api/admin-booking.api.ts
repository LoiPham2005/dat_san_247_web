import apiClient from '@/lib/api/axios';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'PARTIAL';

export interface AdminBooking {
    id: string;
    booking_code: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    venue_name: string;
    court_name: string;
    booking_date: string;
    start_time: string;
    end_time: string;
    total_amount: number;
    status: BookingStatus;
    payment_status: PaymentStatus;
    payment_method: string;
    created_at: string;
    addons: Array<{
        id: string;
        name: string;
        quantity: number;
        price: number;
    }>;
}

export interface PaginatedAdminBookings {
    items: AdminBooking[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const adminBookingApi = {
    getBookings: async (params?: any): Promise<PaginatedAdminBookings> => {
        const response = await apiClient.get('/admin/bookings', { params });
        return {
            items: response.data?.data || [],
            meta: response.data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 }
        };
    },
    updateStatus: async (id: string, status: BookingStatus): Promise<AdminBooking> => {
        // Assuming there's a patch endpoint for admin to update status
        const response = await apiClient.patch(`/admin/bookings/${id}/status`, { status });
        return response.data?.data;
    }
};
