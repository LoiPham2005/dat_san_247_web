import React from 'react';
import { StaffInfoTabs } from '@/features/staff/components/StaffInfoTabs';
import { BookOpenText, Info } from 'lucide-react';

export default function StaffLookupPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2 shrink-0">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <BookOpenText className="w-8 h-8 text-emerald-600" /> Tra Cứu Danh Bạ (Lookup)
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Công cụ hỗ trợ Staff tra cứu chéo Thông tin Người dùng (User), Sân bóng (Venue) và các Mã Đặt chỗ (Booking) nhằm mục đích giải đáp thắc mắc khách hàng.
                    </p>
                </div>
            </div>

            {/* Alert / Info Box for Staff */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg shadow-sm shrink-0">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-emerald-900 font-bold text-sm uppercase tracking-wide">Quy định Bảo mật Thông tin (Data Privacy)</h4>
                        <p className="text-emerald-700 text-sm mt-1 font-medium">Bảng dữ liệu này được cấp quyền <strong>Chỉ đọc (Read-only)</strong> đối với nhân sự Staff. Tuyệt đối không tiết lộ Số điện thoại (Phone) cá nhân của người dùng hoặc Doanh thu Booking cho các bên thứ ba không liên quan.</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <StaffInfoTabs />
            </div>
        </div>
    );
}
