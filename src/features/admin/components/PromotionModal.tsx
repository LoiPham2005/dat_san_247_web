"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/common/Dialog';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { AdminPromotion, PromotionDiscountType } from '../api/admin-promotion.api';
import { format } from 'date-fns';
import { Calculator, Calendar, Info, Settings2, Users2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PromotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    promotion?: AdminPromotion | null;
    isSubmitting: boolean;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    promotion,
    isSubmitting
}) => {
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            code: '',
            name: '',
            description: '',
            discount_type: 'PERCENTAGE' as PromotionDiscountType,
            discount_value: 0,
            max_discount_amount: null as number | null,
            min_booking_amount: 0,
            usage_limit: null as number | null,
            max_usage_per_user: 1,
            is_public: true,
            valid_from: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
            valid_to: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm"),
        }
    });

    useEffect(() => {
        if (promotion) {
            reset({
                code: promotion.code,
                name: promotion.name,
                description: promotion.description || '',
                discount_type: promotion.discount_type,
                discount_value: Number(promotion.discount_value),
                max_discount_amount: promotion.max_discount_amount ? Number(promotion.max_discount_amount) : null,
                min_booking_amount: Number(promotion.min_booking_amount),
                usage_limit: promotion.usage_limit,
                max_usage_per_user: promotion.max_usage_per_user,
                is_public: promotion.is_public,
                valid_from: format(new Date(promotion.valid_from), "yyyy-MM-dd'T'HH:mm"),
                valid_to: format(new Date(promotion.valid_to), "yyyy-MM-dd'T'HH:mm"),
            });
        } else {
            reset({
                code: '',
                name: '',
                description: '',
                discount_type: 'PERCENTAGE',
                discount_value: 0,
                max_discount_amount: null,
                min_booking_amount: 0,
                usage_limit: null,
                max_usage_per_user: 1,
                is_public: true,
                valid_from: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
                valid_to: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm"),
            });
        }
    }, [promotion, reset, isOpen]);

    const discountType = watch('discount_type');

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[650px] !p-0 overflow-hidden border-none shadow-2xl">
                <div className="bg-white max-h-[90vh] flex flex-col">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 pb-4">
                        <DialogHeader className="!space-y-1">
                            <DialogTitle className="text-2xl font-black text-slate-800 flex items-center gap-2">
                                <Settings2 className="w-6 h-6 text-primary" />
                                {promotion ? 'Cập nhật Khuyến mãi' : 'Tạo Khuyến mãi mới'}
                            </DialogTitle>
                            <p className="text-xs text-slate-500 font-medium">Thiết lập các điều kiện và giá trị giảm giá cho chương trình</p>
                        </DialogHeader>
                    </div>

                    <form id="promotion-form" onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto flex-1 p-6 pt-2 space-y-6">
                        {/* Section 1: Basic Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                                <Info className="w-3.5 h-3.5" /> Thông tin cơ bản
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="code" className="text-sm font-bold text-slate-700 block ml-1">Mã khuyến mãi (Code) *</label>
                                    <Input
                                        id="code"
                                        {...register('code', { required: 'Bắt buộc nhập mã' })}
                                        placeholder="VD: SUMMER-2024"
                                        className="uppercase font-mono font-bold tracking-wider h-11 border-slate-200 focus:bg-white bg-slate-50/50"
                                    />
                                    {errors.code && <span className="text-[10px] font-bold text-rose-500 ml-1">{errors.code.message}</span>}
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="name" className="text-sm font-bold text-slate-700 block ml-1">Tên chương trình *</label>
                                    <Input
                                        id="name"
                                        {...register('name', { required: 'Bắt buộc nhập tên' })}
                                        placeholder="VD: Ưu đãi mùa hè"
                                        className="h-11 border-slate-200 focus:bg-white bg-slate-50/50 font-medium"
                                    />
                                    {errors.name && <span className="text-[10px] font-bold text-rose-500 ml-1">{errors.name.message}</span>}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="description" className="text-sm font-bold text-slate-700 block ml-1">Mô tả chương trình</label>
                                <Input
                                    id="description"
                                    {...register('description')}
                                    placeholder="Nội dung hiển thị cho khách hàng biết về khuyến mãi này"
                                    className="h-11 border-slate-200 focus:bg-white bg-slate-50/50 font-medium"
                                />
                            </div>
                        </div>

                        {/* Section 2: Values */}
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                                <Calculator className="w-3.5 h-3.5" /> Giá trị & Điều kiện
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="discount_type" className="text-sm font-bold text-slate-700 block ml-1">Hình thức giảm</label>
                                    <div className="relative">
                                        <select
                                            id="discount_type"
                                            {...register('discount_type')}
                                            className="w-full h-11 appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer hover:bg-white"
                                        >
                                            <option value="PERCENTAGE">Giảm theo %</option>
                                            <option value="FIXED_AMOUNT">Giảm tiền mặt (đ)</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="discount_value" className="text-sm font-bold text-slate-700 block ml-1">
                                        {discountType === 'PERCENTAGE' ? 'Phần trăm giảm *' : 'Số tiền giảm *'}
                                    </label>
                                    <Input
                                        id="discount_value"
                                        type="number"
                                        {...register('discount_value', { required: true, min: 1 })}
                                        className="h-11 border-slate-200 focus:bg-white bg-slate-50/50 font-black text-primary text-lg"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="max_discount_amount" className={cn("text-sm font-bold block ml-1", discountType === 'FIXED_AMOUNT' ? "text-slate-300" : "text-slate-700")}>Giảm tối đa (đ)</label>
                                    <Input
                                        id="max_discount_amount"
                                        type="number"
                                        {...register('max_discount_amount')}
                                        disabled={discountType === 'FIXED_AMOUNT'}
                                        placeholder={discountType === 'FIXED_AMOUNT' ? 'N/A' : 'Vô hạn'}
                                        className="h-11 border-slate-200 focus:bg-white bg-slate-50/50 font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="min_booking_amount" className="text-sm font-bold text-slate-700 block ml-1">Đơn tối thiểu (đ)</label>
                                    <Input id="min_booking_amount" type="number" {...register('min_booking_amount', { min: 0 })} className="h-11 border-slate-200 focus:bg-white bg-slate-50/50 font-medium" />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Limits & Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                                    <Users2 className="w-3.5 h-3.5" /> Giới hạn dùng
                                </div>
                                <div className="space-y-3">
                                    <div className="space-y-1.5">
                                        <label htmlFor="usage_limit" className="text-[11px] font-bold text-slate-500 uppercase ml-1">Tổng lượt sử dụng</label>
                                        <Input id="usage_limit" type="number" {...register('usage_limit')} placeholder="Không giới hạn" className="h-11 border-slate-200 bg-slate-50/50" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="max_usage_per_user" className="text-[11px] font-bold text-slate-500 uppercase ml-1">Mỗi khách hàng dùng tối đa</label>
                                        <Input id="max_usage_per_user" type="number" {...register('max_usage_per_user', { min: 1 })} className="h-11 border-slate-200 bg-slate-50/50" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                                    <Calendar className="w-3.5 h-3.5" /> Hiệu lực
                                </div>
                                <div className="space-y-3">
                                    <div className="space-y-1.5">
                                        <label htmlFor="valid_from" className="text-[11px] font-bold text-slate-500 uppercase ml-1">Bắt đầu từ</label>
                                        <Input id="valid_from" type="datetime-local" {...register('valid_from', { required: true })} className="h-11 border-slate-200 bg-slate-50/50 font-medium" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="valid_to" className="text-[11px] font-bold text-slate-500 uppercase ml-1">Kết thúc vào</label>
                                        <Input id="valid_to" type="datetime-local" {...register('valid_to', { required: true })} className="h-11 border-slate-200 bg-slate-50/50 font-medium" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visibility Checkbox */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between group transition-colors hover:bg-slate-100">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-800">Công khai chương trình</span>
                                <span className="text-[10px] text-slate-500 font-medium">Khách hàng sẽ thấy mã này trên hệ thống</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" {...register('is_public')} className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </form>

                    <DialogFooter className="p-6 pt-2 gap-3 bg-slate-50/50">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="h-11 px-8 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-white"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            form="promotion-form"
                            disabled={isSubmitting}
                            className="h-11 px-10 rounded-xl font-black bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all active:scale-95"
                        >
                            {isSubmitting ? 'Đang lưu...' : (promotion ? 'Lưu thay đổi' : 'Tạo khuyến mãi ngay')}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};
