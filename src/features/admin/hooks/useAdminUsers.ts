import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminUserApi, UserStatus, RoleSlug, KycStatus, AdminUser, AdminRole } from '../api/admin-user.api';
import { toast } from 'sonner';

export const useAdminUsers = (params?: any) => {
    const queryClient = useQueryClient();

    const usersQuery = useQuery({
        queryKey: ['admin_users', params],
        queryFn: () => adminUserApi.getUsers(params),
    });

    const rolesQuery = useQuery({
        queryKey: ['admin_roles'],
        queryFn: adminUserApi.getRoles,
        staleTime: 1000 * 60 * 60, // Roles don't change often
    });

    const createUserMutation = useMutation({
        mutationFn: (data: any) => adminUserApi.createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_users'] });
            toast.success("Tạo tài khoản thành công");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Tạo tài khoản thất bại";
            toast.error(message);
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: UserStatus }) => adminUserApi.updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_users'] });
            toast.success("Cập nhật trạng thái thành công");
        },
        onError: () => toast.error("Cập nhật trạng thái thất bại")
    });

    const updateRoleMutation = useMutation({
        mutationFn: ({ id, roleId }: { id: string, roleId: string }) => adminUserApi.updateRole(id, roleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_users'] });
            toast.success("Cập nhật phân quyền thành công");
        },
        onError: () => toast.error("Cập nhật phân quyền thất bại")
    });

    const updateKycMutation = useMutation({
        mutationFn: ({ id, kyc_status }: { id: string, kyc_status: KycStatus }) => adminUserApi.updateKyc(id, kyc_status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_users'] });
            toast.success("Cập nhật trạng thái KYC thành công");
        },
        onError: () => toast.error("Cập nhật trạng thái KYC thất bại")
    });

    return {
        users: usersQuery.data?.items || [],
        meta: usersQuery.data?.meta,
        roles: rolesQuery.data || [],
        isLoading: usersQuery.isLoading || rolesQuery.isLoading,
        createUser: createUserMutation.mutateAsync,
        isCreating: createUserMutation.isPending,
        updateStatus: updateStatusMutation.mutate,
        isUpdatingStatus: updateStatusMutation.isPending,
        updateRole: updateRoleMutation.mutate,
        isUpdatingRole: updateRoleMutation.isPending,
        updateKyc: updateKycMutation.mutate,
        isUpdatingKyc: updateKycMutation.isPending,
    };
};
