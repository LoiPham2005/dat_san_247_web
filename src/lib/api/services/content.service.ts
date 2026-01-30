import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export const contentService = {
    getBanners: async (): Promise<any[]> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.BANNERS);
        // Backend returns { success: boolean, data: array } or array directly
        return Array.isArray(data) ? data : data.data || [];
    },

    createBanner: async (formData: FormData): Promise<any> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.BANNERS, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },

    updateBanner: async (id: string, formData: FormData): Promise<any> => {
        const { data } = await axiosInstance.patch(API_ENDPOINTS.BANNER_BY_ID(id), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },

    deleteBanner: async (id: string): Promise<void> => {
        await axiosInstance.delete(API_ENDPOINTS.BANNER_BY_ID(id));
    },

    // Blogs
    getBlogs: async (): Promise<any[]> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.BLOGS);
        return Array.isArray(data) ? data : data.data || [];
    },

    createBlog: async (formData: FormData): Promise<any> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.BLOGS, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    },

    updateBlog: async (id: string, formData: FormData): Promise<any> => {
        const { data } = await axiosInstance.patch(API_ENDPOINTS.BLOG_BY_ID(id), formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    },

    deleteBlog: async (id: string): Promise<void> => {
        await axiosInstance.delete(API_ENDPOINTS.BLOG_BY_ID(id));
    },

    // Email Templates
    getEmailTemplates: async (): Promise<any[]> => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.EMAIL_TEMPLATES);
        return Array.isArray(data) ? data : data.data || [];
    },

    createEmailTemplate: async (payload: any): Promise<any> => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.EMAIL_TEMPLATES, payload);
        return data;
    },

    updateEmailTemplate: async (id: string, payload: any): Promise<any> => {
        const { data } = await axiosInstance.patch(API_ENDPOINTS.EMAIL_TEMPLATE_BY_ID(id), payload);
        return data;
    },

    deleteEmailTemplate: async (id: string): Promise<void> => {
        await axiosInstance.delete(API_ENDPOINTS.EMAIL_TEMPLATE_BY_ID(id));
    },
};
