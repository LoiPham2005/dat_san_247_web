import React from 'react';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đăng ký | DatSan247',
    description: 'Tạo tài khoản mới tại DatSan247',
};

export default function RegisterPage() {
    return <RegisterForm />;
}
