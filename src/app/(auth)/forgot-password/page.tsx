"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Phone, ArrowLeft, ShieldCheck, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2>(1); // 1: Input Phone/Email, 2: OTP Verification
    const [identifier, setIdentifier] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleSendOTP = (e: React.FormEvent) => {
        e.preventDefault();
        // Giả lập API call để gửi OTP
        if (identifier) {
            setStep(2);
        }
    };

    const handleVerifyOTP = (e: React.FormEvent) => {
        e.preventDefault();
        // Giả lập xác thực OTP thành công -> Chuyển sang trang tạo mật khẩu mới
        const enteredOtp = otp.join('');
        if (enteredOtp.length === 6) {
            // Encode temporary token để truyền qua trang reset
            router.push(`/reset-password?token=temp_token_from_otp&identifier=${encodeURIComponent(identifier)}`);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) value = value[0];
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto move to next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        // Handle backspace to move to previous input
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    return (
        <div className="relative w-full animate-in zoom-in-95 duration-500">
            {/* Background Decorations */}
            <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[80px] pointer-events-none"></div>

            <Card className="w-full bg-white/80 backdrop-blur-xl border-slate-200/60 shadow-2xl rounded-[2rem] overflow-hidden relative z-10">
                <CardContent className="p-8 md:p-10">
                    {/* Header */}
                    <div className="mb-8 text-center relative">
                        <button 
                            onClick={() => step === 2 ? setStep(1) : router.back()}
                            className="absolute left-0 top-1 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 shadow-sm border border-emerald-100">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 mb-2">
                            {step === 1 ? 'Quên Mật Khẩu?' : 'Xác Thực OTP'}
                        </h1>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed px-4 mx-auto">
                            {step === 1 
                                ? 'Đừng lo lắng! Nhập số điện thoại đã đăng ký để DatSan247 gửi mã xác nhận cho bạn.'
                                : `Vui lòng nhập mã gồm 6 chữ số vừa được gửi đến số ${identifier}`
                            }
                        </p>
                    </div>

                    {/* Step 1: Input Identifier (Phone/Email) */}
                    {step === 1 && (
                        <form onSubmit={handleSendOTP} className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Số Điện Thoại</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <Input 
                                        type="tel" 
                                        placeholder="090 123 4567" 
                                        className="pl-12 h-14 bg-slate-50 border-transparent focus:bg-white text-base rounded-xl"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full h-14 rounded-xl font-bold text-base shadow-lg shadow-primary/20 bg-primary hover:bg-emerald-600 active:scale-[0.98] transition-all"
                            >
                                Nhận Mã Xác Nhận
                            </Button>
                        </form>
                    )}

                    {/* Step 2: OTP Input */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP} className="space-y-8 animate-in slide-in-from-right-8 duration-300">
                            <div className="flex justify-between gap-2 md:gap-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value.replace(/[^0-9]/g, ''))}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-black bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                ))}
                            </div>

                            <div className="text-center space-y-4">
                                <Button 
                                    type="submit" 
                                    className="w-full h-14 rounded-xl font-bold text-base shadow-lg shadow-primary/20 bg-primary hover:bg-emerald-600 active:scale-[0.98] transition-all"
                                    disabled={otp.join('').length < 6}
                                >
                                    Xác Thực Mã
                                </Button>
                                
                                <button type="button" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">
                                    Gửi lại mã (60s)
                                </button>
                            </div>
                        </form>
                    )}

                </CardContent>
            </Card>
        </div>
    );
}
