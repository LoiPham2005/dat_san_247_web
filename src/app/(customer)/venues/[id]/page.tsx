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
    Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VenueGallery } from '@/components/customer/venue/VenueGallery';
import { BookingWidget } from '@/components/customer/venue/BookingWidget';
import { VenueReviews } from '@/components/customer/venue/VenueReviews';
import { useVenueStore } from '@/lib/store/venue.store';
import { venueService } from '@/lib/api/services/venue.service';
import { Venue } from '@/types/venue.types';

export default function VenueDetailsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = React.use(paramsPromise);
    const { activeVenue: venue, isLoading, error, fetchVenueById } = useVenueStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        fetchVenueById(params.id);
    }, [params.id, isMounted, fetchVenueById]);

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
                <p className="text-gray-500 max-w-md">{error || "The venue you're looking for doesn't exist or has been removed."}</p>
                <Button className="mt-6 uppercase font-bold text-[10px] tracking-widest" onClick={() => window.location.reload()}>Try Again</Button>
            </div>
        );
    }

    const images = venue.images && venue.images.length > 0
        ? venue.images.map((img: any) => typeof img === 'string' ? img : img.url)
        : [venue.thumbnailUrl || "https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=1200&h=800&fit=crop"];

    // Ensure we have at least 5 images for the gallery or repeat
    while (images.length < 5) {
        images.push(images[0]);
    }

    const minPrice = venue.courts && venue.courts.length > 0
        ? Math.min(...venue.courts.map((c: any) => Number(c.pricePerHour)))
        : 0;

    return (
        <div className="container mx-auto px-4 pt-24 pb-8 max-w-7xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Badge className="bg-primary-600 text-white hover:bg-primary-700 border-none px-3 py-1 uppercase font-bold text-[10px] tracking-widest">
                            {venue.courts?.[0]?.sportType || 'Sport'}
                        </Badge>
                        <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50 px-3 py-1 uppercase font-bold text-[10px] tracking-widest">
                            <Shield className="h-3 w-3 mr-1" /> Verified Partner
                        </Badge>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                        {venue.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm font-medium">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-primary-600" />
                            <span>{venue.address}, {venue.district}, {venue.city}</span>
                        </div>
                        {venue.totalReviews > 0 && (
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-gray-900 dark:text-gray-200 font-bold">{Number(venue.rating).toFixed(1)}</span>
                                <span className="text-gray-400">({venue.totalReviews} reviews)</span>
                            </div>
                        )}
                        <a href="#map" className="text-primary-600 hover:text-primary-700 hover:underline font-bold uppercase text-[10px] tracking-widest">
                            Show on Map
                        </a>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="icon" className="rounded-2xl h-12 w-12 border-gray-200 dark:border-gray-800 shadow-sm hover:bg-gray-50 transition-all">
                        <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="group rounded-2xl h-12 w-12 border-gray-200 dark:border-gray-800 shadow-sm hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all">
                        <Heart className="h-5 w-5 transition-transform group-active:scale-125" />
                    </Button>
                </div>
            </div>

            {/* Gallery */}
            <div className="mb-12 shadow-2xl shadow-gray-200/50 rounded-3xl overflow-hidden">
                <VenueGallery images={images} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Description */}
                    <section>
                        <h2 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
                            <span className="h-8 w-1.5 bg-primary-600 rounded-full" />
                            About this Venue
                        </h2>
                        <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 max-w-none leading-relaxed">
                            <p className="whitespace-pre-wrap">
                                {venue.description || `Welcome to ${venue.name}. We provide high-quality facilities for sports enthusiasts. Our venue is equipped with modern infrastructure and amenities to ensure you have the best playing experience. Whether you're here for a friendly match or a tournament, we've got you covered.`}
                            </p>
                            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 italic text-sm">
                                <p>* Please arrive 15 minutes early for check-in. Contact us at {venue.phone || "our support"} for any help.</p>
                            </div>
                        </div>
                    </section>

                    {/* Amenities */}
                    <section>
                        <h2 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
                            <span className="h-8 w-1.5 bg-primary-600 rounded-full" />
                            Amenities
                        </h2>
                        {venue.amenities && venue.amenities.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {venue.amenities.map((item: any) => (
                                    <Amenity key={item.id} icon={Shield} label={item.name} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No specific amenities listed for this venue.</p>
                        )}
                    </section>

                    {/* Operational Hours */}
                    <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8">
                        <h2 className="text-xl font-black mb-6 uppercase tracking-tight">Operation Hours</h2>
                        <div className="flex items-center gap-12">
                            <div className="text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Opens</p>
                                <p className="text-2xl font-black text-primary-600">{venue.openingTime?.substring(0, 5) || "06:00"}</p>
                            </div>
                            <div className="h-10 w-px bg-gray-100" />
                            <div className="text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Closes</p>
                                <p className="text-2xl font-black text-gray-900 dark:text-white">{venue.closingTime?.substring(0, 5) || "22:00"}</p>
                            </div>
                        </div>
                    </section>

                    {/* Reviews */}
                    <section className="pt-12 border-t border-gray-100 dark:border-gray-800">
                        <VenueReviews />
                    </section>
                </div>

                {/* Right Sidebar (Booking) */}
                <div className="relative">
                    <BookingWidget price={minPrice} />
                </div>
            </div>
        </div>
    );
}

function Amenity({ icon: Icon, label }: any) {
    return (
        <div className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:border-primary-500 hover:shadow-md transition-all group">
            <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-primary-600 transition-colors">
                <Icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold uppercase tracking-tight">{label}</span>
        </div>
    );
}
