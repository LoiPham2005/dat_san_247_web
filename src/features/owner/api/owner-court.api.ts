export type CourtSurfaceType = 'ARTIFICIAL_GRASS' | 'NATURAL_GRASS' | 'WOOD' | 'CONCRETE' | 'CLAY' | 'SYNTHETIC';

export interface OwnerCourt {
    id: string;
    venue_id: string;
    name: string;
    description: string | null;
    price_per_hour: number;
    surface_type: CourtSurfaceType | null;
    size: string | null;
    is_indoor: boolean;
    is_active: boolean;
    display_order: number;
}

export interface CourtPricingRule {
    id: string;
    court_id: string;
    name: string | null;
    day_of_week: 'MONDAY'|'TUESDAY'|'WEDNESDAY'|'THURSDAY'|'FRIDAY'|'SATURDAY'|'SUNDAY' | null;
    start_time: string; // HH:mm
    end_time: string;   // HH:mm
    price: number;
    start_date: string | null;
    end_date: string | null;
    priority: number;
}

export interface CourtMaintenance {
    id: string;
    court_id: string;
    start_at: string;
    end_at: string;
    reason: string;
    is_emergency: boolean;
}

export interface CourtAmenity {
    id: string;
    court_id: string;
    name: string;
    icon: string | null;
    is_free: boolean;
}

export interface CourtSportAssignment {
    id: string;
    court_id: string;
    sport_type: string;
}

// Mock Data
const mockCourts: OwnerCourt[] = [
    {
        id: 'C-1',
        venue_id: 'VN-1',
        name: 'Sân 1 (5 người)',
        description: 'Sân góc đẹp, lưới mới',
        price_per_hour: 300000,
        surface_type: 'ARTIFICIAL_GRASS',
        size: '20x40m',
        is_indoor: false,
        is_active: true,
        display_order: 1
    },
    {
        id: 'C-2',
        venue_id: 'VN-1',
        name: 'Sân 2 (7 người)',
        description: 'Sân rộng, có khán đài mini',
        price_per_hour: 500000,
        surface_type: 'ARTIFICIAL_GRASS',
        size: '40x60m',
        is_indoor: false,
        is_active: true,
        display_order: 2
    }
];

const mockPricingRules: CourtPricingRule[] = [
    {
        id: 'PR-1',
        court_id: 'C-1',
        name: 'Giờ vàng tối thứ 4',
        day_of_week: 'WEDNESDAY',
        start_time: '18:00',
        end_time: '20:00',
        price: 450000,
        start_date: null,
        end_date: null,
        priority: 10
    }
];

const mockMaintenances: CourtMaintenance[] = [
    {
        id: 'CM-1',
        court_id: 'C-2',
        start_at: new Date(Date.now() + 86400000).toISOString(),
        end_at: new Date(Date.now() + 86400000 * 2).toISOString(),
        reason: 'Thay mặt cỏ nhân tạo',
        is_emergency: false
    }
];

const mockAmenities: CourtAmenity[] = [
    { id: 'CA-1', court_id: 'C-1', name: 'Nước uống miễn phí', icon: 'CupSoda', is_free: true },
    { id: 'CA-2', court_id: 'C-2', name: 'Mái che', icon: 'Umbrella', is_free: true }
];

const mockSports: CourtSportAssignment[] = [
    { id: 'CS-1', court_id: 'C-1', sport_type: 'FOOTBALL' },
    { id: 'CS-2', court_id: 'C-2', sport_type: 'FOOTBALL' },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ownerCourtApi = {
    getCourtsByVenue: async (venueId: string): Promise<OwnerCourt[]> => {
        await delay(500);
        return mockCourts.filter(c => c.venue_id === venueId);
    },

    createCourt: async (data: Partial<OwnerCourt>): Promise<OwnerCourt> => {
        await delay(600);
        const newCourt: OwnerCourt = {
            id: `C-${Date.now()}`,
            venue_id: data.venue_id!,
            name: data.name || 'Sân mới',
            description: data.description || null,
            price_per_hour: data.price_per_hour || 0,
            surface_type: data.surface_type || null,
            size: data.size || null,
            is_indoor: data.is_indoor || false,
            is_active: data.is_active !== undefined ? data.is_active : true,
            display_order: data.display_order || mockCourts.length + 1
        };
        mockCourts.push(newCourt);
        return newCourt;
    },

    updateCourt: async (id: string, data: Partial<OwnerCourt>): Promise<OwnerCourt> => {
        await delay(500);
        const idx = mockCourts.findIndex(c => c.id === id);
        if (idx === -1) throw new Error("Court not found");
        mockCourts[idx] = { ...mockCourts[idx], ...data };
        return mockCourts[idx];
    },

    deleteCourt: async (id: string): Promise<void> => {
        await delay(400);
        const idx = mockCourts.findIndex(c => c.id === id);
        if (idx > -1) mockCourts.splice(idx, 1);
    },

    // PRICING RULES
    getPricingRules: async (courtId: string): Promise<CourtPricingRule[]> => {
        await delay(400);
        return mockPricingRules.filter(p => p.court_id === courtId);
    },

    createPricingRule: async (data: Partial<CourtPricingRule>): Promise<CourtPricingRule> => {
        await delay(500);
        const pr: CourtPricingRule = {
            id: `PR-${Date.now()}`,
            court_id: data.court_id!,
            name: data.name || null,
            day_of_week: data.day_of_week || null,
            start_time: data.start_time || '00:00',
            end_time: data.end_time || '23:59',
            price: data.price || 0,
            start_date: data.start_date || null,
            end_date: data.end_date || null,
            priority: data.priority || 1
        };
        mockPricingRules.push(pr);
        return pr;
    },

    deletePricingRule: async (id: string): Promise<void> => {
        await delay(300);
        const idx = mockPricingRules.findIndex(p => p.id === id);
        if (idx > -1) mockPricingRules.splice(idx, 1);
    },

    // MAINTENANCE
    getMaintenances: async (courtId: string): Promise<CourtMaintenance[]> => {
        await delay(400);
        return mockMaintenances.filter(m => m.court_id === courtId);
    },

    createMaintenance: async (data: Partial<CourtMaintenance>): Promise<CourtMaintenance> => {
        await delay(500);
        const cm: CourtMaintenance = {
            id: `CM-${Date.now()}`,
            court_id: data.court_id!,
            start_at: data.start_at || new Date().toISOString(),
            end_at: data.end_at || new Date().toISOString(),
            reason: data.reason || '',
            is_emergency: data.is_emergency || false
        };
        mockMaintenances.push(cm);
        return cm;
    },
    
    deleteMaintenance: async (id: string): Promise<void> => {
        await delay(300);
        const idx = mockMaintenances.findIndex(m => m.id === id);
        if (idx > -1) mockMaintenances.splice(idx, 1);
    },

    // AMENITIES
    getAmenities: async (courtId: string): Promise<CourtAmenity[]> => {
        await delay(300);
        return mockAmenities.filter(a => a.court_id === courtId);
    },

    createAmenity: async (data: Partial<CourtAmenity>): Promise<CourtAmenity> => {
        await delay(400);
        const ca: CourtAmenity = {
            id: `CA-${Date.now()}`,
            court_id: data.court_id!,
            name: data.name || '',
            icon: data.icon || null,
            is_free: data.is_free !== undefined ? data.is_free : true
        };
        mockAmenities.push(ca);
        return ca;
    },

    deleteAmenity: async (id: string): Promise<void> => {
        await delay(300);
        const idx = mockAmenities.findIndex(a => a.id === id);
        if (idx > -1) mockAmenities.splice(idx, 1);
    },

    // SPORTS
    getSports: async (courtId: string): Promise<CourtSportAssignment[]> => {
        await delay(300);
        return mockSports.filter(s => s.court_id === courtId);
    },

    createSport: async (data: Partial<CourtSportAssignment>): Promise<CourtSportAssignment> => {
        await delay(400);
        const cs: CourtSportAssignment = {
            id: `CS-${Date.now()}`,
            court_id: data.court_id!,
            sport_type: data.sport_type || 'BASKETBALL'
        };
        mockSports.push(cs);
        return cs;
    },

    deleteSport: async (id: string): Promise<void> => {
        await delay(300);
        const idx = mockSports.findIndex(s => s.id === id);
        if (idx > -1) mockSports.splice(idx, 1);
    }
};
