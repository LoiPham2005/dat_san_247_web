import { useQuery } from '@tanstack/react-query';
import { staffInfoApi } from '../api/staff-info.api';

export interface StaffInfoParams {
    search?: string;
    page?: number;
    limit?: number;
}

export const useStaffInfo = (params?: StaffInfoParams) => {
    const usersQuery = useQuery({ 
        queryKey: ['staff_lookup_users', params], 
        queryFn: () => staffInfoApi.getUsers(params?.search, params?.page, params?.limit) 
    });
    const venuesQuery = useQuery({ 
        queryKey: ['staff_lookup_venues', params], 
        queryFn: () => staffInfoApi.getVenues(params?.search, params?.page, params?.limit) 
    });
    const bookingsQuery = useQuery({ 
        queryKey: ['staff_lookup_bookings', params], 
        queryFn: () => staffInfoApi.getBookings(params?.search, params?.page, params?.limit) 
    });

    return {
        users: usersQuery.data?.items || [],
        usersTotal: usersQuery.data?.total || 0,
        usersTotalPages: usersQuery.data?.totalPages || 1,
        isLoadingUsers: usersQuery.isLoading,

        venues: venuesQuery.data?.items || [],
        venuesTotal: venuesQuery.data?.total || 0,
        venuesTotalPages: venuesQuery.data?.totalPages || 1,
        isLoadingVenues: venuesQuery.isLoading,

        bookings: bookingsQuery.data?.items || [],
        bookingsTotal: bookingsQuery.data?.total || 0,
        bookingsTotalPages: bookingsQuery.data?.totalPages || 1,
        isLoadingBookings: bookingsQuery.isLoading,
    };
};
