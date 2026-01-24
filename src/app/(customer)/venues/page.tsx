'use client';

import { useState, useEffect } from 'react';
import { VenueFilters } from '@/components/customer/venue/VenueFilters';
import { VenueCard } from '@/components/customer/venue/VenueCard';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Map, MapPin, SlidersHorizontal, Loader2, AlertCircle, Search } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useVenueStore } from '@/lib/store/venue.store';

export default function FindVenuesPage() {
    const { venues, isLoading, error, pagination, currentFilters, fetchVenues, setFilters } = useVenueStore();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        fetchVenues({ page: 1 });
    }, [currentFilters, fetchVenues, isMounted]);

    const handlePageChange = (newPage: number) => {
        if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
            fetchVenues({ page: newPage });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="container mx-auto px-4 pt-24 pb-8">
            {/* Header / Search Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">Find Venues</h1>
                    <p className="text-gray-500 mt-1">Found {pagination?.total || 0} venues offering soccer, tennis, and more.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search name or address..."
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                            value={currentFilters.search}
                            onChange={(e) => setFilters({ search: e.target.value })}
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>

                    {/* City Selector */}
                    <div className="relative w-full sm:w-40">
                        <select
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none appearance-none transition-all font-bold uppercase text-[10px] tracking-widest cursor-pointer"
                            value={currentFilters.city || ''}
                            onChange={(e) => setFilters({ city: e.target.value })}
                        >
                            <option value="">All Cities</option>
                            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                            <option value="Cần Thơ">Cần Thơ</option>
                        </select>
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-primary-600" />
                    </div>

                    {/* Mobile Filter */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="lg:hidden rounded-xl h-10 px-4">
                                <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] overflow-y-auto">
                            <VenueFilters className="mt-6" onFilterChange={setFilters} />
                        </SheetContent>
                    </Sheet>

                    <Button variant="outline" className="hidden sm:flex rounded-xl h-10 px-4 border-gray-200 shadow-sm">
                        <Map className="mr-2 h-4 w-4" /> Map View
                    </Button>

                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="h-10 w-px bg-gray-200 mx-1 hidden md:block" />

                    <select className="h-10 px-4 bg-gray-900 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 uppercase font-bold text-[10px] tracking-widest cursor-pointer transition-all hover:bg-primary-600">
                        <option>Recommended</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Highest Rated</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Desktop Filter Sidebar */}
                <aside className="hidden lg:block w-72 shrink-0">
                    <div className="sticky top-24 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <VenueFilters onFilterChange={(newFilters: any) => setFilters(newFilters)} />
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-[400px]">
                            <Loader2 className="h-12 w-12 animate-spin text-primary-600 mb-4" />
                            <p className="text-gray-500 animate-pulse">Searching for best venues...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center h-[400px] text-center">
                            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
                            <p className="text-gray-500 max-w-md">{error}</p>
                            <Button onClick={() => fetchVenues()} className="mt-4">Try Again</Button>
                        </div>
                    ) : venues.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[400px] text-center">
                            <div className="bg-gray-100 p-6 rounded-full mb-6">
                                <LayoutGrid className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 uppercase italic">No venues found</h3>
                            <p className="text-gray-500 max-w-sm">Try adjusting your filters or search keywords to find what you're looking for.</p>
                            <Button variant="outline" onClick={() => setFilters({ search: '', sportType: '', city: '' })} className="mt-6 uppercase font-bold text-[10px] tracking-widest">Clear all filters</Button>
                        </div>
                    ) : (
                        <>
                            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                                {venues.map((venue) => {
                                    // Calculate display price (min price of all courts)
                                    const minPrice = venue.courts && venue.courts.length > 0
                                        ? Math.min(...venue.courts.map((c: any) => Number(c.pricePerHour)))
                                        : 0;

                                    return viewMode === 'grid' ? (
                                        <VenueCard
                                            key={venue.id}
                                            id={venue.id}
                                            name={venue.name}
                                            image={venue.thumbnailUrl || (venue.images && venue.images[0]?.url) || 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&auto=format&fit=crop'}
                                            address={venue.address}
                                            price={minPrice}
                                            rating={Number(venue.rating) || 0}
                                            reviews={venue.totalReviews || 0}
                                            type={venue.courts?.[0]?.sportType || 'Sport'}
                                            isFavorite={false} // Would need favorite check logic
                                        />
                                    ) : (
                                        <div key={venue.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group">
                                            <div className="w-full sm:w-48 h-48 sm:h-32 relative overflow-hidden rounded-xl shrink-0">
                                                <img
                                                    src={venue.thumbnailUrl || (venue.images && venue.images[0]?.url) || 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&auto=format&fit=crop'}
                                                    alt={venue.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex-1 py-1">
                                                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                                    <div>
                                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors uppercase tracking-tight">{venue.name}</h3>
                                                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                            <MapPin className="h-3 w-3" />
                                                            {venue.address}, {venue.city}
                                                        </p>
                                                    </div>
                                                    <div className="sm:text-right">
                                                        <span className="font-bold text-primary-600 text-lg">{minPrice.toLocaleString()}đ</span>
                                                        <p className="text-xs text-gray-400">/hour</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex gap-2 text-xs">
                                                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded font-bold uppercase tracking-widest text-[8px]">{venue.courts?.[0]?.sportType || 'SPORT'}</span>
                                                        {venue.amenities?.slice(0, 2).map((a: any) => (
                                                            <span key={a.id} className="px-2 py-1 bg-primary-50 text-primary-600 dark:bg-primary-900/20 rounded font-bold uppercase tracking-widest text-[8px]">{a.name}</span>
                                                        ))}
                                                    </div>
                                                    <Button size="sm" className="bg-gray-900 hover:bg-primary-600 uppercase font-bold text-[9px] tracking-widest">Book Now</Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            {pagination && pagination.totalPages > 1 && (
                                <div className="mt-12 flex justify-center gap-2">
                                    <Button
                                        variant="outline"
                                        disabled={pagination.page <= 1}
                                        onClick={() => handlePageChange(pagination.page - 1)}
                                        className="uppercase font-bold text-[10px] tracking-widest"
                                    >
                                        Previous
                                    </Button>

                                    {[...Array(pagination.totalPages)].map((_, i) => (
                                        <Button
                                            key={i}
                                            variant={pagination.page === i + 1 ? "default" : "outline"}
                                            className={pagination.page === i + 1 ? "bg-primary-600 font-bold" : "font-bold text-[10px]"}
                                            onClick={() => handlePageChange(i + 1)}
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}

                                    <Button
                                        variant="outline"
                                        disabled={pagination.page >= pagination.totalPages}
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                        className="uppercase font-bold text-[10px] tracking-widest"
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
