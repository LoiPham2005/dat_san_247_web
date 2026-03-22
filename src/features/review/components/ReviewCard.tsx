import React from 'react';
import { Star } from 'lucide-react';
import { ReportButton } from '@/features/report/components/ReportButton';

export interface Review {
    id: string;
    customer_name: string;
    rating: number;
    comment: string;
    created_at: string;
    is_verified?: boolean;
}

interface ReviewCardProps {
    review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                        {review.customer_name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-bold text-slate-900">{review.customer_name}</div>
                        <div className="text-xs text-slate-400 font-medium">{new Date(review.created_at).toLocaleDateString('vi-VN')}</div>
                    </div>
                </div>
                
                {/* Rating & Report */}
                <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                                key={star} 
                                size={14} 
                                className={star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} 
                            />
                        ))}
                    </div>
                    <ReportButton 
                        targetType="REVIEW" 
                        targetId={review.id} 
                        targetName={`Bình luận của ${review.customer_name}`} 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                </div>
            </div>
            
            <p className="text-slate-600 text-sm leading-relaxed italic">
                "{review.comment}"
            </p>
        </div>
    );
};
