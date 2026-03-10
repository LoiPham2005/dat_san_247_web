"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
    LayoutDashboard,
    MapPin,
    CalendarCheck,
    Users,
    BarChart3,
    Settings,
    ChevronLeft,
    MessageSquare,
    BadgeDollarSign
} from 'lucide-react';

export const OwnerSidebar = () => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const menuItems = [
        { name: 'Tổng quan', icon: LayoutDashboard, href: '/owner/dashboard' },
        { name: 'Quản lý sân', icon: MapPin, href: '/owner/venues' },
        { name: 'Lịch đặt sân', icon: CalendarCheck, href: '/owner/bookings' },
        { name: 'Khách hàng', icon: Users, href: '/owner/customers' },
        { name: 'Tài chính', icon: BadgeDollarSign, href: '/owner/finance' },
        { name: 'Phản hồi', icon: MessageSquare, href: '/owner/reviews' },
        { name: 'Báo cáo', icon: BarChart3, href: '/owner/analytics' },
        { name: 'Cài đặt', icon: Settings, href: '/owner/settings' },
    ];

    return (
        <aside
            className={cn(
                "h-screen sticky top-0 bg-slate-900 text-slate-400 transition-all duration-300 border-r border-slate-800 flex flex-col",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xl">
                    D
                </div>
                {!isCollapsed && (
                    <span className="font-bold text-lg text-white tracking-tight animate-in fade-in duration-500">
                        DatSan<span className="text-primary">247</span>
                    </span>
                )}
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 bg-primary text-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform hidden lg:block"
            >
                <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
            </button>

            {/* Nav Menu */}
            <nav className="flex-1 px-3 py-6 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "group-hover:text-primary")} />
                            {!isCollapsed && <span className="text-sm font-semibold truncate">{item.name}</span>}
                            {isActive && !isCollapsed && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Info */}
            <div className="p-4 border-t border-slate-800">
                <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "px-2")}>
                    <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 overflow-hidden">
                        <img src="https://ui-avatars.com/api/?name=Owner&background=10b981&color=fff" alt="Avatar" />
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col truncate">
                            <span className="text-xs font-bold text-white leading-none">Lê Văn Chủ Sân</span>
                            <span className="text-[10px] text-slate-500 mt-1">Quản trị viên</span>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};
