import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ownerStaffApi, VenueStaffRole } from '../api/owner-staff.api';
import { toast } from 'sonner';

export const useOwnerStaff = (venueId: string) => {
    const queryClient = useQueryClient();

    const staffQuery = useQuery({
        queryKey: ['owner_staff', venueId],
        queryFn: () => ownerStaffApi.getStaffList(venueId),
        enabled: !!venueId
    });

    const updateRole = useMutation({
        mutationFn: ({ id, role }: { id: string, role: VenueStaffRole }) => ownerStaffApi.updateStaffRole(id, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_staff', venueId] });
            toast.success("Thay đổi vai trò nhân viên thành công!");
        },
        onError: () => toast.error("Có lỗi xảy ra.")
    });

    const toggleStatus = useMutation({
        mutationFn: ({ id, is_active }: { id: string, is_active: boolean }) => ownerStaffApi.toggleStaffStatus(id, is_active),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['owner_staff', venueId] });
            toast.success(data.is_active ? "Kích hoạt tài khoản nhân viên thành công!" : "Đã khóa tài khoản nhân viên!");
        },
        onError: () => toast.error("Có lỗi xảy ra.")
    });

    return {
        staffList: staffQuery.data || [],
        isLoadingStaff: staffQuery.isLoading,
        updateRole: updateRole.mutate,
        isUpdatingRole: updateRole.isPending,
        toggleStatus: toggleStatus.mutate,
        isTogglingStatus: toggleStatus.isPending
    };
};

export const useOwnerStaffInvites = (venueId: string) => {
    const queryClient = useQueryClient();

    const invitesQuery = useQuery({
        queryKey: ['owner_staff_invites', venueId],
        queryFn: () => ownerStaffApi.getStaffInvites(venueId),
        enabled: !!venueId
    });

    const inviteStaff = useMutation({
        mutationFn: ({ email, role }: { email: string, role: VenueStaffRole }) => ownerStaffApi.inviteStaff({ venue_id: venueId, email, role }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_staff_invites', venueId] });
            toast.success("Đã gửi lời mời thành công!");
        },
        onError: () => toast.error("Gửi lời mời thất bại.")
    });

    const revokeInvite = useMutation({
        mutationFn: (id: string) => ownerStaffApi.revokeInvite(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_staff_invites', venueId] });
            toast.success("Đã thu hồi lời mời!");
        },
        onError: () => toast.error("Thu hồi thất bại.")
    });

    return {
        invites: invitesQuery.data || [],
        isLoadingInvites: invitesQuery.isLoading,
        inviteStaff: inviteStaff.mutate,
        isInviting: inviteStaff.isPending,
        revokeInvite: revokeInvite.mutate,
        isRevoking: revokeInvite.isPending
    };
};
