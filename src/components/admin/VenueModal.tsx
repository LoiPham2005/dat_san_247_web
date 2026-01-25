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
import { venueService } from '@/lib/api/services/venue.service';
import { Loader2, Save, X } from 'lucide-react';
import { Venue, VenueStatus } from '@/types/venue.types';
import { useToast } from '@/components/ui/use-toast';

const venueSchema = z.object({
    name: z.string().min(2, 'Tên sân phải có ít nhất 2 ký tự'),
    address: z.string().min(5, 'Địa chỉ quá ngắn'),
    city: z.string().min(2, 'Vui lòng nhập thành phố'),
    phone: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean(),
    isFeatured: z.boolean(),
});

type VenueFormValues = z.infer<typeof venueSchema>;

interface VenueModalProps {
    venue: Venue | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const VenueModal = ({ venue, isOpen, onClose, onSuccess }: VenueModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<VenueFormValues>({
        resolver: zodResolver(venueSchema),
        defaultValues: {
            name: '',
            address: '',
            city: '',
            phone: '',
            description: '',
            isActive: true,
            isFeatured: false,
        },
    });

    useEffect(() => {
        if (venue) {
            reset({
                name: venue.name,
                address: venue.address,
                city: venue.city,
                phone: venue.phone || '',
                description: venue.description || '',
                isActive: venue.isActive,
                isFeatured: venue.isFeatured,
            });
        }
    }, [venue, reset]);

    const onSubmit = async (data: VenueFormValues) => {
        if (!venue) return;
        setIsLoading(true);
        try {
            // Using a specific admin update method
            await venueService.adminUpdateVenue(venue.id, data);
            toast({

                title: 'Thành công',
                description: 'Thông tin sân đã được cập nhật.',
                className: 'bg-green-600 text-white border-none'
            });
            onSuccess();
            onClose();
        } catch (error: any) {
            toast({
                title: 'Lỗi',
                description: error.response?.data?.message || 'Không thể cập nhật thông tin sân.',
                variant: 'destructive'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-600 to-indigo-600 p-8 text-white relative">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">Chỉnh sửa thông tin sân</DialogTitle>
                        <p className="text-white/80 text-sm font-medium">Thay đổi thông tin cơ bản của hệ thống sân {venue?.name}</p>
                    </DialogHeader>
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 bg-white dark:bg-gray-900">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tên sân</Label>
                            <Input
                                {...register('name')}
                                className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:border-primary-500 font-bold"
                            />
                            {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Số điện thoại</Label>
                            <Input
                                {...register('phone')}
                                className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:border-primary-500 font-bold"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Địa chỉ</Label>
                            <Input
                                {...register('address')}
                                className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:border-primary-500 font-bold"
                            />
                            {errors.address && <p className="text-xs text-red-500 font-bold">{errors.address.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Thành phố</Label>
                            <Input
                                {...register('city')}
                                className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:border-primary-500 font-bold"
                            />
                        </div>

                        <div className="flex items-center gap-8 md:col-span-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    {...register('isActive')}
                                    className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                                />
                                <Label htmlFor="isActive" className="text-sm font-black uppercase tracking-tighter cursor-pointer">Hoạt động (Active)</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isFeatured"
                                    {...register('isFeatured')}
                                    className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                                />
                                <Label htmlFor="isFeatured" className="text-sm font-black uppercase tracking-tighter cursor-pointer text-orange-600">Nổi bật (Featured)</Label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-4 gap-3">
                        <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl font-black uppercase tracking-widest text-xs h-12 px-6">
                            Hủy bỏ
                        </Button>
                        <Button type="submit" disabled={isLoading} className="bg-gray-900 text-white hover:bg-primary-600 rounded-xl font-black uppercase tracking-widest text-xs h-12 px-8 shadow-xl transition-all">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Lưu thay đổi
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
