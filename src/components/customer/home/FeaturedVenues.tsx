'use client';

import { VenueCard } from '@/components/customer/venue/VenueCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MOCK_OWNER_VENUES } from '@/lib/constants/mock-data'; // Reusing existing mock data for now

export const FeaturedVenues = () => {
    // Transforming mock owner venues to match VenueCardProps
    // In a real app this would be a filtered API call for "Featured" venues
    const venues = MOCK_OWNER_VENUES.slice(0, 4).map(v => ({
        id: v.id,
        name: v.name,
        image: v.image,
        address: v.address,
        price: 300000, // Mock price
        rating: 4.8, // Mock rating
        reviews: 124, // Mock reviews
        type: 'Soccer', // Mock type
        distance: '2.5 km', // Mock distance
        isFavorite: false
    }));

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Venues</h2>
                        <p className="text-gray-500">Top rated fields trusted by thousands of players.</p>
                    </div>
                    <Link href="/venues">
                        <Button variant="ghost" className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20">
                            View All Venues <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {venues.map((venue, idx) => (
                        <VenueCard key={idx} {...venue} />
                    ))}
                </div>
            </div>
        </section>
    );
};
