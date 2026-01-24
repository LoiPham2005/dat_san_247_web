import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentService } from '@/lib/api/services/content.service';
import { useContentStore } from '@/lib/store/content.store';

export const useContent = () => {
    const queryClient = useQueryClient();
    const { setBanners } = useContentStore();

    const useBannersQuery = () =>
        useQuery({
            queryKey: ['banners'],
            queryFn: async () => {
                const data = await contentService.getBanners();
                setBanners(data);
                return data;
            },
        });

    const createBannerMutation = useMutation({
        mutationFn: (formData: FormData) => contentService.createBanner(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['banners'] });
        },
    });

    const updateBannerMutation = useMutation({
        mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
            contentService.updateBanner(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['banners'] });
        },
    });

    const deleteBannerMutation = useMutation({
        mutationFn: (id: string) => contentService.deleteBanner(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['banners'] });
        },
    });

    return {
        useBannersQuery,
        createBannerMutation,
        updateBannerMutation,
        deleteBannerMutation,
    };
};
