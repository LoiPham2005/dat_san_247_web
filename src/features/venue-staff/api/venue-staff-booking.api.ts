import apiClient from '@/lib/api/axios';
import { BookingStatus } from '@/features/owner/api/owner-booking.api';

export interface VenueStaffBooking {
    id: string;
    booking_code: string;
    court_name: string;
    customer_name: string;
    customer_phone: string;
    booking_date: string;
    start_time: string;
    end_time: string;
    total_amount: number;
    status: BookingStatus;
    payment_status: string;
    payment_method: string;
}

export interface VenueStaffScheduleParams {
    venue_id: string;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    date?: string;
}

export interface VenueStaffScheduleResponse {
    data: VenueStaffBooking[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const venueStaffBookingApi = {
    getSchedule: async (params: VenueStaffScheduleParams): Promise<VenueStaffScheduleResponse> => {
        const response = await apiClient.get(`/bookings/venue-staff/schedule`, {
            params
        });
        return response.data.data;
    },

    updateStatus: async (id: string, status: BookingStatus): Promise<VenueStaffBooking> => {
        const response = await apiClient.patch(`/bookings/venue-staff/${id}/status`, { status });
        return response.data.data;
    }
};
