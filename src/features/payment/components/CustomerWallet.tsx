"use client";

import React, { useState } from 'react';
import { useCustomerWallet, useCustomerTransactions, useDeposit } from '../hooks/useCustomerPayment';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Wallet, ArrowDownToLine, ArrowUpFromLine, FileText, ArrowRightLeft, CreditCard, ShieldCheck } from 'lucide-react';
import { TransactionType, TransactionStatus } from '../api/customer-payment.api';
import { Input } from '@/components/common/Input';

export const CustomerWalletManagement = () => {
    const { data: wallet, isLoading: loadingWallet } = useCustomerWallet();
    const { data: transactions, isLoading: loadingTxns } = useCustomerTransactions();
    const { mutate: doDeposit, isPending } = useDeposit();
    
    const [depositAmount, setDepositAmount] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<'VNPAY' | 'MOMO' | 'ZALOPAY'>('VNPAY');

    if (loadingWallet || loadingTxns) return <div className="text-center py-20 font-bold text-slate-500">Đang tải ví...</div>;

    const handleQuickDeposit = (amount: number) => {
        setDepositAmount(amount.toString());
    };

    const handleConfirmDeposit = () => {
        const amount = parseInt(depositAmount.replace(/,/g, ''));
        if (!amount || amount < 50000) {
            alert('Số tiền nạp tối thiểu là 50,000đ');
            return;
        }
        doDeposit({ amount, method: paymentMethod });
    };

    const formatCurrency = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

    const renderTxIcon = (type: TransactionType) => {
        switch (type) {
            case 'DEPOSIT': return <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full"><ArrowDownToLine className="w-4 h-4" /></div>;
            case 'WITHDRAW': return <div className="p-2 bg-amber-50 text-amber-600 rounded-full"><ArrowUpFromLine className="w-4 h-4" /></div>;
            case 'PAYMENT': return <div className="p-2 bg-rose-50 text-rose-600 rounded-full"><CreditCard className="w-4 h-4" /></div>;
            case 'REFUND': return <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><ArrowRightLeft className="w-4 h-4" /></div>;
            default: return <div className="p-2 bg-slate-50 text-slate-600 rounded-full"><FileText className="w-4 h-4" /></div>;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-in slide-in-from-bottom-2 fade-in">
            {/* CỘT TRÁI (WIDGET VÍ + NẠP TIỀN) */}
            <div className="w-full lg:w-[400px] shrink-0 space-y-6">
                <Card className="p-6 bg-gradient-to-br from-indigo-900 via-primary to-indigo-800 text-white rounded-3xl border-0 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mt-10 -mr-10 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full -mb-10 -ml-10 blur-2xl"></div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-indigo-100 flex items-center gap-2">
                                <Wallet className="w-5 h-5" /> Ví Đặt Sân
                            </h3>
                            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase backdrop-blur-md">Active</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-sm font-medium text-indigo-200">Số dư khả dụng</span>
                        </div>
                        <div className="text-4xl md:text-5xl font-black tracking-tight mb-8">
                            {formatCurrency(wallet?.balance || 0)}
                        </div>
                        
                        {wallet?.locked_balance && wallet.locked_balance > 0 ? (
                            <div className="flex justify-between items-center bg-black/20 rounded-xl p-3 backdrop-blur-md text-sm">
                                <span className="font-medium text-indigo-100">Số dư bị đóng băng (Đang giữ cọc)</span>
                                <span className="font-bold text-white">{formatCurrency(wallet.locked_balance)}</span>
                            </div>
                        ) : null}
                    </div>
                </Card>

                {/* FORM NẠP TIỀN */}
                <Card className="p-6 rounded-3xl shadow-sm border border-slate-200 bg-white">
                    <h3 className="font-bold text-slate-800 text-lg mb-4">Nạp Tiền Vào Ví</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Số tiền (VNĐ)</label>
                            <Input 
                                type="number" 
                                placeholder="Tối thiểu 50,000" 
                                value={depositAmount} 
                                onChange={(e) => setDepositAmount(e.target.value)}
                                className="h-12 text-lg font-bold placeholder:font-medium bg-slate-50 focus:border-primary focus:ring-primary/20"
                            />
                            
                            <div className="grid grid-cols-3 gap-2 mt-3">
                                {[100000, 200000, 500000].map(amt => (
                                    <button 
                                        key={amt} 
                                        onClick={() => handleQuickDeposit(amt)}
                                        className="py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-primary hover:text-primary transition-colors"
                                    >
                                        {formatCurrency(amt).replace('đ', '')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Phương thức thanh toán</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    onClick={() => setPaymentMethod('VNPAY')}
                                    className={`py-3 px-2 border-2 rounded-xl text-center transition-colors flex flex-col items-center justify-center ${paymentMethod === 'VNPAY' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300'}`}
                                >
                                    <span className="font-bold text-sm">VNPay</span>
                                </button>
                                <button 
                                    onClick={() => setPaymentMethod('MOMO')}
                                    className={`py-3 px-2 border-2 rounded-xl text-center transition-colors flex flex-col items-center justify-center ${paymentMethod === 'MOMO' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300'}`}
                                >
                                    <span className="font-bold text-sm">MoMo</span>
                                </button>
                            </div>
                        </div>

                        <Button 
                            className="w-full h-12 font-bold shadow-lg shadow-primary/20 rounded-xl mt-2" 
                            onClick={handleConfirmDeposit}
                            disabled={isPending}
                        >
                            {isPending ? 'Đang tạo GD...' : 'Xác Nhận Nạp Tiền'}
                        </Button>
                        <p className="text-[10px] text-center text-slate-400 font-medium flex items-center justify-center gap-1 mt-3">
                            <ShieldCheck className="w-3.5 h-3.5" /> Giao dịch được mã hóa SSL an toàn
                        </p>
                    </div>
                </Card>
            </div>

            {/* CỘT PHẢI (LỊCH SỬ GIAO DỊCH) */}
            <div className="flex-1">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">Lịch Sử Giao Dịch</h2>
                        <select className="bg-slate-50 border-0 rounded-lg text-sm font-bold text-slate-600 cursor-pointer focus:ring-0">
                            <option>Gần đây (30 ngày)</option>
                            <option>Chỉ Nạp tiền</option>
                            <option>Chỉ Thanh toán sân</option>
                        </select>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {transactions?.map((tx) => (
                            <div key={tx.id} className="p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                {renderTxIcon(tx.type)}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-slate-800 text-sm line-clamp-1 break-all">{tx.description}</h4>
                                        <span className={`font-black text-sm whitespace-nowrap ml-4 ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                                            {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-xs font-semibold text-slate-400">{new Date(tx.created_at).toLocaleString('vi-VN')}</div>
                                        <div className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">SD: {formatCurrency(tx.balance_after)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {(!transactions || transactions.length === 0) && (
                            <div className="p-10 text-center text-slate-500 font-medium text-sm">Chưa có giao dịch nào phát sinh.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
