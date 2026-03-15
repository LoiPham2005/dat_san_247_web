import React from 'react';
import { CustomerReviews } from '@/features/customer/components/CustomerReviews';
import { Star } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đánh Giá Của Tôi | DatSan247',
    description: 'Lịch sử đánh giá sân thể thao của bạn',
};

export default function MyReviewsPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
                            <Star className="w-8 h-8" />
                        </div>
                        Lịch Sử Đánh Giá
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-3 max-w-xl leading-relaxed">
                        Bạn có thể đánh giá, chỉnh sửa hoặc xóa feedback đối với các sân mà bạn đã đến trải nghiệm. Đánh giá của bạn giúp cộng đồng chọn được sân chơi chất lượng hơn.
                    </p>
                </div>
            </div>
            
            <CustomerReviews />
        </div>
    );
}
