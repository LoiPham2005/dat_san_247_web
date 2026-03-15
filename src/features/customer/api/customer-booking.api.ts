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
    booking_date: string; // YYYY-MM-DD
    start_time: string; // HH:mm
    end_time: string; // HH:mm
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
    day_of_week: number;
    start_time: string;
    end_time: string;
    start_date: string;
    end_date: string;
    status: 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'COMPLETED';
}

const mockBookings: CustomerBooking[] = [
    {
        id: 'BK-12345',
        booking_code: 'BK12345',
        check_in_code: '458921',
        venue_id: 'V-1',
        venue_name: 'Sân Bóng Vipe Cầu Giấy',
        venue_address: '15 Duy Tân, Dịch Vọng Hậu',
        court_id: 'C-1',
        court_name: 'Sân 1 (5 người)',
        booking_date: new Date().toISOString().split('T')[0],
        start_time: '18:00',
        end_time: '19:30',
        total_amount: 450000,
        sub_total: 450000,
        deposit_amount: 0,
        status: 'CONFIRMED',
        payment_status: 'PENDING',
        cancellation_reason: null,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        addons: [
            { id: 'AD-1', service_name: 'Nước suối Aquafina', quantity: 5, total_price: 50000 },
            { id: 'AD-2', service_name: 'Thuê áo bíp', quantity: 10, total_price: 0 }
        ]
    },
    {
        id: 'BK-67890',
        booking_code: 'BK67890',
        check_in_code: null,
        venue_id: 'V-2',
        venue_name: 'Sân Cầu Lông Thống Nhất',
        venue_address: '138 Đào Duy Anh',
        court_id: 'C-3',
        court_name: 'Sân A',
        booking_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        start_time: '20:00',
        end_time: '22:00',
        total_amount: 300000,
        sub_total: 300000,
        deposit_amount: 300000,
        status: 'COMPLETED',
        payment_status: 'PAID',
        cancellation_reason: null,
        created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
        addons: []
    },
    {
        id: 'BK-99999',
        booking_code: 'BK99999',
        check_in_code: null,
        venue_id: 'V-2',
        venue_name: 'Sân Bóng Hoa Lư',
        venue_address: 'Khu vực Bắc Từ Liêm',
        court_id: 'C-9',
        court_name: 'Sân Số 3',
        booking_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        start_time: '19:00',
        end_time: '20:30',
        total_amount: 250000,
        sub_total: 250000,
        deposit_amount: 50000,
        status: 'CANCELLED',
        payment_status: 'REFUNDED',
        cancellation_reason: 'Bận việc đột xuất',
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        addons: []
    }
];

const mockWaitlists: CustomerWaitlist[] = [
    {
        id: 'WL-1',
        venue_name: 'Sân Bóng Vipe Cầu Giấy',
        court_name: 'Sân 1',
        booking_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        start_time: '19:00',
        end_time: '20:30',
        priority: 1,
        status: 'WAITING',
        created_at: new Date().toISOString()
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const customerBookingApi = {
    getMyBookings: async (): Promise<CustomerBooking[]> => {
        await delay(600);
        return mockBookings;
    },
    getBookingDetail: async (id: string): Promise<CustomerBooking | null> => {
        await delay(400);
        return mockBookings.find(b => b.id === id) || null;
    },
    cancelBooking: async (id: string, reason: string): Promise<boolean> => {
        await delay(800);
        return true;
    },
    getMyWaitlists: async (): Promise<CustomerWaitlist[]> => {
        await delay(500);
        return mockWaitlists;
    },
    cancelWaitlist: async (id: string): Promise<boolean> => {
        await delay(500);
        return true;
    },
    getMyRecurringBookings: async (): Promise<CustomerRecurringBooking[]> => {
        await delay(500);
        return [];
    }
};
