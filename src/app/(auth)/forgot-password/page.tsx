import React from 'react';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Quên mật khẩu | DatSan247',
    description: 'Khôi phục mật khẩu của bạn tại DatSan247',
};

export default function ForgotPasswordPage() {
    return <ForgotPasswordForm />;
}
