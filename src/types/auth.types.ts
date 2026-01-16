export enum UserRole {
    SUPER_ADMIN = 'super-admin',
    ADMIN = 'admin',
    STAFF = 'staff', // System staff
    VENUE_STAFF = 'venue-staff', // Venue owner's staff
    OWNER = 'owner',
    CUSTOMER = 'customer'
}

export interface User {
    id: string;
    email: string;
    name: string;
    phone?: string;
    role: UserRole;
    avatar?: string;
    venueId?: string;
    isActive: boolean;
    createdAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    name: string;
    phone: string;
    role?: UserRole;
}
