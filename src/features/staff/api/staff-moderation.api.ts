import apiClient from '@/lib/api/axios';

export type ReportTargetType = 'USER' | 'VENUE' | 'REVIEW';
export type ReportStatus = 'PENDING' | 'REVIEWING' | 'RESOLVED' | 'DISMISSED';

export interface StaffReport {
    id: string;
    target_type: ReportTargetType;
    target_id: string;
    target_name: string;
    reason: string;
    description: string | null;
    status: ReportStatus;
    created_at: string;
    reporter_name: string;
}

export interface StaffReview {
    id: string;
    venue_name: string;
    customer_name: string;
    rating: number;
    comment: string | null;
    is_visible: boolean;
    created_at: string;
}

export const staffModerationApi = {
    getPendingReports: async (): Promise<StaffReport[]> => {
        const response = await apiClient.get('/admin/support/reports');
        return response.data.data;
    },
    
    escalateReportToAdmin: async (reportId: string): Promise<StaffReport> => {
        const response = await apiClient.patch(`/admin/support/reports/${reportId}`, {
            status: 'REVIEWING'
        });
        return response.data.data;
    },

    getReviewsForModeration: async (): Promise<StaffReview[]> => {
        const response = await apiClient.get('/admin/support/reviews');
        return response.data.data;
    },

    toggleReviewVisibility: async (reviewId: string, isVisible: boolean): Promise<StaffReview> => {
        const response = await apiClient.patch(`/admin/support/reviews/${reviewId}`, {
            is_visible: isVisible
        });
        return response.data.data;
    }
};
