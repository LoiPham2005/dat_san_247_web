'use client';

import { MOCK_USERS } from "@/lib/constants/mock-data";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { UserRole } from "@/types/auth.types";

export default function UsersPage() {
    const data = MOCK_USERS as any[]; // Type assertion for mock data compatibility

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Users Management
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Manage system users, roles, and permissions.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New User
                    </Button>
                </div>
            </div>

            <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4">
                    <DataTable
                        columns={columns}
                        data={data}
                        searchKey="name"
                        filterColumn="role"
                        filterOptions={[
                            { label: 'Admin', value: 'ADMIN' },
                            { label: 'Owner', value: 'OWNER' },
                            { label: 'Staff', value: 'STAFF' },
                            { label: 'Customer', value: 'CUSTOMER' },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
