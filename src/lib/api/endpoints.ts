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
    ADMIN_USERS: '/admin/users',
    ADMIN_USER_BY_ID: (id: string) => `/admin/users/${id}`,

    // Venues
    VENUES: '/venues',
    VENUE_BY_ID: (id: string) => `/venues/${id}`,
    VENUE_TIMESLOTS: (id: string) => `/venues/${id}/timeslots`,
    OWNER_VENUES: '/owner/venues',
    OWNER_VENUE_BY_ID: (id: string) => `/owner/venues/${id}`,
    OWNER_STAFF: '/owner/staff',
    ADMIN_VENUES: '/admin/venues',
    ADMIN_VENUE_BY_ID: (id: string) => `/admin/venues/${id}`,

    // Bookings
    BOOKINGS: '/bookings',
    BOOKING_BY_ID: (id: string) => `/bookings/${id}`,
    MY_BOOKINGS: '/bookings/my-bookings',
    CANCEL_BOOKING: (id: string) => `/bookings/${id}/cancel`,
    OWNER_BOOKINGS: '/owner/bookings',
    OWNER_BOOKING_ACTION: (id: string, action: string) => `/owner/bookings/${id}/${action}`,
    OWNER_DASHBOARD_OVERVIEW: '/owner/dashboard/overview',
    OWNER_DASHBOARD_REVENUE: '/owner/dashboard/revenue-chart',

    // Reports (Admin)
    REPORTS_REVENUE: '/reports/revenue',
    REPORTS_BOOKINGS: '/reports/bookings',

    // Staff Moderation
    STAFF_PENDING_VENUES: '/staff/moderation/venues/pending',
    STAFF_APPROVE_VENUE: (id: string) => `/staff/moderation/venues/${id}/approve`,
    STAFF_REJECT_VENUE: (id: string) => `/staff/moderation/venues/${id}/reject`,

    // Owner Courts
    OWNER_COURTS: '/owner/courts',
    OWNER_COURTS_BY_VENUE: (venueId: string) => `/owner/courts/venue/${venueId}`,
    OWNER_COURTS_BY_ID: (id: string) => `/owner/courts/${id}`,
    OWNER_COURT_PRICING_RULES: (id: string) => `/owner/courts/${id}/pricing-rules`,
};
