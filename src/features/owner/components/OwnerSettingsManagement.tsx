"use client";

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { User, Bell, Shield, Tag, Camera, Mail, Phone, MapPin, CheckCircle2, AlertCircle, Lock, Activity } from 'lucide-react';
import { useSession } from 'next-auth/react';

// Tabs
type SettingTab = 'profile' | 'notifications' | 'security' | 'referral';

export const OwnerSettingsManagement = () => {
    const { data: session } = useSession();
    const user: any = session?.user;
    const [activeTab, setActiveTab] = useState<SettingTab>('profile');
    const [isSaving, setIsSaving] = useState(false);

    // Mock states for form fields
    const [profile, setProfile] = useState({
        fullName: user?.full_name || 'Nguyễn Văn Chủ Sân',
        email: user?.email || 'owner@datsan247.vn',
        phone: user?.phone || '0987654321',
        gender: 'MALE',
        bio: 'Quản lý tổ hợp thể thao 5 sao tại Hà Nội',
        address: 'Số 1 Phạm Văn Đồng',
        city: 'Hà Nội',
        district: 'Cầu Giấy'
    });

    const [notif, setNotif] = useState({
        push: true,
        email: true,
        sms: false,
        booking: true,
        promotion: false,
        payment: true,
        system: true,
        staff: true
    });

    const handleSave = async () => {
        setIsSaving(true);
        // Giả lập API call
        setTimeout(() => {
            setIsSaving(false);
            // toast success có thể xử lý ở trang cha hoặc thêm sonner toast
        }, 800);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-in slide-in-from-bottom-2 fade-in">
            {/* Sidebar Menu */}
            <div className="w-full lg:w-64 flex-shrink-0">
                <Card className="p-2 border-none shadow-sm sticky top-6">
                    <nav className="space-y-1">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${
                                activeTab === 'profile' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <User className={`w-5 h-5 ${activeTab === 'profile' ? 'text-emerald-600' : 'text-slate-400'}`} />
                            Hồ sơ cá nhân
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${
                                activeTab === 'notifications' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <Bell className={`w-5 h-5 ${activeTab === 'notifications' ? 'text-emerald-600' : 'text-slate-400'}`} />
                            Cài đặt thông báo
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${
                                activeTab === 'security' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <Shield className={`w-5 h-5 ${activeTab === 'security' ? 'text-emerald-600' : 'text-slate-400'}`} />
                            Bảo mật & Mật khẩu
                        </button>
                        <button
                            onClick={() => setActiveTab('referral')}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${
                                activeTab === 'referral' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <Tag className={`w-5 h-5 ${activeTab === 'referral' ? 'text-emerald-600' : 'text-slate-400'}`} />
                            Mã giới thiệu (Referral)
                        </button>
                    </nav>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
                {activeTab === 'profile' && (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                        <Card className="p-6 md:p-8 border-none shadow-sm">
                            <h2 className="text-xl font-black text-slate-800 mb-6">Thông Tin Cơ Bản</h2>
                            
                            <div className="flex flex-col md:flex-row gap-8 items-start mb-8 pb-8 border-b border-slate-100">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative w-32 h-32 rounded-full border-4 border-slate-50 overflow-hidden bg-slate-100 flex items-center justify-center group shadow-sm">
                                        {user?.avatar_url ? (
                                            <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-12 h-12 text-slate-300" />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Camera className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium">JPEG, PNG tối đa 5MB</p>
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-slate-700">Họ và Tên</label>
                                        <Input 
                                            value={profile.fullName} 
                                            onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                                            className="h-11 bg-slate-50/50"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-slate-700">Giới Tính</label>
                                        <select 
                                            value={profile.gender}
                                            onChange={(e) => setProfile({...profile, gender: e.target.value})}
                                            className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                                        >
                                            <option value="MALE">Nam</option>
                                            <option value="FEMALE">Nữ</option>
                                            <option value="OTHER">Hãng khác</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-slate-700">Tiểu sử (Bio)</label>
                                        <textarea 
                                            value={profile.bio}
                                            onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none h-24"
                                            placeholder="Giới thiệu bản thân..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-black text-slate-800 mb-6">Thông Tin Liên Hệ</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-slate-400" /> Email
                                    </label>
                                    <div className="relative">
                                        <Input 
                                            value={profile.email} 
                                            disabled // Thường không cho tự sửa email
                                            className="h-11 bg-slate-100 text-slate-500 pl-10"
                                        />
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                            <CheckCircle2 className="w-3 h-3" /> Đã xác minh
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-slate-400" /> Số điện thoại
                                    </label>
                                    <div className="relative">
                                        <Input 
                                            value={profile.phone} 
                                            disabled
                                            className="h-11 bg-slate-100 text-slate-500"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                            <CheckCircle2 className="w-3 h-3" /> Đã xác minh
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400" /> Địa chỉ
                                    </label>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <Input 
                                            value={profile.address} 
                                            onChange={(e) => setProfile({...profile, address: e.target.value})}
                                            className="h-11 flex-1 bg-slate-50/50"
                                            placeholder="Số nhà, Tên đường"
                                        />
                                        <div className="flex gap-4 w-full md:w-auto">
                                            <Input 
                                                value={profile.district} 
                                                onChange={(e) => setProfile({...profile, district: e.target.value})}
                                                className="h-11 w-full md:w-32 bg-slate-50/50"
                                                placeholder="Quận/Huyện"
                                            />
                                            <Input 
                                                value={profile.city} 
                                                onChange={(e) => setProfile({...profile, city: e.target.value})}
                                                className="h-11 w-full md:w-32 bg-slate-50/50"
                                                placeholder="Thành phố"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <Button 
                                    onClick={handleSave} 
                                    disabled={isSaving}
                                    className="h-11 px-8 bg-emerald-600 hover:bg-emerald-700 font-bold shadow-md shadow-emerald-600/20"
                                >
                                    {isSaving ? "Đang xử lý..." : "Lưu Thay Đổi"}
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                        <Card className="p-6 border-none shadow-sm">
                            <div className="mb-6">
                                <h2 className="text-xl font-black text-slate-800">Cài Đặt Nhận Thông Báo</h2>
                                <p className="text-sm text-slate-500 font-medium mt-1">Tuỳ chỉnh cách chúng tôi liên lạc với bạn qua từng kênh.</p>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Kênh Liên Lạc */}
                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <Bell className="w-5 h-5 text-indigo-500" /> Kênh Thông Báo Chung
                                    </h3>
                                    <div className="grid gap-4">
                                        <ToggleRow 
                                            title="Thông báo Đẩy ứng dụng (Push)" 
                                            desc="Nhận thông báo push Notification ngay trên trình duyệt và thiết bị di động." 
                                            checked={notif.push} 
                                            onChange={(val: boolean) => setNotif({...notif, push: val})} 
                                        />
                                        <ToggleRow 
                                            title="Thông báo Email" 
                                            desc="Nhận thông báo tổng hợp hoặc các cập nhật quan trọng qua email." 
                                            checked={notif.email} 
                                            onChange={(val: boolean) => setNotif({...notif, email: val})} 
                                        />
                                        <ToggleRow 
                                            title="SMS qua tin nhắn (Mất phí)" 
                                            desc="Nhắn tin vào số điện thoại mỗi khi có biến động giao dịch quan trọng." 
                                            checked={notif.sms} 
                                            onChange={(val: boolean) => setNotif({...notif, sms: val})} 
                                        />
                                    </div>
                                </div>

                                {/* Loại sự kiện */}
                                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-orange-500" /> Chủ Đề Sự Kiện Bạn Muốn Nhận
                                    </h3>
                                    <div className="grid gap-4">
                                        <ToggleRow 
                                            title="Lịch đặt sân (Bookings)" 
                                            desc="Khi có khách đặt sân mới, xác nhận hoặc hủy." 
                                            checked={notif.booking} 
                                            onChange={(val: boolean) => setNotif({...notif, booking: val})} 
                                        />
                                        <ToggleRow 
                                            title="Thao tác Thanh Toán" 
                                            desc="Khi khoản thanh toán thành công, hoàn lại tiền khách, ví thay đổi số dư." 
                                            checked={notif.payment} 
                                            onChange={(val: boolean) => setNotif({...notif, payment: val})} 
                                        />
                                        <ToggleRow 
                                            title="Hoạt động Nhân viên Cơ sở" 
                                            desc="Nhận báo cáo nếu nhân viên vận hành của bạn thực hiện duyệt yêu cầu lạ." 
                                            checked={notif.staff} 
                                            onChange={(val: boolean) => setNotif({...notif, staff: val})} 
                                        />
                                        <ToggleRow 
                                            title="Chương trình Khuyến Mãi nền tảng (Platform Promo)" 
                                            desc="Khi ứng dụng DatSan247 tung vouchers hỗ trợ giảm giá chung." 
                                            checked={notif.promotion} 
                                            onChange={(val: boolean) => setNotif({...notif, promotion: val})} 
                                        />
                                        <ToggleRow 
                                            title="Hệ thống & Cập nhật bảo mật" 
                                            desc="Báo cáo khi cần thiết về rủi ro, cập nhật version mới của hệ thống (bắt buộc)." 
                                            checked={true} 
                                            disabled={true} // System Notif is always ON
                                            onChange={() => {}} 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <Button 
                                    onClick={handleSave} 
                                    disabled={isSaving}
                                    className="h-11 px-8 bg-emerald-600 hover:bg-emerald-700 font-bold shadow-md shadow-emerald-600/20"
                                >
                                    {isSaving ? "Đang xử lý..." : "Cập Nhật Cài Đặt"}
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                        <Card className="p-6 md:p-8 border-none shadow-sm">
                            <div className="mb-6 flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-black text-slate-800">Bảo Mật & Mật Khẩu</h2>
                                    <p className="text-sm text-slate-500 font-medium mt-1">Đảm bảo an toàn tuyệt đối cho tài sản và chuỗi cở sở của bạn.</p>
                                </div>
                                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                                    <Shield className="w-3.5 h-3.5" /> An Toàn
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* KYC Status */}
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                                            <Shield className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800">Xác Minh Danh Tính KYC</h3>
                                            <p className="text-sm text-slate-500 font-medium">Bạn đã đăng tải CCCD/GPKD đối chứng hợp lệ với Dat San 247.</p>
                                        </div>
                                    </div>
                                    <div className="text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 whitespace-nowrap">
                                        <CheckCircle2 className="w-4 h-4" /> Đã Xác Minh
                                    </div>
                                </div>

                                {/* Password Change Form */}
                                <div className="pt-6 border-t border-slate-100">
                                    <h3 className="font-bold text-slate-800 mb-5">Đổi Mật Khẩu Truy Cập</h3>
                                    <div className="max-w-md space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-slate-700">Mật khẩu hiện tại</label>
                                            <Input type="password" placeholder="••••••••" className="h-11 bg-slate-50" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-slate-700">Mật khẩu mới</label>
                                            <Input type="password" placeholder="••••••••" className="h-11 bg-slate-50" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-slate-700">Nhập lại mật khẩu mới</label>
                                            <Input type="password" placeholder="••••••••" className="h-11 bg-slate-50" />
                                            <p className="text-xs font-medium text-slate-400 mt-2">Mật khẩu phải chứa ít nhất 8 ký tự mã hóa, bao gồm số và kí tự đặc biệt (VD: !, @, #).</p>
                                        </div>
                                        <Button className="w-full mt-4 h-11 bg-slate-800 hover:bg-slate-900 font-bold">Lưu Mật Khẩu</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'referral' && (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                        <Card className="p-6 md:p-8 border-none shadow-sm relative overflow-hidden bg-emerald-600 text-white">
                            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                            
                            <div className="relative z-10">
                                <h2 className="text-2xl font-black mb-2">Chương Trình Đối Tác Giới Thiệu</h2>
                                <p className="text-emerald-100 font-medium max-w-lg leading-relaxed mb-8">
                                    Giới thiệu chủ sân mới sử dụng phần mềm Đặt Sân 247 và nhận ngay <strong className="text-white">chênh lệch 0.5% hoa hồng</strong> trên mỗi giao dịch của họ trong 12 tháng đầu tiên!
                                </p>

                                <div className="bg-emerald-700/50 border border-emerald-500 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl backdrop-blur-sm">
                                    <div className="flex-1">
                                        <p className="text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">Mã Giới Thiệu Của Bạn</p>
                                        <div className="font-mono text-xl sm:text-2xl font-black tracking-[0.2em]">{user?.profile?.referral_code || 'DS247-OWNER-K9X'}</div>
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        className="bg-white text-emerald-700 border-none font-bold hover:bg-emerald-50 h-10 px-6 shrink-0 w-full sm:w-auto"
                                        onClick={() => {
                                            navigator.clipboard.writeText(user?.profile?.referral_code || 'DS247-OWNER-K9X');
                                            // Mock toast
                                        }}
                                    >
                                        Sao chép mã
                                    </Button>
                                </div>
                                
                                <div className="mt-8 grid grid-cols-3 gap-6 text-center divide-x divide-emerald-500/50 p-6 bg-black/10 rounded-2xl border border-white/5 max-w-xl">
                                    <div>
                                        <div className="text-3xl font-black mb-1 text-white">0</div>
                                        <div className="text-xs font-bold text-emerald-200 uppercase">Người Đã Tham Gia</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black mb-1 text-white">0đ</div>
                                        <div className="text-xs font-bold text-emerald-200 uppercase">Hoa Hồng Nhận Được</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black mb-1 text-white text-emerald-300">0.5%</div>
                                        <div className="text-xs font-bold text-emerald-200 uppercase">Tỷ Lệ Thưởng</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper component for Toggle settings
const ToggleRow = ({ title, desc, checked, onChange, disabled = false }: any) => {
    return (
        <div className={`flex items-center justify-between p-3 rounded-xl transition-colors ${checked ? 'bg-white' : 'bg-transparent'} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}>
            <div className="pr-4">
                <div className="font-bold text-slate-800 text-sm mb-0.5">{title}</div>
                <div className="text-xs text-slate-500 font-medium">{desc}</div>
            </div>
            <button 
                type="button" 
                disabled={disabled}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${checked ? 'bg-emerald-500' : 'bg-slate-300'}`}
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
            >
                <span className="sr-only">Toggle {title}</span>
                <span aria-hidden="true" className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
        </div>
    );
};
