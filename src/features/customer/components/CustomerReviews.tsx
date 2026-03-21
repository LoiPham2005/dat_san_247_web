"use client";

import React, { useState } from 'react';
import { useCustomerReviews, useDeleteReview } from '../hooks/useCustomerReview';
import { Card } from '@/components/common/Card';
import { Star, Trash2, Edit, MessageSquareQuote, CheckCircle2, Film } from 'lucide-react';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ReviewDialog } from './ReviewDialog';

export const CustomerReviews = () => {
    const { data: reviews, isLoading } = useCustomerReviews();
    const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();

    const [editOpen, setEditOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<any>(null);

    if (isLoading) return <div className="text-center py-20 font-bold text-slate-500">Đang tải đánh giá...</div>;

    const renderStars = (rating: number) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
            ))}
        </div>
    );

    const handleEdit = (review: any) => {
        setSelectedReview(review);
        setEditOpen(true);
    };

    const handleDeleteClick = (review: any) => {
        setSelectedReview(review);
        setConfirmOpen(true);
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 fade-in">
            {reviews?.map((review) => (
                <Card key={review.id} className="p-6 overflow-hidden relative shadow-sm border border-slate-200">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-64 shrink-0 flex flex-col justify-center items-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-4xl font-black text-slate-800 mb-2">{review.rating}.0</span>
                            {renderStars(review.rating)}
                            
                            <div className="mt-4 w-full space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                    <span>Cơ sở vật chất</span>
                                    <span className="text-slate-700">{review.rating_facilities || 5}/5</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                    <span>Phục vụ</span>
                                    <span className="text-slate-700">{review.rating_staff || 5}/5</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                    <span>Vệ sinh</span>
                                    <span className="text-slate-700">{review.rating_cleanliness || 5}/5</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{review.venue_name}</h3>
                                    <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                                        Đã đánh giá sân {review.court_name} <span className="mx-1">•</span> {new Date(review.created_at).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                {!review.response && (
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => handleEdit(review)}
                                            className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-50 rounded-lg group relative"
                                            title="Sửa đánh giá"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteClick(review)} 
                                            className="p-2 text-slate-400 hover:text-rose-500 transition-colors hover:bg-rose-50 rounded-lg group relative"
                                            title="Xóa đánh giá"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-700 text-sm leading-relaxed mb-4 font-medium flex-1">
                                <MessageSquareQuote className="w-5 h-5 text-slate-300 mb-2" />
                                {review.comment}
                                
                                {/* MEDIA ATTACHMENTS */}
                                {review.media_attachments?.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {review.media_attachments.map((m: any, idx: number) => {
                                            const isImage = m.files?.mime_type?.startsWith('image/');
                                            if (isImage) {
                                                return (
                                                    <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200">
                                                        <img src={m.files.public_url} alt="Review attachment" className="w-full h-full object-cover" />
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center">
                                                    <Film className="w-8 h-8 text-white/50" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                            
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

            {/* DIALOGS */}
            {selectedReview && (
                <>
                    <ReviewDialog 
                        isOpen={editOpen}
                        onClose={() => setEditOpen(false)}
                        isEdit={true}
                        reviewId={selectedReview.id}
                        venueName={selectedReview.venue_name}
                        initialRating={selectedReview.rating}
                        initialComment={selectedReview.comment}
                        initialRatingFacilities={selectedReview.rating_facilities}
                        initialRatingStaff={selectedReview.rating_staff}
                        initialRatingCleanliness={selectedReview.rating_cleanliness}
                        initialImages={(selectedReview.media_attachments || [])
                            .filter((m: any) => m.files?.mime_type?.startsWith('image/'))
                            .map((m: any) => m.files?.public_url)}
                        initialVideos={(selectedReview.media_attachments || [])
                            .filter((m: any) => m.files?.mime_type?.startsWith('video/'))
                            .map((m: any) => m.files?.public_url)}
                    />
                    
                    <ConfirmDialog 
                        isOpen={confirmOpen}
                        onClose={() => setConfirmOpen(false)}
                        onConfirm={() => deleteReview(selectedReview.id, { onSuccess: () => setConfirmOpen(false) })}
                        title="Xóa Đánh Giá?"
                        description="Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa phản hồi này?"
                        confirmText="Xóa ngay"
                        type="danger"
                        loading={isDeleting}
                    />
                </>
            )}
        </div>
    );
};
