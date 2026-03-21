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

export const useVenueSchedule = (slug: string, date: string) => {
    return useQuery({
        queryKey: ['venue_schedule', slug, date],
        queryFn: () => venueSearchApi.getVenueSchedule(slug, date),
        enabled: !!slug && !!date
    });
};

export const useCreateBooking = () => {
    return useMutation({
        mutationFn: (data: any) => venueSearchApi.createBooking(data)
    });
};

export const useCreateRecurringBooking = () => {
    return useMutation({
        mutationFn: (data: any) => venueSearchApi.createRecurringBooking(data)
    });
};

export const useUserFavorites = (enabled: boolean = true) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['user_favorites'],
        queryFn: () => venueSearchApi.getFavorites(),
        enabled
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
                return [...old, { id: 'temp', venue_id: venueId, venue: {}, created_at: new Date().toISOString() } as unknown as FavoriteVenue];
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

export const useSearchHistory = (enabled: boolean = true) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['search_history'],
        queryFn: () => venueSearchApi.getSearchHistory(),
        enabled
    });

    const clearHistory = useMutation({
        mutationFn: () => venueSearchApi.clearSearchHistory(),
        onSuccess: () => {
            queryClient.setQueryData(['search_history'], []);
            toast.success("Đã xóa lịch sử tìm kiếm");
        }
    });

    const saveHistory = useMutation({
        mutationFn: ({ keyword, sportType }: { keyword: string, sportType?: string }) => venueSearchApi.saveSearchHistory(keyword, sportType),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['search_history'] });
        }
    });

    return {
        history: query.data || [],
        isLoading: query.isLoading,
        clearHistory: clearHistory.mutate,
        saveHistory: saveHistory.mutate
    };
};
