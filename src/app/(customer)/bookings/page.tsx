import React from 'react';
import { CustomerBookingHistory } from '@/features/customer/components/CustomerBookingHistory';
import { History, CalendarCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Quản lý lịch đặt sân | DatSan247',
    description: 'Theo dõi, hủy hoặc xem chi tiết lịch đặt sân thể thao của bạn',
};

export default function BookingsManagementPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                            <CalendarCheck className="w-8 h-8" />
                        </div>
                        Lịch Đặt Của Tôi
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-3 max-w-xl leading-relaxed">
                        Bạn có thể xem mã check-in, mua thêm nước uống, hoặc thay đổi lịch hẹn. Vui lòng chú ý chính sách hủy sân để không bị mất cọc nhé!
                    </p>
                </div>
            </div>
            
            <CustomerBookingHistory />
        </div>
    );
}
