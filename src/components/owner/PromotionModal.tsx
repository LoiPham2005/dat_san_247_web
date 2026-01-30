'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useOwnerPromotions } from "@/lib/hooks/useOwnerPromotions";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { DiscountType } from "@/types/promotion.types";

const promotionSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    code: z.string().min(3, "Code must be at least 3 characters").toUpperCase(),
    description: z.string().optional(),
    discountType: z.nativeEnum(DiscountType),
    discountValue: z.coerce.number().min(1),
    minBookingAmount: z.coerce.number().min(0).default(0),
    maxDiscountAmount: z.coerce.number().min(0).optional(),
    usageLimit: z.coerce.number().min(1).default(100),
    validFrom: z.string().min(1, "Start date is required"),
    validTo: z.string().min(1, "End date is required"),
});

type PromotionFormValues = z.infer<typeof promotionSchema>;

interface PromotionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PromotionModal({ isOpen, onClose }: PromotionModalProps) {
    const { createPromotion, isCreating } = useOwnerPromotions();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<PromotionFormValues>({
        resolver: zodResolver(promotionSchema),
        defaultValues: {
            name: "",
            code: "",
            description: "",
            discountType: DiscountType.PERCENTAGE,
            discountValue: 0,
            minBookingAmount: 0,
            usageLimit: 100,
            validFrom: new Date().toISOString().split('T')[0],
            validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
    });

    const onSubmit = async (values: PromotionFormValues) => {
        try {
            await createPromotion(values);
            onClose();
            reset();
        } catch (error) {
            // Error handled by hook
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New Promotion</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Promotion Name</Label>
                        <Input id="name" placeholder="e.g. Summer Sale" {...register('name')} />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="code">Promo Code</Label>
                            <Input id="code" placeholder="SUMMER20" {...register('code')} />
                            {errors.code && <p className="text-xs text-red-500">{errors.code.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="discountType">Discount Type</Label>
                            <Select
                                id="discountType"
                                options={[
                                    { value: DiscountType.PERCENTAGE, label: 'Percentage (%)' },
                                    { value: DiscountType.FIXED_AMOUNT, label: 'Fixed Amount (VND)' }
                                ]}
                                {...register('discountType')}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="discountValue">Discount Value</Label>
                            <Input id="discountValue" type="number" {...register('discountValue')} />
                            {errors.discountValue && <p className="text-xs text-red-500">{errors.discountValue.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="usageLimit">Usage Limit</Label>
                            <Input id="usageLimit" type="number" {...register('usageLimit')} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="validFrom">Start Date</Label>
                            <Input id="validFrom" type="date" {...register('validFrom')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="validTo">End Date</Label>
                            <Input id="validTo" type="date" {...register('validTo')} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea id="description" {...register('description')} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isCreating}>
                            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Promotion
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
