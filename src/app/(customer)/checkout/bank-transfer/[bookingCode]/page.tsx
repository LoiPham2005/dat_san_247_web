"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { CheckCircle2, Clock, Copy, Building2, AlertCircle, Loader2, RefreshCw, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import apiClient from '@/lib/api/axios';
import { toast } from 'sonner';

const POLL_INTERVAL_MS = 4000;

type BankTransferInfo = {
    booking_code: string;
    amount: number;
    bank: {
        bank_name: string;
        account_number: string;
        account_name: string;
    };
    transfer_content: string;
    qr_url: string;
    expires_at: string;
    venue_name: string;
    court_name: string;
    booking_date: string;
    start_time: string;
    end_time: string;
};

function useCountdown(expiresAt: string | null) {
    const [secondsLeft, setSecondsLeft] = useState(0);
    useEffect(() => {
        if (!expiresAt) return;
        const calc = () => Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
        setSecondsLeft(calc());
        const id = setInterval(() => setSecondsLeft(calc()), 1000);
        return () => clearInterval(id);
    }, [expiresAt]);
    const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const secs = String(secondsLeft % 60).padStart(2, '0');
    return { secondsLeft, display: `${mins}:${secs}` };
}

export default function BankTransferPage() {
    const { bookingCode } = useParams<{ bookingCode: string }>();
    const router = useRouter();

    const [info, setInfo] = useState<BankTransferInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [paid, setPaid] = useState(false);
    const [expired, setExpired] = useState(false);
    const [checking, setChecking] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);
    const pollRef = useRef<NodeJS.Timeout | null>(null);
    const countdownStartedRef = useRef(false);

    const [localExpiry] = useState(() => new Date(Date.now() + 15 * 60 * 1000).toISOString());
    const { secondsLeft, display: countdownDisplay } = useCountdown(info ? localExpiry : null);
    const isUrgent = secondsLeft > 0 && secondsLeft < 180;

    // Fetch thông tin bank transfer
    useEffect(() => {
        apiClient.get(`/customer/bank-transfer/${bookingCode}`)
            .then(res => {
                const data = res.data?.data;
                if (data?.already_paid) setPaid(true);
                else if (data) setInfo(data);
            })
            .catch(() => toast.error('Không tải được thông tin thanh toán'))
            .finally(() => setLoading(false));
    }, [bookingCode]);

    // Polling tự động mỗi 4 giây
    const pollStatus = useCallback(async (manual = false) => {
        if (manual) setChecking(true);
        try {
            const res = await apiClient.get(`/customer/payment-status/${bookingCode}`);
            const { is_paid } = res.data?.data ?? {};
            if (is_paid) {
                setPaid(true);
                if (pollRef.current) clearInterval(pollRef.current);
            } else if (manual) {
                toast.info('Chưa nhận được thanh toán. Vui lòng kiểm tra lại nội dung chuyển khoản.');
            }
        } catch {
            if (manual) toast.error('Không kiểm tra được trạng thái thanh toán');
        } finally {
            if (manual) setChecking(false);
        }
    }, [bookingCode]);

    useEffect(() => {
        if (paid || expired || loading) return;
        pollRef.current = setInterval(() => pollStatus(), POLL_INTERVAL_MS);
        return () => { if (pollRef.current) clearInterval(pollRef.current); };
    }, [paid, expired, loading, pollStatus]);

    // Xử lý hết giờ — chỉ sau khi countdown đã chạy
    useEffect(() => {
        if (secondsLeft > 0) countdownStartedRef.current = true;
        if (info && secondsLeft === 0 && countdownStartedRef.current) {
            setExpired(true);
            if (pollRef.current) clearInterval(pollRef.current);
        }
    }, [secondsLeft, info]);

    // Redirect khi paid
    useEffect(() => {
        if (!paid) return;
        const t = setTimeout(() => router.push('/checkout/success'), 2500);
        return () => clearTimeout(t);
    }, [paid, router]);

    const copyText = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    // ===== LOADING =====
    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="font-medium">Đang tải thông tin thanh toán...</span>
        </div>
    );

    // ===== PAID =====
    if (paid) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-slate-50">
            <div className="w-28 h-28 rounded-full bg-emerald-100 flex items-center justify-center animate-in zoom-in duration-500">
                <CheckCircle2 className="w-16 h-16 text-emerald-500" />
            </div>
            <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Thanh toán thành công!</h2>
                <p className="text-slate-500">Booking của bạn đã được xác nhận.</p>
                <p className="text-slate-400 text-sm mt-1">Đang chuyển trang...</p>
            </div>
        </div>
    );

    // ===== EXPIRED =====
    if (expired) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-slate-50">
            <div className="w-24 h-24 rounded-full bg-rose-100 flex items-center justify-center">
                <AlertCircle className="w-14 h-14 text-rose-500" />
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-black text-slate-900 mb-2">Hết thời gian thanh toán</h2>
                <p className="text-slate-500 mb-6">Booking đã bị hủy tự động do quá 15 phút chưa thanh toán.</p>
                <Button onClick={() => router.push('/')}>Về trang chủ</Button>
            </div>
        </div>
    );

    if (!info) return null;

    return (
        <div className="min-h-screen bg-slate-50 pb-20 pt-8 animate-in fade-in">
            <div className="container max-w-lg mx-auto px-4 space-y-5">

                {/* Header */}
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-black text-slate-900">Chuyển khoản để hoàn tất</h1>
                    <p className="text-slate-500 text-sm">{info.venue_name} · {info.court_name}</p>
                    <p className="text-slate-400 text-sm">{info.booking_date} · {info.start_time} – {info.end_time}</p>
                </div>

                {/* Countdown */}
                <div className={cn(
                    "flex items-center justify-center gap-3 py-3 px-5 rounded-2xl font-bold text-sm",
                    isUrgent ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-700"
                )}>
                    <Clock className="w-4 h-4 animate-pulse" />
                    Hết hạn sau: <span className="font-mono text-xl">{countdownDisplay}</span>
                </div>

                {/* QR Code */}
                <Card className="rounded-[2rem] border-0 shadow-sm overflow-hidden">
                    <CardHeader className="bg-white border-b border-slate-100 p-5">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <Smartphone className="w-5 h-5 text-primary" />
                            Quét QR để chuyển khoản
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 bg-white flex flex-col items-center gap-3">
                        <div className="p-3 border-2 border-slate-100 rounded-2xl shadow-sm">
                            <img
                                src={info.qr_url}
                                alt="QR chuyển khoản"
                                className="w-56 h-56 object-contain"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                        </div>
                        <p className="text-xs text-slate-500 text-center">
                            Mở app ngân hàng → Quét QR → Số tiền & nội dung <strong>tự động điền</strong>
                        </p>
                    </CardContent>
                </Card>

                {/* Thông tin chuyển khoản thủ công */}
                <Card className="rounded-[2rem] border-0 shadow-sm overflow-hidden">
                    <CardHeader className="bg-white border-b border-slate-100 p-5">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-emerald-500" />
                            Hoặc chuyển khoản thủ công
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 bg-white space-y-1">
                        {[
                            { label: 'Ngân hàng', value: info.bank.bank_name, key: null },
                            { label: 'Số tài khoản', value: info.bank.account_number, key: 'stk' },
                            { label: 'Chủ tài khoản', value: info.bank.account_name, key: null },
                            { label: 'Số tiền', value: `${info.amount.toLocaleString('vi-VN')}đ`, key: 'amount' },
                            { label: 'Nội dung CK', value: info.transfer_content, key: 'content' },
                        ].map(({ label, value, key }) => (
                            <div key={label} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0 gap-3">
                                <span className="text-xs text-slate-400 font-medium w-24 shrink-0">{label}</span>
                                <div className="flex items-center gap-2 flex-1 justify-end">
                                    <span className={cn(
                                        "text-sm font-bold text-right",
                                        label === 'Nội dung CK'
                                            ? "text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg font-mono"
                                            : "text-slate-800"
                                    )}>{value}</span>
                                    {key && (
                                        <button
                                            onClick={() => copyText(label === 'Số tiền' ? String(info.amount) : value, key)}
                                            className="shrink-0 text-slate-400 hover:text-primary transition-colors"
                                        >
                                            {copied === key
                                                ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                : <Copy className="w-4 h-4" />}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="pt-2 p-3 bg-rose-50 border border-rose-200 rounded-xl mt-2">
                            <p className="text-[11px] text-rose-600 font-bold">
                                ⚠️ Bắt buộc ghi đúng nội dung chuyển khoản: <span className="font-mono">{info.transfer_content}</span>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Trạng thái + nút thủ công */}
                <div className="flex flex-col items-center gap-4 py-2">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Hệ thống tự động xác nhận sau khi nhận được tiền...
                    </div>

                    <Button
                        variant="outline"
                        className="w-full h-13 rounded-2xl font-bold text-base"
                        onClick={() => pollStatus(true)}
                        disabled={checking}
                    >
                        {checking
                            ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Đang kiểm tra...</span>
                            : <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Tôi đã chuyển khoản</span>}
                    </Button>
                </div>
            </div>
        </div>
    );
}
