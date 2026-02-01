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
import { Select } from '@/components/ui/select';
import { useOwnerStaff } from '@/lib/hooks/useOwnerStaff';
import { useVenueStore } from '@/lib/store/venue.store';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const staffSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    venueId: z.string().min(1, 'Please select a venue'),
});

type StaffFormValues = z.infer<typeof staffSchema>;

interface StaffModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const StaffModal = ({ isOpen, onClose }: StaffModalProps) => {
    const { addStaff, isAdding } = useOwnerStaff();
    const { venues, fetchOwnerVenues } = useVenueStore();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<StaffFormValues>({
        resolver: zodResolver(staffSchema),
    });

    useEffect(() => {
        if (isOpen) {
            fetchOwnerVenues();
        }
    }, [isOpen, fetchOwnerVenues]);

    const onSubmit = async (data: StaffFormValues) => {
        try {
            await addStaff(data);
            reset();
            onClose();
        } catch (error: any) {
            // Error handling is already done in the hook's onError
            console.error('Failed to add staff:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Staff</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Staff Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="staff@example.com"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Select
                            label="Assign to Venue"
                            options={venues.map(v => ({ value: v.id, label: v.name }))}
                            {...register('venueId')}
                            error={errors.venueId?.message}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={isAdding}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isAdding}>
                            {isAdding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Assign Staff
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
