"use client";

import React from 'react';
import { useCustomerInvoices } from '../hooks/useCustomerPayment';
import { Card } from '@/components/common/Card';
import { FileText, Download, CheckCircle2 } from 'lucide-react';

export const CustomerInvoices = () => {
    const { data: invoices, isLoading } = useCustomerInvoices();

    if (isLoading) return <div className="text-center py-20 font-bold text-slate-500">Đang tải hóa đơn...</div>;

    const formatCurrency = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-2 fade-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 text-primary">
                    <FileText className="w-6 h-6" /> Hóa Đơn & Biên Lai
                </h2>
                <div className="text-sm font-medium text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                    Có {invoices?.length || 0} hóa đơn
                </div>
            </div>

            <div className="divide-y divide-slate-100">
                {invoices?.map((inv) => (
                    <div key={inv.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors group">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 border border-indigo-100">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-base mb-1 group-hover:text-primary transition-colors">
                                    {inv.invoice_number}
                                </h4>
                                <p className="text-sm font-medium text-slate-500 mb-2">Thanh toán sân: <strong className="text-slate-700">{inv.venue_name}</strong> ({inv.booking_id.split('-')[1]})</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                        {new Date(inv.issued_at).toLocaleDateString('vi-VN')}
                                    </span>
                                    {inv.status === 'PAID' && (
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 border border-emerald-100">
                                            <CheckCircle2 className="w-3 h-3" /> Đã Thanh Toán
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 mt-2 md:mt-0">
                            <div className="text-right">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Tổng Tiền</span>
                                <span className="text-xl font-black text-slate-900">{formatCurrency(inv.amount)}</span>
                            </div>
                            <a href={inv.pdf_url || '#'} className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-indigo-800 bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg transition-colors">
                                <Download className="w-4 h-4" /> Tải PDF
                            </a>
                        </div>
                    </div>
                ))}
                
                {(!invoices || invoices.length === 0) && (
                    <div className="p-16 text-center text-slate-500">
                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-1">Chưa có hóa đơn nào</h3>
                        <p className="text-sm font-medium">Các biên lai thanh toán sẽ xuất hiện ở đây.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
