"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { CheckCircle2, Copy, Calendar, Clock, MapPin, QrCode, Home, History, Zap } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function CheckoutSuccessPage() {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    
    // In real app, we get this from context/API
    const mockOrder = {
        code: "DS247-AB9FE3",
        venueName: "Sân Cầu Lông Thống Nhất",
        location: "138 Đào Duy Anh, P.9, Phú Nhuận",
        date: "Ngày mai, 16/10/2026",
        time: "17:30 - 20:30 (3 ca)"
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(mockOrder.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col justify-center items-center animate-in zoom-in-95 duration-500">
            
            <div className="w-full max-w-lg mb-8 text-center space-y-4">
                <div className="mx-auto w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center shadow-inner relative">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 relative z-10" />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Đặt Sân Thành Công!</h1>
                <p className="text-slate-500 font-medium px-4">
                    Giao dịch của bạn đã được xác nhận. Chúng tôi đã gửi biên lai chi tiết đến email và thông báo vào App.
                </p>
            </div>

            <Card className="w-full max-w-lg rounded-[2rem] border-0 shadow-xl overflow-hidden mb-8">
                
                <div className="bg-gradient-to-br from-primary to-indigo-600 p-8 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <p className="text-primary-100 font-bold uppercase tracking-widest text-xs mb-2">Mã Check-in Bắt Buộc</p>
                    <div 
                        className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl py-4 px-6 inline-flex items-center gap-4 cursor-pointer hover:bg-white/30 transition-colors group"
                        onClick={handleCopy}
                        title="Bấm để copy"
                    >
                        <span className="text-3xl font-black font-mono tracking-wider">{mockOrder.code}</span>
                        {copied ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                        ) : (
                            <Copy className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                        )}
                    </div>
                    <p className="text-xs text-primary-200 mt-4 max-w-[280px] mx-auto leading-relaxed">
                        Hãy cung cấp mã này hoặc quét QR tại quầy lễ tân để nhận sân. Không chia sẻ mã này cho người lạ.
                    </p>
                </div>

                <div className="bg-white p-2">
                    <div className="border border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50 space-y-5">
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-white text-slate-500 rounded-xl border border-slate-100 shadow-sm shrink-0">
                                <QrCode className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Sân thi đấu</span>
                                <p className="font-bold text-slate-800 text-base">{mockOrder.venueName}</p>
                                <p className="text-xs font-medium text-slate-500 mt-0.5 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {mockOrder.location}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Ngày đá</span>
                                <span className="font-bold text-slate-800">{mockOrder.date}</span>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Khung giờ</span>
                                <span className="font-bold text-slate-800 text-sm">{mockOrder.time}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </Card>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
                <Button 
                    variant="outline"
                    className="flex-1 h-14 rounded-2xl font-bold text-lg bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                    onClick={() => router.push('/bookings')} // Chuyển về tab quản lý booking my profile
                >
                    <History className="w-5 h-5 mr-2" /> Xem Vé Booking
                </Button>
                <Button 
                    className="flex-1 h-14 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20"
                    onClick={() => router.push('/')}
                >
                    <Home className="w-5 h-5 mr-2" /> Về Trang Chủ
                </Button>
            </div>
            
            <div className="mt-8 text-center flex items-center gap-2 text-xs font-bold text-slate-400">
                <Zap className="w-4 h-4 text-amber-500" /> Tích tắc giữ chỗ, sức khỏe dài lâu! 
            </div>

        </div>
    );
}
