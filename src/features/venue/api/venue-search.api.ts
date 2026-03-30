export interface VenueSearchParams {
    keyword?: string;
    city?: string;
    district?: string;
    sport_type?: string;
    price_min?: number;
    price_max?: number;
    rating_min?: number;
    date?: string;
    time?: string;
}

export interface VenueDetail {
    id: string;
    slug: string;
    name: string;
    description: string;
    address: string;
    city: string;
    district: string;
    latitude: number;
    longitude: number;
    phone: string;
    email: string;
    average_rating: number;
    review_count: number;
    thumbnail_url: string;
    is_verified: boolean;
    sports: string[];
    min_price: number;
    amenities: { id: string; name: string; type: string; icon_url: string }[];
    courts: {
        id: string;
        name: string;
        description: string;
        surface_type: string;
        size: string;
        is_indoor: boolean;
        price_per_hour: number;
        thumbnail_url: string;
    }[];
    pricing_rules: {
        id: string;
        day_of_week: string;
        start_time: string;
        end_time: string;
        price: number;
    }[];
    reviews: {
        id: string;
        customer_name: string;
        rating: number;
        comment: string;
        created_at: string;
    }[];
}

export interface SearchHistory {
    id: string;
    keyword: string | null;
    filters: any;
    searched_at: string;
}

export interface FavoriteVenue {
    id: string;
    venue_id: string;
    venue: Partial<VenueDetail>;
    created_at: string;
}

const mockVenues: Partial<VenueDetail>[] = [
    {
        id: 'VN-1',
        slug: 'san-bong-vipe-cau-giay',
        name: 'Sân Bóng Vipe Cầu Giấy',
        description: 'Tổ hợp sân bóng mini cỏ nhân tạo hiện đại bậc nhất khu vực Cầu Giấy.',
        address: '15 Duy Tân, Dịch Vọng Hậu',
        city: 'Hà Nội',
        district: 'Cầu Giấy',
        latitude: 21.0285,
        longitude: 105.7820,
        average_rating: 4.8,
        review_count: 124,
        thumbnail_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600',
        is_verified: true,
        sports: ['FOOTBALL_5', 'FOOTBALL_7'],
        min_price: 300000,
    },
    {
        id: 'VN-2',
        slug: 'san-cau-long-thong-nhat',
        name: 'Sân Cầu Lông Thống Nhất',
        description: 'Nhà thi đấu cầu lông tiêu chuẩn quốc gia.',
        address: '138 Đào Duy Anh, Phường 9',
        city: 'Hồ Chí Minh',
        district: 'Phú Nhuận',
        latitude: 10.8012,
        longitude: 106.6775,
        average_rating: 4.5,
        review_count: 89,
        thumbnail_url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600',
        is_verified: true,
        sports: ['BADMINTON'],
        min_price: 150000,
    },
    {
        id: 'VN-3',
        slug: 'to-hop-tennis-my-dinh',
        name: 'Tổ hợp Tennis Mỹ Đình',
        description: 'Hệ thống 6 sân tennis bề mặt cứng tiêu chuẩn quốc tế, đèn chiếu sáng cao cấp.',
        address: 'Lê Đức Thọ, Mỹ Đình 2',
        city: 'Hà Nội',
        district: 'Nam Từ Liêm',
        latitude: 21.0205,
        longitude: 105.7735,
        average_rating: 4.9,
        review_count: 56,
        thumbnail_url: 'https://images.unsplash.com/photo-1595435066311-6677a23c347d?q=80&w=600',
        is_verified: true,
        sports: ['TENNIS'],
        min_price: 250000,
    },
    {
        id: 'VN-4',
        slug: 'san-bong-ro-phan-dinh-phung',
        name: 'Sân Bóng Rổ Phan Đình Phùng',
        description: 'Sân bóng rổ trong nhà chuyên nghiệp, sàn gỗ cao cấp.',
        address: '8 Võ Văn Tần, Võ Thị Sáu',
        city: 'Hồ Chí Minh',
        district: 'Quận 3',
        latitude: 10.7785,
        longitude: 106.6912,
        average_rating: 4.7,
        review_count: 210,
        thumbnail_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600',
        is_verified: true,
        sports: ['BASKETBALL'],
        min_price: 400000,
    },
    {
        id: 'VN-5',
        slug: 'clb-pickleball-hoan-kiem',
        name: 'CLB Pickleball Hoàn Kiếm',
        description: 'Xu hướng thể thao mới nhất tại trung tâm thủ đô.',
        address: 'Hàm Tử Quan, Chương Dương',
        city: 'Hà Nội',
        district: 'Hoàn Kiếm',
        latitude: 21.0272,
        longitude: 105.8596,
        average_rating: 4.6,
        review_count: 42,
        thumbnail_url: 'https://images.unsplash.com/photo-1698622170308-66487e35f992?q=80&w=600',
        is_verified: true,
        sports: ['PICKLEBALL'],
        min_price: 200000,
    },
    {
        id: 'VN-6',
        slug: 'san-bong-bach-khoa',
        name: 'Sân bóng Bách Khoa',
        description: 'Sân bóng lâu đời gắn liền với sinh viên thủ đô.',
        address: 'Tạ Quang Bửu, Bách Khoa',
        city: 'Hà Nội',
        district: 'Hai Bà Trưng',
        latitude: 21.0065,
        longitude: 105.8425,
        average_rating: 4.4,
        review_count: 350,
        thumbnail_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600',
        is_verified: false,
        sports: ['FOOTBALL_7'],
        min_price: 350000,
    }
];

let mockFavorites: FavoriteVenue[] = [
    { id: 'FAV-1', venue_id: 'VN-1', venue: mockVenues[0], created_at: new Date().toISOString() }
];

let mockSearchHistory: SearchHistory[] = [
    { id: 'SH-1', keyword: 'Sân bóng Cầu Giấy', filters: { sport: 'FOOTBALL' }, searched_at: new Date().toISOString() },
    { id: 'SH-2', keyword: 'Cầu lông Phú Nhuận', filters: {}, searched_at: new Date(Date.now() - 86400000).toISOString() }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

import apiClient from '@/lib/api/axios';

export interface VenueScheduleResult {
    venue: { id: string, name: string, address: string };
    date: string;
    courts: {
        id: string;
        name: string;
        type: string;
        price_per_hour: number;
        pricing_rules: {
            id: string;
            name: string;
            price: number;
            start_time: string;
            end_time: string;
            day_of_week: string | null;
        }[]
    }[];
    bookings: {
        court_id: string;
        start_time: string;
        end_time: string;
    }[];
}

export const venueSearchApi = {
    searchVenues: async (params: VenueSearchParams): Promise<any[]> => {
        const response = await apiClient.get<any>('/public/venues', { params });
        return response.data?.data || [];
    },

    getVenueDetail: async (slug: string): Promise<VenueDetail> => {
        const response = await apiClient.get(`/public/venues/detail/${slug}`);
        return response.data?.data;
    },

    getVenueSchedule: async (slug: string, date: string): Promise<VenueScheduleResult> => {
        const response = await apiClient.get(`/public/venues/${slug}/schedule?date=${date}`);
        return response.data?.data;
    },

    createBooking: async (data: any): Promise<any> => {
        const response = await apiClient.post('/customer/bookings', data);
        return response.data?.data;
    },

    createRecurringBooking: async (data: any): Promise<any> => {
        const response = await apiClient.post('/customer/bookings/recurring', data);
        return response.data?.data;
    },

    getFavorites: async (): Promise<FavoriteVenue[]> => {
        const response = await apiClient.get<any>('/public/venues/me/favorites');
        return response.data?.data || [];
    },

    toggleFavorite: async (venueId: string): Promise<boolean> => {
        const response = await apiClient.post<any>('/public/venues/me/favorites', { venue_id: venueId });
        return response.data?.data;
    },

    getSearchHistory: async (): Promise<SearchHistory[]> => {
        const response = await apiClient.get<any>('/public/venues/me/search-history');
        return response.data?.data || [];
    },

    clearSearchHistory: async (): Promise<void> => {
        await apiClient.delete('/public/venues/me/search-history');
    },

    saveSearchHistory: async (keyword: string, sportType?: string): Promise<void> => {
        if (!keyword.trim()) return;
        await apiClient.post('/public/venues/me/search-history', { keyword, sport_type: sportType });
    }
};
