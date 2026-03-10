export type SupportTicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | 'REOPENED';
export type SupportTicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface TicketMessage {
    id: string;
    ticket_id: string;
    sender_id: string;
    sender_name: string;
    sender_role: 'CUSTOMER' | 'STAFF' | 'ADMIN';
    message: string;
    created_at: string;
}

export interface StaffTicket {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    subject: string;
    category: string;
    priority: SupportTicketPriority;
    status: SupportTicketStatus;
    assigned_to_id: string; // ID của Staff đang đăng nhập
    created_at: string;
    related_booking_id: string | null;
}

// MOCK DATA
const currentStaffId = 'STAFF-01'; // Giả lập nhân viên "Nguyễn CSKH"

const mockTickets: StaffTicket[] = [
    {
        id: 'TKT-1002',
        customer_name: 'Lê Thanh Phức',
        customer_email: 'lethanh@gmail.com',
        customer_phone: '0987654321',
        category: 'PAYMENT_ISSUE',
        subject: 'Đã thanh toán MoMo nhưng hệ thống báo lỗi PENDING',
        priority: 'URGENT',
        status: 'IN_PROGRESS',
        assigned_to_id: currentStaffId,
        created_at: '2026-03-09T14:30:00Z',
        related_booking_id: 'BK-55512' // Tham chiếu booking
    },
    {
        id: 'TKT-1004',
        customer_name: 'Phạm Huấn',
        customer_email: 'phamhuan@gmail.com',
        customer_phone: '0901234567',
        category: 'BOOKING_ISSUE',
        subject: 'Muốn dời lịch đá bóng sang tuấn sau do mưa lớn',
        priority: 'HIGH',
        status: 'OPEN',
        assigned_to_id: currentStaffId,
        created_at: '2026-03-10T11:20:00Z',
        related_booking_id: 'BK-55599'
    }
];

const mockMessages: Record<string, TicketMessage[]> = {
    'TKT-1002': [
        { id: 'MSG-01', ticket_id: 'TKT-1002', sender_id: 'CUS-111', sender_name: 'Lê Thanh Phức', sender_role: 'CUSTOMER', message: 'Chào admin, mình vừa chuyển khoản 500k qua Momo nhưng app chưa trừ tiền mà cũng chưa thấy confirm sân. Kiểm tra giúp mình!', created_at: '2026-03-09T14:30:00Z' },
        { id: 'MSG-02', ticket_id: 'TKT-1002', sender_id: 'STAFF-01', sender_name: 'Nguyễn CSKH', sender_role: 'STAFF', message: 'Dạ, Đặt Sân 247 đã tiếp nhận phản hồi. Bạn Phức vui lòng chờ trong giây lát để hệ thống đối soát giao dịch Momo nhé.', created_at: '2026-03-09T14:35:00Z' }
    ],
    'TKT-1004': [
        { id: 'MSG-03', ticket_id: 'TKT-1004', sender_id: 'CUS-222', sender_name: 'Phạm Huấn', sender_role: 'CUSTOMER', message: 'Sân mưa ngập quá admin gọi chủ sân dời lịch cho mình sang tuần sau dc ko?', created_at: '2026-03-10T11:20:00Z' }
    ]
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const staffSupportApi = {
    getAssignedTickets: async (): Promise<StaffTicket[]> => {
        await delay(500);
        return [...mockTickets].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    
    getTicketMessages: async (ticketId: string): Promise<TicketMessage[]> => {
        await delay(300);
        return mockMessages[ticketId] || [];
    },

    sendMessage: async (ticketId: string, message: string): Promise<TicketMessage> => {
        await delay(400);
        const newMsg: TicketMessage = {
            id: `MSG-${Math.floor(Math.random() * 10000)}`,
            ticket_id: ticketId,
            sender_id: currentStaffId,
            sender_name: 'Nguyễn CSKH (You)',
            sender_role: 'STAFF',
            message: message,
            created_at: new Date().toISOString()
        };
        
        if (!mockMessages[ticketId]) {
            mockMessages[ticketId] = [];
        }
        mockMessages[ticketId].push(newMsg);
        
        // Auto update status to IN_PROGRESS if sending first message
        const ticket = mockTickets.find(t => t.id === ticketId);
        if (ticket && ticket.status === 'OPEN') {
            ticket.status = 'IN_PROGRESS';
        }
        
        return newMsg;
    },

    resolveTicket: async (ticketId: string): Promise<StaffTicket> => {
        await delay(500);
        const ticket = mockTickets.find(t => t.id === ticketId);
        if (!ticket) throw new Error("Ticket not found");
        ticket.status = 'RESOLVED';
        return { ...ticket };
    }
};
