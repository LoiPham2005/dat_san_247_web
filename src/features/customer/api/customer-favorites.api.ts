import apiClient from '@/lib/api/axios';

export interface FavoriteVenue {
    id: string;
    venue_id: string;
    created_at: string;
    venue: {
        id: string;
        name: string;
        slug: string;
        address: string;
        thumbnail_url: string | null;
        average_rating: number;
        review_count: number;
        sports: string[];
        min_price: number;
    };
}

export const customerFavoritesApi = {
    getFavorites: async (): Promise<FavoriteVenue[]> => {
        const response = await apiClient.get('/public/venues/me/favorites');
        return response.data?.data || [];
    },
    toggleFavorite: async (venueId: string): Promise<boolean> => {
        const response = await apiClient.post('/public/venues/me/favorites', { venue_id: venueId });
        return response.data?.data; // Returns true if added, false if removed
    },
    removeFavorite: async (venueId: string): Promise<void> => {
        // Since backend uses toggle, we call toggle favorite which will remove if it exists
        await apiClient.post('/public/venues/me/favorites', { venue_id: venueId });
    }
};
