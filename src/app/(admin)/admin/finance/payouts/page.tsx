import React from 'react';
import { AdminPayoutList } from '@/features/admin/components/AdminPayoutList';
import { CreditCard, Info } from 'lucide-react';

export default function AdminPayoutsPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-primary" /> Yêu Cầu Rút Tiền
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Xét duyệt yêu cầu rút tiền doanh thu từ Chủ sân. Hệ thống chưa tích hợp Payout Gateway tự động, bạn cần <strong>Chuyển khoản thủ công</strong> vào ngân hàng của khách và bấm xác nhận Đã Duyệt.
                    </p>
                </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-blue-900 font-bold text-sm uppercase tracking-wide">Quy trình Thanh toán</h4>
                        <p className="text-blue-700 text-sm mt-1 font-medium">Sao chép Tài khoản ngân hàng bên dưới, mở App Ngân hàng của bạn và chuyển đúng số tiền. Sau khi thành công, quay lại đây bấm nút <strong>"Duyệt (Đã CK)"</strong> để trừ tiền trong ví (Ví ảo) của Chủ sân.</p>
                    </div>
                </div>
            </div>

            <AdminPayoutList />
        </div>
    );
}
