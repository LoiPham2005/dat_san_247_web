"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';
import { ChevronLeft, MapPin, CalendarDays, Clock, ShieldCheck, Ticket, CreditCard, Wallet, Banknote, Zap, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useCreateBooking, useCreateRecurringBooking } from '@/features/venue/hooks/useVenueSearch';
import { toast } from 'sonner';

export default function CheckoutPage() {
    const router = useRouter();
    const [draft, setDraft] = useState<any>(null);
    const { mutate: createBooking, isPending: isBookingSingle } = useCreateBooking();
    const { mutate: createRecurring, isPending: isBookingRecurring } = useCreateRecurringBooking();
    const isProcessing = isBookingSingle || isBookingRecurring;
    
    useEffect(() => {
        const savedDraft = localStorage.getItem('booking_draft');
        if (savedDraft) {
            setDraft(JSON.parse(savedDraft));
        } else {
            toast.error('Không tìm thấy thông tin đặt sân. Quay lại trang lịch sân.');
        }
    }, []);

    const [paymentMethod, setPaymentMethod] = useState<'WALLET' | 'VNPAY' | 'MOMO' | 'ZALOPAY' | 'PAY_AT_VENUE'>('VNPAY');
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherStatus, setVoucherStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [discount, setDiscount] = useState(0);

    if (!draft) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Đang tải dữ liệu đơn hàng...</div>;

    const subtotal = draft.slots.reduce((sum: number, slot: any) => sum + slot.price, 0);
    const totalAmount = subtotal - discount;

    const handleApplyVoucher = () => {
        if (!voucherCode) return;
        if (voucherCode.toUpperCase() === 'WELCOME100K') {
            setDiscount(100000);
            setVoucherStatus('success');
        } else {
            setDiscount(0);
            setVoucherStatus('error');
        }
    };

    const getNextSlotTime = (time: string) => {
        const [h, m] = time.split(':').map(Number);
        let nm = m + 30;
        let nh = h;
        if (nm >= 60) {
            nm = 0;
            nh += 1;
        }
        return `${nh.toString().padStart(2, '0')}:${nm.toString().padStart(2, '0')}`;
    };

    const handlePayment = () => {
        if (draft.mode === 'recurring') {
            // Group slots by court to get start/end time
            // For now assume all slots are for one court and consecutive
            const sorted = [...draft.slots].sort((a,b) => a.time.localeCompare(b.time));
            const startTime = sorted[0].time;
            const endTime = getNextSlotTime(sorted[sorted.length-1].time);
            const dayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][new Date(draft.date).getDay()];

            const payload = {
                venue_id: draft.venue.id,
                court_id: sorted[0].courtId,
                repeat_type: 'WEEKLY',
                days: [dayOfWeek],
                start_time: startTime,
                end_time: endTime,
                start_date: draft.date,
                note: 'Đăng ký sân cố định'
            };

            createRecurring(payload, {
                onSuccess: (data: any) => {
                    localStorage.setItem('booking_success', JSON.stringify({
                        venue: draft.venue,
                        date: draft.date,
                        slots: draft.slots,
                        total: totalAmount,
                        mode: 'recurring',
                        results: [data] // Mock results structure for recurring
                    }));
                    router.push('/checkout/success');
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || 'Lỗi khi đăng ký sân cố định.');
                }
            });
            return;
        }

        const payload = {
            venue_id: draft.venue.id,
            booking_date: draft.date,
            items: draft.slots.map((s: any) => ({
                court_id: s.courtId,
                start_time: s.time,
                end_time: getNextSlotTime(s.time)
            })),
            payment_method: paymentMethod,
            note: ''
        };

        createBooking(payload, {
            onSuccess: (data: any) => {
                localStorage.setItem('booking_success', JSON.stringify({
                    venue: draft.venue,
                    date: draft.date,
                    slots: draft.slots,
                    total: totalAmount,
                    results: data.bookings
                }));
                router.push('/checkout/success');
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || 'Có lỗi xảy ra khi tạo đơn hàng.');
            }
        });
    };

    // Group slots by court and merge consecutive slots for display
    const groupedByCourt: Record<string, any[]> = {};
    draft.slots.forEach((s: any) => {
        if (!groupedByCourt[s.courtName]) groupedByCourt[s.courtName] = [];
        groupedByCourt[s.courtName].push(s);
    });

    const displayData: Record<string, { ranges: string[], totalHours: number }> = {};
    
    Object.keys(groupedByCourt).forEach(courtName => {
        const sorted = [...groupedByCourt[courtName]].sort((a, b) => a.time.localeCompare(b.time));
        const merged: { start: string, end: string }[] = [];
        let totalH = 0;

        if (sorted.length > 0) {
            let current = { start: sorted[0].time, end: getNextSlotTime(sorted[0].time) };
            totalH += 0.5;

            for (let i = 1; i < sorted.length; i++) {
                const start = sorted[i].time;
                const end = getNextSlotTime(start);
                totalH += 0.5;

                if (start === current.end) {
                    current.end = end;
                } else {
                    merged.push(current);
                    current = { start, end };
                }
            }
            merged.push(current);
        }

        displayData[courtName] = {
            ranges: merged.map(m => `${m.start} - ${m.end}`),
            totalHours: totalH
        };
    });

    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-8 animate-in fade-in">
            <div className="container max-w-6xl mx-auto px-4">
                
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" onClick={() => router.back()}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Thanh Toán Đơn Đặt Sân</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                        <Card className="rounded-[2rem] border-0 shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b border-slate-100 p-6 flex flex-row items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-primary rounded-2xl flex items-center justify-center text-white shadow-inner">
                                    <MapPin className="w-8 h-8 opacity-80" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <CardTitle className="text-xl md:text-2xl font-bold text-slate-900">{draft.venue.name}</CardTitle>
                                        <Badge variant={draft.mode === 'recurring' ? 'default' : 'secondary'} className={cn("text-[10px] font-black px-2 py-0.5 rounded-md", draft.mode === 'recurring' ? "bg-primary text-white" : "bg-slate-200 text-slate-600")}>
                                            {draft.mode === 'recurring' ? 'SÂN CỐ ĐỊNH' : 'ĐẶT SÂN LẺ'}
                                        </Badge>
                                    </div>
                                    <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {draft.venue.address}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 bg-slate-50/50 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-start gap-4 shadow-sm">
                                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0"><CalendarDays className="w-5 h-5" /></div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ngày thi đấu</div>
                                            <div className="font-bold text-slate-800 text-lg">{format(new Date(draft.date), 'EEEE, dd/MM/yyyy', { locale: vi })}</div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-start gap-4 shadow-sm">
                                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><Clock className="w-5 h-5" /></div>
                                        <div className="flex-1 overflow-hidden">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Khung giờ đặt</div>
                                            <div className="font-bold text-slate-700 text-sm space-y-3">
                                                {Object.entries(displayData).map(([court, data]) => (
                                                    <div key={court} className="flex flex-col bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                                                        <span className="text-primary text-[10px] uppercase font-black mb-1">{court} ({data.totalHours} Giờ):</span>
                                                        <div className="flex flex-wrap gap-2">
                                                            {data.ranges.map(range => (
                                                                <Badge key={range} variant="secondary" className="bg-white text-slate-800 font-bold border-slate-200">{range}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                        <span className="font-bold text-slate-700 whitespace-nowrap">Tổng cộng {draft.slots.length} hiệp (slots)</span>
                                    </div>
                                    <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 px-3 py-1 font-mono">{(draft.slots.length * 0.5).toFixed(1)} Giờ chơi</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-[2rem] border-0 shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b border-slate-100 p-6">
                                <CardTitle className="text-xl font-bold flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary" /> Phương thức thanh toán
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 bg-white space-y-4">
                                <label className={cn("flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all", paymentMethod === 'VNPAY' ? "border-primary bg-primary/5" : "border-slate-100 hover:border-slate-300")}>
                                    <input type="radio" className="sr-only" checked={paymentMethod === 'VNPAY'} onChange={() => setPaymentMethod('VNPAY')} />
                                    <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center p-2 shadow-sm shrink-0">
                                        <img src="https://vnpay.vn/s1/itrqf_j0nseufm/2020/09/index-logo.png" alt="VNPay" className="object-contain" />
                                    </div>
                                    <div className="flex-1 text-sm font-bold text-slate-800">Cổng VNPAY (ATM/Banking)</div>
                                    {paymentMethod === 'VNPAY' && <CheckCircle2 className="w-5 h-5 text-primary" />}
                                </label>

                                <label className={cn("flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all", paymentMethod === 'WALLET' ? "border-primary bg-primary/5" : "border-slate-100 hover:border-slate-300")}>
                                    <input type="radio" className="sr-only" checked={paymentMethod === 'WALLET'} onChange={() => setPaymentMethod('WALLET')} />
                                    <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center shadow-sm text-primary shrink-0">
                                        <Wallet className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 text-sm font-bold text-slate-800">Ví DatSan247 (Số dư: 0đ)</div>
                                    {paymentMethod === 'WALLET' && <CheckCircle2 className="w-5 h-5 text-primary" />}
                                </label>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="w-full lg:w-[420px] shrink-0">
                        <Card className="sticky top-24 rounded-[2rem] border-0 shadow-xl overflow-hidden bg-white">
                            <CardHeader className="bg-transparent border-b border-slate-100 p-6 pt-8 pb-5">
                                <CardTitle className="text-sm font-bold flex items-center gap-2 mb-3 tracking-widest uppercase text-slate-400">
                                    <Ticket className="w-4 h-4 text-slate-500" /> Nhập Voucher / Khuyến mãi
                                </CardTitle>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Input 
                                            placeholder="Mã GIAMGIA" 
                                            className="h-12 border-slate-200 uppercase font-bold pr-10" 
                                            value={voucherCode}
                                            onChange={(e) => { setVoucherCode(e.target.value.toUpperCase()); setVoucherStatus('idle'); }}
                                        />
                                        {voucherStatus === 'success' && <CheckCircle2 className="absolute right-3 top-3.5 w-5 h-5 text-emerald-500" />}
                                    </div>
                                    <Button variant="outline" className="h-12 px-6 font-bold" onClick={handleApplyVoucher} disabled={!voucherCode}>Áp Dụng</Button>
                                </div>
                                {voucherStatus === 'error' && <p className="text-xs text-rose-500 font-semibold mt-2">Mã không hợp lệ.</p>}
                            </CardHeader>
                            
                            <CardContent className="p-6 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Tạm tính ({draft.slots.length} ca)</span>
                                    <span className="font-bold text-slate-800">{subtotal.toLocaleString('vi-VN')} ₫</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-emerald-600 font-bold flex items-center gap-1.5"><Ticket className="w-3.5 h-3.5" /> Giảm giá</span>
                                        <span className="font-black text-emerald-600">-{discount.toLocaleString('vi-VN')} ₫</span>
                                    </div>
                                )}
                            </CardContent>
                            
                            <CardFooter className="bg-slate-50 flex-col p-6 items-stretch gap-6 border-t border-slate-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">Tổng Thanh Toán</span>
                                    <span className="text-3xl font-black text-primary">{totalAmount.toLocaleString('vi-VN')}₫</span>
                                </div>
                                <Button 
                                    className="w-full h-14 rounded-2xl font-black text-lg shadow-lg" 
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center gap-2"><Zap className="w-5 h-5 animate-pulse" /> Đang xử lý...</span>
                                    ) : (
                                        <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> CHỐT BOOKING & THANH TOÁN</span>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

