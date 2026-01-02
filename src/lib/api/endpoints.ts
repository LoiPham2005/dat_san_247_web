export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    ME: '/auth/me',

    // Users
    USERS: '/users',
    USER_BY_ID: (id: string) => `/users/${id}`,

    // Venues
    VENUES: '/venues',
    VENUE_BY_ID: (id: string) => `/venues/${id}`,
    VENUE_TIMESLOTS: (id: string) => `/venues/${id}/timeslots`,

    // Bookings
    BOOKINGS: '/bookings',
    BOOKING_BY_ID: (id: string) => `/bookings/${id}`,
    MY_BOOKINGS: '/bookings/my-bookings',
    CANCEL_BOOKING: (id: string) => `/bookings/${id}/cancel`,

    // Reports (Admin)
    REPORTS_REVENUE: '/reports/revenue',
    REPORTS_BOOKINGS: '/reports/bookings',
};
