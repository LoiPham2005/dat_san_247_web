import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';
import { authApi } from '../api/auth.api';
import { RegisterDto, LoginDto, VerifyOtpDto, ResetPasswordDto } from '../types';
import { toast } from 'sonner';
import { getDashboardByRole } from '@/lib/auth/auth-helpers';

export const useAuth = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const login = async (data: LoginDto) => {
        setLoading(true);
        try {
            const result = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (result?.error) {
                toast.error('Email hoặc mật khẩu không chính xác');
                return { success: false, error: result.error };
            }

            // Lấy session mới nhất để có thông tin Role
            const session = await getSession();
            const role = (session?.user as any)?.role;
            const redirectPath = getDashboardByRole(role);

            toast.success('Đăng nhập thành công');
            router.push(redirectPath);
            router.refresh();
            return { success: true };
        } catch (error: any) {
            toast.error(error.message || 'Đã có lỗi xảy ra');
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: RegisterDto) => {
        setLoading(true);
        try {
            const response = await authApi.register(data);
            toast.success(response.data.message);
            // Redirect to verify-email with email in query
            router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
            return { success: true, data: response.data };
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Đăng ký thất bại');
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const verifyEmail = async (data: VerifyOtpDto) => {
        setLoading(true);
        try {
            const response = await authApi.verifyEmail(data);
            toast.success(response.data.message);
            router.push('/login');
            return { success: true };
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Xác thực thất bại');
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (email: string) => {
        setLoading(true);
        try {
            const response = await authApi.forgotPassword({ email });
            toast.success(response.data.message);
            router.push(`/reset-password?email=${encodeURIComponent(email)}`);
            return { success: true };
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Gửi mã thất bại');
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (data: ResetPasswordDto) => {
        setLoading(true);
        try {
            const response = await authApi.resetPassword(data);
            toast.success(response.data.message);
            router.push('/login');
            return { success: true };
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Đặt lại mật khẩu thất bại');
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        login,
        register,
        verifyEmail,
        forgotPassword,
        resetPassword,
    };
};
