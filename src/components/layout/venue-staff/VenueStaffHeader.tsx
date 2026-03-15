import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export const VenueStaffHeader = () => {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center flex-1 max-w-md">
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
                <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center relative transition-colors">
                    <Bell className="w-5 h-5 text-slate-600" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="h-4 w-px bg-slate-200 mx-1"></div>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200 shadow-sm">
                        <User className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </header>
    );
};
