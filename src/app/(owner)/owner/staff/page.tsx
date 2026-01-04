'use client';

import { ColumnDef } from "@tanstack/react-table";
import {
    Users,
    UserPlus,
    Shield,
    MoreHorizontal,
    Mail,
    Phone,
    CalendarCheck,
    Lock,
    Unlock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const MOCK_STAFF = [
    {
        id: 'st-01',
        name: 'Nguyen Van Nhan Vien',
        email: 'staff1@example.com',
        phone: '0908887776',
        role: 'Receptionist',
        venue: 'Sân bóng đá Mini 247',
        status: 'ACTIVE',
        lastActive: '10 mins ago'
    },
    {
        id: 'st-02',
        name: 'Tran Thi Quan Ly',
        email: 'manager@example.com',
        phone: '0901112223',
        role: 'Manager',
        venue: 'All Venues',
        status: 'ACTIVE',
        lastActive: '1 hour ago'
    },
    {
        id: 'st-03',
        name: 'Le Van Bao Ve',
        email: 'security@example.com',
        phone: '0903334445',
        role: 'Security',
        venue: 'Sân Tennis Vàng',
        status: 'INACTIVE',
        lastActive: '2 days ago'
    }
];

export default function OwnerStaffPage() {
    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Staff Management
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Manage your team, assign roles, and track performance.
                    </p>
                </div>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" /> Add New Staff
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
                <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-xs text-gray-500">Total Staff</p>
                    </div>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CalendarCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">8</p>
                        <p className="text-xs text-gray-500">On Duty Now</p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4">
                    <DataTable
                        columns={columns}
                        data={MOCK_STAFF}
                        searchKey="name"
                    />
                </div>
            </div>
        </div>
    );
}

const columns: ColumnDef<any>[] = [
    {
        accessorKey: "name",
        header: "Staff Member",
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                    {row.original.name[0]}
                </div>
                <div>
                    <p className="font-semibold text-sm">{row.original.name}</p>
                    <p className="text-xs text-gray-500">{row.original.email}</p>
                </div>
            </div>
        )
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>
    },
    {
        accessorKey: "venue",
        header: "Assigned Venue",
        cell: ({ row }) => <span className="text-sm text-gray-600">{row.original.venue}</span>
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.original.status === 'ACTIVE';
            return (
                <Badge variant={isActive ? 'success' : 'secondary'}>
                    {row.original.status}
                </Badge>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <CalendarCheck className="mr-2 h-4 w-4" /> View Schedule
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" /> Edit Permissions
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {row.original.status === 'ACTIVE' ? (
                        <DropdownMenuItem className="text-orange-600">
                            <Lock className="mr-2 h-4 w-4" /> Suspend Account
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem className="text-green-600">
                            <Unlock className="mr-2 h-4 w-4" /> Activate Account
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
];
