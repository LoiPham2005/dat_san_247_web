import { UserRole } from "@/types/auth.types";

export const MOCK_USERS = [
    {
        id: '1',
        name: 'Nguyen Van A',
        email: 'admin@datsan247.com',
        phone: '0901234567',
        role: UserRole.ADMIN,
        status: 'ACTIVE',
        createdAt: '2023-12-01T10:00:00Z',
        avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random',
    },
    {
        id: '2',
        name: 'Tran Thi B',
        email: 'owner@datsan247.com',
        phone: '0909876543',
        role: UserRole.OWNER,
        status: 'ACTIVE',
        createdAt: '2024-01-15T08:30:00Z',
        avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=random',
        venueCount: 3,
    },
    {
        id: '3',
        name: 'Lê Văn Staff',
        email: 'staff@datsan247.com',
        phone: '0912345678',
        role: UserRole.STAFF,
        status: 'ACTIVE',
        createdAt: '2024-02-20T09:15:00Z',
        avatar: 'https://ui-avatars.com/api/?name=Le+Van+C&background=random',
    },
    {
        id: '6',
        name: 'Trần Văn Nhân Viên',
        email: 'venue_staff@datsan247.com',
        phone: '0988001122',
        role: UserRole.VENUE_STAFF,
        status: 'ACTIVE',
        createdAt: '2024-03-01T08:00:00Z',
        avatar: 'https://ui-avatars.com/api/?name=Tran+Van+Staff&background=random',
    },
    {
        id: '4',
        name: 'Pham Van D',
        email: 'customer@datsan247.com',
        phone: '0987654321',
        role: UserRole.CUSTOMER,
        status: 'PENDING',
        createdAt: '2024-03-10T14:20:00Z',
        avatar: 'https://ui-avatars.com/api/?name=Pham+Van+D&background=random',
        bookings: 12,
        points: 450,
    },
    {
        id: '5',
        name: 'Hoang Thi E',
        email: 'customer2@datsan247.com',
        phone: '0933445566',
        role: UserRole.CUSTOMER,
        status: 'BLOCKED',
        createdAt: '2024-03-12T11:00:00Z',
        avatar: 'https://ui-avatars.com/api/?name=Hoang+Thi+E&background=random',
        bookings: 0,
        points: 0,
    },
    // Generate more mock users
    ...Array.from({ length: 20 }).map((_, i) => ({
        id: `m${i}`,
        name: `User Mock ${i + 1}`,
        email: `user${i}@example.com`,
        phone: `09${Math.floor(Math.random() * 100000000)}`,
        role: Math.random() > 0.7 ? UserRole.OWNER : UserRole.CUSTOMER,
        status: Math.random() > 0.9 ? 'BLOCKED' : 'ACTIVE',
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        avatar: `https://ui-avatars.com/api/?name=User+Mock+${i}&background=random`,
    }))
];

export const MOCK_VENUES = [
    {
        id: 'v1',
        name: 'Sân bóng đá Mini 247',
        address: '123 Đường 3/2, Quận 10, TP.HCM',
        owner: 'Tran Thi B',
        type: 'Soccer',
        status: 'ACTIVE',
        price: '300,000đ - 500,000đ',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=60',
        rating: 4.8,
        reviews: 124,
    },
    {
        id: 'v2',
        name: 'Tennis Club Landmark',
        address: '208 Nguyễn Hữu Cảnh, Bình Thạnh',
        owner: 'Nguyen Van A',
        type: 'Tennis',
        status: 'PENDING',
        price: '200,000đ - 400,000đ',
        image: 'https://images.unsplash.com/photo-1595435063998-fdf586146c9c?w=800&auto=format&fit=crop&q=60',
        rating: 4.5,
        reviews: 56,
    },
    {
        id: 'v3',
        name: 'Cầu lông Đa Năng',
        address: '45 Lê Lợi, Quận 1, TP.HCM',
        owner: 'Le Van C',
        type: 'Badminton',
        status: 'ACTIVE',
        price: '100,000đ - 150,000đ',
        image: 'https://images.unsplash.com/photo-1626225967045-9410dd99eaa6?w=800&auto=format&fit=crop&q=60',
        rating: 4.2,
        reviews: 89,
    },
    {
        id: 'v4',
        name: 'Hồ bơi Skyview',
        address: '78 Phổ Quang, Tân Bình',
        owner: 'Hoang Thi E',
        type: 'Swimming',
        status: 'REJECTED',
        price: '50,000đ - 100,000đ',
        image: 'https://images.unsplash.com/photo-1534126416832-a88fdf2911c2?w=800&auto=format&fit=crop&q=60',
        rating: 4.9,
        reviews: 210,
    }
];

export const MOCK_BOOKINGS = [
    {
        id: 'BK-001',
        customer: 'Nguyen Van A',
        venue: 'Sân bóng đá Mini 247',
        date: '2024-03-22',
        time: '18:00 - 19:00',
        amount: '450,000đ',
        status: 'COMPLETED',
        payment: 'PAID',
    },
    {
        id: 'BK-002',
        customer: 'Pham Van D',
        venue: 'Tennis Club Landmark',
        date: '2024-03-23',
        time: '08:00 - 10:00',
        amount: '800,000đ',
        status: 'CONFIRMED',
        payment: 'PENDING',
    },
    {
        id: 'BK-003',
        customer: 'Hoang Thi E',
        venue: 'Cầu lông Đa Năng',
        date: '2024-03-22',
        time: '19:00 - 20:00',
        amount: '120,000đ',
        status: 'CANCELLED',
        payment: 'REFUNDED',
    }
];

export const MOCK_PROMOTIONS = [
    {
        id: 'VOU-001',
        name: 'SUMMER SALES 2024',
        code: 'SUMMER24',
        type: 'PERCENTAGE',
        value: 15,
        status: 'ACTIVE',
        usageLimit: 1000,
        usedCount: 450,
        expiry: '2024-08-31',
    },
    {
        id: 'VOU-002',
        name: 'NEW USER GIFT',
        code: 'WELCOME24',
        type: 'FIXED_AMOUNT',
        value: 50000,
        status: 'ACTIVE',
        usageLimit: 500,
        usedCount: 120,
        expiry: '2024-12-31',
    },
    {
        id: 'VOU-003',
        name: 'WEEKEND FUN',
        code: 'WEEKEND',
        type: 'PERCENTAGE',
        value: 10,
        status: 'EXPIRED',
        usageLimit: 200,
        usedCount: 200,
        expiry: '2024-02-28',
    }
];

export const MOCK_REVIEWS = [
    {
        id: 'REV-001',
        customer: 'Nguyen Van A',
        venue: 'Sân bóng đá Mini 247',
        rating: 5,
        comment: 'Sân rất đẹp, chất lượng cỏ tuyệt vời. Nhân viên nhiệt tình!',
        status: 'PUBLISHED',
        createdAt: '2024-03-24T10:00:00Z',
    },
    {
        id: 'REV-002',
        customer: 'Tran Thi B',
        venue: 'Tennis Club Landmark',
        rating: 2,
        comment: 'Giá hơi cao mà sân chưa được sạch lắm. Mong cải thiện.',
        status: 'PENDING',
        createdAt: '2024-03-24T11:30:00Z',
    },
    {
        id: 'REV-003',
        customer: 'Le Van C',
        venue: 'Cầu lông Đa Năng',
        rating: 4,
        comment: 'Sân ổn, thoáng mát. Vị trí hơi khó tìm một chút.',
        status: 'HIDDEN',
        createdAt: '2024-03-23T09:15:00Z',
    }
];

export const MOCK_NOTIFICATIONS = [
    {
        id: 'NOT-001',
        title: 'Bảo trì hệ thống',
        message: 'Hệ thống sẽ bảo trì từ 00:00 đến 02:00 ngày 25/03/2024.',
        type: 'SYSTEM',
        recipient: 'ALL',
        sentAt: '2024-03-22T15:00:00Z',
        stats: { open: 4500, click: 1200 }
    },
    {
        id: 'NOT-002',
        title: 'Khuyến mãi đặc biệt dành cho bạn',
        message: 'Nhận ngay voucher giảm 20% khi đặt sân vào cuối tuần này.',
        type: 'MARKETING',
        recipient: 'VIP Customers',
        sentAt: '2024-03-21T09:00:00Z',
        stats: { open: 800, click: 250 }
    }
];

export const MOCK_OWNER_STATS = {
    revenue: {
        daily: 1200000,
        weekly: 8500000,
        monthly: 32000000
    },
    bookings: {
        pending: 5,
        confirmed: 12,
        completed: 45
    },
    occupancyRate: 68.5,
    rating: 4.8
};

export const MOCK_OWNER_VENUES = [
    {
        id: 'ov1',
        name: 'Sân bóng đá Mini 247',
        address: '123 Đường 3/2, Quận 10, TP.HCM',
        type: 'Soccer',
        status: 'ACTIVE',
        revenue: '15,200,000đ',
        bookings: 45,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=60'
    },
    {
        id: 'ov2',
        name: 'Sân Tennis Vàng',
        address: '456 Lê Văn Sỹ, Quận 3, TP.HCM',
        type: 'Tennis',
        status: 'MAINTENANCE',
        revenue: '8,400,000đ',
        bookings: 22,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1595435063998-fdf586146c9c?w=800&auto=format&fit=crop&q=60'
    }
];
