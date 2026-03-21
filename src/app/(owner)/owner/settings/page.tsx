import React from 'react';
import { OwnerSettingsManagement } from '@/features/owner/components/OwnerSettingsManagement';

export const metadata = {
    title: 'Cài Đặt Tài Khoản | Chủ Cơ Sở',
    description: 'Quản lý thông tin hồ sơ và cài đặt tài khoản Dat San 247',
};

export default function OwnerSettingsPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-black text-slate-800">Cài Đặt Tài Khoản</h1>
                <p className="text-sm text-slate-500 font-medium mt-1">Quản lý hồ sơ cá nhân, thông báo và bảo mật của bạn.</p>
            </div>
            
            <OwnerSettingsManagement />
        </div>
    );
}
