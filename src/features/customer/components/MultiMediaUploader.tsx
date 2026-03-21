"use client";

import React, { useRef, useState } from 'react';
import { Plus, X, Loader2, Image as ImageIcon, Film } from 'lucide-react';
import apiClient from '@/lib/api/axios';
import { toast } from 'sonner';
import { cn } from '@/lib/utils/cn';

interface MultiMediaUploaderProps {
    images: string[];
    videos: string[];
    onImagesChange: (urls: string[]) => void;
    onVideosChange: (urls: string[]) => void;
    maxImages?: number;
    maxVideos?: number;
    disabled?: boolean;
}

export const MultiMediaUploader = ({ 
    images, 
    videos, 
    onImagesChange, 
    onVideosChange, 
    maxImages = 5, 
    maxVideos = 1, 
    disabled 
}: MultiMediaUploaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadType, setUploadType] = useState<'image' | 'video' | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !uploadType) return;

        // Validation
        if (uploadType === 'image' && images.length >= maxImages) {
            toast.error(`Chỉ được tải tối đa ${maxImages} ảnh`);
            return;
        }
        if (uploadType === 'video' && videos.length >= maxVideos) {
            toast.error(`Chỉ được tải tối đa ${maxVideos} video`);
            return;
        }

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await apiClient.post('/customer/reviews/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const url = response.data?.data?.url;
            if (url) {
                if (uploadType === 'image') {
                    onImagesChange([...images, url]);
                } else {
                    onVideosChange([...videos, url]);
                }
            }
        } catch (error) {
            toast.error('Tải lên thất bại');
        } finally {
            setIsUploading(false);
            setUploadType(null);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        onImagesChange(newImages);
    };

    const removeVideo = (index: number) => {
        const newVideos = [...videos];
        newVideos.splice(index, 1);
        onVideosChange(newVideos);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
                {/* PREVIEW IMAGES */}
                {images.map((url, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 group">
                        <img src={url} alt="Review" className="w-full h-full object-cover" />
                        <button 
                            onClick={() => removeImage(i)}
                            className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}

                {/* PREVIEW VIDEOS */}
                {videos.map((url, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center group">
                        <Film className="w-8 h-8 text-white/50" />
                        <button 
                            onClick={() => removeVideo(i)}
                            className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}

                {/* UPLOAD BUTTONS */}
                {!disabled && (
                    <div className="flex gap-2">
                        {images.length < maxImages && (
                            <button 
                                onClick={() => { setUploadType('image'); inputRef.current?.click(); }}
                                className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all bg-slate-50/50"
                            >
                                {isUploading && uploadType === 'image' ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
                                <span className="text-[10px] font-bold mt-1">Ảnh</span>
                            </button>
                        )}
                        {videos.length < maxVideos && (
                            <button 
                                onClick={() => { setUploadType('video'); inputRef.current?.click(); }}
                                className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all bg-slate-50/50"
                            >
                                {isUploading && uploadType === 'video' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Film className="w-5 h-5" />}
                                <span className="text-[10px] font-bold mt-1">Video</span>
                            </button>
                        )}
                    </div>
                )}
            </div>

            <input 
                type="file" 
                ref={inputRef} 
                onChange={handleFileChange}
                accept={uploadType === 'image' ? "image/*" : "video/*"}
                className="hidden" 
            />
        </div>
    );
};
