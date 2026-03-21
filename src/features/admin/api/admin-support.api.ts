export type SupportTicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | 'REOPENED';
export type SupportTicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type SupportTicketCategory = 'BOOKING_ISSUE' | 'PAYMENT_ISSUE' | 'VENUE_ISSUE' | 'ACCOUNT_ISSUE' | 'REFUND_REQUEST' | 'OTHER';

export type ReportTargetType = 'USER' | 'VENUE' | 'REVIEW' | 'TRANSACTION';
export type ReportReason = 'SPAM' | 'INAPPROPRIATE' | 'FAKE' | 'FRAUD' | 'DISPUTE_TRANSACTION' | 'OTHER';
export type ReportStatus = 'PENDING' | 'REVIEWING' | 'RESOLVED' | 'DISMISSED';
export type ReportAction = 'WARN' | 'BAN' | 'SUSPEND' | 'REFUND' | 'DISMISS' | 'OTHER';

export interface AdminTicket {
    id: string;
    customer_name: string;
    customer_email: string;
    category: SupportTicketCategory;
    subject: string;
    priority: SupportTicketPriority;
    status: SupportTicketStatus;
    assigned_to_id: string | null;
    assigned_to_name: string | null;
    created_at: string;
    updated_at: string;
}

export interface AdminReport {
    id: string;
    target_type: ReportTargetType;
    target_id: string;
    reason: ReportReason;
    description: string;
    status: ReportStatus;
    action_taken: ReportAction | null;
    reporter_name: string;
    created_at: string;
}

export interface AdminReview {
    id: string;
    venue_name: string;
    customer_name: string;
    rating: number;
    comment: string;
    is_visible: boolean;
    created_at: string;
}

const mockTickets: AdminTicket[] = [
    {
        id: 'TKT-1001',
        customer_name: 'Trần Khách Hàng',
        customer_email: 'khach@gmail.com',
        category: 'REFUND_REQUEST',
        subject: 'Yêu cầu hoàn tiền Sân Bóng do trời mưa bão dột nát',
        priority: 'HIGH',
        status: 'OPEN',
        assigned_to_id: null,
        assigned_to_name: null,
        created_at: '2026-03-10T09:00:00Z',
        updated_at: '2026-03-10T09:00:00Z'
    },
    {
        id: 'TKT-1002',
        customer_name: 'Lê Thanh Phức',
        customer_email: 'lethanh@gmail.com',
        category: 'PAYMENT_ISSUE',
        subject: 'Đã thanh toán MoMo nhưng hệ thống báo lỗi PENDING',
        priority: 'URGENT',
        status: 'IN_PROGRESS',
        assigned_to_id: 'STAFF-01',
        assigned_to_name: 'Nguyễn CSKH',
        created_at: '2026-03-09T14:30:00Z',
        updated_at: '2026-03-09T15:00:00Z'
    },
    {
        id: 'TKT-1003',
        customer_name: 'Hoàng Chủ Sân',
        customer_email: 'owner@tennis.com',
        category: 'ACCOUNT_ISSUE',
        subject: 'Xin KYC lại tài khoản do nhập sai CCCD',
        priority: 'MEDIUM',
        status: 'RESOLVED',
        assigned_to_id: 'STAFF-02',
        assigned_to_name: 'Trương Hỗ Trợ',
        created_at: '2026-03-08T10:00:00Z',
        updated_at: '2026-03-08T16:20:00Z'
    }
];

const mockReports: AdminReport[] = [
    {
        id: 'RPT-001',
        target_type: 'VENUE',
        target_id: 'VN-999',
        reason: 'FAKE',
        description: 'Sân này để hình ảo, ra thực tế là bãi đất trống chưa xây dựng xong!',
        status: 'PENDING',
        action_taken: null,
        reporter_name: 'Khách Qua Đường',
        created_at: '2026-03-10T08:00:00Z'
    },
    {
        id: 'RPT-002',
        target_type: 'REVIEW',
        target_id: 'RV-888',
        reason: 'INAPPROPRIATE',
        description: 'Tài khoản này chửi bới văng tục xúc phạm tôi trong lúc đá bóng',
        status: 'REVIEWING',
        action_taken: null,
        reporter_name: 'Chủ Sân Tân Bình',
        created_at: '2026-03-09T19:00:00Z'
    }
];

const mockReviews: AdminReview[] = [
    {
        id: 'RV-888',
        venue_name: 'Sân Tennis Chuẩn Olympic',
        customer_name: 'Kẻ Bất Mãn',
        rating: 1,
        comment: 'Sân chó má, nhân viên thái độ lồi lõm dkm lũ lừa đảo!',
        is_visible: true,
        created_at: '2026-03-09T18:30:00Z'
    },
    {
        id: 'RV-889',
        venue_name: 'Cầu Lông Viettel',
        customer_name: 'Người Tử Tế',
        rating: 5,
        comment: 'Sân đẹp tuyệt vời, rẻ, sạch sẽ. Đáng tiền.',
        is_visible: true,
        created_at: '2026-03-08T10:00:00Z'
    }
];

import apiClient from "@/lib/api/axios";

export const adminSupportApi = {
    getTickets: async (): Promise<AdminTicket[]> => {
        const response = await apiClient.get('/admin/support/tickets');
        return response.data?.data || [];
    },
    updateTicket: async (id: string, status?: SupportTicketStatus, assigned_to_name?: string): Promise<AdminTicket> => {
        const response = await apiClient.patch(`/admin/support/tickets/${id}`, { status, assigned_to_name });
        return response.data?.data;
    },
    getReports: async (): Promise<AdminReport[]> => {
        const response = await apiClient.get('/admin/support/reports');
        return response.data?.data || [];
    },
    updateReport: async (id: string, status: ReportStatus, action: ReportAction | null): Promise<AdminReport> => {
        const response = await apiClient.patch(`/admin/support/reports/${id}`, { status, action });
        return response.data?.data;
    },
    getReviews: async (): Promise<AdminReview[]> => {
        const response = await apiClient.get('/admin/reviews');
        return response.data?.data || [];
    },
    toggleReviewVisibility: async (id: string, is_visible: boolean): Promise<AdminReview> => {
        const response = await apiClient.patch(`/admin/reviews/${id}/visibility`, { is_visible });
        return response.data?.data;
    }
};
