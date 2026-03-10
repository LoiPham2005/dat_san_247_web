import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { staffSupportApi } from '../api/staff-support.api';
import { toast } from 'sonner';

export const useStaffSupport = () => {
    const queryClient = useQueryClient();

    const ticketsQuery = useQuery({ queryKey: ['staff_tickets'], queryFn: staffSupportApi.getAssignedTickets });

    const resolveTicket = useMutation({
        mutationFn: (ticketId: string) => staffSupportApi.resolveTicket(ticketId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff_tickets'] });
            toast.success("Đã đóng Ticket thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi đóng Ticket")
    });

    return {
        tickets: ticketsQuery.data || [],
        isLoading: ticketsQuery.isLoading,
        resolveTicket: resolveTicket.mutate,
        isResolving: resolveTicket.isPending,
    };
};

export const useStaffTicketChat = (ticketId: string | null) => {
    const queryClient = useQueryClient();

    const messagesQuery = useQuery({ 
        queryKey: ['staff_ticket_messages', ticketId], 
        queryFn: () => staffSupportApi.getTicketMessages(ticketId!),
        enabled: !!ticketId 
    });

    const sendMessage = useMutation({
        mutationFn: (message: string) => staffSupportApi.sendMessage(ticketId!, message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff_ticket_messages', ticketId] });
            queryClient.invalidateQueries({ queryKey: ['staff_tickets'] }); // IN_PROGRESS status update
        },
        onError: () => toast.error("Không thể gửi tin nhắn phản hồi")
    });

    return {
        messages: messagesQuery.data || [],
        isLoading: messagesQuery.isLoading,
        sendMessage: sendMessage.mutate,
        isSending: sendMessage.isPending,
    };
};
