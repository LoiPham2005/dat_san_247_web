"use client";

import React, { useState } from 'react';
import { useAdminBanners } from '../hooks/useAdminBanners';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Search, Image as ImageIcon, Video, CalendarClock, MousePointerClick, Eye, Trash2, PlusCircle, PenSquare, Share, Globe } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { AdminBannerForm } from './AdminBannerForm';

interface AdminBannerListProps {}

export const AdminBannerList = ({}: AdminBannerListProps) => {
    const { 
        banners, isLoading, toggleActive, deleteBanner, 
        isToggling, isDeleting, createBanner, updateBanner,
        isCreating, isUpdating 
    } = useAdminBanners();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingBanner, setEditingBanner] = useState<any>(null);

    const filteredBanners = banners.filter((banner) => {
        return banner.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleDelete = (id: string, title: string) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn Banner: "${title}"?`)) {
            deleteBanner(id);
        }
    };

    const handleCreateBanner = (data: any) => {
        createBanner(data, {
            onSuccess: () => {
                setShowForm(false);
                setEditingBanner(null);
            }
        });
    };

    const handleUpdateBanner = (data: any) => {
        updateBanner({ id: editingBanner.id, data }, {
            onSuccess: () => {
                setShowForm(false);
                setEditingBanner(null);
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải danh sách Banners...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Control Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Tìm theo Tiêu đề Banner..."
                        className="pl-9 h-10 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                    <Button 
                        onClick={() => {
                            setEditingBanner(null);
                            setShowForm(true);
                        }}
                        className="w-full md:w-auto h-10 shadow-sm shadow-primary/20"
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Tạo Banner Mới
                    </Button>
                </div>
            </div>

            {/* Form Modal (Simple Overlay) */}
            {showForm && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
                        <AdminBannerForm 
                            banner={editingBanner}
                            onSubmit={editingBanner ? handleUpdateBanner : handleCreateBanner}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingBanner(null);
                            }}
                            isLoading={isCreating || isUpdating}
                        />
                    </div>
                </div>
            )}

            {/* Banner Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredBanners.length === 0 ? (
                    <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
                        Không tìm thấy Banner nào phù hợp.
                    </div>
                ) : (
                    filteredBanners.map((banner) => (
                        <div key={banner.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:border-primary/40 transition-all flex flex-col sm:flex-row overflow-hidden relative group">
                            
                            {/* Disabled Overlay */}
                            {!banner.is_active && (
                                <div className="absolute inset-0 bg-slate-50/60 backdrop-blur-[1px] z-10 pointer-events-none" />
                            )}
                            
                            {/* Left: Banner Preview (Thumbnail) */}
                            <div className="w-full sm:w-48 h-48 sm:h-auto bg-slate-100 relative group-hover:opacity-90 transition-opacity">
                                {banner.desktop_image_url ? (
                                    <img src={banner.desktop_image_url} alt={banner.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full text-slate-400">
                                        <ImageIcon className="w-8 h-8 opacity-50" />
                                    </div>
                                )}
                                
                                {/* Overlay gradient & type icon */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-between p-3">
                                    <div className="flex justify-end">
                                        <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 uppercase">
                                            {banner.type === 'VIDEO' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                                            {banner.type}
                                        </span>
                                    </div>
                                    <div className="text-white">
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 shadow-sm">{banner.position.replace('_', ' ')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="flex-1 p-5 relative z-20 flex flex-col">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-bold text-slate-800 text-lg leading-tight line-clamp-2">
                                            {banner.title}
                                        </h3>
                                        <label className="relative inline-flex items-center cursor-pointer shrink-0" title={banner.is_active ? "Đang phát" : "Đã tắt"}>
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer" 
                                                checked={banner.is_active} 
                                                disabled={isToggling}
                                                onChange={() => toggleActive({ id: banner.id, is_active: !banner.is_active })}
                                            />
                                            <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                    
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {(banner.pages || []).map(page => (
                                            <span key={page} className="text-[9px] font-bold bg-slate-100 text-slate-500 uppercase px-1.5 py-0.5 rounded border border-slate-200">
                                                {page}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <div className="bg-white p-1.5 rounded-md shadow-sm">
                                                <Eye className="w-4 h-4 text-sky-500" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] uppercase font-bold text-slate-400">Lượt Xem</div>
                                                <div className="text-sm font-black text-slate-700">{(banner.impressions || 0).toLocaleString()}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <div className="bg-white p-1.5 rounded-md shadow-sm">
                                                <MousePointerClick className="w-4 h-4 text-emerald-500" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] uppercase font-bold text-slate-400">Lượt Click</div>
                                                <div className="text-sm font-black text-slate-700">{(banner.clicks || 0).toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-slate-500">
                                        <CalendarClock className="w-3.5 h-3.5 text-slate-400" />
                                        {format(new Date(banner.start_date), 'dd/MM/yyyy')} 
                                        {banner.end_date ? (
                                            <> <span className="text-slate-300 mx-1">→</span> {format(new Date(banner.end_date), 'dd/MM/yyyy')} </>
                                        ) : (
                                            <> <span className="text-slate-300 mx-1">→</span> <span className="text-emerald-600">Không thời hạn</span> </>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                                    <div className="text-xs font-medium text-primary flex items-center gap-1 truncate w-48">
                                        {banner.action_url ? (
                                            <><Globe className="w-3 h-3" /> {banner.action_url}</>
                                        ) : banner.action_type !== 'NONE' ? (
                                            <><Share className="w-3 h-3" /> Link Tới: {banner.action_type}</>
                                        ) : (
                                            <span className="text-slate-400">Không có Link (Chỉ xem)</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/10"
                                            onClick={() => {
                                                setEditingBanner(banner);
                                                setShowForm(true);
                                            }}
                                        >
                                            <PenSquare className="w-4 h-4" />
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 text-rose-300 hover:text-rose-600 hover:bg-rose-50"
                                            onClick={() => handleDelete(banner.id, banner.title)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
