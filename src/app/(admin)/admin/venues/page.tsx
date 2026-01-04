'use client';

import { MOCK_VENUES } from "@/lib/constants/mock-data";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus, Map, Filter } from "lucide-react";

export default function VenuesPage() {
    const data = MOCK_VENUES as any[];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Venues Management
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Approve and manage sport venues across the platform.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Map className="mr-2 h-4 w-4" />
                        Map View
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Venue
                    </Button>
                </div>
            </div>

            <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4">
                    <DataTable
                        columns={columns}
                        data={data}
                        searchKey="name"
                        filterColumn="status"
                        filterOptions={[
                            { label: 'Active', value: 'ACTIVE' },
                            { label: 'Pending', value: 'PENDING' },
                            { label: 'Rejected', value: 'REJECTED' },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
