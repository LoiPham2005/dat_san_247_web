"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useStaffSupport, useStaffTicketChat } from '../hooks/useStaffSupport';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { MessageSquare, Calendar, Phone, Mail, Send, CheckCircle2, AlertCircle, Clock, Link2, User } from 'lucide-react';
import { format } from 'date-fns';
import { StaffTicket } from '../api/staff-support.api';

export const StaffSupportWorkspace = () => {
    const { tickets, isLoading, resolveTicket, isResolving } = useStaffSupport();
    const [selectedTicket, setSelectedTicket] = useState<StaffTicket | null>(null);

    return (
        <div className="flex h-[calc(100vh-140px)] gap-6 overflow-hidden">
            {/* Left Column: Ticket List (Inbox) */}
            <div className="w-1/3 min-w-[350px] max-w-[450px] bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-sky-600" /> Hộp Thư Được Phân Công
                    </h3>
                    <span className="bg-sky-100 text-sky-700 text-xs font-bold px-2 py-0.5 rounded-full">{tickets.length} Ticket</span>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2 relative">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                            <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    
                    {tickets.map(ticket => (
                        <div 
                            key={ticket.id}
                            onClick={() => setSelectedTicket(ticket)}
                            className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedTicket?.id === ticket.id ? 'bg-sky-50 border-sky-200 shadow-sm' : 'bg-white border-transparent hover:bg-slate-50'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border
                                    ${ticket.status === 'OPEN' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                                      ticket.status === 'IN_PROGRESS' ? 'bg-sky-50 text-sky-600 border-sky-200' :
                                      ticket.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                                      'bg-slate-50 text-slate-600 border-slate-200'}`}>
                                    {ticket.status.replace('_', ' ')}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium font-mono">{format(new Date(ticket.created_at), 'HH:mm dd/MM')}</span>
                            </div>
                            
                            <h4 className="font-bold text-slate-800 text-sm line-clamp-1 mb-1">{ticket.subject}</h4>
                            
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <User className="w-3.5 h-3.5" />
                                <span className="truncate">{ticket.customer_name}</span>
                            </div>
                        </div>
                    ))}

                    {tickets.length === 0 && !isLoading && (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center">
                            <CheckCircle2 className="w-12 h-12 mb-2 text-emerald-400" />
                            <p className="font-medium text-sm">Tuyệt vời, bạn không có Ticket nào cần xử lý lúc này!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Ticket Detail & Chat */}
            <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
                {selectedTicket ? (
                    <TicketChatThread 
                        ticket={selectedTicket} 
                        onResolve={() => resolveTicket(selectedTicket.id)}
                        isResolving={isResolving}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center bg-slate-50/50">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare className="w-8 h-8 text-slate-300" />
                        </div>
                        <h4 className="font-bold text-slate-700 text-lg mb-1">Khu Vực Làm Việc (Workspace)</h4>
                        <p className="text-sm font-medium">Vui lòng chọn một Ticket bên tay trái để bắt đầu đọc log và phản hồi khách hàng.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Sub Component cho màn hình Chat ---
const TicketChatThread = ({ ticket, onResolve, isResolving }: { ticket: StaffTicket, onResolve: () => void, isResolving: boolean }) => {
    const { messages, isLoading, sendMessage, isSending } = useStaffTicketChat(ticket.id);
    const [replyText, setReplyText] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Auto scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!replyText.trim() || ticket.status === 'RESOLVED') return;
        sendMessage(replyText);
        setReplyText('');
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header: Ticket Info */}
            <div className="p-5 border-b border-slate-200 bg-white shrink-0 shadow-sm relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="font-black text-xl text-slate-800">{ticket.subject}</h2>
                            <span className="font-mono text-xs text-slate-400 bg-slate-100 py-0.5 px-2 rounded-md">#{ticket.id}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                            <span className="flex items-center gap-1.5 bg-rose-50 text-rose-700 px-2 py-1 rounded-md border border-rose-100">
                                <AlertCircle className="w-3.5 h-3.5" /> Mức độ: {ticket.priority}
                            </span>
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Tạo lúc: {format(new Date(ticket.created_at), 'HH:mm - dd/MM/yyyy')}</span>
                            {ticket.related_booking_id && (
                                <span className="flex items-center gap-1.5 text-sky-600 bg-sky-50 px-2 py-1 rounded border border-sky-100 cursor-pointer hover:bg-sky-100 transition-colors">
                                    <Link2 className="w-3.5 h-3.5" /> Hóa đơn Booking: {ticket.related_booking_id}
                                </span>
                            )}
                        </div>
                    </div>
                    {ticket.status !== 'RESOLVED' && (
                        <Button 
                            variant="outline" size="sm" 
                            className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800"
                            onClick={onResolve} disabled={isResolving}
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as Resolved
                        </Button>
                    )}
                </div>

                {/* Customer Details Ribbon */}
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                            {ticket.customer_name.charAt(0)}
                        </div>
                        <div>
                            <div className="font-bold text-slate-700 text-xs">Phản hồi từ User (Customer)</div>
                            <div className="font-bold text-slate-900">{ticket.customer_name}</div>
                        </div>
                    </div>
                    <div className="flex gap-4 text-slate-600 font-medium">
                        <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-slate-400" /> {ticket.customer_phone}</span>
                        <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-400" /> {ticket.customer_email}</span>
                    </div>
                </div>
            </div>

            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50 relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-50/80">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                <div className="space-y-6 max-w-3xl mx-auto w-full">
                    {messages.map(msg => {
                        const isStaff = msg.sender_role === 'STAFF' || msg.sender_role === 'ADMIN';
                        return (
                            <div key={msg.id} className={`flex ${isStaff ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-3 max-w-[85%] ${isStaff ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs border shadow-sm
                                        ${isStaff ? 'bg-sky-600 text-white border-sky-700' : 'bg-slate-200 text-slate-600 border-slate-300'}`}>
                                        {msg.sender_role === 'STAFF' ? 'CS' : msg.sender_name.charAt(0)}
                                    </div>
                                    <div className={`flex flex-col ${isStaff ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-baseline gap-2 mb-1 px-1">
                                            <span className="text-xs font-bold text-slate-700">{isStaff ? 'Bạn (CSKH)' : msg.sender_name}</span>
                                            <span className="text-[10px] text-slate-400 font-medium">{format(new Date(msg.created_at), 'HH:mm')}</span>
                                        </div>
                                        <div className={`p-3.5 rounded-2xl text-sm shadow-sm leading-relaxed
                                            ${isStaff 
                                                ? 'bg-sky-600 text-white rounded-tr-none' 
                                                : 'bg-white border text-slate-800 border-slate-200 rounded-tl-none'}`}>
                                            {msg.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Reply Editor */}
            <div className="p-4 bg-white border-t border-slate-200 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                {ticket.status === 'RESOLVED' ? (
                    <div className="text-center py-4 bg-slate-50 rounded-lg border border-slate-100 text-sm font-medium text-slate-500 flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" /> Ticket này đã được chốt (Mark as Resolved) và Khóa bình luận.
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto w-full relative">
                        <textarea 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pr-16 text-sm text-slate-800 outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-50 min-h-[100px] resize-none transition-all placeholder:text-slate-400 font-medium leading-relaxed"
                            placeholder="Nhập nội dung phản hồi khách hàng..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            disabled={isSending}
                        />
                        <Button 
                            size="icon" 
                            className={`absolute right-3 bottom-3 h-10 w-10 transition-all text-white shadow-md
                                ${replyText.trim() ? 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20' : 'bg-slate-300 pointer-events-none'}`}
                            onClick={handleSend}
                            disabled={isSending || !replyText.trim()}
                        >
                            <Send className="w-5 h-5 ml-0.5" />
                        </Button>
                        <div className="absolute right-16 bottom-5 text-[10px] text-slate-400 font-medium italic">
                            Nhấn Enter để gửi
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
