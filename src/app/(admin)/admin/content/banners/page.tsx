import React from 'react';
import { AdminBannerList } from '@/features/admin/components/AdminBannerList';
import { ImageIcon, ShieldAlert } from 'lucide-react';

export default function AdminBannersPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <ImageIcon className="w-8 h-8 text-primary" /> Quản Lý Banner
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Tổ chức chiến dịch Marketing bằng cách quản lý các Banner Quảng Cáo hiển thị tại nhiều vị trí khác nhau trên App & Web.
                    </p>
                </div>
            </div>

            {/* Alert / Info Box for Super Admin */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-purple-900 font-bold text-sm uppercase tracking-wide">Chính sách Hiển Thị</h4>
                        <p className="text-purple-700 text-sm mt-1 font-medium">Lưu ý: Bạn chọn chức năng theo dõi <strong>Lượt Click</strong> và <strong>Lượt Hiển thị (Impressions)</strong> để tính toán doanh thu hoặc tỉ lệ chuyển đổi của chiến dịch Marketing. Hãy chắc chắn tắt những Banner đã hết hạn.</p>
                    </div>
                </div>
            </div>

            <AdminBannerList />
        </div>
    );
}
