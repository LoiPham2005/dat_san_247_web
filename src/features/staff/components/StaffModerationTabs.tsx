"use client";

import React, { useState } from 'react';
import { useStaffModeration } from '../hooks/useStaffModeration';
import { Button } from '@/components/common/Button';
import { AlertOctagon, Star, MessageCircleWarning, ShieldAlert, BadgeInfo, EyeOff, Eye, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';

export const StaffModerationTabs = () => {
    const { 
        reports, isLoadingReports, escalateReport, isEscalating,
        reviews, isLoadingReviews, hideReview, isHidingReview 
    } = useStaffModeration();
    
    const [activeTab, setActiveTab] = useState<'REPORTS' | 'REVIEWS'>('REPORTS');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReports = reports.filter(r => r.target_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredReviews = reviews.filter(r => r.venue_name.toLowerCase().includes(searchTerm.toLowerCase()) || r.comment?.toLowerCase().includes(searchTerm.toLowerCase()));

    const isLoading = isLoadingReports || isLoadingReviews;

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-slate-500 border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải Dữ liệu Cần Kiểm Duyệt...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Horizontal Tabs & Search Navigation */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex w-full md:w-[400px]">
                    <button 
                        onClick={() => setActiveTab('REPORTS')} 
                        className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold transition-all border-r border-slate-200 
                            ${activeTab === 'REPORTS' ? 'text-amber-600 bg-amber-50/50 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <AlertOctagon className="w-4 h-4" /> Báo Cáo ({reports.filter(r => r.status === 'PENDING').length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('REVIEWS')} 
                        className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold transition-all
                            ${activeTab === 'REVIEWS' ? 'text-indigo-600 bg-indigo-50/50 border-b-2 border-b-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <MessageCircleWarning className="w-4 h-4" /> Băng Hoại Từ Ngữ ({reviews.length})
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder={activeTab === 'REPORTS' ? "Tìm tên User/Sân bị báo..." : "Đọc nội dung Review vi phạm..."}
                        className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-500 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* TAB: REPORTS */}
            {activeTab === 'REPORTS' && (
                <div className="grid gap-4">
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-sm font-medium text-amber-800 flex items-start gap-3 shadow-sm">
                        <BadgeInfo className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                        <div>
                            Cột mốc Chờ Duyệt (PENDING).
                            Các nội dung mang tính nhạy cảm pháp luật, bạn nên nhấn <strong>Chuyển Admin</strong> để Ban Quản Trị Super Admin tiếp nhận xử lý khóa vĩnh viễn (BANNED).
                        </div>
                    </div>

                    {filteredReports.map(report => (
                        <div key={report.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-amber-300 transition-colors flex flex-col md:flex-row gap-6 items-start">
                            {/* Icon & Type */}
                            <div className="flex flex-col items-center gap-2 w-full md:w-32 shrink-0">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 shadow-sm
                                    ${report.target_type === 'VENUE' ? 'bg-sky-50 text-sky-600 border-sky-100' : 
                                      report.target_type === 'USER' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                      'bg-slate-50 text-slate-600 border-slate-100'}`}>
                                    <AlertOctagon className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Loại Vi Phạm: {report.target_type}</span>
                            </div>

                            {/* Content Details */}
                            <div className="flex-1 space-y-3 w-full">
                                <div>
                                    <div className="flex items-center gap-2 mb-1 border-b border-slate-100 pb-2">
                                        <h3 className="font-bold text-slate-900 text-lg">{report.target_name}</h3>
                                        <span className="font-mono text-xs text-slate-400">ID: {report.target_id}</span>
                                    </div>
                                    <div className="inline-flex mt-2 mb-1 bg-rose-50 border border-rose-100 text-rose-700 px-2.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-tight">
                                        Lý do: {report.reason.replace('_', ' ')}
                                    </div>
                                    <p className="text-slate-600 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2 font-medium">"{report.description}"</p>
                                </div>
                                
                                <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-50">
                                    <div className="font-medium">Từ: <strong>{report.reporter_name}</strong></div>
                                    <div>{format(new Date(report.created_at), 'dd/MM/yyyy HH:mm')}</div>
                                </div>
                            </div>

                            {/* Actions List */}
                            <div className="w-full md:w-48 shrink-0 flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-xl border border-slate-100 h-full">
                                {report.status === 'PENDING' ? (
                                    <>
                                        <div className="text-amber-600 text-xs font-bold uppercase tracking-wider mb-3">Chờ Staff Khảo Sát</div>
                                        <Button 
                                            className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-md text-xs mb-2 h-9"
                                            onClick={() => escalateReport(report.id)}
                                            disabled={isEscalating}
                                        >
                                            <ShieldAlert className="w-3.5 h-3.5 mr-1.5" /> Chuyển Cấp Admin
                                        </Button>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-indigo-600">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 mb-1">
                                            <ShieldAlert className="w-5 h-5" />
                                        </div>
                                        <div className="text-xs font-bold uppercase text-center leading-tight">SUPER ADMIN<br/>ĐANG THỤ LÝ</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {filteredReports.length === 0 && (
                        <div className="py-12 flex flex-col items-center justify-center text-slate-400 bg-white border border-slate-200 border-dashed rounded-xl">
                            <AlertOctagon className="w-12 h-12 text-slate-200 mb-3" />
                            <p className="font-medium text-sm">Tuyệt vời, không có Báo cáo Vi phạm nào trong khu vực này!</p>
                        </div>
                    )}
                </div>
            )}

            {/* TAB: REVIEWS */}
            {activeTab === 'REVIEWS' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="col-span-full p-4 bg-indigo-50 rounded-xl border border-indigo-200 text-sm font-medium text-indigo-800 flex items-start gap-3 shadow-sm mb-2">
                        <MessageCircleWarning className="w-5 h-5 shrink-0 text-indigo-600 mt-0.5" />
                        <div>
                            <strong>Lưu ý:</strong> Nút "Ẩn Khỏi Website" chỉ đánh dấu bản ghi (Visible = false). Người dùng bị vi phạm văng tục vẫn nhìn thấy trên App của họ, nhưng Khách xem Sân sẽ không đọc được, nhằm tránh gây hiệu ứng bầy đàn xấu ảnh hưởng Chủ Sân.
                        </div>
                    </div>

                    {filteredReviews.map(review => (
                        <div key={review.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-indigo-300 transition-colors flex flex-col justify-between group">
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Cắm Ghi Nhận</div>
                                        <h4 className="font-bold text-slate-800 text-base leading-tight">{review.venue_name}</h4>
                                        <div className="text-xs text-indigo-600 font-medium mt-1">Viết bởi: {review.customer_name}</div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                                        ))}
                                    </div>
                                </div>

                                <div className={`p-4 rounded-lg text-sm font-medium leading-relaxed italic border-l-4 mb-4
                                    ${!review.is_visible ? 'bg-slate-50/50 text-slate-400 border-slate-300 line-through' : 'bg-indigo-50/30 text-slate-700 border-indigo-200'}`}>
                                    "{review.comment}"
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                                <div className="text-xs text-slate-500 font-medium">
                                    Đăng lúc: {format(new Date(review.created_at), 'dd/MM/yyyy')}
                                </div>
                                <Button 
                                    variant={review.is_visible ? "outline" : "default"} 
                                    size="sm" 
                                    className={`h-9 text-xs transition-colors ${!review.is_visible ? 'bg-slate-900 border-slate-900 hover:bg-slate-800 text-white' : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50 border-slate-200 hover:border-rose-200'}`}
                                    onClick={() => hideReview({ id: review.id, isVisible: !review.is_visible })}
                                    disabled={isHidingReview}
                                >
                                    {review.is_visible ? (
                                        <><EyeOff className="w-4 h-4 mr-1.5" /> Ẩn Khỏi Website</>
                                    ) : (
                                        <><Eye className="w-4 h-4 mr-1.5 text-emerald-400" /> Bỏ Ẩn (Hiện lại)</>
                                    )}
                                </Button>
                            </div>
                        </div>
                    ))}
                    {filteredReviews.length === 0 && (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 bg-white border border-slate-200 border-dashed rounded-xl">
                            <MessageCircleWarning className="w-12 h-12 text-slate-200 mb-3" />
                            <p className="font-medium text-sm">Không tìm thấy Đánh giá nào trùng khớp.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
