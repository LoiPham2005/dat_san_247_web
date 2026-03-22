"use client";

import React, { useState, useEffect } from 'react';
import { OwnerVenueTabs } from '@/features/owner/components/OwnerVenueTabs';
import { Info, Loader2 } from 'lucide-react';
import { ownerVenueApi, OwnerVenue } from '@/features/owner/api/owner-venue.api';
import { toast } from 'sonner';

export default function VenueStaffVenuePage() {
    const venueId = 'VN-1'; // Mock Data - Venue Staff is assigned to VN-1 normally
    const [venue, setVenue] = useState<OwnerVenue | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const data = await ownerVenueApi.getVenueDetail(venueId);
                setVenue(data);
            } catch (error) {
                console.error("Error fetching venue detail:", error);
                toast.error("Không thể tải thông tin cơ sở.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchVenue();
    }, [venueId]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                <p className="text-sm font-medium text-slate-500">Đang tải thông tin cơ sở...</p>
            </div>
        );
    }

    if (!venue) {
        return (
            <div className="p-12 text-center text-slate-500">
                Không tìm thấy dữ liệu cơ sở.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Info className="w-7 h-7 text-indigo-600" /> Thiết Lập Thông Tin
                </h1>
                <p className="text-sm font-medium text-slate-500 mt-1">Cập nhật giờ mở cửa, các tiện ích và đóng cửa trong ngày lễ/Tết.</p>
            </div>
            
            <OwnerVenueTabs venue={venue} onBack={() => {}} />
        </div>
    );
}
