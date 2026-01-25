'use client';

import React, { useState, useEffect } from 'react';
import {
    MapPin,
    Star,
    Clock,
    Image as ImageIcon,
    Settings,
    Calendar as CalendarIcon,
    MessageSquare,
    BarChart3,
    Edit,
    Save,
    Trash,
    Plus,
    X,
    Loader2,
    Upload,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/format";
import { venueService } from '@/lib/api/services/venue.service';
import { useToast } from '@/components/ui/use-toast';
import { useOwnerVenueDetailsStore } from '@/lib/store/owner-venue-details.store';
import { DayOfWeek } from '@/types/venue.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useVenueStore } from '@/lib/store/venue.store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const venueSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    district: z.string().min(2, 'District must be at least 2 characters'),
    phone: z.string().min(10, 'Valid phone number required'),
    openingTime: z.string().optional(),
    closingTime: z.string().optional(),
});

type VenueFormValues = z.infer<typeof venueSchema>;

const COMMON_AMENITIES = [
    'Parking', 'Wifi', 'Changing Room', 'Shower', 'Canteen', 'Floodlights', 'Security', 'Water'
];

export default function VenueDetailsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = React.use(paramsPromise);
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState('info');
    const [isMounted, setIsMounted] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const { toast } = useToast();

    const {
        setVenueId,
        fetchBookings,
        fetchReviews,
        fetchStats
    } = useOwnerVenueDetailsStore();

    useEffect(() => {
        setIsMounted(true);
        setIsHydrated(true);
    }, []);

    const {
        data: venue,
        isLoading,
        error: venueError,
        refetch: refetchVenue
    } = useQuery({
        queryKey: ['owner-venue', params.id],
        queryFn: () => venueService.getOwnerVenueById(params.id),
        enabled: isMounted
    });

    useEffect(() => {
        if (isMounted && venue) {
            setVenueId(params.id);
            // Fetch supplementary data (these could also be useQuery)
            fetchBookings();
            fetchReviews();
            fetchStats();
        }
    }, [params.id, isMounted, venue, setVenueId, fetchBookings, fetchReviews, fetchStats]);

    if (!isHydrated || !isMounted || isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    if (venueError) {
        return (
            <div className="flex h-[400px] flex-col items-center justify-center gap-4 text-red-500">
                <p className="font-bold">Failed to load venue details</p>
                <Button onClick={() => refetchVenue()}>Retry</Button>
            </div>
        );
    }

    const tabs = [
        { id: 'info', label: 'General Info', icon: Settings },
        { id: 'schedule', label: 'Availability & Price', icon: CalendarIcon },
        { id: 'bookings', label: 'Bookings', icon: Clock },
        { id: 'reviews', label: 'Reviews', icon: MessageSquare },
        { id: 'stats', label: 'Statistics', icon: BarChart3 },
    ];

    return (
        <div className="space-y-8 pb-8">
            {/* Header Section */}
            <div className="relative rounded-3xl bg-white dark:bg-gray-900 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="h-64 w-full bg-gray-100 relative">
                    <img src={venue?.images?.find((img: any) => img.isPrimary)?.url || venue?.images?.[0]?.url || `https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=1200&h=400&fit=crop`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-6 left-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <Badge className={cn(
                                "border-none",
                                venue?.status === 'APPROVED' ? "bg-green-500" : "bg-amber-500 uppercase font-bold"
                            )}>{venue?.status}</Badge>
                            <span className="flex items-center text-sm font-medium bg-black/20 backdrop-blur-md px-2 py-1 rounded-lg">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" /> {(Number(venue?.rating) || 0).toFixed(1)} ({venue?.totalReviews || 0} reviews)
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold uppercase tracking-tight">{venue?.name}</h1>
                        <p className="flex items-center text-gray-200 mt-1">
                            <MapPin className="h-4 w-4 mr-1 text-primary-400" /> {venue?.address}, {venue?.district}, {venue?.city}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-8 border-b border-gray-100 dark:border-gray-800 flex items-center gap-8 overflow-x-auto bg-white dark:bg-gray-900">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 py-5 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap",
                                activeTab === tab.id
                                    ? "border-primary-600 text-primary-600"
                                    : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                            )}
                        >
                            <tab.icon className="h-3.5 w-3.5" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === 'info' && venue && <InfoTab venue={venue} />}
                {activeTab === 'schedule' && venue && <ScheduleTab venue={venue} />}
                {activeTab === 'bookings' && <BookingsTab />}
                {activeTab === 'reviews' && <ReviewsTab />}
                {activeTab === 'stats' && <StatsTab />}
            </div>
        </div>
    );
}

function InfoTab({ venue }: any) {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
        venue.amenities?.map((a: any) => typeof a === 'string' ? a : a.name) || []
    );
    const { updateVenue } = useVenueStore();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<VenueFormValues>({
        resolver: zodResolver(venueSchema),
        defaultValues: {
            name: venue.name,
            description: venue.description,
            address: venue.address,
            city: venue.city,
            district: venue.district,
            phone: venue.phone,
            openingTime: venue.openingTime?.slice(0, 5),
            closingTime: venue.closingTime?.slice(0, 5),
        }
    });

    const toggleAmenity = (amenity: string) => {
        if (!isEditing) return;
        setSelectedAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };

    const onSubmit = async (data: VenueFormValues) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });

            if (selectedAmenities.length > 0) {
                formData.append('amenities', selectedAmenities.join(','));
            }

            if (thumbnail) {
                formData.append('thumbnail', thumbnail);
            }

            await updateVenue(venue.id, formData);
            toast({ title: 'Success', description: 'Venue updated successfully' });
            setIsEditing(false);
            setThumbnail(null); // Reset local thumbnail after success
            // Invalidate query to refresh data
            queryClient.invalidateQueries({ queryKey: ['owner-venue', venue.id] });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to update venue',
                variant: 'destructive'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="p-8 rounded-3xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-xl uppercase tracking-tight">General Information</h3>
                            <p className="text-sm text-gray-400 mt-1">Update your venue basic details and contact info.</p>
                        </div>
                        {!isEditing ? (
                            <Button type="button" size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Details
                            </Button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button type="button" size="sm" variant="ghost" onClick={() => { setIsEditing(false); reset(); }}>Cancel</Button>
                                <Button type="submit" size="sm" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Venue Name</Label>
                            <Input
                                id="name"
                                disabled={!isEditing}
                                {...register('name')}
                                className={cn("h-12 rounded-xl bg-gray-50 border-none font-bold", !isEditing && "opacity-80")}
                            />
                            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Description</Label>
                            <Textarea
                                id="description"
                                disabled={!isEditing}
                                {...register('description')}
                                className={cn("min-h-[120px] rounded-xl bg-gray-50 border-none", !isEditing && "opacity-80")}
                            />
                            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Address</Label>
                                <Input
                                    id="address"
                                    disabled={!isEditing}
                                    {...register('address')}
                                    className="h-12 rounded-xl bg-gray-50 border-none"
                                />
                                {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Contact Phone</Label>
                                <Input
                                    id="phone"
                                    disabled={!isEditing}
                                    {...register('phone')}
                                    className="h-12 rounded-xl bg-gray-50 border-none"
                                />
                                {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">City</Label>
                                <Input id="city" disabled={!isEditing} {...register('city')} className="h-12 rounded-xl bg-gray-50 border-none" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="district" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">District</Label>
                                <Input id="district" disabled={!isEditing} {...register('district')} className="h-12 rounded-xl bg-gray-50 border-none" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="openingTime" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Opening Time</Label>
                                <Input id="openingTime" type="time" disabled={!isEditing} {...register('openingTime')} className="h-12 rounded-xl bg-gray-50 border-none" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="closingTime" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Closing Time</Label>
                                <Input id="closingTime" type="time" disabled={!isEditing} {...register('closingTime')} className="h-12 rounded-xl bg-gray-50 border-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Amenities */}
                <div className="p-8 rounded-3xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <h3 className="font-bold text-xl uppercase tracking-tight mb-6">Available Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                        {COMMON_AMENITIES.map((name) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => toggleAmenity(name)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all flex items-center gap-2",
                                    selectedAmenities.includes(name)
                                        ? "bg-primary-100 text-primary-800 border-primary-200"
                                        : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100"
                                )}
                            >
                                {selectedAmenities.includes(name) && <CheckCircle2 className="h-3 w-3" />}
                                {name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Thumbnail Display/Update */}
                <div className="p-8 rounded-3xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <h3 className="font-bold text-xl uppercase tracking-tight mb-6">Main Logo / Cover</h3>
                    <div className="relative aspect-square rounded-2xl bg-gray-100 overflow-hidden group border-2 border-dashed border-gray-200">
                        {thumbnail ? (
                            <img src={URL.createObjectURL(thumbnail)} className="w-full h-full object-cover" />
                        ) : (
                            <img src={venue.thumbnailUrl || `https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=400&h=400&fit=crop`} className="w-full h-full object-cover" />
                        )}

                        {isEditing && (
                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                                <Upload className="h-8 w-8 mb-2" />
                                <span className="text-xs font-bold uppercase tracking-widest">Change Image</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                                />
                            </label>
                        )}
                    </div>
                    {thumbnail && (
                        <Button type="button" variant="ghost" size="sm" className="w-full mt-2 text-xs" onClick={() => setThumbnail(null)}>
                            Reset Change
                        </Button>
                    )}
                </div>

                {/* Gallery Preview (Managed separately or in future) */}
                <div className="p-8 rounded-3xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm opacity-60">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-xl uppercase tracking-tight">Gallery</h3>
                        <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest">SOON</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {venue.images?.slice(0, 4).map((img: any, i: number) => (
                            <div key={i} className="aspect-square rounded-xl bg-gray-100 overflow-hidden">
                                <img src={img.imageUrl} className="w-full h-full object-cover grayscale" />
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-[10px] text-gray-500 text-center uppercase font-bold">Manage Gallery in separate tab</p>
                </div>
            </div>
        </form>
    )
}

// Ensure icons are imported or added to existing imports

function ScheduleTab({ venue }: { venue: any }) {
    const queryClient = useQueryClient();
    const [selectedCourt, setSelectedCourt] = useState<any>(null);
    const [isAddingCourt, setIsAddingCourt] = useState(false);
    const [editingCourt, setEditingCourt] = useState<any>(null);
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const { toast } = useToast();
    const [courts, setCourts] = useState<any[]>(venue?.courts || []);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setCourts(venue?.courts || []);
        if (selectedCourt) {
            const updated = (venue?.courts || []).find((c: any) => c.id === selectedCourt.id);
            if (updated) setSelectedCourt(updated);
        }
    }, [venue?.courts, selectedCourt]);

    const handleAddCourt = async (data: any) => {
        setIsLoading(true);
        try {
            await venueService.createOwnerCourt({ ...data, venueId: venue.id });
            toast({ title: "Success", description: "Court added successfully" });
            queryClient.invalidateQueries({ queryKey: ['owner-venue', venue.id] });
        } catch (error) {
            toast({ title: "Error", description: "Failed to add court", variant: "destructive" });
        } finally {
            setIsLoading(false);
            setIsAddingCourt(false);
        }
    };

    const handleEditCourt = async (data: any) => {
        setIsLoading(true);
        try {
            await venueService.updateOwnerCourt(editingCourt.id, data);
            toast({ title: "Success", description: "Court updated successfully" });
            queryClient.invalidateQueries({ queryKey: ['owner-venue', venue.id] });
            setEditingCourt(null);
        } catch (error) {
            toast({ title: "Error", description: "Failed to update court", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCourt = async (id: string) => {
        if (!confirm('Are you sure you want to delete this court?')) return;
        try {
            await venueService.deleteOwnerCourt(id);
            toast({ title: "Success", description: "Court deleted successfully" });
            queryClient.invalidateQueries({ queryKey: ['owner-venue', venue.id] });
            if (selectedCourt?.id === id) setSelectedCourt(null);
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete court", variant: "destructive" });
        }
    };

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            {/* Courts List - Grouped by Sport Type */}
            <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-bold text-lg">Danh Sách Sân</h3>
                        <p className="text-xs text-gray-500">{courts.length} sân trong tổng số</p>
                    </div>
                    <Button size="sm" onClick={() => setIsAddingCourt(true)}>
                        <Plus className="h-4 w-4 mr-2" /> Thêm Sân
                    </Button>
                </div>

                {/* Group courts by sport type */}
                {(() => {
                    const grouped = courts.reduce((acc: any, court: any) => {
                        if (!acc[court.sportType]) acc[court.sportType] = [];
                        acc[court.sportType].push(court);
                        return acc;
                    }, {});

                    const sportTypeLabels: Record<string, string> = {
                        'BADMINTON': '🏸 Cầu Lông',
                        'TENNIS': '🎾 Tennis',
                        'FOOTBALL': '⚽ Bóng Đá',
                        'BASKETBALL': '🏀 Bóng Rổ',
                        'VOLLEYBALL': '🏐 Bóng Chuyền',
                        'TABLE_TENNIS': '🏓 Bóng Bàn'
                    };

                    return Object.entries(grouped).map(([sportType, sportCourts]: [string, any]) => (
                        <div key={sportType} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                            {/* Sport Type Header */}
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{sportTypeLabels[sportType]?.split(' ')[0] || '🏆'}</span>
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-tight text-gray-900 dark:text-white">
                                            {sportTypeLabels[sportType]?.split(' ').slice(1).join(' ') || sportType}
                                        </h4>
                                        <p className="text-[10px] text-gray-500 font-bold">{sportCourts.length} sân</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="text-[10px] font-bold">
                                    {sportCourts.filter((c: any) => c.isActive).length} hoạt động
                                </Badge>
                            </div>

                            {/* Courts under this sport type */}
                            <div className="divide-y divide-gray-50 dark:divide-gray-800">
                                {sportCourts.map((court: any, idx: number) => (
                                    <div
                                        key={court.id}
                                        onClick={() => setSelectedCourt(court)}
                                        className={cn(
                                            "p-4 transition-all cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-800",
                                            selectedCourt?.id === court.id && "bg-primary-50 dark:bg-primary-900/20"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black",
                                                    selectedCourt?.id === court.id
                                                        ? "bg-primary-600 text-white"
                                                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                                )}>
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <p className={cn(
                                                        "font-bold text-sm",
                                                        selectedCourt?.id === court.id ? "text-primary-600" : "text-gray-900 dark:text-white"
                                                    )}>
                                                        {court.name}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400">
                                                        {court.isIndoor ? 'Trong nhà' : 'Ngoài trời'} • {new Intl.NumberFormat('vi-VN').format(court.pricePerHour)}đ/h
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setEditingCourt(court); }}
                                                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-white dark:hover:bg-gray-900 rounded-lg"
                                                >
                                                    <Edit className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteCourt(court.id); }}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-gray-900 rounded-lg"
                                                >
                                                    <Trash className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Pricing Rules Count */}
                                        {court.pricingRules?.length > 0 && (
                                            <div className="mt-2 ml-11">
                                                <Badge variant="secondary" className="text-[9px] bg-orange-100 text-orange-700 border-none">
                                                    {court.pricingRules.length} quy tắc giá
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ));
                })()}

                {courts.length === 0 && (
                    <div className="p-8 text-center border-2 border-dashed border-gray-100 rounded-2xl dark:border-gray-800">
                        <p className="text-gray-400 text-sm">Chưa có sân nào</p>
                        <Button size="sm" variant="outline" className="mt-4" onClick={() => setIsAddingCourt(true)}>
                            <Plus className="h-4 w-4 mr-2" /> Thêm sân đầu tiên
                        </Button>
                    </div>
                )}
            </div>

            {/* Pricing & Availability Panel */}
            <div className="lg:col-span-2">
                {selectedCourt ? (
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="font-bold text-xl uppercase tracking-tight flex items-center gap-3">
                                        {selectedCourt.name}
                                        <button onClick={() => setEditingCourt(selectedCourt)} className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-primary-600 transition-colors">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                    </h3>
                                    <p className="text-sm text-gray-500">Manage standard and peak hour pricing for this court.</p>
                                </div>
                                <Button onClick={() => setIsEditingPrice(true)}>
                                    <Edit className="h-4 w-4 mr-2" /> Edit Pricing
                                </Button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 relative group/card">
                                    <button
                                        onClick={() => setEditingCourt(selectedCourt)}
                                        className="absolute top-4 right-4 p-1.5 rounded-lg bg-white dark:bg-gray-900 shadow-sm opacity-0 group-hover/card:opacity-100 transition-opacity text-gray-400 hover:text-primary-600"
                                    >
                                        <Edit className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30">
                                            <Save className="h-5 w-5" />
                                        </div>
                                        <h4 className="font-bold">Base Price</h4>
                                    </div>
                                    <p className="text-3xl font-bold text-primary-600 uppercase">
                                        {new Intl.NumberFormat('vi-VN').format(selectedCourt.pricePerHour)}đ
                                        <span className="text-sm text-gray-400 font-normal ml-2">/ hour</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">Applied to all standard time slots</p>
                                </div>

                                <div className="p-5 rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30">
                                            <Star className="h-5 w-5" />
                                        </div>
                                        <h4 className="font-bold">Peak Pricing</h4>
                                    </div>
                                    <p className="text-3xl font-bold text-orange-600 uppercase">
                                        {selectedCourt.pricingRules?.length > 0 ? (
                                            `${new Intl.NumberFormat('vi-VN').format(selectedCourt.pricingRules[0].price)}đ`
                                        ) : 'None'}
                                        <span className="text-sm text-gray-400 font-normal ml-2">/ hour</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">Scheduled pricing for special hours</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className="font-bold mb-4 flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary-600" /> Operating Status
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                        <Badge key={day} variant="outline" className="px-4 py-1.5 bg-white dark:bg-gray-800 uppercase font-bold text-[10px] tracking-widest border-2 border-primary-100 text-primary-700">
                                            {day}: {venue.openingTime.slice(0, 5)} - {venue.closingTime.slice(0, 5)}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Advanced Pricing Rules Section */}
                        <div className="p-8 rounded-3xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                                        <div className="h-8 w-1.5 bg-orange-500 rounded-full" />
                                        Advanced Pricing Rules
                                    </h3>
                                    <p className="text-sm text-gray-400 font-medium ml-3.5 mt-1">Scheduled price adjustments for specific days and hours.</p>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-xl border-2 font-bold text-[10px] uppercase tracking-widest" onClick={() => setIsEditingPrice(true)}>
                                    <Edit className="h-3.5 w-3.5 mr-2" /> Manage Rules
                                </Button>
                            </div>

                            <div className="grid gap-4">
                                {selectedCourt.pricingRules?.length > 0 ? (
                                    selectedCourt.pricingRules.map((rule: any, i: number) => (
                                        <div key={i} className="group relative overflow-hidden flex items-center justify-between p-5 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-500/30 transition-all hover:shadow-md">
                                            <div className="flex items-center gap-6">
                                                <div className="flex flex-col items-center justify-center min-w-[70px] py-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{rule.dayOfWeek ? rule.dayOfWeek.slice(0, 3) : 'Any'}</span>
                                                    <span className="text-sm font-black text-orange-600 uppercase">Day</span>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                                                        <span className="text-lg font-bold text-gray-900 dark:text-white tabular-nums">
                                                            {rule.startTime.slice(0, 5)} - {rule.endTime.slice(0, 5)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-tighter bg-orange-100 text-orange-700 border-orange-200 h-5">Peak Hour</Badge>
                                                        {rule.dayOfWeek && (
                                                            <span className="text-[10px] text-gray-500 font-bold uppercase">{rule.dayOfWeek}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end">
                                                <span className="text-2xl font-black text-primary-600">
                                                    {new Intl.NumberFormat('vi-VN').format(rule.price)}đ
                                                </span>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">per hour</span>
                                            </div>

                                            {/* Subtle background decoration */}
                                            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-12 py-16 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl bg-gray-50/30">
                                        <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                                            <Star className="h-8 w-8 text-gray-300" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">No Pricing Rules Yet</h4>
                                        <p className="text-sm text-gray-500 max-w-xs mt-2">Create custom pricing rules for peak hours or special days to maximize your revenue.</p>
                                        <Button variant="outline" className="mt-8 rounded-xl border-2 font-bold text-xs uppercase" onClick={() => setIsEditingPrice(true)}>
                                            <Plus className="h-4 w-4 mr-2" /> Add Your First Rule
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-gray-50/50 border border-dashed border-gray-200 dark:bg-gray-900/50 dark:border-gray-800">
                        <CalendarIcon className="h-16 w-16 text-gray-200 mb-6" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">Select a court</h3>
                        <p className="text-gray-500 max-w-xs mt-2 font-medium">Please select a court from the list on the left to manage its specific availability and pricing.</p>
                    </div>
                )}
            </div>

            {/* Modals placeholders */}
            {isAddingCourt && (
                <CourtFormModal
                    onClose={() => setIsAddingCourt(false)}
                    onSubmit={handleAddCourt}
                    isLoading={isLoading}
                />
            )}
            {editingCourt && (
                <CourtFormModal
                    initialData={editingCourt}
                    onClose={() => setEditingCourt(null)}
                    onSubmit={handleEditCourt}
                    isLoading={isLoading}
                />
            )}
            {isEditingPrice && selectedCourt && (
                <PricingRulesModal
                    court={selectedCourt}
                    onClose={() => setIsEditingPrice(false)}
                    onSubmit={async (rules: any[]) => {
                        try {
                            // Clean rules before sending to backend
                            const cleanedRules = rules.map(({ id, createdAt, updatedAt, court, courtId, ...rest }) => ({
                                ...rest,
                                price: Number(rest.price)
                            }));

                            await venueService.updateCourtPricingRules(selectedCourt.id, cleanedRules);
                            toast({ title: "Success", description: "Pricing rules updated" });
                            queryClient.invalidateQueries({ queryKey: ['owner-venue', venue.id] });
                        } catch (error) {
                            console.error('Update pricing error:', error);
                            toast({ title: "Error", description: "Failed to update pricing", variant: "destructive" });
                        } finally {
                            setIsEditingPrice(false);
                        }
                    }}
                />
            )}
        </div>
    );
}

function CourtFormModal({ onClose, onSubmit, isLoading, initialData }: any) {
    const [name, setName] = useState(initialData?.name || '');
    const [price, setPrice] = useState(initialData?.pricePerHour?.toString() || '');
    const [sportType, setSportType] = useState(initialData?.sportType || 'BADMINTON');
    const [isIndoor, setIsIndoor] = useState(initialData?.isIndoor ?? false);
    const [rules, setRules] = useState<any[]>(initialData?.pricingRules || []);

    // New: Quantity for bulk creation
    const [quantity, setQuantity] = useState(1);
    const [namePrefix, setNamePrefix] = useState('Sân');

    const sportTypeLabels: Record<string, string> = {
        'BADMINTON': 'Cầu Lông',
        'TENNIS': 'Tennis',
        'FOOTBALL': 'Bóng Đá',
        'BASKETBALL': 'Bóng Rổ',
        'VOLLEYBALL': 'Bóng Chuyền',
        'TABLE_TENNIS': 'Bóng Bàn'
    };

    const addRule = () => {
        setRules([...rules, {
            startTime: '17:00:00',
            endTime: '19:00:00',
            price: Number(price) || 0,
            dayOfWeek: null
        }]);
    };

    const updateRule = (index: number, field: string, value: any) => {
        const newRules = [...rules];
        newRules[index] = { ...newRules[index], [field]: value };
        setRules(newRules);
    };

    const removeRule = (index: number) => {
        setRules(rules.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (initialData) {
            // Editing existing court
            onSubmit({
                name,
                pricePerHour: Number(price),
                sportType,
                isIndoor,
                pricingRules: rules.map(({ id, courtId, createdAt, updatedAt, ...rest }: any) => ({
                    ...rest,
                    price: Number(rest.price)
                }))
            });
        } else {
            // Creating new courts (possibly bulk)
            for (let i = 1; i <= quantity; i++) {
                const courtName = quantity > 1 ? `${namePrefix} ${sportTypeLabels[sportType]} ${i}` : name;
                await onSubmit({
                    name: courtName,
                    pricePerHour: Number(price),
                    sportType,
                    isIndoor,
                    pricingRules: rules.map(({ id, courtId, createdAt, updatedAt, ...rest }: any) => ({
                        ...rest,
                        price: Number(rest.price)
                    }))
                });
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20 flex flex-col max-h-[90vh]">
                <div className="p-8 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold uppercase tracking-tight">{initialData ? 'Chỉnh Sửa Sân' : 'Thêm Sân Mới'}</h3>
                            <p className="text-sm text-gray-500">{initialData ? 'Cập nhật thông tin và giá sân.' : 'Thêm một hoặc nhiều sân cùng lúc.'}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800 transition-colors uppercase"><X className="h-6 w-6" /></button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {/* Bulk Creation (only when adding new) */}
                    {!initialData && (
                        <div className="p-4 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-100 dark:border-primary-900/30">
                            <div className="flex items-center gap-3 mb-4">
                                <Plus className="h-5 w-5 text-primary-600" />
                                <h4 className="font-bold text-primary-700 dark:text-primary-400">Thêm Hàng Loạt</h4>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-primary-600 uppercase tracking-widest ml-1">Số Lượng Sân</label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 font-bold text-lg"
                                        >-</button>
                                        <input
                                            type="number"
                                            min="1"
                                            max="20"
                                            className="flex-1 h-12 border border-gray-200 rounded-xl px-4 text-center text-lg bg-white dark:bg-gray-800 dark:border-gray-700 font-black"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(Math.min(20, quantity + 1))}
                                            className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 font-bold text-lg"
                                        >+</button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-primary-600 uppercase tracking-widest ml-1">Tiền Tố Tên</label>
                                    <input
                                        type="text"
                                        className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm bg-white dark:bg-gray-800 dark:border-gray-700 font-bold"
                                        placeholder="Sân"
                                        value={namePrefix}
                                        onChange={(e) => setNamePrefix(e.target.value)}
                                    />
                                </div>
                            </div>
                            {quantity > 1 && (
                                <p className="text-xs text-primary-600 mt-3 font-medium">
                                    Sẽ tạo: {Array.from({ length: quantity }, (_, i) => `"${namePrefix} ${sportTypeLabels[sportType]} ${i + 1}"`).slice(0, 3).join(', ')}{quantity > 3 ? ` và ${quantity - 3} sân nữa...` : ''}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {(initialData || quantity === 1) && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Tên Sân</label>
                                <input
                                    type="text"
                                    className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm bg-gray-50 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 font-bold"
                                    placeholder="VD: Sân Cầu Lông 1"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        )}
                        <div className={cn("space-y-2", !initialData && quantity > 1 && "md:col-span-2")}>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Giá Tiêu Chuẩn (VNĐ/giờ)</label>
                            <input
                                type="number"
                                className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm bg-gray-50 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 font-bold"
                                placeholder="80000"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Standard Price (VNĐ/h)</label>
                            <input
                                type="number"
                                className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm bg-gray-50 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 font-bold"
                                placeholder="80000"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Sport Type</label>
                            <select
                                className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm bg-gray-50 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 font-bold uppercase"
                                value={sportType}
                                onChange={(e) => setSportType(e.target.value)}
                            >
                                <option value="FOOTBALL">Football / Soccer</option>
                                <option value="TENNIS">Tennis</option>
                                <option value="BADMINTON">Badminton</option>
                                <option value="BASKETBALL">Basketball</option>
                                <option value="VOLLEYBALL">Volleyball</option>
                                <option value="TABLE_TENNIS">Table Tennis</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Environment</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsIndoor(true)}
                                    className={cn(
                                        "flex-1 h-12 rounded-xl border-2 font-bold text-xs uppercase transition-all",
                                        isIndoor ? "border-primary-600 bg-primary-50 text-primary-600" : "border-gray-100 hover:border-primary-200"
                                    )}
                                >Indoor</button>
                                <button
                                    onClick={() => setIsIndoor(false)}
                                    className={cn(
                                        "flex-1 h-12 rounded-xl border-2 font-bold text-xs uppercase transition-all",
                                        !isIndoor ? "border-primary-600 bg-primary-50 text-primary-600" : "border-gray-100 hover:border-primary-200"
                                    )}
                                >Outdoor</button>
                            </div>
                        </div>
                    </div>

                    {/* Peak Hour Pricing Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm uppercase tracking-tight flex items-center gap-2 text-orange-600">
                                <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                                Peak Hour Pricing Rules
                            </h4>
                            <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] font-bold uppercase tracking-widest" onClick={addRule}>
                                <Plus className="h-3 w-3 mr-1" /> Add Rule
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {rules.map((rule, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 flex flex-wrap items-end gap-3 animate-in slide-in-from-top-2">
                                    <div className="flex-1 min-w-[120px] space-y-1">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Day</label>
                                        <select
                                            className="w-full h-10 border border-gray-200 rounded-xl px-2 text-xs bg-white dark:bg-gray-900 dark:border-gray-700 font-bold uppercase"
                                            value={rule.dayOfWeek || ''}
                                            onChange={(e) => updateRule(i, 'dayOfWeek', e.target.value || null)}
                                        >
                                            <option value="">All Days</option>
                                            {Object.values(DayOfWeek).map(day => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1 w-28">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Start</label>
                                        <input
                                            type="time"
                                            className="w-full h-10 border border-gray-200 rounded-xl px-2 text-xs bg-white dark:bg-gray-900 dark:border-gray-700 font-bold"
                                            value={rule.startTime?.slice(0, 5) || '17:00'}
                                            onChange={(e) => updateRule(i, 'startTime', `${e.target.value}:00`)}
                                        />
                                    </div>
                                    <div className="space-y-1 w-28">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">End</label>
                                        <input
                                            type="time"
                                            className="w-full h-10 border border-gray-200 rounded-xl px-2 text-xs bg-white dark:bg-gray-900 dark:border-gray-700 font-bold"
                                            value={rule.endTime?.slice(0, 5) || '19:00'}
                                            onChange={(e) => updateRule(i, 'endTime', `${e.target.value}:00`)}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-[100px] space-y-1">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price</label>
                                        <input
                                            type="number"
                                            className="w-full h-10 border border-gray-200 rounded-xl px-2 text-xs bg-white dark:bg-gray-900 dark:border-gray-700 font-bold"
                                            value={rule.price}
                                            onChange={(e) => updateRule(i, 'price', e.target.value)}
                                        />
                                    </div>
                                    <button onClick={() => removeRule(i)} className="mb-0.5 p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash className="h-4 w-4" /></button>
                                </div>
                            ))}

                            {rules.length === 0 && (
                                <div className="text-center py-6 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No peak hour rules added</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-gray-100 dark:border-gray-800 flex gap-4 bg-gray-50/50 dark:bg-gray-900/50">
                    <Button variant="outline" className="flex-1 h-12 rounded-xl uppercase font-bold text-xs" onClick={onClose} disabled={isLoading}>Cancel</Button>
                    <Button
                        className="flex-1 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-xl uppercase font-bold text-xs shadow-lg shadow-primary-500/20"
                        isLoading={isLoading}
                        onClick={handleSubmit}
                    >
                        {initialData ? 'Update Court' : 'Save Court'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

function PricingRulesModal({ court, onClose, onSubmit }: any) {
    const [rules, setRules] = useState<any[]>(court.pricingRules || []);
    const [isSaving, setIsSaving] = useState(false);

    const addRule = () => {
        setRules([...rules, {
            startTime: '17:00:00',
            endTime: '19:00:00',
            price: Number(court.pricePerHour) || 0,
            dayOfWeek: null
        }]);
    };

    const updateRule = (index: number, field: string, value: any) => {
        const newRules = [...rules];
        newRules[index] = { ...newRules[index], [field]: value };
        setRules(newRules);
    };

    const removeRule = (index: number) => {
        setRules(rules.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-bold uppercase tracking-tight">Peak Hour Rules</h3>
                            <p className="text-sm text-gray-500">Configure special pricing for specific time ranges.</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800 transition-colors uppercase"><X className="h-6 w-6" /></button>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
                        {rules.map((rule, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 dark:bg-gray-800 dark:border-gray-700 flex flex-wrap items-end gap-3 transition-all hover:border-primary-200">
                                <div className="space-y-1 flex-1 min-w-[120px]">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Day</label>
                                    <select
                                        className="w-full h-10 border border-gray-200 rounded-xl px-2 text-xs bg-white dark:bg-gray-900 dark:border-gray-700 font-bold uppercase"
                                        value={rule.dayOfWeek || ''}
                                        onChange={(e) => updateRule(i, 'dayOfWeek', e.target.value || null)}
                                    >
                                        <option value="">All Days</option>
                                        {Object.values(DayOfWeek).map(day => (
                                            <option key={day} value={day}>{day}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1 w-28">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Start</label>
                                    <input
                                        type="time"
                                        className="w-full h-10 border border-gray-200 rounded-xl px-2 text-xs bg-white dark:bg-gray-900 dark:border-gray-700 font-bold"
                                        value={rule.startTime?.slice(0, 5) || '00:00'}
                                        onChange={(e) => updateRule(i, 'startTime', `${e.target.value}:00`)}
                                    />
                                </div>
                                <div className="space-y-1 w-28">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">End</label>
                                    <input
                                        type="time"
                                        className="w-full h-10 border border-gray-200 rounded-xl px-2 text-xs bg-white dark:bg-gray-900 dark:border-gray-700 font-bold"
                                        value={rule.endTime?.slice(0, 5) || '00:00'}
                                        onChange={(e) => updateRule(i, 'endTime', `${e.target.value}:00`)}
                                    />
                                </div>
                                <div className="space-y-1 w-32">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price (vnđ/h)</label>
                                    <input
                                        type="number"
                                        className="w-full h-10 border border-gray-200 rounded-xl px-2 text-xs bg-white dark:bg-gray-900 dark:border-gray-700 font-bold text-primary-600"
                                        value={rule.price}
                                        onChange={(e) => updateRule(i, 'price', Number(e.target.value))}
                                    />
                                </div>
                                <button onClick={() => removeRule(i)} className="mb-1 p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash className="h-4 w-4" /></button>
                            </div>
                        ))}

                        <Button variant="outline" className="w-full h-12 border-dashed border-2 rounded-2xl" onClick={addRule}>
                            <Plus className="h-4 w-4 mr-2" /> Add Rule
                        </Button>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <Button variant="outline" className="flex-1 h-12 rounded-xl uppercase font-bold text-xs" onClick={onClose} disabled={isSaving}>Cancel</Button>
                        <Button
                            className="flex-1 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-xl uppercase font-bold text-xs shadow-lg shadow-primary-500/20"
                            isLoading={isSaving}
                            onClick={async () => {
                                setIsSaving(true);
                                try {
                                    await onSubmit(rules);
                                } finally {
                                    setIsSaving(false);
                                }
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BookingsTab() {
    const { bookings, isLoadingBookings, updateBookingStatus } = useOwnerVenueDetailsStore();
    const { toast } = useToast();

    if (isLoadingBookings) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    const handleAction = async (id: string, action: string) => {
        try {
            await updateBookingStatus(id, action);
            toast({ title: "Success", description: `Booking ${action}ed successfully` });
        } catch (error) {
            toast({ title: "Error", description: `Failed to ${action} booking`, variant: "destructive" });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'CONFIRMED': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'CHECKED_IN': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'COMPLETED': return 'bg-green-100 text-green-700 border-green-200';
            case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold uppercase tracking-tight">Recent Bookings</h3>
                <div className="flex gap-2">
                    <Badge variant="outline" className="bg-white">Total: {bookings.length}</Badge>
                </div>
            </div>

            <div className="grid gap-4">
                {bookings.map((booking: any) => (
                    <div key={booking.id} className="p-5 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary-200 transition-all">
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                                <CalendarIcon className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-gray-900 dark:text-white uppercase">{booking.court?.name}</span>
                                    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase px-2", getStatusColor(booking.status))}>
                                        {booking.status}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                        <Clock className="h-3.5 w-3.5" />
                                        {booking.bookingDate} | {booking.startTime?.slice(0, 5)} - {booking.endTime?.slice(0, 5)}
                                    </p>
                                    <p className="text-sm font-bold text-primary-600">
                                        {booking.customerName || booking.customer?.fullName} <span className="text-gray-400 font-normal px-1">•</span> {booking.customerPhone || booking.customer?.phone || 'No phone'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {new Intl.NumberFormat('vi-VN').format(booking.totalAmount)}đ
                            </span>
                            <div className="flex gap-2">
                                {booking.status === 'PENDING' && (
                                    <>
                                        <Button size="sm" variant="outline" className="text-red-500 hover:bg-red-50 h-8 text-[10px] font-bold uppercase" onClick={() => handleAction(booking.id, 'cancel')}>Cancel</Button>
                                        <Button size="sm" className="bg-primary-600 h-8 text-[10px] font-bold uppercase" onClick={() => handleAction(booking.id, 'confirm')}>Confirm</Button>
                                    </>
                                )}
                                {booking.status === 'CONFIRMED' && (
                                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 h-8 text-[10px] font-bold uppercase" onClick={() => handleAction(booking.id, 'check-in')}>Check In</Button>
                                )}
                                {booking.status === 'CHECKED_IN' && (
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 text-[10px] font-bold uppercase" onClick={() => handleAction(booking.id, 'complete')}>Complete</Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {bookings.length === 0 && (
                    <div className="p-20 text-center border-2 border-dashed border-gray-100 rounded-3xl dark:border-gray-800">
                        <CalendarIcon className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 font-medium">No bookings found for this venue.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ReviewsTab() {
    const { reviews, isLoadingReviews } = useOwnerVenueDetailsStore();

    if (isLoadingReviews) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold uppercase tracking-tight">Customer Reviews</h3>
                <Badge variant="outline" className="bg-white">Total: {reviews.length}</Badge>
            </div>

            <div className="grid gap-6">
                {reviews.map((review: any) => (
                    <div key={review.id} className="p-6 rounded-3xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center font-bold text-white shadow-lg shadow-primary-500/20">
                                    {(review.user?.fullName || 'U')[0].toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">{review.user?.fullName || 'Anonymous'}</h4>
                                    <div className="flex items-center gap-1.5 text-yellow-500 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={cn("h-3.5 w-3.5", i < review.rating ? "fill-current" : "text-gray-200 fill-none")} />
                                        ))}
                                        <span className="text-xs font-bold text-gray-400 ml-1">{(Number(review.rating) || 0).toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>

                        <div className="pl-16">
                            <div className="relative">
                                <MessageSquare className="absolute -left-8 top-0 h-4 w-4 text-gray-100 dark:text-gray-800" />
                                <p className="text-gray-600 dark:text-gray-300 italic text-sm leading-relaxed">"{review.comment}"</p>
                            </div>

                            {review.reply && (
                                <div className="mt-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-l-4 border-primary-500">
                                    <p className="text-[10px] font-bold uppercase text-primary-600 mb-1">Owner Reply</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{review.reply}</p>
                                </div>
                            )}

                            {!review.reply && (
                                <div className="mt-6 flex gap-3">
                                    <Button size="sm" variant="outline" className="text-[10px] font-bold uppercase h-8 px-4 rounded-xl">Reply</Button>
                                    <Button size="sm" variant="ghost" className="text-[10px] font-bold uppercase h-8 px-4 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50">Report</Button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {reviews.length === 0 && (
                    <div className="p-20 text-center border-2 border-dashed border-gray-100 rounded-3xl dark:border-gray-800">
                        <MessageSquare className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 font-medium">No reviews yet for this venue.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatsTab() {
    const { stats, isLoadingStats } = useOwnerVenueDetailsStore();

    if (isLoadingStats) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    const overview = stats || {
        totalBookings: 0,
        totalRevenue: 0,
        totalVenues: 0,
        activeVenues: 0
    };

    return (
        <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Revenue"
                    value={`${new Intl.NumberFormat('vi-VN').format(overview.totalRevenue || 0)}đ`}
                    description="Gross income from all courts"
                    icon={BarChart3}
                    trend="+12.5%"
                />
                <StatCard
                    title="Total Bookings"
                    value={overview.totalBookings || 0}
                    description="Number of reservations"
                    icon={CalendarIcon}
                    trend="+5.2%"
                />
                <StatCard
                    title="Avg. Rating"
                    value="4.8"
                    description="From customer reviews"
                    icon={Star}
                />
                <StatCard
                    title="Court Utilization"
                    value="72%"
                    description="Peak hour occupancy"
                    icon={Clock}
                    trend="+2.1%"
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="p-8 rounded-3xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-8">Revenue Breakdown</h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Standard Hours', value: 65, color: 'bg-primary-500' },
                            { label: 'Peak Hours', value: 25, color: 'bg-orange-500' },
                            { label: 'Walk-ins', value: 10, color: 'bg-blue-500' },
                        ].map((item) => (
                            <div key={item.label} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-bold uppercase tracking-wider text-gray-500">{item.label}</span>
                                    <span className="font-bold">{item.value}%</span>
                                </div>
                                <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className={cn("h-full rounded-full transition-all duration-1000", item.color)} style={{ width: `${item.value}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 rounded-3xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="h-48 w-48 rounded-full border-[12px] border-gray-50 dark:border-gray-800 flex flex-col items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-[12px] border-primary-500 border-t-transparent -rotate-45" />
                        <span className="text-4xl font-black text-gray-900 dark:text-white line-height-1 tracking-tighter">84%</span>
                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mt-1">Occupancy Rate</span>
                    </div>
                    <p className="mt-8 text-sm text-gray-500 font-medium max-w-[240px]">
                        Your venue is performing better than <span className="text-primary-600 font-bold">88%</span> of similar venues in this area.
                    </p>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, description, icon: Icon, trend }: any) {
    return (
        <div className="p-6 rounded-3xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 text-primary-600">
                    <Icon className="h-5 w-5" />
                </div>
                {trend && (
                    <span className="text-[10px] font-black uppercase text-green-500 bg-green-50 px-2 py-1 rounded-lg">
                        {trend}
                    </span>
                )}
            </div>
            <div className="space-y-1">
                <h3 className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">{title}</h3>
                <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">{value}</p>
                <p className="text-[10px] text-gray-500 font-medium">{description}</p>
            </div>
        </div>
    );
}
