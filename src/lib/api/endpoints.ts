export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    ME: '/auth/me',
    PROFILE: '/profile',
    CHANGE_PASSWORD: '/profile/change-password',

    // Users
    USERS: '/users',
    USER_BY_ID: (id: string) => `/users/${id}`,
    ADMIN_USERS: '/admin/users',
    ADMIN_USER_BY_ID: (id: string) => `/admin/users/${id}`,

    // Venues
    VENUES: '/venues',
    VENUE_BY_ID: (id: string) => `/venues/${id}`,
    VENUE_AVAILABILITY: (id: string) => `/venues/${id}/availability`,
    OWNER_VENUES: '/owner/venues',
    OWNER_VENUE_BY_ID: (id: string) => `/owner/venues/${id}`,
    OWNER_STAFF: '/owner/staff',
    ADMIN_VENUES: '/admin/venues',
    ADMIN_VENUE_BY_ID: (id: string) => `/admin/venues/${id}`,

    // Bookings
    BOOKINGS: '/bookings',
    BOOKING_BY_ID: (id: string) => `/bookings/${id}`,
    MY_BOOKINGS: '/bookings/my',
    CANCEL_BOOKING: (id: string) => `/bookings/${id}/cancel`,
    OWNER_BOOKINGS: '/owner/bookings',
    OWNER_BOOKING_ACTION: (id: string, action: string) => `/owner/bookings/${id}/${action}`,
    OWNER_DASHBOARD_OVERVIEW: '/owner/dashboard/overview',
    OWNER_DASHBOARD_REVENUE: '/owner/dashboard/revenue-chart',
    ADMIN_DASHBOARD_OVERVIEW: '/admin/dashboard/overview',
    ADMIN_DASHBOARD_REVENUE: '/admin/dashboard/revenue-chart',
    ADMIN_DASHBOARD_TOP_VENUES: '/admin/dashboard/top-venues',
    ADMIN_DASHBOARD_TOP_CUSTOMERS: '/admin/dashboard/top-customers',
    ADMIN_DASHBOARD_SPORT_DISTRIBUTION: '/admin/dashboard/sport-distribution',
    RESCHEDULE_BOOKING: (id: string) => `/bookings/${id}/reschedule`,
    REQUEST_INVOICE: (id: string) => `/bookings/${id}/invoice-request`,
    SUPPORT_TICKETS: '/support/tickets',
    SUPPORT_CONTACT: '/support/contact',


    // Reports (Admin)
    REPORTS_REVENUE: '/reports/revenue',
    REPORTS_BOOKINGS: '/reports/bookings',

    // Admin Moderation
    ADMIN_PENDING_VENUES: '/admin/venues/pending',
    ADMIN_APPROVE_VENUE: (id: string) => `/admin/venues/${id}/approve`,
    ADMIN_REJECT_VENUE: (id: string) => `/admin/venues/${id}/reject`,

    // Support (Tickets/Reports)
    ADMIN_TICKETS: '/admin/support/tickets',
    ADMIN_TICKET_BY_ID: (id: string) => `/admin/support/tickets/${id}`,

    // Analytics/Audit
    ADMIN_ACTIVITY_LOGS: '/admin/analytics/logs',

    // Promotions
    ADMIN_PROMOTIONS: '/admin/promotions',
    ADMIN_PROMOTION_BY_ID: (id: string) => `/admin/promotions/${id}`,
    OWNER_PROMOTIONS: '/owner/promotions',
    OWNER_PROMOTION_BY_ID: (id: string) => `/owner/promotions/${id}`,
    PUBLIC_PROMOTIONS: '/promotions',

    // Staff Moderation (Keep for STAFF role)
    STAFF_PENDING_VENUES: '/staff/moderation/venues/pending',
    STAFF_APPROVE_VENUE: (id: string) => `/staff/moderation/venues/${id}/approve`,
    STAFF_REJECT_VENUE: (id: string) => `/staff/moderation/venues/${id}/reject`,

    // Owner Courts
    OWNER_COURTS: '/owner/courts',
    OWNER_COURTS_BY_VENUE: (venueId: string) => `/owner/courts/venue/${venueId}`,
    OWNER_COURTS_BY_ID: (id: string) => `/owner/courts/${id}`,
    OWNER_COURT_PRICING_RULES: (id: string) => `/owner/courts/${id}/pricing-rules`,

    // Content & Banners
    CONTENT: '/content',
    BANNERS: '/content/banners',
    BANNER_BY_ID: (id: string) => `/content/banners/${id}`,
    BLOGS: '/content/blogs',
    BLOG_BY_ID: (id: string) => `/content/blogs/${id}`,
    EMAIL_TEMPLATES: '/content/email-templates',
    EMAIL_TEMPLATE_BY_ID: (id: string) => `/content/email-templates/${id}`,
    // Admin Bookings
    ADMIN_ALL_BOOKINGS: '/staff/bookings',
    ADMIN_BOOKING_BY_ID: (id: string) => `/staff/bookings/${id}`,
    ADMIN_CANCEL_BOOKING: (id: string) => `/staff/bookings/${id}/cancel`,
    ADMIN_REFUND_BOOKING: (id: string) => `/staff/bookings/${id}/refund`,


    // ADMIN_ALL_BOOKINGS: '/admin/bookings',
    // ADMIN_BOOKING_BY_ID: (id: string) => `/admin/bookings/${id}`,
    // ADMIN_CANCEL_BOOKING: (id: string) => `/admin/bookings/${id}/cancel`,
    // ADMIN_REFUND_BOOKING: (id: string) => `/admin/bookings/${id}/refund`,
};
