export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';
export type WaitlistStatus = 'WAITING' | 'CONVERTED' | 'EXPIRED' | 'CANCELLED';
export type RecurringType = 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';

export interface OwnerBooking {
    id: string;
    booking_code: string;
    venue_id: string;
    court_id: string;
    court_name: string;
    customer_name: string;
    customer_phone: string;
    booking_date: string; // YYYY-MM-DD
    start_time: string; // YYYY-MM-DDTHH:mm:ssZ or HH:mm
    end_time: string;
    total_amount: number;
    status: BookingStatus;
    payment_status: PaymentStatus;
    created_at: string;
}

export interface OwnerWaitlist {
    id: string;
    venue_id: string;
    court_name: string;
    customer_name: string;
    customer_phone: string;
    booking_date: string;
    start_time: string;
    end_time: string;
    status: WaitlistStatus;
    created_at: string;
}

export interface OwnerRecurringBooking {
    id: string;
    venue_id: string;
    court_name: string;
    customer_name: string;
    customer_phone: string;
    repeat_type: RecurringType;
    start_date: string;
    end_date: string | null;
    start_time: string;
    end_time: string;
    is_active: boolean;
}

import apiClient from '@/lib/api/axios';

export const ownerBookingApi = {
    getBookings: async (venueId: string): Promise<OwnerBooking[]> => {
        const response = await apiClient.get(`/owner/bookings/${venueId}`);
        return response.data?.data || [];
    },

    updateBookingStatus: async (bookingId: string, status: BookingStatus): Promise<OwnerBooking> => {
        const response = await apiClient.patch(`/owner/bookings/${bookingId}/status`, { status });
        return response.data?.data;
    },

    getWaitlist: async (venueId: string): Promise<OwnerWaitlist[]> => {
        const response = await apiClient.get(`/owner/bookings/${venueId}/waitlist`);
        return response.data?.data || [];
    },

    getRecurringBookings: async (venueId: string): Promise<OwnerRecurringBooking[]> => {
        const response = await apiClient.get(`/owner/bookings/${venueId}/recurring`);
        return response.data?.data || [];
    }
};
