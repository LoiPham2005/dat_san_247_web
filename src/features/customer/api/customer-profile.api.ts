import apiClient from '@/lib/api/axios';

export interface CustomerProfile {
    id: string;
    email: string;
    full_name: string;
    phone: string | null;
    avatar_url: string | null;
    gender: 'MALE' | 'FEMALE' | 'OTHER' | null;
    date_of_birth: string | null; // ISO Date String
    bio: string | null;
    address: string | null;
    city: string | null;
    district: string | null;
    referral_code: string | null;
    is_profile_public: boolean;
    
    // Notifications (from user_profiles table)
    notif_push: boolean;
    notif_email: boolean;
    notif_sms: boolean;
    notif_booking: boolean;
    notif_promotion: boolean;
    notif_payment: boolean;
    notif_system: boolean;

    // From JOIN:
    sport_preferences?: UserSportPreference[];
}

export interface UserSportPreference {
    id: string;
    sport_type: string;
    skill_level: number; // 1-5
}

export interface UserDevice {
    id: string;
    device_type: 'ANDROID' | 'IOS' | 'WEB' | null;
    app_version: string | null;
    last_active_at: string;
    is_active: boolean;
}

export const customerProfileApi = {
    getProfile: async (): Promise<CustomerProfile> => {
        const response = await apiClient.get('/users/me');
        const user = response.data?.data;
        const profile = user?.profile;
        
        // Flatten the data for easier use in the frontend
        return {
            ...profile,
            email: user.email,
            full_name: user.full_name,
            phone: user.phone,
            avatar_url: user.avatar_url,
            gender: user.gender,
            date_of_birth: user.date_of_birth ? user.date_of_birth.substring(0, 10) : null,
            sport_preferences: profile?.sport_preferences || []
        };
    },
    updateProfile: async (data: Partial<CustomerProfile>): Promise<CustomerProfile> => {
        // Pick only allowed fields for UpdateProfileDto
        const allowedFields = [
            'full_name', 'avatar_url', 'gender', 'date_of_birth', 
            'bio', 'address', 'city', 'district'
        ];
        
        const filteredData: any = {};
        allowedFields.forEach(field => {
            if (data[field as keyof CustomerProfile] !== undefined) {
                filteredData[field] = data[field as keyof CustomerProfile];
            }
        });

        const response = await apiClient.patch('/users/me/profile', filteredData);
        return response.data?.data;
    },
    verifyContact: async (type: 'email' | 'phone', otp: string): Promise<boolean> => {
        // Mock verification for now as backend might not have this exact endpoint
        return otp === '123456';
    },
    changePassword: async (old_password: string, new_password: string): Promise<boolean> => {
        await apiClient.patch('/users/me/password', { old_password, new_password });
        return true;
    },
    getPreferences: async (): Promise<UserSportPreference[]> => {
        const profile = (await customerProfileApi.getProfile());
        return profile.sport_preferences || [];
    },
    updatePreferences: async (sport_type: string, skill_level: number): Promise<any> => {
        const response = await apiClient.post('/users/me/sport-preferences', { sport_type, skill_level });
        return response.data?.data;
    },
    getDevices: async (): Promise<UserDevice[]> => {
        // Backend might not have this yet, return empty for now
        return [];
    },
    logoutDevice: async (deviceId: string): Promise<void> => {
        // Mock logout
    }
};
