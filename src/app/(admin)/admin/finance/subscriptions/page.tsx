"use client";

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { 
    CreditCard, 
    CheckCircle2, 
    Clock, 
    XCircle, 
    Search, 
    Filter, 
    Eye, 
    TrendingUp, 
    AlertCircle,
    User,
    Calendar,
    ArrowUpRight,
    Receipt
} from 'lucide-react';
import { toast } from 'sonner';

// Mock Data
const MOCK_SUBSCRIPTIONS = [
    {
        id: 'SUB-001',
        venueName: 'Sân Bóng Thành Đô',
        ownerName: 'Nguyễn Văn A',
        amount: 500000,
        method: 'QR_AUTO',
        status: 'SUCCESS',
        createdAt: '2026-04-05T10:30:00Z',
        expiryDate: '2026-05-05T10:30:00Z',
        receiptUrl: null
    },
    {
        id: 'SUB-002',
        venueName: 'Trung Tâm Tennis Hòa Bình',
        ownerName: 'Trần Thị B',
        amount: 500000,
        method: 'MANUAL_TRANSFER',
        status: 'PENDING',
        createdAt: '2026-04-05T09:15:00Z',
        expiryDate: '2026-05-05T09:15:00Z',
        receiptUrl: 'https://img.vietqr.io/image/MB-0964175396-compact.png' // Mock bill image
    },
    {
        id: 'SUB-003',
        venueName: 'Sân Cầu Lông ABC',
        ownerName: 'Lê Văn C',
        amount: 1000000,
        method: 'QR_AUTO',
        status: 'SUCCESS',
        createdAt: '2026-04-04T15:45:00Z',
        expiryDate: '2026-05-04T15:45:00Z',
        receiptUrl: null
    },
    {
        id: 'SUB-004',
        venueName: 'Hồ Bơi Xanh',
        ownerName: 'Phạm Minh D',
        amount: 500000,
        method: 'MANUAL_TRANSFER',
        status: 'REJECTED',
        createdAt: '2026-04-04T08:20:00Z',
        expiryDate: '2026-05-04T08:20:00Z',
        receiptUrl: 'https://img.vietqr.io/image/MB-0964175396-compact.png'
    },
];

export default function AdminSubscriptionsPage() {
    const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'SUCCESS'>('ALL');
    const [viewingReceipt, setViewingReceipt] = useState<string | null>(null);

    const filteredData = filterStatus === 'ALL' 
        ? MOCK_SUBSCRIPTIONS 
        : MOCK_SUBSCRIPTIONS.filter(item => item.status === filterStatus);

    const handleApprove = (id: string) => {
        toast.success(`Đã duyệt phí duy trì cho mã ${id}. Sân đã được gia hạn!`);
    };

    const handleReject = (id: string) => {
        toast.error(`Đã từ chối giao dịch ${id}.`);
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-indigo-600" /> Quản Lý Phí Duy Trì
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Theo dõi, đối soát và duyệt phí duy trì hệ thống từ các Chủ sân.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="font-bold gap-2">
                        <Filter className="w-4 h-4" /> Xuất Báo Cáo
                    </Button>
                </div>
            </div>

            {/* OVERVIEW STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 border-l-4 border-indigo-500 shadow-sm">
                    <div className="flex justify-between items-start text-slate-400">
                        <span className="text-xs font-black uppercase tracking-wider">Doanh Thu Tháng Này</span>
                        <TrendingUp className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div className="mt-3">
                        <span className="text-3xl font-black text-slate-900">12,500,000 đ</span>
                        <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> +15% so với tháng trước
                        </p>
                    </div>
                </Card>
                <Card className="p-6 border-l-4 border-amber-500 shadow-sm">
                    <div className="flex justify-between items-start text-slate-400">
                        <span className="text-xs font-black uppercase tracking-wider">Chờ Duyệt (Manual)</span>
                        <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="mt-3">
                        <span className="text-3xl font-black text-slate-900">8 Giao Dịch</span>
                        <p className="text-xs text-amber-600 font-bold mt-1">Cần Admin kiểm tra sớm nhất</p>
                    </div>
                </Card>
                <Card className="p-6 border-l-4 border-emerald-500 shadow-sm">
                    <div className="flex justify-between items-start text-slate-400">
                        <span className="text-xs font-black uppercase tracking-wider">Tự Động (Auto QR)</span>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="mt-3">
                        <span className="text-3xl font-black text-slate-900">45 Giao Dịch</span>
                        <p className="text-xs text-emerald-600 font-bold mt-1">Hoàn thành qua PayOS/VietQR</p>
                    </div>
                </Card>
                <Card className="p-6 border-l-4 border-rose-500 shadow-sm">
                    <div className="flex justify-between items-start text-slate-400">
                        <span className="text-xs font-black uppercase tracking-wider">Sân Quá Hạn Phí</span>
                        <AlertCircle className="w-5 h-5 text-rose-500" />
                    </div>
                    <div className="mt-3">
                        <span className="text-3xl font-black text-slate-900">12 Sân</span>
                        <p className="text-xs text-rose-600 font-bold mt-1">Đã bị ẩn khỏi tìm kiếm</p>
                    </div>
                </Card>
            </div>

            {/* MAIN TABLE SECTION */}
            <Card className="overflow-hidden border-none shadow-xl bg-white">
                <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4 bg-slate-50/50">
                    <div className="flex space-x-1 bg-white p-1 rounded-xl border border-slate-200">
                        <button 
                            onClick={() => setFilterStatus('ALL')}
                            className={`px-4 py-2 text-xs font-black rounded-lg transition-all ${filterStatus === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                        >TẤT CẢ</button>
                        <button 
                            onClick={() => setFilterStatus('PENDING')}
                            className={`px-4 py-2 text-xs font-black rounded-lg transition-all ${filterStatus === 'PENDING' ? 'bg-amber-500 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                        >CHỜ DUYỆT</button>
                        <button 
                            onClick={() => setFilterStatus('SUCCESS')}
                            className={`px-4 py-2 text-xs font-black rounded-lg transition-all ${filterStatus === 'SUCCESS' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                        >THÀNH CÔNG</button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input 
                            placeholder="Tìm tên sân, chủ sân..." 
                            className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm w-full md:w-64 outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Sân & Chủ Sở Hữu</th>
                                <th className="px-6 py-4">Gói & Số Tiền</th>
                                <th className="px-6 py-4">Phương Thức</th>
                                <th className="px-6 py-4">Ngày Đóng</th>
                                <th className="px-6 py-4">Trạng Thái</th>
                                <th className="px-6 py-4 text-right">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900">{item.venueName}</div>
                                                <div className="text-[10px] font-bold text-slate-500 uppercase">{item.ownerName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-black text-indigo-600">{item.amount.toLocaleString()} đ</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Gia hạn 30 ngày</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.method === 'QR_AUTO' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-lg border border-emerald-100 group">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                                QR AUTO (PAYOS)
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg border border-slate-200">
                                                CHUYỂN KHOẢN (MANUAL)
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-slate-600 font-bold">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                                            item.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' :
                                            item.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                                            'bg-rose-100 text-rose-700'
                                        }`}>
                                            {item.status === 'SUCCESS' ? 'Đã Thanh Toán' :
                                             item.status === 'PENDING' ? 'Chờ Duyệt' : 'Bị Từ Chối'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {item.method === 'MANUAL_TRANSFER' && item.status === 'PENDING' ? (
                                                <>
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline" 
                                                        className="h-8 px-2 text-[10px] font-black border-slate-200 hover:bg-indigo-50 hover:text-indigo-600"
                                                        onClick={() => setViewingReceipt(item.receiptUrl)}
                                                    >
                                                        <Eye className="w-3 h-3 mr-1" /> XEM BILL
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        className="h-8 px-3 text-[10px] font-black bg-emerald-600"
                                                        onClick={() => handleApprove(item.id)}
                                                    >
                                                        DUYỆT
                                                    </Button>
                                                </>
                                            ) : item.method === 'QR_AUTO' ? (
                                                <Button size="sm" variant="ghost" className="h-8 px-2 text-[10px] font-black text-slate-400" disabled>
                                                    ĐÃ TỰ ĐỘNG DUYỆT
                                                </Button>
                                            ) : (
                                                <Button size="sm" variant="ghost" className="h-8 px-2 text-[10px] font-black text-slate-400" disabled>
                                                    HOÀN THÀNH
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* RECEIPT MODAL */}
            {viewingReceipt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                <Receipt className="w-5 h-5 text-indigo-600" /> Bằng Chứng Chuyển Khoản
                            </h3>
                            <button onClick={() => setViewingReceipt(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                <XCircle className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                        <div className="p-8 bg-white flex justify-center">
                            <img 
                                src={viewingReceipt} 
                                alt="Receipt" 
                                className="max-w-full h-auto rounded-2xl shadow-lg border border-slate-100"
                            />
                        </div>
                        <div className="p-6 bg-slate-50 flex justify-end gap-3">
                            <Button variant="outline" onClick={() => handleReject('SUB-002')} className="font-bold border-rose-200 text-rose-600 hover:bg-rose-50">TỪ CHỐI</Button>
                            <Button onClick={() => handleApprove('SUB-002')} className="font-black bg-emerald-600">DUYỆT NGAY</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
