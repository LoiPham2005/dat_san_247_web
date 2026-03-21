export const getDashboardByRole = (role: string | undefined): string => {
    switch (role) {
        case 'super_admin':
        case 'admin':
            return '/admin/dashboard';
        case 'staff':
            return '/staff/dashboard';
        case 'owner':
            return '/owner/dashboard';
        case 'venue_staff':
            return '/venue-staff/dashboard';
        case 'customer':
        default:
            return '/';
    }
};
