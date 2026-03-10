"use client";

import React, { useState } from 'react';
import { useAdminPromotions } from '../hooks/useAdminPromotions';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Search, Tag, CalendarClock, Users, ArchiveRestore, Clock, TicketPercent, CheckCircle2, Trash2, PlusCircle, PenSquare } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export const AdminPromotionList = () => {
    const { promotions, isLoading, toggleActive, deletePromotion, isToggling, isDeleting } = useAdminPromotions();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPromotions = promotions.filter((promo) => {
        return promo.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
               (promo.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleDelete = (id: string, code: string) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn Khuyến Mãi mã: ${code}?`)) {
            deletePromotion(id);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải danh sách Khuyến mãi...</p>
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
                        placeholder="Tìm mã Code, Mô tả..."
                        className="pl-9 h-10 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                    <Button className="w-full md:w-auto h-10 shadow-sm shadow-primary/20">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Tạo Khuyến Mãi Mới
                    </Button>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPromotions.length === 0 ? (
                    <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
                        Không tìm thấy Khuyến mãi nào phù hợp.
                    </div>
                ) : (
                    filteredPromotions.map((promo) => (
                        <div key={promo.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:border-primary/40 transition-all flex flex-col md:flex-row overflow-hidden relative group">
                            
                            {/* Disabled Overlay Overlay */}
                            {!promo.is_active && (
                                <div className="absolute inset-0 bg-slate-50/50 z-10 pointer-events-none" />
                            )}
                            
                            {/* Left Strip: Ticket Visual */}
                            <div className={`w-full md:w-32 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-dashed border-slate-300 relative ${promo.is_active ? 'bg-primary' : 'bg-slate-300'}`}>
                                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-50 rounded-full hidden md:block" />
                                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full hidden md:block border-l border-dashed border-slate-300" />
                                
                                <TicketPercent className="w-8 h-8 text-white/80 mb-2" />
                                <div className="text-white font-black text-xl leading-none text-center">
                                    {promo.discount_type === 'PERCENTAGE' && `${promo.discount_value}%`}
                                    {promo.discount_type === 'FIXED_AMOUNT' && `${(promo.discount_value / 1000)}K`}
                                    {promo.discount_type === 'HOURS_FREE' && `${promo.discount_value} Giờ`}
                                </div>
                                <div className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1 text-center">
                                    {promo.discount_type === 'PERCENTAGE' ? 'Phần trăm' : promo.discount_type === 'FIXED_AMOUNT' ? 'Trực tiếp' : 'Giờ miễn phí'}
                                </div>
                            </div>

                            {/* Center Content */}
                            <div className="flex-1 p-5 pr-20 relative z-20">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="font-mono font-black text-slate-800 tracking-wider text-base bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block truncate">
                                        {promo.code}
                                    </span>
                                    {promo.is_system ? (
                                        <span className="bg-rose-100 text-rose-700 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">Hệ Thống (Toàn Sàn)</span>
                                    ) : (
                                        <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">Sân Chỉ Định</span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed min-h-[40px] line-clamp-2">
                                    {promo.description}
                                </p>

                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold bg-slate-50 p-1.5 rounded-md border border-slate-100">
                                        <CalendarClock className="w-3.5 h-3.5 text-slate-400" />
                                        <span>
                                            {format(new Date(promo.start_date), 'dd/MM/yyyy')} 
                                            <span className="mx-1 text-slate-300">→</span> 
                                            {format(new Date(promo.end_date), 'dd/MM/yyyy')}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold bg-slate-50 p-1.5 rounded-md border border-slate-100">
                                            <ArchiveRestore className="w-3.5 h-3.5 text-slate-400" />
                                            Đơn tối thiểu: {promo.min_booking_amount ? `${promo.min_booking_amount.toLocaleString('vi-VN')}đ` : '0đ'}
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold bg-slate-50 p-1.5 rounded-md border border-slate-100">
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-3.5 h-3.5 text-slate-400" />
                                                Đã dùng:
                                            </div>
                                            <span className="font-bold text-slate-700 text-right pr-1">
                                                {promo.used_count} / {promo.usage_limit || '∞'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right Action Bar */}
                            <div className="absolute top-0 right-0 bottom-0 w-14 border-l border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-2 z-20">
                                {/* Toggle Switch Container */}
                                <div className="mb-4">
                                    <label className="relative inline-flex items-center cursor-pointer" title={promo.is_active ? "Đang bật" : "Bị tắt"}>
                                        <input 
                                            type="checkbox" 
                                            value="" 
                                            className="sr-only peer" 
                                            checked={promo.is_active} 
                                            disabled={isToggling}
                                            onChange={() => toggleActive({ id: promo.id, is_active: !promo.is_active })}
                                        />
                                        <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>

                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/10">
                                    <PenSquare className="w-4 h-4" />
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-rose-300 hover:text-rose-600 hover:bg-rose-50"
                                    onClick={() => handleDelete(promo.id, promo.code)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
