"use client";

import React, { useState } from 'react';
import { useCustomerTickets, useCreateTicket } from '../hooks/useCustomerSupport';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { HelpCircle, MessagesSquare, AlertCircle, Plus, ChevronRight, MessageCircle } from 'lucide-react';
import { SupportTicketCategory, SupportTicketPriority, SupportTicketStatus } from '../api/customer-support.api';
import { toast } from 'sonner';

export const CustomerSupport = () => {
    const { data: tickets, isLoading } = useCustomerTickets();
    const { mutate: createTicket, isPending } = useCreateTicket();

    const [isCreating, setIsCreating] = useState(false);
    const [newTicket, setNewTicket] = useState<{subject: string, description: string, category: SupportTicketCategory, priority: SupportTicketPriority}>({
        subject: '',
        description: '',
        category: 'OTHER',
        priority: 'MEDIUM'
    });

    if (isLoading) return <div className="text-center py-20 font-bold text-slate-500">Đang tải lịch sử hỗ trợ...</div>;

    const handleSubmit = () => {
        if(!newTicket.subject || !newTicket.description) {
            toast.error('Vui lòng nhập đủ thông tin.');
            return;
        }
        createTicket(newTicket);
        setIsCreating(false);
        setNewTicket({ subject: '', description: '', category: 'OTHER', priority: 'MEDIUM' });
    };

    const StatusBadge = ({ status }: { status: SupportTicketStatus }) => {
        const specs = {
            'OPEN': { color: 'bg-amber-100 text-amber-700 border-amber-200', text: 'Đang xử lý' },
            'IN_PROGRESS': { color: 'bg-blue-100 text-blue-700 border-blue-200', text: 'Có phản hồi' },
            'RESOLVED': { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', text: 'Đã giải quyết' },
            'CLOSED': { color: 'bg-slate-100 text-slate-700 border-slate-200', text: 'Đóng' },
            'CANCELLED': { color: 'bg-rose-100 text-rose-700 border-rose-200', text: 'Đã hủy' }
        };
        const config = specs[status];
        return <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${config.color}`}>{config.text}</span>;
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 fade-in">
            {/* Header / Create button */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                        <MessagesSquare className="w-6 h-6 text-primary" /> Yêu cầu hỗ trợ & Báo cáo
                    </h2>
                    <p className="text-sm font-medium text-slate-500 mt-1">Phản hồi sự cố, thắc mắc đơn hàng hoặc báo vi phạm</p>
                </div>
                {!isCreating && (
                    <Button onClick={() => setIsCreating(true)} className="gap-2 shrink-0">
                        <Plus className="w-4 h-4" /> Tạo Yêu cầu
                    </Button>
                )}
            </div>

            {/* Form Create Ticket */}
            {isCreating && (
                <Card className="p-6 bg-slate-50 border border-slate-200 mb-8 rounded-3xl relative overflow-hidden">
                    <button onClick={() => setIsCreating(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-sm font-bold">Hủy</button>
                    <h3 className="font-bold text-lg mb-4 text-slate-800">Soạn yêu cầu mới</h3>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 block mb-1">Chủ đề (Phân loại)</label>
                                <select 
                                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:border-primary focus:ring-1 focus:ring-primary"
                                    value={newTicket.category}
                                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value as SupportTicketCategory})}
                                >
                                    <option value="PAYMENT">Lỗi giao dịch / Hoàn tiền</option>
                                    <option value="BOOKING">Chỉnh sửa lịch đặt / Lỗi check-in</option>
                                    <option value="REPORT">Báo cáo bãi sân sai phạm</option>
                                    <option value="ACCOUNT">Vấn đề tài khoản</option>
                                    <option value="OTHER">Thắc mắc khác</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 block mb-1">Mức độ ưu tiên</label>
                                <select 
                                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:border-primary focus:ring-1 focus:ring-primary"
                                    value={newTicket.priority}
                                    onChange={(e) => setNewTicket({...newTicket, priority: e.target.value as SupportTicketPriority})}
                                >
                                    <option value="LOW">Bình thường</option>
                                    <option value="MEDIUM">Quan trọng do liên quan phí</option>
                                    <option value="HIGH">Cấp bách (Gấp)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 block mb-1">Tiêu đề ngăn</label>
                            <Input 
                                placeholder="VD: Sân thu phụ phí gửi xe không đúng quy định" 
                                value={newTicket.subject}
                                onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                                className="bg-white"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 block mb-1">Cung cấp chi tiết sự kiện</label>
                            <textarea 
                                rows={4}
                                className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                placeholder="Mô tả kỹ càng vấn đề bạn đang gặp phải, mã booking (nếu có)..."
                                value={newTicket.description}
                                onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                            ></textarea>
                        </div>
                        
                        <Button 
                            className="w-full h-11 font-bold" 
                            disabled={isPending} 
                            onClick={handleSubmit}
                        >
                            {isPending ? 'Đang gửi...' : 'Gửi Yêu Cầu Cho DatSan247'}
                        </Button>
                    </div>
                </Card>
            )}

            {/* List Tickets */}
            <div className="space-y-4">
                {tickets?.map(ticket => (
                    <Card key={ticket.id} className="p-0 overflow-hidden group hover:border-primary/40 transition-colors border border-slate-200 cursor-pointer">
                        <div className="p-5 flex flex-col md:flex-row md:items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                                {ticket.category === 'REPORT' ? <AlertCircle className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">{ticket.ticket_number}</span>
                                    <StatusBadge status={ticket.status} />
                                    <span className="text-xs font-semibold text-slate-400 ml-auto">{new Date(ticket.created_at).toLocaleDateString('vi-VN')}</span>
                                </div>
                                <h4 className="font-bold text-slate-800 text-base line-clamp-1">{ticket.subject}</h4>
                                <p className="text-sm text-slate-500 font-medium line-clamp-1 mt-1">{ticket.description}</p>
                            </div>

                            <div className="shrink-0 flex items-center justify-end text-slate-400 group-hover:text-primary transition-colors">
                                <div className="flex items-center gap-1.5 px-3 py-1.5">
                                    <MessageCircle className="w-4 h-4" /> 
                                    <span className="text-sm font-bold">Xem</span>
                                </div>
                                <ChevronRight className="w-5 h-5 ml-1" />
                            </div>
                        </div>
                        
                        {/* Resolution/Staff Reply Preview (if any) */}
                        {ticket.resolution && (
                            <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                                    <MessageCircle className="w-3 h-3" />
                                </div>
                                <p className="text-xs font-medium text-slate-600 line-clamp-2">
                                    <strong className="text-slate-800 mr-1">Phản hồi CSKH:</strong>
                                    {ticket.resolution}
                                </p>
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            {(!tickets || tickets.length === 0) && !isCreating && (
                <div className="text-center py-20 text-slate-500">
                    <MessagesSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-1">Chưa có yêu cầu hỗ trợ nào</h3>
                    <p className="text-sm font-medium">Bất kì thắc mắc hoặc báo cáo vi phạm, hãy gửi yêu cầu cho chúng tôi.</p>
                </div>
            )}
        </div>
    );
};
