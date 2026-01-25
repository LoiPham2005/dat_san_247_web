'use client';

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus, Download, Loader2, Search, AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { userService } from "@/lib/api/services/user.service";
import { UserModal } from "@/components/admin/UserModal";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils/format";
import { UserRole } from "@/types/auth.types";



export default function UsersPage() {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState<UserRole | "">("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    console.log('userService object:', userService);

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isFetching
    } = useQuery({
        queryKey: ["admin-users", debouncedSearch, role],
        queryFn: () => {
            if (typeof userService.getUsers !== 'function') {
                console.error('userService.getUsers is NOT a function!', userService);
                throw new Error('userService.getUsers is not a function. Check console for object structure.');
            }
            return userService.getUsers({
                search: debouncedSearch,
                role: role === "" ? undefined : role
            });
        },
    });


    const usersList = data?.items || [];

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
                    <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
                        <RefreshCw className={cn("mr-2 h-4 w-4", isFetching && "animate-spin")} />
                        Refresh
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New User
                    </Button>
                </div>
            </div>

            <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4 space-y-4">
                    {
                        isError ? (
                            <div className="flex h-64 flex-col items-center justify-center gap-2 text-red-500">
                                <AlertCircle className="h-10 w-10" />
                                <p className="font-medium">Failed to load users</p>
                                <p className="text-xs text-gray-500">{(error as any)?.message || "Unknown error"}</p>
                                <Button variant="outline" size="sm" onClick={() => refetch()}>Try Again</Button>
                            </div>
                        ) : (
                            <DataTable
                                columns={columns}
                                data={usersList}
                                searchValue={search}
                                onSearchChange={setSearch}
                                isLoading={isLoading}
                                filterValue={role}
                                onFilterChange={(val) => setRole(val as UserRole | "")}
                                filterColumn="role"
                                filterOptions={[
                                    { label: 'Admin', value: UserRole.ADMIN },
                                    { label: 'Owner', value: UserRole.OWNER },
                                    { label: 'Staff', value: UserRole.STAFF },
                                    { label: 'Customer', value: UserRole.CUSTOMER },
                                ]}
                            />
                        )}
                </div>
            </div>

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => refetch()}
            />
        </div>
    );
}
