"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/common/Dialog';
import { Button } from '@/components/common/Button';
import { reportApi, ReportTargetType } from '../api/report.api';
import { toast } from 'sonner';
import { AlertTriangle, Send } from 'lucide-react';
import { Textarea } from '@/components/common/Textarea';

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    targetType: ReportTargetType;
    targetId: string;
    targetName?: string;
}

const REASONS = [
    { value: 'SPAM', label: 'Spam / Nhảm nhí' },
    { value: 'INAPPROPRIATE', label: 'Nội dung không phù hợp / Xúc phạm' },
    { value: 'FAKE', label: 'Thông tin giả mạo' },
    { value: 'FRAUD', label: 'Lừa đảo / Gian lận' },
    { value: 'OTHER', label: 'Lý do khác' },
];

export const ReportModal = ({ isOpen, onClose, targetType, targetId, targetName }: ReportModalProps) => {
    const [reason, setReason] = useState(REASONS[0].value);
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await reportApi.submitReport({
                target_type: targetType,
                target_id: targetId,
                reason,
                description
            });
            toast.success('Gửi báo cáo thành công! Chúng tôi sẽ xem xét sớm nhất.');
            onClose();
            // Reset form
            setDescription('');
            setReason(REASONS[0].value);
        } catch (error) {
            toast.error('Gửi báo cáo thất bại. Vui lòng thử lại sau.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md p-0 overflow-hidden border-none shadow-2xl">
                <DialogHeader className="p-6 bg-rose-600 text-white flex-row justify-between items-center space-y-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/30 shadow-sm">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold text-white">Báo Cáo Vi Phạm</DialogTitle>
                            <DialogDescription className="text-rose-100 text-xs font-medium">Phản hồi của bạn giúp cộng đồng tốt hơn</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="p-6 space-y-6 bg-white">
                    {targetName && (
                        <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs font-medium text-amber-800 flex flex-wrap items-center gap-1.5 shadow-sm">
                            <span className="opacity-70">Đang báo cáo:</span> 
                            <span className="font-bold underline decoration-amber-300 underline-offset-2">{targetName}</span>
                        </div>
                    )}

                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <label className="block text-sm font-bold text-slate-700 mb-3 ml-1 uppercase tracking-wider text-[11px]">Lý do báo cáo</label>
                        <div className="grid grid-cols-1 gap-2.5">
                            {REASONS.map((r) => (
                                <button
                                    key={r.value}
                                    onClick={() => setReason(r.value)}
                                    className={`group w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between
                                        ${reason === r.value 
                                            ? 'border-rose-500 bg-rose-50 text-rose-700 font-bold shadow-md shadow-rose-100/50 scale-[1.02]' 
                                            : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:border-slate-300 hover:bg-white'}`}
                                >
                                    <span className="text-sm">{r.label}</span>
                                    {reason === r.value ? (
                                        <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-300">
                                            <div className="w-2 h-2 rounded-full bg-white animate-in zoom-in-0 duration-300" />
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-slate-300 transition-colors" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <label className="block text-sm font-bold text-slate-700 mb-3 ml-1 uppercase tracking-wider text-[11px]">Chi tiết thêm (Tùy chọn)</label>
                        <Textarea
                            placeholder="Mô tả cụ thể hành vi vi phạm để hệ thống xử lý chính xác hơn..."
                            className="min-h-[120px] border-slate-100 bg-slate-50/50 focus:bg-white focus:border-rose-300 rounded-2xl p-4 text-sm transition-all focus:ring-4 focus:ring-rose-100/50"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100 gap-3 flex-row sm:justify-between items-center sm:space-x-4">
                    <Button 
                        variant="ghost" 
                        onClick={onClose} 
                        disabled={isSubmitting} 
                        className="flex-1 h-12 rounded-2xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-200"
                    >
                        Đóng
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        className="flex-[1.5] bg-rose-600 hover:bg-rose-700 text-white rounded-2xl shadow-xl shadow-rose-200 font-bold h-12 gap-2.5 transition-all hover:scale-[1.02] active:scale-95"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Đang gửi...</span>
                            </div>
                        ) : (
                            <>
                                <Send size={18} />
                                <span>Gửi Báo Cáo Ngay</span>
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
