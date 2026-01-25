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
import { userService } from "@/lib/api/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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

const CellAction = ({ user }: { user: User }) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const toggleStatusMutation = useMutation({
        mutationFn: () => userService.toggleStatus(user.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            toast({
                title: "Thành công",
                description: `Đã ${user.isActive ? 'khóa' : 'mở khóa'} tài khoản người dùng.`,
                className: "bg-green-600 text-white border-none"
            });
        },
        onError: (error: any) => {
            toast({
                title: "Lỗi",
                description: error.response?.data?.message || "Không thể thực hiện thao tác.",
                variant: "destructive"
            });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: () => userService.deleteUser(user.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            toast({
                title: "Đã xóa",
                description: "Người dùng đã được xóa khỏi hệ thống.",
                className: "bg-gray-900 text-white border-none"
            });
        }
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl border-gray-100 shadow-xl">
                <DropdownMenuItem className="rounded-lg cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="rounded-lg cursor-pointer"
                    onClick={() => toggleStatusMutation.mutate()}
                >
                    {toggleStatusMutation.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Lock className="mr-2 h-4 w-4" />
                    )}
                    {user.isActive ? 'Khóa tài khoản' : 'Mở khóa'}
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="text-red-600 focus:text-red-700 focus:bg-red-50 rounded-lg cursor-pointer"
                    onClick={() => {
                        if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
                            deleteMutation.mutate();
                        }
                    }}
                >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

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
        cell: ({ row }) => <CellAction user={row.original} />
    },
];

