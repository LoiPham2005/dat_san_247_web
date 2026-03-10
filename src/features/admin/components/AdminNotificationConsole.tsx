"use client";

import React, { useState } from 'react';
import { useAdminNotifications } from '../hooks/useAdminNotifications';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Megaphone, Users, Mail, Smartphone, BellRing, Clock, Send, ShieldCheck, Tag, History as HistoryIcon } from 'lucide-react';
import { format } from 'date-fns';

export const AdminNotificationConsole = () => {
    const { notifications, isLoading, sendNoti, isSending } = useAdminNotifications();
    
    // Form States
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [audience, setAudience] = useState<'ALL' | 'CUSTOMERS' | 'OWNERS' | 'STAFF'>('ALL');
    const [channels, setChannels] = useState<{inapp: boolean, push: boolean, email: boolean}>({
        inapp: true,
        push: true,
        email: false
    });

    const handleBroadcast = () => {
        if (!title.trim() || !message.trim()) {
            alert('Vui lòng nhập đầy đủ tiêu đề và nội dung.');
            return;
        }
        
        const channelArr: any[] = [];
        if (channels.inapp) channelArr.push('IN_APP');
        if (channels.push) channelArr.push('PUSH');
        if (channels.email) channelArr.push('EMAIL');

        sendNoti({ title, message, target_audience: audience, channel: channelArr });
        setTitle('');
        setMessage('');
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải lịch sử Broadcast...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Broadcast Form */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white border text-sm border-sky-200 rounded-xl shadow-sm p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full pointer-events-none -z-0"></div>
                    <div className="relative z-10 space-y-5">
                        <div className="flex items-center gap-3 border-b border-sky-100 pb-4">
                            <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center shadow-inner">
                                <Megaphone className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-base">Phát Thông Báo Mới</h3>
                                <p className="text-xs text-slate-500 font-medium tracking-tight">Gửi thẳng đến điện thoại người dùng.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Nhóm Đối Tượng Nhận</label>
                                <select 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg h-10 px-3 text-sm font-semibold text-slate-700 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                    value={audience}
                                    onChange={(e: any) => setAudience(e.target.value)}
                                    disabled={isSending}
                                >
                                    <option value="ALL">Toàn Bộ Người Dùng (All)</option>
                                    <option value="CUSTOMERS">Chỉ Khách Hàng (Customers)</option>
                                    <option value="OWNERS">Chỉ Các Chủ Sân (Owners)</option>
                                    <option value="STAFF">Chỉ Nhân Viên Bàn (Receptionists)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Kênh Truyền Tải (Channels)</label>
                                <div className="flex flex-wrap gap-2">
                                    <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${channels.inapp ? 'bg-sky-50 border-sky-200 text-sky-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                                        <input type="checkbox" className="sr-only" checked={channels.inapp} onChange={() => setChannels({...channels, inapp: !channels.inapp})} disabled={isSending} />
                                        <BellRing className="w-4 h-4" /> <span className="text-xs font-bold">In-App</span>
                                    </label>
                                    <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${channels.push ? 'bg-sky-50 border-sky-200 text-sky-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                                        <input type="checkbox" className="sr-only" checked={channels.push} onChange={() => setChannels({...channels, push: !channels.push})} disabled={isSending} />
                                        <Smartphone className="w-4 h-4" /> <span className="text-xs font-bold">Push Nhãn</span>
                                    </label>
                                    <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${channels.email ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                                        <input type="checkbox" className="sr-only" checked={channels.email} onChange={() => setChannels({...channels, email: !channels.email})} disabled={isSending} />
                                        <Mail className="w-4 h-4" /> <span className="text-xs font-bold">Gửi Email</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Tiêu đề (Title)</label>
                                <Input 
                                    placeholder="Vd: Bảo trì máy chủ mùng 3 Tết..." 
                                    className="h-10 text-sm font-semibold placeholder:font-normal"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    disabled={isSending}
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Nội dung (Body)</label>
                                <textarea 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-700 outline-none focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 min-h-[120px] resize-none"
                                    placeholder="Nhập thông điệp cần gửi..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    disabled={isSending}
                                ></textarea>
                            </div>
                        </div>

                        <Button 
                            className="w-full h-11 bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20"
                            onClick={handleBroadcast}
                            disabled={isSending || (!channels.inapp && !channels.push && !channels.email)}
                        >
                            <Send className="w-4 h-4 mr-2" /> 
                            {isSending ? 'Đang gửi qua Queue...' : 'Phát đi Toàn Mạng Lưới'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right: Broadcast History */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        <HistoryIcon className="w-5 h-5 text-slate-400" />
                        Lịch Sử Truyền Thông Phát (Broadcast Queue Logs)
                    </h3>
                    <div className="text-sm font-medium text-slate-500">
                        Tổng cộng: <strong>{notifications.length}</strong> chiến dịch đã chạy
                    </div>
                </div>

                <div className="grid gap-4">
                    {notifications.map(noti => (
                        <div key={noti.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-sky-200 transition-colors shadow-sm flex flex-col md:flex-row gap-5">
                            <div className="flex-1 space-y-3">
                                <h4 className="font-bold text-slate-800 text-base">{noti.title}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed border-l-2 border-slate-100 pl-3">"{noti.message}"</p>
                                
                                <div className="flex flex-wrap items-center gap-3 pt-2">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                                        <Users className="w-3.5 h-3.5" /> Gửi tới: <strong className="text-slate-700">{noti.target_audience}</strong>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase">
                                        {noti.channel.includes('IN_APP') && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200 shadow-sm">IN-APP</span>}
                                        {noti.channel.includes('PUSH') && <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded border border-purple-200 shadow-sm">PUSH NOTI</span>}
                                        {noti.channel.includes('EMAIL') && <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded border border-rose-200 shadow-sm">EMAIL</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-56 shrink-0 bg-slate-50 rounded-lg border border-slate-100 p-4 space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500 font-medium">Trạng thái:</span>
                                    {noti.status === 'SENT' ? (
                                        <span className="flex items-center gap-1 font-bold text-emerald-600 uppercase"><ShieldCheck className="w-3.5 h-3.5"/> Thành công</span>
                                    ) : (
                                        <span className="font-bold text-amber-600 uppercase">{noti.status}</span>
                                    )}
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500 font-medium">Người gửi:</span>
                                    <span className="font-bold text-slate-700">{noti.sent_by}</span>
                                </div>
                                <div className="border-t border-slate-200 pt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {format(new Date(noti.sent_at), 'HH:mm (dd/MM/yyyy)')}
                                </div>
                            </div>
                        </div>
                    ))}
                    {notifications.length === 0 && (
                        <div className="py-12 flex flex-col items-center justify-center text-slate-500 bg-white border border-slate-200 border-dashed rounded-xl">
                            <Megaphone className="w-10 h-10 text-slate-300 mb-3" />
                            <p className="font-medium text-sm">Chưa có thông báo Push nào được truyền đi.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
