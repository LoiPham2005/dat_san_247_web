"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils/cn';
import { CheckCircle2, Copy, Calendar, Clock, MapPin, QrCode, Home, History, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function CheckoutSuccessPage() {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const [successData, setSuccessData] = useState<any>(null);
    
    useEffect(() => {
        const data = localStorage.getItem('booking_success');
        if (data) {
            setSuccessData(JSON.parse(data));
        }
    }, []);

    if (!successData) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Đang tải kết quả đặt sân...</div>;

    const mainBookingCode = successData.results?.[0]?.booking_code || "N/A";

    const handleCopy = () => {
        navigator.clipboard.writeText(mainBookingCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Grouping slots for display
    const groupedByCourt: Record<string, any[]> = {};
    successData.slots.forEach((s: any) => {
        if (!groupedByCourt[s.courtName]) groupedByCourt[s.courtName] = [];
        groupedByCourt[s.courtName].push(s);
    });

    const getNextSlotTime = (time: string) => {
        const [h, m] = time.split(':').map(Number);
        let nm = m + 30;
        let nh = h;
        if (nm >= 60) { nm = 0; nh += 1; }
        return `${nh.toString().padStart(2, '0')}:${nm.toString().padStart(2, '0')}`;
    };

    const displayData: Record<string, { ranges: string[], totalHours: number }> = {};
    Object.keys(groupedByCourt).forEach(courtName => {
        const sorted = [...groupedByCourt[courtName]].sort((a, b) => a.time.localeCompare(b.time));
        const merged: { start: string, end: string }[] = [];
        let totalH = 0;
        if (sorted.length > 0) {
            let current = { start: sorted[0].time, end: getNextSlotTime(sorted[0].time) };
            totalH += 0.5;
            for (let i = 1; i < sorted.length; i++) {
                const sStart = sorted[i].time;
                const sEnd = getNextSlotTime(sStart);
                totalH += 0.5;
                if (sStart === current.end) { current.end = sEnd; }
                else { merged.push(current); current = { start: sStart, end: sEnd }; }
            }
            merged.push(current);
        }
        displayData[courtName] = { ranges: merged.map(m => `${m.start} - ${m.end}`), totalHours: totalH };
    });

    const isRecurring = successData.mode === 'recurring';

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col justify-center items-center animate-in zoom-in-95 duration-500">
            
            <div className="w-full max-w-lg mb-8 text-center space-y-4">
                <div className={cn("mx-auto w-24 h-24 rounded-full flex items-center justify-center shadow-inner relative", isRecurring ? "bg-blue-100" : "bg-emerald-100")}>
                    <div className={cn("absolute inset-0 rounded-full animate-ping opacity-20", isRecurring ? "bg-blue-400" : "bg-emerald-400")}></div>
                    <CheckCircle2 className={cn("w-12 h-12 relative z-10", isRecurring ? "text-blue-500" : "text-emerald-500")} />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    {isRecurring ? "Gửi Yêu Cầu Thành Công!" : "Đặt Sân Thành Công!"}
                </h1>
                <p className="text-slate-500 font-medium px-4 leading-relaxed">
                    {isRecurring 
                        ? "Yêu cầu đặt sân cố định của bạn đã được gửi tới chủ sân. Vui lòng chờ phản hồi trong mục lịch sử."
                        : `Giao dịch của bạn đã được xác nhận. ${successData.results.length > 1 ? `Bạn có ${successData.results.length} mã vé cho các sân khác nhau.` : 'Mã vé của bạn đã sẵn sàng.'}`
                    }
                </p>
            </div>

            <Card className="w-full max-w-lg rounded-[2rem] border-0 shadow-xl overflow-hidden mb-8">
                
                <div className={cn("p-8 text-center text-white relative overflow-hidden", isRecurring ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-primary to-indigo-600")}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <p className="text-white/80 font-bold uppercase tracking-widest text-[10px] mb-2">
                        {isRecurring ? "Yêu Cầu Chờ Duyệt" : "Mã Check-in Bắt Buộc"}
                    </p>
                    <div 
                        className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl py-4 px-6 inline-flex items-center gap-4 cursor-pointer hover:bg-white/30 transition-colors group"
                        onClick={handleCopy}
                    >
                        <span className="text-3xl font-black font-mono tracking-wider">{mainBookingCode}</span>
                        {copied ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                        ) : (
                            <Copy className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                        )}
                    </div>
                </div>

                <div className="bg-white p-2">
                    <div className="border border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50 space-y-5">
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-white text-slate-500 rounded-xl border border-slate-100 shadow-sm shrink-0">
                                <QrCode className="w-5 h-5" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Sân thi đấu</span>
                                <p className="font-bold text-slate-800 text-base truncate">{successData.venue.name}</p>
                                <p className="text-xs font-medium text-slate-500 mt-0.5 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {successData.venue.address}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Loại hình / Ngày</span>
                                <div className="space-y-0.5">
                                    <Badge className={cn("text-[8px] font-black h-4 px-1 leading-none rounded-none shadow-none", isRecurring ? "bg-blue-500" : "bg-emerald-500")}>
                                        {isRecurring ? "CỐ ĐỊNH" : "SÂN LẺ"}
                                    </Badge>
                                    <div className="font-bold text-slate-800 text-sm">
                                        {format(new Date(successData.date), 'dd/MM/yyyy')}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Khung giờ</span>
                                <div className="space-y-1">
                                     {Object.entries(displayData).map(([court, data]) => (
                                         <div key={court} className="text-[9px] font-bold text-slate-600">
                                             {court} ({data.totalHours}h): {data.ranges.join(', ')}
                                         </div>
                                     ))}
                                </div>
                            </div>
                        </div>
                        
                        {isRecurring ? (
                            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-[10px] font-medium text-blue-700 leading-relaxed">
                                * Lưu ý: Chủ sân sẽ liên hệ hoặc duyệt yêu cầu của bạn trong vòng 24h. Bạn không cần thanh toán ngay bây giờ.
                            </div>
                        ) : successData.results.length > 1 && (
                            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-[10px] font-medium text-amber-700">
                                * Lưu ý: Có {successData.results.length} đơn đặt cho các sân khác nhau. Vui lòng xem chi tiết trong Lịch sử.
                            </div>
                        )}
                    </div>
                </div>

            </Card>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
                <Button 
                    variant="outline"
                    className="flex-1 h-14 rounded-2xl font-bold text-lg bg-white"
                    onClick={() => router.push('/bookings')}
                >
                    <History className="w-5 h-5 mr-2" /> Xem Lịch Sử
                </Button>
                <Button 
                    className="flex-1 h-14 rounded-2xl font-bold text-lg shadow-lg"
                    onClick={() => router.push('/')}
                >
                    <Home className="w-5 h-5 mr-2" /> Về Trang Chủ
                </Button>
            </div>
            
            <div className="mt-8 text-center flex items-center gap-2 text-xs font-bold text-slate-400">
                <Zap className="w-4 h-4 text-amber-500" /> Tích tắc giữ chỗ, sức khỏe dài lâu! 
            </div>

        </div>
    );
}

