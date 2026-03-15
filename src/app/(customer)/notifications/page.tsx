import React from 'react';
import { CustomerNotifications } from '@/features/customer/components/CustomerNotifications';
import { Bell } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Thông Báo | DatSan247',
    description: 'Trung tâm thông báo tài khoản',
};

export default function NotificationsPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
                            <Bell className="w-8 h-8" />
                        </div>
                        Thông Báo
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-3 max-w-xl leading-relaxed">
                        Tất cả các thông báo liên quan đến Lịch Đặt Sân, Tặng Mã Khuyến Mãi và Biến động Số Dư Ví được tổng hợp tại đây.
                    </p>
                </div>
            </div>
            
            <CustomerNotifications />
        </div>
    );
}
