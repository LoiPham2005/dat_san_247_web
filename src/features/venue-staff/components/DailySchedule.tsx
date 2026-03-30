"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { DatePicker } from '@/components/common/DatePicker';
import { useVenueSchedule } from '../hooks/useVenueSchedule';
import { BookingStatus } from '@/features/owner/api/owner-booking.api';
import { 
    Calendar as LucideCalendar, 
    Search as LucideSearch, 
    User as LucideUser, 
    Phone as LucidePhone, 
    MapPin as LucideMapPin, 
    Clock as LucideClock, 
    CheckCircle2 as LucideCheckCircle2, 
    QrCode as LucideQrCode, 
    Bell as LucideBell 
} from 'lucide-react';
import { toast } from 'sonner';
import { Pagination } from '@/components/common/Pagination';
import { VenueStaffBooking } from '../api/venue-staff-booking.api';
import { format, isSameDay } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils/cn';
import { QRScannerDialog } from './QRScannerDialog';

export const DailySchedule = ({ venueId }: { venueId: string }) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
    
    const dateStr = currentDate.toISOString().split('T')[0];

    const { bookings, meta, isLoading, updateStatus } = useVenueSchedule({
        venue_id: venueId,
        page,
        limit,
        search: searchTerm || undefined,
        date: dateStr
    });
    
    // Auto update current time
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const handleCheckIn = (id: string) => {
        updateStatus({ id, status: 'CHECKED_IN' });
    };

    const handleCheckout = (id: string) => {
        updateStatus({ id, status: 'COMPLETED' });
    };

    const handlePageChange = (p: number) => {
        setPage(p);
    };

    const handleLimitChange = (l: number) => {
        setLimit(l);
        setPage(1);
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
                            <span>Có <strong className="text-indigo-600">{meta?.total || 0}</strong> ca đặt sân</span>
                            <span>Đang ở trang <strong className="text-blue-600">{page}/{meta?.totalPages || 1}</strong></span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-64">
                        <LucideSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="Tìm SĐT, Tên KH, Mã..." 
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1);
                            }}
                            className="bg-slate-50 border-slate-200 pl-9 h-10 w-full"
                        />
                    </div>
                    <Button 
                        variant="outline" 
                        onClick={() => setIsQRScannerOpen(true)}
                        className="h-10 px-3 border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 font-bold"
                    >
                        <LucideQrCode className="w-4 h-4 mr-2" /> Quét Mã
                    </Button>
                </div>
            </div>

            <QRScannerDialog 
                isOpen={isQRScannerOpen}
                onClose={() => setIsQRScannerOpen(false)}
                onScanSuccess={(decodedText) => {
                    setIsQRScannerOpen(false);
                    // Search and check-in
                    const foundBooking = bookings.find(b => b.booking_code === decodedText || b.id === decodedText);
                    if (foundBooking) {
                        if (foundBooking.status === 'CONFIRMED') {
                            handleCheckIn(foundBooking.id);
                            toast.success(`Check-in thành công: ${foundBooking.customer_name}`);
                        } else {
                            toast.info(`Lịch đặt đang ở trạng thái: ${foundBooking.status}`);
                        }
                    } else {
                        // If not in current list, just fill search term for user to find manually
                        setSearchTerm(decodedText);
                        toast.info(`Tìm kiếm: ${decodedText}`);
                    }
                }}
            />

            {/* DANH SÁCH LỊCH TRÌNH */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="font-extrabold text-slate-800 flex items-center gap-2.5">
                        <LucideCalendar className="w-5 h-5 text-indigo-600" /> 
                        LịCH TRÌNH 
                        <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg text-xs font-black uppercase">
                            {format(currentDate, 'iiii, dd/MM', { locale: vi })}
                        </span>
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2">
                        <DatePicker 
                            date={currentDate} 
                            onChange={(d) => {
                                setCurrentDate(d);
                                setPage(1);
                            }}
                        />
                        <div className="h-4 w-px bg-slate-200 mx-1 hidden md:block"></div>
                        <Button variant="outline" size="sm" className="h-9 px-4 text-xs font-bold border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50" onClick={() => {
                            setCurrentDate(new Date(currentDate.getTime() - 86400000));
                            setPage(1);
                        }}>Ngày trước</Button>
                        <Button variant="outline" size="sm" className={cn(
                            "h-9 px-4 text-xs font-black transition-all",
                            isSameDay(currentDate, new Date()) 
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" 
                                : "text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100"
                        )} onClick={() => {
                            setCurrentDate(new Date());
                            setPage(1);
                        }}>Hôm nay</Button>
                        <Button variant="outline" size="sm" className="h-9 px-4 text-xs font-bold border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50" onClick={() => {
                            setCurrentDate(new Date(currentDate.getTime() + 86400000));
                            setPage(1);
                        }}>Ngày mai</Button>
                    </div>
                </div>
                
                {isLoading ? (
                    <div className="p-16 text-center text-slate-500 font-medium tracking-wide">
                         <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2 mx-auto mb-4"></div>
                         Đang tải lịch trình...
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="p-16 text-center bg-slate-50/50">
                        <LucideClock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 font-bold mb-1 text-lg">Hôm nay chưa có lịch đặt sân</p>
                        <p className="text-slate-400 text-sm">Khi có khách đặt, thông tin sẽ xuất hiện tại đây.</p>
                    </div>
                ) : (
                    <>
                    <div className="divide-y divide-slate-100">
                        {bookings.map((booking: VenueStaffBooking) => {
                            const isPast = booking.status === 'COMPLETED' || booking.status === 'CANCELLED';
                            
                            return (
                                <div key={booking.id} className={`p-4 flex flex-col md:flex-row gap-4 hover:bg-slate-50 transition-colors ${isPast ? 'opacity-70' : ''}`}>
                                    {/* THỜI GIAN & SÂN */}
                                    <div className="md:w-48 shrink-0 flex flex-col md:border-r border-slate-100 pr-4 relative">
                                        <div className="flex items-center gap-2 font-black text-slate-900 text-lg tracking-tight">
                                            {booking.start_time} - {booking.end_time}
                                            {booking.status === 'CHECKED_IN' && <span className="absolute -left-4 top-2 bottom-2 w-1.5 bg-emerald-500 rounded-r-md"></span>}
                                        </div>
                                        <div className="text-sm font-bold text-indigo-600 mt-1 flex items-center gap-1.5">
                                            <LucideMapPin className="w-3.5 h-3.5" /> {booking.court_name}
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
                                                <LucidePhone className="w-4 h-4 text-slate-400" /> {booking.customer_phone}
                                            </div>
                                            <div className="text-sm font-semibold text-slate-600">
                                                 Thanh toán: <span className={booking.payment_status === 'PAID' ? 'text-emerald-600' : 'text-amber-600'}>
                                                    {booking.payment_status === 'PAID' ? 'Đã trả' : 'Tại sân'}
                                                 </span>
                                            </div>
                                        </div>

                                        {/* GHI CHÚ */}
                                        <div className="text-xs bg-indigo-50 text-indigo-800 p-2 rounded-lg border border-indigo-100 font-medium inline-block">
                                            Tổng tiền: <span className="font-bold">{(booking.total_amount || 0).toLocaleString()}đ</span>
                                        </div>
                                    </div>

                                    {/* HÀNH ĐỘNG (LỄ TÂN) */}
                                    <div className="md:w-48 shrink-0 flex flex-col justify-center items-end gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                                        {booking.status === 'CONFIRMED' && (
                                            <Button 
                                                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold h-10 shadow-md shadow-emerald-600/20"
                                                onClick={() => handleCheckIn(booking.id)}
                                            >
                                                <LucideCheckCircle2 className="w-4 h-4 mr-2" /> Nhận Sân
                                            </Button>
                                        )}
                                        {booking.status === 'CHECKED_IN' && (
                                            <Button 
                                                className="w-full bg-slate-800 hover:bg-slate-900 font-bold h-10"
                                                onClick={() => handleCheckout(booking.id)}
                                            >
                                                Trả Sân & Thanh Toán
                                            </Button>
                                        )}
                                        {booking.status === 'COMPLETED' && (
                                            <div className="w-full flex justify-end text-xs font-bold text-emerald-600 items-center gap-1">
                                                <LucideCheckCircle2 className="w-4 h-4 inline" /> Hoàn Thành
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {meta && (
                        <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                            <Pagination
                                currentPage={page}
                                totalPages={meta.totalPages}
                                onPageChange={handlePageChange}
                                limit={limit}
                                onLimitChange={handleLimitChange}
                                totalItems={meta.total}
                            />
                        </div>
                    )}
                    </>
                )}
            </div>
            
            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100 text-sm flex gap-3">
                <div className="shrink-0 mt-0.5"><LucideBell className="w-5 h-5 text-blue-600" /></div>
                <div>
                    <strong>Lưu ý dành cho Lễ Tân (Receptionist):</strong><br/>
                    Thực hiện <strong>Nhận Sân</strong> ngay khi khách đến để hệ thống ghi nhận thời gian phục vụ chính xác nhất.
                </div>
            </div>
        </div>
    );
};
