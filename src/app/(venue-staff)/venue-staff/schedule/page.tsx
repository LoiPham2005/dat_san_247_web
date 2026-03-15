"use client";

import React from 'react';
import { DailySchedule } from '@/features/venue-staff/components/DailySchedule';
import { LayoutDashboard } from 'lucide-react';

export default function ReceptionistSchedulePage() {
    const venueId = 'VN-1'; // Mock Data - Venue Staff is assigned to VN-1 normally

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <LayoutDashboard className="w-7 h-7 text-indigo-600" /> Bảng Điều Khiển Lễ Tân (Receptionist)
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Cơ sở: <strong className="text-slate-800">Sân Bóng Vipe Cầu Giấy</strong></p>
                </div>
            </div>
            
            <DailySchedule venueId={venueId} />
        </div>
    );
}
