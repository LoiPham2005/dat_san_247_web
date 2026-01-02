'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/hooks/useAuth';
import { registerSchema } from '@/lib/utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { z } from 'zod';

type FormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const { register: registerAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            await registerAuth(data);
        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Name"
                placeholder="Enter your name"
                error={errors.name?.message}
                {...register('name')}
            />
            <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register('email')}
            />
            <Input
                label="Phone"
                placeholder="Enter your phone number"
                error={errors.phone?.message}
                {...register('phone')}
            />
            <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                error={errors.password?.message}
                {...register('password')}
            />
            <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
            />
            <Button type="submit" className="w-full" isLoading={isLoading}>
                Register
            </Button>
        </form>
    );
};
