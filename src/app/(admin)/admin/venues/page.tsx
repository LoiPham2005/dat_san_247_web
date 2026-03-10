import React from 'react';
import { AdminVenueList } from '@/features/admin/components/AdminVenueList';
import { Store, ShieldAlert } from 'lucide-react';

export default function AdminVenuesPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <Store className="w-8 h-8 text-primary" /> Quản lý Chỗ cho thuê (Venues)
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Theo dõi toàn bộ Sân trong hệ thống. Cấp phép hoạt động, cấu hình mức Phí Hoa Hồng (Commission Rate) hoặc thiết lập các tính năng Nổi bật (Featured).
                    </p>
                </div>
            </div>

            {/* Alert / Info Box for Super Admin */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-amber-900 font-bold text-sm uppercase tracking-wide">Quản lý Tài chính Venue</h4>
                        <p className="text-amber-700 text-sm mt-1 font-medium">Thay đổi <strong>Chiết khấu hoa hồng %</strong> sẽ chỉ áp dụng đối với các giao dịch phát sinh ở tương lai của Venue đó. Hệ thống không thay đổi hồi tố các Booking trong quá khứ.</p>
                    </div>
                </div>
            </div>

            <AdminVenueList />
        </div>
    );
}
