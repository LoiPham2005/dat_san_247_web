"use client";

import React from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Users, CalendarCheck, MapPin, Target, TrendingUp, Clock, DollarSign, Store } from 'lucide-react';
import { useOwnerBookings, useOwnerWaitlist } from '@/features/owner/hooks/useOwnerBooking';

export default function VenueStaffDashboardPage() {
    const venueId = 'VN-1'; // Mock Data - Venue Staff is assigned to VN-1 normally
    const { bookings, isLoading } = useOwnerBookings(venueId);
    const { waitlist } = useOwnerWaitlist(venueId);

    const pendingBookings = bookings.filter(b => b.status === 'PENDING').length;
    const checkedInBookings = bookings.filter(b => b.status === 'CHECKED_IN').length;
    const todayRevenue = bookings.filter(b => b.status === 'COMPLETED' || b.status === 'CONFIRMED').reduce((acc, curr) => acc + curr.total_amount, 0);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="mb-8">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Target className="w-7 h-7 text-indigo-600" /> Bảng Điều Khiển (Manager)
                </h1>
                <p className="text-sm font-medium text-slate-500 mt-1">Cơ sở: <strong className="text-slate-800">Sân Bóng Vipe Cầu Giấy</strong></p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* DOANH THU HÔM NAY TỔNG QUAN */}
                <Card className="p-5 flex flex-col justify-between border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-indigo-500" /> Doanh Thu Trong Ngày</span>
                    <div className="mt-4 flex items-end justify-between">
                        <span className="text-2xl font-black text-slate-900">{isLoading ? '...' : (todayRevenue + 1200000).toLocaleString()} <span className="text-sm font-medium text-slate-500">đ</span></span>
                    </div>
                </Card>
                
                {/* LỊCH ĐẶT CHỜ DUYỆT */}
                <Card className="p-5 flex flex-col justify-between border-l-4 border-l-amber-500 hover:shadow-md transition-shadow bg-amber-50/30">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1.5"><Clock className="w-4 h-4" /> Lịch Cần Duyệt</span>
                    <div className="mt-4 flex items-end justify-between">
                        <span className="text-2xl font-black text-amber-600">{isLoading ? '...' : pendingBookings} <span className="text-sm font-medium text-amber-500">lịch</span></span>
                        {pendingBookings > 0 && <Button size="sm" onClick={() => window.location.href='/venue-staff/bookings'} className="h-7 text-[10px] px-2 bg-amber-100 text-amber-700 hover:bg-amber-200">Duyệt ngay</Button>}
                    </div>
                </Card>
                
                {/* ĐANG CHECK-IN */}
                <Card className="p-5 flex flex-col justify-between border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow bg-emerald-50/30">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-1.5"><CalendarCheck className="w-4 h-4" /> Đang Check-in Đang Đá</span>
                    <div className="mt-4 flex items-end justify-between">
                        <span className="text-2xl font-black text-emerald-600">{isLoading ? '...' : checkedInBookings} <span className="text-sm font-medium text-emerald-500">lịch</span></span>
                    </div>
                </Card>

                {/* DANH SÁCH CHỜ */}
                <Card className="p-5 flex flex-col justify-between border-l-4 border-l-rose-500 hover:shadow-md transition-shadow bg-rose-50/30">
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-widest flex items-center gap-1.5"><Users className="w-4 h-4" /> Khách Chờ Sân (Waitlist)</span>
                    <div className="mt-4 flex items-end justify-between">
                        <span className="text-2xl font-black text-rose-600">{waitlist.length} <span className="text-sm font-medium text-rose-500">khách</span></span>
                    </div>
                </Card>
            </div>

            {/* Quick Actions / Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
               <Card className="p-6">
                    <h3 className="font-black text-slate-800 flex items-center gap-2 mb-4"><CalendarCheck className="w-5 h-5 text-indigo-600" /> Tương Tác Nhanh Lịch Đặt</h3>
                    <div className="space-y-3">
                         {isLoading ? (
                             <div className="py-4 text-center text-slate-500 text-sm">Đang tải lịch chưa duyệt...</div>
                         ) : pendingBookings === 0 ? (
                             <div className="py-4 text-center text-slate-500 text-sm">Tuyệt vời! Đã duyệt toàn bộ lịch khách đặt.</div>
                         ) : (
                             bookings.filter(b => b.status === 'PENDING').slice(0, 3).map(b => (
                                 <div key={b.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                                     <div>
                                         <div className="font-bold text-sm text-slate-800">{b.start_time} - {b.end_time} • {b.court_name}</div>
                                         <div className="text-xs text-slate-500 mt-0.5">{b.customer_name} ({b.customer_phone})</div>
                                     </div>
                                     <Button size="sm" onClick={() => window.location.href='/venue-staff/bookings'} className="bg-blue-600">Xem</Button>
                                 </div>
                             ))
                         )}
                    </div>
               </Card>
               <Card className="p-6">
                    <h3 className="font-black text-slate-800 flex items-center gap-2 mb-4"><Store className="w-5 h-5 text-emerald-600" /> Hoạt Động Của Bạn</h3>
                    <div className="space-y-4">
                        <div className="text-sm text-slate-600 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-black text-xs">ON</div>
                            <div>
                                <div className="font-bold text-slate-800">Trạng thái Cơ Sở: Đang Nhận Khách</div>
                                <div className="text-xs mt-1">Giờ mở cửa hôm nay: 06:00 - 23:00</div>
                            </div>
                        </div>
                        <div className="text-sm text-slate-600 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                                <Users className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-800">Cơ cấu Nhân Sự Ca</div>
                                <div className="text-xs mt-1">Ca của bạn: 14:00 - 22:00 (Cổn Nhân viên: 3)</div>
                            </div>
                        </div>
                    </div>
               </Card>
            </div>
        </div>
    );
}
