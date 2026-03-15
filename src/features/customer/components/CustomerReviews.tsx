"use client";

import React, { useState } from 'react';
import { useCustomerReviews, useDeleteReview } from '../hooks/useCustomerReview';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Star, Trash2, Edit, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const CustomerReviews = () => {
    const { data: reviews, isLoading } = useCustomerReviews();
    const { mutate: deleteReview } = useDeleteReview();

    if (isLoading) return <div className="text-center py-20 font-bold text-slate-500">Đang tải đánh giá...</div>;

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 fade-in">
            {reviews?.map((review) => (
                <Card key={review.id} className="p-6 overflow-hidden relative shadow-sm border border-slate-200">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Rating Summary */}
                        <div className="md:w-64 shrink-0 flex flex-col justify-center items-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-4xl font-black text-slate-800 mb-2">{review.rating}.0</span>
                            {renderStars(review.rating)}
                            <div className="mt-4 w-full space-y-2">
                                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                                    <span>Chất lượng sân</span>
                                    <span className="text-slate-800">{review.rating_facilities}/5</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                                    <span>Thái độ NV</span>
                                    <span className="text-slate-800">{review.rating_staff}/5</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                                    <span>Vệ sinh</span>
                                    <span className="text-slate-800">{review.rating_cleanliness}/5</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{review.venue_name}</h3>
                                    <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                                        Đã đánh giá sân {review.court_name} <span className="mx-1">•</span> {new Date(review.created_at).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-50 rounded-lg">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => { if(confirm('Bạn muốn xóa đánh giá này?')) deleteReview(review.id) }} className="p-2 text-slate-400 hover:text-rose-500 transition-colors hover:bg-rose-50 rounded-lg">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-700 text-sm leading-relaxed mb-4 font-medium flex-1">
                                <MessageSquareQuote className="w-5 h-5 text-slate-300 mb-2" />
                                {review.comment}
                            </div>
                            
                            {review.media_attachments && review.media_attachments.length > 0 && (
                                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
                                    {review.media_attachments.map(img => (
                                        <div key={img.id} className="w-20 h-20 shrink-0 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden">
                                            <img src={img.file_url} alt="Review" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Response */}
                            {review.response && (
                                <div className="mt-auto pt-4 border-t border-slate-100">
                                    <div className="flex gap-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-emerald-800 mb-1">Phản hồi từ Chủ sân</h4>
                                            <p className="text-sm font-medium text-emerald-700/80 leading-relaxed">{review.response}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            ))}

            {(!reviews || reviews.length === 0) && (
                <div className="text-center py-20 text-slate-500">
                    <Star className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-1">Chưa có đánh giá nào</h3>
                    <p className="text-sm font-medium">Bạn có thể viết đánh giá sau khi sử dụng dịch vụ đặt sân.</p>
                </div>
            )}
        </div>
    );
};
