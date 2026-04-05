"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { 
    LayoutDashboard, Store, CalendarCheck, 
    Users, Star, Settings, FileIcon, TrendingUp, Info
} from 'lucide-react';

const MENU_ITEMS = [
    { name: 'Tổng Quan (Manager)', path: '/venue-staff/dashboard', icon: LayoutDashboard },
    { name: 'Lễ Tân & Check-in', path: '/venue-staff/schedule', icon: CalendarCheck },
    { name: 'Quản Lý Sân Bãi', path: '/venue-staff/courts', icon: Store },
    { name: 'Tất Cả Lịch Đặt', path: '/venue-staff/bookings', icon: CalendarCheck },
    { name: 'Nhân Sự', path: '/venue-staff/staff', icon: Users },
    { name: 'Đánh Giá & Phản Hồi', path: '/venue-staff/reviews', icon: Star },
    // { name: 'Thông Tin Cơ Sở', path: '/venue-staff/venue', icon: Info },
    { name: 'Cài Đặt', path: '/venue-staff/settings', icon: Settings },
];

import { useSidebar } from '@/components/providers/SidebarProvider';

export const VenueStaffSidebar = () => {
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
                    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-500/20">
                        <Users className="w-5 h-5" />
                    </div>
                    {!isCollapsed && <span className="truncate animate-in fade-in slide-in-from-left-2 duration-300">Vendor<span className="text-indigo-400">Staff</span></span>}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
                {!isCollapsed && (
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-3 mb-2 mt-2 animate-in fade-in duration-300">
                        Vận Hành
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
                                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/30" 
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
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-sm shrink-0 border border-indigo-500/20">
                        M
                    </div>
                    {!isCollapsed && (
                        <div className="overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300">
                            <div className="text-sm font-black text-white truncate leading-none mb-1">Quản Lý Venue</div>
                            <div className="text-[10px] text-indigo-400 font-bold truncate tracking-tight uppercase">MANAGER</div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};
