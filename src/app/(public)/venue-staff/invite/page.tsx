"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import apiClient from '@/lib/api/axios';
import { toast } from 'sonner';
import { Mail, Shield, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function AcceptInvitePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const { data: session, status } = useSession();

    const [invite, setInvite] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [accepting, setAccepting] = useState(false);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        apiClient.get(`/venue-staff/invite/${token}`)
            .then(res => setInvite(res.data.data))
            .catch(err => toast.error(err.response?.data?.message || "Lời mời không hợp lệ"))
            .finally(() => setLoading(false));
    }, [token]);

    const handleAccept = async () => {
        if (status === 'unauthenticated') {
            toast.error("Vui lòng đăng nhập để chấp nhận lời mời");
            router.push(`/login?callbackUrl=${window.location.href}`);
            return;
        }

        setAccepting(true);
        try {
            await apiClient.post(`/venue-staff/invite/${token}/accept`);
            toast.success("Chào mừng bạn gia nhập đội ngũ!");
            router.push('/venue-staff/dashboard');
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Có lỗi xảy ra");
        } finally {
            setAccepting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải thông tin lời mời...</div>;

    if (!invite) return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <Card className="p-8 text-center max-w-md w-full">
                <XCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-slate-800 mb-2">Lời mời không hợp lệ</h2>
                <p className="text-slate-500 mb-6">Liên kết này đã hết hạn hoặc không tồn tại. Vui lòng liên hệ chủ sân để nhận lời mời mới.</p>
                <Button onClick={() => router.push('/')} className="w-full">Quay lại Trang chủ</Button>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <Card className="p-8 max-w-lg w-full shadow-xl border-emerald-100">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-emerald-50">
                        <Mail className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">Lời Mời Gia Nhập Đội Ngũ</h2>
                    <p className="text-slate-500 font-medium mt-1">Bạn đã nhận được lời mời làm việc từ <strong className="text-emerald-700">{invite.sender?.full_name}</strong></p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100 space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Shield className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vị trí công việc</p>
                            <p className="font-bold text-slate-800 text-lg">{invite.role === 'RECEPTIONIST' ? 'Lễ Tân' : invite.role === 'MANAGER' ? 'Quản Lý' : 'Nhân Viên'}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <MapPin className="w-5 h-5 text-rose-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cơ sở (Venue)</p>
                            <p className="font-bold text-slate-800">{invite.venues?.name}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">{invite.venues?.address}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <Button 
                        onClick={handleAccept} 
                        loading={accepting}
                        className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-lg font-bold shadow-lg shadow-emerald-200"
                    >
                        Chấp Nhận & Gia Nhập
                    </Button>
                    <p className="text-[10px] text-center text-slate-400">Bằng cách chấp nhận, bạn sẽ trở thành nhân viên của cơ sở này và có quyền quản lý tương ứng.</p>
                </div>
            </Card>
        </div>
    );
}
