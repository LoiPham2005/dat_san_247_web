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

    // Blogs
    const useBlogsQuery = () =>
        useQuery({
            queryKey: ['blogs'],
            queryFn: contentService.getBlogs,
        });

    const createBlogMutation = useMutation({
        mutationFn: (formData: FormData) => contentService.createBlog(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });

    const updateBlogMutation = useMutation({
        mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
            contentService.updateBlog(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });

    const deleteBlogMutation = useMutation({
        mutationFn: (id: string) => contentService.deleteBlog(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });

    // Email Templates
    const useEmailTemplatesQuery = () =>
        useQuery({
            queryKey: ['email-templates'],
            queryFn: contentService.getEmailTemplates,
        });

    const createEmailTemplateMutation = useMutation({
        mutationFn: (payload: any) => contentService.createEmailTemplate(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['email-templates'] });
        },
    });

    const updateEmailTemplateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: any }) =>
            contentService.updateEmailTemplate(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['email-templates'] });
        },
    });

    const deleteEmailTemplateMutation = useMutation({
        mutationFn: (id: string) => contentService.deleteEmailTemplate(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['email-templates'] });
        },
    });

    return {
        useBannersQuery,
        createBannerMutation,
        updateBannerMutation,
        deleteBannerMutation,
        // Blogs
        useBlogsQuery,
        createBlogMutation,
        updateBlogMutation,
        deleteBlogMutation,
        // Email Templates
        useEmailTemplatesQuery,
        createEmailTemplateMutation,
        updateEmailTemplateMutation,
        deleteEmailTemplateMutation,
    };
};
