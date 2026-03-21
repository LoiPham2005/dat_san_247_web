"use client";

import React from 'react';
import { useCustomerBookingDetail } from '../hooks/useCustomerBooking';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { 
    Calendar, Clock, MapPin, ChevronLeft, 
    Printer, Share2, ShieldCheck, CreditCard,
    CheckCircle2, QrCode, Phone, Mail
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export const BookingDetailContent = ({ id }: { id: string }) => {
    const { data: booking, isLoading } = useCustomerBookingDetail(id);
    const router = useRouter();

    if (isLoading) return <div className="text-center py-20 font-bold text-slate-500">Đang tải chi tiết đơn hàng...</div>;
    if (!booking) return <div className="text-center py-20 font-bold text-slate-500">Không tìm thấy thông tin đơn hàng</div>;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-20 print:p-0">
            <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="group -ml-4 text-slate-500 font-bold hover:bg-transparent hover:text-primary print:hidden"
            >
                <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" /> Quay lại danh sách
            </Button>

            <Card className="overflow-hidden border-0 shadow-2xl rounded-[2.5rem] bg-white">
                {/* STATUS BAR */}
                <div className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center print:bg-slate-100 print:text-black">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm font-bold uppercase tracking-widest whitespace-nowrap">Trạng thái: {booking.status}</span>
                    </div>
                    <div className="flex gap-2 print:hidden">
                        <button onClick={handlePrint} className="p-2 hover:bg-white/10 rounded-full transition-colors"><Printer className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Share2 className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="p-8 md:p-12 space-y-12">
                    {/* TOP HEADER */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">{booking.venue_name}</h2>
                            <p className="text-slate-500 font-medium flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> {booking.venue_address}
                            </p>
                        </div>
                        <div className="bg-indigo-50 border-2 border-indigo-100 px-6 py-4 rounded-3xl text-center min-w-[160px]">
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Mã Booking</p>
                            <p className="text-2xl font-black text-indigo-900 font-mono tracking-wider">{booking.booking_code}</p>
                        </div>
                    </div>

                    {/* MAIN INFO GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                            <Calendar className="w-6 h-6 text-primary mb-3" />
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ngày đá</p>
                            <p className="font-bold text-slate-800 text-lg">
                                {format(new Date(booking.booking_date), 'dd/MM/yyyy', { locale: vi })}
                            </p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                            <Clock className="w-6 h-6 text-primary mb-3" />
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cố định khung giờ</p>
                            <p className="font-bold text-slate-800 text-lg">{booking.start_time} - {booking.end_time}</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                            <QrCode className="w-6 h-6 text-primary mb-3" />
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tên sân</p>
                            <p className="font-bold text-slate-800 text-lg">{booking.court_name}</p>
                        </div>
                    </div>

                    {/* CHECK-IN SECTION */}
                    {booking.check_in_code && booking.status !== 'CANCELLED' && (
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-[2.5rem] p-10 text-center relative overflow-hidden shadow-xl shadow-indigo-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                            
                            <p className="text-indigo-200 font-black uppercase tracking-[0.3em] text-xs mb-4">Mã Check-in Bắt Buộc</p>
                            <div className="text-6xl md:text-7xl font-black font-mono tracking-[0.2em] mb-4">
                                {booking.check_in_code}
                            </div>
                            <p className="text-indigo-100 text-sm font-medium opacity-80 max-w-sm mx-auto">
                                Xuất trình mã này cho nhân viên sân để xác nhận vào sân. Vui lòng đến sớm 10 phút nhé!
                            </p>
                        </div>
                    )}

                    {/* ITEMS & FINANCIALS */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">Chi tiết thanh toán</h3>
                            <CreditCard className="w-5 h-5 text-slate-400" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center group">
                                <div className="space-y-0.5">
                                    <p className="font-bold text-slate-800 group-hover:text-primary transition-colors">Tiền thuê sân</p>
                                    <p className="text-xs text-slate-500 font-medium">1.5 Giờ • {booking.court_name}</p>
                                </div>
                                <span className="font-black text-slate-900">{booking.sub_total.toLocaleString()}đ</span>
                            </div>

                            {booking.addons.map(addon => (
                                <div key={addon.id} className="flex justify-between items-center group">
                                    <div className="space-y-0.5">
                                        <p className="font-bold text-slate-800">{addon.service_name}</p>
                                        <p className="text-xs text-slate-500 font-medium">Số lượng: {addon.quantity}</p>
                                    </div>
                                    <span className="font-black text-slate-900">{addon.total_price.toLocaleString()}đ</span>
                                </div>
                            ))}

                            <div className="pt-6 border-t border-slate-100 space-y-3">
                                <div className="flex justify-between text-sm font-medium text-slate-500">
                                    <span>Tạm tính</span>
                                    <span>{booking.sub_total.toLocaleString()}đ</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-slate-500">
                                    <span>Đã thanh toán (Cọc / Wallet)</span>
                                    <span className="text-emerald-500 font-bold">-{booking.deposit_amount.toLocaleString()}đ</span>
                                </div>
                                <div className="flex justify-between items-end pt-4">
                                    <div className="space-y-1">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">Số tiền cần thanh toán</span>
                                        <span className="text-3xl font-black text-slate-900">{(booking.total_amount - booking.deposit_amount).toLocaleString()}đ</span>
                                    </div>
                                    <div className="bg-amber-100 text-amber-700 font-black text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 border border-amber-200">
                                        {booking.payment_status === 'PAID' ? 'ĐÃ HOÀN TẤT' : 'CHƯA THANH TOÁN XONG'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER CONTACT */}
                    <div className="bg-slate-50 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hỗ trợ khẩn cấp</p>
                                <p className="font-bold text-slate-800">1900 6789 (24/7)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email điều phối</p>
                                <p className="font-bold text-slate-800">care@datsan247.vn</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* BOTTOM BRANDING */}
                <div className="bg-slate-50/50 border-t border-slate-100 py-6 text-center">
                    <p className="text-slate-400 text-[10px] font-medium tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                        ĐƯỢC CUNG CẤP BỞI <span className="text-primary font-black text-xs">DATSAN247</span> • {format(new Date(), 'yyyy')}
                    </p>
                </div>
            </Card>

            <div className="text-center print:hidden">
                 <p className="text-slate-400 text-xs font-medium px-10">
                    Bản điện tử này có giá trị xác nhận booking thay thế biên lai truyền thống. Nếu bạn cần hóa đơn đỏ (VAT), vui lòng liên hệ trực tiếp chủ sân sau khi kết thúc ca đá.
                 </p>
            </div>
        </div>
    );
};
