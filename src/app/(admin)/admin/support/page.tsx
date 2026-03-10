import React from 'react';
import { AdminSupportList } from '@/features/admin/components/AdminSupportList';
import { MessageSquareDashed, ShieldAlert } from 'lucide-react';

export default function AdminSupportPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <MessageSquareDashed className="w-8 h-8 text-primary" /> Hỗ Trợ & Kiểm Duyệt
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Trung tâm giải quyết Khiếu nại (Tickets), xử lý Báo cáo vi phạm (Reports) và kiểm duyệt tính xác thực của các Đánh giá (Reviews) trên hệ thống.
                    </p>
                </div>
            </div>

            {/* Alert / Info Box for Super Admin */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-amber-900 font-bold text-sm uppercase tracking-wide">Lưu ý Điều Phối (Assign)</h4>
                        <p className="text-amber-700 text-sm mt-1 font-medium">Bên cạnh việc giải quyết Ticket, Super Admin có quyền <strong>Phân công (Assign)</strong> các Ticket yêu cầu hỗ trợ phức tạp cho các Nhân viên Cấp dưới (Staff Team) xử lý. Việc kiểm soát Reviews không nên lạm dụng để tránh làm sai lệch độ uy tín của Sân thể thao.</p>
                    </div>
                </div>
            </div>

            <AdminSupportList />
        </div>
    );
}
