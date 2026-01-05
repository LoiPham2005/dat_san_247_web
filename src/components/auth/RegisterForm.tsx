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

type FormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const { register: registerAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
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
        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Input
                label="Full Name"
                placeholder="Enter your full name"
                error={errors.name?.message}
                {...register('name')}
            />
            <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                error={errors.email?.message}
                {...register('email')}
            />
            <Input
                label="Phone Number"
                placeholder="0123456789"
                error={errors.phone?.message}
                {...register('phone')}
            />
            <Select
                label="I am a..."
                options={[
                    { value: UserRole.CUSTOMER, label: 'Customer (I want to book)' },
                    { value: UserRole.OWNER, label: 'Venue Owner (I have a field)' },
                    { value: UserRole.VENUE_STAFF, label: 'Venue Staff' },
                ]}
                error={errors.role?.message}
                {...register('role')}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register('password')}
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                />
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all" isLoading={isLoading}>
                Create Account
            </Button>
        </form>
    );
};
