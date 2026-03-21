"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Calendar, User, Tag, ChevronRight, Search, TrendingUp, Sparkles, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const CATEGORIES = ["Tất Cả", "Kiến Thức Bóng Đá", "Cầu Lông", "Dinh Dưỡng", "Giải Đấu", "Cẩm Nang", "Tin Tức DatSan247"];

const FEATURED_POST = {
    id: "featured-1",
    title: "10 Kỹ Thuật Chạy Chỗ Sân 5 Người Bắt Buộc Phải Biết Cho Dân Phủi",
    excerpt: "Sân 5 người đòi hỏi tốc độ, thể lực và đặc biệt là khả năng chạy chỗ liên tục. Nếu bạn muốn kiểm soát thế trận và kiến tạo nhiều cơ hội hơn, đây là những bí quyết không thể bỏ qua...",
    category: "Kiến Thức Bóng Đá",
    author: "HLV Minh Trần",
    date: "10/10/2026",
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=1200&auto=format&fit=crop"
};

const LATEST_POSTS = [
    {
        id: "post-1",
        title: "Kinh nghiệm chọn giày cầu lông cho người mới chơi",
        excerpt: "Giày cầu lông không chỉ giúp bạn di chuyển linh hoạt mà còn bảo vệ khớp gối. Hướng dẫn chọn giày phù hợp với từng dáng bàn chân.",
        category: "Cầu Lông",
        author: "Lê Minh Tuấn",
        date: "12/10/2026",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "post-2",
        title: "Ăn gì trước và sau khi đá bóng để phục hồi thể lực nhanh nhất?",
        excerpt: "Dinh dưỡng đóng vai trò quyết định đến 40% phong độ trên sân. Một khẩu phần ăn chuẩn khoa học sẽ giúp bạn bứt tốc mà không lo cạn sức.",
        category: "Dinh Dưỡng",
        author: "Bác Sĩ Nam",
        date: "08/10/2026",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "post-3",
        title: "DatSan247 ra mắt tính năng 'Tự tạo giải đấu mini' cho các hội nhóm",
        excerpt: "Giờ đây các chủ đội bóng có thể tự tổ chức luân lưu, vòng bảng, tính điểm tự động ngay trên nền tảng DatSan247 hoàn toàn miễn phí.",
        category: "Tin Tức DatSan247",
        author: "Hệ Thống",
        date: "05/10/2026",
        image: "https://images.unsplash.com/photo-1551280857-2b9bbe520442?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "post-4",
        title: "Cách xử lý chấn thương lật cổ chân ngay khi đang thi đấu",
        excerpt: "Lật sơ mi hay lật cổ chân là chấn thương phổ biến nhất. Học cách sơ cứu chuẩn RICE để tránh để lại di chứng đáng tiếc.",
        category: "Cẩm Nang",
        author: "Nhật Anh",
        date: "02/10/2026",
        image: "https://images.unsplash.com/photo-1588691880998-3f5109b0b14c?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "post-5",
        title: "Khai mạc Siêu Cúp Sân 7 Thủ Đô Autumn 2026 với giải thưởng trăm triệu",
        excerpt: "Giải đấu lớn nhất mùa thu hội tụ 32 đội bóng tranh tài nảy lửa tại cụm sân Vipe Cầu Giấy đã chính thức khởi tranh.",
        category: "Giải Đấu",
        author: "BTV Thể Thao",
        date: "28/09/2026",
        image: "https://images.unsplash.com/photo-1556816723-1ce827b9ef96?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "post-6",
        title: "Làm sao để sút bóng có lực cháy lưới như Roberto Carlos?",
        excerpt: "Phân tích sinh cơ học của một cú sút mu chính diện. Đặt trụ thế nào, tiếp xúc bóng ra sao để có trái bóng bay với vận tốc 120km/h.",
        category: "Kiến Thức Bóng Đá",
        author: "HLV Minh Trần",
        date: "25/09/2026",
        image: "https://images.unsplash.com/photo-1518605368461-1e967a5b180d?q=80&w=800&auto=format&fit=crop"
    }
];

export default function BlogPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("Tất Cả");

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            
            {/* Header Area */}
            <div className="bg-white border-b border-slate-200">
                <div className="container px-4 max-w-7xl mx-auto py-12 md:py-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
                        <Sparkles className="w-4 h-4" /> Kênh Blog & Tin Tức Thể Thao
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
                        Khơi Dậy Năng Lượng Đam Mê
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-10">
                        Cập nhật mẹo kỹ thuật chuyên sâu, tin tức giải đấu và bí kíp rèn luyện sức khỏe mỗi ngày cùng The DatSan247 Blog.
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center bg-white border-2 border-slate-200 rounded-full p-2 focus-within:border-primary focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                <Search className="w-5 h-5 text-slate-400" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm bài viết, kỹ thuật..." 
                                className="flex-1 bg-transparent border-none outline-none px-4 font-medium text-slate-700 placeholder:text-slate-400"
                            />
                            <Button className="h-12 px-8 rounded-full font-bold shadow-lg shadow-primary/20">Tìm Kiếm</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container px-4 max-w-7xl mx-auto pt-12 md:pt-16">
                
                {/* Featured Post */}
                <div className="mb-16 md:mb-24">
                    <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900 mb-8 tracking-tight">
                        <TrendingUp className="w-8 h-8 text-rose-500" /> Tiêu Điểm Trong Tuần
                    </h2>
                    
                    <div className="relative group rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl cursor-pointer" onClick={() => router.push(`/blog/${FEATURED_POST.id}`)}>
                        <div className="absolute inset-0">
                            <img src={FEATURED_POST.image} alt={FEATURED_POST.title} className="w-full h-[500px] md:h-[600px] object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                        </div>
                        
                        <div className="relative h-[500px] md:h-[600px] flex flex-col justify-end p-8 md:p-16">
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span className="px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full">{FEATURED_POST.category}</span>
                                <span className="flex items-center gap-2 text-slate-300 text-sm font-medium"><Calendar className="w-4 h-4" /> {FEATURED_POST.date}</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight group-hover:text-primary-100 transition-colors max-w-4xl">
                                {FEATURED_POST.title}
                            </h3>
                            <p className="text-slate-300 text-lg md:text-xl font-medium max-w-3xl leading-relaxed mb-8 hidden md:block">
                                {FEATURED_POST.excerpt}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-white">
                                    <User className="w-6 h-6" />
                                </div>
                                <div className="text-white">
                                    <p className="text-sm text-slate-400">Tác giả</p>
                                    <p className="font-bold">{FEATURED_POST.author}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Tab */}
                <div className="flex flex-wrap items-center gap-3 mb-12">
                    {CATEGORIES.map(category => (
                        <button 
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={cn(
                                "px-6 py-3 rounded-full font-bold text-sm transition-all duration-300",
                                activeCategory === category 
                                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105" 
                                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Latest Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {LATEST_POSTS.map((post, index) => (
                        <Card 
                            key={post.id} 
                            className="bg-white border-0 shadow-[0_2px_20px_rgba(0,0,0,0.04)] rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-transform duration-300 cursor-pointer group flex flex-col"
                            onClick={() => router.push(`/blog/${post.id}`)}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            
                            <CardContent className="p-8 flex-1 flex flex-col">
                                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-4">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" /> {post.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-400" /> {post.author}</span>
                                </div>
                                
                                <h3 className="text-xl font-black text-slate-900 leading-snug mb-4 group-hover:text-primary transition-colors flex-1">
                                    {post.title}
                                </h3>
                                
                                <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                
                                <div className="mt-auto flex items-center font-bold text-primary group-hover:text-emerald-600">
                                    Đọc tiếp <MoveRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Load More Option */}
                <div className="mt-16 text-center">
                    <Button variant="outline" size="lg" className="h-14 px-10 rounded-2xl font-bold text-lg border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900">
                        Xem Thêm Bài Viết
                    </Button>
                </div>
            </div>
            
        </div>
    );
}
