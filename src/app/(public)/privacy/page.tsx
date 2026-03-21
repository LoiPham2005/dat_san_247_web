"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, Server, UserCheck, FileText, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const PRIVACY_SECTIONS = [
    {
        id: "collection",
        title: "1. Thu thập thông tin",
        icon: Eye,
        content: `
Chúng tôi thu thập các thông tin cá nhân của bạn khi bạn đăng ký tài khoản, đặt sân, hoặc tham gia vào các chương trình khuyến mãi. Các thông tin thu thập bao gồm:
- **Thông tin định danh:** Họ và tên, số điện thoại, địa chỉ email.
- **Dữ liệu giao dịch:** Lịch sử đặt sân, thông tin thanh toán (hệ thống không lưu trữ chi tiết thẻ tín dụng/ngân hàng của bạn, mọi giao dịch được mã hóa qua đối tác thanh toán VNPAY/MoMo).
- **Dữ liệu kỹ thuật:** Địa chỉ IP, loại trình duyệt, hệ điều hành, thông tin thiết bị và cookies.
        `
    },
    {
        id: "usage",
        title: "2. Sử dụng thông tin",
        icon: FileText,
        content: `
DatSan247 sử dụng dữ liệu của bạn nhằm các mục đích cốt lõi sau:
- Xử lý các yêu cầu đặt sân và thanh toán của bạn một cách chính xác.
- Gửi thông báo xác nhận booking, nhắc nhở lịch đá, hoặc thông báo hủy/đổi lịch từ phía chủ sân.
- Cải thiện trải nghiệm người dùng trên hệ thống, gợi ý các cụm sân phù hợp với thói quen và vị trí địa lý của bạn.
- Cung cấp dịch vụ hỗ trợ khách hàng, giải quyết khiếu nại và tranh chấp.
- Gửi các thông tin về chương trình khuyến mãi, sự kiện thể thao (nếu có sự đồng ý của bạn).
        `
    },
    {
        id: "security",
        title: "3. Bảo mật dữ liệu",
        icon: Lock,
        content: `
An toàn dữ liệu của bạn là ưu tiên số một của chúng tôi:
- Dữ liệu được mã hóa lưu trữ trên máy chủ an toàn với công nghệ mã hóa **AES-256** và đường truyền **SSL/TLS**.
- Hệ thống áp dụng các biện pháp kiểm soát truy cập nghiêm ngặt. Chỉ những nhân viên được ủy quyền mới có quyền tiếp cận dữ liệu cá nhân của bạn để phục vụ khách hàng.
- Chúng tôi liên tục rà soát và nâng cấp các phương thức bảo mật hệ thống để chống lại các tác nhân truy cập trái phép hoặc tấn công mạng.
        `
    },
    {
        id: "sharing",
        title: "4. Chia sẻ thông tin",
        icon: Server,
        content: `
Chúng tôi cam kết **KHÔNG BAN, CHO THUÊ** hay trao đổi dữ liệu cá nhân của bạn cho bất kỳ bên thứ ba nào vì mục đích thương mại. Thông tin chỉ được chia sẻ trong các trường hợp:
- **Với đối tác Chủ sân:** Cung cấp thông tin cơ bản (Tên, Số điện thoại) để chủ cơ sở tiện liên hệ, đón tiếp và đối chiếu lịch đặt.
- **Với đối tác Dịch vụ:** Các cổng thanh toán, dịch vụ tổng đài CSKH (chỉ cung cấp thông tin cần thiết tối thiểu).
- **Yêu cầu pháp lý:** Khi có yêu cầu có thẩm quyền từ Cơ quan Nhà nước tuân theo quy định của pháp luật Việt Nam.
        `
    },
    {
        id: "rights",
        title: "5. Quyền của người dùng",
        icon: UserCheck,
        content: `
Theo quy định về bảo vệ dữ liệu cá nhân, bạn có toàn quyền:
- Yêu cầu truy cập, kiểm tra và trích xuất dữ liệu cá nhân của mình trên nền tảng.
- Yêu cầu chính sửa, cập nhật thông tin nếu có sai sót.
- Yêu cầu xóa vĩnh viễn (Wipe out) tài khoản và dữ liệu cá nhân khỏi hệ thống DatSan247.
- Thu hồi sự đồng ý nhận email/SMS tiếp thị bất kỳ lúc nào thông qua cài đặt ứng dụng.
        `
    }
];

export default function PrivacyPolicyPage() {
    const [activeSection, setActiveSection] = useState("collection");

    // Xử lý scroll cơ bản
    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(`section-${id}`);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    // Theo dõi thẻ đang được xem
    useEffect(() => {
        const handleScroll = () => {
            const sections = PRIVACY_SECTIONS.map(s => document.getElementById(`section-${s.id}`));
            const scrollPosition = window.scrollY + 140;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(PRIVACY_SECTIONS[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Header Hero */}
            <div className="bg-slate-900 border-b-8 border-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="container px-4 max-w-5xl mx-auto py-16 md:py-24 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-emerald-300 border border-white/10 font-bold text-sm mb-6 backdrop-blur-md">
                        <Shield className="w-4 h-4" /> Cam Kết Bảo Mật Tuyệt Đối
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
                        Chính Sách Bảo Mật
                    </h1>
                    <p className="text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                        Cập nhật lần cuối: 15/10/2026. <br className="hidden md:block"/> Vui lòng đọc kỹ các điều khoản dưới đây để hiểu rõ cách chúng tôi thu thập và bảo vệ dữ liệu của bạn.
                    </p>
                </div>
            </div>

            {/* Content Container */}
            <div className="container px-4 max-w-6xl mx-auto pt-12 md:pt-16">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
                    
                    {/* Sidebar Table of Contents */}
                    <div className="w-full md:w-[320px] shrink-0">
                        <div className="sticky top-28 bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h3 className="font-black text-slate-900 text-lg mb-6 uppercase tracking-wider">Mục Lục</h3>
                            <nav className="flex flex-col space-y-2">
                                {PRIVACY_SECTIONS.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={cn(
                                            "flex items-center gap-3 w-full text-left px-4 py-3 rounded-2xl transition-all font-bold group",
                                            activeSection === section.id
                                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        <section.icon className={cn("w-5 h-5", activeSection === section.id ? "text-white" : "text-slate-400 group-hover:text-primary")} />
                                        <span className="flex-1 text-sm">{section.title}</span>
                                        <ChevronRight className={cn(
                                            "w-4 h-4 transition-transform", 
                                            activeSection === section.id ? "translate-x-1 opacity-100" : "opacity-0 -translate-x-2"
                                        )} />
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <p className="text-xs font-bold text-emerald-800 leading-relaxed text-center">
                                    Việc bạn tiếp tục sử dụng dịch vụ đồng nghĩa với việc bạn chấp thuận các điều khoản này.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Areas */}
                    <div className="flex-1 max-w-3xl">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
                            <div className="prose prose-slate prose-lg md:prose-xl max-w-none">
                                <p className="text-slate-600 font-medium leading-relaxed mb-12">
                                    Công ty Cổ phần Công nghệ DatSan247 ("Chúng tôi") coi trọng quyền riêng tư và dữ liệu cá nhân của người dùng ("Bạn"). Chính sách này mô tả phương thức chúng tôi thu thập, sử dụng, bảo vệ và chia sẻ thông tin khi bạn truy cập trang web hoặc sử dụng ứng dụng di động của chúng tôi.
                                </p>

                                <div className="space-y-16">
                                    {PRIVACY_SECTIONS.map((section) => (
                                        <div key={section.id} id={`section-${section.id}`} className="scroll-mt-32 relative">
                                            {/* Decorative indicator line */}
                                            <div className="absolute -left-8 md:-left-12 top-0 bottom-0 w-1 bg-slate-100 rounded-full hidden md:block">
                                                <div className={cn("absolute top-0 w-full rounded-full transition-all duration-500", activeSection === section.id ? "bg-primary h-full" : "bg-transparent h-0")}></div>
                                            </div>

                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary shrink-0 shadow-sm">
                                                    <section.icon className="w-6 h-6" />
                                                </div>
                                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 m-0 leading-tight">
                                                    {section.title}
                                                </h2>
                                            </div>
                                            <div 
                                                className="text-slate-600 font-medium leading-relaxed space-y-4 text-[17px] markdown-content"
                                                dangerouslySetInnerHTML={{ 
                                                    // Rất đơn giản để render cấu trúc markdown cơ bản thành html
                                                    __html: section.content
                                                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900">$1</strong>')
                                                        .replace(/- (.*?)\n/g, '<li class="ml-4 mb-2 relative before:content-[\'\'] before:absolute before:left-[-16px] before:top-[10px] before:w-2 before:h-2 before:bg-primary before:rounded-full">$1</li>')
                                                        .replace(/<\/li>(?!<li)/g, '</li></ul>')
                                                        .replace(/(<li.*?>.*?<\/li>)/g, '<ul class="list-none p-0 my-4">$1')
                                                }} 
                                            />
                                        </div>
                                    ))}
                                </div>
                                
                                <hr className="my-12 border-slate-200" />
                                
                                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 border-l-4 border-l-primary">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Bạn có thắc mắc về chính sách này?</h3>
                                    <p className="text-slate-600 mb-6 font-medium">Đội ngũ DPO (Data Protection Officer) của chúng tôi luôn sẵn sàng giải đáp.</p>
                                    <div className="flex items-center gap-2 font-bold text-primary group cursor-pointer inline-flex">
                                        Liên hệ ngay với bộ phận hỗ trợ <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .markdown-content ul {
                    list-style-type: none;
                    padding-left: 1.5rem;
                }
            `}} />
        </div>
    );
}
