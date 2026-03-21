"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export const ForgotPasswordForm = () => {
    const { forgotPassword, loading } = useAuth();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await forgotPassword(email);
    };

    return (
        <Card className="border-slate-200/60 shadow-xl bg-white rounded-2xl overflow-hidden">
            <CardHeader className="space-y-1 pb-6 pt-8 text-center text-slate-900">
                <CardTitle className="text-2xl font-bold tracking-tight">Quên mật khẩu?</CardTitle>
                <CardDescription className="text-slate-500">
                    Nhập email của bạn để nhận mã khôi phục mật khẩu
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                                type="email"
                                placeholder="name@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" disabled={loading} className="w-full h-11 mt-2 text-base font-bold shadow-md shadow-primary/20 rounded-xl">
                        {loading ? "Đang xử lý..." : (
                            <><Send className="w-4 h-4 mr-2" /> Gửi Mã Khôi Phục</>
                        )}
                    </Button>
                </CardContent>
            </form>
            <CardFooter className="flex flex-col space-y-4 pb-8 border-t border-slate-50 pt-6 mt-2">
                <div className="text-sm text-center">
                    <Link href="/login" className="text-primary font-bold hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};
