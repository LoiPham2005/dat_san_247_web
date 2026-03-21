import apiClient from "@/lib/api/axios";

export type SettingDataType = 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
export type AppPlatform = 'IOS' | 'ANDROID' | 'WEB';

export interface AdminSetting {
    id: string;
    key: string;
    value: string;
    data_type: SettingDataType;
    description: string | null;
    is_active: boolean;
    group_name: string | null;
}

export interface AdminHoliday {
    id: string;
    holiday_date: string;
    holiday_name: string;
    is_recurring: boolean;
    price_multiplier: number | string;
    is_active: boolean;
}

export interface AdminAppVersion {
    id: string;
    platform: AppPlatform;
    version_number: string;
    build_number: number;
    is_force_update: boolean;
    release_notes: string | null;
    is_active: boolean;
    released_at: string | null;
    download_url?: string | null;
}

export interface AdminAuditLog {
    id: string;
    actor_role: string;
    action: string;
    entity_name: string;
    entity_id: string | null;
    ip_address: string | null;
    created_at: string;
    user_id: string | null;
}

export const adminSystemApi = {
    // Settings
    getSettings: async (): Promise<AdminSetting[]> => {
        const response = await apiClient.get('/admin/settings');
        return response.data?.data || [];
    },
    updateSetting: async (id: string, value: string): Promise<AdminSetting> => {
        const response = await apiClient.patch(`/admin/settings/${id}`, { value });
        return response.data?.data;
    },

    // Holidays
    getHolidays: async (): Promise<AdminHoliday[]> => {
        const response = await apiClient.get('/admin/holidays');
        return response.data?.data || [];
    },
    createHoliday: async (data: any): Promise<AdminHoliday> => {
        const response = await apiClient.post('/admin/holidays', data);
        return response.data?.data;
    },
    updateHoliday: async (id: string, data: any): Promise<AdminHoliday> => {
        const response = await apiClient.patch(`/admin/holidays/${id}`, data);
        return response.data?.data;
    },
    deleteHoliday: async (id: string): Promise<string> => {
        const response = await apiClient.delete(`/admin/holidays/${id}`);
        return response.data?.data || id;
    },

    // App Versions
    getAppVersions: async (): Promise<AdminAppVersion[]> => {
        const response = await apiClient.get('/admin/app-versions');
        return response.data?.data || [];
    },
    createAppVersion: async (data: any): Promise<AdminAppVersion> => {
        const response = await apiClient.post('/admin/app-versions', data);
        return response.data?.data;
    },
    updateAppVersion: async (id: string, data: any): Promise<AdminAppVersion> => {
        const response = await apiClient.patch(`/admin/app-versions/${id}`, data);
        return response.data?.data;
    },
    deleteAppVersion: async (id: string): Promise<string> => {
        const response = await apiClient.delete(`/admin/app-versions/${id}`);
        return response.data?.data || id;
    },

    // Audit Logs
    getAuditLogs: async (limit: number = 100): Promise<AdminAuditLog[]> => {
        const response = await apiClient.get('/admin/audit/logs', { params: { limit } });
        return response.data?.data || [];
    }
};
