"use client";

import React from 'react';
import { Card } from '@/components/common/Card';
import { 
    CalendarCheck, Clock, Users, Activity, 
    ChevronRight, CreditCard, MapPin, HardHat
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';

export default function VenueStaffDashboardPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <Activity className="w-8 h-8 text-primary" /> Bảng Điều Khiển Nhân Viên Sân (Dashboard)
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Chào mừng nhân viên sân! Dưới đây là lịch trình đặt sân và hoạt động tại cơ sở của bạn trong ngày hôm nay.
                    </p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Check-in Hôm Nay</p>
                            <h3 className="text-3xl font-black text-slate-900">18</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl group-hover:scale-110 transition-transform">
                            <CalendarCheck className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                        <Clock className="w-4 h-4 mr-1 text-slate-400" />
                        5 khách sắp đến
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Booking Chờ Duyệt</p>
                            <h3 className="text-3xl font-black text-slate-900">04</h3>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-xl group-hover:scale-110 transition-transform">
                            <Clock className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-amber-600">
                        Cần xác nhận ngay
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Tỷ Lệ Lấp Đầy</p>
                            <h3 className="text-3xl font-black text-slate-900">85%</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform">
                            <Activity className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                        Ổn định so với hôm qua
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>

                <Card className="p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Khách Mới</p>
                            <h3 className="text-3xl font-black text-slate-900">12</h3>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                        +3 khách hàng mới
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-50 rounded-full opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lịch thi đấu hôm nay */}
                <Card className="lg:col-span-2 border-slate-200 shadow-sm flex flex-col">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                        <h4 className="font-bold text-slate-800">Lịch Trình Đặt Sân Hôm Nay</h4>
                        <Link href="/venue-staff/bookings" className="text-xs font-bold text-primary hover:text-primary/80 flex items-center">
                            Xem lịch tuần <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-white border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                                <tr>
                                    <th className="px-6 py-3">Khung Giờ</th>
                                    <th className="px-6 py-3">Sân</th>
                                    <th className="px-6 py-3">Khách Hàng</th>
                                    <th className="px-6 py-3">Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    { time: '17:00 - 18:30', court: 'Sân 1', customer: 'Nguyễn Văn A', status: 'CONFIRMED' },
                                    { time: '18:30 - 20:00', court: 'Sân 2', customer: 'Trần Thị B', status: 'CONFIRMED' },
                                    { time: '20:00 - 21:30', court: 'Sân 1', customer: 'Lê Văn C', status: 'PENDING' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors text-sm font-medium">
                                        <td className="px-6 py-4 text-primary font-bold">{row.time}</td>
                                        <td className="px-6 py-4 text-slate-700">{row.court}</td>
                                        <td className="px-6 py-4 text-slate-900 font-bold">{row.customer}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border
                                                ${row.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Thông tin cơ sở */}
                <Card className="col-span-1 border-slate-200 shadow-sm flex flex-col h-fit">
                    <div className="p-5 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                        <h4 className="font-bold text-slate-800">Thông Tin Sân Đang Trực</h4>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <HardHat className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Vai Trò</p>
                                <p className="text-sm font-black text-slate-900">Nhân Viên Vận Hành</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-50 rounded-xl">
                                <MapPin className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cơ Sở</p>
                                <p className="text-sm font-black text-slate-900">Sân Bóng Đá Cầu Giấy</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                             <Button variant="outline" className="w-full justify-start gap-2 h-10 font-bold">
                                <CreditCard className="w-4 h-4" /> Thanh Toán Tại Chỗ
                             </Button>
                             <Button variant="outline" className="w-full justify-start gap-2 h-10 font-bold">
                                <Activity className="w-4 h-4" /> Cập Nhật Trạng Thái Sân
                             </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
