"use client";

import React, { useState } from 'react';
import { useAdminSystem } from '../hooks/useAdminSystem';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Settings, CalendarHeart, SmartphoneNfc, History as HistoryIcon, PlusCircle, PenSquare, Trash2, Smartphone, MonitorSmartphone, ShieldHalf, LayoutDashboard, Clock } from 'lucide-react';
import { format } from 'date-fns';

export const AdminSystemTabs = () => {
    const { 
        settings, holidays, appVersions, auditLogs,
        isLoadingSettings, isLoadingHolidays, isLoadingApp, isLoadingLogs,
        updateSetting, isUpdatingSetting,
        createHoliday, updateHoliday, deleteHoliday,
        createAppVersion, updateAppVersion, deleteAppVersion,
        logsQuery
    } = useAdminSystem();

    const [activeTab, setActiveTab] = useState<'SETTINGS' | 'HOLIDAYS' | 'APP_VERSIONS' | 'AUDIT'>('SETTINGS');
    
    // State for setting edits
    const [editingSetting, setEditingSetting] = useState<string | null>(null);
    const [settingValue, setSettingValue] = useState<string>('');

    // Modal State for Holidays & App Versions
    const [showHolidayModal, setShowHolidayModal] = useState(false);
    const [editingHoliday, setEditingHoliday] = useState<any>(null);
    const [holidayForm, setHolidayForm] = useState({
        holiday_name: '',
        holiday_date: '',
        price_multiplier: 1.5,
        is_recurring: true,
        is_active: true
    });

    const [showAppModal, setShowAppModal] = useState(false);
    const [editingApp, setEditingApp] = useState<any>(null);
    const [appForm, setAppForm] = useState({
        platform: 'IOS',
        version_number: '',
        build_number: 0,
        release_notes: '',
        is_force_update: false,
        is_active: true,
        download_url: ''
    });

    const isLoading = isLoadingSettings || isLoadingHolidays || isLoadingApp || isLoadingLogs;

    // Handlers
    const handleHolidaySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingHoliday) {
            updateHoliday({ id: editingHoliday.id, data: holidayForm });
        } else {
            createHoliday(holidayForm);
        }
        setShowHolidayModal(false);
        setEditingHoliday(null);
    };

    const handleAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingApp) {
            updateAppVersion({ id: editingApp.id, data: appForm });
        } else {
            createAppVersion(appForm);
        }
        setShowAppModal(false);
        setEditingApp(null);
    };

    const toggleHolidayActive = (holiday: any) => {
        updateHoliday({ id: holiday.id, data: { is_active: !holiday.is_active } });
    };

    const toggleAppActive = (app: any) => {
        updateAppVersion({ id: app.id, data: { is_active: !app.is_active } });
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải Cấu Hình Hệ Thống...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Horizontal Tabs Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-wrap lg:flex-nowrap">
                <button onClick={() => setActiveTab('SETTINGS')} className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold transition-all border-b-2 lg:border-b-0 lg:border-r border-slate-200 ${activeTab === 'SETTINGS' ? 'text-primary bg-primary/5 lg:border-r-primary border-b-primary lg:border-b-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
                    <Settings className="w-4 h-4" /> Config Chung
                </button>
                <button onClick={() => setActiveTab('HOLIDAYS')} className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold transition-all border-b-2 lg:border-b-0 lg:border-r border-slate-200 ${activeTab === 'HOLIDAYS' ? 'text-rose-600 bg-rose-50/50 lg:border-r-rose-600 border-b-rose-600 lg:border-b-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
                    <CalendarHeart className="w-4 h-4" /> Lịch Nghỉ Lễ
                </button>
                <button onClick={() => setActiveTab('APP_VERSIONS')} className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold transition-all border-b-2 lg:border-b-0 lg:border-r border-slate-200 ${activeTab === 'APP_VERSIONS' ? 'text-sky-600 bg-sky-50/50 lg:border-r-sky-600 border-b-sky-600 lg:border-b-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
                    <SmartphoneNfc className="w-4 h-4" /> App Mobile
                </button>
                <button onClick={() => setActiveTab('AUDIT')} className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold transition-all border-b-2 lg:border-b-0 border-slate-200 ${activeTab === 'AUDIT' ? 'text-amber-600 bg-amber-50/50 border-b-amber-600 lg:border-b-transparent' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
                    <HistoryIcon className="w-4 h-4" /> Kế Toán (Audit Logs)
                </button>
            </div>

            {/* TAB: SETTINGS */}
            {activeTab === 'SETTINGS' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
                    <div className="p-4 bg-slate-50/50 flex justify-between items-center text-sm font-medium text-slate-500">
                        Cấu hình ảnh hưởng trực tiếp đến toàn hệ thống (Thuế VAT, Logic Đặt Sân, Hệ số...). Cần cẩn trọng khi sửa.
                    </div>
                    {settings.map(setting => (
                        <div key={setting.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-slate-800 font-mono tracking-tight">{setting.key}</h4>
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{setting.group_name}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">TYPE: {setting.data_type}</span>
                                </div>
                                <p className="text-sm text-slate-600">{setting.description}</p>
                            </div>
                            
                            <div className="w-full md:w-auto flex items-center justify-end gap-3 shrink-0">
                                {editingSetting === setting.id ? (
                                    <div className="flex items-center gap-2 flex-1 md:flex-none">
                                        <Input 
                                            className="h-9 w-32 md:w-48 text-right font-bold text-slate-800 font-mono border-primary shadow-sm"
                                            value={settingValue}
                                            onChange={(e) => setSettingValue(e.target.value)}
                                            autoFocus
                                        />
                                        <Button 
                                            size="sm" 
                                            className="h-9 text-xs" 
                                            disabled={isUpdatingSetting}
                                            onClick={() => {
                                                updateSetting({ id: setting.id, value: settingValue });
                                                setEditingSetting(null);
                                            }}
                                        >Lưu</Button>
                                        <Button size="sm" variant="outline" className="h-9 text-xs" onClick={() => setEditingSetting(null)}>Hủy</Button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-lg font-mono font-bold text-slate-800 min-w-[100px] text-right">
                                            {setting.value}
                                        </div>
                                        <Button 
                                            variant="ghost" size="icon" className="h-9 w-9 text-sky-600 hover:bg-sky-50"
                                            onClick={() => {
                                                setEditingSetting(setting.id);
                                                setSettingValue(setting.value);
                                            }}
                                        ><PenSquare className="w-5 h-5" /></Button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB: HOLIDAYS */}
            {activeTab === 'HOLIDAYS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div className="col-span-full flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-slate-500">Các ngày này sẽ bị áp dụng hệ số nhân giá tiền theo cấu hình của sàn (Price Multiplier).</p>
                        <Button 
                            size="sm" className="bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
                            onClick={() => {
                                setEditingHoliday(null);
                                setHolidayForm({ holiday_name: '', holiday_date: '', price_multiplier: 1.5, is_recurring: true, is_active: true });
                                setShowHolidayModal(true);
                            }}
                        ><PlusCircle className="w-4 h-4 mr-2"/> Thêm Ngày Khác</Button>
                    </div>
                    {holidays.map(holiday => (
                        <div key={holiday.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:border-rose-200 hover:shadow-md transition-all p-5 flex flex-col justify-between group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-rose-50 rounded-bl-[100%] pointer-events-none -z-0 group-hover:bg-rose-100 transition-colors"></div>
                            
                            <div className="relative z-10">
                                <h3 className="font-bold text-slate-900 text-lg mb-1">{holiday.holiday_name}</h3>
                                <div className="flex bg-rose-50 text-rose-700 w-fit px-3 py-1 rounded-lg border border-rose-100 items-center gap-2 mb-4">
                                    <CalendarHeart className="w-5 h-5" />
                                    <span className="font-black font-mono text-xl">{format(new Date(holiday.holiday_date), 'dd/MM/yyyy')}</span>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <div className="flex justify-between text-sm items-center">
                                        <span className="text-slate-500 font-medium">Lặp Hàng Năm?</span>
                                        <span className={`font-bold ${holiday.is_recurring ? 'text-emerald-600' : 'text-slate-400'}`}>{holiday.is_recurring ? 'CÓ (Hằng năm)' : 'CỤ THỂ NĂM'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm items-center">
                                        <span className="text-slate-500 font-medium">Hệ số Giá (Multiplier)</span>
                                        <span className="font-bold text-rose-600 font-mono text-base bg-white border border-rose-200 px-2 rounded">x{holiday.price_multiplier}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 relative z-10 w-full">
                                <button 
                                    onClick={() => toggleHolidayActive(holiday)}
                                    className="relative inline-flex items-center cursor-pointer"
                                >
                                    <div className={`w-9 h-5 rounded-full transition-colors relative ${holiday.is_active ? 'bg-rose-500' : 'bg-slate-300'}`}>
                                        <div className={`absolute top-[2px] left-[2px] bg-white w-4 h-4 rounded-full transition-transform ${holiday.is_active ? 'translate-x-4' : ''}`}></div>
                                    </div>
                                    <span className="ml-2 text-xs font-bold text-slate-500 uppercase">{holiday.is_active ? 'ACTIVE' : 'INACTIVE'}</span>
                                </button>
                                <div className="flex items-center gap-1">
                                    <Button 
                                        variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary"
                                        onClick={() => {
                                            setEditingHoliday(holiday);
                                            setHolidayForm({
                                                holiday_name: holiday.holiday_name,
                                                holiday_date: new Date(holiday.holiday_date).toISOString().split('T')[0],
                                                price_multiplier: Number(holiday.price_multiplier),
                                                is_recurring: holiday.is_recurring,
                                                is_active: holiday.is_active
                                            });
                                            setShowHolidayModal(true);
                                        }}
                                    ><PenSquare className="w-4 h-4" /></Button>
                                    <Button 
                                        variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600"
                                        onClick={() => {
                                            if (confirm('Xóa ngày lễ này?')) deleteHoliday(holiday.id);
                                        }}
                                    ><Trash2 className="w-4 h-4" /></Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB: APP VERSIONS */}
            {activeTab === 'APP_VERSIONS' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-slate-500">Quản lý version ứng dụng trên Store (iOS/Android). Bật Force Update để ép khách tải lại ngay.</p>
                        <Button 
                            size="sm" className="bg-sky-600 hover:bg-sky-700 text-white shadow-sm"
                            onClick={() => {
                                setEditingApp(null);
                                setAppForm({ platform: 'IOS', version_number: '', build_number: 0, release_notes: '', is_force_update: false, is_active: true, download_url: '' });
                                setShowAppModal(true);
                            }}
                        ><PlusCircle className="w-4 h-4 mr-2"/> Phát hành Bản Mới</Button>
                    </div>

                    <div className="grid gap-4">
                        {appVersions.map(app => (
                            <div key={app.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-sky-300 transition-colors flex flex-col md:flex-row gap-6">
                                <div className="flex items-center gap-4 md:w-48 shrink-0">
                                    <div className={`p-4 rounded-xl text-white shadow-sm ${app.platform === 'IOS' ? 'bg-slate-900' : 'bg-emerald-600'}`}>
                                        {app.platform === 'IOS' ? <Smartphone className="w-8 h-8" /> : <MonitorSmartphone className="w-8 h-8" />}
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{app.platform} Version</div>
                                        <div className="font-black text-2xl text-slate-900 tracking-tight">v{app.version_number}</div>
                                        <div className="text-xs font-mono text-slate-400 mt-0.5">Build: {app.build_number}</div>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col justify-center space-y-3">
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => toggleAppActive(app)}
                                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded transition-colors
                                            ${app.is_active ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                                            {app.is_active ? 'ĐANG LIVE TẠI STORE' : 'LƯU NHÁP'}
                                        </button>
                                        {app.is_force_update && (
                                            <span className="flex items-center gap-1 text-[10px] bg-rose-50 text-rose-600 border border-rose-200 uppercase font-black px-2 py-0.5 rounded shadow-sm">
                                                <ShieldHalf className="w-3 h-3" /> ÉP CẬP NHẬT (FORCE)
                                            </span>
                                        )}
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-700 leading-relaxed font-medium">
                                        <strong>Change logs (Ghi chú):</strong> {app.release_notes || 'Không có ghi chú'}
                                    </div>
                                    <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 pt-1">
                                        <Clock className="w-3.5 h-3.5" /> Phát hành lúc: {app.released_at ? format(new Date(app.released_at), 'HH:mm dd/MM/yyyy') : 'Chưa định ngày'}
                                    </div>
                                </div>

                                <div className="shrink-0 flex md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                                    <Button 
                                        variant="outline" size="sm" className="flex-1 md:w-32 h-9 text-xs border-sky-200 text-sky-700 hover:bg-sky-50"
                                        onClick={() => {
                                            setEditingApp(app);
                                            setAppForm({
                                                platform: app.platform,
                                                version_number: app.version_number,
                                                build_number: app.build_number,
                                                release_notes: app.release_notes || '',
                                                is_force_update: app.is_force_update,
                                                is_active: app.is_active,
                                                download_url: app.download_url || ''
                                            });
                                            setShowAppModal(true);
                                        }}
                                    ><PenSquare className="w-4 h-4 mr-2" /> Cập nhật Form</Button>
                                    <Button 
                                        variant="outline" size="sm" className="flex-1 md:w-32 h-9 text-xs text-rose-600 border-rose-200 hover:bg-rose-50"
                                        onClick={() => {
                                            if (confirm('Xóa phiên bản này?')) deleteAppVersion(app.id);
                                        }}
                                    ><Trash2 className="w-4 h-4 mr-2" /> Xóa Khỏi Thẻ</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB: AUDIT LOGS */}
            {activeTab === 'AUDIT' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 bg-amber-50/50 flex justify-between items-center text-sm font-medium text-amber-800 border-b border-amber-100">
                        <div className="flex items-center">
                            <LayoutDashboard className="w-5 h-5 mr-2" /> Dữ liệu Lịch sử Hành động toàn Server. Bảng này không thể bị xóa do Ràng buộc Compliance (Chỉ Đọc).
                        </div>
                        <Button variant="outline" size="sm" className="h-8 border-amber-200 text-amber-700" onClick={() => (logsQuery as any).refetch()}>Làm mới</Button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                                <tr>
                                    <th className="px-5 py-3 w-40">Mã Chứng Từ (Log ID)</th>
                                    <th className="px-5 py-3 w-40">Vai Trò Actor</th>
                                    <th className="px-5 py-3 w-32 text-center">Hành Động</th>
                                    <th className="px-5 py-3 w-48">Mục Tiêu (Entity)</th>
                                    <th className="px-5 py-3 w-32">Nguồn IP</th>
                                    <th className="px-5 py-3 w-40 text-right">Lúc Ghi Nhận</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {auditLogs.length > 0 ? auditLogs.map(log => (
                                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="font-mono text-[10px] font-bold text-slate-900 truncate w-32">{log.id}</div>
                                            <div className="text-[10px] text-slate-500 mt-0.5" title="User ID thực hiện (nếu có)">User: {log.user_id || 'System Cron'}</div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border
                                                ${log.actor_role === 'SUPER_ADMIN' ? 'bg-rose-100 text-rose-700 border-rose-200' :
                                                  log.actor_role === 'ADMIN' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                                  'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                                {log.actor_role?.replace('_', ' ') || 'SYSTEM'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <span className={`font-mono text-[10px] font-bold uppercase tracking-wider
                                                ${log.action === 'UPDATE' ? 'text-blue-600' :
                                                  log.action === 'DELETE' ? 'text-rose-600' : 
                                                  log.action === 'CREATE' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                [{log.action}]
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="font-bold text-slate-700">{log.entity_name}</div>
                                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {log.entity_id || 'N/A'}</div>
                                        </td>
                                        <td className="px-5 py-3 font-mono text-xs text-slate-500">
                                            {log.ip_address || '---'}
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                            <div className="font-semibold text-slate-800">{format(new Date(log.created_at), 'dd/MM/yyyy')}</div>
                                            <div className="text-xs text-slate-500 font-medium mt-0.5">{format(new Date(log.created_at), 'HH:mm:ss')}</div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-10 text-center text-slate-400 font-medium">Chưa có dữ liệu audit log.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* HOLIDAY MODAL */}
            {showHolidayModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">{editingHoliday ? 'Sửa Ngày Lễ' : 'Thêm Ngày Lễ Mới'}</h3>
                            <button onClick={() => setShowHolidayModal(false)} className="text-slate-400 hover:text-slate-600">
                                <PlusCircle className="w-6 h-6 rotate-45" />
                            </button>
                        </div>
                        <form onSubmit={handleHolidaySubmit} className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700">Tên Ngày Lễ</label>
                                <Input required value={holidayForm.holiday_name} onChange={e => setHolidayForm({...holidayForm, holiday_name: e.target.value})} placeholder="VD: Tết Nguyên Đán" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Ngày</label>
                                    <Input required type="date" value={holidayForm.holiday_date} onChange={e => setHolidayForm({...holidayForm, holiday_date: e.target.value})} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Hệ số Giá (xN)</label>
                                    <Input required type="number" step="0.1" value={holidayForm.price_multiplier} onChange={e => setHolidayForm({...holidayForm, price_multiplier: parseFloat(e.target.value)})} />
                                </div>
                            </div>
                            <div className="flex items-center gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" checked={holidayForm.is_recurring} onChange={e => setHolidayForm({...holidayForm, is_recurring: e.target.checked})} />
                                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">Lặp hàng năm</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" checked={holidayForm.is_active} onChange={e => setHolidayForm({...holidayForm, is_active: e.target.checked})} />
                                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">Kích hoạt ngay</span>
                                </label>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <Button type="submit" className="flex-1">Lưu Thiết Lập</Button>
                                <Button type="button" variant="outline" onClick={() => setShowHolidayModal(false)}>Hủy</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* APP MODAL */}
            {showAppModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">{editingApp ? 'Cập Nhật Bản Phát Hành' : 'Phát Hành Bản App Mới'}</h3>
                            <button onClick={() => setShowAppModal(false)} className="text-slate-400 hover:text-slate-600">
                                <PlusCircle className="w-6 h-6 rotate-45" />
                            </button>
                        </div>
                        <form onSubmit={handleAppSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Nền Tảng</label>
                                    <select 
                                        className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        value={appForm.platform} 
                                        onChange={e => setAppForm({...appForm, platform: e.target.value as any})}
                                    >
                                        <option value="IOS">Apple iOS</option>
                                        <option value="ANDROID">Google Android</option>
                                        <option value="WEB">Web Platform</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Phiên Bản (VD: 1.0.0)</label>
                                    <Input required value={appForm.version_number} onChange={e => setAppForm({...appForm, version_number: e.target.value})} placeholder="1.2.0" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Build Number</label>
                                    <Input required type="number" value={appForm.build_number} onChange={e => setAppForm({...appForm, build_number: parseInt(e.target.value)})} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700">Link Store/Download</label>
                                    <Input value={appForm.download_url} onChange={e => setAppForm({...appForm, download_url: e.target.value})} placeholder="https://..." />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700">Ghi Chú Phát Hành (Release Notes)</label>
                                <textarea 
                                    className="w-full min-h-[100px] p-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                    value={appForm.release_notes} 
                                    onChange={e => setAppForm({...appForm, release_notes: e.target.value})}
                                    placeholder="Có gì mới trong bản này..."
                                />
                            </div>
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500" checked={appForm.is_force_update} onChange={e => setAppForm({...appForm, is_force_update: e.target.checked})} />
                                    <span className="text-sm font-black text-rose-600 group-hover:text-rose-700">Bắt buộc cập nhật (Force)</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" checked={appForm.is_active} onChange={e => setAppForm({...appForm, is_active: e.target.checked})} />
                                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">Kích hoạt/Hiện Store</span>
                                </label>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <Button type="submit" className="flex-1 bg-sky-600 hover:bg-sky-700">Lưu & Xuất Bản</Button>
                                <Button type="button" variant="outline" onClick={() => setShowAppModal(false)}>Hủy</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
