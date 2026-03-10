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
    customer_name: string;
    customer_phone: string;
    venue_name: string;
    total_price: number;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    created_at: string;
}

const mockUsers: StaffUserInfo[] = [
    { id: 'US-L01', full_name: 'Nguyễn Quang Hải', email: 'hai.nq@gmx.com', phone: '0912111222', role_name: 'CUSTOMER', status: 'ACTIVE', created_at: '2025-10-10T00:00:00Z' },
    { id: 'US-L02', full_name: 'Trần Cảnh Chủ Sân', email: 'vua_san@mail.com', phone: '0988777666', role_name: 'VENUE_OWNER', status: 'BANNED', created_at: '2025-01-01T00:00:00Z' }
];

const mockVenues: StaffVenueInfo[] = [
    { id: 'VN-222', name: 'Sân Hoàng Gia', address: '123 Cầu Giấy', district: 'Cầu Giấy', city: 'Hà Nội', phone_number: '0243111222', status: 'APPROVED', active_courts_count: 5 },
    { id: 'VN-223', name: 'Nhà Thi Đấu Quận 7', address: '45 Nguyễn Văn Linh', district: 'Quận 7', city: 'TP.HCM', phone_number: '028555666', status: 'PENDING', active_courts_count: 0 }
];

const mockBookings: StaffBookingInfo[] = [
    { id: 'BK-0001', customer_name: 'Lê V.', customer_phone: '090123123', venue_name: 'Sân Cỏ Nhân Tạo X', total_price: 350000, status: 'CONFIRMED', created_at: '2026-03-10T12:00:00Z' },
    { id: 'BK-0002', customer_name: 'Khoa Pug', customer_phone: '0979888999', venue_name: 'Sân Hoàng Gia', total_price: 800000, status: 'CANCELLED', created_at: '2026-03-09T08:00:00Z' }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const staffInfoApi = {
    getUsers: async (): Promise<StaffUserInfo[]> => {
        await delay(400);
        return [...mockUsers];
    },
    getVenues: async (): Promise<StaffVenueInfo[]> => {
        await delay(350);
        return [...mockVenues];
    },
    getBookings: async (): Promise<StaffBookingInfo[]> => {
        await delay(500);
        return [...mockBookings].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
};
