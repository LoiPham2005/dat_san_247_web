import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { venueSearchApi, VenueSearchParams, VenueDetail, FavoriteVenue, SearchHistory } from '../api/venue-search.api';
import { toast } from 'sonner';

export const useVenueSearch = (params: VenueSearchParams) => {
    return useQuery({
        queryKey: ['venues', params],
        queryFn: () => venueSearchApi.searchVenues(params),
    });
};

export const useVenueDetail = (slug: string) => {
    return useQuery({
        queryKey: ['venue', slug],
        queryFn: () => venueSearchApi.getVenueDetail(slug),
        enabled: !!slug
    });
};

export const useUserFavorites = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['user_favorites'],
        queryFn: () => venueSearchApi.getFavorites(),
    });

    const toggleFavorite = useMutation({
        mutationFn: (venueId: string) => venueSearchApi.toggleFavorite(venueId),
        onMutate: async (venueId) => {
            await queryClient.cancelQueries({ queryKey: ['user_favorites'] });
            
            const previousFavorites = queryClient.getQueryData<FavoriteVenue[]>(['user_favorites']);
            
            // Optimistic update
            queryClient.setQueryData<FavoriteVenue[]>(['user_favorites'], old => {
                if (!old) return [];
                const exist = old.find(f => f.venue_id === venueId);
                if (exist) return old.filter(f => f.venue_id !== venueId);
                
                // Add dummy favorite
                return [...old, { id: 'temp', venue_id: venueId, venue: {}, created_at: new Date().toISOString() }];
            });
            
            return { previousFavorites };
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData(['user_favorites'], context?.previousFavorites);
            toast.error("Có lỗi xảy ra");
        },
        onSettled: () => {
             queryClient.invalidateQueries({ queryKey: ['user_favorites'] });
        },
        onSuccess: (isAdded) => {
             if (isAdded) toast.success("Đã lưu vào danh sách Yêu Thích 💖");
             else toast.info("Đã xóa khỏi danh sách Yêu Thích");
        }
    });

    return {
        favorites: query.data || [],
        isLoading: query.isLoading,
        toggleFavorite: toggleFavorite.mutate,
    };
};

export const useSearchHistory = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['search_history'],
        queryFn: () => venueSearchApi.getSearchHistory(),
    });

    const clearHistory = useMutation({
        mutationFn: () => venueSearchApi.clearSearchHistory(),
        onSuccess: () => {
            queryClient.setQueryData(['search_history'], []);
            toast.success("Đã xóa lịch sử tìm kiếm");
        }
    });

    return {
        history: query.data || [],
        isLoading: query.isLoading,
        clearHistory: clearHistory.mutate
    };
};
