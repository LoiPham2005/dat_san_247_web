"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card';
import { Lock, ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';

const ResetPasswordContent = () => {
    const searchParams = useSearchParams();
    const { resetPassword, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const emailFromParam = searchParams.get('email');
        if (emailFromParam) setEmail(emailFromParam);
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Mật khẩu nhập lại không khớp');
            return;
        }
        await resetPassword({ email, code, new_password: password });
    };

    return (
        <Card className="border-slate-200/60 shadow-xl bg-white rounded-2xl overflow-hidden">
            <CardHeader className="space-y-1 pb-6 pt-8 text-center text-slate-900">
                <CardTitle className="text-2xl font-bold tracking-tight">Đặt lại mật khẩu</CardTitle>
                <CardDescription className="text-slate-500">
                    Nhập mã xác thực đã gửi tới <b>{email}</b> và mật khẩu mới
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Mã xác thực (OTP)</label>
                        <Input
                            type="text"
                            placeholder="Mã 6 số"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="text-center text-xl tracking-widest font-bold h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                            maxLength={6}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Mật khẩu mới</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Xác nhận mật khẩu</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" disabled={loading} className="w-full h-11 mt-4 text-base font-bold shadow-md shadow-primary/20 rounded-xl">
                        {loading ? "Đang xử lý..." : (
                            <><ShieldCheck className="w-4 h-4 mr-2" /> Lưu Mật Khẩu Mới</>
                        )}
                    </Button>
                </CardContent>
            </form>
            <CardFooter className="flex flex-col space-y-4 pb-8 border-t border-slate-50 pt-6 mt-2">
                <div className="text-sm text-center">
                    <Link href="/login" className="text-primary font-bold hover:underline">
                        Quay lại đăng nhập
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export const ResetPasswordForm = () => {
    return (
        <Suspense fallback={<div className="text-center p-8">Đang tải...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
};
