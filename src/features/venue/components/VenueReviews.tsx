"use client";

import React from 'react';
import { ReviewCard, Review } from '@/features/review/components/ReviewCard';
import { MessageSquare, Star } from 'lucide-react';

interface VenueReviewsProps {
    venueId: string;
    reviews: Review[];
    averageRating: number;
    reviewCount: number;
}

export const VenueReviews = ({ venueId, reviews, averageRating, reviewCount }: VenueReviewsProps) => {
    return (
        <div className="space-y-8 mt-12 pt-12 border-t border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Đánh giá từ khách hàng</h3>
                        <p className="text-slate-500 text-sm font-medium">Cộng đồng của chúng tôi nói gì về sân này</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="text-xl font-black text-slate-900">{averageRating}</span>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{reviewCount} lượt đánh giá</div>
                </div>
            </div>

            {reviews && reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((r) => (
                        <ReviewCard key={r.id} review={r} />
                    ))}
                </div>
            ) : (
                <div className="p-12 bg-white border border-dashed border-slate-300 rounded-3xl text-center">
                    <MessageSquare size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-400 font-bold">Sân này chưa có đánh giá nào. Hãy là người đầu tiên!</p>
                </div>
            )}
        </div>
    );
};
