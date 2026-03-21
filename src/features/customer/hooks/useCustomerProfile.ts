import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerProfileApi, CustomerProfile, UserSportPreference } from '../api/customer-profile.api';
import { toast } from 'sonner';

export const useCustomerProfile = () => {
    const queryClient = useQueryClient();

    const profileQuery = useQuery({
        queryKey: ['customer_profile'],
        queryFn: () => customerProfileApi.getProfile(),
    });

    const updateProfile = useMutation({
        mutationFn: (data: Partial<CustomerProfile>) => customerProfileApi.updateProfile(data),
        onSuccess: (data) => {
            queryClient.setQueryData(['customer_profile'], data);
            toast.success('Cập nhật hồ sơ thành công');
        },
        onError: () => toast.error('Cập nhật thất bại, vui lòng thử lại')
    });

    const verifyContact = useMutation({
        mutationFn: ({ type, otp }: { type: 'email' | 'phone', otp: string }) => customerProfileApi.verifyContact(type, otp),
        onSuccess: (isValid) => {
            if (isValid) toast.success('Xác thực thành công!');
            else throw new Error('OTP sai');
        },
        onError: (e: Error) => toast.error(e.message || 'Xác thực thất bại')
    });

    const changePassword = useMutation({
        mutationFn: ({ currentPw, newPw }: any) => customerProfileApi.changePassword(currentPw, newPw),
        onSuccess: (isValid) => {
            if (isValid) toast.success('Đổi mật khẩu thành công!');
            else throw new Error('Mật khẩu hiện tại không đúng');
        },
        onError: (e: Error) => toast.error(e.message || 'Đổi mật khẩu thất bại')
    });

    return {
        profile: profileQuery.data,
        isLoading: profileQuery.isLoading,
        updateProfile: updateProfile.mutate,
        isUpdating: updateProfile.isPending,
        verifyContact: verifyContact.mutateAsync,
        changePassword: changePassword.mutateAsync,
    };
};

export const useCustomerPreferences = () => {
    const queryClient = useQueryClient();

    const preferencesQuery = useQuery({
        queryKey: ['customer_preferences'],
        queryFn: () => customerProfileApi.getPreferences(),
    });

    const updatePreferences = useMutation({
        mutationFn: ({ sport_type, skill_level }: { sport_type: string, skill_level: number }) => 
            customerProfileApi.updatePreferences(sport_type, skill_level),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['customer_profile'] });
            toast.success('Cập nhật trình độ thành công');
        },
        onError: () => toast.error('Lưu thất bại, thử lại sau')
    });

    return {
        preferences: preferencesQuery.data,
        isLoading: preferencesQuery.isLoading,
        updatePreferences: updatePreferences.mutate,
        isUpdating: updatePreferences.isPending,
    };
};

export const useCustomerDevices = () => {
    const queryClient = useQueryClient();

    const devicesQuery = useQuery({
        queryKey: ['customer_devices'],
        queryFn: () => customerProfileApi.getDevices(),
    });

    const logoutDevice = useMutation({
        mutationFn: (deviceId: string) => customerProfileApi.logoutDevice(deviceId),
        onSuccess: (_, deviceId) => {
            queryClient.setQueryData(['customer_devices'], (old: any) => 
                old?.filter((d: any) => d.id !== deviceId) || []
            );
            toast.success('Đã đăng xuất thiết bị');
        },
        onError: () => toast.error('Đăng xuất thất bại')
    });

    return {
        devices: devicesQuery.data || [],
        isLoading: devicesQuery.isLoading,
        logoutDevice: logoutDevice.mutate,
    };
};
