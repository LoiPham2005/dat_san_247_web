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

const mockReports: StaffReport[] = [
    {
        id: 'REP-001',
        target_type: 'VENUE',
        target_id: 'VN-129',
        target_name: 'Sân Bóng Đá Cầu Giấy',
        reason: 'INAPPROPRIATE_CONTENT',
        description: 'Chủ sân đăng ảnh phản cảm trên phần giới thiệu',
        status: 'PENDING',
        created_at: '2026-03-10T11:00:00Z',
        reporter_name: 'Khách hàng Ẩn danh'
    },
    {
        id: 'REP-002',
        target_type: 'USER',
        target_id: 'US-991',
        target_name: 'Nguyễn Văn Spam',
        reason: 'SPAM',
        description: 'Tạo nhiều booking ảo rồi không đến',
        status: 'PENDING',
        created_at: '2026-03-09T18:30:00Z',
        reporter_name: 'Sân Cỏ Nhân Tạo X'
    }
];

const mockReviews: StaffReview[] = [
    {
        id: 'REV-001',
        venue_name: 'Sân Bóng Cầu Giấy',
        customer_name: 'Trần Văn B',
        rating: 1,
        comment: 'Sân như cc dcm chủ sân lừa đảo rách việc',
        is_visible: true,
        created_at: '2026-03-10T09:00:00Z'
    },
    {
        id: 'REV-002',
        venue_name: 'Sân Cầu Lông ABC',
        customer_name: 'Lê C',
        rating: 5,
        comment: 'Sân đẹp, giá rẻ, chủ thân thiện.',
        is_visible: true,
        created_at: '2026-03-09T10:00:00Z'
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const staffModerationApi = {
    getPendingReports: async (): Promise<StaffReport[]> => {
        await delay(400);
        return [...mockReports].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    
    escalateReportToAdmin: async (reportId: string): Promise<StaffReport> => {
        await delay(500);
        const report = mockReports.find(r => r.id === reportId);
        if (!report) throw new Error("Report not found");
        report.status = 'REVIEWING'; // Staff chuyển lên Admin (đánh dấu REVIEWING)
        return { ...report };
    },

    getReviewsForModeration: async (): Promise<StaffReview[]> => {
        await delay(400);
        return [...mockReviews].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },

    toggleReviewVisibility: async (reviewId: string, isVisible: boolean): Promise<StaffReview> => {
        await delay(300);
        const review = mockReviews.find(r => r.id === reviewId);
        if (!review) throw new Error("Review not found");
        review.is_visible = isVisible;
        return { ...review };
    }
};
