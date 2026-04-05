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
    { name: 'Tài Chính & Doanh Thu', path: '/owner/finance', icon: CreditCard },
    { name: 'Quản Lý Nhân Viên', path: '/owner/staff', icon: Users },
    { name: 'Đánh Giá Của Khách', path: '/owner/reviews', icon: Star },
    { name: 'Khuyến Mãi', path: '/owner/promotions', icon: Tag },
    { name: 'Báo Cáo Thống Kê', path: '/owner/analytics', icon: TrendingUp },
    { name: 'Cài Đặt', path: '/owner/settings', icon: Settings },
];

import { useSidebar } from '@/components/providers/SidebarProvider';

export const OwnerSidebar = () => {
    const pathname = usePathname();
    const { isCollapsed } = useSidebar();

    return (
        <aside className={cn(
            "bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out z-50 shadow-2xl",
            isCollapsed ? "w-20" : "w-64"
        )}>
            <div className={cn(
                "h-16 flex items-center border-b border-slate-800 transition-all duration-300",
                isCollapsed ? "justify-center px-0" : "px-6"
            )}>
                <div className="flex items-center gap-2 font-black text-xl text-white tracking-tight shrink-0 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
                        <Store className="w-5 h-5" />
                    </div>
                    {!isCollapsed && <span className="animate-in fade-in slide-in-from-left-2 duration-300">Vendor<span className="text-emerald-500">247</span></span>}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
                {!isCollapsed && (
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 mb-2 mt-2 animate-in fade-in duration-300">
                        Kinh Doanh
                    </div>
                )}
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.path);
                    const Icon = item.icon;
                    return (
                        <Link 
                            key={item.path} 
                            href={item.path}
                            title={isCollapsed ? item.name : ""}
                            className={cn(
                                "flex items-center w-full rounded-xl text-sm font-bold transition-all duration-200 group relative",
                                isCollapsed ? "justify-center h-12 p-0 mb-1" : "gap-3 px-4 py-3 mb-1",
                                isActive 
                                    ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/30" 
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                        >
                            <Icon className={cn("shrink-0", isCollapsed ? "w-6 h-6" : "w-5 h-5", isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100")} />
                            {!isCollapsed && <span className="truncate animate-in fade-in slide-in-from-left-2 duration-300">{item.name}</span>}
                            
                            {isCollapsed && isActive && (
                                <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full"></div>
                            )}
                        </Link>
                    );
                })}
            </div>

            <div className={cn(
                "p-4 border-t border-slate-800 transition-all duration-300",
                isCollapsed ? "flex justify-center" : ""
            )}>
                <div className={cn(
                    "bg-slate-800/50 rounded-2xl p-3 flex items-center transition-all duration-300 border border-white/5",
                    isCollapsed ? "w-12 h-12 p-0 justify-center" : "gap-3"
                )}>
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black text-sm shrink-0 border border-emerald-500/20">
                        CN
                    </div>
                    {!isCollapsed && (
                        <div className="overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300">
                            <div className="text-sm font-black text-white truncate leading-none mb-1">Chủ Sân</div>
                            <div className="text-[10px] text-emerald-500 font-bold truncate tracking-tight">owner@datsan247.vn</div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};
