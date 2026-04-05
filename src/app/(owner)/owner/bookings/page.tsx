"use client";

import React, { useState, useEffect } from 'react';
import { useOwnerVenues } from '@/features/owner/hooks/useOwnerVenue';
import { OwnerBookingManagement } from '@/features/owner/components/OwnerBookingManagement';
import { Button } from '@/components/common/Button';
import { Store, CalendarRange } from 'lucide-react';

import { useOwnerFacility } from '@/features/owner/context/OwnerFacilityContext';

export default function OwnerBookingsPage() {
    const { venues, isLoading, selectedVenueId, setSelectedVenueId } = useOwnerFacility();

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        <CalendarRange className="w-7 h-7 text-emerald-600" /> Quản Lý Lịch Đặt Sân
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">Quản lý và cập nhật trạng thái mọi yêu cầu đặt lịch cho từng cơ sở.</p>
                </div>

            </div>

            {venues.length === 0 && !isLoading ? (
                <div className="p-12 text-center bg-white border border-slate-200 border-dashed rounded-2xl">
                    <Store className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Chưa có Cơ Sở Nào</h3>
                    <p className="text-slate-500 mb-6">Bạn cần tạo thiết lập Cơ sở (Venue) và các Sân (Courts) trước khi có thể nhận Lịch đặt sân.</p>
                    <Button onClick={() => window.location.href='/owner/venues'} className="h-11 px-6 font-bold bg-emerald-600">Đi đến Quản lý Sân bãi</Button>
                </div>
            ) : selectedVenueId ? (
                <OwnerBookingManagement venueId={selectedVenueId} />
            ) : null}
        </div>
    );
}
