"use client";

import React, { useState } from 'react';
import { useAdminBookings } from '../hooks/useAdminBookings';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card } from '@/components/common/Card';
import { Search, MapPin, Calendar, Clock, Banknote, ShieldAlert, XCircle, Info, Phone, CalendarRange } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export const AdminBookingList = () => {
    const { bookings, isLoading, adminCancelBooking } = useAdminBookings();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const [cancelingId, setCancelingId] = useState<string | null>(null);
    const [simulatedRole, setSimulatedRole] = useState<'admin' | 'super_admin'>('admin');

    const filteredBookings = bookings.filter((booking) => {
        const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              booking.customer_phone.includes(searchTerm) ||
                              booking.venue_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || booking.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleForceCancel = (id: string) => {
        if (simulatedRole !== 'super_admin') {
            alert('LỖI PHÂN QUYỀN: Chỉ Super Admin mới có quyền can thiệp hủy booking cưỡng chế.');
            return;
        }
        if (window.confirm('CẢNH BÁO SUPER ADMIN\nBạn đang can thiệp hủy lịch và hoàn tiền cưỡng chế. Thao tác này sẽ ghi log hệ thống. Tiếp tục?')) {
            adminCancelBooking({ id, reason: "Super Admin Force Cancellation" });
            setCancelingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải dữ liệu Booking toàn hệ thống...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Demo Header for role simulation */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex justify-between items-center">
                <div className="text-sm text-indigo-800 font-medium">
                    Đang xem với tư cách: <strong className="uppercase">{simulatedRole === 'admin' ? 'Admin Vận Hành' : 'Super Admin'}</strong>
                </div>
                <Button 
                    variant="outline" size="sm" 
                    className="h-8 border-indigo-200 text-indigo-700 bg-white"
                    onClick={() => setSimulatedRole(r => r === 'admin' ? 'super_admin' : 'admin')}
                >
                    Đổi quyền (Demo)
                </Button>
            </div>

            {/* Control Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Mã Booking, Tên khách, SĐT, Tên Sân..."
                        className="pl-9 h-10 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <select 
                            className="w-full appearance-none h-10 bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-md px-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-semibold text-slate-700 transition-all cursor-pointer"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="ALL">Tất cả Trạng thái</option>
                            <option value="PENDING">Chờ Thanh toán (Pending)</option>
                            <option value="CONFIRMED">Đã chốt (Confirmed)</option>
                            <option value="COMPLETED">Hoàn thành (Completed)</option>
                            <option value="NO_SHOW">Khách boom (No show)</option>
                            <option value="CANCELLED">Đã hủy (Cancelled)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Bookings List (Vertical Table/Cards approach for better dense info) */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                            <tr>
                                <th className="px-5 py-4 w-60">Mã / Thông tin Sân</th>
                                <th className="px-5 py-4 w-52">Khách hàng</th>
                                <th className="px-5 py-4 w-48">Thời gian đá</th>
                                <th className="px-5 py-4 w-44 text-right">Tài chính</th>
                                <th className="px-5 py-4 w-36 text-center">Trạng thái</th>
                                <th className="px-5 py-4 w-24 text-right">Tác vụ Admin</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                                        Không tìm thấy Booking nào phù hợp tiêu chí tìm kiếm.
                                    </td>
                                </tr>
                            ) : filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                                    {/* Sân & Mã */}
                                    <td className="px-5 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 inline-block px-1.5 py-0.5 rounded border border-slate-200 w-fit">
                                                ID: {booking.id}
                                            </span>
                                            <div className="flex items-center gap-1.5 mt-1 text-slate-700 font-semibold group-hover:text-primary transition-colors cursor-pointer w-fit">
                                                <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                                                <span className="truncate max-w-[180px]" title={booking.venue_name}>{booking.venue_name}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 pl-5">
                                                • {booking.court_name}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Khách hàng */}
                                    <td className="px-5 py-4">
                                        <div className="font-semibold text-slate-800">{booking.customer_name}</div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                                            {booking.customer_phone}
                                        </div>
                                    </td>

                                    {/* Thời gian */}
                                    <td className="px-5 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                                                <Calendar className="w-4 h-4" />
                                                {format(new Date(booking.booking_date), 'dd/MM/yyyy')}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 w-fit px-2 py-0.5 rounded-md font-medium font-mono">
                                                <Clock className="w-3.5 h-3.5 text-sky-600" />
                                                {booking.start_time} - {booking.end_time}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Tài chính */}
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="font-bold text-slate-900 flex items-center gap-1">
                                                {booking.total_price.toLocaleString('vi-VN')} đ
                                            </div>
                                            <div className="flex justify-end gap-1">
                                                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm line-clamp-1
                                                    ${booking.payment_status === 'PAID' ? 'text-emerald-700 bg-emerald-100' : 
                                                    booking.payment_status === 'REFUNDED' ? 'text-purple-700 bg-purple-100' :
                                                    'text-amber-700 bg-amber-100'}`}>
                                                    {booking.payment_method}
                                                </span>
                                                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm line-clamp-1
                                                    ${booking.payment_status === 'PAID' ? 'text-emerald-700 bg-emerald-100' : 
                                                    booking.payment_status === 'REFUNDED' ? 'text-purple-700 bg-purple-100' :
                                                    'text-amber-700 bg-amber-100'}`}>
                                                    {booking.payment_status}
                                                </span>
                                            </div>
                                            
                                            {booking.refund_amount > 0 && (
                                                <div className="text-[10px] font-medium text-rose-500 flex items-center gap-1 mt-0.5">
                                                    Đã hoàn: <span className="line-through decoration-rose-300">{booking.refund_amount.toLocaleString('vi-VN')} đ</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-5 py-4 text-center">
                                        <StatusBadge status={booking.status} type="booking" />
                                    </td>

                                    {/* Actions */}
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex justify-end items-center gap-0.5 relative">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/10" title="Chi tiết Lịch sử">
                                                <Info className="w-4 h-4" />
                                            </Button>

                                            {/* Nút Cancel Quyền Admin: Hiện đỏ cho SA, xám cho Admin */}
                                            {(booking.status === 'CONFIRMED' || booking.status === 'PENDING') && (
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className={`h-8 w-8 ${simulatedRole === 'super_admin' ? 'text-rose-400 hover:text-rose-600 hover:bg-rose-50' : 'text-slate-300 cursor-not-allowed'} `}
                                                    title={simulatedRole === 'super_admin' ? (cancelingId === booking.id ? "Xác nhận Hủy Cưỡng Chế!" : "Hủy / Hoàn tiền Cưỡng Chế (Super Admin)") : 'Chỉ Super Admin mới được can thiệp hủy'}
                                                    onClick={() => {
                                                        if (simulatedRole === 'super_admin') {
                                                            cancelingId === booking.id ? handleForceCancel(booking.id) : setCancelingId(booking.id);
                                                        } else {
                                                            alert('Chỉ Super Admin mới có quyền can thiệp hủy booking hệ thống!');
                                                        }
                                                    }}
                                                >
                                                    {cancelingId === booking.id && simulatedRole === 'super_admin' ? <ShieldAlert className="w-4 h-4 animate-pulse fill-rose-100" /> : <XCircle className="w-4 h-4" />}
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Quick Links cho Super Admin */}
                <Card className="bg-white border-slate-200">
                    <div className="p-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                            <CalendarRange className="w-4 h-4 text-primary" /> Tiện ích Mở Rộng
                        </div>
                        <p className="text-xs text-slate-500 mb-2">Xem các cấu trúc Booking phức tạp của hệ thống.</p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 text-xs bg-slate-50 hover:bg-slate-100">Lịch Định Kỳ (Recurring)</Button>
                            <Button variant="outline" size="sm" className="flex-1 text-xs bg-slate-50 hover:bg-slate-100">Hàng Đợi (Waitlist)</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
