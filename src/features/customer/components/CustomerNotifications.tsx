"use client";

import React, { useState } from 'react';
import { useCustomerNotifications, useNotificationSettings, useMarkAsRead, useMarkAllAsRead, useUpdateSettings } from '../hooks/useCustomerNotification';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Bell, CreditCard, CalendarRange, TicketPercent, Info, Check, CheckCheck, Settings2 } from 'lucide-react';
import { NotificationType, NotificationSettings } from '../api/customer-notification.api';

export const CustomerNotifications = () => {
    const { data: notifications, isLoading: loadingNotifs } = useCustomerNotifications();
    const { data: settings, isLoading: loadingSettings } = useNotificationSettings();
    const { mutate: markRead } = useMarkAsRead();
    const { mutate: markAllRead, isPending: markingAll } = useMarkAllAsRead();
    const { mutate: updateSettings, isPending: updatingSettings } = useUpdateSettings();

    const [activeTab, setActiveTab] = useState<'LIST' | 'SETTINGS'>('LIST');

    if (loadingNotifs || loadingSettings) return <div className="text-center py-20 font-bold text-slate-500">Đang tải thông báo...</div>;

    const unreadCount = notifications?.filter(n => !n.is_read).length || 0;

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case 'PAYMENT': return <CreditCard className="w-5 h-5 text-emerald-600" />;
            case 'BOOKING': return <CalendarRange className="w-5 h-5 text-indigo-600" />;
            case 'PROMOTION': return <TicketPercent className="w-5 h-5 text-rose-600" />;
            case 'REVIEW': return <Info className="w-5 h-5 text-amber-600" />;
            default: return <Bell className="w-5 h-5 text-slate-600" />;
        }
    };

    const getBgColor = (type: NotificationType) => {
        switch (type) {
            case 'PAYMENT': return 'bg-emerald-100';
            case 'BOOKING': return 'bg-indigo-100';
            case 'PROMOTION': return 'bg-rose-100';
            case 'REVIEW': return 'bg-amber-100';
            default: return 'bg-slate-100';
        }
    };

    const handleToggleSetting = (key: keyof NotificationSettings) => {
        if (!settings) return;
        updateSettings({ ...settings, [key]: !settings[key] });
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-2 fade-in">
            {/* Header Tabs */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <div className="flex gap-6 relative">
                    <button 
                        onClick={() => setActiveTab('LIST')}
                        className={`font-bold pb-2 transition-colors relative ${activeTab === 'LIST' ? 'text-primary' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        Tất Cả Thông Báo
                        {unreadCount > 0 && <span className="ml-2 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
                        {activeTab === 'LIST' && <div className="absolute bottom-[-16px] left-0 w-full h-[3px] bg-primary rounded-t-full"></div>}
                    </button>
                    <button 
                        onClick={() => setActiveTab('SETTINGS')}
                        className={`font-bold pb-2 transition-colors relative flex items-center gap-1.5 ${activeTab === 'SETTINGS' ? 'text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        <Settings2 className="w-4 h-4" /> Cài Đặt Chung
                        {activeTab === 'SETTINGS' && <div className="absolute bottom-[-16px] left-0 w-full h-[3px] bg-slate-800 rounded-t-full"></div>}
                    </button>
                </div>
                
                {activeTab === 'LIST' && unreadCount > 0 && (
                    <button 
                        onClick={() => markAllRead()} 
                        disabled={markingAll}
                        className="text-xs font-bold text-primary hover:text-indigo-800 flex items-center gap-1"
                    >
                        <CheckCheck className="w-4 h-4" /> Đánh dấu đọc hết
                    </button>
                )}
            </div>

            {/* Content Area */}
            {activeTab === 'LIST' ? (
                <div className="space-y-3">
                    {notifications?.map(notif => (
                        <div 
                            key={notif.id} 
                            onClick={() => !notif.is_read && markRead(notif.id)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 ${notif.is_read ? 'bg-white border-slate-200 opacity-70 hover:opacity-100' : 'bg-indigo-50/50 border-primary/20 shadow-sm'}`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getBgColor(notif.type)}`}>
                                {getIcon(notif.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`font-bold text-base line-clamp-1 ${!notif.is_read ? 'text-slate-900' : 'text-slate-700'}`}>
                                        {notif.title}
                                    </h4>
                                    <span className="text-xs font-semibold text-slate-400 whitespace-nowrap ml-4">
                                        {new Date(notif.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <p className={`text-sm line-clamp-2 leading-relaxed ${!notif.is_read ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                                    {notif.message}
                                </p>
                            </div>
                            {!notif.is_read && (
                                <div className="shrink-0 flex items-center">
                                    <div className="w-2.5 h-2.5 bg-rose-500 rounded-full"></div>
                                </div>
                            )}
                        </div>
                    ))}

                    {(!notifications || notifications.length === 0) && (
                        <div className="text-center py-20 text-slate-500">
                            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-1">Không có thông báo</h3>
                            <p className="text-sm font-medium">Bạn đã xem hết tất cả thông báo.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                    <h3 className="font-bold text-slate-800 text-lg mb-6">Tùy Chọn Nhận Thông Báo (In-App)</h3>
                    
                    <div className="divide-y divide-slate-100">
                        <div className="py-4 flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-slate-700 text-sm">Giao dịch thanh toán & Nạp tiền</h4>
                                <p className="text-xs font-medium text-slate-500 mt-0.5">Vé, thay đổi số dư, hoàn cọc...</p>
                            </div>
                            <button 
                                onClick={() => handleToggleSetting('notif_payment')}
                                disabled={updatingSettings}
                                className={`w-12 h-6 rounded-full relative transition-colors ${settings?.notif_payment ? 'bg-primary' : 'bg-slate-300'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${settings?.notif_payment ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>

                        <div className="py-4 flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-slate-700 text-sm">Cập nhật Lịch Đặt Sân</h4>
                                <p className="text-xs font-medium text-slate-500 mt-0.5">Nhắc nhở ra sân, check-in, hủy sân...</p>
                            </div>
                            <button 
                                onClick={() => handleToggleSetting('notif_booking')}
                                disabled={updatingSettings}
                                className={`w-12 h-6 rounded-full relative transition-colors ${settings?.notif_booking ? 'bg-primary' : 'bg-slate-300'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${settings?.notif_booking ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>

                        <div className="py-4 flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-slate-700 text-sm">Khuyến Mãi & Ưu Đãi</h4>
                                <p className="text-xs font-medium text-slate-500 mt-0.5">Mã giảm giá mới, sale cuối phiên...</p>
                            </div>
                            <button 
                                onClick={() => handleToggleSetting('notif_promotion')}
                                disabled={updatingSettings}
                                className={`w-12 h-6 rounded-full relative transition-colors ${settings?.notif_promotion ? 'bg-primary' : 'bg-slate-300'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${settings?.notif_promotion ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>

                        <div className="py-4 flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-slate-700 text-sm">Cập Nhật Hệ Thống</h4>
                                <p className="text-xs font-medium text-slate-500 mt-0.5">Bảo trì hệ thống, điều khoản DatSan247...</p>
                            </div>
                            <button 
                                onClick={() => handleToggleSetting('notif_system')}
                                disabled={updatingSettings}
                                className={`w-12 h-6 rounded-full relative transition-colors ${settings?.notif_system ? 'bg-primary' : 'bg-slate-300'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${settings?.notif_system ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
