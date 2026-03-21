import apiClient from '@/lib/api/axios';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';
export type WaitlistStatus = 'WAITING' | 'CONVERTED' | 'EXPIRED' | 'CANCELLED';

export interface CustomerBooking {
    id: string;
    booking_code: string;
    check_in_code: string | null;
    venue_id: string;
    venue_name: string;
    venue_address: string;
    court_id: string;
    court_name: string;
    booking_date: string; 
    start_time: string; 
    end_time: string; 
    total_amount: number;
    sub_total: number;
    deposit_amount: number;
    status: BookingStatus;
    payment_status: PaymentStatus;
    cancellation_reason: string | null;
    created_at: string;
    addons: {
        id: string;
        service_name: string;
        quantity: number;
        total_price: number;
    }[];
}

export interface CustomerWaitlist {
    id: string;
    venue_name: string;
    court_name: string;
    booking_date: string;
    start_time: string;
    end_time: string;
    priority: number;
    status: WaitlistStatus;
    created_at: string;
}

export interface CustomerRecurringBooking {
    id: string;
    venue_name: string;
    court_name: string;
    repeat_type: 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
    days: string[]; // e.g., ["MONDAY", "WEDNESDAY"]
    start_time: string;
    end_time: string;
    start_date: string;
    end_date: string | null;
    is_active: boolean;
}

export const customerBookingApi = {
    getMyBookings: async (): Promise<CustomerBooking[]> => {
        const response = await apiClient.get('/customer/bookings');
        return response.data?.data || [];
    },
    getBookingDetail: async (id: string): Promise<CustomerBooking | null> => {
        const response = await apiClient.get(`/customer/bookings/${id}`);
        return response.data?.data || null;
    },
    cancelBooking: async (id: string, reason: string): Promise<boolean> => {
        await apiClient.delete(`/customer/bookings/${id}`, { data: { reason } });
        return true;
    },
    getMyWaitlists: async (): Promise<CustomerWaitlist[]> => {
        const response = await apiClient.get('/customer/bookings/waitlists');
        return response.data?.data || [];
    },
    cancelWaitlist: async (id: string): Promise<boolean> => {
        await apiClient.delete(`/customer/bookings/waitlists/${id}`);
        return true;
    },
    getMyRecurringBookings: async (): Promise<CustomerRecurringBooking[]> => {
        const response = await apiClient.get('/customer/bookings/recurring');
        return response.data?.data || [];
    },
    createReview: async (data: { booking_id: string, rating: number, comment?: string }): Promise<any> => {
        const response = await apiClient.post('/customer/reviews', data);
        return response.data?.data;
    }
};
