import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerSupportApi, CustomerTicket } from '../api/customer-support.api';
import { toast } from 'sonner';

export const useCustomerTickets = () => {
    return useQuery({
        queryKey: ['my_support_tickets'],
        queryFn: () => customerSupportApi.getMyTickets(),
    });
};

export const useCreateTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<CustomerTicket>) => customerSupportApi.createTicket(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my_support_tickets'] });
            toast.success('Yêu cầu hỗ trợ đã được gửi. Chúng tôi sẽ phản hồi sớm nhất.');
        },
        onError: () => toast.error('Lỗi khi gửi yêu cầu')
    });
};

export const useTicketMessages = (ticketId: string) => {
    return useQuery({
        queryKey: ['ticket_messages', ticketId],
        queryFn: () => customerSupportApi.getTicketMessages(ticketId),
        enabled: !!ticketId
    });
};

export const useReplyToTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ ticketId, message }: { ticketId: string, message: string }) => customerSupportApi.replyToTicket(ticketId, message),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['ticket_messages', variables.ticketId] });
            toast.success('Gửi tin nhắn thành công.');
        },
        onError: () => toast.error('Gửi tin nhắn thất bại')
    });
};

export const useRateTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ ticketId, rating }: { ticketId: string, rating: number }) => customerSupportApi.rateTicket(ticketId, rating),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my_support_tickets'] });
            toast.success('Cảm ơn bạn đã đánh giá dịch vụ hỗ trợ!');
        },
    });
};
