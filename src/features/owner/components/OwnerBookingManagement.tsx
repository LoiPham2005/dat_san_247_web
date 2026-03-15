"use client";

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useOwnerBookings, useOwnerWaitlist, useOwnerRecurringBookings } from '../hooks/useOwnerBooking';
import { BookingStatus } from '../api/owner-booking.api';
import { Search, Filter, CheckCircle2, XCircle, Clock, CalendarRange, Clock3, Ban, Phone } from 'lucide-react';
import { toast } from 'sonner';

export const OwnerBookingManagement = ({ venueId }: { venueId: string }) => {
    const { bookings, isLoading, updateStatus } = useOwnerBookings(venueId);
    const { waitlist, isLoading: isLoadingWaitlist } = useOwnerWaitlist(venueId);
    const { recurring, isLoading: isLoadingRecurring } = useOwnerRecurringBookings(venueId);

    const [activeTab, setActiveTab] = useState<'BOOKINGS'|'WAITLIST'|'RECURRING'>('BOOKINGS');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<BookingStatus | 'ALL'>('ALL');

    const filteredBookings = bookings.filter(b => {
        const matchSearch = b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            b.customer_phone.includes(searchTerm) ||
                            b.booking_code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'ALL' || b.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const getStatusStyle = (status: BookingStatus) => {
        switch (status) {
            case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'CONFIRMED': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'CHECKED_IN': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'COMPLETED': return 'bg-slate-100 text-slate-700 border-slate-200';
            case 'CANCELLED': return 'bg-rose-100 text-rose-700 border-rose-200';
            case 'NO_SHOW': return 'bg-purple-100 text-purple-700 border-purple-200';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const getStatusLabel = (status: BookingStatus) => {
        switch (status) {
            case 'PENDING': return 'Đang Chờ Duyệt';
            case 'CONFIRMED': return 'Đã Xác Nhận';
            case 'CHECKED_IN': return 'Đang Đá';
            case 'COMPLETED': return 'Đã Xong';
            case 'CANCELLED': return 'Đã Hủy';
            case 'NO_SHOW': return 'Bỏ Lịch (No-Show)';
            default: return status;
        }
    };

    return (
        <div className="space-y-6">
            {/* TABS */}
            <div className="flex space-x-2 border-b border-slate-200">
                <button 
                    className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'BOOKINGS' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('BOOKINGS')}
                >
                    <CalendarRange className="w-4 h-4" /> Danh Sách Lịch Đặt
                </button>
                <button 
                    className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'WAITLIST' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('WAITLIST')}
                >
                    <Clock3 className="w-4 h-4" /> Danh Sách Chờ
                </button>
                <button 
                    className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'RECURRING' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('RECURRING')}
                >
                    <Clock className="w-4 h-4" /> Lịch Cố Định (Định Kỳ)
                </button>
            </div>

            {/* TAB BOOKINGS */}
            {activeTab === 'BOOKINGS' && (
                <div className="space-y-4 animate-in slide-in-from-bottom-2 fade-in">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input 
                                placeholder="Tìm theo mã, tên, SĐT..." 
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="pl-9 h-10 w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-slate-500" />
                            <select 
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value as any)}
                                className="h-10 rounded-md border border-input bg-white px-3 py-2 text-sm font-bold text-slate-700 outline-none"
                            >
                                <option value="ALL">Tất cả trạng thái</option>
                                <option value="PENDING">Chờ Duyệt</option>
                                <option value="CONFIRMED">Đã Xác Nhận</option>
                                <option value="CHECKED_IN">Đang Đá (Check-in)</option>
                                <option value="COMPLETED">Hoàn Thành</option>
                                <option value="CANCELLED">Đã Hủy</option>
                            </select>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="p-12 text-center text-slate-500 font-medium">Đang tải lịch đặt...</div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="p-12 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-500 font-medium">
                            Không tìm thấy lịch đặt nào phù hợp.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredBookings.map(booking => (
                                <Card key={booking.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-emerald-200 transition-colors">
                                    <div className="flex gap-4 w-full md:w-auto">
                                        <div className="min-w-[80px] text-center p-2 bg-slate-50 rounded-lg border border-slate-100 flex flex-col justify-center">
                                            <span className="text-xs font-bold text-slate-500 uppercase">{new Date(booking.booking_date).toLocaleDateString('vi-VN', { weekday: 'short' })}</span>
                                            <span className="text-sm font-black text-slate-800">{booking.booking_date.split('-')[2]}/{booking.booking_date.split('-')[1]}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-black text-emerald-700">{booking.start_time} - {booking.end_time}</span>
                                                <span className="text-xs font-bold text-slate-400">|</span>
                                                <span className="text-xs font-bold text-slate-600">{booking.court_name}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <h4 className="font-bold text-slate-900">{booking.customer_name}</h4>
                                                <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                                                    <Phone className="w-3 h-3" /> {booking.customer_phone}
                                                </div>
                                            </div>
                                            <div className="text-xs font-medium text-slate-400 mt-1">Mã: {booking.booking_code}</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                                        <div className="text-right">
                                            <div className={`px-2.5 py-1 rounded text-xs font-bold uppercase border ${getStatusStyle(booking.status)}`}>
                                                {getStatusLabel(booking.status)}
                                            </div>
                                            <div className="text-sm font-black text-slate-900 mt-1">
                                                {booking.total_amount.toLocaleString()} đ
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {booking.status === 'PENDING' && (
                                                <>
                                                    <Button size="sm" onClick={() => updateStatus({ id: booking.id, status: 'CONFIRMED' })} className="h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-sm">Duyệt Lịch</Button>
                                                    <Button variant="outline" size="sm" onClick={() => updateStatus({ id: booking.id, status: 'CANCELLED' })} className="h-8 px-3 text-xs border-rose-200 text-rose-600 hover:bg-rose-50 font-bold">Từ Chối</Button>
                                                </>
                                            )}
                                            {booking.status === 'CONFIRMED' && (
                                                <>
                                                    <Button size="sm" onClick={() => updateStatus({ id: booking.id, status: 'CHECKED_IN' })} className="h-8 px-3 text-xs bg-emerald-600 hover:bg-emerald-700 font-bold text-white shadow-sm">Check-in Khách</Button>
                                                    <Button variant="ghost" size="sm" onClick={() => updateStatus({ id: booking.id, status: 'CANCELLED' })} className="h-8 px-3 text-xs text-rose-600 hover:bg-rose-50 font-bold border border-rose-200">Hủy Lịch</Button>
                                                </>
                                            )}
                                            {booking.status === 'CHECKED_IN' && (
                                                <>
                                                    <Button variant="outline" size="sm" onClick={() => toast.info('Tính năng Thêm Dịch Vụ (Nước, Bóng...) đang được cập nhật')} className="h-8 px-3 text-xs text-indigo-600 hover:bg-indigo-50 font-bold border border-indigo-200">Thêm Dịch Vụ</Button>
                                                    <Button size="sm" onClick={() => updateStatus({ id: booking.id, status: 'COMPLETED' })} className="h-8 px-3 text-xs bg-slate-600 hover:bg-slate-700 font-bold text-white shadow-sm">Hoàn Thành (Thanh Toán)</Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* TAB WAITLIST */}
            {activeTab === 'WAITLIST' && (
                <div className="space-y-4 animate-in slide-in-from-bottom-2 fade-in">
                    <Card className="p-0 overflow-hidden">
                        <div className="p-6 bg-slate-50 border-b border-slate-100">
                            <h3 className="font-black text-slate-800">Danh Sách Khách Đăng Ký Chờ Sân</h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">Khách sẽ được thông báo ngay khi có sân trống trong khung giờ họ mong muốn.</p>
                        </div>
                        {isLoadingWaitlist ? (
                            <div className="p-12 text-center text-slate-500 font-medium">Đang tải danh sách chờ...</div>
                        ) : waitlist.length === 0 ? (
                            <div className="p-12 text-center text-slate-500 font-medium bg-white">Chưa có khách chờ.</div>
                        ) : (
                            <div className="divide-y divide-slate-100 bg-white">
                                {waitlist.map(w => (
                                    <div key={w.id} className="p-4 flex justify-between items-center hover:bg-slate-50">
                                        <div>
                                            <h4 className="font-bold text-slate-900">{w.customer_name} <span className="text-xs font-semibold text-slate-500 ml-2">({w.customer_phone})</span></h4>
                                            <div className="text-sm font-medium text-slate-600 mt-1">
                                                Cần sân: <b className="text-slate-800">{w.court_name}</b> lúc <b className="text-emerald-700">{w.start_time} - {w.end_time}</b> ngày {new Date(w.booking_date).toLocaleDateString('vi-VN')}
                                            </div>
                                        </div>
                                        <div>
                                            <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase border ${w.status === 'WAITING' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600'}`}>
                                                {w.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            )}

            {/* TAB RECURRING */}
            {activeTab === 'RECURRING' && (
                <div className="space-y-4 animate-in slide-in-from-bottom-2 fade-in">
                    <Card className="p-0 overflow-hidden">
                        <div className="p-6 bg-slate-50 border-b border-slate-100">
                            <h3 className="font-black text-slate-800">Lịch Đặt Cố Định (Định Kỳ)</h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">Khách thuê cố định theo tháng / tuần. Hệ thống sẽ tự động tạo lịch trước cho họ.</p>
                        </div>
                        {isLoadingRecurring ? (
                            <div className="p-12 text-center text-slate-500 font-medium">Đang tải lịch cố định...</div>
                        ) : recurring.length === 0 ? (
                            <div className="p-12 text-center text-slate-500 font-medium bg-white">Không có lịch cố định nào.</div>
                        ) : (
                            <div className="divide-y divide-slate-100 bg-white">
                                {recurring.map(r => (
                                    <div key={r.id} className="p-4 flex flex-col md:flex-row justify-between md:items-center hover:bg-slate-50 gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded min-w-[60px] text-center border border-blue-200">{r.repeat_type}</span>
                                                <span className="text-sm font-bold text-slate-900">{r.court_name}</span>
                                            </div>
                                            <div className="text-sm font-bold text-emerald-700">
                                                {r.start_time} - {r.end_time}
                                            </div>
                                            <div className="text-xs font-medium text-slate-500 mt-1">
                                                Khách: <b className="text-slate-800">{r.customer_name}</b> ({r.customer_phone})
                                            </div>
                                        </div>
                                        <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase flex items-center gap-1 ${r.is_active ? 'text-emerald-600 bg-emerald-50 border border-emerald-200' : 'text-slate-500 bg-slate-100 border border-slate-200'}`}>
                                                {r.is_active ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                                                {r.is_active ? 'Đang hoạt động' : 'Đã ngưng'}
                                            </span>
                                            <div className="text-xs text-slate-400 font-medium">
                                                Từ: {new Date(r.start_date).toLocaleDateString()} {r.end_date ? `- ${new Date(r.end_date).toLocaleDateString()}` : '(Vô thời hạn)'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </div>
    );
};
