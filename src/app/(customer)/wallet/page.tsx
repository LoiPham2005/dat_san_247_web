"use client";

import React, { useState } from 'react';
import { CustomerWalletManagement } from '@/features/payment/components/CustomerWallet';
import { CustomerInvoices } from '@/features/payment/components/CustomerInvoices';
import { WalletCards, ReceiptText } from 'lucide-react';

export default function WalletRoutingPage() {
    const [activeTab, setActiveTab] = useState<'WALLET' | 'INVOICE'>('WALLET');

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-sm">
                            <WalletCards className="w-8 h-8" />
                        </div>
                        Tài Chính & Hóa Đơn
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-3 max-w-xl leading-relaxed">
                        Quản lý số dư, nạp tiền 24/7 và theo dõi mọi hóa đơn/biên lai của bạn tại đây.
                    </p>
                </div>
            </div>

            {/* TAB MENU */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 inline-flex overflow-x-auto scrollbar-hide text-sm font-bold gap-2">
                <button 
                    onClick={() => setActiveTab('WALLET')} 
                    className={`flex items-center gap-2 min-w-[140px] justify-center py-3 px-6 rounded-xl transition-all ${activeTab === 'WALLET' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                >
                    <WalletCards className="w-4 h-4" /> Ví Đặt Sân
                </button>
                <button 
                    onClick={() => setActiveTab('INVOICE')} 
                    className={`flex items-center gap-2 min-w-[140px] justify-center py-3 px-6 rounded-xl transition-all ${activeTab === 'INVOICE' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                >
                    <ReceiptText className="w-4 h-4" /> Hóa Đơn (Invoices)
                </button>
            </div>

            {activeTab === 'WALLET' ? <CustomerWalletManagement /> : <CustomerInvoices />}
        </div>
    );
}
