'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    Edit,
    Trash,
    ExternalLink,
    MapPin,
    Star,
    CheckCircle,
    Clock,
    XCircle,
    Loader2
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Venue, VenueStatus } from "@/types/venue.types";
import Link from "next/link";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { venueService } from "@/lib/api/services/venue.service";
import { VenueModal } from "@/components/admin/VenueModal";

const CellAction = ({ venue }: { venue: Venue }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => venueService.adminDeleteVenue(venue.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-venues"] });
            toast({
                title: 'Đã xóa',
                description: `Sân ${venue.name} đã được xóa khỏi hệ thống.`,
                className: "bg-gray-900 text-white border-none"
            });
        },
        onError: (error: any) => {
            toast({
                title: 'Lỗi',
                description: error.response?.data?.message || 'Không thể xóa sân.',
                variant: 'destructive'
            });
        }
    });

    const handleDelete = () => {
        if (confirm(`Bạn có chắc chắn muốn xóa sân "${venue.name}"? Hành động này không thể hoàn tác.`)) {
            deleteMutation.mutate();
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-gray-100 transition-all">
                        <MoreHorizontal className="h-5 w-5 text-gray-400" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-gray-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    <DropdownMenuItem asChild className="p-0">
                        <Link
                            href={`/venues/${venue.id}`}
                            target="_blank"
                            className="flex items-center w-full px-4 py-3 text-sm font-bold text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors cursor-pointer"
                        >
                            <ExternalLink className="mr-3 h-4 w-4" /> View Public
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex items-center w-full px-4 py-3 text-sm font-bold text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors cursor-pointer"
                    >
                        <Edit className="mr-3 h-4 w-4" /> Edit Details
                    </DropdownMenuItem>

                    <div className="my-1 h-px bg-gray-50 dark:bg-gray-800" />

                    <DropdownMenuItem
                        onClick={handleDelete}
                        className="flex items-center w-full px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    >
                        {deleteMutation.isPending ? (
                            <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                        ) : (
                            <Trash className="mr-3 h-4 w-4" />
                        )}
                        Delete Venue
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <VenueModal
                venue={venue}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ["admin-venues"] })}
            />
        </>
    );
};

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

            return <Badge variant={variant} className="pl-1.5 uppercase font-bold text-[10px]">{icon}{status}</Badge>
        }
    },
    {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => {
            const isActive = row.original.isActive;
            return (
                <Badge variant={isActive ? 'success' : 'secondary'} className="font-bold text-[10px]">
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
        cell: ({ row }) => <CellAction venue={row.original} />
    },
];
