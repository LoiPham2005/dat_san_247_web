"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import {
    TrendingUp,
    BookCheck,
    Users,
    DollarSign,
    Calendar,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

export default function OwnerDashboardPage() {
    const stats = [
        { label: 'Tổng doanh thu', value: '45.200k đ', icon: DollarSign, trend: '+12.5%', isUp: true },
        { label: 'Lượt đặt sân', value: '1,284', icon: BookCheck, trend: '+8.2%', isUp: true },
        { label: 'Khách mới', value: '84', icon: Users, trend: '-2.4%', isUp: false },
        { label: 'Tỷ lệ trống', value: '15.4%', icon: TrendingUp, trend: '+4.1%', isUp: true },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Info */}
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Chào buổi sáng, Admin!</h2>
                    <p className="text-slate-500 font-medium">Đây là những gì đang diễn ra tại cụm sân của bạn hôm nay.</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-slate-700">Thứ 3, 11 Tháng 3, 2026</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.label} className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <stat.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                                    stat.isUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                )}>
                                    {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {stat.trend}
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Placeholder */}
                <Card className="lg:col-span-2 border-slate-200/60 shadow-sm overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-bold">Biểu đồ doanh thu</CardTitle>
                        <select className="bg-slate-50 border-0 text-xs font-bold rounded-lg px-2 py-1 outline-none">
                            <option>7 ngày qua</option>
                            <option>30 ngày qua</option>
                        </select>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 w-full bg-slate-50 rounded-2xl flex items-end justify-between p-6 gap-2">
                            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                <div key={i} className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary relative group cursor-pointer" style={{ height: `${h}%` }}>
                                    <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded">
                                        {h * 120}k
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 px-4">
                            <span>THỨ 2</span><span>THỨ 3</span><span>THỨ 4</span><span>THỨ 5</span><span>THỨ 6</span><span>THỨ 7</span><span>CN</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Bookings Placeholder */}
                <Card className="border-slate-200/60 shadow-sm overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Đặt sân gần đây</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {[
                                { user: 'Anh Tuấn', court: 'Sân A1', time: '18:00', status: 'PAID' },
                                { user: 'Minh Hoàng', court: 'Sân B2', time: '19:30', status: 'PENDING' },
                                { user: 'Chị Lan', court: 'Sân A1', time: '20:00', status: 'PAID' },
                                { user: 'Quốc Việt', court: 'Sân C3', time: '21:00', status: 'CANCELLED' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-xs">
                                            {item.user[0]}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900">{item.user}</p>
                                            <p className="text-[10px] text-slate-500 font-medium">{item.court} • {item.time}</p>
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "text-[9px] font-black px-2 py-0.5 rounded-full border",
                                        item.status === 'PAID' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                            item.status === 'PENDING' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                "bg-rose-50 text-rose-600 border-rose-100"
                                    )}>
                                        {item.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-slate-50">
                            <button className="w-full text-[10px] font-bold text-primary hover:underline">XEM TẤT CẢ LỊCH ĐẶT</button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Utility for cleaner conditional classes in this file
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
