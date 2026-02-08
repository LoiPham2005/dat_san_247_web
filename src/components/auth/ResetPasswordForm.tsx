'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { handleApiError } from '@/lib/utils/error-handler';
import { z } from 'zod';
import { authService } from '@/lib/api/services/auth.service';
import { useRouter } from 'next/navigation';

const resetPasswordSchema = z.object({
    otp: z.string().length(6, 'Mã OTP phải có 6 chữ số'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordForm = ({ email }: { email: string }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            await authService.resetPassword(data.otp, data.password);
            toast({
                title: 'Thành công',
                description: 'Mật khẩu đã được thay đổi. Vui lòng đăng nhập lại.',
            });
            router.push('/login');
        } catch (error: any) {
            toast({
                title: 'Lỗi',
                description: handleApiError(error),
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Đặt lại mật khẩu</h2>
                <p className="text-gray-600">Mã OTP đã được gửi tới <b>{email}</b></p>
            </div>
            <Input
                label="Mã OTP"
                placeholder="123456"
                error={errors.otp?.message}
                {...register('otp')}
            />
            <Input
                label="Mật khẩu mới"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
            />
            <Input
                label="Xác nhận mật khẩu"
                type="password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
            />
            <Button type="submit" className="w-full h-12 text-lg font-semibold" isLoading={isLoading}>
                Cập nhật mật khẩu
            </Button>
        </form>
    );
};
