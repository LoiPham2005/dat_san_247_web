'use client';

import { useState, useEffect } from 'react';
import {
    User,
    Wallet,
    Ticket,
    Shield,
    LogOut,
    Camera,
    CreditCard,
    History,
    Check,
    Loader2,
    Save,
    KeyRound,
    Plus,
    ArrowUpRight,
    ArrowDownLeft,
    Tag,
    Clock,
    Sparkles,
    Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/format';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from '@/lib/store/auth.store';
import { useAuth } from '@/lib/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/lib/api/services/user.service';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

import { Select } from "@/components/ui/select";

export default function ProfilePage() {
    const { user: storeUser, updateUser: updateStoreUser } = useAuthStore();
    const { logout } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    // Fetch latest user data
    const { data: userData, isLoading: isFetching } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await userService.getProfile();
            return res.data || res;
        }
    });

    const user = userData || storeUser || { fullName: 'Guest User', email: 'guest@datsan247.com', phone: '', avatarUrl: '', gender: '', dateOfBirth: '', address: '' };

    // Update Profile Mutation
    const updateProfileMutation = useMutation({
        mutationFn: (data: any) => userService.updateProfile(data),
        onSuccess: (updatedUser) => {
            const actualUser = updatedUser.data || updatedUser;
            queryClient.setQueryData(['profile'], actualUser);
            updateStoreUser({
                name: actualUser.fullName,
                avatar: actualUser.avatarUrl,
                phone: actualUser.phone
            });
            toast({
                title: 'Thành công',
                description: 'Thông tin cá nhân đã được cập nhật.',
                className: 'bg-green-600 text-white border-none'
            });
        },
        onError: (error: any) => {
            toast({
                title: 'Lỗi',
                description: error.response?.data?.message || 'Không thể cập nhật hồ sơ.',
                variant: 'destructive'
            });
        }
    });

    // Change Password Mutation
    const changePasswordMutation = useMutation({
        mutationFn: (data: any) => userService.changePassword(data),
        onSuccess: () => {
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            toast({
                title: 'Thành công',
                description: 'Mật khẩu đã được đổi mới.',
                className: 'bg-green-600 text-white border-none'
            });
        },
        onError: (error: any) => {
            toast({
                title: 'Lỗi',
                description: error.response?.data?.message || 'Đổi mật khẩu thất bại.',
                variant: 'destructive'
            });
        }
    });

    // Form States
    const [personalInfo, setPersonalInfo] = useState({
        fullName: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
        address: ''
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            setPersonalInfo({
                fullName: user.fullName || '',
                phone: user.phone || '',
                gender: user.gender || '',
                dateOfBirth: user.dateOfBirth ? format(new Date(user.dateOfBirth), 'yyyy-MM-dd') : '',
                address: user.address || ''
            });
        }
    }, [userData, storeUser]);

    const handleSaveProfile = () => {
        updateProfileMutation.mutate(personalInfo);
    };

    const handleChangePassword = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast({
                title: 'Lỗi',
                description: 'Mật khẩu xác nhận không khớp.',
                variant: 'destructive'
            });
            return;
        }
        changePasswordMutation.mutate({
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword
        });
    };

    if (isFetching && !userData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="h-12 w-12 animate-spin text-primary-600 mb-4" />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Đang tải hồ sơ...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 pt-24 pb-8">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Cài đặt tài khoản</h1>
                <p className="text-gray-500 mt-2 font-medium">Quản lý thông tin cá nhân và thiết lập bảo mật</p>
            </div>

            <Tabs defaultValue="general" orientation="vertical" className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-72 shrink-0">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-2 shadow-sm sticky top-24">
                        <TabsList className="flex flex-col w-full h-auto bg-transparent space-y-1 p-0">
                            <TabsTrigger
                                value="general"
                                className="w-full justify-start px-6 py-4 rounded-2xl data-[state=active]:bg-primary-600 data-[state=active]:text-white dark:data-[state=active]:bg-primary-600 font-bold uppercase text-[10px] tracking-[0.15em] transition-all"
                            >
                                <User className="mr-4 h-5 w-5" /> Thông tin cá nhân
                            </TabsTrigger>
                            <TabsTrigger
                                value="wallet"
                                className="w-full justify-start px-6 py-4 rounded-2xl data-[state=active]:bg-primary-600 data-[state=active]:text-white dark:data-[state=active]:bg-primary-600 font-bold uppercase text-[10px] tracking-[0.15em] transition-all"
                            >
                                <Wallet className="mr-4 h-5 w-5" /> Ví của tôi
                            </TabsTrigger>
                            <TabsTrigger
                                value="vouchers"
                                className="w-full justify-start px-6 py-4 rounded-2xl data-[state=active]:bg-primary-600 data-[state=active]:text-white dark:data-[state=active]:bg-primary-600 font-bold uppercase text-[10px] tracking-[0.15em] transition-all"
                            >
                                <Ticket className="mr-4 h-5 w-5" /> Mã giảm giá
                            </TabsTrigger>
                            <TabsTrigger
                                value="security"
                                className="w-full justify-start px-6 py-4 rounded-2xl data-[state=active]:bg-primary-600 data-[state=active]:text-white dark:data-[state=active]:bg-primary-600 font-bold uppercase text-[10px] tracking-[0.15em] transition-all"
                            >
                                <Shield className="mr-4 h-5 w-5" /> Bảo mật
                            </TabsTrigger>
                            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 w-full px-2">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start px-4 py-4 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl font-bold uppercase text-[10px] tracking-widest"
                                    onClick={() => logout()}
                                >
                                    <LogOut className="mr-4 h-5 w-5" /> Đăng xuất
                                </Button>
                            </div>
                        </TabsList>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="flex-1 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8 md:p-12 shadow-sm min-h-[600px]">

                    {/* General Info */}
                    <TabsContent value="general" className="space-y-10 mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black uppercase tracking-tight">Hồ sơ cá nhân</h2>
                                <p className="text-gray-500 font-medium">Thông tin dùng để quản lý đơn đặt sân và thanh toán.</p>
                            </div>
                            <Button
                                onClick={handleSaveProfile}
                                disabled={updateProfileMutation.isPending}
                                className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl px-10 h-14 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-500/20"
                            >
                                {updateProfileMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Lưu thay đổi
                            </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-10 p-8 bg-gray-50/50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                            <div className="relative group">
                                <div className="h-32 w-32 rounded-full overflow-hidden border-8 border-white dark:border-gray-900 shadow-2xl relative">
                                    <img
                                        src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.fullName}&background=random&bold=true`}
                                        alt="Avatar"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white h-8 w-8" />
                                    </div>
                                </div>
                                <button className="absolute -bottom-2 -right-2 p-3 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 shadow-xl border-4 border-white dark:border-gray-900 z-10 transition-transform hover:scale-110 active:scale-95">
                                    <Camera className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{user.fullName}</h3>
                                <p className="text-primary-600 font-bold bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-lg w-max mt-2 mx-auto sm:mx-0 text-xs uppercase tracking-widest border border-primary-100 dark:border-primary-800">
                                    Thành viên {user.role?.slug || 'Khách'}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Họ và tên</Label>
                                <Input
                                    className="h-16 rounded-2xl px-6 font-bold text-gray-900 dark:text-white border-2 focus:border-primary-500 transition-all"
                                    value={personalInfo.fullName}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Giới tính</Label>
                                <Select
                                    className="h-16 rounded-2xl px-6 font-bold text-gray-900 dark:text-white border-2 focus:border-primary-500 transition-all shadow-none"
                                    value={personalInfo.gender}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                                    options={[
                                        { value: 'MALE', label: 'Nam' },
                                        { value: 'FEMALE', label: 'Nữ' },
                                        { value: 'OTHER', label: 'Khác' }
                                    ]}
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email (Không thể sửa)</Label>
                                <Input
                                    className="h-16 rounded-2xl px-6 font-bold text-gray-400 bg-gray-50/50 border-2"
                                    defaultValue={user.email}
                                    disabled
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Số điện thoại</Label>
                                <Input
                                    placeholder="+84"
                                    className="h-16 rounded-2xl px-6 font-bold text-gray-900 dark:text-white border-2 focus:border-primary-500 transition-all"
                                    value={personalInfo.phone}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Ngày sinh</Label>
                                <Input
                                    type="date"
                                    className="h-16 rounded-2xl px-6 font-bold text-gray-900 dark:text-white border-2 focus:border-primary-500 transition-all"
                                    value={personalInfo.dateOfBirth}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Địa chỉ</Label>
                                <Input
                                    className="h-16 rounded-2xl px-6 font-bold text-gray-900 dark:text-white border-2 focus:border-primary-500 transition-all"
                                    value={personalInfo.address}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* Security */}
                    <TabsContent value="security" className="space-y-10 mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black uppercase tracking-tight">Login & Security</h2>
                            <p className="text-gray-500 font-medium">Bảo vệ tài khoản của bạn bằng mật khẩu mạnh.</p>
                        </div>

                        <div className="space-y-8 max-w-xl bg-gray-50/50 dark:bg-gray-800/50 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Mật khẩu hiện tại</Label>
                                <Input
                                    type="password"
                                    className="h-16 rounded-2xl px-6 font-bold border-2 focus:border-primary-500 transition-all"
                                    value={passwordData.oldPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                />
                            </div>
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Mật khẩu mới</Label>
                                <Input
                                    type="password"
                                    className="h-16 rounded-2xl px-6 font-bold border-2 focus:border-primary-500 transition-all"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                />
                            </div>
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Xác nhận mật khẩu mới</Label>
                                <Input
                                    type="password"
                                    className="h-16 rounded-2xl px-6 font-bold border-2 focus:border-primary-500 transition-all"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                />
                            </div>
                            <Button
                                onClick={handleChangePassword}
                                disabled={changePasswordMutation.isPending}
                                className="w-full h-16 bg-gray-900 border-2 border-gray-900 hover:bg-primary-600 hover:border-primary-600 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-primary-600 dark:hover:text-white dark:hover:border-primary-600 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl transition-all"
                            >
                                {changePasswordMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <KeyRound className="mr-3 h-5 w-5" />}
                                Cập nhật mật khẩu
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Wallet */}
                    <TabsContent value="wallet" className="space-y-10 mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black uppercase tracking-tight">Ví của tôi</h2>
                                <p className="text-gray-500 font-medium">Quản lý số dư và lịch sử giao dịch nạp tiền.</p>
                            </div>
                            <Button
                                className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl px-10 h-14 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-500/20"
                            >
                                <Plus className="mr-2 h-5 w-5" /> Nạp tiền vào ví
                            </Button>
                        </div>

                        {/* Premium Balance Card */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                            <div className="relative bg-gray-900 dark:bg-black rounded-[2.5rem] p-10 overflow-hidden shadow-2xl border border-white/5">
                                {/* Decorative elements */}
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
                                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                                    <div>
                                        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-3 flex items-center gap-2">
                                            <Sparkles className="h-3 w-3 text-primary-400" /> Số dư khả dụng
                                        </p>
                                        <div className="flex items-baseline gap-2">
                                            <h3 className="text-5xl font-black text-white tracking-tighter">1,250,000</h3>
                                            <span className="text-2xl font-black text-primary-500 transition-colors uppercase">đ</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 w-full md:w-auto">
                                        <div className="flex-1 md:flex-none p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                                            <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">Đã tích lũy</p>
                                            <p className="text-lg font-black text-white">+450k</p>
                                        </div>
                                        <div className="flex-1 md:flex-none p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                                            <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">Đã chi tiêu</p>
                                            <p className="text-lg font-black text-white">-2.4M</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-10 border-t border-white/5 flex flex-wrap gap-6 items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                            <Check className="h-5 w-5 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-xs">Tài khoản an toàn</p>
                                            <p className="text-gray-500 text-[10px] font-medium tracking-tight">Đã xác minh bởi DatSan247</p>
                                        </div>
                                    </div>
                                    <div className="h-8 w-px bg-white/5 hidden sm:block" />
                                    <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                        Liên kết ví: <span className="text-primary-500">Momo, VNPAY, ViettelMoney</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Transaction History */}
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-black uppercase tracking-tight text-lg flex items-center gap-3">
                                    <History className="h-5 w-5 text-primary-600" /> Lịch sử giao dịch gần đây
                                </h3>
                                <Button variant="ghost" className="text-primary-600 font-bold uppercase tracking-widest text-[10px] hover:bg-primary-50">Xem toàn bộ <ArrowUpRight className="ml-1 h-3 w-3" /></Button>
                            </div>

                            <div className="grid gap-3">
                                {[
                                    { type: 'topup', title: 'Nạp tiền qua MoMo', amount: '+500,000đ', date: 'Hôm nay, 14:20', status: 'Thành công', icon: ArrowUpRight, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/10' },
                                    { type: 'payment', title: 'Thanh toán Sân bóng FPT #394', amount: '-250,000đ', date: 'Hôm qua, 08:30', status: 'Thành công', icon: ArrowDownLeft, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/10' },
                                    { type: 'payment', title: 'Thanh toán Sân Cầu lông #122', amount: '-120,000đ', date: '21/03/2024', status: 'Thành công', icon: ArrowDownLeft, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/10' },
                                    { type: 'topup', title: 'Nạp tiền qua VNPAY', amount: '+1,000,000đ', date: '20/03/2024', status: 'Thành công', icon: ArrowUpRight, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/10' },
                                ].map((tx, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-white dark:bg-gray-800/30 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-500/5 transition-all group">
                                        <div className="flex items-center gap-5">
                                            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-110", tx.bg, tx.color === 'text-green-600' ? 'border-green-100 dark:border-green-900/20' : 'border-red-100 dark:border-red-900/20')}>
                                                <tx.icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 dark:text-white uppercase tracking-tight">{tx.title}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{tx.date}</span>
                                                    <div className="h-1 w-1 rounded-full bg-gray-300" />
                                                    <Badge variant="outline" className="text-[8px] uppercase h-4 px-1.5 border-green-500 text-green-600 font-black">{tx.status}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={cn("text-xl font-black tracking-tighter", tx.color)}>{tx.amount}</p>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">Giao dịch ví</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="vouchers" className="space-y-10 mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black uppercase tracking-tight">Kho ưu đãi</h2>
                                <p className="text-gray-500 font-medium">Sử dụng mã giảm giá để tối ưu chi phí đặt sân.</p>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <Input placeholder="Nhập mã ưu đãi..." className="h-14 rounded-2xl px-6 bg-gray-50/50 dark:bg-gray-800/50 font-bold flex-1 md:w-64" />
                                <Button className="h-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl px-8 font-black uppercase tracking-widest text-xs">Áp dụng</Button>
                            </div>
                        </div>

                        {/* Vouchers Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: 'GIẢM 50%', desc: 'Cho lượt đặt sân đầu tiên', code: 'NEWBIE50', exp: '31/04/2024', color: 'from-orange-500 to-red-500', badge: 'Hot' },
                                { title: 'GIẢM 20K', desc: 'Đơn đặt sân từ 200k trở lên', code: 'PROMO20K', exp: '15/05/2024', color: 'from-primary-600 to-indigo-600', badge: 'New' },
                                { title: 'GIẢM 15%', desc: 'Khi thanh toán qua ví DatSan247', code: 'EWALLET15', exp: '01/06/2024', color: 'from-green-500 to-teal-500', badge: 'Member' },
                                { title: 'GIẢM 100K', desc: 'Sự kiện chào hè 2024 đặc biệt', code: 'SUMMER24', exp: '20/04/2024', color: 'from-yellow-500 to-orange-500', badge: 'Event' },
                            ].map((v, i) => (
                                <div key={i} className="group relative">
                                    <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 transition-all group-hover:border-primary-500/50" />

                                    <div className="relative flex overflow-hidden rounded-3xl h-44 shadow-lg group-hover:shadow-2xl transition-all group-hover:-translate-y-1">
                                        {/* Left part: Highlight */}
                                        <div className={cn("w-32 shrink-0 bg-gradient-to-br flex flex-col items-center justify-center p-4 relative", v.color)}>
                                            <Tag className="text-white/40 h-10 w-10 absolute top-2 right-2 -rotate-12" />
                                            <h4 className="text-white font-black text-2xl tracking-tighter leading-tight text-center">
                                                {v.title.split(' ')[0]}<br />{v.title.split(' ')[1]}
                                            </h4>

                                            {/* Top & Bottom circles for ticket effect */}
                                            <div className="absolute -top-3 -right-3 w-6 h-6 bg-white dark:bg-gray-900 rounded-full border-r-2 border-b-2 border-gray-100 dark:border-gray-800 z-10" />
                                            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white dark:bg-gray-900 rounded-full border-r-2 border-t-2 border-gray-100 dark:border-gray-800 z-10" />
                                        </div>

                                        {/* Right part: Details */}
                                        <div className="flex-1 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <Badge className="text-[9px] uppercase font-black bg-gray-900 text-white rounded-md h-5 px-1.5">{v.badge}</Badge>
                                                </div>
                                                <p className="font-bold text-gray-900 dark:text-white mt-1 leading-tight">{v.desc}</p>
                                            </div>

                                            <div className="pt-4 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center">
                                                <div className="bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-xl flex items-center gap-2 border border-gray-100 dark:border-gray-700">
                                                    <span className="font-black text-[10px] text-primary-600 uppercase tracking-widest">{v.code}</span>
                                                    <Copy className="h-3 w-3 text-gray-400 cursor-pointer hover:text-primary-600 transition-colors" />
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1 justify-end">
                                                        <Clock className="h-2.5 w-2.5" /> Hết hạn
                                                    </p>
                                                    <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{v.exp}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                </div>
            </Tabs>
        </div>
    );
}
