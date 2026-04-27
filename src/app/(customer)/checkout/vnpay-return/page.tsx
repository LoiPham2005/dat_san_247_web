"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/common/Button';
import apiClient from '@/lib/api/axios';

type Status = 'verifying' | 'success' | 'failed' | 'invalid';

export default function VNPayReturnPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<Status>('verifying');
    const [bookingCode, setBookingCode] = useState('');
    const [amount, setAmount] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const verify = async () => {
            // Lấy toàn bộ query params VNPay trả về
            const query: Record<string, string> = {};
            searchParams.forEach((value, key) => { query[key] = value; });

            const responseCode = query['vnp_ResponseCode'];
            const txnRef = query['vnp_TxnRef'] || '';

            if (!responseCode || !txnRef) {
                setStatus('invalid');
                return;
            }

            try {
                const res = await apiClient.post('/customer/vnpay/verify-return', query);
                const data = res.data?.data;

                setBookingCode(data?.booking_code || txnRef);
                setAmount(data?.amount || Number(query['vnp_Amount']) / 100);

                if (data?.status === 'SUCCESS') {
                    setStatus('success');
                    // Xoá pending data
                    localStorage.removeItem('vnpay_pending');
                    localStorage.removeItem('booking_draft');
                } else {
                    setStatus('failed');
                    setErrorMsg(getErrorMessage(responseCode));
                }
            } catch {
                setStatus('failed');
                setErrorMsg('Không thể xác minh giao dịch. Vui lòng liên hệ hỗ trợ.');
            }
        };

        verify();
    }, [searchParams]);

    const getErrorMessage = (code: string) => {
        const messages: Record<string, string> = {
            '07': 'Giao dịch bị nghi ngờ gian lận.',
            '09': 'Thẻ/Tài khoản chưa đăng ký dịch vụ Internet Banking.',
            '10': 'Xác thực thông tin thẻ/tài khoản quá 3 lần.',
            '11': 'Đã hết hạn chờ thanh toán.',
            '12': 'Thẻ/Tài khoản bị khóa.',
            '13': 'OTP không đúng.',
            '24': 'Giao dịch bị hủy.',
            '51': 'Tài khoản không đủ số dư.',
            '65': 'Tài khoản vượt hạn mức giao dịch trong ngày.',
            '75': 'Ngân hàng thanh toán đang bảo trì.',
            '79': 'Nhập sai mật khẩu thanh toán quá số lần quy định.',
            '99': 'Lỗi không xác định.',
        };
        return messages[code] || `Giao dịch thất bại (mã lỗi: ${code})`;
    };

    if (status === 'verifying') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-lg font-bold text-slate-600">Đang xác nhận thanh toán...</p>
                <p className="text-sm text-slate-400">Vui lòng không đóng trang này</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 px-4">
                <div className="bg-white rounded-[2rem] shadow-xl p-10 max-w-md w-full flex flex-col items-center gap-6 text-center">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-14 h-14 text-emerald-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 mb-2">Thanh toán thành công!</h1>
                        <p className="text-slate-500 text-sm">Booking của bạn đã được xác nhận</p>
                    </div>
                    <div className="w-full bg-slate-50 rounded-2xl p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Mã booking</span>
                            <span className="font-black text-slate-900 font-mono">{bookingCode}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Số tiền</span>
                            <span className="font-black text-primary">{amount.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Phương thức</span>
                            <span className="font-bold text-slate-700 flex items-center gap-1">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" /> VNPay
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <Button className="w-full h-12 rounded-2xl font-bold" onClick={() => router.push('/bookings')}>
                            Xem đơn đặt sân của tôi
                        </Button>
                        <Button variant="outline" className="w-full h-12 rounded-2xl font-bold" onClick={() => router.push('/')}>
                            Về trang chủ
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // failed hoặc invalid
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 px-4">
            <div className="bg-white rounded-[2rem] shadow-xl p-10 max-w-md w-full flex flex-col items-center gap-6 text-center">
                <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center">
                    <XCircle className="w-14 h-14 text-rose-500" />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2">Thanh toán thất bại</h1>
                    <p className="text-slate-500 text-sm">{errorMsg || 'Giao dịch không thành công'}</p>
                </div>
                {bookingCode && (
                    <div className="w-full bg-slate-50 rounded-2xl p-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Mã booking</span>
                            <span className="font-black text-slate-900 font-mono">{bookingCode}</span>
                        </div>
                    </div>
                )}
                <div className="flex flex-col gap-3 w-full">
                    <Button className="w-full h-12 rounded-2xl font-bold" onClick={() => router.back()}>
                        Thử lại
                    </Button>
                    <Button variant="outline" className="w-full h-12 rounded-2xl font-bold" onClick={() => router.push('/support')}>
                        Liên hệ hỗ trợ
                    </Button>
                </div>
            </div>
        </div>
    );
}
