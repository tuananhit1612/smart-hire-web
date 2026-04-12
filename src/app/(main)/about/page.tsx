import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Về Chúng Tôi | SmartHire",
    description:
        "SmartHire — nền tảng tuyển dụng thông minh ứng dụng AI giúp kết nối ứng viên với cơ hội việc làm phù hợp nhất.",
};

const VALUES = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
        ),
        title: "AI-Powered",
        desc: "Ứng dụng trí tuệ nhân tạo tiên tiến nhất để phân tích CV, đối sánh năng lực và gợi ý việc làm chính xác.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        ),
        title: "Người dùng là trung tâm",
        desc: "Mọi tính năng được thiết kế với trải nghiệm người dùng làm ưu tiên hàng đầu, đơn giản mà mạnh mẽ.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
        title: "Bảo mật & Tin cậy",
        desc: "Dữ liệu được mã hóa, bảo mật theo tiêu chuẩn quốc tế. Quyền riêng tư của bạn luôn được tôn trọng.",
    },
];

const STATS = [
    { value: "10K+", label: "Ứng viên đăng ký" },
    { value: "500+", label: "Doanh nghiệp tin dùng" },
    { value: "95%", label: "Tỉ lệ hài lòng" },
    { value: "24/7", label: "Hỗ trợ liên tục" },
];

export default function AboutPage() {
    return (
        <div className="relative overflow-hidden">
            {/* Hero */}
            <section className="relative py-24 sm:py-32 text-center px-4">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#22C55E]/10 to-[#10B981]/5 blur-3xl" />
                </div>
                <div className="max-w-3xl mx-auto">
                    <p className="text-[#22C55E] font-bold tracking-wider uppercase text-xs mb-4">
                        Về SmartHire
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C252E] dark:text-white leading-tight mb-6">
                        Kết nối{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#10B981]">
                            nhân tài
                        </span>{" "}
                        với cơ hội hoàn hảo
                    </h1>
                    <p className="text-lg text-[#637381] dark:text-[#919EAB] max-w-2xl mx-auto leading-relaxed">
                        SmartHire ra đời với sứ mệnh loại bỏ rào cản giữa ứng viên tài năng và nhà tuyển dụng, sử dụng AI để tạo ra trải nghiệm tuyển dụng nhanh, chính xác và công bằng.
                    </p>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="max-w-5xl mx-auto px-4 mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {STATS.map((s) => (
                        <div
                            key={s.label}
                            className="text-center p-6 rounded-2xl bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.06] shadow-sm"
                        >
                            <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#10B981] mb-1">
                                {s.value}
                            </p>
                            <p className="text-sm text-[#637381] dark:text-[#919EAB] font-medium">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission */}
            <section className="max-w-5xl mx-auto px-4 mb-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-[#22C55E] font-bold tracking-wider uppercase text-xs mb-3">
                            Sứ mệnh
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1C252E] dark:text-white mb-4 leading-snug">
                            Tuyển dụng thông minh hơn, không phải khó hơn
                        </h2>
                        <p className="text-[#637381] dark:text-[#919EAB] leading-relaxed mb-6">
                            Chúng tôi tin rằng mỗi người đều xứng đáng tìm được công việc phù hợp với năng lực và đam mê. SmartHire sử dụng AI để phân tích CV, đề xuất việc làm, và giúp ứng viên chuẩn bị phỏng vấn — tất cả trong một nền tảng duy nhất.
                        </p>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-semibold text-sm shadow-lg shadow-[#22C55E]/25 hover:shadow-[#22C55E]/40 hover:-translate-y-0.5 transition-all"
                        >
                            Bắt đầu miễn phí
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#22C55E]/10 to-[#10B981]/5 dark:from-[#22C55E]/20 dark:to-[#10B981]/10 border border-[#22C55E]/20 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-2xl shadow-[#22C55E]/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="max-w-5xl mx-auto px-4 mb-24">
                <div className="text-center mb-12">
                    <p className="text-[#22C55E] font-bold tracking-wider uppercase text-xs mb-3">
                        Giá trị cốt lõi
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#1C252E] dark:text-white">
                        Điều chúng tôi theo đuổi
                    </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {VALUES.map((v) => (
                        <div
                            key={v.title}
                            className="group p-8 rounded-2xl bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.06] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22C55E]/10 to-[#10B981]/5 dark:from-[#22C55E]/20 dark:to-[#10B981]/10 flex items-center justify-center text-[#22C55E] mb-5 group-hover:scale-110 transition-transform">
                                {v.icon}
                            </div>
                            <h3 className="text-lg font-bold text-[#1C252E] dark:text-white mb-2">
                                {v.title}
                            </h3>
                            <p className="text-sm text-[#637381] dark:text-[#919EAB] leading-relaxed">
                                {v.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-5xl mx-auto px-4 mb-24">
                <div className="relative rounded-3xl overflow-hidden p-12 sm:p-16 text-center bg-gradient-to-br from-[#1C252E] to-[#141A21] dark:from-[#0f1318] dark:to-[#0a0d11]">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#22C55E]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Sẵn sàng bắt đầu?
                        </h2>
                        <p className="text-[#919EAB] text-lg max-w-lg mx-auto mb-8">
                            Tham gia cùng hàng nghìn ứng viên và doanh nghiệp đã tin tưởng SmartHire.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-semibold text-sm shadow-lg shadow-[#22C55E]/25 hover:shadow-[#22C55E]/40 hover:-translate-y-0.5 transition-all"
                            >
                                Đăng ký miễn phí
                            </Link>
                            <Link
                                href="/faqs"
                                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                            >
                                Tìm hiểu thêm
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
