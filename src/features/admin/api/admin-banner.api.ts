export type BannerPosition = 'HOME_TOP' | 'HOME_MIDDLE' | 'VENUE_DETAIL' | 'PROMOTION_MODAL';
export type BannerType = 'IMAGE' | 'VIDEO';
export type BannerActionType = 'NONE' | 'URL' | 'VENUE' | 'PROMOTION';
export type BannerPage = 'HOME' | 'VENUE_LIST' | 'VENUE_DETAIL' | 'BOOKING' | 'PROMOTION' | 'SEARCH' | 'PROFILE';

export interface AdminBanner {
    id: string;
    title: string;
    position: BannerPosition;
    type: BannerType;
    desktop_image_url: string | null;
    action_type: BannerActionType;
    start_date: string;
    end_date: string | null;
    is_active: boolean;
    impressions: number;
    clicks: number;
    pages: BannerPage[];
    created_at: string;
    action_url: string | null;
}

const mockBanners: AdminBanner[] = [
    {
        id: 'BAN-001',
        title: 'Siêu Hội Thể Thao Mùa Hè',
        position: 'HOME_TOP',
        type: 'IMAGE',
        desktop_image_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2000&auto=format&fit=crop',
        action_type: 'PROMOTION',
        action_url: null,
        start_date: '2026-03-01T00:00:00Z',
        end_date: '2026-05-31T23:59:59Z',
        is_active: true,
        impressions: 145020,
        clicks: 12530,
        pages: ['HOME'],
        created_at: '2026-02-28T10:00:00Z'
    },
    {
        id: 'BAN-002',
        title: 'Giảm 20% Đặt Liền Tay Tặng Ngay Nước Suối',
        position: 'HOME_MIDDLE',
        type: 'IMAGE',
        desktop_image_url: 'https://images.unsplash.com/photo-1626014441584-c5a4db82bf06?q=80&w=2000&auto=format&fit=crop',
        action_type: 'URL',
        action_url: 'https://datsan247.vn/promotions',
        start_date: '2026-03-05T00:00:00Z',
        end_date: null,
        is_active: true,
        impressions: 45000,
        clicks: 8900,
        pages: ['HOME', 'VENUE_LIST'],
        created_at: '2026-03-04T15:30:00Z'
    },
    {
        id: 'BAN-003',
        title: 'Giới Thiệu Sân Cầu Lông Tân Bình VIP',
        position: 'VENUE_DETAIL',
        type: 'VIDEO',
        desktop_image_url: 'https://images.unsplash.com/photo-1613918431703-9bbdf02cb48a?q=80&w=2000&auto=format&fit=crop', // Thumbnail
        action_type: 'VENUE',
        action_url: null,
        start_date: '2025-10-01T00:00:00Z',
        end_date: '2025-12-31T23:59:59Z',
        is_active: false, // Hết hạn
        impressions: 258000,
        clicks: 45000,
        pages: ['SEARCH', 'VENUE_DETAIL'],
        created_at: '2025-09-25T08:00:00Z'
    }
];

import apiClient from "@/lib/api/axios";

export const adminBannerApi = {
    getBanners: async (): Promise<AdminBanner[]> => {
        const response = await apiClient.get('/admin/content/banners');
        return response.data?.data || [];
    },
    toggleActive: async (id: string, is_active: boolean): Promise<AdminBanner> => {
        const response = await apiClient.patch(`/admin/content/banners/${id}/active`, { is_active });
        return response.data?.data;
    },
    createBanner: async (data: any): Promise<AdminBanner> => {
        const response = await apiClient.post('/admin/content/banners', data);
        return response.data?.data;
    },
    updateBanner: async (id: string, data: any): Promise<AdminBanner> => {
        const response = await apiClient.patch(`/admin/content/banners/${id}`, data);
        return response.data?.data;
    },
    deleteBanner: async (id: string): Promise<string> => {
        const response = await apiClient.delete(`/admin/content/banners/${id}`);
        return response.data?.data || id;
    }
};
