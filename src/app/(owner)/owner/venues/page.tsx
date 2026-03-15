"use client";

import React, { useState } from 'react';
import { OwnerVenueList } from '@/features/owner/components/OwnerVenueList';
import { OwnerVenueTabs } from '@/features/owner/components/OwnerVenueTabs';
import { OwnerVenue } from '@/features/owner/api/owner-venue.api';
import { Store, Info } from 'lucide-react';

export default function OwnerVenuesPage() {
    const [selectedVenue, setSelectedVenue] = useState<OwnerVenue | null>(null);

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            {!selectedVenue && (
                <div className="flex items-center justify-between space-y-2 shrink-0">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                            <Store className="w-8 h-8 text-emerald-600" /> Quản Lý Sân Bãi (Venues)
                        </h2>
                        <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                            Khởi tạo Câu lạc bộ / Sân bãi mới của bạn. Nơi Thiết lập Giờ hoạt động, Giá cả, Thông tin xuất vé và Thông tin Liên hệ.
                        </p>
                    </div>
                </div>
            )}

            {!selectedVenue && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg shadow-sm shrink-0">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-emerald-900 font-bold text-sm uppercase tracking-wide">Quy trình Đăng ký Cơ sở Mới</h4>
                            <p className="text-emerald-700 text-sm mt-1 font-medium">1. Khởi tạo Cơ sở <span className="mx-1 font-black">→</span> 2. Bấm vào Sân vừa tạo <span className="mx-1 font-black">→</span> 3. Chuyển sang Tab "Hồ Sơ Pháp Lý" và cung cấp Ảnh Giấy phép (hoặc CCCD) Cùng Bản cam kết để Vận hành Khai thác.</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-visible">
                {selectedVenue ? (
                    <OwnerVenueTabs venue={selectedVenue} onBack={() => setSelectedVenue(null)} />
                ) : (
                    <OwnerVenueList onSelect={(venue) => setSelectedVenue(venue)} />
                )}
            </div>
        </div>
    );
}
