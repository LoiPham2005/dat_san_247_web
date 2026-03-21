import apiClient from "@/lib/api/axios";

export type PolicyType = 'TERMS_OF_SERVICE' | 'PRIVACY_POLICY' | 'REFUND_POLICY' | 'CANCELLATION_POLICY' | 'COOKIE_POLICY' | 'COMMUNITY_GUIDELINES';
export type FaqCategory = 'GENERAL' | 'BOOKING' | 'PAYMENT' | 'CANCELLATION' | 'ACCOUNT' | 'VENUE';

export interface AdminPolicy {
    id: string;
    type: PolicyType;
    title: string;
    content: string;
    version: string;
    is_current: boolean;
    effective_date: string;
    requires_acceptance: boolean;
    created_at: string;
    author?: {
        full_name: string;
    };
}

export interface AdminFaq {
    id: string;
    category: FaqCategory;
    question: string;
    answer: string;
    display_order: number;
    is_active: boolean;
    created_at: string;
    author?: {
        full_name: string;
    };
}

export const adminContentApi = {
    // Policies
    getPolicies: async (): Promise<AdminPolicy[]> => {
        const response = await apiClient.get('/admin/content/policies');
        return response.data?.data || [];
    },
    upsertPolicy: async (data: any): Promise<AdminPolicy> => {
        const response = await apiClient.post('/admin/content/policies', data);
        return response.data?.data;
    },

    // FAQs
    getFaqs: async (): Promise<AdminFaq[]> => {
        const response = await apiClient.get('/admin/content/faqs');
        return response.data?.data || [];
    },
    createFaq: async (data: any): Promise<AdminFaq> => {
        const response = await apiClient.post('/admin/content/faqs', data);
        return response.data?.data;
    },
    updateFaq: async (id: string, data: any): Promise<AdminFaq> => {
        const response = await apiClient.patch(`/admin/content/faqs/${id}`, data);
        return response.data?.data;
    },
    deleteFaq: async (id: string): Promise<string> => {
        const response = await apiClient.delete(`/admin/content/faqs/${id}`);
        return response.data?.data || id;
    }
};
