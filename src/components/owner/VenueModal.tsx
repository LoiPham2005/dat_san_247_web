'use client';

import { useState, useRef } from 'react';
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
import { Loader2, Upload, X, CheckCircle2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/format';

const venueSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    district: z.string().min(2, 'District must be at least 2 characters'),
    ward: z.string().optional(),
    phone: z.string().min(10, 'Valid phone number required'),
    openingTime: z.string().default('06:00'),
    closingTime: z.string().default('22:00'),
});

type VenueFormValues = z.infer<typeof venueSchema>;

interface VenueModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const COMMON_AMENITIES = [
    'Parking', 'Wifi', 'Changing Room', 'Shower', 'Canteen', 'Floodlights', 'Security', 'Water'
];

export const VenueModal = ({ isOpen, onClose }: VenueModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [gallery, setGallery] = useState<File[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

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

    const toggleAmenity = (amenity: string) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setGallery(prev => [...prev, ...files].slice(0, 10)); // Max 10 images
        }
    };

    const removeGalleryImage = (index: number) => {
        setGallery(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data: VenueFormValues) => {
        setIsLoading(true);
        try {
            const formData = new FormData();

            // Append basic info
            Object.entries(data).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });

            // Append amenities
            if (selectedAmenities.length > 0) {
                formData.append('amenities', selectedAmenities.join(','));
            }

            // Append thumbnail
            if (thumbnail) {
                formData.append('thumbnail', thumbnail);
            }

            // Append gallery images
            gallery.forEach(file => {
                formData.append('images', file);
            });

            await addVenue(formData);

            toast({
                title: 'Venue created successfully',
            });

            // Reset state
            setThumbnail(null);
            setGallery([]);
            setSelectedAmenities([]);
            reset();
            onClose();
        } catch (error: any) {
            console.error('Failed to create venue:', error);
            toast({
                title: 'Failed to create venue',
                description: error.message || 'Check your internet connection',
                variant: 'destructive'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Sport Venue</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
                    {/* Basic Info Section */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Venue Name</Label>
                            <Input id="name" placeholder="e.g. Central Park Stadium" {...register('name')} />
                            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Describe your facility, rules, etc." className="min-h-[80px]" {...register('description')} />
                            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
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
                                <Label htmlFor="phone">Contact Phone</Label>
                                <Input id="phone" placeholder="090..." {...register('phone')} />
                                {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address No. & Street</Label>
                                <Input id="address" placeholder="123 Street Name..." {...register('address')} />
                                {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="openingTime">Opening Time</Label>
                                <Input id="openingTime" type="time" {...register('openingTime')} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="closingTime">Closing Time</Label>
                                <Input id="closingTime" type="time" {...register('closingTime')} />
                            </div>
                        </div>
                    </div>

                    {/* Amenities Section */}
                    <div className="space-y-3">
                        <Label>Amenities</Label>
                        <div className="flex flex-wrap gap-2">
                            {COMMON_AMENITIES.map(amenity => (
                                <button
                                    key={amenity}
                                    type="button"
                                    onClick={() => toggleAmenity(amenity)}
                                    className={cn(
                                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors border",
                                        selectedAmenities.includes(amenity)
                                            ? "bg-primary-100 text-primary-800 border-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:border-primary-800"
                                            : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
                                    )}
                                >
                                    {selectedAmenities.includes(amenity) && <CheckCircle2 className="mr-1 h-3 w-3" />}
                                    {amenity}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label>Main Thumbnail</Label>
                            <div className={cn(
                                "relative aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all",
                                thumbnail ? "border-primary-500" : "border-gray-200 hover:border-primary-400"
                            )}>
                                {thumbnail ? (
                                    <>
                                        <img src={URL.createObjectURL(thumbnail)} className="h-full w-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setThumbnail(null)}
                                            className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </>
                                ) : (
                                    <label className="cursor-pointer flex flex-col items-center p-4 text-center">
                                        <Upload className="h-8 w-8 text-gray-300 mb-2" />
                                        <span className="text-xs font-medium text-gray-500">Pick Cover Photo</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label>Gallery Images ({gallery.length}/10)</Label>
                            <div className="grid grid-cols-4 gap-2">
                                {gallery.map((file, i) => (
                                    <div key={i} className="relative aspect-square rounded-lg bg-gray-100 overflow-hidden group">
                                        <img src={URL.createObjectURL(file)} className="h-full w-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeGalleryImage(i)}
                                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                {gallery.length < 10 && (
                                    <label className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/10 transition-all">
                                        <Plus className="h-5 w-5 text-gray-400" />
                                        <input type="file" className="hidden" accept="image/*" multiple onChange={handleGalleryChange} />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="sticky bottom-0 bg-white pt-4 dark:bg-gray-950 border-t mt-4">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading} className="px-8">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Facility'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
