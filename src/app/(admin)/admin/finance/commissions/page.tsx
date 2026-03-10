import React from 'react';
import { AdminFinanceOverview } from '@/features/admin/components/AdminFinanceOverview';
import { DollarSign, ShieldAlert } from 'lucide-react';

export default function AdminCommissionsPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-primary" /> Đối Soát & Hoa Hồng
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Xem toàn bộ giao dịch dòng tiền vào/ra trên hệ thống. Đồng thời kiểm soát bảng kê chiết khấu (Commissions) được trích tự động từ các Booking hoàn thành.
                    </p>
                </div>
            </div>

            {/* Alert / Info Box for Super Admin */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-amber-900 font-bold text-sm uppercase tracking-wide">Lưu ý Dữ liệu Tài chính</h4>
                        <p className="text-amber-700 text-sm mt-1 font-medium">Bạn có thể điều chỉnh <strong>Tỷ lệ Thuế VAT toàn sàn</strong> hoặc cấu hình chiết khấu trong phần Cài Đặt. Bảng dữ liệu tại đây chỉ mang tính chất <strong>Read only (Chỉ đọc)</strong> & <strong>Export (Xuất file Excel)</strong>.</p>
                    </div>
                </div>
            </div>

            <AdminFinanceOverview />
        </div>
    );
}
