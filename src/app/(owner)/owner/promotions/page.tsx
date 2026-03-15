"use client";

import React, { useState, useEffect } from 'react';
import { useOwnerVenues } from '@/features/owner/hooks/useOwnerVenue';
import { OwnerPromotionManagement } from '@/features/owner/components/OwnerPromotionManagement';
import { Button } from '@/components/common/Button';
import { Store, Tag } from 'lucide-react';

export default function OwnerPromotionsPage() {
    const { venues, isLoading } = useOwnerVenues();
    const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

    useEffect(() => {
        if (venues.length > 0 && !selectedVenueId) {
            setSelectedVenueId(venues[0].id);
        }
    }, [venues, selectedVenueId]);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        <Tag className="w-7 h-7 text-emerald-600" /> Quản Lý Khuyến Mãi
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">Quản lý và theo dõi hiệu quả các chương trình voucher, mã giảm giá.</p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-500 uppercase">Cơ Sở:</span>
                    <select 
                        value={selectedVenueId || ''} 
                        onChange={(e) => setSelectedVenueId(e.target.value)}
                        className="h-10 px-4 pr-8 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 outline-none focus:border-emerald-500"
                        disabled={isLoading || venues.length === 0}
                    >
                        {isLoading ? (
                            <option value="">Đang tải...</option>
                        ) : venues.length === 0 ? (
                            <option value="">Chưa có cơ sở nào</option>
                        ) : (
                            venues.map(v => (
                                <option key={v.id} value={v.id}>{v.name}</option>
                            ))
                        )}
                    </select>
                </div>
            </div>

            {venues.length === 0 && !isLoading ? (
                <div className="p-12 text-center bg-white border border-slate-200 border-dashed rounded-2xl">
                    <Store className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Chưa có Cơ Sở Nào</h3>
                    <p className="text-slate-500 mb-6">Bạn cần tạo thiết lập Cơ sở (Venue) và các Sân (Courts) trước khi có thể tạo Khuyến mãi.</p>
                    <Button onClick={() => window.location.href='/owner/venues'} className="h-11 px-6 font-bold bg-emerald-600">Đi đến Quản lý Sân bãi</Button>
                </div>
            ) : selectedVenueId ? (
                <OwnerPromotionManagement venueId={selectedVenueId} />
            ) : null}
        </div>
    );
}
