"use client";

import React from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useOwnerPromotions, useOwnerPromotionUsage, useTogglePromotionStatus, useDeletePromotion } from '../hooks/useOwnerMarketing';
import { Tag, Calendar, Users, Percent, Gift, TrendingUp, History, User, Edit2, Trash2, Power, PowerOff } from 'lucide-react';
import { PromotionDialog } from './PromotionDialog';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { OwnerPromotion } from '../api/owner-marketing.api';

export const OwnerPromotionManagement = ({ venueId }: { venueId: string }) => {
    const { data: promotions, isLoading } = useOwnerPromotions(venueId);
    const [selectedPromoId, setSelectedPromoId] = React.useState<string | null>(null);
    const { data: usages, isLoading: isUsagesLoading } = useOwnerPromotionUsage(selectedPromoId);

    // Dialog states
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [editingPromo, setEditingPromo] = React.useState<OwnerPromotion | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
    const [deletingPromoId, setDeletingPromoId] = React.useState<string | null>(null);

    const { mutate: toggleStatus } = useTogglePromotionStatus(venueId);
    const { mutate: deletePromotion } = useDeletePromotion(venueId);

    if (isLoading) {
        return <div className="p-12 text-center text-slate-500 font-medium flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
            Đang tải danh sách khuyến mãi...
        </div>;
    }

    const handleCreate = () => {
        setEditingPromo(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (e: React.MouseEvent, p: OwnerPromotion) => {
        e.stopPropagation();
        setEditingPromo(p);
        setIsDialogOpen(true);
    };

    const handleDeleteClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setDeletingPromoId(id);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (deletingPromoId) {
            deletePromotion(deletingPromoId, {
                onSuccess: () => {
                    setIsConfirmOpen(false);
                    if (selectedPromoId === deletingPromoId) setSelectedPromoId(null);
                }
            });
        }
    };

    const handleToggleStatus = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        toggleStatus(id);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end mb-4">
               <Button onClick={handleCreate} className="bg-emerald-600 font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 h-11 px-6 rounded-xl">+ Tạo Khuyến Mãi Mới</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* DANH SÁCH KHUYẾN MÃI */}
                 <div className="space-y-4">
                    <h3 className="font-black text-slate-800 flex items-center gap-2 px-1"><Tag className="w-5 h-5 text-emerald-600" /> Các Mã Khuyến Mãi Đang Chạy</h3>
                    
                    {(!promotions || promotions.length === 0) ? (
                        <Card className="p-12 text-center bg-slate-50/50 border-dashed border-2 border-slate-200 rounded-3xl">
                             <Gift className="w-16 h-16 text-slate-300 mx-auto mb-4 opacity-50" />
                             <h4 className="font-bold text-slate-700 text-lg mb-1">Chưa có Mã Khuyến Mãi</h4>
                             <p className="text-sm text-slate-500 font-medium">Bắt đầu tạo chương trình ưu đãi đầu tiên của bạn để thu hút khách hàng.</p>
                             <Button onClick={handleCreate} variant="outline" className="mt-6 border-emerald-200 text-emerald-700 font-bold px-6">Tạo Ngay</Button>
                        </Card>
                    ) : (
                        promotions.map((promo: OwnerPromotion) => (
                            <Card 
                                key={promo.id} 
                                className={`p-0 overflow-hidden cursor-pointer transition-all border-2 rounded-3xl shadow-sm ${selectedPromoId === promo.id ? 'border-emerald-500 shadow-xl transform scale-[1.01]' : 'border-slate-100 hover:border-emerald-200'}`}
                                onClick={() => setSelectedPromoId(promo.id)}
                            >
                                <div className="p-6 flex gap-4">
                                     <div className={`w-16 h-16 shrink-0 rounded-2xl flex flex-col items-center justify-center font-black text-white ${promo.status === 'ACTIVE' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-100' : 'bg-slate-300 shadow-inner'}`}>
                                        <span className="text-xl leading-none">
                                            {promo.discount_type === 'PERCENTAGE' ? `${promo.discount_value}%` : `${Math.round(promo.discount_value / 1000)}K`}
                                        </span>
                                        <span className="text-[10px] uppercase opacity-80 font-bold tracking-widest mt-1">GIẢM</span>
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <div className="flex items-center justify-between mb-1">
                                             <div className="font-black text-slate-800 truncate text-lg pr-2 leading-tight">{promo.name}</div>
                                             <div className="flex items-center gap-2 shrink-0">
                                                 <button
                                                    onClick={(e) => handleToggleStatus(e, promo.id)}
                                                    title={promo.status === 'ACTIVE' ? "Tạm dừng" : "Kích hoạt"}
                                                    className={`p-2 rounded-xl transition-all active:scale-90 ${promo.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                                 >
                                                     {promo.status === 'ACTIVE' ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
                                                 </button>
                                                 <button
                                                    onClick={(e) => handleEdit(e, promo)}
                                                    className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all active:scale-90"
                                                 >
                                                     <Edit2 className="w-4 h-4" />
                                                 </button>
                                                 <button
                                                    onClick={(e) => handleDeleteClick(e, promo.id)}
                                                    className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all active:scale-90"
                                                 >
                                                     <Trash2 className="w-4 h-4" />
                                                 </button>
                                             </div>
                                         </div>
                                         <div className="font-mono font-black text-emerald-600 text-lg tracking-wider mb-2 flex items-center gap-2">
                                            <span className="bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">{promo.code}</span>
                                            {new Date() > new Date(promo.valid_to) && <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-1 rounded-md font-black uppercase shadow-sm">Hết Hạn</span>}
                                         </div>
                                         <div className="text-xs font-medium text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> HSD: {new Date(promo.valid_to).toLocaleDateString('vi-VN')}</span>
                                            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" /> Đã dùng: <span className="font-black text-slate-700">{promo.usage_count}</span>/{promo.usage_limit || '∞'}</span>
                                         </div>
                                     </div>
                                </div>
                                <div className="bg-slate-50/80 px-5 py-4 border-t border-slate-100 grid grid-cols-2 divide-x divide-slate-200">
                                    <div className="text-xs text-slate-500 flex items-center justify-center gap-3">
                                        <TrendingUp className="w-5 h-5 text-emerald-500 bg-emerald-100 p-1 rounded-full" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-black text-slate-400 leading-none mb-1 tracking-tight">Doanh Thu</span>
                                            <span className="font-black text-slate-800 text-sm">{(promo.revenue_generated || 0).toLocaleString()}đ</span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-slate-500 flex items-center justify-center gap-3 pl-4">
                                        <Percent className="w-5 h-5 text-rose-500 bg-rose-100 p-1 rounded-full" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-black text-slate-400 leading-none mb-1 tracking-tight">Tổng Giảm</span>
                                            <span className="font-black text-rose-600 text-sm">{(promo.discount_total || 0).toLocaleString()}đ</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                 </div>

                 {/* CHI TIẾT SỬ DỤNG LƯỢT */}
                 <div className="space-y-4">
                    {selectedPromoId ? (
                        <Card className="p-0 sticky top-24 rounded-[2rem] overflow-hidden border-slate-200/60 shadow-xl bg-white/50 backdrop-blur-sm">
                           <div className="p-7 border-b border-slate-100 bg-slate-50/80">
                               <h3 className="font-black text-slate-800 flex items-center gap-2 text-xl"><History className="w-6 h-6 text-emerald-600" /> Lịch Sử Sử Dụng</h3>
                               <p className="text-sm font-medium text-slate-500 mt-1">Theo dõi chi tiết khách hàng và đơn đặt sân đã áp dụng mã.</p>
                           </div>
                           
                           {isUsagesLoading ? (
                               <div className="p-24 text-center text-slate-500 font-medium flex flex-col items-center gap-4">
                                   <div className="w-10 h-10 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
                                   Đang tải lịch sử...
                               </div>
                           ) : (!usages || usages.length === 0) ? (
                               <div className="p-24 text-center text-slate-400 font-medium bg-white/30">
                                   <div className="p-6 bg-slate-50 rounded-full inline-block mb-4 shadow-inner">
                                       <History className="w-12 h-12 opacity-20" />
                                   </div>
                                   <p className="text-slate-500 font-black">Chưa có lượt dùng</p>
                                   <p className="text-xs mt-1">Khuyến mãi này chưa được áp dụng cho đơn đặt sân nào.</p>
                               </div>
                           ) : (
                               <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto custom-scrollbar bg-white/40">
                                    {usages.map((u: any) => (
                                        <div key={u.id} className="p-6 hover:bg-white transition-all flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 overflow-hidden ring-4 ring-slate-50">
                                                    {u.avatar_url ? <img src={u.avatar_url} alt="" className="w-full h-full object-cover" /> : <User className="w-6 h-6 opacity-30" />}
                                                </div>
                                                <div>
                                                    <div className="font-black text-slate-800 text-base group-hover:text-emerald-700 transition-colors leading-tight">{u.user_name}</div>
                                                    <div className="text-[11px] text-slate-400 font-bold flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 uppercase tracking-wider">
                                                        <span>{new Date(u.created_at).toLocaleString('vi-VN')}</span>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                                                        <span className="font-mono text-indigo-500 bg-indigo-50 px-1.5 rounded ring-1 ring-indigo-100">BK-{u.booking_id.substring(0,8).toUpperCase()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-tighter leading-none">Giảm được</div>
                                                <div className="font-black text-rose-600 text-xl tracking-tighter">-{u.discount_amount.toLocaleString()} đ</div>
                                            </div>
                                        </div>
                                    ))}
                               </div>
                           )}
                        </Card>
                    ) : (
                        <div className="h-full min-h-[500px] rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-slate-400 p-12 text-center">
                            <div className="w-24 h-24 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center mb-8 rotate-3 transition-transform hover:rotate-0">
                                <Tag className="w-12 h-12 text-emerald-100 fill-emerald-500/10" />
                            </div>
                            <h4 className="font-black text-slate-700 text-xl mb-3 tracking-tight">Chi Tiết Sử Dụng</h4>
                            <p className="font-medium text-slate-400 max-w-[280px] leading-relaxed">
                                Chọn một chiến dịch khuyến mãi ở bên trái để theo dõi hiệu quả và danh sách khách hàng đã áp dụng.
                            </p>
                        </div>
                    )}
                 </div>
            </div>

            <PromotionDialog 
                isOpen={isDialogOpen} 
                onClose={() => setIsDialogOpen(false)} 
                venueId={venueId}
                promotion={editingPromo}
            />

            <ConfirmDialog 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Xóa Khuyến Mãi"
                description="Bạn có chắc chắn muốn xóa mã khuyến mãi này? Hành động này không thể hoàn tác và mã sẽ không còn giá trị áp dụng."
                confirmText="Xóa Ngay"
                type="danger"
            />
        </div>
    );
};


