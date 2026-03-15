"use client";

import React, { useState } from 'react';
import { useCustomerVouchers, useSaveVoucher } from '../hooks/useCustomerPromotion';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { TicketPercent, Search, Copy, Info, AlertTriangle, Filter, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const CustomerVouchers = () => {
    const { data: vouchers, isLoading } = useCustomerVouchers();
    const { mutate: saveVoucher, isPending } = useSaveVoucher();
    
    const [voucherCode, setVoucherCode] = useState('');
    const [activeTab, setActiveTab] = useState<'UNUSED' | 'USED' | 'EXPIRED'>('UNUSED');

    if (isLoading) return <div className="text-center py-20 font-bold text-slate-500">Đang tải kho Voucher...</div>;

    const filteredVouchers = vouchers?.filter(v => v.status === activeTab) || [];

    const handleSave = () => {
        if (!voucherCode.trim()) {
            toast.error("Vui lòng nhập mã Voucher");
            return;
        }
        saveVoucher(voucherCode);
        setVoucherCode('');
    };

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success(`Đã copy mã: ${code}`);
    };

    const formatCurrency = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-2 fade-in">
            {/* Nhập Voucher Mới */}
            <Card className="p-6 bg-white border border-slate-200 shadow-sm rounded-3xl flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                        <TicketPercent className="w-5 h-5 text-rose-500" /> Nhập mã ưu đãi DatSan247
                    </h3>
                    <p className="text-sm font-medium text-slate-500">Tìm mã chia sẻ từ bạn bè hoặc trên Fanpage để kích hoạt ngay</p>
                </div>
                <div className="flex w-full md:w-auto gap-2">
                    <div className="relative flex-1 md:w-64">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input 
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                            placeholder="Nhập mã KM..." 
                            className="h-12 pl-10 font-bold uppercase placeholder:normal-case placeholder:font-medium bg-slate-50 border-slate-200"
                        />
                    </div>
                    <Button 
                        onClick={handleSave} 
                        disabled={isPending}
                        className="h-12 px-6 font-bold bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/20"
                    >
                        Lưu Mã
                    </Button>
                </div>
            </Card>

            {/* TAB CONTAINER */}
            <div className="flex border-b border-slate-200 mb-6">
                {[
                    { id: 'UNUSED', label: 'Khả Dụng', count: vouchers?.filter(v => v.status === 'UNUSED').length || 0 },
                    { id: 'USED', label: 'Đã Sử Dụng', count: vouchers?.filter(v => v.status === 'USED').length || 0 },
                    { id: 'EXPIRED', label: 'Hết Hạn', count: vouchers?.filter(v => v.status === 'EXPIRED').length || 0 }
                ].map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-4 font-bold text-sm text-center relative transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        {tab.label} ({tab.count})
                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
                    </button>
                ))}
            </div>

            {/* VOUCHER GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVouchers.map(v => (
                    <div key={v.id} className={`flex h-[140px] rounded-2xl border shadow-sm relative overflow-hidden bg-white ${activeTab !== 'UNUSED' ? 'opacity-60 grayscale-[0.5]' : 'hover:border-rose-200 hover:shadow-md'}`}>
                        {/* Cut-out effect circles */}
                        <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-50 z-10 border-r border-slate-200"></div>
                        <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-50 z-10 border-l border-slate-200"></div>
                        
                        {/* Left Side (Discount Type & Amount) */}
                        <div className="w-1/3 bg-gradient-to-br from-rose-500 to-rose-600 flex flex-col items-center justify-center text-white border-r border-dashed border-rose-300 relative group">
                            <TicketPercent className="w-6 h-6 mb-1 opacity-80" />
                            <div className="text-center px-2">
                                {v.discount_type === 'FIXED_AMOUNT' ? (
                                    <>
                                        <span className="text-[10px] uppercase tracking-widest block font-bold opacity-80">Giảm Tiền Tức Thì</span>
                                        <span className="text-xl md:text-2xl font-black">{v.discount_value / 1000}K</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-[10px] uppercase tracking-widest block font-bold opacity-80">Siêu Sale Lên Tới</span>
                                        <span className="text-xl md:text-2xl font-black">{v.discount_value}%</span>
                                    </>
                                )}
                            </div>
                            
                            {/* Copy overlay */}
                            {activeTab === 'UNUSED' && (
                                <button 
                                    onClick={() => copyToClipboard(v.code)}
                                    className="absolute inset-0 bg-rose-700/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                                >
                                    <Copy className="w-6 h-6 mb-2" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Lấy Mã Này</span>
                                </button>
                            )}
                        </div>

                        {/* Right Side (Details) */}
                        <div className="flex-1 p-4 flex flex-col justify-between py-5 pl-5">
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm md:text-base leading-tight">
                                    {v.name}
                                </h4>
                                <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">{v.description}</p>
                            </div>
                            
                            <div className="border-t border-slate-100 pt-3 flex justify-between items-end">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Đơn tối thiểu {formatCurrency(v.min_booking_amount)}</span>
                                    <span className="text-[10px] font-bold text-rose-500 flex items-center gap-1">
                                        <Info className="w-3 h-3" /> HSD: {new Date(v.expires_at).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* STATUS OVERLAYS */}
                        {activeTab === 'USED' && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                                <div className="bg-slate-800 text-white font-black text-xs uppercase px-4 py-2 rounded-full rotate-[-15deg] shadow-lg flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" /> Đã Sử Dụng
                                </div>
                            </div>
                        )}
                        {activeTab === 'EXPIRED' && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                                <div className="bg-rose-600 text-white font-black text-xs uppercase px-4 py-2 rounded-full rotate-[-15deg] shadow-lg flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> Đã Hết Hạn
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            {filteredVouchers.length === 0 && (
                <div className="text-center py-16 text-slate-500">
                    <TicketPercent className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-1">Kho Voucher Đang Trống</h3>
                    <p className="text-sm font-medium">Bạn chưa có mã ưu đãi nào trong danh mục này.</p>
                </div>
            )}
        </div>
    );
};
