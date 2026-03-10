import { useQuery } from '@tanstack/react-query';
import { adminContentApi } from '../api/admin-content.api';

export const useAdminContent = () => {
    const policiesQuery = useQuery({
        queryKey: ['admin_policies'],
        queryFn: adminContentApi.getPolicies,
    });

    const faqsQuery = useQuery({
        queryKey: ['admin_faqs'],
        queryFn: adminContentApi.getFaqs,
    });

    return {
        policies: policiesQuery.data || [],
        isLoadingPolicies: policiesQuery.isLoading,
        faqs: faqsQuery.data || [],
        isLoadingFaqs: faqsQuery.isLoading,
    };
};
