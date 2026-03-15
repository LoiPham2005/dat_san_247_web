"use client";

import React from 'react';
import { Card } from '@/components/common/Card';
import { 
    Store, CalendarCheck, DollarSign, 
    TrendingUp, ShieldAlert, Activity, Users, Clock, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function OwnerDashboardPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <Activity className="w-8 h-8 text-emerald-600" /> Bảng Điều Khiển Kinh Doanh (Dashboard)
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Chào mừng Chủ Sân! Tổng quan nhanh về các Cơ sở, Lượng Đặt Sân và Doanh thu của bạn.
                    </p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Cơ Sở Hoạt Động</p>
                            <h3 className="text-3xl font-black text-slate-900">02</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl group-hover:scale-110 transition-transform">
                            <Store className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                        <ShieldAlert className="w-4 h-4 mr-1 text-amber-500" />
                        <span className="text-amber-600">1 Cơ sở đang chờ duyệt</span>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Lượt Đặt Hôm Nay</p>
                            <h3 className="text-3xl font-black text-slate-900">18</h3>
                        </div>
                        <div className="p-3 bg-sky-50 rounded-xl group-hover:scale-110 transition-transform">
                            <CalendarCheck className="w-6 h-6 text-sky-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +5% so với tháng trước
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Doanh Thu Tạm Tính</p>
                            <h3 className="text-3xl font-black text-slate-900">12.5M ₫</h3>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl group-hover:scale-110 transition-transform">
                            <DollarSign className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-slate-500">
                        Chưa trừ phí hoa hồng
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Nhân Viên Đang Trực</p>
                            <h3 className="text-3xl font-black text-slate-900">03</h3>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-xl group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-slate-500">
                        <Clock className="w-4 h-4 mr-1 text-slate-400" /> Ca: 14:00 - 22:00
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Lịch Booking */}
                <Card className="col-span-1 border-slate-200 shadow-sm flex flex-col">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                        <h4 className="font-bold text-slate-800">Booking Mới Nhất</h4>
                        <Link href="/owner/bookings" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center">
                            Xem tất cả <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-0 flex-1">
                        <div className="divide-y divide-slate-100">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">Sân Bóng Thanh Xuân • Sân 0{i}</div>
                                        <div className="text-xs text-slate-500 font-medium mt-0.5">Khách: Lê Văn B • 350,000đ</div>
                                    </div>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-sky-50 text-sky-700 border-sky-200">
                                        Đã Thanh Toán
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Biểu đồ giả lập */}
                <Card className="col-span-1 border-slate-200 shadow-sm flex flex-col items-center justify-center p-8 bg-slate-50 text-center">
                    <TrendingUp className="w-16 h-16 text-slate-300 mb-4" />
                    <h4 className="text-slate-500 font-bold mb-2">Biểu Đồ Doanh Thu & Lượng Khách</h4>
                    <p className="text-slate-400 text-sm">Chỉ hiển thị khi có nhiều hơn 7 ngày dữ liệu hoạt động.</p>
                </Card>
            </div>
        </div>
    );
}
