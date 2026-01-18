'use client';

import { useState } from 'react';
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
import { useVenueStore } from '@/lib/store/venue.store';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const venueSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    district: z.string().min(2, 'District must be at least 2 characters'),
    ward: z.string().optional(),
    phone: z.string().min(10, 'Valid phone number required'),
});

type VenueFormValues = z.infer<typeof venueSchema>;

interface VenueModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VenueModal = ({ isOpen, onClose }: VenueModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { addVenue } = useVenueStore();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<VenueFormValues>({
        resolver: zodResolver(venueSchema),
    });

    const onSubmit = async (data: VenueFormValues) => {
        setIsLoading(true);
        try {
            // Generate a slug from name (simple version)
            const slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            await addVenue({ ...data, slug });
            toast({
                title: 'Venue created successfully',
            });
            reset();
            onClose();
        } catch (error: any) {
            console.error('Failed to create venue:', error);
            toast({
                title: 'Failed to create venue',
                description: error.message || 'Check your internet connection',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Venue</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Venue Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Central Park Football Field"
                            {...register('name')}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your facility..."
                            className="min-h-[100px]"
                            {...register('description')}
                        />
                        {errors.description && (
                            <p className="text-xs text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="e.g. Ho Chi Minh" {...register('city')} />
                            {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="district">District</Label>
                            <Input id="district" placeholder="e.g. District 1" {...register('district')} />
                            {errors.district && <p className="text-xs text-red-500">{errors.district.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="ward">Ward (Optional)</Label>
                            <Input id="ward" placeholder="e.g. Ward 5" {...register('ward')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" placeholder="0123456789" {...register('phone')} />
                            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Full Address</Label>
                        <Input
                            id="address"
                            placeholder="123 Street Name, Ward, District"
                            {...register('address')}
                        />
                        {errors.address && (
                            <p className="text-xs text-red-500">{errors.address.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Venue
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
