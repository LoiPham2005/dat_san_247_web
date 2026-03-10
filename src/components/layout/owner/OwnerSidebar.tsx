"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { 
    LayoutDashboard, Store, CalendarCheck, 
    CreditCard, Users, Star, Settings, Tag, TrendingUp
} from 'lucide-react';

const MENU_ITEMS = [
    { name: 'Tổng Quan', path: '/owner/dashboard', icon: LayoutDashboard },
    { name: 'Quản Lý Sân Bãi', path: '/owner/venues', icon: Store },
    { name: 'Lịch Đặt Sân', path: '/owner/bookings', icon: CalendarCheck },
    { name: 'Tài Chính & Rút Tiền', path: '/owner/revenue', icon: CreditCard },
    { name: 'Quản Lý Nhân Viên', path: '/owner/staff', icon: Users },
    { name: 'Đánh Giá Của Khách', path: '/owner/reviews', icon: Star },
    { name: 'Khuyến Mãi', path: '/owner/promotions', icon: Tag },
    { name: 'Báo Cáo Thống Kê', path: '/owner/analytics', icon: TrendingUp },
    { name: 'Cài Đặt', path: '/owner/settings', icon: Settings },
];

export const OwnerSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="flex items-center gap-2 font-black text-xl text-white tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                        <Store className="w-5 h-5" />
                    </div>
                    Vendor<span className="text-emerald-500">247</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2 mt-2">
                    Kinh Doanh
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
                                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" 
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
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
                        CN
                    </div>
                    <div className="overflow-hidden">
                        <div className="text-sm font-bold text-white truncate">Chủ Sân</div>
                        <div className="text-xs text-emerald-500 font-medium truncate">owner@datsan247.vn</div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
