export interface CustomerProfile {
    id: string;
    user_id: string;
    email: string;
    full_name: string;
    phone: string | null;
    avatar_url: string | null;
    gender: 'MALE' | 'FEMALE' | 'OTHER' | null;
    date_of_birth: string | null; // YYYY-MM-DD
    bio: string | null;
    address: string | null;
    city: string | null;
    district: string | null;
    referral_code: string | null;
    is_profile_public: boolean;
    
    // Notifications
    notif_push: boolean;
    notif_email: boolean;
    notif_sms: boolean;
    notif_booking: boolean;
    notif_promotion: boolean;
    notif_payment: boolean;
    notif_system: boolean;
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

const mockProfile: CustomerProfile = {
    id: 'PF-123',
    user_id: 'US-123',
    email: 'customer@gmail.com',
    full_name: 'Phạm Đức Lợi',
    phone: '0987654321',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=customer',
    gender: 'MALE',
    date_of_birth: '1998-05-20',
    bio: 'Yêu thích thể thao, đặc biệt là bóng đá và cầu lông.',
    address: '123 Đường Cầu Giấy',
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    referral_code: 'LOIPD98',
    is_profile_public: true,
    
    notif_push: true,
    notif_email: true,
    notif_sms: false,
    notif_booking: true,
    notif_promotion: true,
    notif_payment: true,
    notif_system: true,
};

const mockPreferences: UserSportPreference[] = [
    { id: 'SP-1', sport_type: 'FOOTBALL_5', skill_level: 3 },
    { id: 'SP-2', sport_type: 'BADMINTON', skill_level: 4 }
];

const mockDevices: UserDevice[] = [
    { id: 'DEV-1', device_type: 'WEB', app_version: '1.0.0', last_active_at: new Date().toISOString(), is_active: true },
    { id: 'DEV-2', device_type: 'IOS', app_version: '1.2.4', last_active_at: new Date(Date.now() - 86400000 * 2).toISOString(), is_active: true }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const customerProfileApi = {
    getProfile: async (): Promise<CustomerProfile> => {
        await delay(500);
        return mockProfile;
    },
    updateProfile: async (data: Partial<CustomerProfile>): Promise<CustomerProfile> => {
        await delay(600);
        return { ...mockProfile, ...data };
    },
    verifyContact: async (type: 'email' | 'phone', otp: string): Promise<boolean> => {
        await delay(800);
        return otp === '123456';
    },
    changePassword: async (currentPw: string, newPw: string): Promise<boolean> => {
        await delay(800);
        return currentPw === 'password123';
    },
    getPreferences: async (): Promise<UserSportPreference[]> => {
        await delay(400);
        return mockPreferences;
    },
    updatePreferences: async (prefs: UserSportPreference[]): Promise<UserSportPreference[]> => {
        await delay(600);
        return prefs;
    },
    getDevices: async (): Promise<UserDevice[]> => {
        await delay(500);
        return mockDevices;
    },
    logoutDevice: async (deviceId: string): Promise<void> => {
        await delay(500);
    }
};
