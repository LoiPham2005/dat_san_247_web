"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { 
    LayoutDashboard, Map, CalendarCheck, 
    ConciergeBell, MessageSquare, ClipboardList
} from 'lucide-react';

const MENU_ITEMS = [
    { name: 'Quầy Lễ Tân', path: '/venue-staff/dashboard', icon: LayoutDashboard },
    { name: 'Lịch Đặt Sân', path: '/venue-staff/schedule', icon: CalendarCheck },
    { name: 'Sân Bãi & Sức Chứa', path: '/venue-staff/courts', icon: Map },
    { name: 'Dịch Vụ Đi Kèm', path: '/venue-staff/services', icon: ConciergeBell },
    { name: 'Tin Nhắn & Hỗ Trợ', path: '/venue-staff/messages', icon: MessageSquare },
    { name: 'Báo Cáo Ca Trực', path: '/venue-staff/reports', icon: ClipboardList },
];

export const VenueStaffSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="flex items-center gap-2 font-black text-xl text-white tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-white">
                        <Map className="w-5 h-5" />
                    </div>
                    Staff<span className="text-cyan-500">247</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2 mt-2">
                    Nhiệm Vụ
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
                                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20" 
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
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-500 flex items-center justify-center font-bold">
                        NV
                    </div>
                    <div className="overflow-hidden">
                        <div className="text-sm font-bold text-white truncate">Nhân Viên Sân</div>
                        <div className="text-xs text-cyan-500 font-medium truncate">staff@datsan247.vn</div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
