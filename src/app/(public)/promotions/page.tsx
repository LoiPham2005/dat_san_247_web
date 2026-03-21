"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Ticket, Search, Copy, CheckCircle2, Info, Clock, Check, Sparkles, Filter, Percent, Banknote } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const PROMOTIONS = [
    {
        id: "p1",
        code: "WELCOME100K",
        title: "Bạn Mới - Mừng Hội Ngộ",
        description: "Giảm trực tiếp 100K cho lần đặt sân đầu tiên qua hệ thống DatSan247. Áp dụng cho mọi sân và mọi khung giờ trong ngày.",
        discountType: "FIXED_AMOUNT",
        discountValue: 100000,
        minOrderValue: 300000,
        endDate: "31/10/2026",
        usageLimit: 1000,
        usedCount: 845,
        isActive: true,
        bgGradient: "from-blue-500 to-indigo-600"
    },
    {
        id: "p2",
        code: "SUMMERFUN",
        title: "Đón Hè Rực Rỡ",
        description: "Giảm ngay 20% (Tối đa 50K) cho tất cả các booking đặt lịch vào thứ 7 và Chúa Nhật hàng tuần.",
        discountType: "PERCENTAGE",
        discountValue: 20,
        maxDiscount: 50000,
        minOrderValue: 200000,
        endDate: "30/11/2026",
        usageLimit: 500,
        usedCount: 120,
        isActive: true,
        bgGradient: "from-amber-400 to-orange-500"
    },
    {
        id: "p3",
        code: "DATSAN247",
        title: "Tri Ân Khách Hàng",
        description: "Mã giảm giá cố định 50K cho đơn từ 250K. Tri ân khách hàng thân thiết đã sử dụng hệ thống từ những ngày đầu.",
        discountType: "FIXED_AMOUNT",
        discountValue: 50000,
        minOrderValue: 250000,
        endDate: "15/10/2026", // Sắp hết hạn
        usageLimit: 5000,
        usedCount: 4980,
        isActive: true,
        bgGradient: "from-emerald-400 to-emerald-600"
    },
    {
        id: "p4",
        code: "VIPMEMBER",
        title: "Đặc Quyền Hội Viên Ghiền Thể Thao",
        description: "Giảm siêu sốc 30% tổng bill (giảm tối đa lên tới 200K). Chỉ áp dụng cho các giải đấu lớn booking nguyên ngày.",
        discountType: "PERCENTAGE",
        discountValue: 30,
        maxDiscount: 200000,
        minOrderValue: 1000000,
        endDate: "31/12/2026",
        usageLimit: 50,
        usedCount: 15,
        isActive: true,
        bgGradient: "from-rose-500 to-pink-600"
    },
    {
        id: "p5",
        code: "FLASH50",
        title: "Flash Sale Giờ Vàng Đêm",
        description: "Giảm 50% cho các khung giờ đá vào ban đêm (Sau 22h00). Không giới hạn giá trị giảm.",
        discountType: "PERCENTAGE",
        discountValue: 50,
        maxDiscount: null,
        minOrderValue: 0,
        endDate: "20/10/2026",
        usageLimit: 200,
        usedCount: 200, // Hết lượt
        isActive: false,
        bgGradient: "from-slate-600 to-slate-800"
    }
];

export default function PromotionsPage() {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [filter, setFilter] = useState("ALL"); // ALL, FIXED_AMOUNT, PERCENTAGE

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const filteredPromotions = PROMOTIONS.filter(p => {
        if (filter === "ALL") return true;
        return p.discountType === filter;
    });

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            
            {/* Header Hero */}
            <div className="bg-slate-900 border-b-8 border-primary relative overflow-hidden">
                {/* Visual decorations */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="container px-4 max-w-6xl mx-auto py-16 md:py-24 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-200 border border-white/10 font-bold text-sm mb-6 backdrop-blur-md">
                        <Ticket className="w-4 h-4" /> Kho Mã Giảm Giá Độc Quyền
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
                        Càng Chơi Càng Rẻ, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Bảo Vệ Ví Tiền Của Bạn</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                        Chỉ với 1 thao tác copy nhận mã, bạn đã có ngay một mức giá không thể hợp lý hơn. Lên lịch ngay hôm nay!
                    </p>
                </div>
            </div>

            {/* Filter and Content Area */}
            <div className="container px-4 max-w-6xl mx-auto pt-8 -mt-10 relative z-20">
                
                {/* Search & Filters */}
                <Card className="rounded-[2rem] border-0 shadow-lg shadow-slate-200/50 mb-10 overflow-hidden">
                    <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 bg-white">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input 
                                type="text"
                                placeholder="Tìm kiếm voucher, khuyến mãi..."
                                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-none rounded-2xl font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400"
                            />
                        </div>
                        <div className="w-px h-10 bg-slate-200 hidden md:block"></div>
                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            <Button 
                                variant="outline" 
                                className={cn("h-14 rounded-2xl px-6 font-bold shrink-0", filter === "ALL" ? "bg-slate-900 border-slate-900 text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50")}
                                onClick={() => setFilter("ALL")}
                            >
                                <Filter className="w-4 h-4 mr-2" /> Tất Cả Mã
                            </Button>
                            <Button 
                                variant="outline" 
                                className={cn("h-14 rounded-2xl px-6 font-bold shrink-0", filter === "FIXED_AMOUNT" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "border-slate-200 text-slate-600 hover:bg-slate-50")}
                                onClick={() => setFilter("FIXED_AMOUNT")}
                            >
                                <Banknote className="w-4 h-4 mr-2" /> Mức Tiền Cố Định
                            </Button>
                            <Button 
                                variant="outline" 
                                className={cn("h-14 rounded-2xl px-6 font-bold shrink-0", filter === "PERCENTAGE" ? "bg-orange-50 text-orange-600 border-orange-200" : "border-slate-200 text-slate-600 hover:bg-slate-50")}
                                onClick={() => setFilter("PERCENTAGE")}
                            >
                                <Percent className="w-4 h-4 mr-2" /> Phần Trăm (%)
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Voucher Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {filteredPromotions.map((promo) => {
                        const isExpired = !promo.isActive || promo.usedCount >= promo.usageLimit;
                        const usageRatio = Math.min(100, Math.round((promo.usedCount / promo.usageLimit) * 100));

                        return (
                            <div 
                                key={promo.id} 
                                className={cn(
                                    "flex flex-col md:flex-row bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative",
                                    isExpired && "opacity-60 grayscale hover:shadow-none hover:translate-y-0"
                                )}
                            >
                                {/* Left Side: Visual / Value */}
                                <div className={cn(
                                    "p-8 md:w-[220px] flex flex-col justify-center items-center text-white relative overflow-hidden shrink-0",
                                    `bg-gradient-to-br ${promo.bgGradient}`
                                )}>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
                                    
                                    {/* Dotted border effect simulating a tear-off ticket */}
                                    <div className="absolute right-0 top-0 bottom-0 w-0 border-r-8 border-dotted border-white opacity-40 z-10 hidden md:block"></div>
                                    <div className="absolute bottom-0 left-0 right-0 h-0 border-b-8 border-dotted border-white opacity-40 z-10 md:hidden"></div>

                                    <div className="relative z-20 text-center">
                                        <p className="text-white/80 font-bold uppercase tracking-widest text-xs mb-2">Mã Giảm</p>
                                        <div className="font-black text-4xl md:text-5xl tracking-tighter mb-2 shadow-black/10 drop-shadow-lg">
                                            {promo.discountType === 'PERCENTAGE' ? (
                                                <>{promo.discountValue}<span className="text-3xl">%</span></>
                                            ) : (
                                                <>{promo.discountValue / 1000}<span className="text-3xl leading-none block mt-1 uppercase">K</span></>
                                            )}
                                        </div>
                                    </div>
                                    {isExpired && (
                                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-30 flex items-center justify-center">
                                            <div className="bg-white/10 border border-white/20 text-white font-black uppercase text-sm px-6 py-2 rounded-full rotate-12 shadow-2xl backdrop-blur-md">
                                                Hết Hạng Sú
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Details */}
                                <div className="p-6 md:p-8 flex-1 flex flex-col bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed ">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start gap-4 mb-2">
                                            <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
                                                {promo.title}
                                            </h3>
                                        </div>
                                        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-4 line-clamp-3">
                                            {promo.description}
                                        </p>
                                        
                                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                            {promo.minOrderValue > 0 && (
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Đơn tối thiểu</p>
                                                    <p className="font-bold text-slate-700">{promo.minOrderValue.toLocaleString('vi-VN')}đ</p>
                                                </div>
                                            )}
                                            {promo.maxDiscount && (
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Giảm tối đa</p>
                                                    <p className="font-bold text-rose-600">{promo.maxDiscount.toLocaleString('vi-VN')}đ</p>
                                                </div>
                                            )}
                                            <div className="col-span-2 flex items-center gap-2">
                                                <div className="p-1.5 rounded-lg bg-orange-50 text-orange-500"><Clock className="w-3.5 h-3.5" /></div>
                                                <p className="font-semibold text-slate-600">HSD: <span className="text-slate-900">{promo.endDate}</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Bottom */}
                                    <div className="pt-4 border-t border-slate-100 flex flex-col xl:flex-row items-center justify-between gap-4">
                                        
                                        {/* Progress Bar */}
                                        <div className="w-full xl:w-1/2">
                                            <div className="flex justify-between text-xs font-bold mb-1.5">
                                                <span className="text-slate-500">Đã dùng {usageRatio}%</span>
                                                {usageRatio > 80 && !isExpired && (
                                                    <span className="text-rose-500 animate-pulse">Sắp hết!</span>
                                                )}
                                            </div>
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className={cn("h-full rounded-full", isExpired ? "bg-slate-300" : usageRatio > 80 ? "bg-rose-500" : "bg-emerald-500")}
                                                    style={{ width: `${usageRatio}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div 
                                            className={cn(
                                                "w-full xl:w-auto flex items-center justify-between xl:justify-center gap-4 px-5 py-3 rounded-xl font-bold font-mono tracking-widest border transition-all select-none relative overflow-hidden",
                                                copiedCode === promo.code 
                                                    ? "bg-emerald-50 border-emerald-500/30 text-emerald-600" 
                                                    : isExpired 
                                                        ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed" 
                                                        : "bg-slate-50 border-slate-200/60 text-slate-800 cursor-pointer hover:border-primary/50 hover:bg-white"
                                            )}
                                            onClick={() => !isExpired && handleCopy(promo.code)}
                                        >
                                            {copiedCode !== promo.code && !isExpired && (
                                                <div className="absolute inset-0 bg-primary/0 hover:bg-primary/5 transition-colors"></div>
                                            )}
                                            <span>{promo.code}</span>
                                            {!isExpired && (
                                                copiedCode === promo.code ? (
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 animate-in zoom-in" />
                                                ) : (
                                                    <Copy className="w-5 h-5 text-slate-400 shrink-0" />
                                                )
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm font-semibold text-slate-500 mb-6">Bạn đã xem hết ưu đãi mới nhất. Hãy quay lại sau nhé!</p>
                    <Button variant="outline" className="h-14 px-8 rounded-2xl font-bold text-slate-700 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:text-primary hover:border-slate-300">
                        <Sparkles className="w-4 h-4 mr-2 text-primary" /> Về Trang Lịch Sân
                    </Button>
                </div>

            </div>
        </div>
    );
}
