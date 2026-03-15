"use client";

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useOwnerCourts, useOwnerCourtDetail } from '../hooks/useOwnerCourt';
import { OwnerCourt } from '../api/owner-court.api';
import { Plus, Search, Dribbble, Settings2, Trash2, Edit3, ChevronLeft, CalendarClock, DollarSign, LayoutDashboard } from 'lucide-react';

export const OwnerCourtPanel = ({ venueId }: { venueId: string }) => {
    const { courts, isLoading, createCourt, isCreating } = useOwnerCourts(venueId);
    
    const [selectedCourt, setSelectedCourt] = useState<OwnerCourt | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [newCourtData, setNewCourtData] = useState<Partial<OwnerCourt>>({});

    const handleCreate = () => {
        createCourt({ ...newCourtData });
        setIsAdding(false);
        setNewCourtData({});
    };

    if (selectedCourt) {
        return <OwnerCourtDetail court={selectedCourt} venueId={venueId} onBack={() => setSelectedCourt(null)} />;
    }

    const filteredCourts = courts.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 fade-in">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Tìm sân (Vd: Sân 1)..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 h-9 text-sm"
                    />
                </div>
                <Button onClick={() => setIsAdding(true)} className="h-9 font-bold bg-emerald-600 hover:bg-emerald-700 shadow-md">
                    <Plus className="w-4 h-4 mr-1.5" /> Thêm Sân Mới
                </Button>
            </div>

            {isAdding && (
                <Card className="p-6 border-emerald-200 bg-emerald-50 shadow-sm">
                    <h3 className="text-lg font-black text-emerald-900 mb-4 flex items-center gap-2">
                        <Dribbble className="w-5 h-5" /> Khởi Tạo Sân Mới
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-emerald-800 uppercase">Tên Sân</label>
                            <Input value={newCourtData.name || ''} onChange={e => setNewCourtData({...newCourtData, name: e.target.value})} placeholder="Vd: Sân 1 (5 người)" className="bg-white border-emerald-200 h-10" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-emerald-800 uppercase">Giá Tiêu Chuẩn / Giờ (VNĐ)</label>
                            <Input type="number" value={newCourtData.price_per_hour || ''} onChange={e => setNewCourtData({...newCourtData, price_per_hour: Number(e.target.value)})} placeholder="Vd: 300000" className="bg-white border-emerald-200 h-10" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="outline" onClick={() => setIsAdding(false)} className="h-9 border-emerald-200 text-emerald-700 bg-white font-bold">Hủy bỏ</Button>
                        <Button onClick={handleCreate} disabled={isCreating} className="h-9 bg-emerald-600 hover:bg-emerald-700 font-bold px-6">
                            {isCreating ? 'Đang lưu...' : 'Lưu Sân'}
                        </Button>
                    </div>
                </Card>
            )}

            {isLoading ? (
                <div className="text-center py-10 text-slate-500 font-medium">Đang tải cấu hình sân...</div>
            ) : filteredCourts.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 border border-slate-200 border-dashed rounded-xl">
                    <LayoutDashboard className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">Bạn chưa cài đặt Sân / Khu vực chơi nào.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredCourts.map(court => (
                        <Card key={court.id} className="p-0 overflow-hidden hover:border-emerald-300 transition-colors group">
                            <div className="p-5 flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{court.name}</h4>
                                        {!court.is_active && <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded uppercase">Bảo Trì / Khóa</span>}
                                    </div>
                                    <p className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
                                        <DollarSign className="w-4 h-4 text-emerald-600" /> 
                                        {court.price_per_hour.toLocaleString()} đ / Giờ
                                    </p>
                                    <p className="text-xs text-slate-400 mt-2 line-clamp-1">{court.description || 'Chưa có mô tả'}</p>
                                </div>
                                <div className="flex bg-slate-100 rounded-lg p-1">
                                    <Button variant="ghost" size="sm" onClick={() => setSelectedCourt(court)} className="h-8 text-xs font-bold text-slate-700 hover:bg-white hover:text-emerald-700 shadow-sm">
                                        <Settings2 className="w-3.5 h-3.5 mr-1" /> Cấu Hình
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

const OwnerCourtDetail = ({ court, venueId, onBack }: { court: OwnerCourt, venueId: string, onBack: () => void }) => {
    const { 
        updateCourt, isUpdating, 
        pricingRules, createPricingRule, isCreatingPricingRule, deletePricingRule,
        maintenances, createMaintenance, isCreatingMaintenance, deleteMaintenance,
        amenities, createAmenity, isCreatingAmenity, deleteAmenity,
        sports, createSport, isCreatingSport, deleteSport
    } = useOwnerCourtDetail(court.id, venueId);
    
    const [activeTab, setActiveTab] = useState<'info'|'pricing'|'maintenance'|'sports'|'amenities'>('info');
    const [infoData, setInfoData] = useState({ ...court });

    const [newPrice, setNewPrice] = useState<Partial<import('../api/owner-court.api').CourtPricingRule>>({});
    const [showPriceForm, setShowPriceForm] = useState(false);

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" onClick={onBack} className="w-9 h-9 rounded-lg border-slate-200 hover:bg-slate-100">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <h3 className="text-lg font-black text-slate-900">{court.name}</h3>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{court.id}</div>
                    </div>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${activeTab === 'info' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-600 hover:bg-slate-200'}`} onClick={() => setActiveTab('info')}>
                        <Edit3 className="w-3.5 h-3.5 inline mr-1" /> Thông tin
                    </button>
                    <button className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${activeTab === 'pricing' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-600 hover:bg-slate-200'}`} onClick={() => setActiveTab('pricing')}>
                        <DollarSign className="w-3.5 h-3.5 inline mr-1" /> Giá Linh Hoạt
                    </button>
                    <button className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${activeTab === 'maintenance' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-600 hover:bg-slate-200'}`} onClick={() => setActiveTab('maintenance')}>
                        <CalendarClock className="w-3.5 h-3.5 inline mr-1" /> Bảo Trì
                    </button>
                    <button className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${activeTab === 'sports' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-600 hover:bg-slate-200'}`} onClick={() => setActiveTab('sports')}>
                        <Dribbble className="w-3.5 h-3.5 inline mr-1" /> Môn TT
                    </button>
                    <button className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${activeTab === 'amenities' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-600 hover:bg-slate-200'}`} onClick={() => setActiveTab('amenities')}>
                        <LayoutDashboard className="w-3.5 h-3.5 inline mr-1" /> Tiện ích
                    </button>
                </div>
            </div>

            {/* TAB THÔNG TIN */}
            {activeTab === 'info' && (
                <Card className="p-6">
                    <div className="grid grid-cols-2 gap-4 max-w-2xl">
                        <div className="space-y-1.5 col-span-2">
                            <label className="text-xs font-bold text-slate-700 uppercase">Tên Sân Bãi</label>
                            <Input value={infoData.name} onChange={e => setInfoData({...infoData, name: e.target.value})} className="h-10" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase">Giá Cơ Bản (VNĐ / Giờ)</label>
                            <Input type="number" value={infoData.price_per_hour} onChange={e => setInfoData({...infoData, price_per_hour: Number(e.target.value)})} className="h-10 font-bold text-emerald-600" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase">Trạng Thái Mở Nhận Booking</label>
                            <select 
                                value={infoData.is_active ? 'true' : 'false'} 
                                onChange={e => setInfoData({...infoData, is_active: e.target.value === 'true'})}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="true">Sẵn Sàng Hệ Thống</option>
                                <option value="false">Tạm Khóa (Ẩn)</option>
                            </select>
                        </div>
                        <div className="space-y-1.5 col-span-2 mt-4">
                            <Button onClick={() => updateCourt(infoData)} disabled={isUpdating} className="w-full h-10 font-bold shadow-md">
                                {isUpdating ? 'Đang lưu...' : 'Lưu Thay Đổi Sân'}
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* TAB GIÁ LINH HOẠT */}
            {activeTab === 'pricing' && (
                <Card className="p-6 space-y-6 bg-slate-50/50">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-slate-900">Bảng Giá Linh Hoạt (Quy Tắc Giá)</h4>
                            <p className="text-xs text-slate-500 font-medium mt-1">Ghi đè giá Cơ bản theo Khung giờ Vàng / Ngày cụ thể.</p>
                        </div>
                        <Button onClick={() => setShowPriceForm(!showPriceForm)} size="sm" variant="outline" className="h-8 font-bold text-xs bg-white text-emerald-700 border-emerald-200">
                            {showPriceForm ? 'Đóng form' : '+ Thêm Quy Tắc Giá'}
                        </Button>
                    </div>

                    {showPriceForm && (
                        <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm grid grid-cols-2 gap-4">
                            <div className="space-y-1.5 col-span-2">
                                <label className="text-xs font-bold text-slate-700">Tên Quy Tắc</label>
                                <Input placeholder="Vd: Tối thứ 7" value={newPrice.name || ''} onChange={e => setNewPrice({...newPrice, name: e.target.value})} className="h-9 text-sm" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">Thứ áp dụng</label>
                                <select 
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm"
                                    value={newPrice.day_of_week || ''}
                                    onChange={e => setNewPrice({...newPrice, day_of_week: e.target.value as any})}
                                >
                                    <option value="">(Bỏ trống nếu áp dụng mọi ngày)</option>
                                    <option value="MONDAY">Thứ 2</option>
                                    <option value="WEDNESDAY">Thứ 4</option>
                                    <option value="SATURDAY">Thứ 7</option>
                                    <option value="SUNDAY">Chủ Nhật</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">Giá Khuyến Mãi (VNĐ / Giờ)</label>
                                <Input type="number" placeholder="Vd: 500000" value={newPrice.price || ''} onChange={e => setNewPrice({...newPrice, price: Number(e.target.value)})} className="h-9 text-sm font-bold text-emerald-600" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">Từ (Giờ)</label>
                                <Input type="time" value={newPrice.start_time || '00:00'} onChange={e => setNewPrice({...newPrice, start_time: e.target.value})} className="h-9 text-sm" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700">Đến (Giờ)</label>
                                <Input type="time" value={newPrice.end_time || '23:59'} onChange={e => setNewPrice({...newPrice, end_time: e.target.value})} className="h-9 text-sm" />
                            </div>
                            <div className="col-span-2 flex justify-end mt-2">
                                <Button size="sm" disabled={isCreatingPricingRule} onClick={() => { createPricingRule(newPrice); setShowPriceForm(false); setNewPrice({}); }} className="h-8 font-bold bg-emerald-600">
                                    Lưu Quy Tắc Nghỉ / Giá mới
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="divide-y divide-slate-100 bg-white rounded-xl border border-slate-200 overflow-hidden">
                        {pricingRules.length === 0 ? (
                            <div className="p-8 text-center text-slate-500 font-medium text-sm">Chưa có Quy tắc giá nào. Đang dùng giá Cơ bản {court.price_per_hour.toLocaleString()}đ</div>
                        ) : (
                            pricingRules.map(pr => (
                                <div key={pr.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">{pr.name}</div>
                                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                                            <span className="bg-slate-100 px-1.5 py-0.5 rounded font-bold">{pr.day_of_week || 'Mọi Ngày'}</span>
                                            <span>{pr.start_time} - {pr.end_time}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-black text-emerald-600">{pr.price.toLocaleString()} đ/h</span>
                                        <Button variant="ghost" size="icon" className="w-8 h-8 text-rose-500 hover:bg-rose-50" onClick={() => deletePricingRule(pr.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            )}

            {/* TAB BẢO TRÌ */}
            {activeTab === 'maintenance' && (
                <Card className="p-6">
                    <p className="text-sm font-medium text-slate-600 mb-6">Đóng bảo trì Hệ thống Đặt sân trong khoảng thời gian xác định (ví dụ: Cải tạo, Lên cỏ mới, Tổ chức giải cá nhân).</p>
                    
                    <Button onClick={() => createMaintenance({ reason: 'Bảo trì đột xuất định kỳ' })} disabled={isCreatingMaintenance} variant="outline" className="w-full h-11 border-dashed border-2 border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold">
                        <Plus className="w-4 h-4 mr-2" /> Đăng Ký Lịch Khóa Sân (Bảo Trì)
                    </Button>

                    <div className="mt-6 space-y-3">
                        {maintenances.map(m => (
                            <div key={m.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-rose-50 border border-rose-200 rounded-xl gap-4">
                                <div>
                                    <h5 className="font-bold text-rose-900 text-sm">{m.reason}</h5>
                                    <p className="text-xs text-rose-700 font-medium mt-1">Từ: {new Date(m.start_at).toLocaleString()} - Đến: {new Date(m.end_at).toLocaleString()}</p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => deleteMaintenance(m.id)} className="h-8 text-xs font-bold text-rose-700 hover:bg-red-100 border border-rose-200">
                                    Hủy Bảo Trì (Mở Lại Sân)
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* TAB MÔN THỂ THAO */}
            {activeTab === 'sports' && (
                <Card className="p-6">
                    <p className="text-sm font-medium text-slate-600 mb-6">Môn thể thao nào được chơi tại sân này? (Ví dụ: sân 5 này dùng đá banh, sân kế bên dùng đánh bóng chuyền).</p>
                    <div className="flex gap-4">
                        <select id="sport_type_select" className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="FOOTBALL">Bóng Đá</option>
                            <option value="BADMINTON">Cầu Lông</option>
                            <option value="TENNIS">Tennis</option>
                            <option value="PICKLEBALL">Pickleball</option>
                            <option value="BASKETBALL">Bóng Rổ</option>
                        </select>
                        <Button 
                            onClick={() => {
                                const val = (document.getElementById('sport_type_select') as HTMLSelectElement).value;
                                createSport({ sport_type: val });
                            }} 
                            disabled={isCreatingSport} 
                            className="h-10 px-6 font-bold bg-emerald-600 hover:bg-emerald-700"
                        >
                            Thêm Môn TT
                        </Button>
                    </div>

                    <div className="mt-6 divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                        {sports.map(s => (
                            <div key={s.id} className="flex justify-between items-center p-4 hover:bg-slate-50">
                                <span className="font-bold text-slate-800">{s.sport_type}</span>
                                <Button variant="ghost" size="sm" onClick={() => deleteSport(s.id)} className="h-8 text-rose-500 hover:bg-rose-50"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                        ))}
                        {sports.length === 0 && <div className="p-4 text-center text-slate-500 text-sm">Chưa có môn nào</div>}
                    </div>
                </Card>
            )}

            {/* TAB TIỆN ÍCH */}
            {activeTab === 'amenities' && (
                <Card className="p-6">
                    <p className="text-sm font-medium text-slate-600 mb-6">Trang bị tiện ích riêng cho sân này (Phụ thu hoặc Miễn phí).</p>
                    <div className="flex gap-4">
                        <Input id="amenity_name_in" placeholder="Tên tiện ích (Vd: Thuê bóng, Áo pitch)" className="flex-1 h-10" />
                        <select id="amenity_free_in" className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm w-36">
                            <option value="true">Miễn phí</option>
                            <option value="false">Có phí</option>
                        </select>
                        <Button 
                            onClick={() => {
                                const name = (document.getElementById('amenity_name_in') as HTMLInputElement).value;
                                const is_free = (document.getElementById('amenity_free_in') as HTMLSelectElement).value === 'true';
                                if(name) createAmenity({ name, is_free });
                            }} 
                            disabled={isCreatingAmenity} 
                            className="h-10 px-6 font-bold bg-emerald-600 hover:bg-emerald-700"
                        >
                            Thêm
                        </Button>
                    </div>

                    <div className="mt-6 divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                        {amenities.map(a => (
                            <div key={a.id} className="flex justify-between items-center p-4 hover:bg-slate-50">
                                <div>
                                    <span className="font-bold text-slate-800">{a.name}</span>
                                    <span className={`ml-3 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${a.is_free ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {a.is_free ? 'Miễn phí' : 'Phụ phí'}
                                    </span>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => deleteAmenity(a.id)} className="h-8 text-rose-500 hover:bg-rose-50"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                        ))}
                        {amenities.length === 0 && <div className="p-4 text-center text-slate-500 text-sm">Chưa có tiện ích riêng biệt.</div>}
                    </div>
                </Card>
            )}
        </div>
    );
};
