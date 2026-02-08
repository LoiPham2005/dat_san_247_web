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

const forgotPasswordSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
});

type FormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = ({ onSuccess }: { onSuccess: (email: string) => void }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            await authService.forgotPassword(data.email);
            toast({
                title: 'Thành công',
                description: 'Mã OTP đã được gửi tới email của bạn.',
            });
            onSuccess(data.email);
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
                <h2 className="text-2xl font-bold text-gray-900">Quên mật khẩu?</h2>
                <p className="text-gray-600">Nhập email của bạn để nhận mã OTP khôi phục mật khẩu.</p>
            </div>
            <Input
                label="Email"
                type="email"
                placeholder="example@gmail.com"
                error={errors.email?.message}
                {...register('email')}
            />
            <Button type="submit" className="w-full h-12 text-lg font-semibold" isLoading={isLoading}>
                Gửi mã OTP
            </Button>
        </form>
    );
};
