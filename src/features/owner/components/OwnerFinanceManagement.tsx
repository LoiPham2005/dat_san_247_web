"use client";

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useOwnerPayouts, useOwnerBankAccounts, useOwnerWallet, useOwnerFinancialStats } from '../hooks/useOwnerFinance';
import { Wallet, Landmark, ArrowUpCircle, Clock, CheckCircle2, XCircle, TrendingUp, History, CreditCard, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export const OwnerFinanceManagement = ({ venueId }: { venueId: string }) => {
    const { payouts, requestPayout, isRequesting, isLoading: isPayoutsLoading } = useOwnerPayouts();
    const { accounts, addAccount, deleteAccount, isLoading: isAccountsLoading, isAdding } = useOwnerBankAccounts();
    const { data: wallet, isLoading: isWalletLoading } = useOwnerWallet();
    const { stats, commissions, isLoadingStats, isLoadingCommissions } = useOwnerFinancialStats(venueId);

    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PAYOUT' | 'BANKS'>('OVERVIEW');

    // Add Bank Form
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');

    // Payout Form
    const [payoutAmount, setPayoutAmount] = useState<number | ''>('');
    const [selectedBank, setSelectedBank] = useState<string>('');

    const handleAddBank = () => {
        if (!bankName || !accountNumber || !accountName) {
            toast.error("Vui lòng điền đủ thông tin ngân hàng.");
            return;
        }
        addAccount({ bank_name: bankName, bank_code: bankName, account_number: accountNumber, account_name: accountName, is_default: accounts.length === 0 });
        setBankName(''); setAccountNumber(''); setAccountName('');
    };

    const handlePayoutDesc = () => {
        if (!payoutAmount || payoutAmount < 100000) {
            toast.error("Số tiền rút tối thiểu là 100.000đ");
            return;
        }
        if (!selectedBank) {
            toast.error("Vui lòng chọn tài khoản ngân hàng nhận tiền.");
            return;
        }
        requestPayout({ amount: Number(payoutAmount), bank_account_id: selectedBank });
        setPayoutAmount('');
    };

    return (
        <div className="space-y-6">
            {/* TABS LIST */}
            <div className="flex space-x-2 border-b border-slate-200">
                <button 
                    className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'OVERVIEW' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('OVERVIEW')}
                >
                    <TrendingUp className="w-4 h-4" /> Tổng Quan Doanh Thu
                </button>
                <button 
                    className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'PAYOUT' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('PAYOUT')}
                >
                    <Wallet className="w-4 h-4" /> Rút Tiền / Đối Soát
                </button>
                <button 
                    className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'BANKS' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('BANKS')}
                >
                    <Landmark className="w-4 h-4" /> Tài Khoản Ngân Hàng
                </button>
            </div>

            {/* TAB OVERVIEW */}
            {activeTab === 'OVERVIEW' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-2 fade-in">
                    {/* STATS WIDGETS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="p-5 flex flex-col justify-between border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                            <span className="text-xs font-bold text-slate-500 uppercase">Tổng KH Đã Thanh Toán</span>
                            <div className="mt-2 flex items-end justify-between">
                                <span className="text-2xl font-black text-slate-900">{isLoadingStats ? '...' : stats?.totalRevenue?.toLocaleString()} <span className="text-sm font-medium text-slate-500">đ</span></span>
                            </div>
                        </Card>
                        <Card className="p-5 flex flex-col justify-between border-l-4 border-l-amber-500 hover:shadow-md transition-shadow bg-amber-50/30">
                            <span className="text-xs font-bold text-amber-700 uppercase">Phí Nền Tảng (Commission)</span>
                            <div className="mt-2 flex items-end justify-between">
                                <span className="text-2xl font-black text-amber-600">- {isLoadingStats ? '...' : stats?.totalCommission?.toLocaleString()} <span className="text-sm font-medium text-amber-500">đ</span></span>
                            </div>
                        </Card>
                        <Card className="p-5 flex flex-col justify-between border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow bg-emerald-50/50">
                            <span className="text-xs font-bold text-emerald-800 uppercase">Doanh Thu Thực Nhận</span>
                            <div className="mt-2 flex items-end justify-between">
                                <span className="text-2xl font-black text-emerald-600">{isLoadingStats ? '...' : stats?.netIncome?.toLocaleString()} <span className="text-sm font-medium text-emerald-500">đ</span></span>
                            </div>
                        </Card>
                        <Card className="p-5 flex flex-col justify-between border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow relative overflow-hidden">
                            <Wallet className="absolute right-[-20px] bottom-[-20px] w-24 h-24 text-indigo-50 opacity-50" />
                            <span className="text-xs font-bold text-indigo-800 uppercase relative z-10">Số Dư Khả Dụng Ví</span>
                            <div className="mt-2 flex items-end justify-between relative z-10">
                                <span className="text-2xl font-black text-indigo-600">{isWalletLoading ? '...' : wallet?.balance?.toLocaleString()} <span className="text-sm font-medium text-indigo-500">đ</span></span>
                                <Button size="sm" onClick={() => setActiveTab('PAYOUT')} className="h-7 text-[10px] px-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">Rút ngay</Button>
                            </div>
                        </Card>
                    </div>

                    {/* Lịch sử đối soát / Booking Commissions */}
                    <Card className="p-0 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                            <div>
                                <h3 className="font-black text-slate-800 flex items-center gap-2"><History className="w-5 h-5 text-emerald-600" /> Bảng Kê Thu Nhập (Theo Khách Đặt)</h3>
                                <p className="text-xs font-medium text-slate-500 mt-1">Chi tiết tiền chia sẻ doanh thu cho từng lịch đặt sân thành công.</p>
                            </div>
                        </div>
                        {isLoadingCommissions ? (
                            <div className="p-12 text-center text-slate-500 font-medium">Đang tải lịch sử thanh toán...</div>
                        ) : commissions.length === 0 ? (
                            <div className="p-12 text-center text-slate-500 font-medium my-4">Chưa có giao dịch phát sinh.</div>
                        ) : (
                            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold">Mã Booking</th>
                                            <th className="px-6 py-3 font-semibold">Ngày tạo</th>
                                            <th className="px-6 py-3 font-semibold text-right">Tổng Tiền Thu</th>
                                            <th className="px-6 py-3 font-semibold text-right">Phí Nền tảng</th>
                                            <th className="px-6 py-3 font-semibold text-right">Chủ Sân Nhận</th>
                                            <th className="px-6 py-3 font-semibold text-center">Trạng Thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commissions.map((c) => (
                                            <tr key={c.id} className="bg-white border-b hover:bg-slate-50">
                                                <td className="px-6 py-4 font-bold text-slate-800">#{c.booking_id.substring(0,8)}</td>
                                                <td className="px-6 py-4 text-slate-500">{new Date(c.created_at).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 text-right font-semibold text-slate-700">{c.booking_amount.toLocaleString()} đ</td>
                                                <td className="px-6 py-4 text-right font-medium text-rose-500">-{c.commission_amount.toLocaleString()} đ</td>
                                                <td className="px-6 py-4 text-right font-black text-emerald-600">{c.owner_receives.toLocaleString()} đ</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${c.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : c.status === 'APPROVED' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {c.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                </div>
            )}

            {/* TAB PAYOUT */}
            {activeTab === 'PAYOUT' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 fade-in">
                    {/* YÊU CẦU RÚT TIỀN FORM */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="p-6 bg-indigo-600 text-white relative overflow-hidden border-none shadow-lg">
                            <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-white/10 rounded-full mix-blend-overlay"></div>
                            <div className="relative z-10">
                                <span className="text-indigo-200 font-semibold text-sm">Số dư có thể rút</span>
                                <div className="text-3xl font-black mt-1 mb-4">{wallet?.balance?.toLocaleString() || 0} đ</div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-indigo-200 mb-1 block">Rút về ngân hàng</label>
                                        <select 
                                            value={selectedBank} 
                                            onChange={e => setSelectedBank(e.target.value)}
                                            className="w-full h-10 px-3 bg-indigo-700/50 border border-indigo-400/50 rounded-lg text-sm text-white font-medium outline-none"
                                        >
                                            <option value="">-- Chọn ngân hàng --</option>
                                            {accounts.map(a => (
                                                <option key={a.id} value={a.id}>{a.bank_name} - {a.account_number}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-indigo-200 mb-1 block">Số tiền cần rút</label>
                                        <div className="relative">
                                            <Input 
                                                type="number" 
                                                placeholder="VD: 500000" 
                                                value={payoutAmount}
                                                onChange={e => setPayoutAmount(Number(e.target.value))}
                                                className="w-full text-indigo-950 font-black h-11 pr-12 bg-white border-none rounded-lg focus-visible:ring-indigo-400"
                                            />
                                            <span className="absolute right-4 top-3 h-4 w-4 text-slate-400 font-bold">VNĐ</span>
                                        </div>
                                    </div>
                                    <Button 
                                        onClick={handlePayoutDesc} 
                                        disabled={isRequesting || accounts.length === 0} 
                                        className="w-full bg-white text-indigo-700 hover:bg-slate-50 font-black shadow-md mt-2 h-11"
                                    >
                                        {isRequesting ? 'Đang gửi yêu cầu...' : 'Tạo Lệnh Rút Tiền'}
                                    </Button>
                                    {accounts.length === 0 && (
                                        <p className="text-xs text-amber-200 text-center font-medium">Bạn chưa thêm Tài khoản Ngân hàng nào!</p>
                                    )}
                                </div>
                            </div>
                        </Card>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-600">
                            <strong>Lưu ý:</strong>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Số tiền rút tối thiểu: 100,000 VND.</li>
                                <li>Yêu cầu rút tiền được Kế toán DatSan247 xử lý trong vòng 2-24h (T2-T6).</li>
                                <li>Kiểm tra kỹ thông tin ngân hàng trước khi tạo lệnh rút.</li>
                            </ul>
                        </div>
                    </div>

                    {/* LỊCH SỬ RÚT TIỀN */}
                    <div className="lg:col-span-2">
                        <Card className="p-0 overflow-hidden h-full flex flex-col">
                            <div className="p-5 border-b border-slate-100">
                                <h3 className="font-black text-slate-800">Lịch Sử Rút Tiền / Đối Soát</h3>
                            </div>
                            <div className="flex-1 overflow-y-auto bg-slate-50/50">
                                {isPayoutsLoading ? (
                                    <div className="p-12 text-center text-slate-500 font-medium">Đang tải dữ liệu...</div>
                                ) : (payouts || []).length === 0 ? (
                                    <div className="p-12 text-center text-slate-500 font-medium">Chưa có lịch sử rút tiền nào.</div>
                                ) : (
                                    <div className="divide-y divide-slate-100">
                                        {(payouts || []).map(p => (
                                            <div key={p.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${p.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-600' : p.status === 'REJECTED' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                                                        {p.status === 'COMPLETED' ? <CheckCircle2 className="w-5 h-5" /> : p.status === 'REJECTED' ? <XCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 text-base">{p.amount.toLocaleString()} đ</div>
                                                        <div className="text-xs font-medium text-slate-500 mt-0.5">Mã Lệnh: #{p.id.split('-')[1]} • Yêu cầu: {new Date(p.created_at).toLocaleDateString()}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right w-full md:w-auto">
                                                    <div className={`inline-flex px-2.5 py-1 rounded text-[10px] font-bold uppercase border ${p.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : p.status === 'REJECTED' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                                        {p.status === 'COMPLETED' ? 'Đã Thanh Toán' : p.status === 'REJECTED' ? 'Bị Từ Chối' : p.status === 'PROCESSING' ? 'Đang Xử Lý' : 'Chờ Kế Toán Duyệt'}
                                                    </div>
                                                    {p.processed_at && <div className="text-xs text-slate-400 font-medium mt-1">Xử lý lúc: {new Date(p.processed_at).toLocaleString('vi-VN')}</div>}
                                                    {p.admin_note && <div className="text-xs text-emerald-600 font-medium mt-1 italic">"{p.admin_note}"</div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            )}

            {/* TAB BANKS */}
            {activeTab === 'BANKS' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-2 fade-in">
                    <Card className="p-6">
                        <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-emerald-600" /> Thêm Tài Khoản Ngân Hàng Mới
                        </h3>
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1 w-full relative">
                                <label className="text-xs font-bold text-slate-500 block mb-1.5">Ngân Hàng <span className="text-rose-500">*</span></label>
                                <Input value={bankName} onChange={e => setBankName(e.target.value)} placeholder="VD: Vietcombank, Techcombank..." className="w-full" />
                            </div>
                            <div className="flex-1 w-full relative">
                                <label className="text-xs font-bold text-slate-500 block mb-1.5">Số Tài Khoản <span className="text-rose-500">*</span></label>
                                <Input value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="Nhập số tài khoản" className="w-full" />
                            </div>
                            <div className="flex-1 w-full relative">
                                <label className="text-xs font-bold text-slate-500 block mb-1.5">Tên Chủ Tài Khoản <span className="text-rose-500">*</span></label>
                                <Input value={accountName} onChange={e => setAccountName(e.target.value)} placeholder="VD: NGUYEN VAN A" className="w-full uppercase" />
                            </div>
                            <Button onClick={handleAddBank} disabled={isAdding} className="h-11 px-6 font-bold bg-emerald-600 w-full md:w-auto shrink-0">
                                {isAdding ? 'Đang Thêm...' : 'Lưu Tài Khoản'}
                            </Button>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {isAccountsLoading ? (
                            <div className="col-span-full p-8 text-center text-slate-500">Đang tải thẻ...</div>
                        ) : accounts.length === 0 ? (
                            <div className="col-span-full p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-500 font-medium my-4">Chưa có thông tin nhận tiền. Vui lòng thêm ngân hàng để rút tiền.</div>
                        ) : (
                            accounts.map(acc => (
                                <Card key={acc.id} className="p-5 relative group overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-none text-white shadow-lg">
                                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h4 className="font-black text-lg text-emerald-400">{acc.bank_name}</h4>
                                                {acc.is_default && <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">Mặc định</span>}
                                            </div>
                                            <CreditCard className="w-6 h-6 text-slate-500/50" />
                                        </div>
                                        <div>
                                            <div className="font-mono text-xl tracking-[0.2em] mb-2">{acc.account_number}</div>
                                            <div className="font-bold uppercase text-slate-400 tracking-wider text-sm">{acc.account_name}</div>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        <button onClick={() => deleteAccount(acc.id)} className="bg-rose-500 hover:bg-rose-600 text-white p-1.5 rounded-md shadow-md">
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
