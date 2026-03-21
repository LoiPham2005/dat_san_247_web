"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Card, CardContent } from '@/components/common/Card';
import { Trophy, Target, Zap, ShieldCheck, Heart, Map, Sparkles, MoveRight, Users, Activity } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function AboutPage() {
    const router = useRouter();

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-900 border-b-8 border-primary">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                </div>
                {/* Glow effects */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/40 rounded-full blur-[128px] pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] pointer-events-none"></div>

                <div className="container px-4 md:px-8 max-w-7xl mx-auto position-relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md mb-8">
                        <span className="flex w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">Câu chuyện của chúng tôi</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-8 leading-tight">
                        Cách Mạng Hóa <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary">Thể Thao Phong Trào</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
                        DatSan247 không chỉ là nền tảng đặt sân. Chúng tôi là cầu nối giữa niềm đam mê thể thao và trải nghiệm tổ chức chuyên nghiệp, tiện lợi bậc nhất Việt Nam.
                    </p>
                </div>
            </section>

            {/* Stats section */}
            <section className="py-12 bg-white -mt-8 relative z-20">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 p-8 md:p-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-slate-100">
                            {[
                                { label: 'Sân bãi đối tác', value: '2,500+', icon: Map },
                                { label: 'Khách hàng', value: '150K+', icon: Users },
                                { label: 'Lượt Booking đặt', value: '2.5Tr+', icon: Activity },
                                { label: 'Đánh giá 5 sao', value: '98%', icon: Heart },
                            ].map((stat, i) => (
                                <div key={i} className="text-center px-4">
                                    <div className="mx-auto w-12 h-12 bg-emerald-50 text-primary rounded-2xl flex items-center justify-center mb-4">
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">{stat.value}</h3>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Story & Mission */}
            <section className="py-20 md:py-32">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                                Giải bài toán <br/> <span className="text-primary">"Hôm nay đá sân nào?"</span>
                            </h2>
                            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                                <p>
                                    Từng là những người yêu thể thao, chúng tôi hiểu rõ nỗi bực dọc khi phải cầm điện thoại gọi cho 5-7 chủ sân khác nhau chỉ để nghe câu trả lời: <strong className="text-rose-500 bg-rose-50 px-2 py-0.5 rounded">"Em ơi sân kín lịch rồi"</strong>.
                                </p>
                                <p>
                                    DatSan247 ra đời từ chính sự thất vọng đó, với khát vọng số hóa 100% ngành dịch vụ sân bãi thể thao. Giờ đây, bạn có thể nhìn thấu "lịch trống" của hàng ngàn sân bóng, sân cầu lông trên toàn thành phố và đặt chỗ ngay chớp mắt.
                                </p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Button size="lg" className="rounded-2xl h-14 px-8 font-bold text-lg shadow-lg shadow-primary/20" onClick={() => router.push('/')}>
                                    Tìm sân ngay <MoveRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/10 -rotate-6 rounded-[3rem] scale-105 pointer-events-none"></div>
                            <div className="absolute inset-0 bg-indigo-500/10 rotate-3 rounded-[3rem] scale-105 pointer-events-none"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop" 
                                alt="Sport Spirit" 
                                className="relative z-10 rounded-[3rem] object-cover w-full h-[500px] shadow-2xl border-4 border-white"
                            />
                            
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-slate-100 animate-bounce group" style={{ animationDuration: '3s' }}>
                                <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
                                    <Sparkles className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Cam kết</p>
                                    <p className="text-xl font-black text-slate-800">100% Tiện lợi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 md:py-32 bg-slate-50 border-y border-slate-100">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Giá Trị Chúng Tôi Mang Lại</h2>
                        <p className="text-lg text-slate-500 font-medium">Hệ sinh thái toàn diện, cân bằng lợi ích hoàn hảo giữa người chơi thể thao và đơn vị kinh doanh sân bãi.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: "Nhanh Chóng & Tức Thời",
                                desc: "Dữ liệu lịch trống được đồng bộ Real-time. Chạm tay là có sân, thanh toán trực tuyến trong 30 giây không cần chờ đợi xác nhận thủ công."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Minh Bạch & Uy Tín",
                                desc: "Hệ thống đánh giá chân thực từ những người đã trải nghiệm. Mọi giao dịch tài chính đều được bảo lưu, hỗ trợ hoàn hủy rõ ràng."
                            },
                            {
                                icon: Trophy,
                                title: "Nâng Tầm Quản Trị",
                                desc: "Giúp chủ sân tối ưu hóa công suất khai thác từ 60% lên 95%, tự động hóa quy trình quản lý dòng tiền, chống thất thoát doanh thu."
                            }
                        ].map((item, i) => (
                            <Card key={i} className="bg-white border-0 shadow-xl shadow-slate-200/40 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300">
                                <CardContent className="p-8 space-y-6">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
                        {/* Abstract shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-[80px]"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/30 rounded-full blur-[80px]"></div>
                        
                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <Target className="w-16 h-16 text-primary mx-auto mb-6" />
                            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Bạn Đã Sẵn Sàng Ra Sân Hôm Nay Chưa?</h2>
                            <p className="text-lg text-slate-300 font-medium mb-10">Tìm kiếm sân bãi yêu thích chỉ với một vài thao tác đơn giản. DatSan247 luôn đồng hành cùng sức khỏe của bạn.</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button size="lg" className="h-14 px-8 rounded-2xl font-bold text-lg bg-white text-slate-900 hover:bg-slate-100 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] w-full sm:w-auto" onClick={() => router.push('/')}>
                                    Đặt Sân Ngay
                                </Button>
                                <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl font-bold text-lg border-2 border-white/20 text-white bg-transparent hover:bg-white/10 w-full sm:w-auto">
                                    Trở Thành Đối Tác
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
