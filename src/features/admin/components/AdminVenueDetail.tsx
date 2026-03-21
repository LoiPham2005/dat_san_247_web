"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/api/axios';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ArrowLeft, MapPin, Building2, Eye, ShieldCheck, Mail, Phone, Calendar, Star } from 'lucide-react';
import { toast } from 'sonner';

export const AdminVenueDetail = () => {
    const { id } = useParams();
    const router = useRouter();
    const [venue, setVenue] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchVenue = async () => {
        try {
            const res = await apiClient.get(`/admin/venues/${id}`);
            if (res.data?.data) {
                setVenue(res.data.data);
            }
        } catch (error) {
            toast.error("Không thể tải thông tin chi tiết Venue");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchVenue();
    }, [id]);

    const handleUpdateStatus = async (status: string) => {
        try {
            await apiClient.patch(`/admin/venues/${id}/status`, { status });
            toast.success("Cập nhật trạng thái thành công");
            fetchVenue(); // reload data
        } catch (error) {
            toast.error("Lỗi khi cập nhật trạng thái");
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
            </div>
        );
    }

    if (!venue) {
        return <div className="p-8 text-center text-slate-500">Không tìm thấy Venue</div>;
    }

    const verification = venue.venue_verifications?.[0]; // take the latest verification request

    return (
        <div className="flex-1 space-y-6 p-8 pt-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()} className="w-10 h-10 rounded-xl">
                    <ArrowLeft className="w-5 h-5 text-slate-500" />
                </Button>
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-black text-slate-900">{venue.name}</h2>
                        <StatusBadge status={venue.status} type="venue" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium flex items-center gap-1.5 mt-1">
                        <MapPin className="w-4 h-4" /> {venue.address}, {venue.district}, {venue.city}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {/* User Info & Quick Stats */}
                <div className="col-span-1 space-y-6">
                    <Card className="p-5 shadow-sm border-slate-200">
                        <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Thông tin Chủ sân
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Họ và tên</div>
                                <div className="font-semibold text-slate-800">{venue.users?.full_name || 'N/A'}</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-medium text-slate-600">{venue.users?.email || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-medium text-slate-600">{venue.users?.phone || 'Chưa cung cấp'}</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 shadow-sm border-slate-200 bg-slate-50">
                        <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Hành động của Admin</h3>
                        <div className="space-y-3">
                            <Button 
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11"
                                onClick={() => handleUpdateStatus('APPROVED')}
                                disabled={venue.status === 'APPROVED'}
                            >
                                Duyệt Sân Kích Hoạt (Approve)
                            </Button>
                            <Button 
                                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold h-11"
                                onClick={() => handleUpdateStatus('REJECTED')}
                                disabled={venue.status === 'REJECTED'}
                            >
                                Từ Chối Hồ Sơ (Reject)
                            </Button>
                            <Button 
                                variant="outline"
                                className="w-full h-11 font-bold decoration-slate-300"
                                onClick={() => handleUpdateStatus('SUSPENDED')}
                                disabled={venue.status === 'SUSPENDED'}
                            >
                                Tạm Đình Chỉ (Suspend)
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Verification Documents */}
                <div className="col-span-2 space-y-6">
                    <Card className="p-6 shadow-sm border-slate-200">
                        <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2 text-lg">
                            <Building2 className="w-5 h-5 text-primary" /> Hồ Sơ Pháp Lý (Kinh Doanh)
                        </h3>

                        {!verification ? (
                            <div className="p-6 bg-slate-50 text-center rounded-xl border border-dashed border-slate-300">
                                <p className="text-slate-500 font-medium">Chủ sân chưa nộp hồ sơ xét duyệt nào.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm text-slate-700">Giấy Xét Duyệt Hiện Tại</h4>
                                        <StatusBadge status={verification.status} type="kyc" />
                                        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-2">
                                            <Calendar className="w-3.5 h-3.5" /> Gửi lúc: {new Date(verification.created_at).toLocaleString('vi-VN')}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm text-slate-700 uppercase">Giấy Phép Kinh Doanh</h4>
                                        <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative group cursor-pointer" onClick={() => window.open(verification.business_license_url, '_blank')}>
                                            <img src={verification.business_license_url || ''} alt="GPKD" className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                                                    <Eye className="w-3 h-3" /> Xem Ảnh Lớn
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm text-slate-700 uppercase">Ảnh Chân Dung Chủ Sở Hữu</h4>
                                        <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative group cursor-pointer" onClick={() => window.open(verification.owner_photo_url, '_blank')}>
                                            <img src={verification.owner_photo_url || ''} alt="Owner Photo" className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                                                    <Eye className="w-3 h-3" /> Xem Ảnh Lớn
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm text-slate-700 uppercase">CCCD Mặt Trước</h4>
                                        <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative group cursor-pointer" onClick={() => window.open(verification.id_card_front_url, '_blank')}>
                                            <img src={verification.id_card_front_url || ''} alt="Front ID" className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                                                    <Eye className="w-3 h-3" /> Xem Ảnh Lớn
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm text-slate-700 uppercase">CCCD Mặt Sau</h4>
                                        <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative group cursor-pointer" onClick={() => window.open(verification.id_card_back_url, '_blank')}>
                                            <img src={verification.id_card_back_url || ''} alt="Back ID" className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                                                    <Eye className="w-3 h-3" /> Xem Ảnh Lớn
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};
