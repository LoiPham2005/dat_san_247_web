'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { promotionsService } from '@/lib/api/services/promotion.service';
import { Loader2, Ticket, Save, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { DiscountType, PromotionStatus, Promotion } from '@/types/promotion.types';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const promotionSchema = z.object({
    code: z.string().min(3, 'Code must be at least 3 characters').toUpperCase(),
    name: z.string().min(3, 'Name must be at least 3 characters'),
    description: z.string().optional(),
    discountType: z.nativeEnum(DiscountType),
    discountValue: z.coerce.number().min(0, 'Must be positive'),
    maxDiscountAmount: z.preprocess((val) => val === '' ? undefined : val, z.coerce.number().optional()),
    minBookingAmount: z.coerce.number().min(0).default(0),
    usageLimit: z.preprocess((val) => val === '' ? undefined : val, z.coerce.number().min(1).optional()),
    validFrom: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
    validTo: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
    status: z.nativeEnum(PromotionStatus).default(PromotionStatus.ACTIVE),
});

type PromotionFormValues = z.infer<typeof promotionSchema>;

interface PromotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    promotion?: Promotion | null;
}

export const PromotionModal = ({ isOpen, onClose, promotion }: PromotionModalProps) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<PromotionFormValues>({
        resolver: zodResolver(promotionSchema),
        defaultValues: {
            code: '',
            name: '',
            description: '',
            discountType: DiscountType.PERCENTAGE,
            discountValue: 0,
            minBookingAmount: 0,
            status: PromotionStatus.ACTIVE,
        },
    });

    useEffect(() => {
        if (isOpen) {
            if (promotion) {
                reset({
                    ...promotion,
                    validFrom: new Date(promotion.validFrom).toISOString().slice(0, 16),
                    validTo: new Date(promotion.validTo).toISOString().slice(0, 16),
                    maxDiscountAmount: promotion.maxDiscountAmount ?? undefined,
                    usageLimit: promotion.usageLimit ?? undefined,
                });
            } else {
                reset({
                    code: '',
                    name: '',
                    description: '',
                    discountType: DiscountType.PERCENTAGE,
                    discountValue: 0,
                    minBookingAmount: 0,
                    status: PromotionStatus.ACTIVE,
                    validFrom: new Date().toISOString().slice(0, 16),
                    validTo: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().slice(0, 16),
                });
            }
        }
    }, [isOpen, promotion, reset]);

    const mutation = useMutation({
        mutationFn: (data: PromotionFormValues) => {
            const payload = {
                ...data,
                validFrom: new Date(data.validFrom).toISOString(),
                validTo: new Date(data.validTo).toISOString(),
                maxDiscountAmount: data.maxDiscountAmount || null,
                usageLimit: data.usageLimit || null,
            };
            if (promotion) {
                return promotionsService.update(promotion.id, payload as any);
            }
            return promotionsService.create(payload as any);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-promotions"] });
            toast({
                title: 'Success',
                description: `Promotion ${promotion ? 'updated' : 'created'} successfully.`,
            });
            onClose();
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Something went wrong.',
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (data: PromotionFormValues) => {
        mutation.mutate(data);
    };

    const discountType = watch('discountType');

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-xl border-none shadow-xl">
                <div className="bg-[#3e8a42] p-6 text-white flex items-center justify-between">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            <Ticket className="h-5 w-5" />
                            {promotion ? 'Edit Promotion' : 'Add New Promotion'}
                        </DialogTitle>
                    </DialogHeader>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 bg-white dark:bg-gray-900">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label htmlFor="code" className="text-sm font-medium">Coupon Code</Label>
                            <Input
                                id="code"
                                {...register('code')}
                                placeholder="SUMMER2024"
                                className="h-10 uppercase font-bold"
                            />
                            {errors.code && <p className="text-xs text-red-500">{errors.code.message}</p>}
                        </div>

                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label htmlFor="name" className="text-sm font-medium">Campaign Name</Label>
                            <Input
                                id="name"
                                {...register('name')}
                                placeholder="Promotion Name"
                                className="h-10"
                            />
                            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label className="text-sm font-medium">Discount Type</Label>
                            <select
                                {...register('discountType')}
                                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3e8a42]"
                            >
                                <option value={DiscountType.PERCENTAGE}>Percentage (%)</option>
                                <option value={DiscountType.FIXED_AMOUNT}>Fixed Amount (đ)</option>
                            </select>
                        </div>

                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label className="text-sm font-medium">Discount Value</Label>
                            <Input
                                type="number"
                                {...register('discountValue')}
                                className="h-10"
                            />
                            {errors.discountValue && <p className="text-xs text-red-500">{errors.discountValue.message}</p>}
                        </div>

                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label className="text-sm font-medium">Start Date</Label>
                            <Input
                                type="datetime-local"
                                {...register('validFrom')}
                                className="h-10 text-sm"
                            />
                        </div>

                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label className="text-sm font-medium">End Date</Label>
                            <Input
                                type="datetime-local"
                                {...register('validTo')}
                                className="h-10 text-sm"
                            />
                        </div>

                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label className="text-sm font-medium">Usage Limit</Label>
                            <Input
                                type="number"
                                {...register('usageLimit')}
                                placeholder="Unlimited"
                                className="h-10"
                            />
                        </div>

                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label className="text-sm font-medium">Min Order Amount</Label>
                            <Input
                                type="number"
                                {...register('minBookingAmount')}
                                className="h-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Description</Label>
                        <Textarea
                            {...register('description')}
                            className="min-h-[80px]"
                        />
                    </div>

                    <DialogFooter className="pt-4 gap-2">
                        <Button type="button" variant="outline" onClick={onClose} className="h-10 px-6">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="bg-[#3e8a42] hover:bg-[#336e37] text-white h-10 px-8"
                        >
                            {mutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            {promotion ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
