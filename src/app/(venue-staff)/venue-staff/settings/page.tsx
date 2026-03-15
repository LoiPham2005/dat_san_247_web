"use client";

import React from 'react';
import { Card } from '@/components/common/Card';
import { Settings, LogOut, Bell, Shield } from 'lucide-react';

export default function VenueStaffSettingsPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Settings className="w-7 h-7 text-indigo-600" /> Cài Đặt Cá Nhân
                </h1>
                <p className="text-sm font-medium text-slate-500 mt-1">Tùy chỉnh thông báo và cấu hình tài khoản nhân viên.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card className="p-6">
                     <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Bell className="w-5 h-5" /> Thông Báo System</h3>
                     <div className="space-y-4 text-sm text-slate-700">
                         <div className="flex items-center justify-between">
                             <span>Có khách đặt sân mới</span>
                             <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                         </div>
                         <div className="flex items-center justify-between">
                             <span>Khách hủy lịch đặt</span>
                             <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                         </div>
                         <div className="flex items-center justify-between">
                             <span>Tin nhắn từ khách / Chủ sân</span>
                             <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                         </div>
                     </div>
                 </Card>

                 <Card className="p-6">
                     <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Shield className="w-5 h-5" /> Tài Khoản & Bảo Mật</h3>
                     <div className="space-y-4">
                         <button className="w-full text-left text-sm font-semibold text-slate-700 hover:text-indigo-600 p-2 hover:bg-slate-50 rounded-md transition-colors">Đổi Mật Khẩu</button>
                         <button className="w-full text-left text-sm font-semibold text-slate-700 hover:text-indigo-600 p-2 hover:bg-slate-50 rounded-md transition-colors">Cập Nhật Thông Tin Cá Nhân</button>
                         <div className="border-t border-slate-100 mt-4 pt-4">
                             <button className="w-full text-left flex items-center gap-2 text-sm font-bold text-rose-600 hover:bg-rose-50 p-2 rounded-md transition-colors">
                                 <LogOut className="w-4 h-4" /> Đăng Xuất (Rời Ca)
                             </button>
                         </div>
                     </div>
                 </Card>
            </div>
        </div>
    );
}
