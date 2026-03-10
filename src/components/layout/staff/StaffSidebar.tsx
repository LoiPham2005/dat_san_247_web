"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { 
    LayoutDashboard, Headset, ShieldCheck, BookOpenText
} from 'lucide-react';

const MENU_ITEMS = [
    { name: 'Kênh C.S.K.H (Tickets)', path: '/staff/support', icon: Headset },
    { name: 'Báo Cáo & Kiểm Duyệt', path: '/staff/moderation', icon: ShieldCheck },
    { name: 'Tra Cứu Danh Bạ (Lookup)', path: '/staff/lookup', icon: BookOpenText },
];

export const StaffSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="flex items-center gap-2 font-black text-xl text-white tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white">
                        <Headset className="w-5 h-5" />
                    </div>
                    Care<span className="text-sky-500">247</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2 mt-2">
                    NV Nền Tảng
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
                                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/20" 
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
                    <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-500 flex items-center justify-center font-bold">
                        CS
                    </div>
                    <div className="overflow-hidden">
                        <div className="text-sm font-bold text-white truncate">CSKH Platform</div>
                        <div className="text-xs text-sky-500 font-medium truncate">staff@datsan247.vn</div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
