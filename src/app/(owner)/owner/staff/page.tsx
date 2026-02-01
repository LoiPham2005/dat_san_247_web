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
    Unlock,
    Loader2,
    AlertCircle
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
import { useOwnerStaff } from "@/lib/hooks/useOwnerStaff";
import { useState } from "react";
import { StaffModal } from "@/components/owner/StaffModal";
import { ConfirmModal } from "@/components/shared/ConfirmModal";

export default function OwnerStaffPage() {
    const { staff, isLoading, error, refetch, removeStaff, isRemoving, toggleStatus } = useOwnerStaff();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);

    const staffList = Array.isArray(staff) ? staff : [];
    const totalStaff = staffList.length;
    const onDutyCount = staffList.filter(s => s.user?.isActive).length;

    const handleRemoveClick = (id: string) => {
        setSelectedStaffId(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmRemove = async () => {
        if (selectedStaffId) {
            removeStaff(selectedStaffId, {
                onSuccess: () => {
                    setIsConfirmOpen(false);
                    setSelectedStaffId(null);
                }
            });
        }
    };

    const columns: ColumnDef<any>[] = [
        {
            id: "name",
            accessorFn: (row) => row.user?.fullName,
            header: "Staff Member",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 overflow-hidden">
                        {row.original.user?.avatarUrl ? (
                            <img src={row.original.user.avatarUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                            row.original.user?.fullName?.[0] || '?'
                        )}
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{row.original.user?.fullName}</p>
                        <p className="text-xs text-gray-500">{row.original.user?.email}</p>
                    </div>
                </div>
            )
        },
        {
            id: "role",
            header: "Role",
            cell: ({ row }) => <Badge variant="outline">{row.original.user?.role?.name || 'Staff'}</Badge>
        },
        {
            id: "venue",
            header: "Assigned Venue",
            cell: ({ row }) => <span className="text-sm text-gray-600">{row.original.venue?.name}</span>
        },
        {
            id: "status",
            header: "Status",
            cell: ({ row }) => {
                const isActive = row.original.user?.isActive;
                return (
                    <Badge variant={isActive ? 'success' : 'secondary'}>
                        {isActive ? 'ACTIVE' : 'SUSPENDED'}
                    </Badge>
                )
            }
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const isActive = row.original.user?.isActive;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => toggleStatus(row.original.id)}>
                                {isActive ? (
                                    <>
                                        <Lock className="mr-2 h-4 w-4 text-orange-500" />
                                        <span>Suspend Account</span>
                                    </>
                                ) : (
                                    <>
                                        <Unlock className="mr-2 h-4 w-4 text-green-500" />
                                        <span>Activate Account</span>
                                    </>
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleRemoveClick(row.original.id)} className="text-red-600">
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Unassign Staff</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            }
        }
    ];

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
                <Button onClick={() => setIsModalOpen(true)}>
                    <UserPlus className="mr-2 h-4 w-4" /> Add New Staff
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
                <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{totalStaff}</p>
                        <p className="text-xs text-gray-500">Total Staff</p>
                    </div>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CalendarCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{onDutyCount}</p>
                        <p className="text-xs text-gray-500">On Duty Now</p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4">
                    {isLoading && staffList.length === 0 ? (
                        <div className="flex h-64 items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                        </div>
                    ) : error ? (
                        <div className="flex h-64 flex-col items-center justify-center gap-2 text-red-500">
                            <AlertCircle className="h-10 w-10" />
                            <p className="font-medium">Failed to load staff</p>
                            <p className="text-xs text-gray-500">{(error as any).message || 'Something went wrong'}</p>
                            <Button variant="outline" size="sm" onClick={() => refetch()}>Try Again</Button>
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={staffList}
                            searchKey="user_fullName"
                        />
                    )}
                </div>
            </div>

            <StaffModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmRemove}
                title="Unassign Staff"
                description="Are you sure you want to unassign this staff member? They will no longer have access to manage this venue."
                confirmLabel="Unassign"
                isLoading={isRemoving}
            />
        </div>
    );
}

