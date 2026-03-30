"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { OwnerVenue, VenueVerification, VenueOperatingHour, DayOfWeek } from '../api/owner-venue.api';
import { useOwnerVenueDetail } from '../hooks/useOwnerVenue';
import { ArrowLeft, MapPin, Building2, FileText, Clock, UploadCloud, Info, CheckCircle2, AlertCircle, Trash2, Map as MapIcon, Navigation } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { OwnerCourtPanel } from './OwnerCourtPanel';
import { ConfirmDialog, ConfirmType } from '@/components/common/ConfirmDialog';
import { TimePicker } from '@/components/common/TimePicker';
import { ImageUploader } from '@/components/common/ImageUploader';
import MapPickerModal from './MapPickerModal';

const DAY_LABELS: Record<DayOfWeek, string> = {
    MONDAY: 'Thứ 2',
    TUESDAY: 'Thứ 3',
    WEDNESDAY: 'Thứ 4',
    THURSDAY: 'Thứ 5',
    FRIDAY: 'Thứ 6',
    SATURDAY: 'Thứ 7',
    SUNDAY: 'Chủ Nhật'
};

const DAYS_ORDER: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export const OwnerVenueTabs = ({ venue, onBack }: { venue: OwnerVenue, onBack: () => void }) => {
    const { data: session } = useSession();
    const isStaff = (session?.user as any)?.role === 'venue_staff';
    const [activeTab, setActiveTab] = useState<'info' | 'verification' | 'hours' | 'courts'>('info');
    const [isMapOpen, setIsMapOpen] = useState(false);
    const {
        updateVenue, isUpdating,
        verification, submitVerification, isSubmittingVerification,
        operatingHours, updateOperatingHours, isUpdatingHoursPending,
        deleteVenue, isDeleting
    } = useOwnerVenueDetail(venue?.id || null);

    // Guard against missing venue data during initial loads
    const [infoData, setInfoData] = useState({ ...venue });
    
    // Update local state when venue prop changes (after fetch completion)
    useEffect(() => {
        if (venue) {
            setInfoData({ ...venue });
        }
    }, [venue]);

    const [localHours, setLocalHours] = useState<Partial<VenueOperatingHour>[]>([]);
    const [verificationDocs, setVerificationDocs] = useState({
        business_license_url: '',
        id_card_front_url: '',
        id_card_back_url: '',
        owner_photo_url: ''
    });

    // Populate verification documents if they exist
    useEffect(() => {
        if (verification) {
            setVerificationDocs({
                business_license_url: verification.business_license_url || '',
                id_card_front_url: verification.id_card_front_url || '',
                id_card_back_url: verification.id_card_back_url || '',
                owner_photo_url: verification.owner_photo_url || ''
            });
        }
    }, [verification]);

    // Confirm Dialog State
    const [confirm, setConfirm] = useState<{
        isOpen: boolean;
        title: string;
        description: string;
        type: ConfirmType;
        confirmText?: string;
        onConfirm: () => void;
    }>({
        isOpen: false,
        title: '',
        description: '',
        type: 'info',
        onConfirm: () => { }
    });

    // Sync hours when data is loaded
    useEffect(() => {
        // Luôn đảm bảo có đủ 7 ngày kể cả khi data từ server chưa có hoặc thiếu
        const initializedHours = DAYS_ORDER.map(day => {
            const serverHour = operatingHours?.find(h => h.day_of_week === day);
            if (serverHour) {
                return serverHour;
            }
            // Mặc định nếu chưa có cấu hình cho ngày này
            return {
                day_of_week: day,
                opening_time: '08:00:00',
                closing_time: '22:00:00',
                is_closed: false
            };
        });

        setLocalHours(initializedHours);
    }, [operatingHours]);

    const handleUpdateInfo = () => {
        setConfirm({
            isOpen: true,
            title: 'Lưu thay đổi?',
            description: 'Bạn có chắc chắn muốn cập nhật thông tin cơ bản của cơ sở này không?',
            type: 'info',
            onConfirm: () => {
                // Filter out non-updatable fields to avoid 400 Bad Request (forbidNonWhitelisted)
                const updatePayload: any = {};
                const updatableFields = [
                    'name', 'description', 'address', 'city', 'district', 'ward', 
                    'phone', 'email', 'fb_url', 'instagram_url', 'zalo_url', 'youtube_url',
                    'thumbnail_url', 'auto_accept_bookings', 'min_booking_hours', 
                    'max_booking_hours', 'min_booking_before_hours', 'cancellation_before_hours',
                    'vat_rate', 'commission_rate', 'latitude', 'longitude'
                ];

                updatableFields.forEach(field => {
                    const value = infoData[field as keyof typeof infoData];
                    if (value !== undefined) {
                        // Cast numeric fields to numbers to satisfy backend class-validator @IsNumber()
                        if (['vat_rate', 'commission_rate', 'latitude', 'longitude', 'min_booking_hours', 'max_booking_hours', 'min_booking_before_hours', 'cancellation_before_hours'].includes(field)) {
                            updatePayload[field] = value === null || value === '' ? 0 : Number(value);
                        } else {
                            updatePayload[field] = value;
                        }
                    }
                });

                updateVenue(updatePayload);
                setConfirm(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleVerificationSubmit = () => {
        if (!verificationDocs.business_license_url || !verificationDocs.id_card_front_url || !verificationDocs.id_card_back_url || !verificationDocs.owner_photo_url) {
            alert('Vui lòng tải lên đầy đủ các tài liệu yêu cầu (Giấy phép kinh doanh, CCCD mặt trước, CCCD mặt sau, và Ảnh nhận diện chủ sở hữu).');
            return;
        }

        setConfirm({
            isOpen: true,
            title: 'Nộp hồ sơ pháp lý?',
            description: 'Thông tin này sẽ được gửi tới Admin để xét duyệt. Quá trình này thường mất 24h.',
            type: 'warning',
            onConfirm: () => {
                submitVerification({
                    business_license_url: verificationDocs.business_license_url,
                    id_card_front_url: verificationDocs.id_card_front_url,
                    id_card_back_url: verificationDocs.id_card_back_url,
                    owner_photo_url: verificationDocs.owner_photo_url
                });
                setConfirm(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleSaveHours = () => {
        setConfirm({
            isOpen: true,
            title: 'Cập nhật lịch hoạt động?',
            description: 'Thay đổi này sẽ áp dụng ngay lập tức cho tất cả khách hàng đặt sân.',
            type: 'info',
            onConfirm: () => {
                updateOperatingHours(localHours as any[]);
                setConfirm(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleDeleteVenue = () => {
        setConfirm({
            isOpen: true,
            title: 'Xóa Cơ Sở Này?',
            description: 'Hành động này sẽ ẩn cơ sở khỏi hệ thống. Dữ liệu lịch sử sẽ được bảo lưu nhưng cơ sở sẽ không thể hoạt động tiếp. Bạn có chắc chắn muốn xóa?',
            type: 'danger',
            confirmText: 'Xóa Cơ Sở',
            onConfirm: () => {
                deleteVenue();
                setConfirm(prev => ({ ...prev, isOpen: false }));
                onBack(); // Quay về danh sách
            }
        });
    };

    const updateDayHour = (day: DayOfWeek, field: keyof VenueOperatingHour, value: any) => {
        setLocalHours(prev => prev.map(h =>
            h.day_of_week === day ? { ...h, [field]: value } : h
        ));
    };

    const handleMapSave = (lat: number, lng: number) => {
        setInfoData({ ...infoData, latitude: lat, longitude: lng });
        setIsMapOpen(false);
    };

    return (
        <div className="space-y-6">
            <ConfirmDialog
                isOpen={confirm.isOpen}
                title={confirm.title}
                description={confirm.description}
                type={confirm.type}
                confirmText={confirm.confirmText}
                onClose={() => setConfirm(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirm.onConfirm}
                loading={isUpdating || isSubmittingVerification || isUpdatingHoursPending || isDeleting}
            />

            <MapPickerModal
                isOpen={isMapOpen}
                initialLat={infoData.latitude}
                initialLng={infoData.longitude}
                onClose={() => setIsMapOpen(false)}
                onSave={handleMapSave}
            />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={onBack} className="w-10 h-10 rounded-xl">
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
            </div>

            {/* TABS */}
            <div className="flex space-x-2 border-b border-slate-200">
                <button
                    className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'info' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('info')}
                >
                    <Building2 className="w-4 h-4" /> Thông Tin Chính
                </button>
                {!isStaff && (
                    <button
                        className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'verification' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                        onClick={() => setActiveTab('verification')}
                    >
                        <FileText className="w-4 h-4" /> Hồ Sơ Pháp Lý
                    </button>
                )}
                <button
                    className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'hours' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('hours')}
                >
                    <Clock className="w-4 h-4" /> Giờ Hoạt Động
                </button>
                <button
                    className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'courts' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('courts')}
                >
                    <Building2 className="w-4 h-4" /> Quản Lý Sân
                </button>
            </div>

            {/* TAB CONTENT: THÔNG TIN */}
            {activeTab === 'info' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 fade-in pb-12">
                    <Card className="col-span-2 p-6 shadow-sm border-slate-200 space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Cơ Bản</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Tên Cơ Sở Thương Mại <span className="text-red-500">*</span></label>
                                    <Input value={infoData.name} onChange={e => setInfoData({ ...infoData, name: e.target.value })} className="h-11 font-semibold" />
                                </div>
                                <div className="space-y-1.5 col-span-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold text-slate-700 uppercase">Địa chỉ cụ thể <span className="text-red-500">*</span></label>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-7 text-[10px] font-black uppercase text-primary bg-primary/5 hover:bg-primary/10 rounded-lg px-2"
                                            onClick={() => setIsMapOpen(true)}
                                        >
                                            <MapIcon className="w-3 h-3 mr-1" /> Chọn trên bản đồ
                                        </Button>
                                    </div>
                                    <Input value={infoData.address} onChange={e => setInfoData({ ...infoData, address: e.target.value })} className="h-11 border-slate-300" />
                                    {infoData.latitude && infoData.longitude && (
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 italic">
                                            <Navigation className="w-3 h-3" /> Tọa độ: {infoData.latitude.toFixed(5)}, {infoData.longitude.toFixed(5)}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Thành Phố</label>
                                    <Input value={infoData.city} onChange={e => setInfoData({ ...infoData, city: e.target.value })} className="h-11" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Quận / Huyện</label>
                                    <Input value={infoData.district} onChange={e => setInfoData({ ...infoData, district: e.target.value })} className="h-11" />
                                </div>
                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Mô tả (Giới thiệu sân)</label>
                                    <Textarea value={infoData.description || ''} onChange={e => setInfoData({ ...infoData, description: e.target.value })} className="min-h-[100px] border-slate-300" placeholder="Sân mới xây dựng, thảm cỏ FIFA, có nhà để xe..." />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Liên Hệ & Mạng Xã Hội</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Hotline (Dành cho khách)</label>
                                    <Input value={infoData.phone || ''} onChange={e => setInfoData({ ...infoData, phone: e.target.value })} className="h-11" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Facebook Page URL</label>
                                    <Input value={infoData.fb_url || ''} onChange={e => setInfoData({ ...infoData, fb_url: e.target.value })} className="h-11" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button onClick={handleUpdateInfo} disabled={isUpdating} className="h-11 px-8 font-bold shadow-md shadow-primary/20">
                                {isUpdating ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                            </Button>
                        </div>

                        {/* DANGER ZONE - Only for owners */}
                        {!isStaff && (
                            <div className="pt-8 mt-8 border-t border-red-100">
                                <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" /> Danger Zone
                                </h3>
                                <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-bold text-red-900">Xóa Cơ Sở</div>
                                        <div className="text-xs text-red-700 font-medium">Bạn không thể hoàn tác sau khi hành động này thực hiện.</div>
                                    </div>
                                    <Button variant="outline" onClick={handleDeleteVenue} className="border-red-200 text-red-600 hover:bg-red-100 h-10 font-bold">
                                        <Trash2 className="w-4 h-4 mr-2" /> Xóa Ngay
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Card>

                    <Card className="col-span-1 p-6 shadow-sm border-slate-200 h-fit space-y-6">
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Thiết Lập Vận Hành</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <div className="text-sm font-bold text-slate-800">Tự Động Nhận Lịch</div>
                                    <div className="text-xs text-slate-500 font-medium">Auto-accept bookings</div>
                                </div>
                                <div className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative ${infoData.auto_accept_bookings ? 'bg-primary' : 'bg-slate-300'}`} onClick={() => setInfoData({ ...infoData, auto_accept_bookings: !infoData.auto_accept_bookings })}>
                                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${infoData.auto_accept_bookings ? 'translate-x-6' : ''}`} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Booking tối thiểu</label>
                                    <div className="flex items-center gap-2">
                                        <Input type="number" value={infoData.min_booking_hours} onChange={e => setInfoData({ ...infoData, min_booking_hours: Number(e.target.value) })} className="h-10 text-center font-bold" />
                                        <span className="text-xs font-bold text-slate-500">Giờ</span>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Booking tối đa</label>
                                    <div className="flex items-center gap-2">
                                        <Input type="number" value={infoData.max_booking_hours} onChange={e => setInfoData({ ...infoData, max_booking_hours: Number(e.target.value) })} className="h-10 text-center font-bold" />
                                        <span className="text-xs font-bold text-slate-500">Giờ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* TAB CONTENT: HỒ SƠ PHÁP LÝ */}
            {activeTab === 'verification' && (
                <div className="animate-in slide-in-from-bottom-2 fade-in max-w-4xl mx-auto space-y-6">
                    {/* Hộp Thông Báo */}
                    {!verification ? (
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl">
                            <div className="flex items-start gap-4">
                                <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
                                <div>
                                    <h4 className="text-amber-900 font-bold uppercase tracking-wide">Bạn chưa nộp hồ sơ xét duyệt!</h4>
                                    <p className="text-amber-700 text-sm mt-1 font-medium">Để cơ sở của bạn có thể hiển thị công khai trên DatSan247 và bắt đầu nhận Lịch đặt sân Online, Vui lòng cung cấp <b>Giấy Phép Kinh Doanh</b> hợp lệ và <b>CCCD/CMND</b>.</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`p-5 rounded-xl border flex items-center gap-4 ${verification.status === 'VERIFIED' ? 'bg-emerald-50 border-emerald-200' : 'bg-blue-50 border-blue-200'}`}>
                            {verification.status === 'VERIFIED' ? (
                                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                            ) : (
                                <Info className="w-8 h-8 text-blue-600" />
                            )}
                            <div>
                                <h4 className={`font-bold uppercase tracking-wide ${verification.status === 'VERIFIED' ? 'text-emerald-900' : 'text-blue-900'}`}>
                                    Trạng Thái Hồ Sơ: {verification.status}
                                </h4>
                                <p className={`text-sm mt-1 font-medium ${verification.status === 'VERIFIED' ? 'text-emerald-700' : 'text-blue-700'}`}>
                                    {verification.status === 'VERIFIED' ? 'Hồ sơ pháp lý hợp lệ. Sân đã được kích hoạt!' : 'Hồ sơ đang được Admin kiểm duyệt.'}
                                </p>
                            </div>
                        </div>
                    )}

                    <Card className="p-8 shadow-sm border-slate-200">
                        <h3 className="text-xl font-black text-slate-900 mb-6">Tải lên Bản Sao Hồ Sơ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ImageUploader
                                title="Giấy Phép Kinh Doanh"
                                description="Bản scan rõ nét (JPG, PNG, PDF)"
                                value={verificationDocs.business_license_url}
                                onChange={(url) => setVerificationDocs({ ...verificationDocs, business_license_url: url })}
                                disabled={verification?.status === 'VERIFIED' || verification?.status === 'PENDING'}
                            />
                            <ImageUploader
                                title="Ảnh Chân Dung Chủ Sở Hữu"
                                description="Ảnh chân dung thẳng mặt (JPG, PNG)"
                                value={verificationDocs.owner_photo_url}
                                onChange={(url) => setVerificationDocs({ ...verificationDocs, owner_photo_url: url })}
                                disabled={verification?.status === 'VERIFIED' || verification?.status === 'PENDING'}
                            />
                            <ImageUploader
                                title="CCCD/CMND (Mặt Trước)"
                                description="Chụp rõ mặt trước (JPG, PNG)"
                                value={verificationDocs.id_card_front_url}
                                onChange={(url) => setVerificationDocs({ ...verificationDocs, id_card_front_url: url })}
                                disabled={verification?.status === 'VERIFIED' || verification?.status === 'PENDING'}
                            />
                            <ImageUploader
                                title="CCCD/CMND (Mặt Sau)"
                                description="Chụp rõ mặt sau (JPG, PNG)"
                                value={verificationDocs.id_card_back_url}
                                onChange={(url) => setVerificationDocs({ ...verificationDocs, id_card_back_url: url })}
                                disabled={verification?.status === 'VERIFIED' || verification?.status === 'PENDING'}
                            />
                        </div>

                        {!verification && (
                            <div className="mt-8 flex justify-center">
                                <Button size="lg" onClick={handleVerificationSubmit} disabled={isSubmittingVerification} className="w-full md:w-1/2 h-12 text-base font-bold shadow-md shadow-primary/20">
                                    {isSubmittingVerification ? 'Đang gửi...' : 'Nộp Hồ Sơ Ngay'}
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>
            )}

            {/* TAB CONTENT: GIỜ HOẠT ĐỘNG */}
            {activeTab === 'hours' && (
                <div className="animate-in slide-in-from-bottom-2 fade-in max-w-3xl mx-auto">
                    <Card className="p-0 shadow-sm border-slate-200 overflow-hidden">
                        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Lịch Mở Cửa Định Kỳ</h3>
                                <p className="text-sm text-slate-500 font-medium">Tự động lặp lại hàng tuần.</p>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {DAYS_ORDER.map((day) => {
                                const hour = localHours.find(h => h.day_of_week === day);
                                if (!hour) return null;

                                return (
                                    <div key={day} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors gap-4">
                                        <div className="w-32 font-bold text-slate-800">{DAY_LABELS[day]}</div>
                                        <div className="flex-1 flex items-center gap-4">
                                            <div className="flex items-center gap-2 flex-1 relative">
                                                <TimePicker
                                                    value={hour.opening_time}
                                                    onChange={(val) => updateDayHour(day, 'opening_time', val)}
                                                    disabled={hour.is_closed}
                                                />
                                                <span className="text-slate-400 font-semibold">-</span>
                                                <TimePicker
                                                    value={hour.closing_time}
                                                    onChange={(val) => updateDayHour(day, 'closing_time', val)}
                                                    disabled={hour.is_closed}
                                                />
                                            </div>
                                            <div className="flex items-center gap-3 ml-4 bg-slate-100/50 px-3 py-1.5 rounded-lg border border-slate-200">
                                                <input
                                                    type="checkbox"
                                                    id={`closed-${day}`}
                                                    checked={hour.is_closed}
                                                    onChange={(e) => updateDayHour(day, 'is_closed', e.target.checked)}
                                                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                                                />
                                                <label htmlFor={`closed-${day}`} className="text-xs font-bold text-slate-600 cursor-pointer select-none">Đóng cửa</label>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
                            <Button onClick={handleSaveHours} disabled={isUpdatingHoursPending} className="h-11 px-8 font-bold shadow-md shadow-primary/20">
                                {isUpdatingHoursPending ? 'Đang lưu...' : 'Lưu Toàn Bộ Lịch'}
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* TAB CONTENT: QUẢN LÝ SÂN */}
            {activeTab === 'courts' && (
                <OwnerCourtPanel venueId={venue.id} />
            )}
        </div>
    );
};
