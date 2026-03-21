"use client";

import React from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import {
    Users, Store, CalendarCheck, DollarSign,
    TrendingUp, TrendingDown, Clock, ChevronRight, Activity
} from 'lucide-react';
import Link from 'next/link';
import { StatusBadge } from '@/components/common/StatusBadge';

export default function AdminDashboardPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <Activity className="w-8 h-8 text-primary" /> Tổng Quan Hệ Thống (Dashboard)
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Xin chào Super Admin! Dưới đây là bức tranh toàn cảnh về hoạt động kinh doanh và chỉ số tăng trưởng của nền tảng trong 30 ngày qua.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button className="h-10 px-4">Xuất Báo Cáo PDF</Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Tổng Doanh Thu</p>
                            <h3 className="text-3xl font-black text-slate-900">425.5M ₫</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl group-hover:scale-110 transition-transform">
                            <DollarSign className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +14.5%
                        <span className="text-slate-400 ml-2 font-medium">so với tháng trước</span>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Bookings Mới</p>
                            <h3 className="text-3xl font-black text-slate-900">1,204</h3>
                        </div>
                        <div className="p-3 bg-sky-50 rounded-xl group-hover:scale-110 transition-transform">
                            <CalendarCheck className="w-6 h-6 text-sky-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +8.2%
                        <span className="text-slate-400 ml-2 font-medium">so với tháng trước</span>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Cơ Sở (Venues)</p>
                            <h3 className="text-3xl font-black text-slate-900">48</h3>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-xl group-hover:scale-110 transition-transform">
                            <Store className="w-6 h-6 text-indigo-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-rose-500">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        -2.1%
                        <span className="text-slate-400 ml-2 font-medium">so với tuần trước</span>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Người Dùng Trực Tuyến</p>
                            <h3 className="text-3xl font-black text-slate-900">156</h3>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-slate-500">
                        <Clock className="w-4 h-4 mr-1 text-slate-400" />
                        Cập nhật 2 phút trước
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bookings Recents */}
                <Card className="col-span-1 border-slate-200 shadow-sm flex flex-col">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                        <h4 className="font-bold text-slate-800">Booking Mới Gần Đây</h4>
                        <Link href="/admin/bookings" className="text-xs font-bold text-primary hover:text-primary/80 flex items-center">
                            Xem tất cả <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-0 flex-1">
                        <div className="divide-y divide-slate-100">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">Sân Bóng Chảo Lửa ({i})</div>
                                        <div className="text-xs text-slate-500 font-medium mt-0.5">Khách: Nguyễn Văn A • 450,000đ</div>
                                    </div>
                                    <StatusBadge status={i % 2 === 0 ? "CONFIRMED" : "PENDING"} type="booking" className="px-2 py-0.5 text-[10px]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Yêu cầu rút tiền */}
                <Card className="col-span-1 lg:col-span-2 border-slate-200 shadow-sm flex flex-col">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                        <h4 className="font-bold text-slate-800">Yêu Cầu Rút Tiền Cần Xử Lý</h4>
                        <Link href="/admin/finance/payouts" className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center">
                            Xử lý ngay <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-0 flex-1 overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-white border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                                <tr>
                                    <th className="px-5 py-3">Sân Yêu Cầu</th>
                                    <th className="px-5 py-3">Ngân Hàng</th>
                                    <th className="px-5 py-3 text-right">Số Tiền (VNĐ)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[1, 2, 3, 4].map((i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="font-bold text-slate-800">Cầu Lông Viettel</div>
                                            <div className="text-[10px] text-slate-500 font-medium">10 phút trước</div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="font-semibold text-slate-700 flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" />MB Bank</div>
                                            <div className="text-[10px] text-slate-500 font-mono">0987654321</div>
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                            <span className="font-black text-rose-600 bg-rose-50 px-2 py-1 rounded inline-block">
                                                {(i * 5000000).toLocaleString('vi-VN')} đ
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}

const CreditCard = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
)
