"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { 
    LayoutDashboard, Users, Store, CalendarCheck, 
    CreditCard, DollarSign, MessageSquareDashed, 
    Bell, Image as ImageIcon, Scale, Settings, Tag
} from 'lucide-react';

const MENU_ITEMS = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Tài Khoản & Phân Quyền', path: '/admin/users', icon: Users },
    { name: 'Khuyến Mãi & Voucher', path: '/admin/promotions', icon: Tag },
    { name: 'Quản Lý Các Sân', path: '/admin/venues', icon: Store },
    { name: 'Quản Lý Bookings', path: '/admin/bookings', icon: CalendarCheck },
    { name: 'Đối Soát & Hoa Hồng', path: '/admin/finance/commissions', icon: DollarSign },
    { name: 'Yêu Cầu Rút Tiền', path: '/admin/finance/payouts', icon: CreditCard },
    { name: 'Khứu Nại & Hỗ Trợ', path: '/admin/support', icon: MessageSquareDashed },
    { name: 'Thông Báo Hệ Thống', path: '/admin/notifications', icon: Bell },
    { name: 'Quản Lý Banner', path: '/admin/content/banners', icon: ImageIcon },
    { name: 'Điều Khoản (Policies)', path: '/admin/content/policies', icon: Scale },
    { name: 'Cấu Hình Hệ Thống', path: '/admin/settings', icon: Settings },
];

export const AdminSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="flex items-center gap-2 font-black text-xl text-white tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                        <Store className="w-5 h-5" />
                    </div>
                    DatSan<span className="text-primary">247</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2 mt-2">
                    Nền Tảng
                </div>
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.path);
                    const Icon = item.icon;
                    return (
                        <Link 
                            key={item.path} 
                            href={item.path}
                            className={cn(
                                "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-semibold transition-all",
                                isActive 
                                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                        >
                            <Icon className={cn("w-[18px] h-[18px]", isActive ? "opacity-100" : "opacity-70")} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-800 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">
                        SA
                    </div>
                    <div className="overflow-hidden">
                        <div className="text-sm font-bold text-white truncate">Super Admin</div>
                        <div className="text-xs text-primary font-medium">super@datsan247.vn</div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
