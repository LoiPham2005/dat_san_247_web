import React from 'react';
import { CustomerVouchers } from '@/features/promotion/components/CustomerVouchers';
import { TicketPercent } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kho Voucher Của Tôi | DatSan247',
    description: 'Sưu tầm ưu đãi độc quyền đặt sân tiết kiệm x2',
};

export default function VouchersPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
                            <TicketPercent className="w-8 h-8" />
                        </div>
                        Kho Voucher & Ưu Đãi
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-3 max-w-xl leading-relaxed">
                        Nhập mã hoặc sưu tầm Voucher từ các chiến dịch của chúng tôi. Tiết kiệm ngay tới 50% chi phí đặt cáp sân yêu thích. Mẹo nhỏ: Nhớ ưu tiên Voucher hết hạn trước nhé!
                    </p>
                </div>
            </div>
            
            <CustomerVouchers />
        </div>
    );
}
