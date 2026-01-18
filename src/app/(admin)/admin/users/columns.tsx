'use client';

import { ColumnDef } from "@tanstack/react-table";
import { UserRole } from "@/types/auth.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash, Lock, Shield, MapPin } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export type User = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: { name: UserRole };
    isActive: boolean;
    createdAt: string;
    avatarUrl?: string;
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "fullName",
        header: "User",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center gap-3">
                    <img
                        src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.fullName}&background=random`}
                        alt={user.fullName}
                        className="h-9 w-9 rounded-full object-cover border border-gray-100 dark:border-gray-800"
                    />
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-white">{user.fullName}</span>
                        <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorFn: (row) => row.role?.name,
        id: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.getValue("role") as UserRole;
            let variant: any = 'default';
            let icon = null;

            if (role === UserRole.ADMIN) { variant = 'danger'; icon = <Shield className="mr-1 h-3 w-3" />; }
            if (role === UserRole.OWNER) { variant = 'warning'; icon = <MapPin className="mr-1 h-3 w-3" />; }
            if (role === UserRole.STAFF) { variant = 'info'; }
            if (role === UserRole.VENUE_STAFF) { variant = 'secondary'; }
            if (role === UserRole.CUSTOMER) { variant = 'success'; }

            return <Badge variant={variant} className="pl-1.5 uppercase">{icon}{role}</Badge>
        }
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.original.isActive;
            return (
                <Badge variant={isActive ? 'success' : 'danger'}>
                    {isActive ? 'ACTIVE' : 'INACTIVE'}
                </Badge>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => {
            return new Date(row.original.createdAt).toLocaleDateString('vi-VN');
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => console.log('Edit', row.original.id)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Lock', row.original.id)}>
                            <Lock className="mr-2 h-4 w-4" /> Lock
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Delete', row.original.id)}>
                            <Trash className="mr-2 h-4 w-4 text-red-600" /> <span className="text-red-600">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
];
