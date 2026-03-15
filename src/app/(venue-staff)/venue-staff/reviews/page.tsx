"use client";

import React from 'react';
import { OwnerReviewManagement } from '@/features/owner/components/OwnerReviewManagement';
import { Star } from 'lucide-react';

export default function VenueStaffReviewsPage() {
    const venueId = 'VN-1'; // Mock Data - Venue Staff is assigned to VN-1 normally

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Star className="w-7 h-7 text-indigo-600" /> Nhận Xét Của Khách
                </h1>
                <p className="text-sm font-medium text-slate-500 mt-1">Đọc và trả lời phản hồi của khách hàng đã sử dụng sân.</p>
            </div>
            
            <OwnerReviewManagement venueId={venueId} />
        </div>
    );
}
