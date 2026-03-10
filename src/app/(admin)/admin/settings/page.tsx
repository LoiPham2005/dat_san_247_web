import React from 'react';
import { AdminSystemTabs } from '@/features/admin/components/AdminSystemTabs';
import { Settings, ShieldAlert } from 'lucide-react';

export default function AdminSettingsPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <Settings className="w-8 h-8 text-primary" /> Hệ Thống & Cài Đặt
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Nơi cấu hình các thiết lập toàn cục của nền tảng (Platform Configuration), quản lý phiên bản App và theo dõi truy vết Audit Logs.
                    </p>
                </div>
            </div>

            {/* Alert / Info Box for Super Admin */}
            <div className="bg-slate-100 border-l-4 border-slate-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wide">Quyền Truy Cập Mức Super Admin</h4>
                        <p className="text-slate-700 text-sm mt-1 font-medium">Lưu ý: Bạn đang thực hiện thao tác ở mức quyền hạn phân cấp cao nhất. Việc thay đổi <strong>Mã Thiết Lập (Settings Key)</strong> hoặc tạo <strong>Lịch Nghỉ lễ (Holidays)</strong> có thể lập tức ảnh hưởng đến khả năng Đặt sân, Dòng tiền và Thuế toàn quốc.</p>
                    </div>
                </div>
            </div>

            <AdminSystemTabs />
        </div>
    );
}
