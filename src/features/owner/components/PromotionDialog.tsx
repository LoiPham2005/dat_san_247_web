
"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/common/Dialog';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { useCreatePromotion, useUpdatePromotion } from '../hooks/useOwnerMarketing';
import { OwnerPromotion, PromotionDiscountType } from '../api/owner-marketing.api';
import { Tag, Calendar, DollarSign, Percent, Info, Clock } from 'lucide-react';

interface PromotionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    venueId: string;
    promotion?: OwnerPromotion | null;
}

export const PromotionDialog = ({ isOpen, onClose, venueId, promotion }: PromotionDialogProps) => {
    const isEdit = !!promotion;
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        description: '',
        discount_type: 'PERCENTAGE' as PromotionDiscountType,
        discount_value: 0,
        max_discount_amount: undefined as number | undefined,
        min_booking_amount: 0,
        usage_limit: undefined as number | undefined,
        max_usage_per_user: 1,
        valid_from: new Date().toISOString().split('T')[0],
        valid_to: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
        venue_ids: [venueId]
    });

    useEffect(() => {
        if (isOpen) {
            if (promotion) {
                setFormData({
                    code: promotion.code,
                    name: promotion.name,
                    description: promotion.description || '',
                    discount_type: promotion.discount_type,
                    discount_value: promotion.discount_value,
                    max_discount_amount: promotion.max_discount_amount || undefined,
                    min_booking_amount: promotion.min_booking_amount,
                    usage_limit: promotion.usage_limit || undefined,
                    max_usage_per_user: 1, // Defaulting for simple UI
                    valid_from: promotion.valid_from.split('T')[0],
                    valid_to: promotion.valid_to.split('T')[0],
                    venue_ids: [venueId]
                });
            } else {
                setFormData({
                    code: '',
                    name: '',
                    description: '',
                    discount_type: 'PERCENTAGE',
                    discount_value: 0,
                    max_discount_amount: undefined,
                    min_booking_amount: 0,
                    usage_limit: undefined,
                    max_usage_per_user: 1,
                    valid_from: new Date().toISOString().split('T')[0],
                    valid_to: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
                    venue_ids: [venueId]
                });
            }
        }
    }, [isOpen, promotion, venueId]);

    const { mutate: createPromotion, isPending: isCreating } = useCreatePromotion(venueId);
    const { mutate: updatePromotion, isPending: isUpdating } = useUpdatePromotion(venueId);

    const isPending = isCreating || isUpdating;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const payload = {
            ...formData,
            code: formData.code.toUpperCase().trim(),
            discount_value: Number(formData.discount_value),
            max_discount_amount: formData.max_discount_amount ? Number(formData.max_discount_amount) : null,
            min_booking_amount: Number(formData.min_booking_amount),
            usage_limit: formData.usage_limit ? Number(formData.usage_limit) : null,
            valid_from: new Date(formData.valid_from).toISOString(),
            valid_to: new Date(formData.valid_to).toISOString(),
        };

        if (isEdit && promotion) {
            updatePromotion({ id: promotion.id, data: payload }, { onSuccess: onClose });
        } else {
            createPromotion(payload, { onSuccess: onClose });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-0 shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 px-8 py-6 text-white">
                        <DialogTitle className="text-2xl font-black mb-1">
                            {isEdit ? "Cập Nhật Khuyến Mãi" : "Tạo Khuyến Mãi Mới"}
                        </DialogTitle>
                        <p className="text-emerald-100/80 text-sm font-medium">Thiết lập các mã giảm giá để thu hút khách hàng đặt sân.</p>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* CODE */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Tag className="w-3.5 h-3.5" /> Mã Giảm Giá
                                </label>
                                <Input 
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    placeholder="VD: GIAMGIA20"
                                    className="h-12 rounded-xl font-black text-emerald-600 tracking-wider uppercase border-slate-200 focus:border-emerald-500"
                                    required
                                    maxLength={20}
                                />
                                <p className="text-[10px] text-slate-400 font-medium">Khách hàng sẽ nhập mã này khi thanh toán.</p>
                            </div>

                            {/* NAME */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Info className="w-3.5 h-3.5" /> Tên Chương Trình
                                </label>
                                <Input 
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="VD: Ưu đãi khai trương"
                                    className="h-12 rounded-xl font-bold border-slate-200 focus:border-emerald-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Info className="w-3.5 h-3.5" /> Mô tả (Tùy chọn)
                            </label>
                            <Textarea 
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Mô tả ngắn gọn về chương trình khuyến mãi..."
                                className="rounded-xl border-slate-200 focus:border-emerald-500"
                            />
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6">
                            <h4 className="text-sm font-black text-slate-800 border-b border-slate-200 pb-2">Cấu Hình Giảm Giá</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* DISCOUNT TYPE */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Loại Giảm Giá</label>
                                    <select 
                                        className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 font-bold text-slate-700 focus:border-emerald-500"
                                        value={formData.discount_type}
                                        onChange={(e) => setFormData({ ...formData, discount_type: e.target.value as PromotionDiscountType })}
                                    >
                                        <option value="PERCENTAGE">Theo Phần Trăm (%)</option>
                                        <option value="FIXED_AMOUNT">Số Tiền Cố Định (VNĐ)</option>
                                    </select>
                                </div>

                                {/* DISCOUNT VALUE */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                                        Giá Trị Giảm {formData.discount_type === 'PERCENTAGE' ? '(%)' : '(VNĐ)'}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            {formData.discount_type === 'PERCENTAGE' ? <Percent className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                                        </div>
                                        <Input 
                                            type="number"
                                            value={formData.discount_value}
                                            onChange={(e) => setFormData({ ...formData, discount_value: Number(e.target.value) })}
                                            className="h-12 pl-12 rounded-xl font-bold border-slate-200 focus:border-emerald-500"
                                            required
                                            min={0}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* MAX DISCOUNT AMOUNT */}
                                {formData.discount_type === 'PERCENTAGE' && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Giảm Tối Đa (VNĐ)</label>
                                        <Input 
                                            type="number"
                                            value={formData.max_discount_amount || ''}
                                            onChange={(e) => setFormData({ ...formData, max_discount_amount: e.target.value ? Number(e.target.value) : undefined })}
                                            className="h-12 rounded-xl border-slate-200 focus:border-emerald-500"
                                            placeholder="Không giới hạn"
                                        />
                                    </div>
                                )}

                                {/* MIN BOOKING AMOUNT */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Giá Trị Đơn Tối Thiểu (VNĐ)</label>
                                    <Input 
                                        type="number"
                                        value={formData.min_booking_amount}
                                        onChange={(e) => setFormData({ ...formData, min_booking_amount: Number(e.target.value) })}
                                        className="h-12 rounded-xl border-slate-200 focus:border-emerald-500"
                                        required
                                        min={0}
                                    />
                                </div>

                                {/* USAGE LIMIT */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Giới Hạn Lượt Dùng</label>
                                    <Input 
                                        type="number"
                                        value={formData.usage_limit || ''}
                                        onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value ? Number(e.target.value) : undefined })}
                                        className="h-12 rounded-xl border-slate-200 focus:border-emerald-500"
                                        placeholder="Không giới hạn"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* VALIDITY */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5" /> Ngày Bắt Đầu
                                </label>
                                <Input 
                                    type="date"
                                    value={formData.valid_from}
                                    onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                                    className="h-12 rounded-xl border-slate-200 focus:border-emerald-500 appearance-none inline-block w-full"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5" /> Ngày Hết Hạn
                                </label>
                                <Input 
                                    type="date"
                                    value={formData.valid_to}
                                    onChange={(e) => setFormData({ ...formData, valid_to: e.target.value })}
                                    className="h-12 rounded-xl border-slate-200 focus:border-emerald-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border-t border-slate-100 flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-12 rounded-xl font-bold text-slate-600"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="flex-[2] h-12 rounded-xl font-black bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                        >
                            {isPending ? "Đang xử lý..." : (isEdit ? "Cập Nhật Ngay" : "Tạo Khuyến Mãi")}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
