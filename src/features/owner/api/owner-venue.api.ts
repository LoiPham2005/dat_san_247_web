export type VenueStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface OwnerVenue {
    id: string;
    name: string;
    description: string | null;
    address: string;
    city: string;
    district: string;
    phone: string | null;
    status: VenueStatus;
    auto_accept_bookings: boolean;
    min_booking_hours: number;
    max_booking_hours: number;
    fb_url: string | null;
    instagram_url: string | null;
    rejection_reason: string | null;
}

export interface VenueVerification {
    id: string;
    venue_id: string;
    business_license_url: string;
    id_card_front_url: string;
    id_card_back_url: string;
    status: VerificationStatus;
}

export interface VenueOperatingHour {
    id: string;
    venue_id: string;
    day_of_week: DayOfWeek;
    opening_time: string; // HH:mm format
    closing_time: string;
    is_closed: boolean;
}

export interface VenueException {
    id: string;
    venue_id: string;
    date: string; // YYYY-MM-DD
    is_closed: boolean;
    open_time: string | null;
    close_time: string | null;
    reason: string | null;
}

// MOCK DATA
const mockVenues: OwnerVenue[] = [
    {
        id: 'VN-1',
        name: 'Sân Cỏ Nhân Tạo Thanh Xuân',
        description: 'Tổ hợp 5 sân cỏ nhân tạo đạt chuẩn FIFA.',
        address: '123 Khuất Duy Tiến',
        city: 'Hà Nội',
        district: 'Thanh Xuân',
        phone: '0987654321',
        status: 'APPROVED',
        auto_accept_bookings: true,
        min_booking_hours: 1,
        max_booking_hours: 4,
        fb_url: 'facebook.com/san_thanh_xuan',
        instagram_url: null,
        rejection_reason: null
    },
    {
        id: 'VN-2',
        name: 'Sân Cầu Lông Đống Đa',
        description: 'Phòng tập máy lạnh, trần cao 12m',
        address: '45 Tôn Đức Thắng',
        city: 'Hà Nội',
        district: 'Đống Đa',
        phone: '0901234567',
        status: 'PENDING',
        auto_accept_bookings: false,
        min_booking_hours: 1,
        max_booking_hours: 3,
        fb_url: null,
        instagram_url: null,
        rejection_reason: null
    }
];

const mockOperatingHours: Record<string, VenueOperatingHour[]> = {
    'VN-1': [
        { id: 'OH-1', venue_id: 'VN-1', day_of_week: 'MONDAY', opening_time: '06:00', closing_time: '23:00', is_closed: false },
        { id: 'OH-2', venue_id: 'VN-1', day_of_week: 'TUESDAY', opening_time: '06:00', closing_time: '23:00', is_closed: false },
        { id: 'OH-3', venue_id: 'VN-1', day_of_week: 'SUNDAY', opening_time: '07:00', closing_time: '22:00', is_closed: false },
    ]
};

const mockVerifications: Record<string, VenueVerification> = {
    'VN-1': {
        id: 'VER-1',
        venue_id: 'VN-1',
        business_license_url: 'https://example.com/biz.jpg',
        id_card_front_url: 'https://example.com/front.jpg',
        id_card_back_url: 'https://example.com/back.jpg',
        status: 'VERIFIED'
    }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ownerVenueApi = {
    getMyVenues: async (): Promise<OwnerVenue[]> => {
        await delay(500);
        return [...mockVenues];
    },

    createVenue: async (data: Partial<OwnerVenue>): Promise<OwnerVenue> => {
        await delay(600);
        const newVenue: OwnerVenue = {
            id: `VN-${Date.now()}`,
            name: data.name || '',
            description: data.description || null,
            address: data.address || '',
            city: data.city || 'Hà Nội',
            district: data.district || '',
            phone: data.phone || null,
            status: 'PENDING',
            auto_accept_bookings: true,
            min_booking_hours: 1,
            max_booking_hours: 4,
            fb_url: null,
            instagram_url: null,
            rejection_reason: null,
            ...data
        };
        mockVenues.push(newVenue);
        return newVenue;
    },

    updateVenue: async (id: string, data: Partial<OwnerVenue>): Promise<OwnerVenue> => {
        await delay(500);
        const idx = mockVenues.findIndex(v => v.id === id);
        if (idx === -1) throw new Error("Venue not found");
        mockVenues[idx] = { ...mockVenues[idx], ...data };
        return mockVenues[idx];
    },

    getVerification: async (venueId: string): Promise<VenueVerification | null> => {
        await delay(300);
        return mockVerifications[venueId] || null;
    },

    submitVerification: async (venueId: string, data: Partial<VenueVerification>): Promise<VenueVerification> => {
        await delay(600);
        const newVer: VenueVerification = {
            id: `VER-${Date.now()}`,
            venue_id: venueId,
            business_license_url: data.business_license_url || '',
            id_card_front_url: data.id_card_front_url || '',
            id_card_back_url: data.id_card_back_url || '',
            status: 'PENDING'
        };
        mockVerifications[venueId] = newVer;
        return newVer;
    },

    getOperatingHours: async (venueId: string): Promise<VenueOperatingHour[]> => {
        await delay(400);
        return mockOperatingHours[venueId] || [];
    },

    updateOperatingHour: async (id: string, data: Partial<VenueOperatingHour>): Promise<VenueOperatingHour> => {
        await delay(400);
        for (const venueHours of Object.values(mockOperatingHours)) {
            const idx = venueHours.findIndex(h => h.id === id);
            if (idx !== -1) {
                venueHours[idx] = { ...venueHours[idx], ...data };
                return venueHours[idx];
            }
        }
        throw new Error("Hour not found");
    }
};
