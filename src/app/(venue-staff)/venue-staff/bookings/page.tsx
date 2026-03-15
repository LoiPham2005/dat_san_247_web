"use client";

import React from 'react';
import { OwnerBookingManagement } from '@/features/owner/components/OwnerBookingManagement';
import { CalendarCheck } from 'lucide-react';

export default function VenueStaffBookingsPage() {
    const venueId = 'VN-1'; // Mock Data - Venue Staff is assigned to VN-1 normally

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <CalendarCheck className="w-7 h-7 text-indigo-600" /> Quản Lý Lịch Đặt
                </h1>
                <p className="text-sm font-medium text-slate-500 mt-1">Quản lý và cập nhật tiến độ lịch đặt sân của cơ sở bạn đang vận hành.</p>
            </div>
            
            <OwnerBookingManagement venueId={venueId} />
        </div>
    );
}
