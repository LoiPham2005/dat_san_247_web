"use client";

import React from 'react';
import { OwnerVenueTabs } from '@/features/owner/components/OwnerVenueTabs';
import { Info } from 'lucide-react';

export default function VenueStaffVenuePage() {
    const venueId = 'VN-1'; // Mock Data - Venue Staff is assigned to VN-1 normally

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Info className="w-7 h-7 text-indigo-600" /> Thiết Lập Thông Tin
                </h1>
                <p className="text-sm font-medium text-slate-500 mt-1">Cập nhật giờ mở cửa, các tiện ích và đóng cửa trong ngày lễ/Tết.</p>
            </div>
            
            <OwnerVenueTabs venueId={venueId} />
        </div>
    );
}
