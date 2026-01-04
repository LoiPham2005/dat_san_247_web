'use client';

import { VenueCard } from '@/components/customer/venue/VenueCard';
import { Button } from '@/components/ui/button';
import { MOCK_OWNER_VENUES } from '@/lib/constants/mock-data';
import { HeartOff } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
    // Mock favorite logic: just take first 2 venues
    const favorites = MOCK_OWNER_VENUES.slice(0, 2).map(v => ({
        id: v.id,
        name: v.name,
        image: v.image,
        address: v.address,
        price: 300000,
        rating: 4.8,
        reviews: 124,
        type: 'Soccer',
        distance: '2.5 km',
        isFavorite: true
    }));

    if (favorites.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HeartOff className="h-10 w-10 text-red-300" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h1>
                <p className="text-gray-500 mb-8">Save venues you like to find them easily later.</p>
                <Link href="/venues">
                    <Button size="lg" className="bg-primary-600">Explore Venues</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Favorites</h1>
            <p className="text-gray-500 mb-8">Venues you've saved for later.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {favorites.map((venue, idx) => (
                    <VenueCard key={idx} {...venue} />
                ))}
            </div>
        </div>
    );
}
