'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    Edit,
    Trash,
    Copy,
    Loader2,
    Calendar,
    ArrowUpRight,
    Send
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Promotion, PromotionStatus, DiscountType } from "@/types/promotion.types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promotionsService } from "@/lib/api/services/promotion.service";
import { useToast } from "@/components/ui/use-toast";
import { PromotionModal } from "@/components/admin/PromotionModal";
import { usePromotion } from "@/lib/hooks/usePromotion";

const CellAction = ({ promotion }: { promotion: Promotion }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { duplicate, isDuplicating } = usePromotion();

    const deleteMutation = useMutation({
        mutationFn: () => promotionsService.delete(promotion.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-promotions"] });
            toast({
                title: 'Thành công',
                description: `Đã xóa mã khuyến mãi ${promotion.code}.`,
            });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Không thể xóa mã khuyến mãi.';
            toast({
                title: 'Lỗi',
                description: Array.isArray(message) ? message.join(', ') : message,
                variant: 'destructive'
            });
        }
    });

    const onCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        toast({
            title: 'Đã sao chép',
            description: `Mã ${code} đã được lưu vào bộ nhớ tạm.`,
        });
    };

    const onSend = () => {
        toast({
            title: 'Send to Users',
            description: `Đang gửi mã ${promotion.code} tới người dùng...`,
        });
    };

    const onDelete = () => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa mã "${promotion.code}"?`)) {
            deleteMutation.mutate();
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                        <Edit className="mr-2 h-4 w-4 text-blue-500" /> Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCopy(promotion.code)}>
                        <Copy className="mr-2 h-4 w-4 text-gray-500" /> Sao chép mã
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => !isDuplicating && duplicate(promotion)}
                        className={isDuplicating ? "opacity-50 pointer-events-none" : "cursor-pointer"}
                    >
                        {isDuplicating ? <Loader2 className="mr-2 h-4 w-4 animate-spin text-green-500" /> : <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />}
                        Nhân bản
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onSend}>
                        <Send className="mr-2 h-4 w-4 text-orange-500" /> Gửi tới người dùng
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onDelete} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                        {deleteMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash className="mr-2 h-4 w-4" />}
                        Xóa voucher
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <PromotionModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                promotion={promotion}
            />
        </>
    );
};

const StatusSwitchCell = ({ promotion }: { promotion: Promotion }) => {
    const { toggleStatus } = usePromotion();
    const isActive = promotion.status === PromotionStatus.ACTIVE;

    return (
        <Switch
            checked={isActive}
            onCheckedChange={(checked) => {
                toggleStatus({
                    id: promotion.id,
                    status: checked ? PromotionStatus.ACTIVE : PromotionStatus.INACTIVE
                });
            }}
        />
    );
};

const StatusBadgeCell = ({ promotion }: { promotion: Promotion }) => {
    const isActive = promotion.status === PromotionStatus.ACTIVE;
    const isExpired = promotion.status === PromotionStatus.EXPIRED;

    return (
        <Badge
            variant={isActive ? 'success' : isExpired ? 'destructive' : 'secondary'}
            className="font-medium min-w-[80px] justify-center"
        >
            {promotion.status}
        </Badge>
    );
};

export const columns: ColumnDef<Promotion>[] = [
    {
        accessorKey: "code",
        header: "Promotion Name",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-semibold text-gray-900 dark:text-white uppercase tracking-wider">{row.original.code}</span>
                <span className="text-xs text-gray-500">{row.original.name}</span>
            </div>
        )
    },
    {
        accessorKey: "discountValue",
        header: "Discount",
        cell: ({ row }) => {
            const promo = row.original;
            return (
                <span className="font-bold text-[#3e8a42]">
                    {promo.discountType === DiscountType.PERCENTAGE ? `${promo.discountValue}%` : `${promo.discountValue.toLocaleString()}đ`}
                </span>
            )
        }
    },
    {
        id: "toggle",
        header: "",
        cell: ({ row }) => <StatusSwitchCell promotion={row.original} />
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadgeCell promotion={row.original} />
    },
    {
        id: "usage",
        header: "Usage",
        cell: ({ row }) => {
            const promo = row.original;
            const limit = promo.usageLimit || 0;
            const count = promo.usageCount || 0;
            const percentage = limit > 0 ? (count / limit) * 100 : 0;

            return (
                <div className="w-32 space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                        <span>{count}/{limit === 0 ? '∞' : limit}</span>
                        {limit > 0 && <span>{Math.round(percentage)}%</span>}
                    </div>
                    {limit > 0 && (
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-800">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${percentage > 90 ? 'bg-red-500' : 'bg-[#3e8a42]'}`}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "validTo",
        header: "Expiry Date",
        cell: ({ row }) => {
            const date = new Date(row.original.validTo);
            return (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-3.5 w-3.5" />
                    {date.toLocaleDateString('vi-VN')}
                </div>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction promotion={row.original} />
    },
];
