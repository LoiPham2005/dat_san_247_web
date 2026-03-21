"use client";

import React from 'react';
import { Card } from '@/components/common/Card';
import { 
    Store, CalendarCheck, DollarSign, 
    TrendingUp, ShieldAlert, Activity, Users, Clock, ChevronRight, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useOwnerDashboard } from '@/features/owner/hooks/useOwnerDashboard';

export default function OwnerDashboardPage() {
    const { data: stats, isLoading } = useOwnerDashboard();

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center h-[calc(100vh-64px)]">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <Activity className="w-8 h-8 text-emerald-600" /> Bảng Điều Khiển Kinh Doanh (Dashboard)
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Chào mừng Chủ Sân! Tổng quan nhanh về các Cơ sở, Lượng Đặt Sân và Doanh thu của bạn hôm nay.
                    </p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Cơ Sở Hoạt Động</p>
                            <h3 className="text-3xl font-black text-slate-900">{String(stats?.venuesCount || 0).padStart(2, '0')}</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl group-hover:scale-110 transition-transform">
                            <Store className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                    {stats && stats.pendingVenuesCount > 0 && (
                        <div className="mt-4 flex items-center text-sm font-semibold text-amber-600">
                            <ShieldAlert className="w-4 h-4 mr-1 text-amber-500" />
                            {stats.pendingVenuesCount} Cơ sở đang chờ duyệt
                        </div>
                    )}
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Lượt Đặt Hôm Nay</p>
                            <h3 className="text-3xl font-black text-slate-900">{stats?.todayBookingsCount || 0}</h3>
                        </div>
                        <div className="p-3 bg-sky-50 rounded-xl group-hover:scale-110 transition-transform">
                            <CalendarCheck className="w-6 h-6 text-sky-600" />
                        </div>
                    </div>
                    <div className={`mt-4 flex items-center text-sm font-semibold ${stats && stats.bookingsGrowth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {stats && stats.bookingsGrowth >= 0 ? '+' : ''}{stats?.bookingsGrowth}% so với hôm qua
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Doanh Thu Tạm Tính</p>
                            <h3 className="text-3xl font-black text-slate-900">{stats?.todayRevenue.toLocaleString()} ₫</h3>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl group-hover:scale-110 transition-transform">
                            <DollarSign className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-slate-500">
                        Hôm nay (Đã thanh toán)
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Nhân Viên Đang Trực</p>
                            <h3 className="text-3xl font-black text-slate-900">{String(stats?.activeStaffCount || 0).padStart(2, '0')}</h3>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-xl group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-slate-500">
                        <Clock className="w-4 h-4 mr-1 text-slate-400" /> Đang hoạt động
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
                        {!stats || stats.recentBookings.length === 0 ? (
                            <div className="p-10 text-center text-slate-400 font-medium">Chưa có lượt đặt sân nào</div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {stats.recentBookings.map((b) => (
                                    <div key={b.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">{b.venueName} • {b.courtName}</div>
                                            <div className="text-xs text-slate-500 font-medium mt-0.5">Khách: {b.customerName} • {b.totalAmount.toLocaleString()}₫</div>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                                            b.paymentStatus === 'PAID' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                                        }`}>
                                            {b.paymentStatus === 'PAID' ? 'Đã Thanh Toán' : 'Chờ Thanh Toán'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Card>

                {/* Phím tắt nhanh hoặc Thông tin khác */}
                <Card className="col-span-1 border-slate-200 shadow-sm p-6 flex flex-col justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
                    <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                             Lối Tắt Quản Trị <ChevronRight className="w-5 h-5 opacity-50" />
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/owner/venues" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                                <Store className="w-6 h-6 mb-2 text-emerald-400" />
                                <div className="text-sm font-bold">Thêm Cơ Sở</div>
                                <div className="text-[10px] text-slate-400">Mở rộng kinh doanh</div>
                            </Link>
                            <Link href="/owner/staff" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                                <Users className="w-6 h-6 mb-2 text-sky-400" />
                                <div className="text-sm font-bold">Quản Lý Nhân Viên</div>
                                <div className="text-[10px] text-slate-400">Phân quyền, ca trực</div>
                            </Link>
                            <Link href="/owner/analytics" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                                <Activity className="w-6 h-6 mb-2 text-purple-400" />
                                <div className="text-sm font-bold">Phân Tích Chuyên Sâu</div>
                                <div className="text-[10px] text-slate-400">Xem báo cáo chi tiết</div>
                            </Link>
                            <Link href="/owner/finance" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                                <DollarSign className="w-6 h-6 mb-2 text-amber-400" />
                                <div className="text-sm font-bold">Rút Tiền & Ví</div>
                                <div className="text-[10px] text-slate-400">Yêu cầu thanh toán</div>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
