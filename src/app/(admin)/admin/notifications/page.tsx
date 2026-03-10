import React from 'react';
import { AdminNotificationConsole } from '@/features/admin/components/AdminNotificationConsole';
import { Megaphone, AlertTriangle } from 'lucide-react';

export default function AdminNotificationsPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <Megaphone className="w-8 h-8 text-primary" /> Thông Báo Toàn Trạm
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Công cụ truyền thông (Broadcast) gửi trực tiếp Push Notification, In-App Message hoặc Email Marketing đến nhóm Khách hàng hoặc Chủ Sân.
                    </p>
                </div>
            </div>

            {/* Alert / Info Box for Super Admin */}
            <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sky-900 font-bold text-sm uppercase tracking-wide">Tránh Spam Hệ Thống</h4>
                        <p className="text-sky-700 text-sm mt-1 font-medium">Bản tin (Broadcast) có tính xuyên suốt và gửi ngay tức khắc khi bạn nhấn nút. Tuyệt đối không thử nghiệm (test) gửi tin rác lên đối tượng khách hàng thật (Customers) để tránh bị chặn App khỏi thiết bị người dùng.</p>
                    </div>
                </div>
            </div>

            <AdminNotificationConsole />
        </div>
    );
}
