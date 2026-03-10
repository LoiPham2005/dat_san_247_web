"use client";

import React, { useState } from 'react';
import { useAdminFinance } from '../hooks/useAdminFinance';
import { PayoutStatus } from '../api/admin-finance.api';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card } from '@/components/common/Card';
import { Search, Building2, Banknote, Calendar, CheckCircle2, XCircle, ArrowRightLeft, User, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const getStatusBadge = (status: PayoutStatus) => {
    switch (status) {
        case 'COMPLETED': return <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">HOÀN TẤT</span>;
        case 'PENDING': return <span className="px-2 py-1 rounded bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">CHỜ DUYỆT</span>;
        case 'PROCESSING': return <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200">ĐANG XỬ LÝ</span>;
        case 'REJECTED': return <span className="px-2 py-1 rounded bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200">TỪ CHỐI</span>;
    }
};

export const AdminPayoutList = () => {
    const { payouts, isLoadingPayouts, updatePayoutStatus, isUpdatingPayout } = useAdminFinance();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');

    const filteredPayouts = payouts.filter((payout) => {
        const matchesSearch = payout.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              payout.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              payout.venue_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || payout.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAction = (id: string, status: PayoutStatus) => {
        if (window.confirm(`Xác nhận chuyển trạng thái Yêu cầu rút tiền thành ${status}?`)) {
            updatePayoutStatus({ id, status });
        }
    };

    if (isLoadingPayouts) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải danh sách Yêu cầu Rút Tiền...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Control Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Mã Yêu cầu, Tên Sân, Tên Chủ sân..."
                        className="pl-9 h-10 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <select 
                            className="w-full appearance-none h-10 bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-md px-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-semibold text-slate-700 transition-all cursor-pointer"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="ALL">Tất cả Trạng thái</option>
                            <option value="PENDING">Chờ duyệt</option>
                            <option value="PROCESSING">Đang xử lý</option>
                            <option value="COMPLETED">Hoàn tất</option>
                            <option value="REJECTED">Bị từ chối</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Payouts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredPayouts.length === 0 ? (
                    <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
                        Không tìm thấy Yêu cầu nào.
                    </div>
                ) : (
                    filteredPayouts.map((payout) => (
                        <Card key={payout.id} className="relative overflow-hidden bg-white hover:border-primary/50 transition-all group border-slate-200 p-0 flex flex-col md:flex-row">
                            {/* Left Side: Amount and Status */}
                            <div className="bg-slate-50 w-full md:w-48 p-6 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-center items-center text-center">
                                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-3">
                                    MÃ: {payout.id}
                                </span>
                                <div className="text-xl lg:text-2xl font-black text-rose-600 mb-2 truncate max-w-full" title={payout.amount.toLocaleString('vi-VN') + ' đ'}>
                                    {payout.amount.toLocaleString('vi-VN')} đ
                                </div>
                                <div className="mt-2">
                                    {getStatusBadge(payout.status)}
                                </div>
                            </div>
                            
                            {/* Right Side: Details */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex gap-3 items-center pb-3 border-b border-slate-100">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                                            <Building2 className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <h3 className="font-bold text-slate-900 text-base truncate">{payout.venue_name}</h3>
                                            <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                                                <User className="w-3.5 h-3.5" />
                                                {payout.owner_name} • {payout.owner_email}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bank Info */}
                                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 space-y-2">
                                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Thông tin Nhận Bằng Chuyển Khoản</div>
                                        <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                                            <div className="flex items-center gap-1.5 line-clamp-1">
                                                <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
                                                {payout.bank_name}
                                            </div>
                                            <div className="font-mono bg-white px-2 py-0.5 border border-slate-200 rounded shrink-0">{payout.bank_account_number}</div>
                                        </div>
                                        <div className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                                            <User className="w-3.5 h-3.5" />
                                            {payout.bank_account_name}
                                        </div>
                                    </div>
                                    
                                    {/* Dates */}
                                    <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            Gửi: {format(new Date(payout.requested_at), 'HH:mm dd/MM/yyyy')}
                                        </div>
                                        {payout.processed_at && (
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                Duyệt: {format(new Date(payout.processed_at), 'HH:mm dd/MM/yyyy')}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions Workflow */}
                                {payout.status === 'PENDING' && (
                                    <div className="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-slate-100">
                                        <Button 
                                            variant="outline" size="sm" className="h-9 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                                            disabled={isUpdatingPayout}
                                            onClick={() => handleAction(payout.id, 'REJECTED')}
                                        >
                                            <XCircle className="w-4 h-4 mr-1.5" />
                                            Từ Chối
                                        </Button>
                                        <Button 
                                            size="sm" className="h-9 bg-primary text-white hover:bg-primary/90"
                                            disabled={isUpdatingPayout}
                                            onClick={() => handleAction(payout.id, 'COMPLETED')}
                                        >
                                            <CheckCircle2 className="w-4 h-4 mr-1.5" />
                                            Duyệt (Đã CK)
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};
