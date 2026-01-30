import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import { Promotion, CreatePromotionDto, UpdatePromotionDto } from '@/types/promotion.types';

export const promotionsService = {
    getAll: async (params?: any): Promise<{ items: Promotion[]; meta: any }> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN_PROMOTIONS, { params });
        return data.data;
    },

    create: async (data: CreatePromotionDto): Promise<Promotion> => {
        const { data: response } = await axiosInstance.post(API_ENDPOINTS.ADMIN_PROMOTIONS, data);
        return response.data;
    },

    update: async (id: string, data: UpdatePromotionDto): Promise<Promotion> => {
        const { data: response } = await axiosInstance.put(API_ENDPOINTS.ADMIN_PROMOTION_BY_ID(id), data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(API_ENDPOINTS.ADMIN_PROMOTION_BY_ID(id));
    },

    getOwnerPromotions: async (params?: any): Promise<{ items: Promotion[]; meta: any }> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.OWNER_PROMOTIONS, { params });
        return data.data;
    },

    createByOwner: async (data: any): Promise<Promotion> => {
        const { data: response } = await axiosInstance.post(API_ENDPOINTS.OWNER_PROMOTIONS, data);
        return response.data;
    },

    deleteByOwner: async (id: string): Promise<void> => {
        await axiosInstance.delete(API_ENDPOINTS.OWNER_PROMOTION_BY_ID(id));
    },

    getPublic: async (params?: any): Promise<{ items: Promotion[]; meta: any }> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.PUBLIC_PROMOTIONS, { params });
        return data.data;
    },
};
