'use client';

import { useState } from 'react';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<'forgot' | 'reset'>('forgot');
    const [email, setEmail] = useState('');

    const handleSuccess = (email: string) => {
        setEmail(email);
        setStep('reset');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
            <div className="max-w-md w-full">
                <Link
                    href="/login"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 mb-8 transition-colors group"
                >
                    <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
                    Quay lại đăng nhập
                </Link>

                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                    {step === 'forgot' ? (
                        <ForgotPasswordForm onSuccess={handleSuccess} />
                    ) : (
                        <ResetPasswordForm email={email} />
                    )}
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                    © 2024 Dat San 247. Mọi quyền được bảo lưu.
                </div>
            </div>

            {/* Decorative elements */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-50 rounded-full blur-3xl opacity-60 animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-60 animate-pulse" />
            </div>
        </div>
    );
}
