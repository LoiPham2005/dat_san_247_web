import React from 'react';
import { StaffSupportWorkspace } from '@/features/staff/components/StaffSupportWorkspace';
import { MessageSquareDashed, HelpingHand } from 'lucide-react';

export default function StaffSupportPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6 h-screen flex flex-col overflow-hidden">
            <div className="flex items-center justify-between space-y-2 shrink-0">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <MessageSquareDashed className="w-8 h-8 text-primary" /> Trung Tâm CSKH
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Khu vực giải quyết các Phiếu hỗ trợ (Tickets) được phân công từ Super Admin. Vui lòng phản hồi khách hàng nhanh nhất có thể.
                    </p>
                </div>
            </div>

            {/* Alert / Info Box for Staff */}
            <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-lg shadow-sm shrink-0">
                <div className="flex items-start gap-3">
                    <HelpingHand className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sky-900 font-bold text-sm uppercase tracking-wide">Lưu ý Dành Cho Nhân Viên</h4>
                        <p className="text-sky-700 text-sm mt-1 font-medium">Bạn chỉ nhìn thấy các Ticket được gắn mác <strong>Mã Định Danh</strong> của chính mình. Sau khi giải quyết xong yêu cầu, hãy nhấn <strong>Mark as Resolved</strong> để đóng luồng Chat và tính KPI.</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <StaffSupportWorkspace />
            </div>
        </div>
    );
}
