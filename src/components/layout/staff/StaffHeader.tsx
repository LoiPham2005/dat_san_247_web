"use client";

import React from 'react';
import { Search, Menu, User, LogOut, PanelLeftOpen } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { NotificationBell } from '@/features/notification';

import { useSidebar } from '@/components/providers/SidebarProvider';

export const StaffHeader = () => {
    const { data: session } = useSession();
    const { isCollapsed, toggleSidebar } = useSidebar();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleSidebar}
                    className="p-1 px-2 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-all border border-transparent hover:border-sky-200"
                >
                    {isCollapsed ? <PanelLeftOpen className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div className="relative hidden md:block w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Tìm Ticket, Tên khách hàng..."
                        className="pl-9 h-9 border-slate-200 bg-slate-50 focus:bg-white text-sm focus:border-sky-500 focus:ring-sky-500/20"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <NotificationBell />

                <div className="h-8 w-px bg-slate-200 mx-2"></div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:block text-right">
                        <div className="text-sm font-bold text-slate-900 leading-none">
                            {session?.user?.name || 'CSKH'}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                            Nhân viên hỗ trợ
                        </div>
                    </div>
                    <div className="relative group">
                        <button className="w-10 h-10 rounded-full border-2 border-slate-200 overflow-hidden focus:outline-none focus:border-sky-500 transition-colors">
                            {session?.user?.image ? (
                                <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                    <User className="w-5 h-5 text-slate-500" />
                                </div>
                            )}
                        </button>
                        
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right">
                            <div className="p-2 space-y-1">
                                <Button 
                                    variant="ghost" 
                                    className="w-full justify-start text-sm h-9 text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-medium"
                                    onClick={() => signOut({ callbackUrl: '/login' })}
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Đăng xuất
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
