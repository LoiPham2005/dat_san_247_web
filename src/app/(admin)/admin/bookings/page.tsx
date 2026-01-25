'use client';

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Search, Loader2 } from "lucide-react";
import { useAdminBooking } from "@/lib/hooks/useAdminBooking";
import { useState } from "react";
import { BookingStatus } from "@/types/booking.types";

export default function BookingsPage() {
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        search: '',
        status: undefined,
    });

    const { bookings, isLoading, error, meta } = useAdminBooking(filters);

    if (error) {
        return (
            <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed border-red-200 bg-red-50 p-8 text-center">
                <p className="text-red-600">Failed to load bookings. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Bookings Management
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Monitor and handle all bookings and disputes.
                    </p>
                </div>
            </div>

            <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4">
                    {isLoading ? (
                        <div className="flex h-[400px] items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={bookings}
                            searchKey="customerName"
                            filterColumn="status"
                            filterOptions={[
                                { label: 'Pending', value: BookingStatus.PENDING },
                                { label: 'Confirmed', value: BookingStatus.CONFIRMED },
                                { label: 'Checked In', value: BookingStatus.CHECKED_IN },
                                { label: 'Completed', value: BookingStatus.COMPLETED },
                                { label: 'Cancelled', value: BookingStatus.CANCELLED },
                            ]}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
