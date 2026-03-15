"use client";

import React from 'react';
import { CustomerProfileManagement } from '@/features/customer/components/CustomerProfileManagement';
import { User } from 'lucide-react';

export default function CustomerProfilePage() {
    return (
        <div className="space-y-6">
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <User className="w-7 h-7 text-primary" /> Tài Khoản Của Tôi
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Cập nhật thông tin cá nhân, cấu hình thông báo và bảo vệ tài khoản.</p>
                </div>
            </div>
            
            <CustomerProfileManagement />
        </div>
    );
}
