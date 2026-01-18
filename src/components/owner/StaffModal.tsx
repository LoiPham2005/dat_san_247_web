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
import { useStaffStore } from '@/lib/store/staff.store';
import { useVenueStore } from '@/lib/store/venue.store';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const staffSchema = z.object({
    userId: z.string().min(1, 'Please select a user'),
    venueId: z.string().min(1, 'Please select a venue'),
});

type StaffFormValues = z.infer<typeof staffSchema>;

interface StaffModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const StaffModal = ({ isOpen, onClose }: StaffModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { addStaff } = useStaffStore();
    const { venues, fetchOwnerVenues } = useVenueStore();
    const { toast } = useToast();

    // In a real app, we might search for users with 'STAFF' role
    // For now, we'll just use a text input for userId or a simplified search
    // But since the API expects userId and venueId, we need those.

    const {
        register,
        handleSubmit,
        setValue,
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
        setIsLoading(true);
        try {
            await addStaff(data);
            toast({
                title: 'Staff added successfully',
            });
            reset();
            onClose();
        } catch (error: any) {
            console.error('Failed to add staff:', error);
            toast({
                title: 'Failed to add staff',
                description: error.message || 'Check if the user ID is valid',
            });
        } finally {
            setIsLoading(false);
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
                        <Label htmlFor="userId">User ID (Staff Account)</Label>
                        <Input
                            id="userId"
                            placeholder="Enter the staff user UUID"
                            {...register('userId')}
                        />
                        {errors.userId && (
                            <p className="text-xs text-red-500">{errors.userId.message}</p>
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
                        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Assign Staff
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
