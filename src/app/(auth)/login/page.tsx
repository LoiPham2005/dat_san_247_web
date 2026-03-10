import React from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đăng nhập | DatSan247',
    description: 'Đăng nhập vào hệ thống đặt sân thể thao DatSan247',
};

export default function LoginPage() {
    return <LoginForm />;
}
