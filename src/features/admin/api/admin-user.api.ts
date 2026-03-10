export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED' | 'SUSPENDED';
export type KycStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
export type RoleSlug = 'super_admin' | 'admin' | 'staff' | 'owner' | 'venue_staff' | 'customer';

export interface AdminUser {
    id: string;
    email: string;
    full_name: string;
    phone: string | null;
    avatar_url: string | null;
    status: UserStatus;
    kyc_status: KycStatus;
    role: RoleSlug;
    created_at: string;
    last_login_at: string | null;
}

const mockUsers: AdminUser[] = [
    {
        id: 'u1',
        email: 'ceo@datsan247.vn',
        full_name: 'Phạm Đức Lợi',
        phone: '0901234567',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Loi',
        status: 'ACTIVE',
        kyc_status: 'VERIFIED',
        role: 'super_admin',
        created_at: '2026-01-01T10:00:00Z',
        last_login_at: '2026-03-10T15:00:00Z',
    },
    {
        id: 'u2',
        email: 'admin@datsan247.vn',
        full_name: 'Trần Kỹ Thuật',
        phone: '0901234568',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tech',
        status: 'ACTIVE',
        kyc_status: 'VERIFIED',
        role: 'admin',
        created_at: '2026-01-02T10:00:00Z',
        last_login_at: '2026-03-09T15:00:00Z',
    },
    {
        id: 'u3',
        email: 'owner@gmail.com',
        full_name: 'Nguyễn Văn Chủ',
        phone: '0901234569',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chu',
        status: 'ACTIVE',
        kyc_status: 'VERIFIED',
        role: 'owner',
        created_at: '2026-02-01T10:00:00Z',
        last_login_at: '2026-03-08T15:00:00Z',
    },
    {
        id: 'u4',
        email: 'spammer@yahoo.com',
        full_name: 'Kẻ Bơm Đơn',
        phone: '0909999999',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Spam',
        status: 'BANNED',
        kyc_status: 'REJECTED',
        role: 'customer',
        created_at: '2026-02-15T10:00:00Z',
        last_login_at: '2026-02-16T15:00:00Z',
    },
    {
        id: 'u5',
        email: 'newuser@gmail.com',
        full_name: 'Minh Mới Đăng Ký',
        phone: '0912121212',
        avatar_url: null,
        status: 'INACTIVE',
        kyc_status: 'UNVERIFIED',
        role: 'customer',
        created_at: new Date().toISOString(),
        last_login_at: null,
    },
    {
        id: 'u6',
        email: 'staff01@datsan247.vn',
        full_name: 'Lê CSKH',
        phone: '0988888888',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cskh',
        status: 'ACTIVE',
        kyc_status: 'VERIFIED',
        role: 'staff',
        created_at: '2026-01-10T10:00:00Z',
        last_login_at: '2026-03-10T12:00:00Z',
    },
    {
        id: 'u7',
        email: 'baduser@gmail.com',
        full_name: 'Khách Cố Chấp',
        phone: '0955555555',
        avatar_url: null,
        status: 'SUSPENDED',
        kyc_status: 'PENDING',
        role: 'customer',
        created_at: '2026-03-01T10:00:00Z',
        last_login_at: '2026-03-05T15:00:00Z',
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const adminUserApi = {
    getUsers: async (): Promise<AdminUser[]> => {
        await delay(600);
        return [...mockUsers].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    updateStatus: async (id: string, status: UserStatus): Promise<AdminUser> => {
        await delay(400);
        const user = mockUsers.find(u => u.id === id);
        if (!user) throw new Error("User not found");
        user.status = status;
        return { ...user };
    },
    updateRole: async (id: string, role: RoleSlug): Promise<AdminUser> => {
        await delay(400);
        const user = mockUsers.find(u => u.id === id);
        if (!user) throw new Error("User not found");
        user.role = role;
        return { ...user };
    },
    updateKyc: async (id: string, kyc_status: KycStatus): Promise<AdminUser> => {
        await delay(400);
        const user = mockUsers.find(u => u.id === id);
        if (!user) throw new Error("User not found");
        user.kyc_status = kyc_status;
        return { ...user };
    }
};
