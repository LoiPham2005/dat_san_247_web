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

const mockBookings: OwnerBooking[] = [
    {
        id: 'B-1',
        booking_code: 'BK82910A',
        venue_id: 'VN-1',
        court_id: 'C-1',
        court_name: 'Sân 1 (5 người)',
        customer_name: 'Khách vãng lai',
        customer_phone: '0987123456',
        booking_date: new Date().toISOString().split('T')[0],
        start_time: '18:00',
        end_time: '19:00',
        total_amount: 300000,
        status: 'PENDING',
        payment_status: 'PENDING',
        created_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
        id: 'B-2',
        booking_code: 'BK99120B',
        venue_id: 'VN-1',
        court_id: 'C-2',
        court_name: 'Sân 2 (7 người)',
        customer_name: 'Đội FC Thăng Long',
        customer_phone: '0909123456',
        booking_date: new Date().toISOString().split('T')[0],
        start_time: '20:00',
        end_time: '21:30',
        total_amount: 750000,
        status: 'CONFIRMED',
        payment_status: 'PAID',
        created_at: new Date(Date.now() - 7200000).toISOString()
    }
];

const mockWaitlist: OwnerWaitlist[] = [
    {
        id: 'WL-1',
        venue_id: 'VN-1',
        court_name: 'Sân 2 (7 người)',
        customer_name: 'Lê Văn Khách',
        customer_phone: '0912111222',
        booking_date: new Date().toISOString().split('T')[0],
        start_time: '20:00',
        end_time: '21:30',
        status: 'WAITING',
        created_at: new Date(Date.now() - 1800000).toISOString()
    }
];

const mockRecurring: OwnerRecurringBooking[] = [
    {
        id: 'RB-1',
        venue_id: 'VN-1',
        court_name: 'Sân 1 (5 người)',
        customer_name: 'Nguyễn Cố Định',
        customer_phone: '0933444555',
        repeat_type: 'WEEKLY',
        start_date: new Date().toISOString().split('T')[0],
        end_date: null,
        start_time: '19:00',
        end_time: '20:30',
        is_active: true
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ownerBookingApi = {
    getBookings: async (venueId: string): Promise<OwnerBooking[]> => {
        await delay(500);
        return mockBookings.filter(b => b.venue_id === venueId);
    },

    updateBookingStatus: async (bookingId: string, status: BookingStatus): Promise<OwnerBooking> => {
        await delay(400);
        const idx = mockBookings.findIndex(b => b.id === bookingId);
        if (idx === -1) throw new Error("Booking not found");
        mockBookings[idx] = { ...mockBookings[idx], status };
        return mockBookings[idx];
    },

    getWaitlist: async (venueId: string): Promise<OwnerWaitlist[]> => {
        await delay(500);
        return mockWaitlist.filter(w => w.venue_id === venueId);
    },

    getRecurringBookings: async (venueId: string): Promise<OwnerRecurringBooking[]> => {
        await delay(500);
        return mockRecurring.filter(r => r.venue_id === venueId);
    }
};
