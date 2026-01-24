'use client';

import React, { useEffect, useState } from 'react';
import { useVenueStore } from '@/lib/store/venue.store';
import { VenueCard } from '@/components/customer/venue/VenueCard';
import { Heart, Loader2, MapPin, ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function FavoritesPage() {
    const { favorites, isLoading, fetchFavorites } = useVenueStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetchFavorites();
    }, [fetchFavorites]);

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
                    <Link href="/" className="hover:text-primary-600 transition-colors flex items-center gap-1">
                        <Home className="h-3 w-3" /> Home
                    </Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-gray-900 dark:text-white">Favorites</span>
                </nav>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                                <Heart className="h-6 w-6 fill-current" />
                            </div>
                            <Badge variant="outline" className="border-red-200 text-red-500 uppercase font-black text-[10px] tracking-widest bg-red-50/50">
                                {favorites.length} Saved Places
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none mb-4">
                            Your Personal <br /> <span className="text-primary-600 italic">Favorites</span>
                        </h1>
                        <p className="text-gray-500 max-w-md font-medium">
                            Quickly access and book your most loved sports facilities. Your regular spots, all in one place.
                        </p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader2 className="h-12 w-12 animate-spin text-primary-600 mb-4" />
                        <p className="text-gray-400 uppercase font-bold text-[10px] tracking-[0.2em] animate-pulse">Syncing your list...</p>
                    </div>
                ) : favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm px-6">
                        <div className="h-24 w-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                            <Heart className="h-12 w-12 text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Your list is empty</h3>
                        <p className="text-gray-500 max-w-sm mb-8 font-medium">
                            You haven't saved any venues yet. Start exploring and click the heart icon to save your favorite spots!
                        </p>
                        <Link href="/venues">
                            <Button className="h-14 px-8 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-500/20 transition-all hover:scale-105">
                                Explore All Venues
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {favorites.map((venue) => (
                            <VenueCard
                                key={venue.id}
                                id={venue.id}
                                name={venue.name}
                                image={venue.thumbnailUrl || venue.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=800"}
                                address={venue.address}
                                price={venue.courts?.[0]?.pricePerHour || 0}
                                rating={Number(venue.rating) || 4.5}
                                reviews={venue.totalReviews || 0}
                                type={venue.courts?.[0]?.sportType || 'Sport'}
                                isFavorite={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
