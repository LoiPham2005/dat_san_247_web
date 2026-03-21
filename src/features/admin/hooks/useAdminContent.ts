import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminContentApi } from '../api/admin-content.api';
import { toast } from 'sonner';

export const useAdminContent = () => {
    const queryClient = useQueryClient();

    // POLICIES
    const policiesQuery = useQuery({
        queryKey: ['admin_policies'],
        queryFn: adminContentApi.getPolicies,
    });

    const upsertPolicy = useMutation({
        mutationFn: adminContentApi.upsertPolicy,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_policies'] });
            toast.success("Cập nhật Chính sách thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi Cập nhật Chính sách")
    });

    // FAQS
    const faqsQuery = useQuery({
        queryKey: ['admin_faqs'],
        queryFn: adminContentApi.getFaqs,
    });

    const createFaq = useMutation({
        mutationFn: adminContentApi.createFaq,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_faqs'] });
            toast.success("Thêm Câu hỏi thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi Thêm Câu hỏi")
    });

    const updateFaq = useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => adminContentApi.updateFaq(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_faqs'] });
            toast.success("Cập nhật Câu hỏi thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi Cập nhật Câu hỏi")
    });

    const deleteFaq = useMutation({
        mutationFn: adminContentApi.deleteFaq,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_faqs'] });
            toast.success("Xóa Câu hỏi thành công");
        },
        onError: () => toast.error("Có lỗi xảy ra khi Xóa Câu hỏi")
    });

    return {
        // Policies
        policies: policiesQuery.data || [],
        isLoadingPolicies: policiesQuery.isLoading,
        upsertPolicy: upsertPolicy.mutate,
        isUpsertingPolicy: upsertPolicy.isPending,

        // FAQs
        faqs: faqsQuery.data || [],
        isLoadingFaqs: faqsQuery.isLoading,
        createFaq: createFaq.mutate,
        isCreatingFaq: createFaq.isPending,
        updateFaq: updateFaq.mutate,
        isUpdatingFaq: updateFaq.isPending,
        deleteFaq: deleteFaq.mutate,
        isDeletingFaq: deleteFaq.isPending,
    };
};
