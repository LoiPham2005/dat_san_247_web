import { UserRole } from './auth.types';

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    phone?: string;
    role: UserRole;
    avatar?: string;
    address?: string;
    bio?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateProfileData {
    name?: string;
    phone?: string;
    address?: string;
    bio?: string;
    avatar?: string; // URL or base64
}
