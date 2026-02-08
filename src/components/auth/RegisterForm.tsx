'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/hooks/useAuth';
import { registerSchema } from '@/lib/utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useState } from 'react';
import { z } from 'zod';
import { UserRole } from '@/types/auth.types';

import { useToast } from '@/components/ui/use-toast';
import { handleApiError } from '@/lib/utils/error-handler';

type FormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const { register: registerAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: UserRole.CUSTOMER,
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            await registerAuth(data);
            toast({
                title: 'Thành công',
                description: 'Đăng ký tài khoản thành công! Vui lòng đăng nhập.',
            });
        } catch (error: any) {
            toast({
                title: 'Lỗi đăng ký',
                description: handleApiError(error),
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Input
                label="Họ và tên"
                placeholder="Nhập họ và tên"
                error={errors.fullName?.message}
                {...register('fullName')}
            />
            <Input
                label="Địa chỉ Email"
                type="email"
                placeholder="ten@vi-du.com"
                error={errors.email?.message}
                {...register('email')}
            />
            <Input
                label="Số điện thoại"
                placeholder="0123456789"
                error={errors.phone?.message}
                {...register('phone')}
            />
            <Select
                label="Tôi là..."
                options={[
                    { value: UserRole.CUSTOMER, label: 'Khách hàng (Tôi muốn đặt sân)' },
                    { value: UserRole.OWNER, label: 'Chủ sân (Tôi có sân cho thuê)' },
                    { value: UserRole.VENUE_STAFF, label: 'Nhân viên sân' },
                ]}
                error={errors.role?.message}
                {...register('role')}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Mật khẩu"
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
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all" isLoading={isLoading}>
                Đăng ký tài khoản
            </Button>
        </form>
    );
};
