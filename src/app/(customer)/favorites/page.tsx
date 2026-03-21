import React from 'react';
import { CustomerFavoritesManagement } from '@/features/customer/components/CustomerFavoritesManagement';
import { Heart } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sân yêu thích | DatSan247',
    description: 'Danh sách các sân thể thao bạn đã yêu thích và lưu lại.',
};

export default function FavoritesPage() {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-50 rounded-2xl flex items-center justify-center">
                            <Heart className="w-6 h-6 text-rose-500 fill-rose-500/10" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                            Sân Yêu Thích
                        </h1>
                    </div>
                    <p className="text-slate-500 font-medium pl-14">
                        Nơi lưu giữ những địa điểm tập luyện lý tưởng của bạn.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <CustomerFavoritesManagement />
            </div>
        </div>
    );
}
