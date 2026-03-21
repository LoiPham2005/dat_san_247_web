"use client";

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { BannerPosition, BannerType, BannerActionType, BannerPage, AdminBanner } from '../api/admin-banner.api';
import { ImageUploader } from '@/components/common/ImageUploader';
import { X, Save } from 'lucide-react';

interface BannerFormProps {
    banner?: AdminBanner;
    onSubmit: (data: any) => void;
    onCancel: () => void;
    isLoading: boolean;
}

export const AdminBannerForm = ({ banner, onSubmit, onCancel, isLoading }: BannerFormProps) => {
    const [formData, setFormData] = useState({
        title: banner?.title || '',
        position: banner?.position || 'HOME_TOP' as BannerPosition,
        type: banner?.type || 'IMAGE' as BannerType,
        desktop_image_url: banner?.desktop_image_url || '',
        mobile_image_url: (banner as any)?.mobile_image_url || '',
        action_type: banner?.action_type || 'NONE' as BannerActionType,
        action_url: banner?.action_url || '',
        start_date: banner?.start_date ? new Date(banner.start_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        end_date: banner?.end_date ? new Date(banner.end_date).toISOString().split('T')[0] : '',
        display_order: (banner as any)?.display_order || 0,
        pages: banner?.pages || ['HOME'] as BannerPage[],
    });

    const positions: BannerPosition[] = ['HOME_TOP', 'HOME_MIDDLE', 'VENUE_DETAIL', 'PROMOTION_MODAL'];
    const types: BannerType[] = ['IMAGE', 'VIDEO'];
    const actionTypes: BannerActionType[] = ['NONE', 'URL', 'VENUE', 'PROMOTION'];
    const pages: BannerPage[] = ['HOME', 'VENUE_LIST', 'VENUE_DETAIL', 'BOOKING', 'PROMOTION', 'SEARCH', 'PROFILE'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            start_date: new Date(formData.start_date).toISOString(),
            end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
        });
    };

    const togglePage = (page: BannerPage) => {
        setFormData(prev => ({
            ...prev,
            pages: prev.pages.includes(page) 
                ? prev.pages.filter(p => p !== page)
                : [...prev.pages, page]
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">{banner ? 'Cập nhật Banner' : 'Tạo Banner Mới'}</h2>
                <button type="button" onClick={onCancel} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Tiêu đề Banner <span className="text-rose-500">*</span></label>
                        <Input 
                            required
                            placeholder="VD: Hội Thể Thao Mùa Hè 2026"
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">Vị trí hiển thị</label>
                            <select 
                                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-primary"
                                value={formData.position}
                                onChange={e => setFormData({...formData, position: e.target.value as BannerPosition})}
                            >
                                {positions.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">Loại nội dung</label>
                            <select 
                                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-primary"
                                value={formData.type}
                                onChange={e => setFormData({...formData, type: e.target.value as BannerType})}
                            >
                                {types.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">Ngày bắt đầu</label>
                            <Input 
                                type="date"
                                value={formData.start_date}
                                onChange={e => setFormData({...formData, start_date: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">Ngày kết thúc</label>
                            <Input 
                                type="date"
                                value={formData.end_date}
                                onChange={e => setFormData({...formData, end_date: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Trang hiển thị</label>
                        <div className="flex flex-wrap gap-2">
                            {pages.map(p => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => togglePage(p)}
                                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${formData.pages.includes(p) ? 'bg-primary/10 border-primary text-primary' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Ảnh Banner (Desktop)</label>
                        <ImageUploader 
                            title="Tải ảnh Desktop"
                            description="Kéo thả hoặc click để chọn ảnh (PNG, JPG, WEBP)"
                            onChange={(url) => setFormData({...formData, desktop_image_url: url})}
                            value={formData.desktop_image_url}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Hành động khi Click</label>
                        <div className="grid grid-cols-2 gap-4">
                            <select 
                                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-primary"
                                value={formData.action_type}
                                onChange={e => setFormData({...formData, action_type: e.target.value as BannerActionType})}
                            >
                                {actionTypes.map(at => <option key={at} value={at}>{at}</option>)}
                            </select>
                            <Input 
                                placeholder={formData.action_type === 'URL' ? 'https://...' : 'Mã ID'}
                                disabled={formData.action_type === 'NONE'}
                                value={formData.action_url}
                                onChange={e => setFormData({...formData, action_url: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <Button variant="ghost" type="button" onClick={onCancel}>Hủy bỏ</Button>
                <Button variant="default" type="submit" disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    {banner ? 'Cập nhật Banner' : 'Tạo Banner'}
                </Button>
            </div>
        </form>
    );
};
