"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';
import {
    ChevronLeft, MapPin, CalendarDays, Clock, ShieldCheck, Ticket,
    Zap, CheckCircle2, Building2, Copy, AlertCircle, QrCode,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useCreateBooking, useCreateRecurringBooking } from '@/features/venue/hooks/useVenueSearch';
import { toast } from 'sonner';
import apiClient from '@/lib/api/axios';

export default function CheckoutPage() {
    const router = useRouter();
    const [draft, setDraft] = useState<any>(null);
    const { mutate: createBooking, isPending: isBookingSingle } = useCreateBooking();
    const { mutate: createRecurring, isPending: isBookingRecurring } = useCreateRecurringBooking();
    const isProcessing = isBookingSingle || isBookingRecurring;

    const [voucherCode, setVoucherCode] = useState('');
    const [voucherStatus, setVoucherStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [discount, setDiscount] = useState(0);
    const [bankInfo, setBankInfo] = useState<any>(null);
    const [qrError, setQrError] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('booking_draft');
        if (saved) setDraft(JSON.parse(saved));
        else toast.error('Không tìm thấy thông tin đặt sân.');
    }, []);

    useEffect(() => {
        if (!draft?.venue?.id) return;
        apiClient.get(`/customer/venue-bank-info/${draft.venue.id}`)
            .then(res => setBankInfo(res.data?.data))
            .catch(() => {});
    }, [draft?.venue?.id]);

    if (!draft) return (
        <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">
            Đang tải dữ liệu đơn hàng...
        </div>
    );

    const subtotal = draft.slots.reduce((sum: number, s: any) => sum + s.price, 0);
    const totalAmount = subtotal - discount;

    const getNextSlotTime = (time: string) => {
        const [h, m] = time.split(':').map(Number);
        const nm = (m + 30) % 60;
        const nh = m + 30 >= 60 ? h + 1 : h;
        return `${nh.toString().padStart(2, '0')}:${nm.toString().padStart(2, '0')}`;
    };

    const handleApplyVoucher = () => {
        if (!voucherCode) return;
        if (voucherCode.toUpperCase() === 'WELCOME100K') { setDiscount(100000); setVoucherStatus('success'); }
        else { setDiscount(0); setVoucherStatus('error'); }
    };

    const copyField = (value: string, key: string) => {
        navigator.clipboard.writeText(value);
        setCopiedField(key);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handlePayment = () => {
        if (draft.mode === 'recurring') {
            const sorted = [...draft.slots].sort((a: any, b: any) => a.time.localeCompare(b.time));
            const dayOfWeek = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'][new Date(draft.date).getDay()];
            createRecurring({
                venue_id: draft.venue.id,
                court_id: sorted[0].courtId,
                repeat_type: 'WEEKLY',
                days: [dayOfWeek],
                start_time: sorted[0].time,
                end_time: getNextSlotTime(sorted[sorted.length - 1].time),
                start_date: draft.date,
                note: 'Đăng ký sân cố định',
            }, {
                onSuccess: (data: any) => {
                    localStorage.setItem('booking_success', JSON.stringify({
                        venue: draft.venue, date: draft.date, slots: draft.slots,
                        total: totalAmount, mode: 'recurring', results: [data],
                    }));
                    router.push('/checkout/success');
                },
                onError: (err: any) => toast.error(err?.response?.data?.message || 'Lỗi khi đăng ký sân cố định.'),
            });
            return;
        }

        createBooking({
            venue_id: draft.venue.id,
            booking_date: draft.date,
            items: draft.slots.map((s: any) => ({
                court_id: s.courtId,
                start_time: s.time,
                end_time: getNextSlotTime(s.time),
            })),
            payment_method: 'BANK_TRANSFER',
            note: '',
        }, {
            onSuccess: (data: any) => {
                const code = data.bookings?.[0]?.booking_code;
                if (!code) { toast.error('Không lấy được mã booking'); return; }
                router.push(`/checkout/bank-transfer/${code}`);
            },
            onError: (err: any) => toast.error(err?.response?.data?.message || 'Có lỗi xảy ra khi tạo đơn hàng.'),
        });
    };

    // Build display data
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
            let cur = { start: sorted[0].time, end: getNextSlotTime(sorted[0].time) };
            totalH += 0.5;
            for (let i = 1; i < sorted.length; i++) {
                const end = getNextSlotTime(sorted[i].time);
                totalH += 0.5;
                if (sorted[i].time === cur.end) cur.end = end;
                else { merged.push(cur); cur = { start: sorted[i].time, end }; }
            }
            merged.push(cur);
        }
        displayData[courtName] = { ranges: merged.map(m => `${m.start} - ${m.end}`), totalHours: totalH };
    });

    const qrSrc = bankInfo?.bank_account?.qr_code_url ||
        (bankInfo?.vietqr_base ? `${bankInfo.vietqr_base}?amount=${totalAmount}&addInfo=DatSan247` : null);

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

                        {/* Thông tin sân */}
                        <Card className="rounded-[2rem] border-0 shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b border-slate-100 p-6 flex flex-row items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-primary rounded-2xl flex items-center justify-center text-white shadow-inner">
                                    <MapPin className="w-8 h-8 opacity-80" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <CardTitle className="text-xl md:text-2xl font-bold text-slate-900">{draft.venue.name}</CardTitle>
                                        <Badge className={cn("text-[10px] font-black px-2 py-0.5 rounded-md", draft.mode === 'recurring' ? "bg-primary text-white" : "bg-slate-200 text-slate-600")}>
                                            {draft.mode === 'recurring' ? 'SÂN CỐ ĐỊNH' : 'ĐẶT SÂN LẺ'}
                                        </Badge>
                                    </div>
                                    <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5"><MapPin className="w-4 h-4" />{draft.venue.address}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 bg-slate-50/50 space-y-4">
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
                                            <div className="font-bold text-slate-700 text-sm space-y-2">
                                                {Object.entries(displayData).map(([court, data]) => (
                                                    <div key={court} className="flex flex-col bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                                                        <span className="text-primary text-[10px] uppercase font-black mb-1">{court} ({data.totalHours} Giờ):</span>
                                                        <div className="flex flex-wrap gap-2">
                                                            {data.ranges.map(r => <Badge key={r} variant="secondary" className="bg-white text-slate-800 font-bold border-slate-200">{r}</Badge>)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="font-bold text-slate-700">Tổng cộng {draft.slots.length} hiệp (slots)</span>
                                    </div>
                                    <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 px-3 py-1 font-mono">{(draft.slots.length * 0.5).toFixed(1)} Giờ chơi</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Preview thông tin ngân hàng */}
                        <Card className="rounded-[2rem] border-0 shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b border-slate-100 p-6">
                                <CardTitle className="text-xl font-bold flex items-center gap-2">
                                    <Building2 className="w-5 h-5 text-emerald-500" /> Phương thức thanh toán
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 bg-white">
                                {!bankInfo ? (
                                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                                        <div className="w-4 h-4 border-2 border-slate-300 border-t-primary rounded-full animate-spin" />
                                        Đang tải thông tin thanh toán...
                                    </div>
                                ) : !bankInfo.bank_account ? (
                                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                                        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                        <p className="text-sm text-amber-700 font-medium">Chủ sân chưa cài đặt tài khoản ngân hàng. Vui lòng liên hệ trực tiếp.</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col md:flex-row gap-6 items-center">
                                        {/* QR preview */}
                                        <div className="shrink-0 flex flex-col items-center gap-2">
                                            <div className="p-2 border-2 border-slate-100 rounded-2xl w-44 h-44 flex items-center justify-center bg-white shadow-sm">
                                                {qrSrc && !qrError ? (
                                                    <img src={qrSrc} alt="QR" className="w-40 h-40 object-contain rounded-xl" onError={() => setQrError(true)} />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2 text-slate-300">
                                                        <QrCode className="w-16 h-16" />
                                                        <span className="text-[10px] text-slate-400 text-center">QR đầy đủ sau<br/>khi chốt booking</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-[10px] text-slate-400 text-center max-w-[160px]">QR đầy đủ với mã booking sẽ hiện ở bước tiếp theo</p>
                                        </div>

                                        {/* Bank details */}
                                        <div className="flex-1 space-y-2 w-full">
                                            {[
                                                { label: 'Ngân hàng', value: bankInfo.bank_account.bank_name, key: null },
                                                { label: 'Số TK', value: bankInfo.bank_account.account_number, key: 'stk' },
                                                { label: 'Chủ TK', value: bankInfo.bank_account.account_name, key: null },
                                                { label: 'Số tiền', value: `${totalAmount.toLocaleString('vi-VN')}đ`, key: 'amount' },
                                            ].map(({ label, value, key }) => (
                                                <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 gap-3">
                                                    <span className="text-xs text-slate-400 font-medium w-16 shrink-0">{label}</span>
                                                    <div className="flex items-center gap-2 flex-1 justify-end">
                                                        <span className="text-sm font-bold text-slate-800 text-right truncate">{value}</span>
                                                        {key && (
                                                            <button onClick={() => copyField(value.replace(/[^\d]/g, '') || value, key)} className="shrink-0 text-slate-400 hover:text-primary transition-colors">
                                                                {copiedField === key ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                                                <p className="text-[11px] text-blue-700 font-semibold">
                                                    Nhấn "Chốt Booking" → trang chuyển khoản sẽ hiện QR đầy đủ kèm mã booking tự động điền nội dung.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-[420px] shrink-0">
                        <Card className="sticky top-24 rounded-[2rem] border-0 shadow-xl overflow-hidden bg-white">
                            <CardHeader className="bg-transparent border-b border-slate-100 p-6 pt-8 pb-5">
                                <CardTitle className="text-sm font-bold flex items-center gap-2 mb-3 tracking-widest uppercase text-slate-400">
                                    <Ticket className="w-4 h-4 text-slate-500" /> Nhập Voucher / Khuyến mãi
                                </CardTitle>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Input placeholder="Mã GIAMGIA" className="h-12 border-slate-200 uppercase font-bold pr-10" value={voucherCode}
                                            onChange={(e) => { setVoucherCode(e.target.value.toUpperCase()); setVoucherStatus('idle'); }} />
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
                            <CardFooter className="bg-slate-50 flex-col p-6 items-stretch gap-4 border-t border-slate-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">Tổng Thanh Toán</span>
                                    <span className="text-3xl font-black text-primary">{totalAmount.toLocaleString('vi-VN')}₫</span>
                                </div>
                                <Button className="w-full h-14 rounded-2xl font-black text-lg shadow-lg" onClick={handlePayment} disabled={isProcessing}>
                                    {isProcessing
                                        ? <span className="flex items-center gap-2"><Zap className="w-5 h-5 animate-pulse" /> Đang xử lý...</span>
                                        : <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> CHỐT BOOKING & THANH TOÁN</span>}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
