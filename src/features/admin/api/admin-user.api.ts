import apiClient from '@/lib/api/axios';

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
    role: {
        id: string;
        slug: RoleSlug;
        name: string;
    };
    created_at: string;
    last_login_at: string | null;
}

export interface AdminRole {
    id: string;
    slug: RoleSlug;
    name: string;
}

export interface PaginatedAdminUsers {
    items: AdminUser[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const adminUserApi = {
    getUsers: async (params?: any): Promise<PaginatedAdminUsers> => {
        const response = await apiClient.get('/admin/users', { params });
        return {
            items: response.data?.data || [],
            meta: response.data?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 }
        };
    },
    createUser: async (data: any): Promise<AdminUser> => {
        const response = await apiClient.post('/admin/users', data);
        return response.data?.data;
    },
    getRoles: async (): Promise<AdminRole[]> => {
        const response = await apiClient.get('/admin/roles');
        return response.data?.data || [];
    },
    updateStatus: async (id: string, status: UserStatus): Promise<AdminUser> => {
        const response = await apiClient.patch(`/admin/users/${id}`, { status });
        return response.data?.data;
    },
    updateRole: async (id: string, roleId: string): Promise<AdminUser> => {
        const response = await apiClient.patch(`/admin/users/${id}`, { role_id: roleId });
        return response.data?.data;
    },
    updateKyc: async (id: string, kyc_status: KycStatus): Promise<AdminUser> => {
        // Backend might handle KYC status separately or within update
        const response = await apiClient.patch(`/admin/users/${id}`, { kyc_status });
        return response.data?.data;
    }
};
