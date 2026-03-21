"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card';
import { User, Mail, Lock, Phone, UserPlus } from 'lucide-react';

import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';

export const RegisterForm = () => {
    const { register, loading } = useAuth();
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register({ full_name: fullName, email, phone, password });
    };

    return (
        <Card className="border-slate-200/60 shadow-xl bg-white rounded-2xl overflow-hidden">
            <CardHeader className="space-y-1 pb-6 pt-8 text-center text-slate-900">
                <CardTitle className="text-2xl font-bold tracking-tight">Tạo tài khoản mới</CardTitle>
                <CardDescription className="text-slate-500">
                    Hãy gia nhập cộng đồng DatSan247 ngay hôm nay
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Họ và tên</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Nguyễn Văn A"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Số điện thoại</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    type="tel"
                                    placeholder="09xx xxx xxx"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Mật khẩu</label>
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

                    <div className="text-xs text-slate-500 mt-2 px-1">
                        Bằng việc đăng ký, bạn đồng ý với{' '}
                        <Link href="/terms" className="text-primary hover:underline font-medium">Điều khoản</Link> &{' '}
                        <Link href="/privacy" className="text-primary hover:underline font-medium">Chính sách</Link> của chúng tôi.
                    </div>

                    <Button type="submit" disabled={loading} className="w-full h-11 mt-4 text-base font-bold shadow-md shadow-primary/20 rounded-xl">
                        {loading ? "Đang xử lý..." : (
                            <><UserPlus className="w-4 h-4 mr-2" /> Đăng Ký Tài Khoản</>
                        )}
                    </Button>
                </CardContent>
            </form>
            <CardFooter className="flex flex-col space-y-4 pb-8 border-t border-slate-50 pt-6 mt-2">
                <div className="text-sm text-center text-slate-500">
                    Đã có tài khoản?{' '}
                    <Link href="/login" className="text-primary font-bold hover:underline">
                        Đăng nhập ngay
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};
