"use client";

import React, { useState } from 'react';
import { useOwnerAnalytics } from '../hooks/useOwnerAnalytics';
import { Card } from '@/components/common/Card';
import { TrendingUp, Users, CalendarDays, Star, ArrowUpRight, ArrowDownRight, Activity, Maximize2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import Link from 'next/link';

export const OwnerAnalyticsManagement = ({ venueId }: { venueId: string }) => {
    const [period, setPeriod] = useState<string>('30_days');
    const { summary, revenueChart, bookingStatus, popularCourts, isSummaryLoading, isRevenueLoading, isBookingStatusLoading, isCourtsLoading } = useOwnerAnalytics(venueId, period);

    const periods = [
        { label: '7 ngày qua', value: '7_days' },
        { label: '30 ngày qua', value: '30_days' },
        { label: 'Tháng này', value: 'this_month' },
        { label: 'Năm nay', value: 'this_year' },
    ];

    const renderCustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow border border-slate-100">
                    <p className="font-bold text-slate-700 mb-1">{new Date(label).toLocaleDateString()}</p>
                    <p className="text-emerald-600 font-semibold text-sm">Doanh thu: {payload[0].value.toLocaleString()} đ</p>
                    {payload[1] && <p className="text-blue-600 font-semibold text-sm">Lượt đặt: {payload[1].value}</p>}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Hàng bộ lọc thời gian */}
            <div className="flex flex-wrap items-center gap-2 mb-2 border-b border-slate-200 pb-4">
                {periods.map(p => (
                    <button
                        key={p.value}
                        onClick={() => setPeriod(p.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                            period === p.value ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* Hàng 4 Box Tổng quan */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-bottom-2 fade-in relative z-10">
                {/* Doanh Thu */}
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative group border-none shadow-md">
                    <div className="absolute right-[-10px] bottom-[-10px] text-emerald-100 transition-transform group-hover:scale-110">
                        <TrendingUp className="w-24 h-24 opacity-60" />
                    </div>
                    <div className="relative z-10">
                        <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-2">
                            <Activity className="w-4 h-4 text-emerald-500" /> Tổng Doanh Thu
                        </span>
                        {isSummaryLoading ? (
                            <div className="h-8 bg-slate-100 animate-pulse rounded w-3/4 mb-2"></div>
                        ) : (
                            <div className="text-3xl font-black text-slate-800 mb-2">
                                {summary?.totalRevenue.toLocaleString()} <span className="text-base font-bold text-slate-400">đ</span>
                            </div>
                        )}
                        <div className="flex items-center text-xs font-semibold mt-1">
                            {summary && summary.revenueGrowth >= 0 ? (
                                <span className="text-emerald-600 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded">
                                    <ArrowUpRight className="w-3 h-3 mr-0.5" /> +{summary.revenueGrowth}%
                                </span>
                            ) : (
                                <span className="text-rose-600 flex items-center bg-rose-50 px-1.5 py-0.5 rounded">
                                    <ArrowDownRight className="w-3 h-3 mr-0.5" /> {summary?.revenueGrowth}%
                                </span>
                            )}
                            <span className="text-slate-400 ml-2 font-medium">so với kỳ liền trước</span>
                        </div>
                    </div>
                </Card>

                {/* Lượt Đặt Sân */}
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative group border-none shadow-md">
                    <div className="absolute right-[-10px] bottom-[-10px] text-blue-100 transition-transform group-hover:scale-110">
                        <CalendarDays className="w-24 h-24 opacity-60" />
                    </div>
                    <div className="relative z-10">
                        <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-2">
                            <CalendarDays className="w-4 h-4 text-blue-500" /> Lượt Đặt Sân
                        </span>
                        {isSummaryLoading ? (
                            <div className="h-8 bg-slate-100 animate-pulse rounded w-1/2 mb-2"></div>
                        ) : (
                            <div className="text-3xl font-black text-slate-800 mb-2">
                                {summary?.totalBookings.toLocaleString()} <span className="text-base font-bold text-slate-400">lượt</span>
                            </div>
                        )}
                        <div className="flex items-center text-xs font-semibold mt-1">
                            {summary && summary.bookingsGrowth >= 0 ? (
                                <span className="text-emerald-600 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded">
                                    <ArrowUpRight className="w-3 h-3 mr-0.5" /> +{summary.bookingsGrowth}%
                                </span>
                            ) : (
                                <span className="text-rose-600 flex items-center bg-rose-50 px-1.5 py-0.5 rounded">
                                    <ArrowDownRight className="w-3 h-3 mr-0.5" /> {summary?.bookingsGrowth}%
                                </span>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Khách Hàng */}
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative group border-none shadow-md">
                    <div className="absolute right-[-10px] bottom-[-10px] text-fuchsia-100 transition-transform group-hover:scale-110">
                        <Users className="w-24 h-24 opacity-60" />
                    </div>
                    <div className="relative z-10">
                        <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-2">
                            <Users className="w-4 h-4 text-fuchsia-500" /> Khách Hàng Chơi
                        </span>
                        {isSummaryLoading ? (
                            <div className="h-8 bg-slate-100 animate-pulse rounded w-1/2 mb-2"></div>
                        ) : (
                            <div className="text-3xl font-black text-slate-800 mb-2">
                                {summary?.totalCustomers.toLocaleString()} <span className="text-base font-bold text-slate-400">người</span>
                            </div>
                        )}
                        <div className="flex items-center text-xs font-semibold mt-1 text-slate-500">
                            Trong {periods.find(p => p.value === period)?.label || 'kỳ này'}
                        </div>
                    </div>
                </Card>

                {/* Điểm Đánh Giá */}
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative group border-none shadow-md bg-gradient-to-br from-amber-500 to-orange-400">
                    <div className="absolute right-[-10px] bottom-[-10px] text-amber-300 transition-transform group-hover:scale-110">
                        <Star className="w-24 h-24 opacity-50" />
                    </div>
                    <div className="relative z-10">
                        <span className="text-xs font-bold text-amber-100 uppercase flex items-center gap-1.5 mb-2">
                            <Star className="w-4 h-4 text-white fill-white" /> Đánh Giá Trung Bình
                        </span>
                        {isSummaryLoading ? (
                            <div className="h-8 bg-amber-400 animate-pulse rounded w-1/2 mb-2"></div>
                        ) : (
                            <div className="text-4xl font-black text-white mb-2 flex items-baseline gap-1">
                                {summary?.averageRating.toFixed(1)} <span className="text-xl font-bold text-amber-200">/ 5.0</span>
                            </div>
                        )}
                        <div className="flex items-center text-xs font-semibold mt-1 text-amber-100">
                            Chất lượng dịch vụ tuyệt vời!
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-3 fade-in relative z-0">
                
                {/* Biểu đồ doanh thu */}
                <Card className="lg:col-span-2 p-5 border-none shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-black text-slate-800 text-lg">Biểu Đồ Doanh Thu & Lượt Đặt</h3>
                            <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">
                                Theo {periods.find(p => p.value === period)?.label.toLowerCase()}
                            </p>
                        </div>
                        <Link 
                            href={`/owner/analytics/revenue${venueId ? `?venueId=${venueId}` : ''}`}
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors flex items-center justify-center"
                            title="Mở toàn màn hình xem chi tiết"
                        >
                            <Maximize2 className="w-5 h-5" />
                        </Link>
                    </div>
                    
                    <div className="h-[320px] w-full mt-4">
                        {isRevenueLoading ? (
                            <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl flex items-center justify-center text-slate-400 text-sm font-semibold">Đang tải dữ liệu biểu đồ...</div>
                        ) : revenueChart.length === 0 ? (
                            <div className="w-full h-full border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm font-semibold">Không có dữ liệu trong kỳ này</div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueChart} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="date" tick={{fontSize: 10, fill: '#64748b'}} tickFormatter={(val) => new Date(val).toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit'})} axisLine={false} tickLine={false} dy={10} />
                                    <YAxis yAxisId="left" tick={{fontSize: 10, fill: '#64748b'}} tickFormatter={(val) => `${val / 1000000}M`} axisLine={false} tickLine={false} dx={-10} />
                                    {/* <YAxis yAxisId="right" orientation="right" hide /> */}
                                    <RechartsTooltip content={renderCustomTooltip} />
                                    <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </Card>

                {/* Trạng thái đặt sân */}
                <Card className="p-5 border-none shadow-md flex flex-col">
                    <h3 className="font-black text-slate-800 text-lg mb-1">Tỉ Lệ Trạng Thái Báo Cáo</h3>
                    <p className="text-xs text-slate-500 font-medium tracking-wide uppercase mb-4">
                        Tổng số {summary?.totalBookings} lượt đặt
                    </p>
                    
                    <div className="h-[220px] w-full flex-shrink-0">
                        {isBookingStatusLoading ? (
                            <div className="w-full h-full bg-slate-50 animate-pulse rounded-full max-w-[220px] mx-auto"></div>
                        ) : bookingStatus.length === 0 ? (
                            <div className="w-full h-full border border-dashed border-slate-200 rounded-full max-w-[220px] mx-auto flex items-center justify-center text-slate-400 text-sm font-semibold">Trống</div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={bookingStatus}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {bookingStatus.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip formatter={(value: any) => [`${value} lượt đặt`, 'Số lượng']} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    
                    <div className="mt-auto space-y-2.5 pt-4">
                        {bookingStatus.map((status, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 font-semibold text-slate-700">
                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></span>
                                    {status.name}
                                </span>
                                <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded ml-2 text-xs">{status.value}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Popular Courts & Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 fade-in">
                {/* Top Sân */}
                <Card className="p-0 overflow-hidden shadow-md border-slate-200">
                    <div className="p-5 border-b border-slate-100 bg-slate-50">
                        <h3 className="font-black text-slate-800 text-lg">Top Sân Được Đặt Nhiều Nhất</h3>
                        <p className="text-xs text-slate-500 font-medium tracking-wide">Hiệu suất hoạt động của từng sân</p>
                    </div>
                    <div className="p-5">
                        {isCourtsLoading ? (
                            <div className="space-y-4">
                                {[1,2,3].map(i => <div key={i} className="h-12 bg-slate-100 animate-pulse rounded-lg"></div>)}
                            </div>
                        ) : popularCourts.length === 0 ? (
                            <div className="py-8 text-center text-slate-400 font-medium">Chưa có dữ liệu lượt đặt các sân</div>
                        ) : (
                            <div className="space-y-4">
                                {popularCourts.map((court, idx) => (
                                    <div key={idx} className="relative">
                                        <div className="flex justify-between text-sm font-bold text-slate-800 mb-1">
                                            <span>{idx + 1}. {court.courtName}</span>
                                            <span>{court.bookingCount} lượt</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                            <div 
                                                className={`h-2.5 rounded-full ${idx === 0 ? 'bg-emerald-500' : idx === 1 ? 'bg-blue-500' : 'bg-slate-400'}`} 
                                                style={{ width: `${Math.max(10, (court.bookingCount / popularCourts[0].bookingCount) * 100)}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-[10px] text-slate-500 font-semibold mt-1 text-right uppercase">
                                            doanh thu: <span className="text-emerald-600">{court.revenue.toLocaleString()}đ</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Card>

                {/* Insight / Tips */}
                <Card className="p-6 bg-slate-900 border-none shadow-xl text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute right-[-40px] top-[-40px] w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute left-[-20px] bottom-[-20px] w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black mb-3">Insights AI</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">
                            Dựa trên phân tích xu hướng 30 ngày qua, chúng tôi nhận thấy các khung giờ từ <span className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded">17:00 - 20:00</span> đang có tỉ lệ lấp đầy đạt <span className="text-emerald-400 font-bold">92%</span>. Tuy nhiên, các khung giờ sáng <span className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded">08:00 - 10:00</span> chỉ ở mức <span className="text-rose-400 font-bold">25%</span>.
                        </p>
                        
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                                <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-sm text-white">Chương trình khuyến mãi</h4>
                                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Nên tạo mã giảm giá 15% cho các <br/> booking vào buổi sáng cuối tuần.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                                <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-sm text-white">Chống Hủy Sân</h4>
                                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Tỉ lệ hủy sân hiện tại là ~10%. Bạn nên bật tính năng yêu cầu cọc tiền (Ít nhất 30%) khi khách mới đặt.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
