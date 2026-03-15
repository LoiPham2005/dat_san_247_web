"use client";

import React from 'react';
import { OwnerStaffManagement } from '@/features/owner/components/OwnerStaffManagement';
import { Users } from 'lucide-react';

export default function VenueStaffStaffPage() {
    const venueId = 'VN-1'; // Mock Data - Venue Staff is assigned to VN-1 normally

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Users className="w-7 h-7 text-indigo-600" /> Quản Lý Nhân Sự (Ca)
                </h1>
                <p className="text-sm font-medium text-slate-500 mt-1">Sắp xếp, thêm mới và quản lý nhân viên (staff, receptionist) tại cơ sở.</p>
            </div>
            
            <OwnerStaffManagement venueId={venueId} />
        </div>
    );
}
