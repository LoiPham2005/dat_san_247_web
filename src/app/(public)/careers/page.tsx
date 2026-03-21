"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Briefcase, MapPin, Clock, ArrowRight, Zap, Coffee, Laptop, HeartPulse, GraduationCap, ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const PERKS = [
    { icon: Laptop, title: "Trang thiết bị xịn xò", desc: "Được cấp Macbook Pro M3 và màn hình rời để làm việc với hiệu suất cao nhất." },
    { icon: Coffee, title: "Cà phê & Snack miễn phí", desc: "Pantry luôn ngập tràn đồ ăn nhẹ, cà phê rang xay và trà túi lọc 24/7." },
    { icon: Zap, title: "Môi trường linh hoạt", desc: "Thời gian làm việc linh động, cho phép Work From Home (WFH) 2 ngày/tuần." },
    { icon: HeartPulse, title: "Đặc quyền thể thao", desc: "Thẻ California Fitness miễn phí và đặt sân DatSan247 thả ga 0 đồng." },
    { icon: GraduationCap, title: "Phát triển bản thân", desc: "Tài trợ 100% các khóa học chuyên môn và tiếng Anh nâng cao." },
    { icon: Briefcase, title: "Lương thưởng hấp dẫn", desc: "Lương tháng 13, thưởng hiệu quả công việc và Review lương 2 lần/năm." }
];

const JOB_OPENINGS = [
    {
        id: "eng-1",
        title: "Senior Fullstack Engineer (Next.js/Node.js)",
        department: "Engineering",
        location: "Hồ Chí Minh, Việt Nam",
        type: "Toàn thời gian",
        isHot: true,
        tags: ["React", "Node.js", "PostgreSQL", "Redis"]
    },
    {
        id: "eng-2",
        title: "Mobile App Developer (Flutter/Dart)",
        department: "Engineering",
        location: "Hà Nội / Hồ Chí Minh",
        type: "Toàn thời gian",
        isHot: false,
        tags: ["Flutter", "iOS", "Android", "Firebase"]
    },
    {
        id: "prd-1",
        title: "Product Manager",
        department: "Product",
        location: "Hồ Chí Minh, Việt Nam",
        type: "Toàn thời gian",
        isHot: true,
        tags: ["Agile", "UX/UI", "Data Analytics"]
    },
    {
        id: "mkt-1",
        title: "Performance Marketing Executive",
        department: "Marketing",
        location: "Hồ Chí Minh, Việt Nam",
        type: "Toàn thời gian",
        isHot: false,
        tags: ["Facebook Ads", "Google Ads", "SEO"]
    },
    {
        id: "sls-1",
        title: "Chuyên viên Phát triển Đối Tác (B2B Sales)",
        department: "Sales & Partnership",
        location: "Hà Nội, Việt Nam",
        type: "Toàn thời gian",
        isHot: false,
        tags: ["B2B", "Cơ sở vật chất", "Đàm phán"]
    }
];

export default function CareersPage() {
    const [filter, setFilter] = useState("All");

    const departments = ["All", ...Array.from(new Set(JOB_OPENINGS.map(job => job.department)))];
    
    const filteredJobs = JOB_OPENINGS.filter(job => filter === "All" || job.department === filter);

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            
            {/* Hero Section */}
            <div className="bg-slate-900 border-b-8 border-primary relative overflow-hidden">
                {/* Decorative background grid */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, white 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                
                {/* Glow effects */}
                <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-primary/30 rounded-full blur-[100px] -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[80px] translate-y-1/2"></div>
                
                <div className="container px-4 max-w-6xl mx-auto py-20 md:py-32 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-emerald-300 border border-white/20 font-bold text-sm mb-8 backdrop-blur-md">
                        <Zap className="w-4 h-4 text-emerald-400" /> Chúng tôi đang tuyển dụng!
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-8 leading-tight max-w-4xl mx-auto">
                        Cùng Bạn Xây Dựng <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Kỷ Nguyên Thể Thao Mới</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                        DatSan247 đang trên hành trình chuyển đổi số 100% ngành dịch vụ thể thao. Nếu bạn đam mê công nghệ và muốn tạo ra những sản phẩm có sức ảnh hưởng thật sự, đội ngũ của chúng tôi luôn chào đón bạn.
                    </p>
                    <div className="flex justify-center">
                        <Button 
                            size="lg" 
                            className="h-14 px-10 rounded-2xl font-bold text-lg bg-primary hover:bg-emerald-600 shadow-lg shadow-primary/30 text-white"
                            onClick={() => {
                                document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Xem Cực Phẩm Vị Trí
                        </Button>
                    </div>
                </div>
            </div>

            {/* Culture & Perks Section */}
            <div className="container px-4 max-w-6xl mx-auto py-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Tại Sao Chọn Làm Việc Tại DatSan247?</h2>
                    <p className="text-lg text-slate-500 font-medium">Chúng tôi hiểu rằng những con người xuất chúng cần một môi trường làm việc tốt nhất để nuôi dưỡng sự sáng tạo.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {PERKS.map((perk, index) => (
                        <Card key={index} className="border-0 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 bg-white group">
                            <CardContent className="p-8">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-6 shadow-sm">
                                    <perk.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-3">{perk.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{perk.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Highlight Statistic section */}
            <div className="py-16 bg-emerald-50 border-y border-emerald-100">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-emerald-200">
                        <div>
                            <p className="text-4xl md:text-5xl font-black text-emerald-600 mb-2">35+</p>
                            <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest">Thành Viên</p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl font-black text-emerald-600 mb-2">26</p>
                            <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest">Tuổi Trung Bình</p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl font-black text-emerald-600 mb-2">02</p>
                            <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest">Văn Phòng Lớn</p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl font-black text-emerald-600 mb-2">10M+</p>
                            <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest">Người Dùng HT</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Open Positions Section */}
            <div id="open-positions" className="container px-4 max-w-5xl mx-auto py-20 scroll-mt-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Vị Trí Đang Mở</h2>
                        <p className="text-lg text-slate-500 font-medium">Khám phá cơ hội nghề nghiệp phù hợp với năng lực của bạn.</p>
                    </div>
                    
                    {/* Minimalist Search box placeholder */}
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Tiêu đề việc làm..." 
                            className="h-12 w-full md:w-64 pl-12 pr-4 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 shadow-sm"
                        />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {departments.map(dept => (
                        <button
                            key={dept}
                            onClick={() => setFilter(dept)}
                            className={cn(
                                "px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300",
                                filter === dept
                                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                            )}
                        >
                            {dept}
                        </button>
                    ))}
                </div>

                {/* Jobs List */}
                <div className="space-y-4">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <div 
                                key={job.id} 
                                className="group bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <p className="text-sm font-bold text-primary uppercase tracking-widest">{job.department}</p>
                                        {job.isHot && (
                                            <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-[10px] font-black uppercase rounded animate-pulse">Hot</span>
                                        )}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-primary transition-colors mb-4 leading-tight">
                                        {job.title}
                                    </h3>
                                    
                                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 mb-4 md:mb-0">
                                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300 hidden md:block"></span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.type}</span>
                                    </div>

                                    {/* Sub Tags - only visible on larger screens easily, or wrapping */}
                                    <div className="hidden md:flex flex-wrap items-center gap-2 mt-4">
                                        {job.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-600 rounded-lg text-xs font-bold">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="w-full md:w-auto shrink-0 flex items-center justify-end">
                                    <div className="hidden md:flex w-12 h-12 rounded-full border border-slate-200 items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                    </div>
                                    {/* Mobile apply button */}
                                    <Button className="md:hidden w-full h-12 rounded-xl font-bold bg-slate-900 text-white">
                                        Ứng Tuyển
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center bg-white rounded-[2rem] border border-slate-200">
                            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-xl font-bold text-slate-700">Hiện tại chưa có vị trí trống cho phòng ban này</p>
                            <p className="text-slate-500 font-medium mt-2">Vui lòng quay lại sau hoặc gửi CV trực tiếp cho chúng tôi qua email HR.</p>
                        </div>
                    )}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-10 md:p-16 text-center text-white relative flex flex-col items-center overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                    <h2 className="text-3xl md:text-5xl font-black mb-4 relative z-10 leading-tight">Không tìm thấy vị trí phù hợp?</h2>
                    <p className="text-lg text-slate-300 font-medium mb-10 max-w-2xl relative z-10 leading-relaxed">
                        Đừng lo, chúng tôi luôn tìm kiếm những tài năng xuất chúng. Hãy gửi CV của bạn và cho chúng tôi thấy bạn có thể tạo ra giá trị gì cho DatSan247.
                    </p>
                    <Button size="lg" className="h-14 px-8 rounded-2xl font-bold text-lg bg-white text-slate-900 hover:bg-slate-100 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] relative z-10">
                        Gửi Open-Application
                    </Button>
                </div>

            </div>
        </div>
    );
}
