import React from 'react';
import { AdminBookingList } from '@/features/admin/components/AdminBookingList';
import { CalendarCheck, ShieldAlert } from 'lucide-react';

export default function AdminBookingsPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <CalendarCheck className="w-8 h-8 text-primary" /> Quản lý Bookings
                    </h2>
                    <p className="text-slate-500 mt-2 text-base font-medium max-w-3xl">
                        Theo dõi toàn bộ Booking đang diễn ra trên hệ thống. Kiểm tra lịch sử trạng thái và Hủy cưỡng chế (Admin Override) nếu có vấn đề tranh chấp.
                    </p>
                </div>
            </div>

            {/* Alert / Info Box for Super Admin */}
            <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-rose-900 font-bold text-sm uppercase tracking-wide">Quyền can thiệp Hệ thống</h4>
                        <p className="text-rose-700 text-sm mt-1 font-medium">Bạn có quyền <strong>Hủy (Cancel) cưỡng chế</strong> một Booking bất chấp chính sách hoàn hủy. Nếu Booking đã thanh toán trực tuyến, hệ thống sẽ gọi API trả tiền lại cho khách hàng và ghi Log mọi tác động của bạn. Hãy cẩn thận!</p>
                    </div>
                </div>
            </div>

            <AdminBookingList />
        </div>
    );
}
