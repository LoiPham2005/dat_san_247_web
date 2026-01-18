import { create } from 'zustand';
import { venueService } from '@/lib/api/services/venue.service';

interface StaffStore {
    staff: any[];
    isLoading: boolean;
    error: string | null;

    fetchStaff: (params?: any) => Promise<void>;
    addStaff: (data: any) => Promise<void>;
    removeStaff: (id: string) => Promise<void>;
}

export const useStaffStore = create<StaffStore>((set, get) => ({
    staff: [],
    isLoading: false,
    error: null,

    fetchStaff: async (params) => {
        set({ isLoading: true, error: null });
        try {
            const data = await venueService.getOwnerStaff(params);
            set({ staff: data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch staff', isLoading: false });
        }
    },

    addStaff: async (data: any) => {
        set({ isLoading: true, error: null });
        try {
            await venueService.addOwnerStaff(data);
            // Refresh the list after adding
            const updatedStaff = await venueService.getOwnerStaff();
            set({ staff: updatedStaff, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to add staff', isLoading: false });
            throw error;
        }
    },

    removeStaff: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await venueService.removeOwnerStaff(id);
            set((state) => ({
                staff: state.staff.filter((s) => s.id !== id),
                isLoading: false,
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to remove staff', isLoading: false });
        }
    },
}));
