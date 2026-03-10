import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminUserApi, UserStatus, RoleSlug, KycStatus } from '../api/admin-user.api';
import { toast } from 'sonner';

export const useAdminUsers = () => {
    const queryClient = useQueryClient();

    const usersQuery = useQuery({
        queryKey: ['admin_users'],
        queryFn: adminUserApi.getUsers,
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
        mutationFn: ({ id, role }: { id: string, role: RoleSlug }) => adminUserApi.updateRole(id, role),
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
        users: usersQuery.data || [],
        isLoading: usersQuery.isLoading,
        updateStatus: updateStatusMutation.mutate,
        isUpdatingStatus: updateStatusMutation.isPending,
        updateRole: updateRoleMutation.mutate,
        isUpdatingRole: updateRoleMutation.isPending,
        updateKyc: updateKycMutation.mutate,
        isUpdatingKyc: updateKycMutation.isPending,
    };
};
