export type VenueStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export interface AdminVenue {
    id: string;
    name: string;
    city: string;
    district: string;
    owner_name: string;
    owner_email: string;
    status: VenueStatus;
    is_featured: boolean;
    featured_until: string | null;
    commission_rate: number;
    rating: number;
    total_reviews: number;
    created_at: string;
}

const mockVenues: AdminVenue[] = [
    {
        id: 'v1',
        name: 'Sân Bóng Đá Chảo Lửa',
        city: 'TP.HCM',
        district: 'Quận Tân Bình',
        owner_name: 'Nguyễn Văn Chủ',
        owner_email: 'owner@gmail.com',
        status: 'APPROVED',
        is_featured: true,
        featured_until: '2026-12-31T23:59:59Z',
        commission_rate: 10,
        rating: 4.8,
        total_reviews: 120,
        created_at: '2026-02-01T10:00:00Z'
    },
    {
        id: 'v2',
        name: 'Cầu Lông Viettel',
        city: 'TP.HCM',
        district: 'Quận 10',
        owner_name: 'Trần Kỹ Thuật',
        owner_email: 'admin@datsan247.vn',
        status: 'APPROVED',
        is_featured: false,
        featured_until: null,
        commission_rate: 8.5,
        rating: 4.9,
        total_reviews: 84,
        created_at: '2026-02-05T09:00:00Z'
    },
    {
        id: 'v3',
        name: 'Sân Tennis Cỏ Mới',
        city: 'Hà Nội',
        district: 'Cầu Giấy',
        owner_name: 'Lê CSKH',
        owner_email: 'staff01@datsan247.vn',
        status: 'PENDING',
        is_featured: false,
        featured_until: null,
        commission_rate: 10,
        rating: 0,
        total_reviews: 0,
        created_at: '2026-03-08T15:30:00Z'
    },
    {
        id: 'v4',
        name: 'Trung Tâm Thể Thao Đa Năng',
        city: 'Đà Nẵng',
        district: 'Hải Châu',
        owner_name: 'Minh Mới Đăng Ký',
        owner_email: 'newuser@gmail.com',
        status: 'REJECTED',
        is_featured: false,
        featured_until: null,
        commission_rate: 15,
        rating: 4.0,
        total_reviews: 12,
        created_at: '2026-01-15T08:00:00Z'
    },
    {
        id: 'v5',
        name: 'Sân Bóng Mini Gian Lận',
        city: 'Hà Nội',
        district: 'Đống Đa',
        owner_name: 'Khách Cố Chấp',
        owner_email: 'baduser@gmail.com',
        status: 'SUSPENDED',
        is_featured: false,
        featured_until: null,
        commission_rate: 12,
        rating: 2.1,
        total_reviews: 45,
        created_at: '2025-11-20T14:00:00Z'
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const adminVenueApi = {
    getVenues: async (): Promise<AdminVenue[]> => {
        await delay(500);
        return [...mockVenues].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    updateStatus: async (id: string, status: VenueStatus): Promise<AdminVenue> => {
        await delay(400);
        const venue = mockVenues.find(v => v.id === id);
        if (!venue) throw new Error("Venue not found");
        venue.status = status;
        return { ...venue };
    },
    updateFeatured: async (id: string, is_featured: boolean): Promise<AdminVenue> => {
        await delay(400);
        const venue = mockVenues.find(v => v.id === id);
        if (!venue) throw new Error("Venue not found");
        venue.is_featured = is_featured;
        // Mock set until next month
        venue.featured_until = is_featured ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null;
        return { ...venue };
    },
    updateCommissionRate: async (id: string, rate: number): Promise<AdminVenue> => {
        await delay(300);
        const venue = mockVenues.find(v => v.id === id);
        if (!venue) throw new Error("Venue not found");
        venue.commission_rate = rate;
        return { ...venue };
    }
};
