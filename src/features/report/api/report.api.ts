import apiClient from '@/lib/api/axios';

export type ReportTargetType = 'USER' | 'VENUE' | 'REVIEW';

export interface CreateReportDto {
    target_type: ReportTargetType;
    target_id: string;
    reason: string;
    description: string;
}

export const reportApi = {
    submitReport: async (data: CreateReportDto) => {
        const response = await apiClient.post('/support/reports', data);
        return response.data;
    }
};
