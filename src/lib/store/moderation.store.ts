import { create } from 'zustand';
import { Venue } from '@/types/venue.types';
import { venueService } from '@/lib/api/services/venue.service';
import { adminService } from '@/lib/api/services/admin.service';

interface ModerationStore {
    pendingVenues: Venue[];
    reports: any[];
    activityLogs: any[];
    isLoading: boolean;
    error: string | null;

    fetchPendingVenues: () => Promise<void>;
    fetchAdminPendingVenues: (params?: any) => Promise<void>;
    fetchReports: (params?: any) => Promise<void>;
    fetchActivityLogs: (params?: any) => Promise<void>;

    approveVenue: (id: string, isAdmin?: boolean) => Promise<void>;
    rejectVenue: (id: string, reason: string, isAdmin?: boolean) => Promise<void>;
    updateReportStatus: (id: string, status: string) => Promise<void>;
}

export const useModerationStore = create<ModerationStore>((set, get) => ({
    pendingVenues: [],
    reports: [],
    activityLogs: [],
    isLoading: false,
    error: null,

    fetchPendingVenues: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await venueService.getPendingVenues();
            const venues = Array.isArray(data) ? data : (data as any).items || [];
            set({ pendingVenues: venues, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch pending venues', isLoading: false });
        }
    },

    fetchAdminPendingVenues: async (params) => {
        set({ isLoading: true, error: null });
        try {
            const data = await venueService.getAdminPendingVenues(params);
            const venues = Array.isArray(data) ? data : (data as any).items || [];
            set({ pendingVenues: venues, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch admin pending venues', isLoading: false });
        }
    },

    fetchReports: async (params) => {
        set({ isLoading: true, error: null });
        try {
            const data = await adminService.getTickets(params);
            const reports = Array.isArray(data) ? data : (data as any).items || [];
            set({ reports, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch reports', isLoading: false });
        }
    },

    fetchActivityLogs: async (params) => {
        set({ isLoading: true, error: null });
        try {
            const data = await adminService.getActivityLogs(params);
            const logs = Array.isArray(data) ? data : (data as any).items || [];
            set({ activityLogs: logs, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch activity logs', isLoading: false });
        }
    },

    approveVenue: async (id, isAdmin = false) => {
        set({ isLoading: true, error: null });
        try {
            if (isAdmin) {
                await venueService.adminApproveVenue(id);
            } else {
                await venueService.approveVenue(id);
            }
            set((state) => ({
                pendingVenues: state.pendingVenues.filter(v => v.id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to approve venue', isLoading: false });
            throw error;
        }
    },

    rejectVenue: async (id, reason, isAdmin = false) => {
        set({ isLoading: true, error: null });
        try {
            if (isAdmin) {
                await venueService.adminRejectVenue(id, reason);
            } else {
                await venueService.rejectVenue(id, reason);
            }
            set((state) => ({
                pendingVenues: state.pendingVenues.filter(v => v.id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to reject venue', isLoading: false });
            throw error;
        }
    },

    updateReportStatus: async (id, status) => {
        set({ isLoading: true, error: null });
        try {
            await adminService.updateTicket(id, { status });
            set((state) => ({
                reports: state.reports.map(r => r.id === id ? { ...r, status } : r),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to update report status', isLoading: false });
        }
    }
}));
