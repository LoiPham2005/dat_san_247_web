"use client";

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { useCustomerProfile, useCustomerPreferences, useCustomerDevices } from '../hooks/useCustomerProfile';
import { 
    User, Settings, Shield, Bell, Smartphone, Target, Monitor, 
    AtSign, Phone, Copy, CheckCircle2, QrCode, Lock, Camera, Star
} from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploader } from '@/components/common/ImageUploader';
import { cn } from '@/lib/utils/cn';

export const CustomerProfileManagement = () => {
    const { profile, isLoading, updateProfile, isUpdating } = useCustomerProfile();
    const [activeTab, setActiveTab] = useState<'INFO' | 'PREFS' | 'NOTIFS' | 'SECURITY'>('INFO');

    if (isLoading || !profile) {
        return <div className="p-12 text-center text-slate-500">Đang tải hồ sơ...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 animate-in slide-in-from-bottom-2 fade-in">
            {/* SIDEBAR */}
            <div className="w-full md:w-64 shrink-0 space-y-2">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 text-center mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center p-1 border-2 border-primary/20 mb-3 overflow-hidden">
                        {profile.avatar_url ? (
                            <img src={profile.avatar_url} alt="A" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <User className="w-8 h-8 text-primary" />
                        )}
                    </div>
                    <h3 className="font-black text-slate-800 text-lg">{profile.full_name}</h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">{profile.email}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <button 
                        className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold transition-colors ${activeTab === 'INFO' ? 'bg-primary/5 text-primary border-r-4 border-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                        onClick={() => setActiveTab('INFO')}
                    >
                        <User className="w-[18px] h-[18px]" /> Thông Tin Cá Nhân
                    </button>
                    <button 
                        className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold transition-colors ${activeTab === 'PREFS' ? 'bg-primary/5 text-primary border-r-4 border-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                        onClick={() => setActiveTab('PREFS')}
                    >
                        <Target className="w-[18px] h-[18px]" /> Sở Thích Thể Thao
                    </button>
                    <button 
                        className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold transition-colors ${activeTab === 'NOTIFS' ? 'bg-primary/5 text-primary border-r-4 border-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                        onClick={() => setActiveTab('NOTIFS')}
                    >
                        <Bell className="w-[18px] h-[18px]" /> Cấu Hình Thông Báo
                    </button>
                    <button 
                        className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold transition-colors ${activeTab === 'SECURITY' ? 'bg-primary/5 text-primary border-r-4 border-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                        onClick={() => setActiveTab('SECURITY')}
                    >
                        <Shield className="w-[18px] h-[18px]" /> Đăng Nhập & Bảo Mật
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 space-y-6">
                {activeTab === 'INFO' && <ProfileInfoTab profile={profile} updateProfile={updateProfile} isUpdating={isUpdating} />}
                {activeTab === 'PREFS' && <ProfilePrefsTab profile={profile} />}
                {activeTab === 'NOTIFS' && <ProfileNotifsTab profile={profile} updateProfile={updateProfile} />}
                {activeTab === 'SECURITY' && <ProfileSecurityTab />}
            </div>
        </div>
    );
};

// ===================================
// TAB PAGES
// ===================================

const ProfileInfoTab = ({ profile, updateProfile, isUpdating }: any) => {
    const [data, setData] = useState({ ...profile });

    const handleCopyInput = (text: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.success("Đã copy: " + text);
    };

    return (
        <Card className="p-6">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-primary" /> Thông Tin Hồ Sơ
            </h3>
            
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                {/* Avatar Section */}
                <div className="w-full md:w-1/3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Ảnh đại diện</label>
                    <div className="relative group">
                        <ImageUploader 
                            value={data.avatar_url || ''} 
                            onChange={(url) => setData({...data, avatar_url: url})}
                            uploadUrl="/users/me/upload"
                            title="Thay đổi ảnh"
                            description="JPG, PNG tối đa 5MB"
                            disabled={isUpdating}
                        />
                        {data.avatar_url && (
                             <div className="mt-4 flex justify-center">
                                <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
                                     <img src={data.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                             </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Họ và Tên</label>
                        <Input value={data.full_name || ''} onChange={e => setData({...data, full_name: e.target.value})} className="h-10 bg-slate-50" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày Sinh</label>
                        <Input type="date" value={data.date_of_birth || ''} onChange={e => setData({...data, date_of_birth: e.target.value})} className="h-10 bg-slate-50" />
                    </div>
                    
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Giới tính</label>
                        <select 
                            value={data.gender || ''} 
                            onChange={e => setData({...data, gender: e.target.value})}
                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">Chưa chọn</option>
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                            <option value="OTHER">Khác</option>
                        </select>
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiểu sử / Giới thiệu</label>
                        <Textarea 
                            rows={3} 
                            value={data.bio || ''} 
                            onChange={e => setData({...data, bio: e.target.value})} 
                            className="bg-slate-50" 
                            placeholder="Một vài dòng về trình độ và sở thích thể thao của bạn..."
                        />
                    </div>
                </div>
            </div>

            <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Thông tin liên lạc</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="relative">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Email</label>
                    <div className="relative">
                        <AtSign className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <Input value={data.email} disabled className="h-10 pl-9 font-medium bg-slate-100 text-slate-500" />
                        <div className="absolute right-2 top-2 px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">Đã xác minh</div>
                    </div>
                </div>
                <div className="relative">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Số điện thoại</label>
                    <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <Input value={data.phone || ''} onChange={e => setData({...data, phone: e.target.value})} className="h-10 pl-9 bg-slate-50" />
                        <button className="absolute right-2 top-2 text-xs font-bold text-primary hover:underline">Xác minh</button>
                    </div>
                </div>
            </div>

            {/* MÃ GIỚI THIỆU */}
            <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Mã Giới Thiệu Của Bạn</h4>
            <div className="flex gap-2">
                <div className="flex-1 bg-indigo-50 border border-indigo-100 rounded-lg p-3 flex justify-between items-center text-indigo-900 font-black">
                    {data.referral_code || 'CHƯA CÓ MÃ'}
                    {data.referral_code && (
                        <button onClick={() => handleCopyInput(data.referral_code)} className="text-indigo-600 hover:text-indigo-800 p-1">
                            <Copy className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-2">Chia sẻ mã này cho bạn bè, cả 2 sẽ nhận voucher khi người đó đặt sân lần đầu tiên.</p>

            <div className="mt-8 flex justify-end">
                <Button onClick={() => updateProfile(data)} disabled={isUpdating} className="h-10 px-8 font-bold shadow-md shadow-primary/20">
                    {isUpdating ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                </Button>
            </div>
        </Card>
    );
};

const ProfilePrefsTab = ({ profile }: any) => {
    const { updatePreferences, isUpdating } = useCustomerPreferences();
    const currentPrefs = profile?.sport_preferences || [];

    const sports = [
        { name: 'FOOTBALL', label: 'Bóng đá', icon: '⚽' },
        { name: 'BADMINTON', label: 'Cầu lông', icon: '🏸' },
        { name: 'TENNIS', label: 'Tennis', icon: '🎾' },
        { name: 'BASKETBALL', label: 'Bóng rổ', icon: '🏀' },
        { name: 'VOLLEYBALL', label: 'Bóng chuyền', icon: '🏐' },
        { name: 'PICKLEBALL', label: 'Pickleball', icon: '🏓' },
        { name: 'PINGPONG', label: 'Bóng bàn', icon: '🏓' },
    ];

    const getSkillLevel = (sportType: string) => {
        const pref = currentPrefs.find((p: any) => p.sport_type === sportType);
        return pref?.skill_level || 0;
    };

    const handleUpdateSkill = (sportType: string, level: number) => {
        updatePreferences({ sport_type: sportType, skill_level: level });
    };

    return (
        <Card className="p-6">
            <h3 className="text-xl font-black text-slate-800 mb-2 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" /> Sở Thích & Trình Độ Thể Thao
            </h3>
            <p className="text-sm text-slate-500 mb-8">Chúng tôi dùng thông tin này để gợi ý bạn bè chơi cùng và các sân phù hợp với trình độ của bạn.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sports.map(sport => {
                    const skill = getSkillLevel(sport.name);
                    return (
                        <div key={sport.name} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-md hover:border-primary/20">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl">
                                        {sport.icon}
                                    </div>
                                    <div className="font-bold text-slate-800">{sport.label}</div>
                                </div>
                                {skill > 0 && (
                                    <div className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-lg uppercase tracking-tight">
                                        Lvl {skill}
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex items-center justify-between bg-white rounded-xl p-2.5 px-3 shadow-inner">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Trình độ</div>
                                <div className="flex gap-1.5">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => handleUpdateSkill(sport.name, level)}
                                            className={cn(
                                                "w-6 h-6 rounded-md flex items-center justify-center transition-all",
                                                skill >= level 
                                                    ? "bg-primary text-white scale-110 shadow-sm" 
                                                    : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                                            )}
                                        >
                                            <Star className={cn("w-3.5 h-3.5", skill >= level && "fill-current")} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

const ProfileNotifsTab = ({ profile, updateProfile }: any) => {
    const [data, setData] = useState({ ...profile });
    
    // Auto save on toggle
    const handleToggle = (key: string, val: boolean) => {
        const newData = { ...data, [key]: val };
        setData(newData);
        updateProfile({ [key]: val });
    };

    const NotifRow = ({ label, desc, stateKey }: { label: string, desc: string, stateKey: string }) => (
        <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 -mx-4 px-4 transition-colors">
            <div>
                <div className="font-bold text-slate-800 text-sm">{label}</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">{desc}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={data[stateKey]} onChange={e => handleToggle(stateKey, e.target.checked)} />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
        </div>
    );

    return (
        <Card className="p-6">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <Bell className="w-6 h-6 text-primary" /> Cấu Hình Thông Báo
            </h3>
            
            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2 text-primary">Kênh Nhận</h4>
                    <NotifRow label="Email" desc="Nhận email về lịch đặt sân, biên lai thanh toán." stateKey="notif_email" />
                    <NotifRow label="Thông báo đẩy (In-App / Push)" desc="Nhận thông báo Real-time trên màn hình điện thoại/web." stateKey="notif_push" />
                    <NotifRow label="Tin nhắn SMS" desc="Nhận SMS mã OTP và mã check-in." stateKey="notif_sms" />
                </div>

                <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2 mt-4 text-primary">Loại Tin Thông Báo</h4>
                    <NotifRow label="Cập nhật Lịch Đặt" desc="Nhắc nhở giờ đá, thay đổi từ chủ sân." stateKey="notif_booking" />
                    <NotifRow label="Khuyến mãi & Voucher" desc="Thông báo khi có mã giảm giá săn sale." stateKey="notif_promotion" />
                    <NotifRow label="Cập nhật Hệ Thống" desc="Thay đổi về chính sách sân, bảo trì hệ thống." stateKey="notif_system" />
                </div>
            </div>
        </Card>
    );
};

const ProfileSecurityTab = () => {
    const { devices, logoutDevice } = useCustomerDevices();
    
    return (
        <div className="space-y-6">
            <Card className="p-6">
                <h3 className="text-xl font-black text-slate-800 mb-2 flex items-center gap-2">
                    <Lock className="w-6 h-6 text-primary" /> Mật Khẩu & Bảo Mật
                </h3>
                <p className="text-sm text-slate-500 mb-6">Mật khẩu nên chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Mật khẩu hiện tại</label>
                        <Input type="password" placeholder="••••••••" className="h-10 bg-slate-50" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Mật khẩu mới</label>
                        <Input type="password" placeholder="••••••••" className="h-10 bg-slate-50" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Xác nhận mật khẩu</label>
                        <Input type="password" placeholder="••••••••" className="h-10 bg-slate-50" />
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <Button className="h-9 px-6 font-bold" onClick={() => toast.success("Cập nhật mật khẩu thành công")}>Đổi Mật Khẩu</Button>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <Monitor className="w-6 h-6 text-primary" /> Thiết Bị Đăng Nhập
                </h3>
                <div className="divide-y divide-slate-100">
                    {devices.map((device: any) => (
                        <div key={device.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-100 rounded-xl">
                                    {device.device_type === 'WEB' ? <Monitor className="w-5 h-5 text-slate-600" /> : <Smartphone className="w-5 h-5 text-slate-600" />}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800 flex items-center gap-2">
                                        {device.device_type} <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 bg-slate-100 rounded">v{device.app_version}</span>
                                    </div>
                                    <div className="text-xs text-slate-500 font-medium mt-1">Hoạt động cuối: {new Date(device.last_active_at).toLocaleString('vi-VN')}</div>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => logoutDevice(device.id)} className="text-rose-600 border-rose-200 hover:bg-rose-50 font-bold px-3 h-8">
                                Đăng xuất
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
