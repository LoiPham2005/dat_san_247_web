"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useOwnerBookings } from '@/features/owner/hooks/useOwnerBooking';
import { BookingStatus, OwnerBooking } from '@/features/owner/api/owner-booking.api';
import { Calendar, Search, User, Phone, MapPin, Clock, CheckCircle2, QrCode, Filter, Bell } from 'lucide-react';
import { toast } from 'sonner';

export const DailySchedule = ({ venueId }: { venueId: string }) => {
    const { bookings, isLoading, updateStatus } = useOwnerBookings(venueId);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    
    // Auto update current time
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const todayStr = currentDate.toISOString().split('T')[0];
    const todayBookings = bookings.filter(b => b.booking_date === todayStr);

    const filteredBookings = todayBookings
        .filter(b => 
            b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            b.customer_phone.includes(searchTerm) ||
            b.booking_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.court_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.start_time.localeCompare(b.start_time));

    const handleCheckIn = (id: string) => {
        updateStatus({ id, status: 'CHECKED_IN' });
    };

    const handleCheckout = (id: string) => {
        updateStatus({ id, status: 'COMPLETED' });
    };

    const getStatusStyles = (status: BookingStatus) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'CHECKED_IN': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'COMPLETED': return 'bg-slate-50 text-slate-700 border-slate-200';
            case 'PENDING': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'CANCELLED': return 'bg-rose-50 text-rose-700 border-rose-200';
            default: return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    const getStatusLabel = (status: BookingStatus) => {
        switch (status) {
            case 'CONFIRMED': return 'Chờ Check-in';
            case 'CHECKED_IN': return 'Đang Đá';
            case 'COMPLETED': return 'Hoàn Thành';
            case 'PENDING': return 'Chờ Duyệt';
            case 'CANCELLED': return 'Đã Hủy';
            default: return status;
        }
    };

    return (
        <div className="space-y-6">
            {/* TỔNG QUAN CA LÀM VIỆC */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600 font-bold text-center min-w-[80px]">
                        <div className="text-2xl">{currentTime.getHours().toString().padStart(2, '0')}:{currentTime.getMinutes().toString().padStart(2, '0')}</div>
                        <div className="text-[10px] uppercase mt-0.5 tracking-wider">{currentTime.toLocaleDateString('vi-VN')}</div>
                    </div>
                    <div>
                        <h2 className="font-extrabold text-slate-800 text-lg">Lịch Trình Hôm Nay</h2>
                        <div className="text-xs font-semibold text-slate-500 mt-1 flex gap-4">
                            <span>Có <strong className="text-indigo-600">{todayBookings.length}</strong> ca đặt sân</span>
                            <span>Đang đá: <strong className="text-emerald-600">{todayBookings.filter(b => b.status === 'CHECKED_IN').length}</strong></span>
                            <span>Chờ tiếp đón: <strong className="text-blue-600">{todayBookings.filter(b => b.status === 'CONFIRMED').length}</strong></span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="Tìm SĐT, Tên KH, Mã..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-50 border-slate-200 pl-9 h-10 w-full"
                        />
                    </div>
                    <Button variant="outline" className="h-10 px-3 border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100">
                        <QrCode className="w-4 h-4 mr-2" /> Quét Mã
                    </Button>
                </div>
            </div>

            {/* DANH SÁCH LỊCH TRÌNH */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-indigo-600" /> Lịch Đặt Trực Tiếp Tại Sân
                    </h3>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs font-semibold" onClick={() => setCurrentDate(new Date(currentDate.getTime() - 86400000))}>Hôm qua</Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs font-bold text-indigo-700 bg-indigo-50 border-indigo-200" onClick={() => setCurrentDate(new Date())}>Hôm nay</Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs font-semibold" onClick={() => setCurrentDate(new Date(currentDate.getTime() + 86400000))}>Ngày mai</Button>
                    </div>
                </div>
                
                {isLoading ? (
                    <div className="p-16 text-center text-slate-500 font-medium">Đang tải lịch trình...</div>
                ) : filteredBookings.length === 0 ? (
                    <div className="p-16 text-center bg-slate-50/50">
                        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 font-bold mb-1">Không có lịch nào được tìm thấy</p>
                        <p className="text-slate-400 text-sm">Chưa có khách hàng đặt sân vào ngày này.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filteredBookings.map((booking) => {
                            const isPast = booking.status === 'COMPLETED' || booking.status === 'CANCELLED';
                            const isNowOrFuture = booking.status === 'CONFIRMED' || booking.status === 'CHECKED_IN';
                            
                            return (
                                <div key={booking.id} className={`p-4 flex flex-col md:flex-row gap-4 hover:bg-slate-50 transition-colors ${isPast ? 'opacity-70' : ''}`}>
                                    {/* THỜI GIAN & SÂN */}
                                    <div className="md:w-48 shrink-0 flex flex-col md:border-r border-slate-100 pr-4 relative">
                                        <div className="flex items-center gap-2 font-black text-slate-900 text-lg tracking-tight">
                                            {booking.start_time} - {booking.end_time}
                                            {booking.status === 'CHECKED_IN' && <span className="absolute -left-2 top-2 bottom-2 w-1 bg-emerald-500 rounded-r-md"></span>}
                                        </div>
                                        <div className="text-sm font-bold text-indigo-600 mt-1 flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" /> {booking.court_name}
                                        </div>
                                        <div className={`mt-2 inline-flex self-start px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusStyles(booking.status)}`}>
                                            {getStatusLabel(booking.status)}
                                        </div>
                                    </div>

                                    {/* THÔNG TIN KHÁCH HÀNG */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-bold text-slate-800 text-base">{booking.customer_name}</div>
                                            <div className="text-xs font-bold text-slate-500 px-2 py-1 bg-slate-100 rounded-md">Mã: {booking.booking_code}</div>
                                        </div>
                                        <div className="flex gap-4 mb-3">
                                            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                                                <Phone className="w-4 h-4 text-slate-400" /> {booking.customer_phone}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                                                <User className="w-4 h-4 text-slate-400" /> Đã trả: {booking.payment_status === 'PAID' ? 'Toàn bộ' : 'Chưa thu'}
                                            </div>
                                        </div>

                                        {/* GHI CHÚ */}
                                        <div className="text-xs bg-amber-50 text-amber-800 p-2 rounded-lg border border-amber-100 font-medium inline-block">
                                            Tiền sân: <span className="font-bold">{booking.total_amount.toLocaleString()}đ</span>
                                        </div>
                                    </div>

                                    {/* HÀNH ĐỘNG (LỄ TÂN) */}
                                    <div className="md:w-48 shrink-0 flex flex-col justify-center items-end gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                                        {booking.status === 'CONFIRMED' && (
                                            <Button 
                                                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold h-10 shadow-md shadow-emerald-600/20"
                                                onClick={() => handleCheckIn(booking.id)}
                                            >
                                                <CheckCircle2 className="w-4 h-4 mr-2" /> Nhận Sân (Check-in)
                                            </Button>
                                        )}
                                        {booking.status === 'CHECKED_IN' && (
                                            <>
                                                <Button 
                                                    variant="outline" 
                                                    className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-bold h-9 text-xs"
                                                    onClick={() => toast.info('Chức năng bán nước/thêm dịch vụ sắp ra mắt.')}
                                                >
                                                    Thêm Dịch Vụ
                                                </Button>
                                                <Button 
                                                    className="w-full bg-slate-800 hover:bg-slate-900 font-bold h-9 text-xs"
                                                    onClick={() => handleCheckout(booking.id)}
                                                >
                                                    Thanh Toán & Trả Sân
                                                </Button>
                                            </>
                                        )}
                                        {booking.status === 'PENDING' && (
                                            <Button 
                                                variant="outline"
                                                className="w-full border-amber-200 text-amber-700 hover:bg-amber-50 font-bold justify-center"
                                                onClick={() => toast.info('Xin hãy chuyển lịch này cho Quản lý phê duyệt.')}
                                            >
                                                <Bell className="w-4 h-4 mr-2" /> Báo Quản Lý
                                            </Button>
                                        )}
                                        {booking.status === 'COMPLETED' && (
                                            <div className="w-full flex justify-end text-xs font-bold text-slate-400 items-center gap-1">
                                                <CheckCircle2 className="w-4 h-4 inline" /> Đã Hoàn Thành
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            
            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100 text-sm flex gap-3">
                <div className="shrink-0 mt-0.5"><Bell className="w-5 h-5 text-blue-600" /></div>
                <div>
                    <strong>Lưu ý dành cho Lễ Tân (Receptionist):</strong><br/>
                    Hãy thực hiện thao tác <span className="font-bold underline text-blue-900">Nhận Sân (Check-in)</span> ngay khi khách có mặt và quét mã QR Code khai báo thành công, nhằm đảm bảo ghi nhận chuẩn thời điểm nhận sân trong hệ thống.
                </div>
            </div>
        </div>
    );
};
