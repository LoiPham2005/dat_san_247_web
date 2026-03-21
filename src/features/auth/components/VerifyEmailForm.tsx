"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card';
import { Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const VerifyEmailContent = () => {
    const searchParams = useSearchParams();
    const { verifyEmail, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
        const emailFromParam = searchParams.get('email');
        if (emailFromParam) setEmail(emailFromParam);
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await verifyEmail({ email, code, type: 'EMAIL_VERIFY' });
    };

    return (
        <Card className="border-slate-200/60 shadow-xl bg-white rounded-2xl overflow-hidden">
            <CardHeader className="space-y-1 pb-6 pt-8 text-center text-slate-900">
                <CardTitle className="text-2xl font-bold tracking-tight text-primary">Xác thực Email</CardTitle>
                <CardDescription className="text-slate-500">
                    Mã xác thực đã được gửi tới <b>{email || 'email của bạn'}</b>
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2 text-center mb-4">
                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
                            <Mail className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm text-slate-600">Vui lòng nhập mã OTP 6 số để kích hoạt tài khoản.</p>
                    </div>

                    <div className="space-y-2">
                        <Input
                            type="text"
                            placeholder="Mã xác thực (OTP)"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="text-center text-2xl tracking-[0.5em] font-bold h-14 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                            maxLength={6}
                            required
                        />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full h-11 mt-4 text-base font-bold shadow-md shadow-primary/20 rounded-xl">
                        {loading ? "Đang xác thực..." : (
                            <><ShieldCheck className="w-4 h-4 mr-2" /> Xác Nhận Kích Hoạt</>
                        )}
                    </Button>
                </CardContent>
            </form>
            <CardFooter className="flex flex-col space-y-4 pb-8 border-t border-slate-50 pt-6 mt-2">
                <div className="text-sm text-center text-slate-500">
                    Không nhận được mã?{' '}
                    <button className="text-primary font-bold hover:underline">Gửi lại</button>
                </div>
                <div className="text-xs text-center">
                    <Link href="/login" className="text-slate-400 hover:text-primary underline">Quay lại đăng nhập</Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export const VerifyEmailForm = () => {
    return (
        <Suspense fallback={<div className="text-center p-8">Đang tải...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
};
