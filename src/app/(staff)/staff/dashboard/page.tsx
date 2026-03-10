"use client";

import React from 'react';
import { Card } from '@/components/common/Card';
import { 
    Headset, MessageSquare, ShieldAlert, CheckCircle2, 
    Clock, ChevronRight, Activity, Users, AlertOctagon
} from 'lucide-react';
import Link from 'next/link';

export default function StaffDashboardPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <Activity className="w-8 h-8 text-primary" /> Bảng Điều Khiển Nhân Viên (Dashboard)
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Chào mừng bạn trở lại! Đây là tóm tắt các yêu cầu hỗ trợ và nội dung cần kiểm duyệt đang chờ bạn xử lý.
                    </p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Ticket Đang Mở</p>
                            <h3 className="text-3xl font-black text-slate-900">12</h3>
                        </div>
                        <div className="p-3 bg-sky-50 rounded-xl group-hover:scale-110 transition-transform">
                            <Headset className="w-6 h-6 text-sky-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-amber-600">
                        <Clock className="w-4 h-4 mr-1" />
                        8 Ticket phản hồi chậm
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Báo Cáo Vi Phạm</p>
                            <h3 className="text-3xl font-black text-slate-900">05</h3>
                        </div>
                        <div className="p-3 bg-rose-50 rounded-xl group-hover:scale-110 transition-transform">
                            <AlertOctagon className="w-6 h-6 text-rose-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-rose-600">
                        <ShieldAlert className="w-4 h-4 mr-1" />
                        3 Báo cáo mức độ cao
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-rose-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Đã Giải Quyết (Hôm nay)</p>
                            <h3 className="text-3xl font-black text-slate-900">24</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                        Tăng 15% so với hôm qua
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bookings Recents */}
                <Card className="border-slate-200 shadow-sm flex flex-col">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                        <h4 className="font-bold text-slate-800">Ticket Hỗ Trợ Gần Đây</h4>
                        <Link href="/staff/support" className="text-xs font-bold text-primary hover:text-primary/80 flex items-center">
                            Xem tất cả <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-0 flex-1">
                        <div className="divide-y divide-slate-100">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">Khách hàng: Nguyễn Văn {String.fromCharCode(64 + i)}</div>
                                            <div className="text-xs text-slate-500 font-medium mt-0.5 truncate max-w-[200px]">Vấn đề: Lỗi thanh toán Booking #{1000 + i}</div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
                                        Đang mở
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Kiểm duyệt gần đây */}
                <Card className="border-slate-200 shadow-sm flex flex-col">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                        <h4 className="font-bold text-slate-800">Cảnh Báo Nội Dung</h4>
                        <Link href="/staff/moderation" className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center">
                            Xử lý ngay <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-0 flex-1">
                        <div className="divide-y divide-slate-100">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                                    <div className="p-2 bg-rose-50 rounded-lg">
                                        <ShieldAlert className="w-5 h-5 text-rose-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <div className="text-sm font-bold text-slate-900 text-rose-600">Báo cáo đánh giá #{200 + i}</div>
                                            <span className="text-[10px] text-slate-400 font-medium">5 phút trước</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                            Nội dung chứa từ ngữ không phù hợp tại sân thể thao "Sân Chảo Lửa ({i})".
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
