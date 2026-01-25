'use client';

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { promotionsService } from "@/lib/api/services/promotion.service";
import { PromotionStatus } from "@/types/promotion.types";
import { PromotionModal } from "@/components/admin/PromotionModal";

export default function PromotionsPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["admin-promotions", statusFilter, searchTerm],
        queryFn: () => promotionsService.getAll({
            status: statusFilter || undefined,
            search: searchTerm || undefined
        }),
    });

    const promotionList = data?.items || [];

    const handleRefresh = () => {
        queryClient.invalidateQueries({ queryKey: ["admin-promotions"] });
    };

    return (
        <div className="space-y-6 pb-10">
            {/* Simple Header like the image */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">
                        Promotions Management
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage all promotions and discount codes in the system.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        className="h-10 px-4 text-gray-600 border-gray-200"
                    >
                        <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="h-10 px-4 bg-[#3e8a42] hover:bg-[#336e37] text-white border-none shadow-sm"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Promotion
                    </Button>
                </div>
            </div>

            {/* Main Table Content */}
            <div className="rounded-xl bg-white border border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-800">
                <div className="p-6">
                    <DataTable
                        columns={columns}
                        data={promotionList}
                        isLoading={isLoading}
                        searchKey="name"
                        searchValue={searchTerm}
                        onSearchChange={setSearchTerm}
                        filterValue={statusFilter}
                        onFilterChange={setStatusFilter}
                        filterColumn="status"
                        filterOptions={[
                            { label: 'Active', value: PromotionStatus.ACTIVE },
                            { label: 'Expired', value: PromotionStatus.EXPIRED },
                            { label: 'Inactive', value: PromotionStatus.INACTIVE },
                        ]}
                    />
                </div>
            </div>

            <PromotionModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
}
