"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAdminBookings } from '../hooks/useAdminBookings';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card } from '@/components/common/Card';
import { Search, MapPin, Calendar, Clock, Banknote, ShieldAlert, XCircle, Info, Phone, CalendarRange, ChevronDown, Check } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { BookingStatus } from '../api/admin-booking.api';
import { Pagination } from '@/components/common/Pagination';
import { cn } from '@/lib/utils/cn';

export const AdminBookingList = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    
    // State for click-to-show dropdown
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    const { bookings, meta, isLoading, updateStatus, isUpdating } = useAdminBookings({
        page,
        limit,
        status: statusFilter === 'ALL' ? undefined : statusFilter,
        search: searchTerm || undefined
    });

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // If click is not on the trigger badge and not inside the dropdown menu
            if (!target.closest('.status-trigger') && !target.closest('.status-dropdown')) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setPage(1);
    };

    const handleStatusFilter = (val: string) => {
        setStatusFilter(val);
        setPage(1);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };

    const handleStatusUpdate = async (id: string, newStatus: BookingStatus) => {
        await updateStatus({ id, status: newStatus });
        setOpenDropdownId(null);
    };

    const bookingStatuses: BookingStatus[] = [
        'PENDING', 'CONFIRMED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED', 'NO_SHOW'
    ];

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải dữ liệu Booking...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Control Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Mã Booking, Tên khách, SĐT, Tên Sân..."
                        className="pl-9 h-10 border-slate-200 bg-slate-50"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <select 
                            className="w-full appearance-none h-10 bg-slate-50 hover:bg-white border border-slate-200 rounded-md px-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 font-semibold text-slate-700 transition-all cursor-pointer shadow-sm"
                            value={statusFilter}
                            onChange={(e) => handleStatusFilter(e.target.value)}
                        >
                            <option value="ALL">Tất cả Trạng thái</option>
                            <option value="PENDING">Chờ thanh toán</option>
                            <option value="CONFIRMED">Đã xác nhận</option>
                            <option value="CHECKED_IN">Đã nhận sân</option>
                            <option value="COMPLETED">Hoàn thành</option>
                            <option value="CANCELLED">Đã hủy</option>
                            <option value="NO_SHOW">Khách vắng mặt</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                            <tr>
                                <th className="px-5 py-4">Mã / Cơ sở</th>
                                <th className="px-5 py-4">Khách hàng</th>
                                <th className="px-5 py-4">Thời gian đặt</th>
                                <th className="px-5 py-4 text-right">Tổng tiền</th>
                                <th className="px-5 py-4 text-center">Trạng thái</th>
                                <th className="px-5 py-4 text-right">Thanh toán</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                                        Không tìm thấy Booking nào phù hợp.
                                    </td>
                                </tr>
                            ) : bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-5 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="font-mono text-[10px] font-semibold text-slate-600 uppercase tracking-widest bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 w-fit">
                                                {booking.booking_code}
                                            </span>
                                            <div className="flex items-center gap-1.5 mt-1 text-slate-800 font-semibold group-hover:text-primary transition-colors">
                                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="truncate max-w-[200px]">{booking.venue_name}</span>
                                            </div>
                                            <div className="text-[11px] text-slate-500 font-medium pl-5">
                                                {booking.court_name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="font-semibold text-slate-800">{booking.customer_name}</div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                                            <Phone className="w-3 h-3 text-slate-300" />
                                            {booking.customer_phone}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                                                <Calendar className="w-3.5 h-3.5 text-primary/60" />
                                                {format(new Date(booking.booking_date), 'dd/MM/yyyy')}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[11px] text-sky-700 bg-sky-50 w-fit px-2 py-0.5 rounded border border-sky-100 font-semibold">
                                                <Clock className="w-3 h-3" />
                                                {booking.start_time} - {booking.end_time}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="font-bold text-slate-900 text-base">
                                            {(booking.total_amount || 0).toLocaleString('vi-VN')}đ
                                        </div>
                                        {booking.addons.length > 0 && (
                                            <div className="text-[10px] text-slate-400 font-medium flex justify-end gap-1 mt-0.5">
                                                +{booking.addons.length} dịch vụ kèm
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <div className="relative inline-block">
                                            <div 
                                                className="status-trigger"
                                                onClick={() => setOpenDropdownId(openDropdownId === booking.id ? null : booking.id)}
                                            >
                                                <StatusBadge status={booking.status} type="booking" className="cursor-pointer select-none border-2 hover:border-primary/50 transition-all shadow-sm" />
                                            </div>
                                            
                                            {openDropdownId === booking.id && (
                                                <div className="status-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2 min-w-[190px] animate-in fade-in zoom-in duration-200">
                                                    <div className="py-2 px-3 mb-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">Thay đổi Trạng thái</div>
                                                    <div className="flex flex-col gap-1.5">
                                                        {bookingStatuses.map(st => (
                                                            <button
                                                                key={st}
                                                                disabled={isUpdating}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleStatusUpdate(booking.id, st);
                                                                }}
                                                                className={cn(
                                                                    "flex items-center justify-between gap-3 p-1.5 rounded-xl transition-all",
                                                                    booking.status === st ? "bg-slate-50 ring-1 ring-primary/20 shadow-sm" : "hover:bg-slate-50/50"
                                                                )}
                                                            >
                                                                <StatusBadge status={st} type="booking" className="flex-1 text-center py-2" />
                                                                <div className="flex-shrink-0 w-6 flex justify-center">
                                                                    {booking.status === st && <Check className="w-3.5 h-3.5 text-primary" />}
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex flex-col items-end gap-1">
                                            <div className={`text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                                                booking.payment_status === 'PAID' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                booking.payment_status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                'bg-rose-50 text-rose-700 border-rose-100'
                                            }`}>
                                                {booking.payment_status === 'PAID' ? 'Đã thanh toán' : 
                                                 booking.payment_status === 'PENDING' ? 'Chờ thanh toán' :
                                                 booking.payment_status}
                                            </div>
                                            <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-tighter">
                                                {booking.payment_method}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {meta && (
                    <div className="px-5 border-t border-slate-100 bg-slate-50/30">
                        <Pagination 
                            currentPage={page} 
                            totalPages={meta.totalPages} 
                            onPageChange={(p) => setPage(p)}
                            limit={limit}
                            onLimitChange={handleLimitChange}
                            totalItems={meta.total}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
