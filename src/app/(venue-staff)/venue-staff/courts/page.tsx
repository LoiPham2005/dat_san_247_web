"use client";

import React from 'react';
import { OwnerCourtPanel } from '@/features/owner/components/OwnerCourtPanel';
import { Store } from 'lucide-react';

export default function VenueStaffCourtsPage() {
    const venueId = 'VN-1'; // Mock Data - Venue Staff is assigned to VN-1 normally

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Store className="w-7 h-7 text-indigo-600" /> Quản Lý Sân & Dịch Vụ
                </h1>
                <p className="text-sm font-medium text-slate-500 mt-1">Thiết lập các sân lẻ, giá thuê, bảo trì và dịch vụ đi kèm (nước, thuê giày...).</p>
            </div>
            
            <OwnerCourtPanel venueId={venueId} />
        </div>
    );
}
