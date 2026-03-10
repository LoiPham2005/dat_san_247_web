import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminSystemApi } from '../api/admin-system.api';
import { toast } from 'sonner';

export const useAdminSystem = () => {
    const queryClient = useQueryClient();

    const settingsQuery = useQuery({ queryKey: ['admin_settings'], queryFn: adminSystemApi.getSettings });
    const holidaysQuery = useQuery({ queryKey: ['admin_holidays'], queryFn: adminSystemApi.getHolidays });
    const appQuery = useQuery({ queryKey: ['admin_app_versions'], queryFn: adminSystemApi.getAppVersions });
    const logsQuery = useQuery({ queryKey: ['admin_audit_logs'], queryFn: adminSystemApi.getAuditLogs });

    const updateSetting = useMutation({
        mutationFn: ({ id, value }: { id: string, value: string }) => adminSystemApi.updateSetting(id, value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_settings'] });
            toast.success("Đã cập nhật cấu hình hệ thống");
        },
        onError: () => toast.error("Có lỗi xảy ra khi cập nhật")
    });

    return {
        settings: settingsQuery.data || [],
        isLoadingSettings: settingsQuery.isLoading,
        updateSetting: updateSetting.mutate,
        isUpdatingSetting: updateSetting.isPending,

        holidays: holidaysQuery.data || [],
        isLoadingHolidays: holidaysQuery.isLoading,

        appVersions: appQuery.data || [],
        isLoadingApp: appQuery.isLoading,

        auditLogs: logsQuery.data || [],
        isLoadingLogs: logsQuery.isLoading,
    };
};
