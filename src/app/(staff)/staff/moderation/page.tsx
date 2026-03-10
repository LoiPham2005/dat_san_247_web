import React from 'react';
import { StaffModerationTabs } from '@/features/staff/components/StaffModerationTabs';
import { AlertOctagon, HelpingHand } from 'lucide-react';

export default function StaffModerationPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2 shrink-0">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <AlertOctagon className="w-8 h-8 text-rose-600" /> Báo Cáo & Kiểm Duyệt
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Nơi nhân viên sàn rà soát nội dung Vi phạm Chính sách, chửi bới văng tục trên các Đánh giá hoặc Sân, từ đó đưa ra quyết định Gỡ Bỏ hoặc Đẩy Cấp.
                    </p>
                </div>
            </div>

            {/* Alert / Info Box for Staff */}
            <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-lg shadow-sm shrink-0">
                <div className="flex items-start gap-3">
                    <HelpingHand className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-rose-900 font-bold text-sm uppercase tracking-wide">Nguyên tắc "Bớt Can Thiệp"</h4>
                        <p className="text-rose-700 text-sm mt-1 font-medium">Bạn hoàn toàn có quyền Gỡ Hiển Thị của các Đánh giá quá khích (Reviews). Tuy nhiên với các khiếu nại mức độ tài sản (Reports Lừa Đảo Sân), nhân viên CSKH chỉ có quyền <strong>Nhận Biết</strong> và <strong>Chuyển (Escalate)</strong> sang quyền hạn Super Admin. Bạn không được quyền khóa (Ban) người dùng.</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <StaffModerationTabs />
            </div>
        </div>
    );
}
