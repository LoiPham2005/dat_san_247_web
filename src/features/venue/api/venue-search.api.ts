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
        description: 'Tổ hợp sân bóng mini cỏ nhân tạo hiện đại bậc nhất khu vực Cầu Giấy. Hệ thống đèn LED chiếu sáng tiêu chuẩn. Có khu vực giải khát, vệ sinh sạch sẽ.',
        address: '15 Duy Tân, Dịch Vọng Hậu',
        city: 'Hà Nội',
        district: 'Cầu Giấy',
        average_rating: 4.8,
        review_count: 124,
        thumbnail_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600',
        is_verified: true,
        sports: ['FOOTBALL_5', 'FOOTBALL_7'],
        min_price: 300000,
        amenities: [
            { id: '1', name: 'Wifi Miễn Phí', type: 'WIFI', icon_url: '' },
            { id: '2', name: 'Bãi Đỗ Xe (Có che)', type: 'PARKING', icon_url: '' },
            { id: '3', name: 'Căn-tin', type: 'CAFE', icon_url: '' }
        ],
        courts: [
            { id: 'C-1', name: 'Sân 1 (5 người)', description: 'Mặt cỏ nhân tạo cao cấp', surface_type: 'ARTIFICIAL_GRASS', size: '20x40m', is_indoor: false, price_per_hour: 300000, thumbnail_url: '' },
            { id: 'C-2', name: 'Sân 2 (7 người)', description: 'Phù hợp giải đấu', surface_type: 'ARTIFICIAL_GRASS', size: '30x50m', is_indoor: false, price_per_hour: 500000, thumbnail_url: '' }
        ]
    },
    {
        id: 'VN-2',
        slug: 'san-cau-long-thong-nhat',
        name: 'Sân Cầu Lông Thống Nhất',
        description: 'Nhà thi đấu cầu lông tiêu chuẩn quốc gia. Không gian thoáng, trần cao 12m, không bị chói đèn.',
        address: '138 Đào Duy Anh, Phường 9',
        city: 'Hồ Chí Minh',
        district: 'Phú Nhuận',
        average_rating: 4.5,
        review_count: 89,
        thumbnail_url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600',
        is_verified: true,
        sports: ['BADMINTON'],
        min_price: 150000,
        amenities: [
            { id: '4', name: 'Thảm BWF', type: 'SURFACE', icon_url: '' },
            { id: '5', name: 'Nhà Tắm', type: 'SHOWER', icon_url: '' }
        ],
        courts: [
            { id: 'C-3', name: 'Sân A', description: 'Gần quầy lễ tân', surface_type: 'WOOD', size: 'Tiêu chuẩn', is_indoor: true, price_per_hour: 150000, thumbnail_url: '' },
            { id: 'C-4', name: 'Sân B', description: 'Góc khuất, yên tĩnh', surface_type: 'WOOD', size: 'Tiêu chuẩn', is_indoor: true, price_per_hour: 150000, thumbnail_url: '' }
        ]
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

export const venueSearchApi = {
    searchVenues: async (params: VenueSearchParams): Promise<any[]> => {
        await delay(600);
        let results = [...mockVenues] as any;
        if (params.keyword) {
            const kw = params.keyword.toLowerCase();
            results = results.filter((v: any) => v.name.toLowerCase().includes(kw) || v.district.toLowerCase().includes(kw));
        }
        if (params.sport_type) {
            results = results.filter((v: any) => v.sports.includes(params.sport_type));
        }
        return results;
    },
    
    getVenueDetail: async (slug: string): Promise<VenueDetail | null> => {
        await delay(500);
        return mockVenues.find(v => v.slug === slug) as VenueDetail || null;
    },

    getFavorites: async (): Promise<FavoriteVenue[]> => {
        await delay(400);
        return mockFavorites;
    },

    toggleFavorite: async (venueId: string): Promise<boolean> => {
        await delay(300);
        const exists = mockFavorites.find(f => f.venue_id === venueId);
        if (exists) {
            mockFavorites = mockFavorites.filter(f => f.venue_id !== venueId);
            return false; // Removed
        } else {
            const venue = mockVenues.find(v => v.id === venueId);
            if (venue) {
                mockFavorites.push({ id: `FAV-${Date.now()}`, venue_id: venueId, venue, created_at: new Date().toISOString() });
            }
            return true; // Added
        }
    },

    getSearchHistory: async (): Promise<SearchHistory[]> => {
        await delay(300);
        return mockSearchHistory;
    },

    clearSearchHistory: async (): Promise<void> => {
        await delay(300);
        mockSearchHistory = [];
    }
};
