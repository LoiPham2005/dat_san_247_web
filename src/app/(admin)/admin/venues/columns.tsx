'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash, ExternalLink, Star } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export type Venue = {
    id: string;
    name: string;
    address: string;
    owner: string;
    type: string;
    status: 'ACTIVE' | 'PENDING' | 'REJECTED';
    price: string;
    image: string;
    rating: number;
    reviews: number;
}

export const columns: ColumnDef<Venue>[] = [
    {
        accessorKey: "name",
        header: "Venue",
        cell: ({ row }) => {
            const venue = row.original;
            return (
                <div className="flex items-center gap-3">
                    <img
                        src={venue.image}
                        alt={venue.name}
                        className="h-10 w-16 rounded-md object-cover border border-gray-100 dark:border-gray-800"
                    />
                    <div className="flex flex-col max-w-[200px]">
                        <span className="font-semibold text-gray-900 dark:text-white truncate">{venue.name}</span>
                        <span className="text-xs text-gray-500 truncate">{venue.address}</span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <Badge variant="outline">{row.original.type}</Badge>
    },
    {
        accessorKey: "owner",
        header: "Owner",
    },
    {
        accessorKey: "price",
        header: "Price Range",
        cell: ({ row }) => <span className="text-sm font-medium text-primary-600">{row.original.price}</span>
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge variant={
                    status === 'ACTIVE' ? 'success' :
                        status === 'PENDING' ? 'warning' : 'danger'
                }>
                    {status}
                </Badge>
            )
        }
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => (
            <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-sm font-bold">{row.original.rating}</span>
                <span className="text-xs text-gray-400">({row.original.reviews})</span>
            </div>
        )
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
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Edit Venue
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" /> View Page
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4 text-red-600" /> <span className="text-red-600">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
];
