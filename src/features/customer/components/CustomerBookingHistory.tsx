"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { useCustomerBookings, useCancelBooking, useCustomerWaitlists, useCustomerRecurringBookings } from '../hooks/useCustomerBooking';
import { CustomerBooking, BookingStatus } from '../api/customer-booking.api';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Calendar, Clock, MapPin, Search, Filter, History, QrCode, ShieldAlert, XCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ReviewDialog } from './ReviewDialog';

export const CustomerBookingHistory = () => {
    const { data: bookings, isLoading } = useCustomerBookings();
    const { waitlists, cancelWaitlist } = useCustomerWaitlists();
    const { data: recurring } = useCustomerRecurringBookings();
    const { mutate: cancelBooking, isPending: isCanceling } = useCancelBooking();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<'UPCOMING' | 'HISTORY' | 'WAITLIST' | 'RECURRING'>('UPCOMING');
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmId, setConfirmId] = useState<string | null>(null);
    
    // Review Dialog states
    const [reviewOpen, setReviewOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<CustomerBooking | null>(null);

    if (isLoading) return <div className="text-center py-20 font-bold text-slate-500 text-lg animate-pulse">Đang tải lịch đặt sân...</div>;

    const safeBookings = bookings || [];
    const upcomingBookings = safeBookings.filter(b => ['PENDING', 'CONFIRMED', 'CHECKED_IN'].includes(b.status));
    const historyBookings = safeBookings.filter(b => ['COMPLETED', 'CANCELLED', 'NO_SHOW'].includes(b.status));

    const renderEmptyState = (icon: any, title: string, desc: string) => (
        <div className="bg-white border border-slate-200 border-dashed rounded-3xl p-12 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-1">{title}</h3>
            <p className="text-sm font-medium text-slate-500 mb-6 max-w-sm mx-auto">{desc}</p>
            <Button className="bg-primary hover:bg-primary/90 font-bold rounded-xl h-11 px-8">Đặt Sân Mới Ngay</Button>
        </div>
    );

    const getStatusStyles = (status: BookingStatus) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'CHECKED_IN': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'COMPLETED': return 'bg-slate-100 text-slate-700 border-slate-200';
            case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'CANCELLED': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getStatusLabelText = (status: BookingStatus) => {
        switch (status) {
            case 'CONFIRMED': return 'Đã xác nhận (Chờ đá)';
            case 'CHECKED_IN': return 'Đang sử dụng sân';
            case 'COMPLETED': return 'Đã hoàn thành';
            case 'PENDING': return 'Chờ chủ sân duyệt';
            case 'CANCELLED': return 'Đã hủy';
            default: return status;
        }
    };

    const handleCancel = (id: string) => {
        setConfirmId(id);
    };

    const onConfirmCancel = () => {
        if (confirmId) {
            cancelBooking(
                { id: confirmId, reason: 'Khách hàng tự hủy qua App' },
                {
                    onSuccess: () => setConfirmId(null),
                    onError: () => setConfirmId(null)
                }
            );
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 fade-in">
            {/* TABS CONTAINER */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex overflow-x-auto scrollbar-hide text-sm font-bold gap-2">
                <button 
                    onClick={() => setActiveTab('UPCOMING')} 
                    className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-center transition-all ${activeTab === 'UPCOMING' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    Sắp diễn ra ({upcomingBookings.length})
                </button>
                <button 
                    onClick={() => setActiveTab('HISTORY')} 
                    className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-center transition-all ${activeTab === 'HISTORY' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    Lịch sử ({historyBookings.length})
                </button>
                <button 
                    onClick={() => setActiveTab('WAITLIST')} 
                    className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-center transition-all ${activeTab === 'WAITLIST' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    Đang đợi ({waitlists.length})
                </button>
                <button 
                    onClick={() => setActiveTab('RECURRING')} 
                    className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-center transition-all ${activeTab === 'RECURRING' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    Cố định ({(recurring || []).length})
                </button>
            </div>

            {/* UPCOMING & HISTORY SECTION */}
            {(activeTab === 'UPCOMING' || activeTab === 'HISTORY') && (
                <div className="space-y-6">
                    {activeTab === 'UPCOMING' && upcomingBookings.length === 0 && renderEmptyState(<Calendar className="w-10 h-10 text-slate-300" />, "Bạn chưa có lịch đặt nào sắp tới", "Hãy tìm cho mình một sân thể thao và rủ bạn bè ngay thôi!")}
                    {activeTab === 'HISTORY' && historyBookings.length === 0 && renderEmptyState(<History className="w-10 h-10 text-slate-300" />, "Chưa có lịch sử đặt sân", "Bạn chưa hoàn thành chuyến đi nào với chúng tôi.")}
                    
                    {(activeTab === 'UPCOMING' ? upcomingBookings : historyBookings).map(booking => (
                        <div key={booking.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:border-primary/30 transition-colors group">
                            {/* HEADER CODE & STATUS */}
                            <div className="bg-slate-50 border-b border-slate-100 px-5 flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
                                <div className="flex gap-4 items-center">
                                    <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Mã Booking:</span>
                                    <span className="text-sm font-black text-indigo-900 bg-indigo-100 px-3 py-1 rounded-md">{booking.booking_code}</span>
                                </div>
                                <div className={`text-xs font-bold px-3 py-1 rounded-full uppercase border flex items-center gap-1.5 w-max ${getStatusStyles(booking.status)}`}>
                                    {booking.status === 'COMPLETED' ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                                    {getStatusLabelText(booking.status)}
                                </div>
                            </div>
                            
                            <div className="p-5 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
                                {/* THỜI GIAN VÀ ĐỊA ĐIỂM */}
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center text-indigo-700 shrink-0 border border-indigo-100">
                                            <span className="text-[10px] font-bold uppercase">{new Date(booking.booking_date).toLocaleDateString('vi-VN', { month: 'short' })}</span>
                                            <span className="text-lg font-black leading-none mt-0.5">{new Date(booking.booking_date).getDate()}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 leading-tight mb-1 group-hover:text-primary transition-colors">
                                                {booking.venue_name}
                                            </h3>
                                            <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mb-2">
                                                <MapPin className="w-4 h-4 text-slate-400" /> {booking.venue_address}
                                            </p>
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold">
                                                <Clock className="w-4 h-4 text-slate-400" /> {booking.start_time} - {booking.end_time}
                                                <span className="w-1 h-1 rounded-full bg-slate-300 mx-1"></span>
                                                <span className="text-primary">{booking.court_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* DỊCH VỤ BÁN KÈM (ADD-ONS) NẾU CÓ */}
                                    {booking.addons && booking.addons.length > 0 && (
                                        <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4">
                                            <h4 className="text-xs font-bold text-orange-800 uppercase tracking-widest mb-2 border-b border-orange-100 pb-2">Dịch Vụ Mua Thêm</h4>
                                            <ul className="space-y-1.5">
                                                {booking.addons.map(a => (
                                                    <li key={a.id} className="flex justify-between text-sm font-medium text-orange-900">
                                                        <span>{a.quantity}x {a.service_name}</span>
                                                        <span className="font-bold">{a.total_price.toLocaleString()}đ</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    {/* Ghi chú khi bị hủy */}
                                    {booking.status === 'CANCELLED' && booking.cancellation_reason && (
                                        <div className="bg-rose-50 text-rose-700 text-xs font-bold p-3 rounded-xl border border-rose-100 flex gap-2">
                                            <ShieldAlert className="w-4 h-4 shrink-0" />
                                            <span>Lý do hủy: {booking.cancellation_reason}</span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* TỔNG TIỀN VÀ HÀNH ĐỘNG */}
                                <div className="w-full lg:w-72 shrink-0 flex flex-col space-y-4">
                                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 relative overflow-hidden">
                                        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                                            <span>Tạm tính</span>
                                            <span>{booking.sub_total.toLocaleString()}đ</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-medium text-slate-500 mb-4 pb-4 border-b border-slate-200 border-dashed">
                                            <span>Đã thanh toán (Cọc)</span>
                                            <span className="text-emerald-600 font-bold">{booking.deposit_amount.toLocaleString()}đ</span>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-bold text-slate-700 uppercase">Tổng cộng</span>
                                            <span className="text-2xl font-black text-slate-900">{booking.total_amount.toLocaleString()}đ</span>
                                        </div>
                                        
                                        {/* Hiển thị check_in_code cực to nếu đang đợi đá */}
                                        {(booking.status === 'CONFIRMED' || booking.status === 'PENDING') && booking.check_in_code && (
                                            <div className="mt-5 pt-5 border-t border-slate-200">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-2">Mã Vào Sân (Check-in)</p>
                                                <div className="bg-white border-2 border-indigo-100 text-indigo-600 font-black text-2xl tracking-[0.2em] text-center p-3 rounded-xl shadow-inner">
                                                    {booking.check_in_code}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* ACTION BUTTONS */}
                                    <div className="space-y-2">
                                        {['PENDING', 'CONFIRMED'].includes(booking.status) && (
                                            <Button 
                                                variant="outline" 
                                                onClick={() => handleCancel(booking.id)}
                                                disabled={isCanceling}
                                                className="w-full h-11 border-rose-200 text-rose-600 hover:bg-rose-50 font-bold justify-center"
                                            >
                                                Hủy Đặt Sân
                                            </Button>
                                        )}
                                        {booking.status === 'COMPLETED' && (
                                            <Button 
                                                onClick={() => {
                                                    setSelectedBooking(booking);
                                                    setReviewOpen(true);
                                                }}
                                                className="w-full h-11 bg-slate-900 hover:bg-slate-800 font-bold justify-center"
                                            >
                                                Đánh Giá Nhận Ưu Đãi
                                            </Button>
                                        )}
                                        <Button 
                                            variant="ghost" 
                                            onClick={() => router.push(`/bookings/${booking.id}`)}
                                            className="w-full h-11 text-slate-500 hover:bg-slate-100 font-bold justify-center text-xs uppercase tracking-wider"
                                        >
                                            Xem Chi Tiết & Biên Lai <ChevronRight className="w-4 h-4 inline ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* WAITLIST SECTION */}
            {activeTab === 'WAITLIST' && (
                <div className="space-y-4">
                    {waitlists.length === 0 && renderEmptyState(<Clock className="w-10 h-10 text-slate-300" />, "Bạn không ở trong danh sách chờ nào", "Khi một sân đã kín lịch, bạn có thể tham gia danh sách chờ để nhận thông báo nếu có người hủy.")}
                    
                    {waitlists.map(w => (
                        <div key={w.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg">{w.venue_name}</h4>
                                <p className="text-sm text-slate-500 font-medium mb-2">{w.court_name} • Mức ưu tiên: #{w.priority}</p>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md text-xs font-bold border border-amber-100">
                                    <Clock className="w-3.5 h-3.5" /> Ghi nhận Waitlist cho {w.booking_date} ({w.start_time}-{w.end_time})
                                </div>
                            </div>
                            <Button variant="outline" onClick={() => cancelWaitlist(w.id)} size="sm" className="h-10 text-rose-600 font-bold hover:bg-rose-50 border-rose-200">Rời khỏi danh sách chờ</Button>
                        </div>
                    ))}
                </div>
            )}

            {/* RECURRING SECTION */}
            {activeTab === 'RECURRING' && (
                <div className="space-y-4">
                    {(!recurring || recurring.length === 0) && renderEmptyState(<Calendar className="w-10 h-10 text-slate-300" />, "Bạn không có lịch đặt sân cố định nào", "Tính năng này giúp bạn giữ chỗ định kỳ hàng tuần một cách ổn định.")}
                    
                    {recurring?.map(r => (
                        <div key={r.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="font-bold text-slate-800 text-lg">{r.venue_name}</h4>
                                    <Badge variant={r.is_active ? "success" : "secondary"} className="text-[10px] h-5 px-1.5 font-bold">{r.is_active ? 'ĐANG HOẠT ĐỘNG' : 'TẠM DỪNG'}</Badge>
                                </div>
                                <p className="text-sm text-slate-500 font-medium mb-3">{r.court_name} • {r.repeat_type === 'WEEKLY' ? 'Lặp hàng tuần' : r.repeat_type}</p>
                                
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                        <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md"><Calendar className="w-3.5 h-3.5" /></div>
                                        <span>Ngày lặp: {r.days.map(d => d.substring(0, 3)).join(', ')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md"><Clock className="w-3.5 h-3.5" /></div>
                                        <span>Khung giờ: {r.start_time} - {r.end_time}</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" className="h-11 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 px-6">Xem Chi Tiết Lịch</Button>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmDialog 
                isOpen={!!confirmId}
                onClose={() => setConfirmId(null)}
                onConfirm={onConfirmCancel}
                title="Xác nhận hủy đặt sân"
                description="Bạn chắc chắn muốn hủy đặt sân này? Theo chính sách, bạn có thể mất tiền đặt cọc nếu hủy sát giờ thi đấu."
                type="danger"
                confirmText="Đồng ý hủy"
                cancelText="Quay lại"
                loading={isCanceling}
            />

            {selectedBooking && (
                <ReviewDialog 
                    isOpen={reviewOpen}
                    onClose={() => {
                        setReviewOpen(false);
                        setSelectedBooking(null);
                    }}
                    bookingId={selectedBooking.id}
                    venueName={selectedBooking.venue_name}
                />
            )}
        </div>
    );
};

function Badge({ children, variant, className }: any) {
    const variants = {
        success: "bg-emerald-100 text-emerald-700 border-emerald-200",
        secondary: "bg-slate-100 text-slate-700 border-slate-200"
    };
    return (
        <span className={cn("px-2 py-0.5 rounded border uppercase tracking-wider", variants[variant as keyof typeof variants] || variants.secondary, className)}>
            {children}
        </span>
    );
}

