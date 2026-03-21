"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/common/Dialog';
import { Button } from '@/components/common/Button';
import { Star, MessageSquare, Send } from 'lucide-react';
import { useCreateReview } from '../hooks/useCustomerBooking';
import { useUpdateReview } from '../hooks/useCustomerReview';
import { cn } from '@/lib/utils/cn';

import { MultiMediaUploader } from './MultiMediaUploader';

interface ReviewDialogProps {
    isOpen: boolean;
    onClose: () => void;
    bookingId?: string;
    reviewId?: string;
    venueName: string;
    initialRating?: number;
    initialComment?: string;
    initialRatingFacilities?: number;
    initialRatingStaff?: number;
    initialRatingCleanliness?: number;
    initialImages?: string[];
    initialVideos?: string[];
    isEdit?: boolean;
}

export const ReviewDialog = ({ 
    isOpen, 
    onClose, 
    bookingId, 
    reviewId,
    venueName, 
    initialRating = 5, 
    initialComment = '', 
    initialRatingFacilities = 5,
    initialRatingStaff = 5,
    initialRatingCleanliness = 5,
    initialImages = [],
    initialVideos = [],
    isEdit = false 
}: ReviewDialogProps) => {
    const [rating, setRating] = useState(initialRating);
    const [comment, setComment] = useState(initialComment);
    const [ratingFacilities, setRatingFacilities] = useState(initialRatingFacilities);
    const [ratingStaff, setRatingStaff] = useState(initialRatingStaff);
    const [ratingCleanliness, setRatingCleanliness] = useState(initialRatingCleanliness);
    const [images, setImages] = useState<string[]>(initialImages);
    const [videos, setVideos] = useState<string[]>(initialVideos);
    
    useEffect(() => {
        if (isOpen) {
            setRating(initialRating);
            setComment(initialComment);
            setRatingFacilities(initialRatingFacilities);
            setRatingStaff(initialRatingStaff);
            setRatingCleanliness(initialRatingCleanliness);
            setImages(initialImages);
            setVideos(initialVideos);
        }
    }, [isOpen, initialRating, initialComment, initialRatingFacilities, initialRatingStaff, initialRatingCleanliness, initialImages, initialVideos]);

    const { mutate: submitReview, isPending: isCreating } = useCreateReview();
    const { mutate: updateReview, isPending: isUpdating } = useUpdateReview();
    
    const isPending = isCreating || isUpdating;

    const handleSubmit = () => {
        const payload = {
            rating,
            rating_facilities: ratingFacilities,
            rating_staff: ratingStaff,
            rating_cleanliness: ratingCleanliness,
            comment: comment.trim(),
            images,
            videos
        };

        if (isEdit && reviewId) {
            updateReview({
                id: reviewId,
                data: payload
            }, {
                onSuccess: () => onClose()
            });
        } else if (bookingId) {
            submitReview({
                booking_id: bookingId,
                ...payload
            }, {
                onSuccess: () => {
                    onClose();
                    setRating(5);
                    setComment('');
                    setImages([]);
                    setVideos([]);
                }
            });
        }
    };

    const RatingSection = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) => (
        <div className="flex items-center justify-between gap-4 py-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => onChange(star)}
                        className="transition-transform active:scale-90 hover:scale-110"
                    >
                        <Star 
                            className={cn(
                                "w-5 h-5 transition-colors",
                                star <= value ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-50"
                            )} 
                        />
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl rounded-3xl p-0 overflow-hidden border-0 shadow-2xl w-[95vw]">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 px-8 py-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <Star className="w-10 h-10 text-amber-400 fill-amber-400 mb-3 animate-bounce" />
                    <DialogTitle className="text-2xl font-black mb-2 leading-tight">
                        {isEdit ? "Cập Nhật Đánh Giá" : "Đánh Giá Dịch Vụ"}
                    </DialogTitle>
                    <DialogDescription className="text-indigo-100/80 font-medium">
                        Cảm ơn bạn đã trải nghiệm tại <span className="text-white font-bold">{venueName}</span>. 
                        Đánh giá của bạn giúp chủ sân cải thiện chất lượng phục vụ tốt hơn!
                    </DialogDescription>
                </div>

                <div className="p-6 md:p-8 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* LEFT COLUMN: RATINGS */}
                        <div className="space-y-6">
                            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-6">
                                <div className="text-center md:text-left space-y-3">
                                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest block">Bạn hài lòng mức nào?</label>
                                    <div className="flex justify-center md:justify-start gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className="p-1 transition-transform active:scale-90 hover:scale-110"
                                            >
                                                <Star 
                                                    className={cn(
                                                        "w-10 h-10 transition-colors",
                                                        star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-50"
                                                    )} 
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <div className="text-lg font-black text-slate-800">
                                        {rating === 5 && "Cực kỳ hài lòng! 😍"}
                                        {rating === 4 && "Rất tốt! 😊"}
                                        {rating === 3 && "Bình thường 😐"}
                                        {rating === 2 && "Tệ ☹️"}
                                        {rating === 1 && "Rất tệ 😡"}
                                    </div>
                                </div>

                                {/* DETAILED RATINGS */}
                                <div className="space-y-3 pt-6 border-t border-slate-200">
                                    <RatingSection label="Cơ sở vật chất" value={ratingFacilities} onChange={setRatingFacilities} />
                                    <RatingSection label="Thái độ phục vụ" value={ratingStaff} onChange={setRatingStaff} />
                                    <RatingSection label="Vệ sinh" value={ratingCleanliness} onChange={setRatingCleanliness} />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: MEDIA & COMMENT */}
                        <div className="space-y-6">
                            {/* MEDIA UPLOAD */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Ảnh & Video (Tối đa 5 ảnh, 1 video)</label>
                                <MultiMediaUploader 
                                    images={images}
                                    videos={videos}
                                    onImagesChange={setImages}
                                    onVideosChange={setVideos}
                                />
                            </div>

                            {/* COMMENT AREA */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" /> Viết nhận xét (Tùy chọn)
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Sân cỏ tốt, đèn sáng, chủ sân nhiệt tình..."
                                    className="w-full h-32 md:h-40 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 transition-colors resize-none text-slate-800 font-medium placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-slate-100">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-12 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                            Đóng
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isPending}
                            className="flex-[2] h-12 rounded-xl font-black bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                        >
                            {isPending ? "Đang gửi..." : (isEdit ? "Cập Nhật" : "Gửi Đánh Giá")} <Send className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
