"use client";

import React, { useState } from 'react';
import { useAdminSupport } from '../hooks/useAdminSupport';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Search, MessageSquareDashed, Flag, Star, AlertTriangle, ShieldCheck, CornerDownRight, UserCog, User, Clock, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';
import { ReportStatus, ReportAction, SupportTicketStatus } from '../api/admin-support.api';

export const AdminSupportList = () => {
    const { 
        tickets, reports, reviews, 
        isLoadingTickets, isLoadingReports, isLoadingReviews,
        updateTicket, updateReport, toggleReview,
        isUpdatingTicket, isUpdatingReport, isTogglingReview
    } = useAdminSupport();

    const [activeTab, setActiveTab] = useState<'TICKETS' | 'REPORTS' | 'REVIEWS'>('TICKETS');
    const [searchTerm, setSearchTerm] = useState('');

    const isLoading = isLoadingTickets || isLoadingReports || isLoadingReviews;

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải Dữ liệu Cổng Hỗ Trợ...</p>
                </div>
            </div>
        );
    }

    const filteredTickets = tickets.filter(t => t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredReports = reports.filter(r => r.description.toLowerCase().includes(searchTerm.toLowerCase()) || r.id.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredReviews = reviews.filter(r => r.comment.toLowerCase().includes(searchTerm.toLowerCase()) || r.venue_name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-6">
            {/* Tabs & Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex border-b border-slate-200">
                    <button 
                        className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold transition-all ${activeTab === 'TICKETS' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                        onClick={() => setActiveTab('TICKETS')}
                    >
                        <MessageSquareDashed className="w-4 h-4" /> Yêu Cầu Hỗ Trợ (Tickets)
                        {tickets.filter(t => t.status === 'OPEN').length > 0 && (
                            <span className="ml-1 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{tickets.filter(t => t.status === 'OPEN').length}</span>
                        )}
                    </button>
                    <button 
                        className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold transition-all ${activeTab === 'REPORTS' ? 'text-rose-600 border-b-2 border-rose-600 bg-rose-50/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                        onClick={() => setActiveTab('REPORTS')}
                    >
                        <Flag className="w-4 h-4" /> Báo Cáo Vi Phạm
                        {reports.filter(r => r.status === 'PENDING').length > 0 && (
                            <span className="ml-1 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{reports.filter(r => r.status === 'PENDING').length}</span>
                        )}
                    </button>
                    <button 
                        className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold transition-all ${activeTab === 'REVIEWS' ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                        onClick={() => setActiveTab('REVIEWS')}
                    >
                        <Star className="w-4 h-4" /> Kiểm Duyệt Đánh Giá
                    </button>
                </div>

                <div className="p-4 bg-slate-50/50 flex">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Nhập từ khóa tìm kiếm (Mã, Tên, Nội dung)..."
                            className="pl-9 h-10 border-slate-200 bg-white shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* TAB: TICKETS */}
            {activeTab === 'TICKETS' && (
                <div className="grid gap-4">
                    {filteredTickets.map(ticket => (
                        <div key={ticket.id} className="bg-white border text-sm border-slate-200 shadow-sm rounded-xl p-5 hover:border-primary/40 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{ticket.id}</span>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded 
                                            ${ticket.priority === 'URGENT' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {ticket.priority} Ưu Tiên
                                        </span>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded 
                                            ${ticket.status === 'OPEN' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-500'}`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-800">{ticket.subject}</h3>
                                    <div className="flex flex-wrap items-center gap-4 text-slate-500 text-xs">
                                        <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {ticket.customer_name} ({ticket.customer_email})</div>
                                        <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Tạo lúc: {format(new Date(ticket.created_at), 'HH:mm dd/MM/yyyy')}</div>
                                    </div>
                                </div>
                                
                                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 w-full md:w-64 shrink-0 space-y-3">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phân Công Cho (Assignee)</div>
                                    <div className="flex items-center gap-2">
                                        <UserCog className="w-4 h-4 text-primary" />
                                        <select 
                                            className="flex-1 bg-white border border-slate-200 rounded p-1 text-sm font-semibold text-slate-700 outline-none focus:border-primary"
                                            value={ticket.assigned_to_name || ''}
                                            disabled={isUpdatingTicket}
                                            onChange={(e) => updateTicket({ id: ticket.id, assigned_to_name: e.target.value })}
                                        >
                                            <option value="">-- Chưa Tự Động Phân --</option>
                                            <option value="Trương Hỗ Trợ">Trương Hỗ Trợ (Staff)</option>
                                            <option value="Nguyễn CSKH">Nguyễn CSKH (Staff)</option>
                                            <option value="Tôi Xử Lý">Nhận cho Tôi</option>
                                        </select>
                                    </div>

                                    {ticket.status !== 'RESOLVED' && (
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className="w-full h-8 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 border-emerald-200"
                                            disabled={isUpdatingTicket}
                                            onClick={() => updateTicket({ id: ticket.id, status: 'RESOLVED' })}
                                        >
                                            Đánh Dấu: Đã Giải Quyết
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredTickets.length === 0 && <div className="py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">Không có Ticket nào.</div>}
                </div>
            )}

            {/* TAB: REPORTS */}
            {activeTab === 'REPORTS' && (
                <div className="grid gap-4">
                    {filteredReports.map(report => (
                        <div key={report.id} className="bg-white border text-sm border-rose-200 shadow-sm rounded-xl p-5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-[100%] pointer-events-none -z-0"></div>
                            
                            <div className="relative z-10 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-rose-500" />
                                        <h3 className="font-bold text-lg text-slate-900">
                                            Báo cáo {report.target_type === 'VENUE' ? 'Cơ Sở (Sân Bãi)' : report.target_type === 'REVIEW' ? 'Đánh Giá' : 'Vi Phạm'}
                                        </h3>
                                        <span className="font-mono text-xs text-slate-500 ml-2">({report.id})</span>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded
                                        ${report.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                        {report.status}
                                    </span>
                                </div>

                                <div className="bg-rose-50/50 border border-rose-100 rounded-lg p-3 text-slate-700">
                                    <div className="font-bold text-rose-900 text-xs mb-1 uppercase tracking-wider">Mô tả vi phạm ({report.reason})</div>
                                    <p className="italic">"{report.description}"</p>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium pb-2 border-b border-slate-100">
                                    Được báo cáo bởi: <strong className="text-slate-700">{report.reporter_name}</strong> lúc {format(new Date(report.created_at), 'HH:mm dd/MM/yyyy')}
                                </div>

                                {/* Report Actions */}
                                {report.status === 'PENDING' || report.status === 'REVIEWING' ? (
                                    <div className="flex items-center justify-end gap-2 pt-2">
                                        <Button size="sm" variant="ghost" className="h-8 text-slate-500" disabled={isUpdatingReport} onClick={() => updateReport({ id: report.id, status: 'DISMISSED', action: 'DISMISS' })}>
                                            <XCircle className="w-4 h-4 mr-1.5" /> Bỏ Qua (Báo Cáo Lá Láo)
                                        </Button>
                                        <Button size="sm" variant="outline" className="h-8 border-rose-200 text-rose-600 hover:bg-rose-50" disabled={isUpdatingReport} onClick={() => updateReport({ id: report.id, status: 'RESOLVED', action: 'BAN' })}>
                                            Khóa Đối Tượng Này Ngay
                                        </Button>
                                        <Button size="sm" className="h-8 bg-amber-500 hover:bg-amber-600 text-white" disabled={isUpdatingReport} onClick={() => updateReport({ id: report.id, status: 'RESOLVED', action: 'WARN' })}>
                                            <ShieldCheck className="w-4 h-4 mr-1.5" /> Cảnh Cáo (Warning)
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-end pt-2 text-sm font-bold text-emerald-600">
                                        Đã Xử Lý (Hành động: {report.action_taken})
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {filteredReports.length === 0 && <div className="py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">Không có Báo cáo vi phạm nào.</div>}
                </div>
            )}

            {/* TAB: REVIEWS */}
            {activeTab === 'REVIEWS' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                    <div className="p-4 bg-slate-50/50 text-xs text-slate-500 font-medium">Bảng này chỉ liệt kê các đánh giá bị report hoặc nghi ngờ điểm số thấp bất thường cẩn kiểm duyệt ẩn giấu.</div>
                    {filteredReviews.map(review => (
                        <div key={review.id} className="p-5 flex flex-col md:flex-row justify-between gap-6 hover:bg-slate-50/50 transition-colors group">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5" title={`${review.rating} sao`}>
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                                        ))}
                                    </div>
                                    <span className="font-bold text-slate-800">• {review.venue_name}</span>
                                </div>
                                <p className="text-slate-700 italic border-l-4 border-slate-200 pl-3 py-1">"{review.comment}"</p>
                                <div className="text-xs text-slate-500 font-medium pt-1">
                                    Viết bởi: <strong>{review.customer_name}</strong> • {format(new Date(review.created_at), 'HH:mm dd/MM/yyyy')}
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-3 shrink-0">
                                {review.is_visible ? (
                                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase px-2 py-1 rounded w-fit flex items-center gap-1">
                                        <Eye className="w-3 h-3" /> Public (Đang Hiện)
                                    </span>
                                ) : (
                                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold uppercase px-2 py-1 rounded w-fit flex items-center gap-1">
                                        <EyeOff className="w-3 h-3" /> Bị Ẩn (Hidden)
                                    </span>
                                )}
                                
                                <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className={`h-8 text-xs font-semibold ${review.is_visible ? 'border-amber-200 text-amber-600 hover:bg-amber-50' : 'border-sky-200 text-sky-600 hover:bg-sky-50'}`}
                                    disabled={isTogglingReview}
                                    onClick={() => toggleReview({ id: review.id, is_visible: !review.is_visible })}
                                >
                                    {review.is_visible ? 'Force HIDE (Ẩn Đánh giá này)' : 'Khôi phục Hiển thị'}
                                </Button>
                            </div>
                        </div>
                    ))}
                    {filteredReviews.length === 0 && <div className="py-12 text-center text-slate-500 bg-white border-t border-slate-200 border-dashed">Không có đánh giá chờ duyệt.</div>}
                </div>
            )}
        </div>
    );
};
