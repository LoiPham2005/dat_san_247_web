"use client";

import React from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useOwnerPromotions, useOwnerPromotionUsage } from '../hooks/useOwnerMarketing';
import { Tag, Calendar, Users, Percent, Gift, TrendingUp, History, User } from 'lucide-react';

export const OwnerPromotionManagement = ({ venueId }: { venueId: string }) => {
    const { data: promotions, isLoading } = useOwnerPromotions(venueId);
    const [selectedPromo, setSelectedPromo] = React.useState<string | null>(null);
    const { data: usages, isLoading: isUsagesLoading } = useOwnerPromotionUsage(selectedPromo);

    if (isLoading) {
        return <div className="p-12 text-center text-slate-500 font-medium">Đang tải danh sách khuyến mãi...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end mb-4">
               <Button className="bg-emerald-600 font-bold" disabled>+ Tạo Khuyến Mãi (Sắp Ra Mắt)</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* DANH SÁCH KHUYẾN MÃI */}
                 <div className="space-y-4">
                    <h3 className="font-black text-slate-800 flex items-center gap-2"><Tag className="w-5 h-5 text-emerald-600" /> Các Mã Khuyến Mãi Đang Chạy</h3>
                    
                    {(!promotions || promotions.length === 0) ? (
                        <Card className="p-8 text-center bg-slate-50 border-dashed border-2 border-slate-200">
                             <Gift className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                             <h4 className="font-bold text-slate-700 mb-1">Chưa có Mã Khuyến Mãi</h4>
                             <p className="text-sm text-slate-500">Cơ sở này hiện chưa có mã khuyến mãi nào được áp dụng.</p>
                        </Card>
                    ) : (
                        promotions.map((promo) => (
                            <Card 
                                key={promo.id} 
                                className={`p-0 overflow-hidden cursor-pointer transition-all border-2 ${selectedPromo === promo.id ? 'border-emerald-500 shadow-md transform scale-[1.01]' : 'border-transparent hover:border-emerald-200'}`}
                                onClick={() => setSelectedPromo(promo.id)}
                            >
                                <div className="p-5 flex gap-4">
                                     <div className={`w-16 h-16 shrink-0 rounded-xl flex flex-col items-center justify-center font-black text-white ${promo.status === 'ACTIVE' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' : 'bg-slate-300'}`}>
                                        <span className="text-xl leading-none">
                                            {promo.discount_type === 'PERCENTAGE' ? `${promo.discount_value}%` : `${promo.discount_value / 1000}K`}
                                        </span>
                                        <span className="text-[10px] uppercase opacity-80 font-bold tracking-widest mt-1">GIẢM</span>
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <div className="flex items-center justify-between mb-1">
                                             <div className="font-bold text-slate-800 truncate">{promo.name}</div>
                                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${promo.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                                 {promo.status}
                                             </span>
                                         </div>
                                         <div className="font-mono font-black text-emerald-600 text-lg tracking-wider mb-2">{promo.code}</div>
                                         <div className="text-xs font-medium text-slate-500 flex items-center gap-3">
                                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> HSD: {new Date(promo.valid_to).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Lượt: {promo.usage_count}/{promo.usage_limit || '∞'}</span>
                                         </div>
                                     </div>
                                </div>
                                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between items-center">
                                    <div className="text-xs text-slate-500"><TrendingUp className="w-3.5 h-3.5 inline mr-1 text-blue-500" /> Doanh Thu: <span className="font-bold text-slate-700">{promo.revenue_generated.toLocaleString()}đ</span></div>
                                    <div className="text-xs text-slate-500"><Percent className="w-3.5 h-3.5 inline mr-1 text-rose-500" /> Đã Giảm: <span className="font-bold text-rose-600">{promo.discount_total.toLocaleString()}đ</span></div>
                                </div>
                            </Card>
                        ))
                    )}
                 </div>

                 {/* CHI TIẾT SỬ DỤNG LƯỢT */}
                 <div className="space-y-4">
                    {selectedPromo ? (
                        <Card className="p-0 sticky top-24">
                           <div className="p-5 border-b border-slate-100 bg-slate-50">
                               <h3 className="font-black text-slate-800 flex items-center gap-2"><History className="w-5 h-5 text-emerald-600" /> Lịch Sử Sử Dụng</h3>
                               <p className="text-xs font-medium text-slate-500 mt-1">Chi tiết khách hàng đã áp dụng mã này.</p>
                           </div>
                           
                           {isUsagesLoading ? (
                               <div className="p-12 text-center text-slate-500 font-medium">Đang tải lịch sử...</div>
                           ) : (!usages || usages.length === 0) ? (
                               <div className="p-12 text-center text-slate-500 font-medium">Mã này chưa được sử dụng lần nào.</div>
                           ) : (
                               <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                                    {usages.map((u) => (
                                        <div key={u.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"><User className="w-4 h-4" /></div>
                                                <div>
                                                    <div className="font-bold text-sm text-slate-800">{u.user_name}</div>
                                                    <div className="text-xs text-slate-500">{new Date(u.created_at).toLocaleString('vi-VN')} • Mã BK: #{u.booking_id.substring(0,8)}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-slate-500 mb-0.5">Mức giảm:</div>
                                                <div className="font-bold text-rose-600">-{u.discount_amount.toLocaleString()} đ</div>
                                            </div>
                                        </div>
                                    ))}
                               </div>
                           )}
                        </Card>
                    ) : (
                        <div className="h-full min-h-[400px] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-8">
                            <Tag className="w-16 h-16 opacity-30 mb-4" />
                            <p className="font-medium text-center">Chọn một Mã Khuyến Mãi bên trái<br/>để xem chi tiết lịch sử áp dụng.</p>
                        </div>
                    )}
                 </div>
            </div>
        </div>
    );
};


