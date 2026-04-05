"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { 
    LayoutDashboard, Users, Store, CalendarCheck, 
    CreditCard, DollarSign, MessageSquareDashed, 
    Bell, Image as ImageIcon, Scale, Settings, Tag, Wallet
} from 'lucide-react';

const MENU_ITEMS = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Tài Khoản & Phân Quyền', path: '/admin/users', icon: Users },
    { name: 'Khuyến Mãi & Voucher', path: '/admin/promotions', icon: Tag },
    { name: 'Quản Lý Các Sân', path: '/admin/venues', icon: Store },
    { name: 'Quản Lý Bookings', path: '/admin/bookings', icon: CalendarCheck },
    { name: 'Đối Soát & Hoa Hồng', path: '/admin/finance/commissions', icon: DollarSign },
    { name: 'Phí Duy Trì Sân', path: '/admin/finance/subscriptions', icon: CreditCard },
    { name: 'Yêu Cầu Rút Tiền', path: '/admin/finance/payouts', icon: Wallet },
    { name: 'Khứu Nại & Hỗ Trợ', path: '/admin/support', icon: MessageSquareDashed },
    { name: 'Thông Báo Hệ Thống', path: '/admin/notifications', icon: Bell },
    { name: 'Quản Lý Banner', path: '/admin/content/banners', icon: ImageIcon },
    { name: 'Điều Khoản (Policies)', path: '/admin/content/policies', icon: Scale },
    { name: 'Cấu Hình Hệ Thống', path: '/admin/settings', icon: Settings },
];

import { useSidebar } from '@/components/providers/SidebarProvider';

export const AdminSidebar = () => {
    const pathname = usePathname();
    const { isCollapsed } = useSidebar();

    return (
        <aside className={cn(
            "bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out z-50",
            isCollapsed ? "w-20" : "w-64"
        )}>
            <div className={cn(
                "h-16 flex items-center border-b border-slate-800 transition-all duration-300 overflow-hidden",
                isCollapsed ? "justify-center px-0" : "px-6"
            )}>
                <div className="flex items-center gap-2 font-black text-xl text-white tracking-tight shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                        <Store className="w-5 h-5" />
                    </div>
                    {!isCollapsed && <span className="truncate animate-in fade-in slide-in-from-left-2 duration-300">DatSan<span className="text-primary">247</span></span>}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
                {!isCollapsed && (
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-3 mb-2 mt-2 animate-in fade-in duration-300">
                        Nền Tảng
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
                                    ? "bg-primary text-white shadow-xl shadow-primary/30" 
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
                    "bg-slate-800/50 rounded-2xl p-3 flex items-center transition-all duration-500 border border-white/5",
                    isCollapsed ? "w-12 h-12 p-0 justify-center" : "gap-3"
                )}>
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-black text-sm shrink-0 border border-slate-600/30 text-slate-300">
                        SA
                    </div>
                    {!isCollapsed && (
                        <div className="overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300">
                            <div className="text-sm font-black text-white truncate leading-none mb-1">Super Admin</div>
                            <div className="text-[10px] text-primary font-bold truncate tracking-tight">super@datsan247.vn</div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};
