"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { HelpCircle, ChevronDown, CheckCircle2, MessageSquare, Search, PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const FAQ_CATEGORIES = [
    { id: "all", name: "Tất cả câu hỏi" },
    { id: "booking", name: "Hướng dẫn đặt sân" },
    { id: "payment", name: "Thanh toán & Hoàn tiền" },
    { id: "account", name: "Quản lý Tài khoản" },
    { id: "partner", name: "Đối tác & Chủ sân" }
];

const FAQS = [
    {
        id: "q1",
        category: "booking",
        question: "Làm thế nào để tìm và đặt một sân bóng đá?",
        answer: "Cực kỳ đơn giản! Bạn chỉ cần nhập khu vực hoặc tên cụm sân muốn đá vào ô tìm kiếm ở Trang chủ. Hệ thống sẽ hiển thị danh sách sân kèm khoảng cách. Chọn một sân ưng ý -> Xem Lịch Bao Quát -> Click vào ô giờ trống -> Xác nhận thanh toán là xong."
    },
    {
        id: "q2",
        category: "payment",
        question: "DatSan247 hỗ trợ những phương thức thanh toán nào?",
        answer: "Chúng tôi hỗ trợ 100% thanh toán điện tử không tiền mặt thông qua cổng VNPAY (ATM, Visa/Master, quét QR các app ngân hàng nội địa), Ví điện tử MoMo, và ZaloPay. Thao tác siêu tốc trong 30 giây."
    },
    {
        id: "q3",
        category: "booking",
        question: "Tôi lỡ bận đột xuất, có được hủy sân hay không?",
        answer: "Có thể! Bạn vào mục 'Quản lý lịch đặt' trên tài khoản cá nhân, chọn lịch cần hủy và bấm Hủy. Nếu thời điểm hủy trước giờ đá >= 12 Tiếng, bạn sẽ được hoàn tiền 100%. Nếu < 12 Tiếng, hệ thống sẽ trừ phí phạt dựa vào quy định riêng của từng chủ sân (thường là mất cọc)."
    },
    {
        id: "q4",
        category: "payment",
        question: "Hủy sân hợp lệ thì bao lâu nhận lại được tiền?",
        answer: "Hệ thống sẽ ghi nhận Lệnh Hoàn Tiền ngay lập tức. Tuy nhiên, thời gian tiền 'ting ting' về tài khoản ngân hàng ngân hàng của bạn phụ thuộc vào quy định cổng thanh toán (Thông thường từ 2 - 5 ngày làm việc). Vui lòng kiên nhẫn nhé."
    },
    {
        id: "q5",
        category: "account",
        question: "Tôi bị quên mật khẩu thì phải làm sao?",
        answer: "Bạn ra trang Đăng nhập, bấm vào 'Quên mật khẩu'. Nhập số điện thoại đã đăng ký, hệ thống sẽ gửi một mã OTP qua SMS. Bạn nhập OTP và tạo lại mật khẩu mới mới."
    },
    {
        id: "q6",
        category: "partner",
        question: "Tôi có 3 cụm sân đang trống, muốn hợp tác đưa lên DatSan247?",
        answer: "Tuyệt vời, chào mừng bạn trở thành đối tác. Xin vui lòng di chuyển xuống chân trang (Footer), chọn mục 'Dành cho Chủ Cơ Sở' và điền vào form đăng ký. Bộ phận phát triển đối tác (B2B) sẽ liên lạc trực tiếp để hướng dẫn bạn đăng sân trong vòng 24H."
    },
    {
        id: "q7",
        category: "booking",
        question: "Tôi có thể đặt sân cố định hàng tháng được không?",
        answer: "Chức năng Đặt sân Theo Tháng đang được chúng tôi ráo riết phát triển. Hiện tại, bạn có thể gọi điện/nhắn qua App trực tiếp đến Chủ sân để báo với họ khóa lịch cố định cho đội của bạn nhé."
    }
];

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>("q1"); // Mặc định mở cái đầu tiên

    // Process filtering
    const filteredFaqs = FAQS.filter(faq => {
        const matchCategory = activeCategory === "all" || faq.category === activeCategory;
        const matchSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const toggleOpen = (id: string) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            
            {/* Hero Section */}
            <div className="bg-slate-900 border-b-8 border-primary relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/20 to-transparent opacity-50"></div>
                
                <div className="container px-4 max-w-4xl mx-auto py-16 md:py-24 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-200 border border-white/10 font-bold text-sm mb-6 backdrop-blur-md">
                        <HelpCircle className="w-4 h-4" /> FAQ Center
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8 leading-tight">
                        Cách Chúng Tôi Hỗ Trợ Bạn
                    </h1>
                    
                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto group">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center bg-white border-2 border-slate-200 rounded-2xl p-2 focus-within:border-primary focus-within:shadow-lg transition-all text-left">
                            <Search className="w-6 h-6 text-slate-400 ml-4 shrink-0" />
                            <input 
                                type="text" 
                                placeholder="Gõ từ khóa để tìm nhanh (Ví dụ: hoàn tiền...)" 
                                className="flex-1 bg-transparent border-none outline-none px-4 py-3 h-12 font-medium text-slate-700 placeholder:text-slate-400 text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <Button 
                                    variant="ghost" 
                                    className="px-4 text-slate-400 hover:text-slate-700"
                                    onClick={() => setSearchQuery("")}
                                >
                                    Xóa
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container px-4 max-w-5xl mx-auto pt-12 md:pt-16">
                
                {/* Category Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                    {FAQ_CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 transform",
                                activeCategory === cat.id
                                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                            )}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* FAQ Accordion List */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-6 md:p-10 max-w-4xl mx-auto">
                    {filteredFaqs.length > 0 ? (
                        <div className="space-y-4">
                            {filteredFaqs.map((faq) => {
                                const isOpen = expandedId === faq.id;
                                return (
                                    <div 
                                        key={faq.id} 
                                        className={cn(
                                            "border-2 rounded-2xl transition-all duration-300 overflow-hidden",
                                            isOpen ? "border-primary/50 bg-primary/5" : "border-slate-100 bg-white hover:border-slate-200"
                                        )}
                                    >
                                        <button 
                                            className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left focus:outline-none"
                                            onClick={() => toggleOpen(faq.id)}
                                        >
                                            <div className="flex items-start gap-4 pr-6">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm transition-colors",
                                                    isOpen ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                                                )}>
                                                    Q
                                                </div>
                                                <h3 className={cn(
                                                    "font-bold text-lg md:text-xl transition-colors pt-0.5",
                                                    isOpen ? "text-primary" : "text-slate-900"
                                                )}>
                                                    {faq.question}
                                                </h3>
                                            </div>
                                            <div className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white shadow-sm border border-slate-100 transition-transform duration-300",
                                                isOpen ? "rotate-180" : "rotate-0"
                                            )}>
                                                <ChevronDown className={cn("w-5 h-5", isOpen ? "text-primary" : "text-slate-400")} />
                                            </div>
                                        </button>
                                        
                                        <div 
                                            className={cn(
                                                "px-5 md:px-6 pb-6 pt-0 text-slate-600 font-medium text-[16px] leading-relaxed transition-all duration-300 pl-[4.5rem] md:pl-20 border-t-0",
                                                isOpen ? "block opacity-100" : "hidden opacity-0"
                                            )}
                                        >
                                            <p>{faq.answer}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <HelpCircle className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                            <h3 className="text-2xl font-black text-slate-700 mb-2">Không tìm thấy câu trả lời</h3>
                            <p className="text-slate-500 font-medium">Bạn hãy thử từ khóa khác hoặc liên hệ bộ phận hỗ trợ</p>
                            <Button 
                                variant="outline" 
                                className="mt-6 border-slate-300 text-slate-700 font-bold"
                                onClick={() => {
                                    setSearchQuery("");
                                    setActiveCategory("all");
                                }}
                            >
                                Xóa bộ lọc
                            </Button>
                        </div>
                    )}
                </div>

                {/* Still Need Help Box */}
                <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="rounded-[2rem] border-0 bg-indigo-50 shadow-inner group cursor-pointer hover:bg-indigo-100 transition-colors">
                        <CardContent className="p-8 flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white text-indigo-500 flex items-center justify-center shadow-sm shrink-0">
                                <MessageSquare className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 text-xl mb-1">Live Chat</h4>
                                <p className="text-slate-600 font-medium">Nhân viên trực tổng đài 24/7 chờ đợi tin nhắn của bạn.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-[2rem] border-0 bg-rose-50 shadow-inner group cursor-pointer hover:bg-rose-100 transition-colors">
                        <CardContent className="p-8 flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white text-rose-500 flex items-center justify-center shadow-sm shrink-0">
                                <PhoneCall className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 text-xl mb-1">Hotline VIP</h4>
                                <p className="text-slate-600 font-medium">Bấm gọi ngay 1900 8888 nếu bạn cần xử lý khẩn cấp.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
            </div>
        </div>
    );
}
