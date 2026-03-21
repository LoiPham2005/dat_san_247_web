"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { KeyRound, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const identifier = searchParams?.get('identifier') || 'Tài khoản của bạn';

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (password && password === confirmPassword) {
            // Giả lập call API đổi mật khẩu thành công
            setIsSuccess(true);
        }
    };

    // Điều kiện Validate Pass cơ bản (Ví dụ giả lập UI)
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);

    if (isSuccess) {
        return (
            <div className="relative w-full">
                <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none"></div>
                <Card className="w-full bg-white border-slate-200 shadow-2xl rounded-[2rem] overflow-hidden relative z-10 animate-in zoom-in-95 duration-500">
                    <CardContent className="p-10 text-center">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6 shadow-inner">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-4">Khôi Phục Thành Công!</h2>
                        <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                            Mật khẩu của bạn đã được thay đổi thành công. Vui lòng ghi nhớ mật khẩu mới để đăng nhập trong các lần tiếp theo.
                        </p>
                        <Button 
                            className="w-full h-14 rounded-xl font-bold text-base shadow-lg shadow-primary/20 bg-primary hover:bg-emerald-600"
                            onClick={() => router.push('/login')}
                        >
                            Đăng Nhập Ngay
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="relative w-full animate-in zoom-in-95 duration-500">
            {/* Background Decorations */}
            <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-20%] w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[80px] pointer-events-none"></div>

            <Card className="w-full bg-white/80 backdrop-blur-xl border-slate-200/60 shadow-2xl rounded-[2rem] overflow-hidden relative z-10">
                <CardContent className="p-8 md:p-10">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 shadow-sm border border-emerald-100">
                            <KeyRound className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 mb-2">Tạo Mật Khẩu Mới</h1>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed px-2 mx-auto">
                            Tạo mật khẩu mới và mạnh cho tài khoản <strong>{identifier}</strong>
                        </p>
                    </div>

                    <form onSubmit={handleResetPassword} className="space-y-6">
                        {/* New Password Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Mật Khẩu Mới</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <Input 
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Tối thiểu 8 ký tự" 
                                    className="pl-12 pr-12 h-14 bg-slate-50 border-transparent focus:bg-white text-base rounded-xl"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button 
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            
                            {/* Validation indicators */}
                            <div className="flex gap-4 mt-2 px-1">
                                <span className={cn("text-xs font-semibold flex items-center gap-1", hasMinLength ? "text-emerald-500" : "text-slate-400")}>
                                    <div className={cn("w-1.5 h-1.5 rounded-full", hasMinLength ? "bg-emerald-500" : "bg-slate-300")}></div> 8+ Ký tự
                                </span>
                                <span className={cn("text-xs font-semibold flex items-center gap-1", hasNumber ? "text-emerald-500" : "text-slate-400")}>
                                    <div className={cn("w-1.5 h-1.5 rounded-full", hasNumber ? "bg-emerald-500" : "bg-slate-300")}></div> Chứa số
                                </span>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Xác Nhận Mật Khẩu</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <Input 
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Nhập lại mật khẩu" 
                                    className={cn(
                                        "pl-12 pr-12 h-14 bg-slate-50 border-transparent focus:bg-white text-base rounded-xl",
                                        confirmPassword && password !== confirmPassword && "border-rose-300 focus:border-rose-500 ring-rose-200"
                                    )}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button 
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-xs font-bold text-rose-500 mt-1 pl-1">Mật khẩu không khớp. Vui lòng kiểm tra lại!</p>
                            )}
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full h-14 rounded-xl font-bold text-base shadow-lg shadow-primary/20 bg-primary hover:bg-emerald-600 active:scale-[0.98] transition-all mt-6"
                            disabled={!hasMinLength || !hasNumber || password !== confirmPassword}
                        >
                            Cập Nhật Mật Khẩu
                        </Button>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
}
