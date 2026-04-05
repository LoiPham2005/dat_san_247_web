"use client";

import React, { useState, useEffect } from 'react';
import { useOwnerVenues } from '@/features/owner/hooks/useOwnerVenue';
import { OwnerReviewManagement } from '@/features/owner/components/OwnerReviewManagement';
import { Button } from '@/components/common/Button';
import { Store, Star } from 'lucide-react';

import { useOwnerFacility } from '@/features/owner/context/OwnerFacilityContext';

export default function OwnerReviewsPage() {
    const { venues, isLoading, selectedVenueId, setSelectedVenueId } = useOwnerFacility();

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        <Star className="w-7 h-7 text-emerald-600" /> Phản Hồi Từ Khách Hàng
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">Quản lý và tương tác với đánh giá từ khách đã đặt sân.</p>
                </div>

            </div>

            {venues.length === 0 && !isLoading ? (
                <div className="p-12 text-center bg-white border border-slate-200 border-dashed rounded-2xl">
                    <Store className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Chưa có Cơ Sở Nào</h3>
                    <p className="text-slate-500 mb-6">Bạn cần tạo thiết lập Cơ sở (Venue) và các Sân (Courts) trước khi có thể nhận Đánh giá.</p>
                    <Button onClick={() => window.location.href='/owner/venues'} className="h-11 px-6 font-bold bg-emerald-600">Đi đến Quản lý Sân bãi</Button>
                </div>
            ) : selectedVenueId ? (
                <OwnerReviewManagement venueId={selectedVenueId} />
            ) : null}
        </div>
    );
}
