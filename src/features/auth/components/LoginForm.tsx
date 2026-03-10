"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

export const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <Card className="border-slate-200/60 shadow-xl bg-white rounded-2xl overflow-hidden">
            <CardHeader className="space-y-1 pb-6 pt-8 text-center text-slate-900">
                <CardTitle className="text-2xl font-bold tracking-tight">Chào mừng trở lại</CardTitle>
                <CardDescription className="text-slate-500">
                    Vui lòng đăng nhập để tiếp tục khám phá các sân thể thao
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Email hoặc Số điện thoại</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            type="text"
                            placeholder="example@gmail.com"
                            className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-sm font-semibold text-slate-700">Mật khẩu</label>
                        <Link href="/forgot-password" title="Quên mật khẩu?" className="text-xs text-primary hover:underline font-medium">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                        />
                        <button
                            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-2 ml-1">
                    <input type="checkbox" id="remember" className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer" />
                    <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer select-none">Duy trì đăng nhập</label>
                </div>

                <Button className="w-full h-11 mt-4 text-base font-bold shadow-md shadow-primary/20 rounded-xl">
                    <LogIn className="w-4 h-4 mr-2" /> Đăng Nhập
                </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pb-8 border-t border-slate-50 pt-6 mt-2">
                <div className="text-sm text-center text-slate-500">
                    Chưa có tài khoản?{' '}
                    <Link href="/register" className="text-primary font-bold hover:underline">
                        Đăng ký ngay
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};
