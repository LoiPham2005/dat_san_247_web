'use client';

import {
    MapPin,
    Share2,
    Heart,
    Wifi,
    Car,
    Utensils,
    Briefcase,
    Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VenueGallery } from '@/components/customer/venue/VenueGallery';
import { BookingWidget } from '@/components/customer/venue/BookingWidget';
import { VenueReviews } from '@/components/customer/venue/VenueReviews';
import { MOCK_OWNER_VENUES } from '@/lib/constants/mock-data';

export default function VenueDetailsPage({ params }: { params: { id: string } }) {
    // Determine venue (Using mock data for now, would be API call)
    // Fallback to the first venue if not found or id is weird
    const venue = MOCK_OWNER_VENUES.find(v => v.id === params.id) || MOCK_OWNER_VENUES[0];

    const images = [
        venue.image,
        "https://images.unsplash.com/photo-1628779238951-be2c9f256544?q=80&w=2574&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2669&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2693&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1631194758628-71ec7c35137e?q=80&w=2670&auto=format&fit=crop"
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-primary-100 text-primary-700 hover:bg-primary-200 border-none">Soccer</Badge>
                        <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">Verified Partner</Badge>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{venue.name}</h1>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>{venue.address}</span>
                        <a href="#map" className="text-primary-600 hover:underline font-medium ml-2">Show on Map</a>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full hover:text-red-500 hover:border-red-200 hover:bg-red-50">
                        <Heart className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Gallery */}
            <div className="mb-8">
                <VenueGallery images={images} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Description */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">About this Venue</h2>
                        <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300">
                            <p>
                                Experience top-tier facilities at {venue.name}. Located in the heart of the city,
                                our venue offers professional-grade {venue.type} courts maintained to distinct standards.
                                Perfect for both casual games and competitive matches.
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                * Please arrive 15 minutes early for check-in.
                            </p>
                        </div>
                    </section>

                    {/* Amenities */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">Amenities</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <Amenity icon={Wifi} label="Free Wifi" />
                            <Amenity icon={Car} label="Free Parking" />
                            <Amenity icon={Utensils} label="Canteen" />
                            <Amenity icon={Briefcase} label="Locker Rooms" />
                            <Amenity icon={Shield} label="24/7 Security" />
                        </div>
                    </section>

                    {/* Reviews */}
                    <section className="pt-8 border-t border-gray-100 dark:border-gray-800">
                        <VenueReviews />
                    </section>
                </div>

                {/* Right Sidebar (Booking) */}
                <div className="relative">
                    <BookingWidget price={300000} />
                </div>
            </div>
        </div>
    );
};

function Amenity({ icon: Icon, label }: any) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <Icon className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium">{label}</span>
        </div>
    )
}
