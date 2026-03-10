import React from 'react';
import { AdminContentList } from '@/features/admin/components/AdminContentList';
import { Scale, Info } from 'lucide-react';

export default function AdminPoliciesPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <Scale className="w-8 h-8 text-primary" /> Điều Khoản & Chính Sách
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Quản lý các tài liệu pháp lý (Terms of Service, Privacy Policy) và danh sách Câu hỏi Thường gặp (FAQ) để hỗ trợ Khách hàng và Chủ sân.
                    </p>
                </div>
            </div>

            {/* Alert / Info Box for Super Admin */}
            <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sky-900 font-bold text-sm uppercase tracking-wide">Quản lý Phiên bản (Versioning)</h4>
                        <p className="text-sky-700 text-sm mt-1 font-medium">Lưu ý: Bạn không nên Xóa một chính sách nếu nó đã từng được áp dụng. Thay vì xóa, hãy soạn thảo một Phiên bản mới và tích cờ <strong>Bản Hiện Hành (is_current = true)</strong> để thay thế, đảm bảo tính vẹn toàn Pháp lý (Compliance).</p>
                    </div>
                </div>
            </div>

            <AdminContentList />
        </div>
    );
}
