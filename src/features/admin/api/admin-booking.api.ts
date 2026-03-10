// import { BookingStatus, PaymentStatus } from '@prisma/client';

export type AdminBookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export interface AdminBooking {
    id: string;
    venue_name: string;
    court_name: string;
    customer_name: string;
    customer_phone: string;
    booking_date: string;
    start_time: string;
    end_time: string;
    total_price: number;
    status: AdminBookingStatus;
    payment_status: 'PENDING' | 'PAID' | 'REFUNDED' | 'FAILED' | 'PARTIAL_REFUND';
    payment_method: 'VNPAY' | 'MOMO' | 'WALLET' | 'CASH';
    refund_amount: number;
    created_at: string;
}

const mockBookings: AdminBooking[] = [
    {
        id: 'BKG-260310-001',
        venue_name: 'Sân Bóng Đá Chảo Lửa',
        court_name: 'Sân 5 Người - C1',
        customer_name: 'Phạm Đức Lợi',
        customer_phone: '0901234567',
        booking_date: '2026-03-12',
        start_time: '18:00',
        end_time: '19:30',
        total_price: 450000,
        status: 'CONFIRMED',
        payment_status: 'PAID',
        payment_method: 'VNPAY',
        refund_amount: 0,
        created_at: '2026-03-10T08:30:00Z'
    },
    {
        id: 'BKG-260310-002',
        venue_name: 'Cầu Lông Viettel',
        court_name: 'Sân 01',
        customer_name: 'Lê CSKH',
        customer_phone: '0988888888',
        booking_date: '2026-03-11',
        start_time: '06:00',
        end_time: '08:00',
        total_price: 200000,
        status: 'PENDING',
        payment_status: 'PENDING',
        payment_method: 'MOMO',
        refund_amount: 0,
        created_at: '2026-03-10T09:15:00Z'
    },
    {
        id: 'BKG-260309-005',
        venue_name: 'Sân Tennis Cỏ Mới',
        court_name: 'Sân Trung Tâm',
        customer_name: 'Khách Cố Chấp',
        customer_phone: '0955555555',
        booking_date: '2026-03-09',
        start_time: '19:00',
        end_time: '21:00',
        total_price: 600000,
        status: 'CANCELLED',
        payment_status: 'REFUNDED',
        payment_method: 'VNPAY',
        refund_amount: 600000,
        created_at: '2026-03-08T14:20:00Z'
    },
    {
        id: 'BKG-260308-012',
        venue_name: 'Sân Bóng Đá Chảo Lửa',
        court_name: 'Sân 7 Người - VIP',
        customer_name: 'Nguyễn Văn A',
        customer_phone: '0911222333',
        booking_date: '2026-03-08',
        start_time: '17:30',
        end_time: '19:00',
        total_price: 800000,
        status: 'COMPLETED',
        payment_status: 'PAID',
        payment_method: 'WALLET',
        refund_amount: 0,
        created_at: '2026-03-05T10:00:00Z'
    },
    {
        id: 'BKG-260308-015',
        venue_name: 'Trung Tâm Thể Thao Đa Năng',
        court_name: 'Sân Bóng Rổ B1',
        customer_name: 'Trần B',
        customer_phone: '0933444555',
        booking_date: '2026-03-08',
        start_time: '20:00',
        end_time: '22:00',
        total_price: 300000,
        status: 'NO_SHOW',
        payment_status: 'PAID',
        payment_method: 'MOMO',
        refund_amount: 0,
        created_at: '2026-03-06T11:45:00Z'
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const adminBookingApi = {
    getBookings: async (): Promise<AdminBooking[]> => {
        await delay(600);
        return [...mockBookings].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    adminCancelBooking: async (id: string, reason: string): Promise<AdminBooking> => {
        await delay(500);
        const booking = mockBookings.find(b => b.id === id);
        if (!booking) throw new Error("Booking not found");
        
        booking.status = 'CANCELLED';
        // Mock refund logic if PAID
        if (booking.payment_status === 'PAID') {
            booking.payment_status = 'REFUNDED';
            booking.refund_amount = booking.total_price;
        }
        
        return { ...booking };
    }
};
