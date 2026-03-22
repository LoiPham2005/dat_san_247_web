import apiClient from '@/lib/api/axios';

export type VenueStaffRole = 'OWNER' | 'MANAGER' | 'STAFF' | 'RECEPTIONIST';
export type VenueStaffInviteStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'REVOKED';

export interface OwnerVenueStaff {
    id: string;
    venue_id: string;
    user_id: string;
    full_name: string;
    email: string;
    avatar_url?: string;
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
    token: string;
    expires_at: string;
    created_at: string;
}

export const ownerStaffApi = {
    getStaffList: async (venueId: string): Promise<OwnerVenueStaff[]> => {
        const response = await apiClient.get(`/venue-staff/owner/${venueId}`);
        return response.data.data;
    },

    updateStaffRole: async (staffId: string, role: VenueStaffRole): Promise<any> => {
        const response = await apiClient.patch(`/venue-staff/owner/${staffId}/role`, { role });
        return response.data.data;
    },

    toggleStaffStatus: async (staffId: string, is_active: boolean): Promise<any> => {
        const response = await apiClient.patch(`/venue-staff/owner/${staffId}/status`, { is_active });
        return response.data.data;
    },

    getStaffInvites: async (venueId: string): Promise<OwnerStaffInvite[]> => {
        const response = await apiClient.get(`/venue-staff/owner/${venueId}/invites`);
        return response.data.data;
    },

    inviteStaff: async (data: { venue_id: string, email: string, role: VenueStaffRole }): Promise<OwnerStaffInvite> => {
        const response = await apiClient.post(`/venue-staff/owner/invite`, data);
        return response.data.data;
    },

    revokeInvite: async (inviteId: string): Promise<any> => {
        const response = await apiClient.delete(`/venue-staff/owner/invite/${inviteId}`);
        return response.data.data;
    },
    
    acceptInvite: async (token: string): Promise<any> => {
        const response = await apiClient.post(`/venue-staff/invite/${token}/accept`);
        return response.data.data;
    },
    
    forceAcceptInvite: async (inviteId: string): Promise<any> => {
        const response = await apiClient.post(`/venue-staff/owner/invite/${inviteId}/force-accept`);
        return response.data.data;
    }
};
