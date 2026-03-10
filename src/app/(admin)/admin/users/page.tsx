import React from 'react';
import { AdminUserList } from '@/features/admin/components/AdminUserList';
import { Users, ShieldAlert } from 'lucide-react';

export default function AdminUsersPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <Users className="w-8 h-8 text-primary" /> Quản lý Người Dùng & Phân Quyền
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Xem danh sách, quản lý trạng thái tài khoản, thực hiện xét duyệt KYC thủ công và cấp phát vai trò phân quyền (Role) cho toàn hệ thống.
                    </p>
                </div>
            </div>

            {/* Alert / Info Box for Super Admin */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-purple-900 font-bold text-sm uppercase tracking-wide">Quyền Super Admin</h4>
                        <p className="text-purple-700 text-sm mt-1 font-medium">Bạn đang truy cập tính năng với vai trò cao nhất. Các thay đổi về việc <strong>Cấm (Ban)</strong> tài khoản hoặc <strong>cấp quyền Admin</strong> sẽ có ảnh hưởng trực tiếp đến bảo mật hệ thống.</p>
                    </div>
                </div>
            </div>

            <AdminUserList />
        </div>
    );
}
