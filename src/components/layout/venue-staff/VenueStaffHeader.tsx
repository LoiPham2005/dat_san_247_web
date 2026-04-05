"use client";

import React from 'react';
import { Search, User, LogOut, Settings, Menu, PanelLeftOpen } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import { NotificationBell } from '@/features/notification';
import { useSidebar } from '@/components/providers/SidebarProvider';

export const VenueStaffHeader = () => {
    const { data: session } = useSession();
    const { isCollapsed, toggleSidebar } = useSidebar();
    const user = session?.user;

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm transition-all duration-300">
            <div className="flex items-center gap-4 flex-1">
                <button 
                    onClick={toggleSidebar}
                    className="p-1 px-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-200"
                >
                    {isCollapsed ? <PanelLeftOpen className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div className="relative w-full">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm mã booking, sđt khách hàng..." 
                        className="w-full h-10 bg-slate-100 rounded-full pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-100 transition-shadow text-slate-700 font-medium placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <NotificationBell />
                
                <div className="h-4 w-px bg-slate-200 mx-1"></div>
                
                {/* User Dropdown */}
                <div className="relative group">
                    <button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-all focus:outline-none ring-offset-2 focus:ring-2 focus:ring-indigo-100">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm overflow-hidden">
                            {user?.image ? (
                                <img src={user.image} alt={user.name || ''} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-4 h-4" />
                            )}
                        </div>
                        <div className="hidden sm:block text-left mr-1">
                            <p className="text-[11px] font-black text-slate-500 leading-none mb-0.5">STAFF</p>
                            <p className="text-sm font-bold text-slate-800 leading-none">{user?.name || 'Lễ Tân'}</p>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right overflow-hidden p-1.5 z-50">
                        <div className="px-3 py-2.5 border-b border-slate-50 mb-1">
                            <div className="font-bold text-slate-800 truncate text-sm">{user?.name}</div>
                            <div className="text-[10px] text-slate-400 truncate font-semibold uppercase tracking-wider">{user?.email}</div>
                        </div>
                        
                        <div className="space-y-0.5">
                            <button className="w-full flex items-center px-3 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all text-left">
                                <Settings className="w-4 h-4 mr-3 text-slate-400" /> Cài đặt hồ sơ
                            </button>
                            <button 
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="w-full flex items-center px-3 py-2 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-all text-left"
                            >
                                <LogOut className="w-4 h-4 mr-3" /> Đăng xuất tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
