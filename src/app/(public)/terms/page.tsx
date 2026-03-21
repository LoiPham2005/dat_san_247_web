"use client";

import React, { useState, useEffect } from 'react';
import { Scale, FileSignature, CheckCircle2, AlertCircle, RefreshCcw, Handshake, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const TERMS_SECTIONS = [
    {
        id: "general",
        title: "1. Quy định chung",
        icon: Scale,
        content: `
- Bằng việc đăng ký tài khoản và sử dụng dịch vụ trên nền tảng DatSan247, bạn đồng ý tuân thủ toàn bộ các Điều khoản và Điều kiện sử dụng này.
- **DatSan247** đóng vai trò là nền tảng trung gian kết nối giữa Người có nhu cầu chơi thể thao (Khách hàng) và Đơn vị cung cấp dịch vụ sân bãi (Chủ sân).
- Chúng tôi có quyền sửa đổi, bổ sung các điều khoản này theo thời gian và sẽ thông báo trước thông qua email hoặc trên giao diện ứng dụng. Tiêp tục sử dụng dịch vụ sau thay đổi đồng nghĩa với việc bạn chấp nhận nó.
        `
    },
    {
        id: "account",
        title: "2. Quản lý Tài khoản",
        icon: UserCheckCmp,
        content: `
- Bạn cam kết cung cấp thông tin cá nhân chính xác, đầy đủ khi đăng ký để đảm bảo quyền lợi khi xảy ra tranh chấp.
- Một số điện thoại chỉ được đăng ký duy nhất một tài khoản.
- Bạn có trách nhiệm tự bảo mật mật khẩu và OTP. Bất kỳ giao dịch đặt sân/thanh toán nào thực hiện thông qua tài khoản của bạn sẽ được coi là do chính bạn thực hiện.
- Chúng tôi có quyền khóa hoặc xóa tài khoản vĩnh viễn nếu phát hiện có hành vi gian lận (Boom đơn, đặt ảo nhiều lần, thanh toán không thành công có chủ đích).
        `
    },
    {
        id: "booking",
        title: "3. Chính sách Đặt Sân & Hủy Sân",
        icon: FileSignature,
        content: `
- **Xác nhận đặt lịch:** Một Booking chỉ được xác nhận chính thức khi khách hàng đã hoàn tất thanh toán (trên web) hoặc được chủ sân phê duyệt (nếu chọn trả sau tùy cụm sân).
- **Hủy sân hợp lệ:** Khách hàng được quyền Hủy lịch và hoàn tiền 100% nếu thao tác hủy diễn ra **trước giờ bắt đầu ít nhất 12 tiếng**.
- **Hủy sân muộn:** Nếu hủy trong khoảng thời gian dưới 12 tiếng so với giờ đá, Khách hàng sẽ bị trừ 50% đến 100% giá trị cọc tùy theo quy định riêng của từng Chủ sân. Chủ sân có quyền quyết định cuối cùng trong trường hợp này.
- **Sân tự hủy:** Nếu Vì lý do bất khả kháng từ phía Chủ sân (Mất điện, mưa bão ngập lụt...), Chủ sân phải hủy lịch trực tiếp trên hệ thống và bạn sẽ được nhận lại 100% số tiền.
        `
    },
    {
        id: "payment",
        title: "4. Giao dịch & Hoàn tiền (Refund)",
        icon: RefreshCcw,
        content: `
- Khách hàng thanh toán qua cổng điện tử lớn như VNPAY, MoMo, ZaloPay (Không phí ẩn).
- Số tiền hiển thị trên DatSan247 là số tiền cuối cùng (Đã bao gồm VAT và Phụ phí nếu có).
- Trong trường hợp Booking được Hủy hợp lệ theo khoản 3, số tiền hoàn lại sẽ được chuyển tự động về Ví DatSan247 hoặc tài khoản ngân hàng của bạn trong vòng **3-5 ngày làm việc** tùy cổng kết nối ngân hàng.
        `
    },
    {
        id: "responsibility",
        title: "5. Trách nhiệm các bên",
        icon: Handshake,
        content: `
- **Đối với Khách hàng:** Bảo quản tài sản chung tại cơ sở sân bãi. Không đem theo chất cấm, vũ khí hoặc thực hiện hành vi vi phạm pháp luật tại Sân thể thao.
- **Đối với Chủ Sân:** Đảm bảo cung cấp sân bãi đúng thời gian, đúng chất lượng mặt sân đã đăng tải. Không được tự ý yêu cầu khách hàng hủy lịch trên hệ thống và thanh toán chui tại sân.
- **Đối với DatSan247:** Chúng tôi đảm bảo hệ thống vận hành trơn tru và hỗ trợ giải quyết tranh chấp thông qua Hotline CSKH khi có sự cố giao dịch giữa hai bên.
        `
    }
];

// Khắc phục Lỗi Component Icon
function UserCheckCmp(props: any) {
    return <CheckCircle2 {...props} />;
}

export default function TermsPage() {
    const [activeSection, setActiveSection] = useState("general");

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(`term-${id}`);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = TERMS_SECTIONS.map(s => document.getElementById(`term-${s.id}`));
            const scrollPosition = window.scrollY + 140;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(TERMS_SECTIONS[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            
            {/* Header Area */}
            <div className="bg-slate-900 border-b-8 border-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="container px-4 max-w-6xl mx-auto py-16 md:py-24 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-200 border border-white/10 font-bold text-sm mb-6 backdrop-blur-md">
                        <Scale className="w-4 h-4" /> Pháp lý & Chính sách
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
                        Điều Khoản Sử Dụng
                    </h1>
                    <p className="text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                        Thiết lập một sân chơi tử tế, sòng phẳng và rõ ràng. Việc bạn tham gia DatSan247 là sự đồng ý tuân thủ các quy định dưới đây.
                    </p>
                </div>
            </div>

            <div className="container px-4 max-w-6xl mx-auto pt-16">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
                    
                    {/* Left Sidebar Menu */}
                    <div className="w-full md:w-[320px] shrink-0">
                        <div className="sticky top-28 bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h3 className="font-black text-slate-900 text-lg mb-6 uppercase tracking-wider">Danh mục Điều khoản</h3>
                            <nav className="flex flex-col space-y-2">
                                {TERMS_SECTIONS.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={cn(
                                            "flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-2xl transition-all font-bold group",
                                            activeSection === section.id
                                                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        <section.icon className={cn("w-5 h-5", activeSection === section.id ? "text-primary" : "text-slate-400 group-hover:text-primary")} />
                                        <span className="flex-1 text-sm">{section.title}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 max-w-4xl">
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12">
                            <div className="space-y-16">
                                {TERMS_SECTIONS.map((section) => (
                                    <div key={section.id} id={`term-${section.id}`} className="scroll-mt-32 relative">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                                <section.icon className="w-7 h-7" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 m-0 leading-tight">
                                                {section.title}
                                            </h2>
                                        </div>
                                        <div 
                                            className="text-slate-600 font-medium leading-relaxed text-[17px] term-content"
                                            dangerouslySetInnerHTML={{ 
                                                __html: section.content
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900">$1</strong>')
                                                    .replace(/- (.*?)\n/g, '<div class="flex gap-4 mb-4"><div class="mt-1.5 shrink-0"><svg class="w-2 h-2 text-indigo-500" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"/></svg></div><p class="m-0">$1</p></div>')
                                            }} 
                                        />
                                    </div>
                                ))}

                                {/* Acknowledgment Footer */}
                                <div className="mt-16 bg-slate-50 border border-slate-200 rounded-[2rem] p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-emerald-500 shrink-0">
                                            <AlertCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-lg">Cần giải đáp chi tiết?</h4>
                                            <p className="text-slate-500 text-sm font-medium">Bạn có thể hỏi bất kỳ chủ đề pháp lý nào nếu gặp vướng mắc.</p>
                                        </div>
                                    </div>
                                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap">
                                        Liên Hệ Hỗ Trợ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .term-content p {
                    line-height: 1.8;
                }
            `}} />
        </div>
    );
}
