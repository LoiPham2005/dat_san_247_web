'use client';

import { useVenueStore } from "@/lib/store/venue.store";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle, Plus, Filter, MapPin, Star, Users, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/format";
import { VenueModal } from "@/components/owner/VenueModal";

export default function OwnerVenuesPage() {
    const { venues, isLoading, error, fetchOwnerVenues } = useVenueStore();
    const [isMounted, setIsMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        if (isMounted) {
            const params: any = {};
            if (debouncedSearch) params.search = debouncedSearch;
            if (statusFilter) params.status = statusFilter;
            fetchOwnerVenues(params);
        }
    }, [isMounted, fetchOwnerVenues, debouncedSearch, statusFilter]);

    if (!isMounted) return null;

    const venuesList = Array.isArray(venues) ? venues : [];

    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        My Venues
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Manage your sports facilities, configure pricing, and update details.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => setIsModalOpen(true)} className="shadow-lg shadow-primary-500/20">
                        <Plus className="mr-2 h-4 w-4" /> Add Venue
                    </Button>
                </div>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search venues by name..."
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl pl-10 h-10 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400 ml-2 mr-1" />
                    <select
                        className="bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 h-10 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all min-w-[150px] uppercase font-bold"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="APPROVED">Approved</option>
                        <option value="PENDING">Pending</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>
                </div>
            </div>

            {isLoading && venuesList.length === 0 ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                </div>
            ) : error ? (
                <div className="flex h-64 flex-col items-center justify-center gap-2 text-red-500">
                    <AlertCircle className="h-10 w-10" />
                    <p className="font-medium">Failed to load venues</p>
                    <p className="text-xs text-gray-500">{error}</p>
                    <Button variant="outline" size="sm" onClick={() => fetchOwnerVenues()}>Try Again</Button>
                </div>
            ) : venuesList.length === 0 ? (
                <div className="flex h-96 flex-col items-center justify-center text-center p-8 bg-gray-50/50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                    <div className="h-20 w-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm mb-4">
                        <MapPin className="h-10 w-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No venues found</h3>
                    <p className="text-gray-500 max-w-xs mb-6">
                        {search || statusFilter ? "Try adjusting your filters to find what you're looking for." : "Start by adding your first sports facility to the platform."}
                    </p>
                    {!search && !statusFilter && (
                        <Button onClick={() => setIsModalOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" /> Register Your First Venue
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {venuesList.map((venue) => (
                        <VenueCard key={venue.id} venue={venue} />
                    ))}
                </div>
            )}

            <VenueModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

function VenueCard({ venue }: { venue: any }) {
    const statusColors: Record<string, string> = {
        'PENDING': 'bg-yellow-500',
        'APPROVED': 'bg-green-500',
        'REJECTED': 'bg-red-500',
        'INACTIVE': 'bg-gray-500',
    };

    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            {/* Header Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <img
                    src={venue.thumbnailUrl || venue.images?.[0]?.imageUrl || `https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&auto=format&fit=crop`}
                    alt={venue.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3">
                    <Badge className={cn("shadow-sm text-white", statusColors[venue.status] || "bg-blue-500")}>
                        {venue.status}
                    </Badge>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{venue.name}</h3>
                    <p className="flex items-center text-xs text-gray-200">
                        <MapPin className="mr-1 h-3 w-3" /> {venue.address}
                    </p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100 dark:divide-gray-800 dark:border-gray-800">
                <div className="p-3 text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Rating</p>
                    <p className="text-sm font-bold flex items-center justify-center text-yellow-500">
                        <Star className="mr-1 h-3 w-3 fill-current" /> {venue.rating || '0.0'}
                    </p>
                </div>
                <div className="p-3 text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Reviews</p>
                    <p className="text-sm font-bold">{venue.totalReviews || 0}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <Users className="mr-1 h-3 w-3" />
                    <span>{venue.city}</span>
                </div>
                <Link href={`/owner/venues/${venue.id}`}>
                    <Button size="sm" variant="outline">Manage</Button>
                </Link>
            </div>
        </div>
    )
}
