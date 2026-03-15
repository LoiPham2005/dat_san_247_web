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
    { name: 'Thông Tin Cơ Sở', path: '/venue-staff/venue', icon: Info },
    { name: 'Cài Đặt', path: '/venue-staff/settings', icon: Settings },
];

export const VenueStaffSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="flex items-center gap-2 font-black text-xl text-white tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                        <Users className="w-5 h-5" />
                    </div>
                    Vendor<span className="text-indigo-400">Staff</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2 mt-2">
                    Vận Hành
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
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" 
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
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                        M
                    </div>
                    <div className="overflow-hidden">
                        <div className="text-sm font-bold text-white truncate">Quản Lý Venue</div>
                        <div className="text-xs text-indigo-400 font-medium truncate">MANAGER</div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
