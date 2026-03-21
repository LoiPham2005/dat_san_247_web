"use client";

import React, { useState, useEffect } from 'react';
import { useAdminPromotions } from '../hooks/useAdminPromotions';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Search, Tag, CalendarClock, Users, ArchiveRestore, Clock, TicketPercent, CheckCircle2, Trash2, PlusCircle, PenSquare, ChevronDown, Check, MoreVertical, ShieldCheck, Globe, Lock } from 'lucide-react';
import { format } from 'date-fns';
import { PromotionStatus, PromotionDiscountType, AdminPromotion } from '../api/admin-promotion.api';
import { Pagination } from '@/components/common/Pagination';
import { cn } from '@/lib/utils/cn';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PromotionModal } from './PromotionModal';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';

export const AdminPromotionList = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');

    // State for status dropdown
    const [openStatusId, setOpenStatusId] = useState<string | null>(null);

    // State for create/edit modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState<AdminPromotion | null>(null);

    // State for delete confirmation
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [promotionToDelete, setPromotionToDelete] = useState<{ id: string, code: string } | null>(null);

    const {
        promotions, meta, isLoading, isError, error, isFetching,
        updateStatus, deletePromotion, createPromotion, updatePromotion,
        isUpdating, isDeleting, isCreating
    } = useAdminPromotions({
        page,
        limit,
        search: searchTerm || undefined,
        status: statusFilter === 'ALL' ? undefined : statusFilter as PromotionStatus
    });

    console.log('>>> [DEBUG] promotions:', promotions);
    
    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.status-trigger') && !target.closest('.status-dropdown')) {
                setOpenStatusId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setPage(1);
    };

    const handleStatusFilter = (val: string) => {
        setStatusFilter(val);
        setPage(1);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };

    const handleDeleteClick = (id: string, code: string) => {
        setPromotionToDelete({ id, code });
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (promotionToDelete) {
            await deletePromotion(promotionToDelete.id);
            setIsDeleteDialogOpen(false);
            setPromotionToDelete(null);
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: PromotionStatus) => {
        await updateStatus({ id, status: newStatus });
        setOpenStatusId(null);
    };

    const handleOpenCreateModal = () => {
        setSelectedPromotion(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (promotion: AdminPromotion) => {
        setSelectedPromotion(promotion);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (data: any) => {
        try {
            // Convert strings back to numbers/ISO strings if needed
            const formattedData = {
                ...data,
                discount_value: Number(data.discount_value),
                max_discount_amount: data.max_discount_amount ? Number(data.max_discount_amount) : null,
                min_booking_amount: Number(data.min_booking_amount),
                usage_limit: data.usage_limit ? Number(data.usage_limit) : null,
                max_usage_per_user: Number(data.max_usage_per_user),
                valid_from: new Date(data.valid_from).toISOString(),
                valid_to: new Date(data.valid_to).toISOString(),
            };

            if (selectedPromotion) {
                await updatePromotion({ id: selectedPromotion.id, data: formattedData });
            } else {
                await createPromotion(formattedData);
            }
            setIsModalOpen(false);
        } catch (error) {
            // Handled by toast
        }
    };

    const formatDateSafe = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            return format(new Date(dateString), 'dd/MM/yyyy');
        } catch (error) {
            return 'N/A';
        }
    };

    if (isError) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl max-w-md text-center">
                    <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ArchiveRestore className="w-6 h-6" />
                    </div>
                    <h3 className="text-rose-900 font-bold mb-2">Đã xảy ra lỗi khi tải dữ liệu</h3>
                    <p className="text-rose-600 text-sm mb-4">{(error as any)?.response?.data?.message || error?.message || 'Vui lòng kiểm tra lại kết nối và thử lại.'}</p>
                    <Button onClick={() => window.location.reload()} variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-100">
                        Thử lại
                    </Button>
                </div>
            </div>
        );
    }

    if (isLoading && !isFetching) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải danh sách Khuyến mãi...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Control Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Tìm mã Code, tên chương trình..."
                        className="pl-9 h-10 border-slate-200 bg-slate-50 focus:bg-white"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
                    <div className="relative w-full md:w-48">
                        <select
                            className="w-full appearance-none h-10 bg-slate-50 hover:bg-white border border-slate-200 rounded-md px-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 font-semibold text-slate-700 cursor-pointer transition-all shadow-sm"
                            value={statusFilter}
                            onChange={(e) => handleStatusFilter(e.target.value)}
                        >
                            <option value="ALL">Tất cả Trạng thái</option>
                            <option value="ACTIVE">Đang hoạt động</option>
                            <option value="INACTIVE">Tạm ngưng</option>
                            <option value="EXPIRED">Đã hết hạn</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>

                    <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden md:block"></div>

                    <Button
                        onClick={handleOpenCreateModal}
                        className="h-10 px-4 font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 flex items-center gap-2 rounded-lg transition-all active:scale-95"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Tạo Khuyến Mãi
                    </Button>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {promotions.length === 0 ? (
                    <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
                        Không tìm thấy Khuyến mãi nào phù hợp.
                    </div>
                ) : (
                    promotions.map((promo) => (
                        <div key={promo.id} className={cn(
                            "bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-primary/40 hover:shadow-md transition-all flex flex-col md:flex-row overflow-hidden relative group",
                            promo.status === 'EXPIRED' && "opacity-75 grayscale-[0.5]"
                        )}>

                            {/* Left Strip: Ticket Visual */}
                            <div className={cn(
                                "w-full md:w-36 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-dashed border-slate-200 relative",
                                promo.status === 'ACTIVE' ? "bg-primary" : "bg-slate-300"
                            )}>
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full hidden md:block" />
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full hidden md:block border-l border-dashed border-slate-200" />

                                <TicketPercent className="w-10 h-10 text-white/90 mb-3" />
                                <div className="text-white font-black text-2xl leading-none text-center">
                                    {promo.discount_type === 'PERCENTAGE' ? `${Number(promo.discount_value)}%` : `${(Number(promo.discount_value) / 1000)}K`}
                                </div>
                                <div className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-2 px-2 py-0.5 bg-black/10 rounded-full text-center">
                                    {promo.discount_type === 'PERCENTAGE' ? 'Phần trăm' : 'Giảm tiền mặt'}
                                </div>
                            </div>

                            {/* Center Content */}
                            <div className="flex-1 p-5 pr-14 relative z-20">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="font-mono font-black text-slate-800 tracking-wider text-sm bg-slate-100 px-2 py-1 rounded border border-slate-200 inline-block uppercase shadow-sm">
                                        {promo.code}
                                    </span>
                                    {promo.is_public ? (
                                        <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-emerald-100">
                                            <Globe className="w-3 h-3" /> Công khai
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-slate-200">
                                            <Lock className="w-3 h-3" /> Nội bộ
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-bold text-slate-900 leading-tight mb-1 line-clamp-1">{promo.name}</h3>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed min-h-[32px] line-clamp-2">
                                    {promo.description || 'Không có mô tả'}
                                </p>

                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center gap-2 text-[11px] text-slate-600 font-semibold bg-slate-50 p-2 rounded-xl border border-slate-100">
                                        <CalendarClock className="w-3.5 h-3.5 text-primary/60" />
                                        <span>
                                            {formatDateSafe(promo.valid_from)}
                                            <span className="mx-2 text-slate-300">→</span>
                                            {formatDateSafe(promo.valid_to)}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex items-center gap-2 text-[11px] text-slate-600 font-semibold bg-slate-50 p-2 rounded-xl border border-slate-100">
                                            <ArchiveRestore className="w-3.5 h-3.5 text-slate-400" />
                                            <div>
                                                <span className="text-[9px] text-slate-400 block -mb-0.5 font-bold uppercase tracking-tighter">Đơn tối thiểu</span>
                                                {Number(promo.min_booking_amount).toLocaleString('vi-VN')}đ
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-[11px] text-slate-600 font-semibold bg-slate-50 p-2 rounded-xl border border-slate-100">
                                            <Users className="w-3.5 h-3.5 text-slate-400" />
                                            <div>
                                                <span className="text-[9px] text-slate-400 block -mb-0.5 font-bold uppercase tracking-tighter">Đã sử dụng</span>
                                                <span className="text-primary font-bold">{promo.usage_count}</span>
                                                <span className="text-slate-400">/{promo.usage_limit || '∞'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Action Vertical Bar */}
                            <div className="absolute top-0 right-0 bottom-0 w-12 flex flex-col items-center py-4 gap-4 z-20 border-l border-slate-100 bg-slate-50/50">
                                <div className="relative">
                                    <div
                                        className="status-trigger cursor-pointer hover:scale-110 transition-transform"
                                        onClick={() => setOpenStatusId(openStatusId === promo.id ? null : promo.id)}
                                    >
                                        <StatusBadge status={promo.status} type="promotion" className="w-6 h-6 !p-0 flex items-center justify-center rounded-full" />
                                    </div>

                                    {openStatusId === promo.id && (
                                        <div className="status-dropdown absolute top-0 right-full mr-2 z-50 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2 min-w-[170px] animate-in fade-in slide-in-from-right-2 duration-200">
                                            <div className="py-2 px-3 mb-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">Đổi Trạng thái</div>
                                            <div className="flex flex-col gap-1.5">
                                                {(['ACTIVE', 'INACTIVE', 'EXPIRED'] as PromotionStatus[]).map(st => (
                                                    <button
                                                        key={st}
                                                        disabled={isUpdating}
                                                        onClick={() => handleStatusUpdate(promo.id, st)}
                                                        className={cn(
                                                            "flex items-center justify-between gap-3 p-1.5 rounded-xl transition-all",
                                                            promo.status === st ? "bg-slate-50 ring-1 ring-primary/20 shadow-sm" : "hover:bg-slate-50/50"
                                                        )}
                                                    >
                                                        <StatusBadge status={st} type="promotion" className="flex-1 text-center py-2" />
                                                        <div className="flex-shrink-0 w-6 flex justify-center">
                                                            {promo.status === st && <Check className="w-3.5 h-3.5 text-primary" />}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col justify-end gap-2 pb-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                                        onClick={() => handleOpenEditModal(promo)}
                                    >
                                        <PenSquare className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                                        onClick={() => handleDeleteClick(promo.id, promo.code)}
                                        disabled={isDeleting}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {meta && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <Pagination
                        currentPage={page}
                        totalPages={meta.totalPages}
                        onPageChange={setPage}
                        limit={limit}
                        onLimitChange={handleLimitChange}
                        totalItems={meta.total}
                    />
                </div>
            )}

            <PromotionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                promotion={selectedPromotion}
                isSubmitting={isCreating || isUpdating}
            />

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Xác nhận xóa"
                description={`Bạn có chắc chắn muốn xóa mã khuyến mãi ${promotionToDelete?.code}? Hành động này không thể hoàn tác.`}
                type="danger"
                loading={isDeleting}
                confirmText="Xóa ngay"
            />
        </div>
    );
};
