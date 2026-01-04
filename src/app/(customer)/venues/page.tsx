'use client';

import { useState } from 'react';
import { VenueFilters } from '@/components/customer/venue/VenueFilters';
import { VenueCard } from '@/components/customer/venue/VenueCard';
import { Button } from '@/components/ui/button';
import { MOCK_OWNER_VENUES } from '@/lib/constants/mock-data';
import { LayoutGrid, List, Map, SlidersHorizontal } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function FindVenuesPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Transform mock data
    const venues = MOCK_OWNER_VENUES.map(v => ({
        id: v.id,
        name: v.name,
        image: v.image,
        address: v.address,
        price: 300000,
        rating: 4.8,
        reviews: 124,
        type: 'Soccer',
        distance: '2.5 km',
        isFavorite: false
    }));

    // Duplicate mock data to make the list look fuller
    const allVenues = [...venues, ...venues, ...venues];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header / Search Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find Venues</h1>
                    <p className="text-gray-500 mt-1">Found 120+ venues offering soccer, tennis, and more.</p>
                </div>

                <div className="flex items-center gap-2">
                    {/* Mobile Filter */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="lg:hidden">
                                <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] overflow-y-auto">
                            <VenueFilters className="mt-6" />
                        </SheetContent>
                    </Sheet>

                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>

                    <Button variant="outline" className="hidden sm:flex">
                        <Map className="mr-2 h-4 w-4" /> Map View
                    </Button>

                    <select className="h-10 px-3 py-2 bg-transparent border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:text-gray-200">
                        <option>Recommended</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Highest Rated</option>
                        <option>Nearest</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Desktop Filter Sidebar */}
                <aside className="hidden lg:block w-72 shrink-0">
                    <div className="sticky top-24 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <VenueFilters />
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                        {allVenues.map((venue, idx) => (
                            viewMode === 'grid' ? (
                                <VenueCard key={idx} {...venue} />
                            ) : (
                                // Quick Inline List Card (Optional: could be separate component)
                                <div key={idx} className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
                                    <img src={venue.image} alt={venue.name} className="w-48 h-32 object-cover rounded-xl" />
                                    <div className="flex-1 py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{venue.name}</h3>
                                                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                    {venue.address}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-primary-600 text-lg">{venue.price.toLocaleString()}đ</span>
                                                <p className="text-xs text-gray-400">/hour</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex gap-2 text-sm text-gray-600">
                                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">Soccer</span>
                                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">Wifi</span>
                                            </div>
                                            <Button size="sm">Book Now</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center gap-2">
                        <Button variant="outline" disabled>Previous</Button>
                        <Button variant="default" className="bg-primary-600">1</Button>
                        <Button variant="outline">2</Button>
                        <Button variant="outline">3</Button>
                        <Button variant="outline">...</Button>
                        <Button variant="outline">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
