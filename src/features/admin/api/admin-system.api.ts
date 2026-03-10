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
    price_multiplier: number;
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
}

export interface AdminAuditLog {
    id: string;
    actor_role: string;
    action: string;
    entity_name: string;
    entity_id: string | null;
    ip_address: string | null;
    created_at: string;
    user_id: string | null; // ID người thực hiện
}

// MOCKS
const mockSettings: AdminSetting[] = [
    { id: 'SET-01', key: 'PLATFORM_COMMISSION_RATE', value: '10', data_type: 'NUMBER', description: 'Tỷ lệ nền tảng (cố định mặc định, %)', is_active: true, group_name: 'FINANCE' },
    { id: 'SET-02', key: 'MINIMUM_WITHDRAWAL', value: '500000', data_type: 'NUMBER', description: 'Số tiền rút tối thiểu (VNĐ)', is_active: true, group_name: 'FINANCE' },
    { id: 'SET-03', key: 'MAINTENANCE_MODE', value: 'false', data_type: 'BOOLEAN', description: 'Bật chế độ bảo trì toàn hệ thống', is_active: true, group_name: 'SYSTEM' },
    { id: 'SET-04', key: 'MAX_BOOKING_DAYS_AHEAD', value: '30', data_type: 'NUMBER', description: 'Số ngày khách có thể đặt trước', is_active: true, group_name: 'BOOKING' },
];

const mockHolidays: AdminHoliday[] = [
    { id: 'HOL-01', holiday_date: '2026-04-30T00:00:00Z', holiday_name: 'Ngày Giải Phóng Miền Nam', is_recurring: true, price_multiplier: 1.5, is_active: true },
    { id: 'HOL-02', holiday_date: '2026-05-01T00:00:00Z', holiday_name: 'Quốc Tế Lao Động', is_recurring: true, price_multiplier: 1.5, is_active: true },
    { id: 'HOL-03', holiday_date: '2026-02-14T00:00:00Z', holiday_name: 'Tết Nguyên Đán (Mùng 1)', is_recurring: false, price_multiplier: 2.0, is_active: true },
];

const mockAppVersions: AdminAppVersion[] = [
    { id: 'APP-01', platform: 'ANDROID', version_number: '1.2.0', build_number: 14, is_force_update: false, release_notes: 'Fix lỗi thanh toán VNPAY, Tối ưu giao diện Booking.', is_active: true, released_at: '2026-03-01T10:00:00Z' },
    { id: 'APP-02', platform: 'IOS', version_number: '1.2.0', build_number: 15, is_force_update: true, release_notes: 'Bản vá khẩn cấp: Lỗi crash trên iOS 18', is_active: true, released_at: '2026-03-05T14:30:00Z' },
];

const mockAuditLogs: AdminAuditLog[] = [
    { id: 'LOG-001', actor_role: 'SUPER_ADMIN', action: 'UPDATE', entity_name: 'settings', entity_id: 'SET-01', ip_address: '192.168.1.100', created_at: '2026-03-10T09:15:00Z', user_id: 'ADMIN-MASTER' },
    { id: 'LOG-002', actor_role: 'ADMIN', action: 'DELETE', entity_name: 'venues', entity_id: 'VN-123', ip_address: '118.69.100.22', created_at: '2026-03-10T08:45:00Z', user_id: 'ADMIN-02' },
    { id: 'LOG-003', actor_role: 'SYSTEM', action: 'CRON_PAYOUT', entity_name: 'payout_requests', entity_id: null, ip_address: '127.0.0.1', created_at: '2026-03-10T00:00:00Z', user_id: null },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const adminSystemApi = {
    getSettings: async (): Promise<AdminSetting[]> => {
        await delay(300);
        return [...mockSettings];
    },
    updateSetting: async (id: string, value: string): Promise<AdminSetting> => {
        await delay(400);
        const setting = mockSettings.find(s => s.id === id);
        if (!setting) throw new Error("Setting not found");
        setting.value = value;
        return { ...setting };
    },
    getHolidays: async (): Promise<AdminHoliday[]> => {
        await delay(300);
        return [...mockHolidays];
    },
    getAppVersions: async (): Promise<AdminAppVersion[]> => {
        await delay(300);
        return [...mockAppVersions];
    },
    getAuditLogs: async (): Promise<AdminAuditLog[]> => {
        await delay(400);
        return [...mockAuditLogs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
};
