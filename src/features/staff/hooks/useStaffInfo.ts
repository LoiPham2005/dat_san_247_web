import { useQuery } from '@tanstack/react-query';
import { staffInfoApi } from '../api/staff-info.api';

export const useStaffInfo = () => {
    const usersQuery = useQuery({ queryKey: ['staff_lookup_users'], queryFn: staffInfoApi.getUsers });
    const venuesQuery = useQuery({ queryKey: ['staff_lookup_venues'], queryFn: staffInfoApi.getVenues });
    const bookingsQuery = useQuery({ queryKey: ['staff_lookup_bookings'], queryFn: staffInfoApi.getBookings });

    return {
        users: usersQuery.data || [],
        isLoadingUsers: usersQuery.isLoading,

        venues: venuesQuery.data || [],
        isLoadingVenues: venuesQuery.isLoading,

        bookings: bookingsQuery.data || [],
        isLoadingBookings: bookingsQuery.isLoading,
    };
};
