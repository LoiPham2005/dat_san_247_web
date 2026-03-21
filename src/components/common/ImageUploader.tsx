"use client";

import React, { useRef, useState } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import apiClient from '@/lib/api/axios';
import { toast } from 'sonner';

interface ImageUploaderProps {
    value?: string;
    onChange: (url: string) => void;
    title: string;
    description: string;
    disabled?: boolean;
    uploadUrl?: string;
}

export const ImageUploader = ({ value, onChange, title, description, disabled, uploadUrl = '/owner/venues/upload' }: ImageUploaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await apiClient.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data && response.data.data && response.data.data.url) {
                onChange(response.data.data.url);
            } else {
                toast.error('Có lỗi xảy ra khi tải ảnh lên.');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            toast.error('Tải lên thất bại. Vui lòng thử lại.');
        } finally {
            setIsUploading(false);
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation(); // prevent clicking the container
        onChange('');
    };

    return (
        <div 
            onClick={() => !disabled && !isUploading && inputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all ${
                disabled || isUploading 
                    ? 'border-slate-200 bg-slate-50 opacity-70 cursor-not-allowed' 
                    : value 
                        ? 'border-emerald-500 bg-emerald-50/50 cursor-pointer' 
                        : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-primary cursor-pointer group'
            }`}
        >
            <input 
                type="file" 
                ref={inputRef} 
                onChange={handleFileChange}
                accept="image/*,application/pdf"
                className="hidden" 
            />

            {isUploading ? (
                <div className="flex flex-col items-center justify-center py-4">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
                    <p className="text-sm font-bold text-slate-600">Đang tải lên...</p>
                </div>
            ) : value ? (
                <div className="relative w-full aspect-video md:aspect-auto md:h-40 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                    <img src={value} alt="Uploaded document" className="w-full h-full object-contain" />
                    {!disabled && (
                        <button 
                            onClick={handleRemove}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-red-50 text-red-600 rounded-full shadow-sm transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 group-hover:text-primary transition-all">
                        <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    <h4 className="font-bold text-slate-800">{title}</h4>
                    <p className="text-xs text-slate-500 mt-2 font-medium">{description}</p>
                </>
            )}
        </div>
    );
};
