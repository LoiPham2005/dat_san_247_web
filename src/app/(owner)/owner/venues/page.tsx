'use client';

import { MOCK_OWNER_VENUES } from "@/lib/constants/mock-data";
import { Button } from "@/components/ui/button";
import { Plus, Filter, MapPin, Star, Users, Power } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/format";

export default function OwnerVenuesPage() {
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
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Venue
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_OWNER_VENUES.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                ))}

                {/* Empty State / Add New Card */}
                <div className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center transition-all hover:border-primary-500 hover:bg-primary-50/10 dark:border-gray-800 dark:bg-gray-900/20 cursor-pointer min-h-[300px]">
                    <div className="mb-4 rounded-full bg-white p-4 shadow-sm group-hover:shadow-md dark:bg-gray-800 transition-shadow">
                        <Plus className="h-8 w-8 text-gray-400 group-hover:text-primary-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200 group-hover:text-primary-600 transition-colors">Add New Venue</h3>
                    <p className="mt-2 text-sm text-gray-500 max-w-[200px]">
                        Register a new field, court, or facility to start accepting bookings.
                    </p>
                </div>
            </div>
        </div>
    );
}

function VenueCard({ venue }: { venue: any }) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            {/* Header Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <img src={venue.image} alt={venue.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute right-3 top-3">
                    <Badge className={cn("shadow-sm", venue.status === 'ACTIVE' ? "bg-green-500" : "bg-yellow-500")}>
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
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Revenue (Mo)</p>
                    <p className="text-sm font-bold text-primary-600">{venue.revenue}</p>
                </div>
                <div className="p-3 text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Bookings</p>
                    <p className="text-sm font-bold">{venue.bookings}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <span className="flex items-center text-yellow-500">
                        <Star className="mr-1 h-3 w-3 fill-current" /> {venue.rating}
                    </span>
                    <span>•</span>
                    <span>{venue.type}</span>
                </div>
                <Button size="sm" variant="outline">Manage</Button>
            </div>
        </div>
    )
}
