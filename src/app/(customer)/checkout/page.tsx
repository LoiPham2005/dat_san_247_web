"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';
import { ChevronLeft, MapPin, CalendarDays, Clock, ShieldCheck, Ticket, CreditCard, Wallet, Banknote, Zap, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // In a real app we would fetch the current cart or booking session from Context/Zustand
    const [bookingDetails] = useState({
        venueName: 'Sân Cầu Lông Thống Nhất',
        location: '138 Đào Duy Anh, Phường 9, Phú Nhuận',
        courtName: 'Sân A - Thảm BWF',
        date: new Date(Date.now() + 86400000), // Tomorrow
        timeSlots: ['17:30 - 19:00', '19:00 - 20:30'],
        pricePerHour: 150000,
        totalHours: 3,
        subtotal: 450000,
    });

    const [paymentMethod, setPaymentMethod] = useState<'WALLET' | 'VNPAY' | 'MOMO' | 'ZALOPAY' | 'PAY_AT_VENUE'>('VNPAY');
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherStatus, setVoucherStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [discount, setDiscount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const totalAmount = bookingDetails.subtotal - discount;

    const handleApplyVoucher = () => {
        if (!voucherCode) return;
        
        // Mock API call to apply voucher
        if (voucherCode.toUpperCase() === 'WELCOME100K') {
            setDiscount(100000);
            setVoucherStatus('success');
        } else if (voucherCode.toUpperCase() === 'DATSAN247') {
            setDiscount(50000);
            setVoucherStatus('success');
        } else {
            setDiscount(0);
            setVoucherStatus('error');
        }
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        // Giả lập call API thanh toán mất 1.5s
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Chuyển về trang Booking Success
        router.push('/checkout/success');
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-8 animate-in fade-in">
            <div className="container max-w-6xl mx-auto px-4">
                
                {/* Header Actions */}
                <div className="flex items-center gap-4 mb-8">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full w-10 h-10 hover:bg-slate-200" 
                        onClick={() => router.back()}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Thanh Toán Đơn Đặt Sân</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Column: Order details & Payment Methods */}
                    <div className="flex-1 space-y-6">
                        
                        {/* Session Details Card */}
                        <Card className="rounded-[2rem] border-0 shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b border-slate-100 p-6 flex flex-row items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-primary rounded-2xl flex items-center justify-center text-white shadow-inner">
                                    <MapPin className="w-8 h-8 opacity-80" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl md:text-2xl font-bold text-slate-900 mb-1">{bookingDetails.venueName}</CardTitle>
                                    <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {bookingDetails.location}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 bg-slate-50/50 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-start gap-4 shadow-sm">
                                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0"><CalendarDays className="w-5 h-5" /></div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ngày thi đấu</div>
                                            <div className="font-bold text-slate-800 text-lg">{format(bookingDetails.date, 'EEEE, dd/MM/yyyy', { locale: vi })}</div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-start gap-4 shadow-sm">
                                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><Clock className="w-5 h-5" /></div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ca đá (Khung giờ)</div>
                                            <div className="font-bold text-slate-800 flex flex-col">
                                                {bookingDetails.timeSlots.map(t => <span key={t}>{t}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                        <span className="font-bold text-slate-700">{bookingDetails.courtName}</span>
                                    </div>
                                    <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 px-3 py-1 font-mono">{bookingDetails.totalHours} Giờ chơi</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Method Card */}
                        <Card className="rounded-[2rem] border-0 shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b border-slate-100 p-6">
                                <CardTitle className="text-xl font-bold flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary" /> Phương thức thanh toán
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 bg-white space-y-4">
                                
                                <label className={cn(
                                    "flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all",
                                    paymentMethod === 'VNPAY' ? "border-primary bg-primary/5" : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                                )}>
                                    <input type="radio" className="sr-only" checked={paymentMethod === 'VNPAY'} onChange={() => setPaymentMethod('VNPAY')} />
                                    <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center p-2 shadow-sm shrink-0">
                                        <img src="https://vnpay.vn/s1/itrqf_j0nseufm/2020/09/index-logo.png" alt="VNPay" className="object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800">Cổng thanh toán VNPAY</p>
                                        <p className="text-xs font-medium text-slate-500 mt-0.5">Thanh toán qua thẻ ATM / Internet Banking</p>
                                    </div>
                                    <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors", paymentMethod === 'VNPAY' ? "border-primary" : "border-slate-300")}>
                                        {paymentMethod === 'VNPAY' && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                                    </div>
                                </label>

                                <label className={cn(
                                    "flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all",
                                    paymentMethod === 'MOMO' ? "border-[#A50064] bg-[#A50064]/5" : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                                )}>
                                    <input type="radio" className="sr-only" checked={paymentMethod === 'MOMO'} onChange={() => setPaymentMethod('MOMO')} />
                                    <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center p-2 shadow-sm shrink-0">
                                        <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="MoMo" className="object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800">Ví điện tử MoMo</p>
                                    </div>
                                    <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors", paymentMethod === 'MOMO' ? "border-[#A50064]" : "border-slate-300")}>
                                        {paymentMethod === 'MOMO' && <div className="w-3 h-3 bg-[#A50064] rounded-full"></div>}
                                    </div>
                                </label>

                                <label className={cn(
                                    "flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all",
                                    paymentMethod === 'ZALOPAY' ? "border-blue-500 bg-blue-500/5" : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                                )}>
                                    <input type="radio" className="sr-only" checked={paymentMethod === 'ZALOPAY'} onChange={() => setPaymentMethod('ZALOPAY')} />
                                    <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center p-2 shadow-sm shrink-0">
                                        <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png" alt="ZaloPay" className="object-contain rounded-lg" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800">Ví ZaloPay</p>
                                    </div>
                                    <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors", paymentMethod === 'ZALOPAY' ? "border-blue-500" : "border-slate-300")}>
                                        {paymentMethod === 'ZALOPAY' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                                    </div>
                                </label>

                                <label className={cn(
                                    "flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all opacity-60",
                                    paymentMethod === 'PAY_AT_VENUE' ? "border-emerald-500 bg-emerald-500/5" : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                                )}>
                                    <input type="radio" className="sr-only" checked={paymentMethod === 'PAY_AT_VENUE'} onChange={() => setPaymentMethod('PAY_AT_VENUE')} disabled={true} />
                                    <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center shadow-sm text-slate-400 shrink-0">
                                        <Banknote className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800">Thanh toán tại sân (Tiền mặt)</p>
                                        <p className="text-xs font-semibold text-rose-500 mt-0.5">Sân này không hỗ trợ thanh toán sau</p>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-2 border-slate-200 bg-slate-100 cursor-not-allowed"></div>
                                </label>

                            </CardContent>
                        </Card>

                    </div>

                    {/* Right Column: Order Summary & Checkout Action */}
                    <div className="w-full lg:w-[420px] shrink-0">
                        <Card className="sticky top-24 rounded-[2rem] border-0 shadow-xl overflow-hidden bg-white">
                            
                            {/* Vouchers Section */}
                            <CardHeader className="bg-transparent border-b border-slate-100 p-6 pt-8 pb-5">
                                <CardTitle className="text-sm font-bold flex items-center gap-2 mb-3 tracking-widest uppercase text-slate-400">
                                    <Ticket className="w-4 h-4 text-slate-500" /> Nhập Voucher / Khuyến mãi
                                </CardTitle>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Input 
                                            placeholder="Mã DATSAN247" 
                                            className="h-12 border-slate-200 font-mono uppercase font-bold focus:border-primary pr-10" 
                                            value={voucherCode}
                                            onChange={(e) => {
                                                setVoucherCode(e.target.value.toUpperCase());
                                                setVoucherStatus('idle');
                                            }}
                                        />
                                        {voucherStatus === 'success' && <CheckCircle2 className="absolute right-3 top-3.5 w-5 h-5 text-emerald-500 animate-in zoom-in" />}
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        className={cn("h-12 px-6 font-bold shrink-0", voucherCode && "border-primary text-primary hover:bg-primary/5")}
                                        onClick={handleApplyVoucher}
                                        disabled={!voucherCode}
                                    >
                                        Áp Dụng
                                    </Button>
                                </div>
                                {voucherStatus === 'error' && (
                                    <p className="text-xs text-rose-500 font-semibold mt-2 animate-in slide-in-from-top-1">Mã không hợp lệ hoặc đã hết hạn sử dụng.</p>
                                )}
                                {voucherStatus === 'success' && (
                                    <p className="text-xs text-emerald-600 font-semibold mt-2 animate-in slide-in-from-top-1">Tuyệt vời! Bạn đã được giảm {discount.toLocaleString('vi-VN')}đ.</p>
                                )}
                            </CardHeader>
                            
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Tạm tính ({bookingDetails.totalHours} giờ)</span>
                                        <span className="font-bold text-slate-800">{bookingDetails.subtotal.toLocaleString('vi-VN')} ₫</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Phụ phí giờ vàng</span>
                                        <span className="font-bold text-slate-800">0 ₫</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between items-center text-sm animate-in slide-in-from-left-4">
                                            <span className="text-emerald-600 font-bold flex items-center gap-1.5"><Ticket className="w-3.5 h-3.5" /> Khuyến mãi</span>
                                            <span className="font-black text-emerald-600">-{discount.toLocaleString('vi-VN')} ₫</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            
                            <CardFooter className="bg-slate-50 flex-col p-6 items-stretch gap-6 border-t border-slate-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">Tổng Thanh Toán</span>
                                    <span className="text-3xl font-black text-primary">{totalAmount.toLocaleString('vi-VN')}<span className="text-lg font-bold text-primary/70 ml-1">₫</span></span>
                                </div>
                                
                                <Button 
                                    className="w-full h-14 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 group relative overflow-hidden" 
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                >
                                    <div className={cn("absolute inset-0 bg-white/20 transition-transform duration-500 -translate-x-full group-hover:translate-x-full")} />
                                    {isProcessing ? (
                                        <span className="flex items-center gap-2"><Zap className="w-5 h-5 animate-pulse" /> Đang tạo mã GD & Đẩy lịch...</span>
                                    ) : (
                                        <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-300" /> CHỐT BOOKING & CHUYỂN TIỀN</span>
                                    )}
                                </Button>
                                
                                <p className="text-[10px] text-center font-medium text-slate-400 mt-2 leading-relaxed px-4">
                                    Bằng việc xác nhận thanh toán, bạn đồng ý với <span className="text-primary hover:underline cursor-pointer">Điều khoản dịch vụ</span> & <span className="text-primary hover:underline cursor-pointer">Chính sách hủy sân</span> của chúng tôi.
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
