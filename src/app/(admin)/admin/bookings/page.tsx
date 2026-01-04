'use client';

import { MOCK_BOOKINGS } from "@/lib/constants/mock-data";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Search } from "lucide-react";

export default function BookingsPage() {
    const data = MOCK_BOOKINGS as any[];

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
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Calendar View
                    </Button>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4">
                    <DataTable
                        columns={columns}
                        data={data}
                        searchKey="customer"
                        filterColumn="status"
                        filterOptions={[
                            { label: 'Completed', value: 'COMPLETED' },
                            { label: 'Confirmed', value: 'CONFIRMED' },
                            { label: 'Cancelled', value: 'CANCELLED' },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
