import { useVenueStore } from '@/lib/store/venue.store';
import { useQuery } from '@tanstack/react-query';
import { venueService } from '@/lib/api/services/venue.service';

export const useVenue = () => {
    const { venues, activeVenue, isLoading, error, fetchVenues, fetchVenueById, setActiveVenue } = useVenueStore();

    const useVenuesQuery = (params?: any) => useQuery({
        queryKey: ['venues', params],
        queryFn: () => venueService.getAll(params),
        // Sync with store on success if needed, but react-query handles this well usually
    });

    const useVenueDetails = (id: string) => useQuery({
        queryKey: ['venue', id],
        queryFn: () => venueService.getById(id),
        enabled: !!id,
    })

    return {
        venues,
        activeVenue,
        isLoading,
        error,
        fetchVenues,
        fetchVenueById,
        setActiveVenue,
        useVenuesQuery,
        useVenueDetails,
    };
};
