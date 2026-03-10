"use client";

import React from 'react';
import { Bell, Search, Globe, ChevronDown } from 'lucide-react';
import { Input } from '@/components/common/Input';

export const OwnerHeader = () => {
    return (
        <header className="h-20 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4 w-1/3">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Tìm kiếm nhanh..."
                        className="pl-10 h-10 bg-slate-50 border-transparent focus:bg-white transition-all rounded-xl"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100 hover:bg-slate-100 cursor-pointer transition-colors">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-600">Trang cá nhân</span>
                </div>

                <button className="relative p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-full transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                </button>

                <div className="h-8 w-px bg-slate-200" />

                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-900">Admin Venue</p>
                        <p className="text-[10px] text-primary font-medium">Verified</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
            </div>
        </header>
    );
};
