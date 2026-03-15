export type SupportTicketCategory = 'ACCOUNT' | 'BOOKING' | 'PAYMENT' | 'VENUE' | 'TECHNICAL' | 'REFUND' | 'REPORT' | 'OTHER';
export type SupportTicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type SupportTicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | 'CANCELLED';

export interface CustomerTicket {
    id: string;
    ticket_number: string;
    category: SupportTicketCategory;
    priority: SupportTicketPriority;
    status: SupportTicketStatus;
    subject: string;
    description: string;
    resolution: string | null;
    customer_rating: number | null;
    created_at: string;
}

export interface CustomerTicketMessage {
    id: string;
    ticket_id: string;
    sender_id: string;
    message: string;
    is_staff: boolean;
    created_at: string;
}

const mockTickets: CustomerTicket[] = [
    {
        id: 'T-001',
        ticket_number: 'SUP-2026-03-001',
        category: 'PAYMENT',
        priority: 'HIGH',
        status: 'RESOLVED',
        subject: 'BK99999 Hủy sân nhưng chưa nhận được tiền hoàn về ví',
        description: 'Tôi đã hủy đặt booking BK99999 và hệ thống báo đã hoàn 300K, nhưng kiểm tra lịch sử ví lại không thấy.',
        resolution: 'Dạ, do giao dịch VNPay bị delay khoản 15 phút. Tiền của anh đã vào ví lúc 10h sáng rồi ạ.',
        customer_rating: 5,
        created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
        id: 'T-002',
        ticket_number: 'SUP-2026-03-010',
        category: 'REPORT',
        priority: 'MEDIUM',
        status: 'IN_PROGRESS',
        subject: 'Chủ sân Sân Bóng Vipe Cầu Giấy thu phụ phí không báo trước',
        description: 'Tôi ra sân thì chủ sân bảo phải đóng thêm 20K tiền gửi xe, bảng giá trên web lại báo miễn phí. Mong app xử lý.',
        resolution: null,
        customer_rating: null,
        created_at: new Date(Date.now() - 86400000).toISOString()
    }
];

const mockMessages: CustomerTicketMessage[] = [
    { id: 'M-1', ticket_id: 'T-002', sender_id: 'U-1', message: 'Tôi ra sân thì chủ sân bảo phải đóng thêm 20K tiền gửi xe, bảng giá trên web lại báo miễn phí. Mong app xử lý.', is_staff: false, created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 'M-2', ticket_id: 'T-002', sender_id: 'S-1', message: 'Chào bạn, cảm ơn bạn đã phản ánh. DatSan247 đang liên hệ xác minh lại với chủ sân Vipe Cầu Giấy và sẽ phạt nếu có vi phạm. Bộ phận CSKH xin gửi tặng bạn 1 Voucher 50K đền bù ạ.', is_staff: true, created_at: new Date(Date.now() - 40000000).toISOString() }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const customerSupportApi = {
    getMyTickets: async (): Promise<CustomerTicket[]> => {
        await delay(500);
        return mockTickets;
    },
    createTicket: async (data: Partial<CustomerTicket>): Promise<CustomerTicket> => {
        await delay(800);
        const newTicket: CustomerTicket = {
            id: 'T-' + Math.random().toString(),
            ticket_number: `SUP-2026-${Math.floor(Math.random() * 1000)}`,
            category: data.category || 'OTHER',
            priority: data.priority || 'MEDIUM',
            status: 'OPEN',
            subject: data.subject || '',
            description: data.description || '',
            resolution: null,
            customer_rating: null,
            created_at: new Date().toISOString()
        };
        mockTickets.unshift(newTicket);
        return newTicket;
    },
    getTicketMessages: async (ticketId: string): Promise<CustomerTicketMessage[]> => {
        await delay(400);
        return mockMessages.filter(m => m.ticket_id === ticketId);
    },
    replyToTicket: async (ticketId: string, message: string): Promise<boolean> => {
        await delay(500);
        return true;
    },
    closeTicket: async (ticketId: string): Promise<boolean> => {
        await delay(300);
        return true;
    },
    rateTicket: async (ticketId: string, rating: number): Promise<boolean> => {
        await delay(300);
        return true;
    }
};
