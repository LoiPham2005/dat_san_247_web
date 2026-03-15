"use client";

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { OwnerVenue, VenueVerification } from '../api/owner-venue.api';
import { useOwnerVenueDetail } from '../hooks/useOwnerVenue';
import { ArrowLeft, MapPin, Building2, FileText, Clock, UploadCloud, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { OwnerCourtPanel } from './OwnerCourtPanel';

export const OwnerVenueTabs = ({ venue, onBack }: { venue: OwnerVenue, onBack: () => void }) => {
    const [activeTab, setActiveTab] = useState<'info'|'verification'|'hours'|'courts'>('info');
    const { updateVenue, isUpdating, verification, submitVerification, isSubmittingVerification, operatingHours, updateHour } = useOwnerVenueDetail(venue.id);

    // Form states cho Info
    const [infoData, setInfoData] = useState({ ...venue });

    // Handle form submit Info
    const handleUpdateInfo = () => {
        updateVenue(infoData);
    };

    const handleVerificationSubmit = () => {
        submitVerification({
            business_license_url: 'https://example.com/mock-license.jpg',
            id_card_front_url: 'https://example.com/mock-cccd-front.jpg',
            id_card_back_url: 'https://example.com/mock-cccd-back.jpg'
        });
    };

    return (
        <div className="space-y-6">
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

            {/* TABS */}
            <div className="flex space-x-2 border-b border-slate-200">
                <button 
                    className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'info' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('info')}
                >
                    <Building2 className="w-4 h-4" /> Thông Tin Chính
                </button>
                <button 
                    className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'verification' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('verification')}
                >
                    <FileText className="w-4 h-4" /> Hồ Sơ Pháp Lý
                </button>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 fade-in">
                    <Card className="col-span-2 p-6 shadow-sm border-slate-200 space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Cơ Bản</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Tên Cơ Sở Thương Mại <span className="text-red-500">*</span></label>
                                    <Input value={infoData.name} onChange={e => setInfoData({...infoData, name: e.target.value})} className="h-11 font-semibold" />
                                </div>
                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Địa chỉ cụ thể <span className="text-red-500">*</span></label>
                                    <Input value={infoData.address} onChange={e => setInfoData({...infoData, address: e.target.value})} className="h-11 border-slate-300" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Thành Phố</label>
                                    <Input value={infoData.city} onChange={e => setInfoData({...infoData, city: e.target.value})} className="h-11" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Quận / Huyện</label>
                                    <Input value={infoData.district} onChange={e => setInfoData({...infoData, district: e.target.value})} className="h-11" />
                                </div>
                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Mô tả (Giới thiệu sân)</label>
                                    <Textarea value={infoData.description || ''} onChange={e => setInfoData({...infoData, description: e.target.value})} className="min-h-[100px] border-slate-300" placeholder="Sân mới xây dựng, thảm cỏ FIFA, có nhà để xe..." />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Liên Hệ & Mạng Xã Hội</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Hotline (Dành cho khách)</label>
                                    <Input value={infoData.phone || ''} onChange={e => setInfoData({...infoData, phone: e.target.value})} className="h-11" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Facebook Page URL</label>
                                    <Input value={infoData.fb_url || ''} onChange={e => setInfoData({...infoData, fb_url: e.target.value})} className="h-11" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button onClick={handleUpdateInfo} disabled={isUpdating} className="h-11 px-8 font-bold shadow-md shadow-primary/20">
                                {isUpdating ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                            </Button>
                        </div>
                    </Card>

                    <Card className="col-span-1 p-6 shadow-sm border-slate-200 h-fit space-y-6">
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Thiết Lập Vận Hành</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <div className="text-sm font-bold text-slate-800">Tự Động Nhận Lịch</div>
                                    <div className="text-xs text-slate-500 font-medium">Auto-accept bookings (Không cần duyệt tay)</div>
                                </div>
                                <div className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative ${infoData.auto_accept_bookings ? 'bg-primary' : 'bg-slate-300'}`} onClick={() => setInfoData({...infoData, auto_accept_bookings: !infoData.auto_accept_bookings})}>
                                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${infoData.auto_accept_bookings ? 'translate-x-6' : ''}`} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Booking tối thiểu</label>
                                    <div className="flex items-center gap-2">
                                        <Input type="number" value={infoData.min_booking_hours} onChange={e => setInfoData({...infoData, min_booking_hours: Number(e.target.value)})} className="h-10 text-center font-bold" />
                                        <span className="text-xs font-bold text-slate-500">Giờ</span>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Booking tối đa</label>
                                    <div className="flex items-center gap-2">
                                        <Input type="number" value={infoData.max_booking_hours} onChange={e => setInfoData({...infoData, max_booking_hours: Number(e.target.value)})} className="h-10 text-center font-bold" />
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
                                    <p className="text-amber-700 text-sm mt-1 font-medium">Để cơ sở của bạn có thể hiển thị công khai trên DatSan247 và bắt đầu nhận Lịch đặt sân Online, Vui lòng cung cấp <b>Giấy Phép Kinh Doanh</b> hợp lệ và <b>CCCD/CMND</b> Mặt trước, sau.</p>
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
                                    {verification.status === 'VERIFIED' ? 'Hồ sơ pháp lý hợp lệ. Sân đã được kích hoạt!' : 'Hồ sơ đang được Admin kiểm duyệt. Thường mất khoảng 2-4 giờ.'}
                                </p>
                            </div>
                        </div>
                    )}

                    <Card className="p-8 shadow-sm border-slate-200">
                        <h3 className="text-xl font-black text-slate-900 mb-6">Tải lên Bản Sao Hồ Sơ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                                <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                    <UploadCloud className="w-8 h-8 text-primary" />
                                </div>
                                <h4 className="font-bold text-slate-800">Giấy Phép Đăng Ký Kinh Doanh</h4>
                                <p className="text-xs text-slate-500 mt-2 font-medium">Ảnh chụp rõ nét bản gốc (JPG, PNG, PDF)</p>
                            </div>
                            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                                <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                    <UploadCloud className="w-8 h-8 text-primary" />
                                </div>
                                <h4 className="font-bold text-slate-800">CCCD/CMND (2 Mặt)</h4>
                                <p className="text-xs text-slate-500 mt-2 font-medium">Chủ sở hữu đứng tên trên GPKD (JPG, PNG)</p>
                            </div>
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
                                <p className="text-sm text-slate-500 font-medium">Tự động lặp lại hàng tuần. Bạn có thể set ngoại lệ (Ngày Lễ) trong phần Cài đặt khác.</p>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map((day) => {
                                const hour = operatingHours.find(h => h.day_of_week === day);
                                const dayLabels: Record<string, string> = { MONDAY: 'Thứ 2', TUESDAY: 'Thứ 3', WEDNESDAY: 'Thứ 4', THURSDAY: 'Thứ 5', FRIDAY: 'Thứ 6', SATURDAY: 'Thứ 7', SUNDAY: 'Chủ Nhật' };
                                
                                return (
                                    <div key={day} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors gap-4">
                                        <div className="w-32 font-bold text-slate-800">{dayLabels[day]}</div>
                                        {hour ? (
                                            <div className="flex-1 flex items-center gap-4">
                                                <div className="flex items-center gap-2 flex-1">
                                                    <Input type="time" defaultValue={hour.opening_time} className="h-10 w-full" disabled={hour.is_closed} />
                                                    <span className="text-slate-400 font-semibold">-</span>
                                                    <Input type="time" defaultValue={hour.closing_time} className="h-10 w-full" disabled={hour.is_closed} />
                                                </div>
                                                <div className="flex items-center gap-2 ml-4">
                                                    <input type="checkbox" id={`closed-${day}`} 
                                                           defaultChecked={hour.is_closed} 
                                                           className="w-4 h-4 rounded text-rose-500 focus:ring-rose-500 border-slate-300"
                                                    />
                                                    <label htmlFor={`closed-${day}`} className="text-sm font-bold text-slate-600 cursor-pointer">Nghỉ (Đóng Cửa)</label>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex-1 text-sm text-slate-400 font-medium italic">Chưa thiết lập (Mặc định: 00:00 - 23:59)</div>
                                        )}
                                        <Button variant="outline" size="sm" className="hidden border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 ml-4">Lưu</Button>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                             <Button className="h-10 px-6 font-bold">Lưu Toàn Bộ Lịch</Button>
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
