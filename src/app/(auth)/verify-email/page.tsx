import React from 'react';
import { VerifyEmailForm } from '@/features/auth/components/VerifyEmailForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Xác thực Email | DatSan247',
    description: 'Xác thực tài khoản của bạn tại DatSan247',
};

export default function VerifyEmailPage() {
    return <VerifyEmailForm />;
}
