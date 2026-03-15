export type VenueStaffRole = 'OWNER' | 'MANAGER' | 'STAFF' | 'RECEPTIONIST';
export type VenueStaffInviteStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'REVOKED';

export interface OwnerVenueStaff {
    id: string;
    venue_id: string;
    user_id: string;
    full_name: string;
    email: string;
    role: VenueStaffRole;
    is_active: boolean;
    joined_at: string;
}

export interface OwnerStaffInvite {
    id: string;
    venue_id: string;
    invite_email: string;
    role: VenueStaffRole;
    status: VenueStaffInviteStatus;
    expires_at: string;
    created_at: string;
}

const mockStaff: OwnerVenueStaff[] = [
    {
        id: 'VS-1',
        venue_id: 'VN-1',
        user_id: 'U-101',
        full_name: 'Nguyễn Văn Quản Lý',
        email: 'manager@datsan247.vn',
        role: 'MANAGER',
        is_active: true,
        joined_at: new Date(Date.now() - 86400000 * 30).toISOString()
    },
    {
        id: 'VS-2',
        venue_id: 'VN-1',
        user_id: 'U-102',
        full_name: 'Trần Lễ Tân',
        email: 'receptionist@datsan247.vn',
        role: 'RECEPTIONIST',
        is_active: true,
        joined_at: new Date(Date.now() - 86400000 * 10).toISOString()
    }
];

const mockInvites: OwnerStaffInvite[] = [
    {
        id: 'VSI-1',
        venue_id: 'VN-1',
        invite_email: 'new_staff@example.com',
        role: 'STAFF',
        status: 'PENDING',
        expires_at: new Date(Date.now() + 86400000 * 2).toISOString(),
        created_at: new Date().toISOString()
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ownerStaffApi = {
    getStaffList: async (venueId: string): Promise<OwnerVenueStaff[]> => {
        await delay(400);
        return mockStaff.filter(s => s.venue_id === venueId);
    },

    updateStaffRole: async (staffId: string, role: VenueStaffRole): Promise<OwnerVenueStaff> => {
        await delay(500);
        const idx = mockStaff.findIndex(s => s.id === staffId);
        if (idx === -1) throw new Error("Staff not found");
        mockStaff[idx] = { ...mockStaff[idx], role };
        return mockStaff[idx];
    },

    toggleStaffStatus: async (staffId: string, is_active: boolean): Promise<OwnerVenueStaff> => {
        await delay(400);
        const idx = mockStaff.findIndex(s => s.id === staffId);
        if (idx === -1) throw new Error("Staff not found");
        mockStaff[idx] = { ...mockStaff[idx], is_active };
        return mockStaff[idx];
    },

    getStaffInvites: async (venueId: string): Promise<OwnerStaffInvite[]> => {
        await delay(300);
        return mockInvites.filter(i => i.venue_id === venueId);
    },

    inviteStaff: async (data: { venue_id: string, email: string, role: VenueStaffRole }): Promise<OwnerStaffInvite> => {
        await delay(600);
        const inv: OwnerStaffInvite = {
            id: `VSI-${Date.now()}`,
            venue_id: data.venue_id,
            invite_email: data.email,
            role: data.role,
            status: 'PENDING',
            expires_at: new Date(Date.now() + 86400000 * 7).toISOString(),
            created_at: new Date().toISOString()
        };
        mockInvites.push(inv);
        return inv;
    },

    revokeInvite: async (inviteId: string): Promise<OwnerStaffInvite> => {
        await delay(400);
        const idx = mockInvites.findIndex(i => i.id === inviteId);
        if (idx === -1) throw new Error("Invite not found");
        mockInvites[idx] = { ...mockInvites[idx], status: 'REVOKED' };
        return mockInvites[idx];
    }
};
