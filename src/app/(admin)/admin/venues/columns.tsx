'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash, ExternalLink, MapPin, Star, CheckCircle, Clock, XCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Venue, VenueStatus } from "@/types/venue.types";
import Link from "next/link";

export const columns: ColumnDef<Venue>[] = [
    {
        accessorKey: "name",
        header: "Venue",
        enableHiding: false,
        cell: ({ row }) => {
            const venue = row.original;
            const images = venue.images || [];
            const coverImage = images.find(img => img.isPrimary) || images[0];

            return (
                <div className="flex items-center gap-3">
                    <img
                        src={coverImage?.url || `https://ui-avatars.com/api/?name=${venue.name}&background=random`}
                        alt={venue.name}
                        className="h-10 w-16 rounded-md object-cover border border-gray-100 dark:border-gray-800"
                    />
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-white line-clamp-1">{venue.name}</span>
                        <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span className="line-clamp-1">{venue.city}</span>
                        </div>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "owner",
        header: "Owner",
        cell: ({ row }) => {
            const owner = row.original.owner;
            if (!owner) return <span className="text-gray-400">N/A</span>;
            return (
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{owner.fullName}</span>
                    <span className="text-xs text-gray-500">{owner.email}</span>
                </div>
            );
        }
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => {
            const rawRating = row.original.rating;
            const rating = typeof rawRating === 'number' ? rawRating : Number(rawRating || 0);
            return (
                <div className="flex items-center gap-1 font-medium">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{isNaN(rating) ? "0.0" : rating.toFixed(1)}</span>
                </div>
            );
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status as VenueStatus;
            let variant: any = 'default';
            let icon = null;

            switch (status) {
                case VenueStatus.APPROVED:
                    variant = 'success';
                    icon = <CheckCircle className="mr-1 h-3 w-3" />;
                    break;
                case VenueStatus.PENDING:
                    variant = 'warning';
                    icon = <Clock className="mr-1 h-3 w-3" />;
                    break;
                case VenueStatus.REJECTED:
                    variant = 'danger';
                    icon = <XCircle className="mr-1 h-3 w-3" />;
                    break;
            }

            return <Badge variant={variant} className="pl-1.5 uppercase">{icon}{status}</Badge>
        }
    },
    {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => {
            const isActive = row.original.isActive;
            return (
                <Badge variant={isActive ? 'success' : 'secondary'}>
                    {isActive ? 'YES' : 'NO'}
                </Badge>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            return new Date(row.original.createdAt).toLocaleDateString('vi-VN');
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const venue = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/venues/${venue.id}`} target="_blank" className="flex items-center">
                                <ExternalLink className="mr-2 h-4 w-4" /> View Public
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Edit', venue.id)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Delete', venue.id)}>
                            <Trash className="mr-2 h-4 w-4 text-red-600" /> <span className="text-red-600">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
];
