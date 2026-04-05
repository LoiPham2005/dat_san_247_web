"use client";

import React from 'react';
import { Search, Menu, User, LogOut, PanelLeftOpen } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { NotificationBell } from '@/features/notification';
import { useSidebar } from '@/components/providers/SidebarProvider';
import { useOwnerFacility } from '@/features/owner/context/OwnerFacilityContext';

export const OwnerHeader = () => {
    const { data: session } = useSession();
    const { venues, selectedVenueId, setSelectedVenueId, isLoading } = useOwnerFacility();
    const { isCollapsed, toggleSidebar } = useSidebar();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleSidebar}
                    className="p-1 px-2 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all border border-transparent hover:border-emerald-200"
                >
                    {isCollapsed ? <PanelLeftOpen className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div className="relative hidden md:block w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Tìm kiếm booking, khách hàng..."
                        className="pl-9 h-9 border-slate-200 bg-slate-50 focus:bg-white text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Facility Selector */}
                <div className="hidden sm:flex items-center gap-2 mr-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Cơ sở:</span>
                    <select 
                        value={selectedVenueId || ''} 
                        onChange={(e) => setSelectedVenueId(e.target.value)}
                        className="h-9 px-3 pr-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white font-bold text-xs text-slate-800 outline-none focus:border-emerald-500 transition-all cursor-pointer"
                        disabled={isLoading || venues.length === 0}
                    >
                        {isLoading ? (
                            <option value="">Đang tải...</option>
                        ) : venues.length === 0 ? (
                            <option value="">Chưa có cơ sở</option>
                        ) : (
                            venues.map(v => (
                                <option key={v.id} value={v.id}>{v.name}</option>
                            ))
                        )}
                    </select>
                </div>

                <NotificationBell />

                <div className="h-8 w-px bg-slate-200 mx-2"></div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:block text-right">
                        <div className="text-sm font-bold text-slate-900 leading-none">
                            {session?.user?.name || 'Owner'}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                            Chủ sân
                        </div>
                    </div>
                    <div className="relative group">
                        <button className="w-10 h-10 rounded-full border-2 border-slate-200 overflow-hidden focus:outline-none focus:border-emerald-500 transition-colors">
                            {session?.user?.image ? (
                                <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                    <User className="w-5 h-5 text-slate-500" />
                                </div>
                            )}
                        </button>
                        
                        {/* Dropdown Menu */}
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
