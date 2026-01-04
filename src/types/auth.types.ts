export enum UserRole {
    ADMIN = 'ADMIN',
    STAFF = 'STAFF',
    OWNER = 'OWNER',
    CUSTOMER = 'CUSTOMER'
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
