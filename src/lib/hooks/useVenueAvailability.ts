import { useQuery } from '@tanstack/react-query';
import { venueService } from '../api/services/venue.service';
import { VenueAvailability } from '@/types/venue.types';

export const useVenueAvailability = (venueId: string, date: string) => {
    return useQuery<VenueAvailability>({
        queryKey: ['venue-availability', venueId, date],
        queryFn: () => venueService.getAvailability(venueId, date),
        enabled: !!venueId && !!date,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
