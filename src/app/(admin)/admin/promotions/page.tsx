import React from 'react';
import { AdminPromotionList } from '@/features/admin/components/AdminPromotionList';
import { Tag, ShieldAlert } from 'lucide-react';

export default function AdminPromotionsPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <Tag className="w-8 h-8 text-primary" /> Khuyến Mãi & Voucher
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Tạo, Sửa đổi và Quản lý các chương trình Khuyến mãi (Promotions) áp dụng trên toàn hệ thống hoặc cấp riêng cho một vài Sân cụ thể.
                    </p>
                </div>
            </div>

            {/* Alert / Info Box for Super Admin */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-emerald-900 font-bold text-sm uppercase tracking-wide">Quản lý Dòng Vốn Khuyến Mãi</h4>
                        <p className="text-emerald-700 text-sm mt-1 font-medium">Lưu ý: Nếu bạn tạo Promotion với thuộc tính <strong>Hệ thống (Toàn sàn)</strong> - nghĩa là chi phí Marketing sẽ do ví của Nền tảng chi trả (Platform budget), còn nếu gán cho Venue riêng biệt, thì Sân đó sẽ tự chịu chiết khấu.</p>
                    </div>
                </div>
            </div>

            <AdminPromotionList />
        </div>
    );
}
