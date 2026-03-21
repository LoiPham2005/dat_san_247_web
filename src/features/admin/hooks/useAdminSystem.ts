import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminSystemApi } from '../api/admin-system.api';
import { toast } from 'sonner';

export const useAdminSystem = () => {
    const queryClient = useQueryClient();

    const settingsQuery = useQuery({ queryKey: ['admin_settings'], queryFn: adminSystemApi.getSettings });
    const holidaysQuery = useQuery({ queryKey: ['admin_holidays'], queryFn: adminSystemApi.getHolidays });
    const appQuery = useQuery({ queryKey: ['admin_app_versions'], queryFn: adminSystemApi.getAppVersions });
    const logsQuery = useQuery({ queryKey: ['admin_audit_logs'], queryFn: () => adminSystemApi.getAuditLogs(200) });

    const updateSetting = useMutation({
        mutationFn: ({ id, value }: { id: string, value: string }) => adminSystemApi.updateSetting(id, value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_settings'] });
            toast.success("Đã cập nhật cấu hình hệ thống");
        },
        onError: () => toast.error("Có lỗi xảy ra khi cập nhật")
    });

    const createHoliday = useMutation({
        mutationFn: (data: any) => adminSystemApi.createHoliday(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_holidays'] });
            toast.success("Đã thêm ngày lễ mới");
        },
        onError: () => toast.error("Có lỗi xảy ra khi thêm ngày lễ")
    });

    const updateHoliday = useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => adminSystemApi.updateHoliday(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_holidays'] });
            toast.success("Đã cập nhật ngày lễ");
        },
        onError: () => toast.error("Có lỗi xảy ra khi cập nhật ngày lễ")
    });

    const deleteHoliday = useMutation({
        mutationFn: (id: string) => adminSystemApi.deleteHoliday(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_holidays'] });
            toast.success("Đã xóa ngày lễ");
        },
        onError: () => toast.error("Có lỗi xảy ra khi xóa ngày lễ")
    });

    const createAppVersion = useMutation({
        mutationFn: (data: any) => adminSystemApi.createAppVersion(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_app_versions'] });
            toast.success("Đã lưu phiên bản app mới");
        },
        onError: () => toast.error("Có lỗi xảy ra khi lưu phiên bản")
    });

    const updateAppVersion = useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => adminSystemApi.updateAppVersion(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_app_versions'] });
            toast.success("Đã cập nhật phiên bản app");
        },
        onError: () => toast.error("Có lỗi xảy ra khi cập nhật")
    });

    const deleteAppVersion = useMutation({
        mutationFn: (id: string) => adminSystemApi.deleteAppVersion(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_app_versions'] });
            toast.success("Đã xóa phiên bản app");
        },
        onError: () => toast.error("Có lỗi xảy ra khi xóa")
    });

    return {
        // Settings
        settings: settingsQuery.data || [],
        isLoadingSettings: settingsQuery.isLoading,
        updateSetting: updateSetting.mutate,
        isUpdatingSetting: updateSetting.isPending,

        // Holidays
        holidays: holidaysQuery.data || [],
        isLoadingHolidays: holidaysQuery.isLoading,
        createHoliday: createHoliday.mutate,
        updateHoliday: updateHoliday.mutate,
        deleteHoliday: deleteHoliday.mutate,
        isOperatingHoliday: createHoliday.isPending || updateHoliday.isPending || deleteHoliday.isPending,

        // App Versions
        appVersions: appQuery.data || [],
        isLoadingApp: appQuery.isLoading,
        createAppVersion: createAppVersion.mutate,
        updateAppVersion: updateAppVersion.mutate,
        deleteAppVersion: deleteAppVersion.mutate,
        isOperatingApp: createAppVersion.isPending || updateAppVersion.isPending || deleteAppVersion.isPending,

        // Audit Logs
        auditLogs: logsQuery.data || [],
        isLoadingLogs: logsQuery.isLoading,
        logsQuery
    };
};
