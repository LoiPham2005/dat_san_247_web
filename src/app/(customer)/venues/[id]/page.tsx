'use client';

import React, { useState, useEffect } from 'react';
import {
    MapPin,
    Share2,
    Heart,
    Wifi,
    Car,
    Utensils,
    Briefcase,
    Shield,
    Loader2,
    AlertCircle,
    Star,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VenueGallery } from '@/components/customer/venue/VenueGallery';
import { BookingWidget } from '@/components/customer/venue/BookingWidget';
import { VenueReviews } from '@/components/customer/venue/VenueReviews';
import { useVenueStore } from '@/lib/store/venue.store';
import { venueService } from '@/lib/api/services/venue.service';
import { Venue } from '@/types/venue.types';
import { cn } from '@/lib/utils/format';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const AMENITY_ICONS: Record<string, any> = {
    'Parking': Car,
    'Wifi': Wifi,
    'Changing Room': Briefcase,
    'Shower': Shield,
    'Canteen': Utensils,
    'Floodlights': Shield,
    'Security': Shield,
    'Water': Utensils,
    'Default': Shield
};

function Amenity({ icon: Icon, label }: any) {
    return (
        <div className="flex items-center gap-4 p-5 rounded-3xl border-2 border-gray-50 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:border-primary-500 hover:shadow-2xl hover:shadow-primary-500/10 transition-all group cursor-default">
            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-primary-600 group-hover:bg-primary-50 transition-all duration-300">
                <Icon className="h-6 w-6" />
            </div>
            <span className="text-sm font-black uppercase tracking-tight text-gray-700 dark:text-gray-300">{label}</span>
        </div>
    );
}

export default function VenueDetailsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = React.use(paramsPromise);
    const queryClient = useQueryClient();
    const [isMounted, setIsMounted] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const {
        data: venue,
        isLoading,
        error
    } = useQuery({
        queryKey: ['venue', params.id],
        queryFn: () => venueService.getById(params.id),
        enabled: isMounted
    });

    const toggleFavoriteMutation = useMutation({
        mutationFn: async (currentlyFavorite: boolean) => {
            if (currentlyFavorite) {
                return venueService.removeFromFavorite(params.id);
            } else {
                return venueService.addToFavorite(params.id);
            }
        },
        onSuccess: (_, currentlyFavorite) => {
            queryClient.invalidateQueries({ queryKey: ['venue', params.id] });
            toast({
                title: currentlyFavorite ? 'Removed from favorites' : 'Added to favorites',
                description: currentlyFavorite ? 'Venue has been removed from your list' : 'This venue is now in your saved list'
            });
        },
        onError: (err: any) => {
            toast({
                title: 'Action Failed',
                description: err.response?.data?.message || 'Please login to use this feature',
                variant: 'destructive'
            });
        }
    });

    const handleToggleFavorite = () => {
        if (!venue) return;
        toggleFavoriteMutation.mutate((venue as any).isFavorited);
    };

    if (!isMounted || isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary-600 mb-4" />
                <p className="text-gray-500 uppercase font-bold text-[10px] tracking-widest animate-pulse">Loading Venue Information...</p>
            </div>
        );
    }

    if (error || !venue) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Venue Not Found</h3>
                <p className="text-gray-500 max-w-md">{(error as any)?.message || "The venue you're looking for doesn't exist or has been removed."}</p>
                <Button className="mt-6 uppercase font-bold text-[10px] tracking-widest" onClick={() => window.location.reload()}>Try Again</Button>
            </div>
        );
    }

    const images = venue.images && venue.images.length > 0
        ? venue.images.map((img: any) => typeof img === 'string' ? img : img.imageUrl)
        : [venue.thumbnailUrl || "https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=1200&h=800&fit=crop"];

    const galleryImages = [...images];
    while (galleryImages.length < 5) {
        galleryImages.push(galleryImages[0]);
    }

    const sportTypes = Array.from(new Set(venue.courts?.map((c: any) => c.sportType) || []));

    return (
        <div className="container mx-auto px-4 pt-24 pb-12 max-w-7xl animate-in fade-in duration-700">
            {/* Header Content */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {sportTypes.length > 0 ? (
                            sportTypes.map((type: string) => (
                                <Badge key={type} className="bg-primary-600 text-white hover:bg-primary-700 border-none px-4 py-1.5 uppercase font-bold text-[10px] tracking-widest rounded-full">
                                    {type}
                                </Badge>
                            ))
                        ) : (
                            <Badge className="bg-primary-600 text-white hover:bg-primary-700 border-none px-4 py-1.5 uppercase font-bold text-[10px] tracking-widest rounded-full">
                                Multi-Sports
                            </Badge>
                        )}
                        <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50 px-4 py-1.5 uppercase font-bold text-[10px] tracking-widest rounded-full">
                            <Shield className="h-3 w-3 mr-1" /> Verified Partner
                        </Badge>
                        <Badge variant="secondary" className="px-4 py-1.5 uppercase font-bold text-[10px] tracking-widest rounded-full">
                            {venue.city}
                        </Badge>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-[0.9]">
                        {venue.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm font-medium">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-full">
                            <MapPin className="h-4 w-4 text-primary-600" />
                            <span className="text-xs uppercase font-bold">{venue.address}</span>
                        </div>
                        {venue.totalReviews > 0 && (
                            <div className="flex items-center gap-2 py-1.5">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-gray-900 dark:text-gray-200 font-black text-lg">{Number(venue.rating).toFixed(1)}</span>
                                </div>
                                <span className="text-gray-400 uppercase font-bold text-[10px] tracking-wide">from {venue.totalReviews} reviews</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" size="icon" className="rounded-2xl h-14 w-14 border-gray-200 dark:border-gray-800 shadow-xl hover:bg-gray-50 transition-all hover:scale-105">
                        <Share2 className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={toggleFavoriteMutation.isPending}
                        onClick={handleToggleFavorite}
                        className={cn(
                            "group rounded-2xl h-14 w-14 border-gray-200 dark:border-gray-800 shadow-xl transition-all hover:scale-110",
                            (venue as any).isFavorited ? "bg-red-50 border-red-200 text-red-500" : "hover:text-red-500 hover:border-red-200 hover:bg-red-50"
                        )}
                    >
                        {toggleFavoriteMutation.isPending ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                            <Heart className={cn("h-6 w-6 transition-all", (venue as any).isFavorited && "fill-current scale-110")} />
                        )}
                    </Button>
                </div>
            </div>

            {/* Gallery Wrapper */}
            <div className="mb-16 shadow-2xl shadow-primary-500/10 rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-gray-800">
                <VenueGallery images={galleryImages} />
            </div>

            {/* BOOKING SECTION - FULL WIDTH */}
            <section id="booking" className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">🎾</div>
                    <div>
                        <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Đặt Sân Ngay</h2>
                        <p className="text-gray-500 text-sm mt-1">Chọn ngày, giờ và thời lượng phù hợp với bạn</p>
                    </div>
                </div>

                {/* Full-width Booking Widget */}
                <BookingWidget venue={venue} />
            </section>

            {/* Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                {/* Detailed Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-10 w-10 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-black text-xl">D</div>
                        <h2 className="text-3xl font-black uppercase tracking-tight">Facility Details</h2>
                    </div>
                    <div className="prose prose-xl dark:prose-invert text-gray-600 dark:text-gray-300 max-w-none leading-relaxed font-medium">
                        <p className="whitespace-pre-wrap leading-loose">
                            {venue.description || `${venue.name} is a premier sports destination in ${venue.city}. We offer top-tier ${sportTypes[0]?.toLowerCase() || 'multi-sport'} facilities designed for both casual and competitive play.`}
                        </p>
                    </div>
                </section>

                {/* Schedule Block */}
                <section className="bg-gray-900 dark:bg-black rounded-[3rem] p-10 text-white relative overflow-hidden group h-fit">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        <Clock className="h-32 w-32" />
                    </div>
                    <h2 className="text-xl font-black mb-10 uppercase tracking-widest text-primary-500">Business Hours</h2>
                    <div className="flex items-center gap-16 relative z-10">
                        <div>
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Service Starts</p>
                            <p className="text-5xl font-black">{venue.openingTime?.substring(0, 5) || "06:00"}</p>
                        </div>
                        <div className="h-16 w-px bg-white/10" />
                        <div>
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Service Ends</p>
                            <p className="text-5xl font-black text-gray-400">{venue.closingTime?.substring(0, 5) || "22:00"}</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Features Grid */}
            <section className="mb-16">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8 ml-1">Premium Amenities</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {venue.amenities && venue.amenities.length > 0 ? (
                        venue.amenities.map((item: any) => (
                            <Amenity key={item.id} icon={AMENITY_ICONS[item.name] || AMENITY_ICONS.Default} label={item.name} />
                        ))
                    ) : (
                        ['Parking', 'Security Access', 'Refreshments', 'Equipment'].map(n => (
                            <Amenity key={n} icon={AMENITY_ICONS[n] || AMENITY_ICONS.Default} label={n} />
                        ))
                    )}
                </div>
            </section>

            {/* Reviews */}
            <section id="reviews" className="pt-16 border-t-4 border-gray-50 dark:border-gray-800">
                <VenueReviews />
            </section>
        </div>
    );
}
