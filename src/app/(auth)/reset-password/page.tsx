import React from 'react';
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đặt lại mật khẩu | DatSan247',
    description: 'Tạo mật khẩu mới cho tài khoản DatSan247 của bạn',
};

export default function ResetPasswordPage() {
    return <ResetPasswordForm />;
}
