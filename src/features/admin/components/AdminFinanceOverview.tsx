"use client";

import React, { useState } from 'react';
import { useAdminFinance } from '../hooks/useAdminFinance';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Search, MapPin, Receipt, ArrowDownToLine, ArrowUpToLine, ShieldAlert, ArrowRightLeft } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export const AdminFinanceOverview = () => {
    const { 
        transactions, isLoadingTransactions,
        commissions, isLoadingCommissions
    } = useAdminFinance();

    const [activeTab, setActiveTab] = useState<'COMMISSIONS' | 'TRANSACTIONS'>('COMMISSIONS');
    const [searchTerm, setSearchTerm] = useState('');

    const isLoading = isLoadingTransactions || isLoadingCommissions;

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải Dòng Tiền Toàn Hệ Thống...</p>
                </div>
            </div>
        );
    }

    const filteredCommissions = commissions.filter(c => 
        c.booking_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.venue_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredTransactions = transactions.filter(t => 
        t.reference_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-primary/90 to-primary text-white border-0 shadow-lg p-6">
                    <div className="text-primary-100 text-sm font-bold uppercase tracking-wider mb-2">Tổng Doanh Thu Sàn</div>
                    <div className="text-3xl font-black mb-1">
                        {commissions.reduce((acc, curr) => acc + curr.total_amount, 0).toLocaleString('vi-VN')} đ
                    </div>
                    <div className="text-xs text-primary-200">Tổng Giá Trị Giao Dịch Đã Hoàn Thành</div>
                </Card>
                <Card className="bg-gradient-to-br from-emerald-600 to-emerald-500 text-white border-0 shadow-lg p-6">
                    <div className="text-emerald-100 text-sm font-bold uppercase tracking-wider mb-2">Hoa Hồng Nhận Được</div>
                    <div className="text-3xl font-black mb-1">
                        {commissions.reduce((acc, curr) => acc + curr.commission_amount, 0).toLocaleString('vi-VN')} đ
                    </div>
                    <div className="text-xs text-emerald-100">Lợi Nhận Thuẩn Trích Từ Booking</div>
                </Card>
                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-lg p-6">
                    <div className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Số Dư Quỹ Rút Tiền</div>
                    <div className="text-3xl font-black mb-1 text-sky-400 leading-tight">
                        Mock VAT 10%
                    </div>
                    <div className="text-xs text-slate-500">Thuế GTGT Trích Cho Nhà Nước</div>
                </Card>
            </div>

            {/* Content Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex border-b border-slate-200">
                    <button 
                        className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold transition-all ${activeTab === 'COMMISSIONS' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                        onClick={() => setActiveTab('COMMISSIONS')}
                    >
                        <Receipt className="w-4 h-4" /> Danh Sách Hoa Hồng
                    </button>
                    <button 
                        className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold transition-all ${activeTab === 'TRANSACTIONS' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                        onClick={() => setActiveTab('TRANSACTIONS')}
                    >
                        <ArrowRightLeft className="w-4 h-4" /> Giao Dịch Tài Chính (Transactions)
                    </button>
                </div>

                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Tìm mã giao dịch, mã booking, tên sân..."
                            className="pl-9 h-10 border-slate-200 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="ml-4 h-10 bg-white shadow-sm font-semibold">
                        Xuất Thống Kê (Excel)
                    </Button>
                </div>

                {/* Tab: Commissions */}
                {activeTab === 'COMMISSIONS' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                                <tr>
                                    <th className="px-5 py-4 w-48">Mã Đối Soát</th>
                                    <th className="px-5 py-4 w-60">Sân Nguồn</th>
                                    <th className="px-5 py-4 w-40 text-right">Tổng Tiền Thẻ</th>
                                    <th className="px-5 py-4 w-32 text-center">Tỷ Lệ (%)</th>
                                    <th className="px-5 py-4 w-40 text-right text-emerald-600">Hoa Hồng Sàn</th>
                                    <th className="px-5 py-4 w-36 text-center">Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredCommissions.map(c => (
                                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="font-mono text-xs font-bold text-slate-900">{c.id}</div>
                                            <div className="text-[10px] text-slate-500 mt-1">Ref: {c.booking_id}</div>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                <span className="truncate w-full">{c.venue_name}</span>
                                            </div>
                                            <div className="text-[10px] text-slate-500 mt-1">Ngày đối soát: {format(new Date(c.created_at), 'dd/MM/yyyy HH:mm')}</div>
                                        </td>
                                        <td className="px-5 py-4 text-right font-semibold text-slate-600">{c.total_amount.toLocaleString('vi-VN')} ₫</td>
                                        <td className="px-5 py-4 text-center">
                                            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">{c.commission_rate}%</span>
                                        </td>
                                        <td className="px-5 py-4 text-right font-black text-emerald-600 bg-emerald-50/30">+{c.commission_amount.toLocaleString('vi-VN')} ₫</td>
                                        <td className="px-5 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-sm text-[10px] uppercase font-bold tracking-wider ${c.status === 'COLLECTED' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                                {c.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {filteredCommissions.length === 0 && (
                                    <tr><td colSpan={6} className="text-center py-8 text-slate-500 italic">Không có dữ liệu Hoa hồng.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Tab: Transactions */}
                {activeTab === 'TRANSACTIONS' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                             <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                                <tr>
                                    <th className="px-5 py-4 w-40">Mã Giao Dịch</th>
                                    <th className="px-5 py-4 w-auto">Mô Tả Lệnh Yêu Cầu</th>
                                    <th className="px-5 py-4 w-32 text-center">Loại</th>
                                    <th className="px-5 py-4 w-40 text-right">Số Tiền (VNĐ)</th>
                                    <th className="px-5 py-4 w-36 text-center">Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredTransactions.map(t => (
                                    <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="font-mono text-xs font-bold text-slate-900">{t.id}</div>
                                            <div className="text-[10px] text-slate-500 mt-1">Ref: {t.reference_id}</div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="font-semibold text-slate-800 truncate max-w-sm">{t.description}</div>
                                            <div className="text-[10px] text-slate-500 mt-1">{format(new Date(t.created_at), 'dd/MM/yyyy HH:mm:ss')}</div>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <span className="font-semibold text-[10px] text-slate-500 border border-slate-200 bg-slate-50 px-2 py-0.5 rounded">{t.type}</span>
                                        </td>
                                        <td className={`px-5 py-4 text-right font-black ${t.amount < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                                            <div className="flex items-center justify-end gap-1.5">
                                                {t.amount < 0 ? <ArrowDownToLine className="w-3.5 h-3.5" /> : <ArrowUpToLine className="w-3.5 h-3.5" />}
                                                {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString('vi-VN')}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                             <span className={`px-2 py-1 rounded-sm text-[10px] uppercase font-bold tracking-wider ${t.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {t.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {filteredTransactions.length === 0 && (
                                    <tr><td colSpan={5} className="text-center py-8 text-slate-500 italic">Không có Giao dịch nào.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
