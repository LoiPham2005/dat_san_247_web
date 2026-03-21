"use client";

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { DateRangePicker } from '@/components/common/DateRangePicker';
import { useOwnerAnalytics } from '../hooks/useOwnerAnalytics';
import { subDays, startOfToday, endOfToday, format } from 'date-fns';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip as RechartsTooltip, ResponsiveContainer, 
    BarChart, Bar, LineChart, Line, Legend 
} from 'recharts';
import { 
    TrendingUp, ArrowLeft, Download, Filter, 
    Calendar, LayoutGrid, LayoutList, BarChart3, LineChart as LucideLineChart, AreaChart as LucideAreaChart 
} from 'lucide-react';
import Link from 'next/link';

export const OwnerRevenueAnalyticsDetailed = ({ venueId }: { venueId: string }) => {
    const [period, setPeriod] = useState<string>('30_days');
    const [startDate, setStartDate] = useState<Date>(subDays(startOfToday(), 29));
    const [endDate, setEndDate] = useState<Date>(endOfToday());
    const [chartType, setChartType] = useState<'area' | 'bar' | 'line'>('area');
    const [showTable, setShowTable] = useState(false);
    
    const { summary, revenueChart, isRevenueLoading } = useOwnerAnalytics(
        venueId, 
        period, 
        format(startDate, 'yyyy-MM-dd'), 
        format(endDate, 'yyyy-MM-dd')
    );

    const periods = [
        { label: '7 ngày qua', value: '7_days', days: 6 },
        { label: '30 ngày qua', value: '30_days', days: 29 },
        { label: '90 ngày qua', value: '90_days', days: 89 },
    ];

    const chartConfig = useMemo(() => {
        const configs = {
            area: {
                component: AreaChart,
                dataComponent: Area,
                icon: LucideAreaChart,
                props: {
                    stroke: '#10b981',
                    strokeWidth: 3,
                    fillOpacity: 1,
                    fill: "url(#colorRevenueFull)",
                }
            },
            bar: {
                component: BarChart,
                dataComponent: Bar,
                icon: BarChart3,
                props: {
                    fill: '#3b82f6',
                    radius: [4, 4, 0, 0],
                }
            },
            line: {
                component: LineChart,
                dataComponent: Line,
                icon: LucideLineChart,
                props: {
                    stroke: '#8b5cf6',
                    strokeWidth: 3,
                    dot: { r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' },
                    activeDot: { r: 6 },
                }
            }
        };
        return configs[chartType];
    }, [chartType]);

    const ChartComponent = chartConfig.component;
    const DataComponent = chartConfig.dataComponent;

    const renderCustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-white/10 backdrop-blur-md">
                    <p className="font-bold border-b border-white/10 pb-2 mb-2">{new Date(label).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <div className="space-y-1">
                        <p className="text-emerald-400 font-bold text-base flex justify-between gap-8">
                            <span>Doanh thu:</span>
                            <span>{payload[0].value.toLocaleString()} đ</span>
                        </p>
                        {payload[1] && (
                            <p className="text-blue-400 font-bold text-sm flex justify-between gap-8">
                                <span>Lượt đặt:</span>
                                <span>{payload[1].value} lượt</span>
                            </p>
                        )}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/owner/analytics">
                        <Button variant="outline" size="sm" className="rounded-xl px-3 hover:bg-slate-100 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Chi Tiết Doanh Thu</h1>
                        <p className="text-slate-500 font-medium">Phân tích chuyên sâu lịch sử đặt sân và dòng tiền.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" className="rounded-xl font-bold border-slate-200">
                        <Download className="w-4 h-4 mr-2" /> Xuất Báo Cáo
                    </Button>
                </div>
            </div>

            {/* Filter Hub */}
            <Card className="p-6 border-none shadow-xl bg-white/80 backdrop-blur-xl border border-white/20">
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">Chọn Khoảng Thời Gian</span>
                        <div className="flex flex-wrap gap-2">
                            <DateRangePicker 
                                startDate={startDate} 
                                endDate={endDate} 
                                onChange={(s, e) => {
                                    setStartDate(s);
                                    setEndDate(e);
                                    setPeriod('custom');
                                }} 
                            />
                            <div className="h-11 w-[1px] bg-slate-200 hidden md:block mx-2" />
                            {periods.map(p => (
                                <button
                                    key={p.value}
                                    onClick={() => {
                                        setPeriod(p.value);
                                        setStartDate(subDays(startOfToday(), p.days));
                                        setEndDate(endOfToday());
                                    }}
                                    className={`px-4 h-11 rounded-xl text-xs font-black transition-all ${
                                        period === p.value ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                    }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Kiểu Biểu Đồ</span>
                        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                            {(['area', 'bar', 'line'] as const).map(type => {
                                const Icon = type === 'area' ? LucideAreaChart : type === 'bar' ? BarChart3 : LucideLineChart;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => setChartType(type)}
                                        className={`p-2 rounded-lg transition-all ${
                                            chartType === type ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Chế Độ Hiển Thị</span>
                        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl font-bold text-xs">
                            <button
                                onClick={() => setShowTable(false)}
                                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                                    !showTable ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
                                }`}
                            >
                                <LayoutGrid className="w-4 h-4" /> Biểu Đồ
                            </button>
                            <button
                                onClick={() => setShowTable(true)}
                                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                                    showTable ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
                                }`}
                            >
                                <LayoutList className="w-4 h-4" /> Bảng Số Liệu
                            </button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Main Content Area */}
            {!showTable ? (
                <div className="grid grid-cols-1 gap-6 animate-in fade-in zoom-in-95 duration-500">
                    <Card className="p-8 border-none shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col">
                        <div className="relative z-10 mb-8 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black text-slate-800">Doanh Thu Trong Kỳ</h3>
                                <p className="text-slate-500 font-medium">Phân tích dòng tiền theo ngày dựa trên các booking đã hoàn tất.</p>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tổng Cộng</span>
                                <div className="text-3xl font-black text-emerald-600">
                                    {summary?.totalRevenue.toLocaleString() || 0} <span className="text-sm">₫</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full flex items-center justify-center">
                            {isRevenueLoading ? (
                                <div className="flex flex-col items-center gap-4 text-slate-400 font-bold">
                                    <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                                    Đang tổng hợp dữ liệu...
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <ChartComponent data={revenueChart} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                                        {chartType === 'area' && (
                                            <defs>
                                                <linearGradient id="colorRevenueFull" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                        )}
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis 
                                            dataKey="date" 
                                            tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 600}} 
                                            tickFormatter={(val) => new Date(val).toLocaleDateString('vi-VN', {day: '2-digit', month: 'short'})} 
                                            axisLine={false} 
                                            tickLine={false} 
                                            dy={15} 
                                        />
                                        <YAxis 
                                            tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 600}} 
                                            tickFormatter={(val) => `${val / 1000000}M`} 
                                            axisLine={false} 
                                            tickLine={false} 
                                            dx={-15} 
                                        />
                                        <RechartsTooltip content={renderCustomTooltip} cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '3 3' }} />
                                        <DataComponent dataKey="revenue" {...(chartConfig.props as any)} />
                                    </ChartComponent>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </Card>
                </div>
            ) : (
                <Card className="border-none shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="text-xl font-black text-slate-800">Dữ Liệu Chi Tiết Theo Ngày</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Ngày</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Loại Hình</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Lượt Đặt</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Doanh Thu (₫)</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Trung Bình/Đơn</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[...revenueChart].reverse().map((day, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-4 text-center">
                                            <div className="text-sm font-black text-slate-700">{new Date(day.date).toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit'})}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase">{new Date(day.date).toLocaleDateString('vi-VN', {weekday: 'short'})}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                <span className="text-sm font-bold text-slate-600 text-nowrap">Tổng hợp hệ thống</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className="text-sm font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{day.bookings}</span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className="text-sm font-black text-slate-900">{day.revenue.toLocaleString()}</span>
                                        </td>
                                        <td className="p-4 text-right font-bold text-slate-400 text-sm">
                                            {day.bookings > 0 ? (day.revenue / day.bookings).toLocaleString() : 0} ₫
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Strategy Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <Card className="p-6 bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-none shadow-xl overflow-hidden relative">
                    <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <TrendingUp className="w-8 h-8 mb-4 text-indigo-200" />
                        <h4 className="text-lg font-black mb-1 italic">Dự Báo Tăng Trưởng</h4>
                        <p className="text-sm text-indigo-100 mb-6 font-medium">Dựa trên dữ liệu {periods.find(p => p.value === period)?.label}, dự đoán tuần tới doanh thu có thể tăng <span className="text-emerald-300 font-black">12.5%</span> nếu duy trì tỷ lệ booking hiện tại.</p>
                        <Button className="w-full bg-white text-indigo-700 font-black hover:bg-slate-100 rounded-xl border-none">
                            Xem Chiến Lược <Filter className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                 </Card>

                 {/* Other metric boxes... */}
                 <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                    <Card className="p-6 bg-slate-50 border-slate-200">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cao Điểm Nhất (Ngày)</span>
                        <div className="text-2xl font-black text-slate-800 mt-2">Thứ 7 & Chủ Nhật</div>
                        <p className="text-xs text-slate-500 font-medium mt-1">Đạt công suất sử dụng sân 95%</p>
                    </Card>
                    <Card className="p-6 bg-slate-50 border-slate-200">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tỉ Lệ Chuyển Đổi</span>
                        <div className="text-2xl font-black text-slate-800 mt-2">86%</div>
                        <p className="text-xs text-slate-500 font-medium mt-1">Khách xem sân xong đặt ngay</p>
                    </Card>
                 </div>
            </div>
        </div>
    );
};
