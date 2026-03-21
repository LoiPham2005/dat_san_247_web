"use client";

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useOwnerReviews } from '../hooks/useOwnerMarketing';
import { Star, MessageCircle, Reply, User, Calendar, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const OwnerReviewManagement = ({ venueId }: { venueId: string }) => {
    const { reviews, isLoading, replyReview, isReplying } = useOwnerReviews(venueId);
    
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');

    const handleReply = (reviewId: string) => {
        if (!replyText.trim()) {
            toast.error("Vui lòng nhập nội dung phản hồi");
            return;
        }
        replyReview({ reviewId, response: replyText.trim() });
        setReplyingTo(null);
        setReplyText('');
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`} 
                    />
                ))}
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="p-12 text-center text-slate-500 font-medium">Đang tải đánh giá...</div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-bold text-slate-800 mb-2">Chưa Có Đánh Giá</h3>
                <p className="text-slate-500 text-sm">Cơ sở của bạn hiện chưa nhận được đánh giá nào từ khách hàng.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* THỐNG KÊ NHANH */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-slate-900 mb-1">
                        {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
                    </span>
                    {renderStars(Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length))}
                    <span className="text-xs font-semibold text-slate-500 mt-2 uppercase tracking-wide">Điểm Trung Bình</span>
                </Card>
                <Card className="p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-blue-600 mb-1">
                        {reviews.length}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 mt-2 uppercase tracking-wide">Tổng Đánh Giá</span>
                </Card>
                <Card className="p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-amber-600 mb-1">
                        {reviews.filter(r => r.rating >= 4).length}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 mt-2 uppercase tracking-wide">Tích cực (4-5★)</span>
                </Card>
                <Card className="p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-rose-600 mb-1">
                        {reviews.filter(r => r.rating <= 3).length}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 mt-2 uppercase tracking-wide">Cần cải thiện (1-3★)</span>
                </Card>
            </div>

            {/* DANH SÁCH ĐÁNH GIÁ */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <Card key={review.id} className="p-0 overflow-hidden border-slate-200 hover:border-emerald-200 transition-colors">
                        <div className="p-5 flex flex-col md:flex-row gap-6">
                            {/* USER INFO */}
                            <div className="md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6">
                                <div className="flex items-center gap-3 mb-3">
                                    {review.user_avatar ? (
                                        <img src={review.user_avatar} alt={review.user_name} className="w-10 h-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                                            <User className="w-5 h-5" />
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-bold text-slate-800 line-clamp-1">{review.user_name}</div>
                                        <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
                                            {review.court_name || 'Đặt tại Sân chung'}
                                        </div>
                                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                            <Calendar className="w-3 h-3" /> {new Date(review.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500">Chất lượng sân</span>
                                        <span className="font-semibold text-amber-600">{review.rating_facilities || '-'}★</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500">Thái độ N.Viên</span>
                                        <span className="font-semibold text-amber-600">{review.rating_staff || '-'}★</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500">Độ sạch sẽ</span>
                                        <span className="font-semibold text-amber-600">{review.rating_cleanliness || '-'}★</span>
                                    </div>
                                </div>
                            </div>

                            {/* REVIEW CONTENT */}
                            <div className="flex-1 min-w-0 flex flex-col">
                                <div className="mb-3 flex items-center justify-between">
                                    {renderStars(review.rating)}
                                    {review.rating >= 4 && (
                                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase">Tích cực</span>
                                    )}
                                </div>
                                
                                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                                    {review.comment || <span className="text-slate-400 italic">Khách hàng không để lại bình luận.</span>}
                                </p>

                                {/* MEDIA ATTACHMENTS */}
                                {review.media && review.media.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {review.media.map((item, idx) => (
                                            <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-200 group">
                                                {item.type.startsWith('video/') ? (
                                                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                                        <video src={item.url} className="w-full h-full object-cover opacity-60" />
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                                                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img 
                                                        src={item.url} 
                                                        alt={`Review media ${idx}`} 
                                                        className="w-full h-full object-cover cursor-zoom-in hover:scale-110 transition-transform" 
                                                        onClick={() => window.open(item.url, '_blank')}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* PHẢN HỒI SECTION */}
                                {review.response ? (
                                    <div className="bg-emerald-50 rounded-xl p-4 mt-auto border border-emerald-100">
                                        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase mb-2">
                                            <CheckCircle2 className="w-4 h-4" /> Bạn Đã Phản Hồi
                                            <span className="text-emerald-500/70 font-medium normal-case ml-auto">
                                                {new Date(review.responded_at!).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-emerald-800 text-sm italic">"{review.response}"</p>
                                    </div>
                                ) : (
                                    <div className="mt-auto">
                                        {replyingTo === review.id ? (
                                            <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                                <label className="text-xs font-bold text-slate-700 block">Nội dung phản hồi:</label>
                                                <textarea
                                                    value={replyText}
                                                    onChange={e => setReplyText(e.target.value)}
                                                    placeholder="Nhập nội dung phản hồi khách hàng..."
                                                    className="w-full text-sm p-3 border border-slate-300 rounded-lg outline-none focus:border-emerald-500 min-h-[100px] resize-y"
                                                    autoFocus
                                                />
                                                <div className="flex items-center gap-2 justify-end">
                                                    <Button variant="outline" size="sm" onClick={() => { setReplyingTo(null); setReplyText(''); }}>Hủy</Button>
                                                    <Button size="sm" onClick={() => handleReply(review.id)} disabled={isReplying} className="bg-emerald-600">
                                                        {isReplying ? 'Đang gửi...' : 'Gửi Phản Hồi'}
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 w-full sm:w-auto mt-2 font-bold"
                                                onClick={() => { setReplyingTo(review.id); setReplyText(''); }}
                                            >
                                                <Reply className="w-4 h-4 mr-2" /> Phản hồi khách hàng
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
