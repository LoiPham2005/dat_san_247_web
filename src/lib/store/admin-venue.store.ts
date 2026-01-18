import { create } from 'zustand';
import { VenueStatus } from '@/types/venue.types';

interface AdminVenueFilterState {
    filters: {
        page: number;
        limit: number;
        search: string;
        status: VenueStatus | "";
    };

    // Actions
    setFilters: (filters: Partial<AdminVenueFilterState['filters']>) => void;
    resetFilters: () => void;
}

export const useAdminVenueFilterStore = create<AdminVenueFilterState>((set) => ({
    filters: {
        page: 1,
        limit: 10,
        search: "",
        status: "",
    },

    setFilters: (newFilters) => {
        set((state) => ({
            filters: {
                ...state.filters,
                ...newFilters,
                // Reset page if search or status changes, unless page is explicitly provided
                page: newFilters.page !== undefined ? newFilters.page :
                    (newFilters.search !== undefined || newFilters.status !== undefined ? 1 : state.filters.page)
            }
        }));
    },

    resetFilters: () => {
        set({
            filters: {
                page: 1,
                limit: 10,
                search: "",
                status: "",
            }
        });
    },
}));
