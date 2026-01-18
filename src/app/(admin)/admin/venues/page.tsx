'use client';

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { venueService } from "@/lib/api/services/venue.service";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils/format";
import { VenueStatus } from "@/types/venue.types";
import { useAdminVenueFilterStore } from "@/lib/store/admin-venue.store";

export default function VenuesPage() {
    const {
        filters,
        setFilters
    } = useAdminVenueFilterStore();

    const [searchInput, setSearchInput] = useState(filters.search);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput !== filters.search) {
                setFilters({ search: searchInput });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput, filters.search, setFilters]);

    // TanStack Query for data fetching
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isFetching
    } = useQuery({
        queryKey: ["admin-venues", filters],
        queryFn: () => {
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v !== "" && v !== undefined)
            );
            return venueService.getAdminVenues(cleanFilters);
        },
    });

    const venuesList = data?.items || [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Venues Management
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Manage all sport venues in the system.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
                        <RefreshCw className={cn("mr-2 h-4 w-4", isFetching && "animate-spin")} />
                        Refresh
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Venue
                    </Button>
                </div>
            </div>

            <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4 space-y-4">
                    {isError ? (
                        <div className="flex h-64 flex-col items-center justify-center gap-2 text-red-500">
                            <AlertCircle className="h-10 w-10" />
                            <p className="font-medium">Failed to load venues</p>
                            <p className="text-xs text-gray-500">{(error as any)?.message || "Unknown error"}</p>
                            <Button variant="outline" size="sm" onClick={() => refetch()}>Try Again</Button>
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={venuesList}
                            isLoading={isLoading}
                            searchValue={searchInput}
                            onSearchChange={setSearchInput}
                            filterValue={filters.status}
                            onFilterChange={(val) => setFilters({ status: val as VenueStatus | "" })}
                            filterColumn="status"
                            filterOptions={[
                                { label: 'Approved', value: VenueStatus.APPROVED },
                                { label: 'Pending', value: VenueStatus.PENDING },
                                { label: 'Rejected', value: VenueStatus.REJECTED },
                                { label: 'Suspended', value: VenueStatus.SUSPENDED },
                            ]}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
