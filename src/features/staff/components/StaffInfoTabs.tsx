"use client";

import React, { useState } from 'react';
import { useStaffInfo } from '../hooks/useStaffInfo';
import { Search, Users, MapPin, Map, ScrollText, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

export const StaffInfoTabs = () => {
    const { 
        users, isLoadingUsers,
        venues, isLoadingVenues,
        bookings, isLoadingBookings 
    } = useStaffInfo();

    const [activeTab, setActiveTab] = useState<'USERS' | 'VENUES' | 'BOOKINGS'>('USERS');
    const [searchTerm, setSearchTerm] = useState('');

    const isLoading = isLoadingUsers || isLoadingVenues || isLoadingBookings;

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-emerald-500 border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang kéo danh bạ tổng...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Horizontal Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex w-full md:w-[600px]">
                    <button 
                        onClick={() => setActiveTab('USERS')} 
                        className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold transition-all border-r border-slate-200 
                            ${activeTab === 'USERS' ? 'text-emerald-600 bg-emerald-50/50 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Users className="w-4 h-4" /> Danh Bạ Người Dùng
                    </button>
                    <button 
                        onClick={() => setActiveTab('VENUES')} 
                        className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold transition-all border-r border-slate-200 
                            ${activeTab === 'VENUES' ? 'text-blue-600 bg-blue-50/50 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Map className="w-4 h-4" /> Danh Bạ Điểm Sân
                    </button>
                    <button 
                        onClick={() => setActiveTab('BOOKINGS')} 
                        className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold transition-all
                            ${activeTab === 'BOOKINGS' ? 'text-violet-600 bg-violet-50/50 border-b-2 border-b-violet-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <ScrollText className="w-4 h-4" /> Tra Cứu Booking
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder={activeTab === 'USERS' ? "Tìm theo tên user, SĐT..." : activeTab === 'VENUES' ? "Tìm kiếm Sân bóng..." : "Tra cứu mã Booking..."}
                        className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-500 shadow-sm font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* TAB: USERS */}
            {activeTab === 'USERS' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-[10px] text-slate-500 font-bold uppercase tracking-widest border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Mã Tài Khoản</th>
                                    <th className="px-6 py-4">Họ và Tên</th>
                                    <th className="px-6 py-4">Thông Tin Liên Hệ</th>
                                    <th className="px-6 py-4">Phân Quyền (Role)</th>
                                    <th className="px-6 py-4">Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.filter(u => u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || u.phone?.includes(searchTerm)).map(user => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-mono font-semibold text-slate-600">{user.id}</td>
                                        <td className="px-6 py-4 font-bold text-slate-900">{user.full_name}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-700">{user.phone || 'Chưa cập nhật SĐT'}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                                {user.role_name.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border
                                                ${user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                  user.status === 'BANNED' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                                  'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB: VENUES */}
            {activeTab === 'VENUES' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {venues.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase())).map(venue => (
                        <div key={venue.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-300 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">{venue.name}</h3>
                                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">ID: {venue.id}</span>
                                </div>
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border shrink-0
                                    ${venue.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                      venue.status === 'REJECTED' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                      'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                    {venue.status}
                                </span>
                            </div>
                            
                            <div className="space-y-3 mb-4">
                                <div className="flex gap-2 items-start text-sm text-slate-600 font-medium">
                                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                    <span>{venue.address}, {venue.district}, {venue.city}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-3">
                                    <span className="text-slate-500">Mặt Sân Kích Hoạt:</span>
                                    <span className="font-bold text-blue-600 bg-blue-50 px-2 rounded border border-blue-100">{venue.active_courts_count}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Hotline:</span>
                                    <span className="font-bold text-slate-800 font-mono">{venue.phone_number}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB: BOOKINGS */}
            {activeTab === 'BOOKINGS' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-slate-50 text-[10px] text-slate-500 font-bold uppercase tracking-widest border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Mã Hóa Đơn (Booking)</th>
                                    <th className="px-6 py-4">Thời Gian Tạo</th>
                                    <th className="px-6 py-4">Điểm Chơi (Venue)</th>
                                    <th className="px-6 py-4">Khách Hàng</th>
                                    <th className="px-6 py-4 text-right">Tổng Tiền (VNĐ)</th>
                                    <th className="px-6 py-4 text-center">Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {bookings.filter(b => b.id.toLowerCase().includes(searchTerm.toLowerCase()) || b.customer_phone?.includes(searchTerm)).map(booking => (
                                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-mono font-bold text-violet-600">{booking.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-700 flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-slate-400"/> {format(new Date(booking.created_at), 'dd/MM/yyyy')}</div>
                                            <div className="text-xs text-slate-400 font-medium ml-5">{format(new Date(booking.created_at), 'HH:mm')}</div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-800">{booking.venue_name}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-700">{booking.customer_name}</div>
                                            <div className="text-xs text-slate-500 font-mono">{booking.customer_phone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-black text-slate-900 font-mono">
                                            {booking.total_price.toLocaleString('vi-VN')}đ
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border inline-block
                                                ${booking.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                  booking.status === 'CANCELLED' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                                  booking.status === 'COMPLETED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                  'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
