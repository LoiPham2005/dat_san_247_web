'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/hooks/useAuth';
import { loginSchema } from '@/lib/utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { handleApiError } from '@/lib/utils/error-handler';
import { z } from 'zod';
import Link from 'next/link';
import { Turnstile } from '@marsidev/react-turnstile';

type FormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
    const { login } = useAuth();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState<string>('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            await login({
                ...data,
                'cf-turnstile-response': turnstileToken,
            });
            toast({
                title: 'Thành công',
                description: 'Đăng nhập thành công!',
                variant: 'default',
            });
        } catch (error: any) {
            toast({
                title: 'Lỗi đăng nhập',
                description: handleApiError(error),
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register('email')}
            />
            <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register('password')}
            />
            <div className="flex justify-end">
                <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                    Quên mật khẩu?
                </Link>
            </div>

            <div className="flex justify-center py-2">
                <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => setTurnstileToken(token)}
                />
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all" isLoading={isLoading}>
                Đăng nhập
            </Button>
        </form>
    );
};
