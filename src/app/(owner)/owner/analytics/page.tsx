"use client";

import React, { useState, useEffect } from 'react';
import { useOwnerVenues } from '@/features/owner/hooks/useOwnerVenue';
import { OwnerAnalyticsManagement } from '@/features/owner/components/OwnerAnalyticsManagement';
import { Button } from '@/components/common/Button';
import { Store, BarChart3 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function OwnerAnalyticsPage() {
    const { data: session } = useSession();
    const { venues, isLoading } = useOwnerVenues();
    const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

    useEffect(() => {
        if (venues.length > 0 && !selectedVenueId) {
            setSelectedVenueId(venues[0].id);
        }
    }, [venues, selectedVenueId]);

    return (
        <div className="p-6 max-w-[1400px] mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
                        <BarChart3 className="w-8 h-8 text-emerald-600" /> Thống Kê & Phân Tích
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        Theo dõi hiệu năng, tỷ lệ lấp đầy sân và doanh thu tổng quan.
                    </p>
                </div>

                <div className="flex items-center gap-3 bg-white px-4 py-2 border border-slate-200 rounded-2xl shadow-sm">
                    <span className="text-xs font-bold text-slate-500 uppercase">Cơ Sở:</span>
                    <select 
                        value={selectedVenueId || ''} 
                        onChange={(e) => setSelectedVenueId(e.target.value)}
                        className="h-10 pr-8 bg-transparent font-bold text-base text-slate-800 outline-none cursor-pointer hover:text-emerald-600 transition-colors"
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
                <div className="p-16 mt-8 text-center bg-white shadow-sm border border-slate-200 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400"></div>
                    <Store className="w-16 h-16 text-slate-200 mx-auto mb-5" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Chưa có Cơ Sở Nào</h3>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium leading-relaxed">Bạn cần tạo Cơ sở (Venue) và có lượt đặt sân thì mới có thể xem báo cáo thống kê.</p>
                    <Button onClick={() => window.location.href='/owner/venues'} className="h-12 px-8 font-bold bg-emerald-600 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40">
                        Đi đến Quản lý Cơ sở
                    </Button>
                </div>
            ) : selectedVenueId ? (
                <OwnerAnalyticsManagement venueId={selectedVenueId} />
            ) : null}
        </div>
    );
}
