"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    Star,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";

// ============================================
// AI JOB SEARCH PAGE — SmartHire Design System
// Clone layout structure from wobo.ai/ai-job-search
// ============================================

// ─── Hero Section ───────────────────────────────────
function AIJobSearchHero() {
    return (
        <section className="w-full relative min-h-[80vh] flex flex-col justify-center overflow-hidden pt-24 pb-16">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1C252E] dark:text-white leading-[1.15] mb-6">
                            <span className="block">Tìm kiếm việc làm</span>
                            <span className="block mt-1 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#FFAB00] bg-clip-text text-transparent">
                                bằng AI
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-[#637381] dark:text-[#C4CDD5] leading-relaxed mb-8 max-w-xl">
                            Tiết kiệm thời gian và công sức với các công cụ tìm kiếm việc làm bằng AI.
                            Để SmartHire lo liệu mọi thứ — từ việc quét các tin tuyển dụng và ghép nối
                            bạn với các cơ hội tốt nhất đến tạo các bản sơ yếu lý lịch thân thiện với ATS
                            và thư xin việc được cá nhân hóa. Dành ít thời gian tìm kiếm hơn và nhiều thời
                            gian hơn cho phỏng vấn.
                        </p>

                        <Button asChild variant="primary" size="lg" className="h-14 px-8 text-base bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 shadow-none border-0">
                            <Link href="/register">
                                Bắt đầu tìm kiếm việc làm
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Right: Hero Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex justify-center"
                    >
                        <Image
                            src="/assets/images/ai-job-search/hero.png"
                            alt="AI Job Search"
                            width={520}
                            height={420}
                            className="rounded-2xl object-contain"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── 4 Steps Section ────────────────────────────────
function StepsSection() {
    const steps = [
        {
            number: "Bước 1",
            title: "Đăng ký",
            description: "Tạo tài khoản miễn phí chỉ trong vài giây để truy cập công cụ tìm kiếm việc làm bằng AI mạnh mẽ và trình tạo thư xin việc AI của SmartHire, cùng nhiều tính năng khác!",
        },
        {
            number: "Bước 2",
            title: "Cung cấp thông tin của bạn",
            description: "Điền một vài thông tin chi tiết để xây dựng Hồ sơ SmartHire được cá nhân hóa của riêng bạn.",
        },
        {
            number: "Bước 3",
            title: "Tìm kiếm việc làm trên thị trường",
            description: "Chúng tôi sẽ rà soát toàn bộ thị trường việc làm dựa trên sở thích của bạn để tìm ra những vị trí phù hợp nhất.",
        },
        {
            number: "Bước 4",
            title: "Sẵn sàng ứng tuyển",
            description: "Chúng tôi chọn lọc những việc làm tốt nhất từ kết quả tìm kiếm và chuẩn bị hồ sơ ứng tuyển tối ưu thay bạn, tăng cơ hội có phỏng vấn tốt nhất.",
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white mb-4">
                        4 bước đơn giản để tạo một tìm kiếm việc làm AI tuyệt vời
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="relative group"
                        >
                            {/* Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#22C55E]/20 via-[#22C55E]/10 to-[#22C55E]/20 rounded-[28px] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

                            {/* Card */}
                            <div className="relative backdrop-blur-xl bg-white/70 dark:bg-white/[0.04] border border-white/50 dark:border-white/[0.08] rounded-3xl p-8 text-center transition-all duration-500 group-hover:border-[#22C55E]/30 dark:group-hover:border-[#22C55E]/20 group-hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.15)] group-hover:-translate-y-1 h-full">

                                {/* Step Badge */}
                                <div className="inline-block bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6 shadow-lg shadow-green-500/25">
                                    {step.number}
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-bold text-[#1C252E] dark:text-white mb-3">{step.title}</h3>
                                <p className="text-sm text-[#637381] dark:text-[#C4CDD5] leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button asChild variant="primary" size="lg" className="h-14 px-8 text-base bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 shadow-none border-0">
                        <Link href="/register">
                            Bắt đầu tìm kiếm việc làm bằng AI
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

// ─── Feature Detail Section (alternating 2-column layout) ───
interface FeatureData {
    title: string;
    subtitle?: string;
    description: string;
    image: string;
    imageAlt: string;
    reversed?: boolean;
}

function FeatureBlock({ title, subtitle, description, image, imageAlt, reversed }: FeatureData) {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reversed ? "direction-rtl" : ""}`}>
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: reversed ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className={`flex justify-center ${reversed ? "lg:order-2" : "lg:order-1"}`}
                    >
                        <Image
                            src={image}
                            alt={imageAlt}
                            width={460}
                            height={380}
                            className="rounded-2xl object-contain max-w-full h-auto"
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: reversed ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className={`${reversed ? "lg:order-1" : "lg:order-2"}`}
                    >
                        {subtitle && (
                            <span className="inline-block text-[#22C55E] text-sm font-semibold tracking-widest uppercase mb-3">
                                {subtitle}
                            </span>
                        )}
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white mb-6 leading-tight">
                            {title}
                        </h2>
                        <p className="text-base md:text-lg text-[#637381] dark:text-[#C4CDD5] leading-relaxed">
                            {description}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function FeaturesDetailSection() {
    const features: FeatureData[] = [
        {
            title: "Ghép nối thông minh",
            description: "SmartHire phân tích nền tảng, kỹ năng và sở thích của bạn để hiển thị các cơ hội việc làm thực sự phù hợp với hồ sơ của bạn. Không cần phải tìm kiếm ngẫu nhiên nữa — AI của chúng tôi tập trung vào những cơ hội phù hợp nhất với bạn.",
            image: "/assets/images/ai-job-search/intelligent-matching.png",
            imageAlt: "Intelligent Matching",
            reversed: false,
        },
        {
            title: "SmartHire Nhân vật",
            subtitle: "SmartHire Persona",
            description: "SmartHire Persona là hình ảnh đại diện kỹ thuật số của bạn trên thị trường việc làm. Nó giúp chúng tôi hiểu nhu cầu của bạn, tìm đúng cơ hội và soạn các câu trả lời hấp dẫn cho các câu hỏi ứng tuyển, tối đa hóa cơ hội thành công. Nó giống như có một người tìm việc cá nhân làm việc không mệt mỏi cho bạn.",
            image: "/assets/images/ai-job-search/persona.png",
            imageAlt: "SmartHire Persona",
            reversed: true,
        },
        {
            title: "Tự động hóa tiết kiệm thời gian",
            description: "Hãy để AI của chúng tôi xử lý phần việc nặng nhọc, từ quét nhiều bảng tin tuyển dụng đến lọc bỏ các tin không liên quan. Bạn sẽ dành ít thời gian hơn cho việc tìm kiếm và nhiều thời gian hơn để chuẩn bị cho phỏng vấn.",
            image: "/assets/images/ai-job-search/automation.png",
            imageAlt: "Time-Saving Automation",
            reversed: false,
        },
        {
            title: "Tích hợp công cụ tạo CV bằng AI",
            description: "Kết nối dễ dàng với Trình tạo CV AI của SmartHire để tinh chỉnh CV của bạn cho từng vai trò. Cần chỉnh sửa nhanh? Các đề xuất được tùy chỉnh của trình xây dựng đảm bảo CV của bạn hoàn toàn phù hợp với yêu cầu công việc.",
            image: "/assets/images/ai-job-search/resume-builder.png",
            imageAlt: "AI Resume Builder Integration",
            reversed: true,
        },
        {
            title: "Công cụ tạo thư xin việc bằng AI",
            description: "Loại bỏ sự phỏng đoán khi viết thư xin việc. Trình tạo thư xin việc AI của SmartHire soạn thư được cá nhân hóa, làm nổi bật điểm mạnh của bạn cho từng vị trí — cho nhà tuyển dụng thấy bạn là ứng viên phù hợp ngay từ đầu.",
            image: "/assets/images/ai-job-search/cover-letter.png",
            imageAlt: "AI Cover Letter Generator",
            reversed: false,
        },
    ];

    return (
        <>
            {features.map((feature) => (
                <FeatureBlock key={feature.title} {...feature} />
            ))}
        </>
    );
}

// ─── FAQ Section ────────────────────────────────────
function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "Tìm việc bằng trí tuệ nhân tạo (AI) là gì?",
            answer: "Các công cụ tìm kiếm việc làm bằng trí tuệ nhân tạo được thiết kế để đơn giản hóa quy trình tìm việc. Chúng chủ động tìm kiếm các vị trí tuyển dụng thay mặt bạn, tự động nộp đơn và hỗ trợ tạo CV tối ưu và thư xin việc được tùy chỉnh cho từng vị trí — giúp bạn có phỏng vấn hiệu quả hơn.",
        },
        {
            question: "Tìm việc bằng trí tuệ nhân tạo (AI) khác với các phương pháp tìm việc truyền thống như thế nào?",
            answer: "Tìm việc truyền thống dựa vào việc khớp từ khóa thủ công và duyệt qua các trang tuyển dụng, trong khi tìm việc bằng AI tự động xác định các cơ hội phù hợp nhất dựa trên hồ sơ riêng của bạn, tiết kiệm hàng giờ tìm kiếm thủ công và cá nhân hóa tài liệu ứng tuyển cho từng vị trí — mang lại tỷ lệ phản hồi cao hơn và nhiều cuộc phỏng vấn hơn.",
        },
        {
            question: "Những công cụ tìm kiếm việc làm AI nào có sẵn trên SmartHire?",
            answer: "SmartHire cung cấp một hệ sinh thái tìm kiếm việc làm AI hoàn chỉnh bao gồm: AI Tìm Việc (ghép nối hồ sơ của bạn với các cơ hội), AI Tối ưu hóa CV (tùy chỉnh CV cho từng ứng tuyển), AI Tạo thư xin việc (tạo thư xin việc được cá nhân hóa) và Theo dõi đơn ứng tuyển (quản lý quy trình tìm việc của bạn).",
        },
        {
            question: "Công cụ tìm việc bằng AI của SmartHire có miễn phí không?",
            answer: "SmartHire cung cấp gói cơ bản miễn phí bao gồm các tính năng tìm kiếm việc làm AI cốt lõi. Các gói Premium với các tính năng nâng cao như ứng tuyển không giới hạn và hỗ trợ AI ưu tiên sẽ được công bố sớm.",
        },
        {
            question: "Liệu AI có thể hỗ trợ tìm kiếm việc làm và viết thư xin việc không?",
            answer: "Hoàn toàn có thể. SmartHire cung cấp Trình tạo CV AI và Trình tạo thư xin việc AI tích hợp liền mạch với tính năng tìm kiếm việc làm. Điều này đảm bảo mỗi đơn ứng tuyển đều được tùy chỉnh và tối ưu hóa để thành công.",
        },
        {
            question: "CV có vượt qua các bài kiểm tra ATS Hồ sơ?",
            answer: "Nhiều nền tảng tìm kiếm việc làm AI bao gồm Trình kiểm tra CV ATS để xác định điểm yếu và khoảng trống từ khóa trong CV của bạn. Bằng cách giải quyết những vấn đề này, đơn ứng tuyển của bạn có cơ hội tốt hơn để vượt qua bộ lọc tự động và đến tay người quản lý tuyển dụng.",
        },
        {
            question: "SmartHire có cung cấp dịch vụ ứng tuyển việc làm tự động không?",
            answer: "Có. Tính năng Tự động ứng tuyển của SmartHire giúp bạn tiết kiệm hàng giờ bằng cách nộp đơn ứng tuyển thay bạn. Mỗi đơn được cá nhân hóa, đảm bảo bạn không bao giờ gửi cùng một CV hoặc thư xin việc chung cho mỗi vị trí.",
        },
        {
            question: "Liệu tìm kiếm việc làm bằng AI có tốt hơn các phương pháp truyền thống?",
            answer: "Tìm kiếm việc làm bằng AI sử dụng thông tin chi tiết dựa trên dữ liệu để đưa ra kết quả chính xác hơn, thường vượt trội so với tìm kiếm thủ công. Mặc dù kết nối mạng lưới và tiếp cận cá nhân vẫn quan trọng, nhưng công cụ tìm kiếm việc làm bằng AI có thể giảm đáng kể thời gian tìm kiếm và cải thiện cơ hội phỏng vấn.",
        },
        {
            question: "Liệu AI có thể tìm kiếm các vị trí làm việc từ xa hoặc chuyên biệt không?",
            answer: "Có. Các nền tảng tìm kiếm việc làm AI có thể lọc vị trí theo địa điểm, bộ kỹ năng hoặc ngành, xác định chính xác các vai trò từ xa hoặc chuyên biệt mà bạn có thể bỏ lỡ. Điều này khiến chúng trở nên lý tưởng cho các chuyên gia tìm kiếm sự nghiệp linh hoạt hoặc chuyên biệt cao.",
        },
        {
            question: "Thông tin cá nhân của tôi được bảo mật đến mức nào khi sử dụng công cụ tìm kiếm việc làm bằng AI?",
            answer: "Tại SmartHire, chúng tôi lưu trữ tất cả dữ liệu người dùng trên máy chủ bảo mật và không bao giờ chia sẻ thông tin cá nhân với bên thứ ba. Quyền riêng tư và bảo vệ dữ liệu của bạn là ưu tiên hàng đầu khi sử dụng dịch vụ tìm kiếm việc làm AI của chúng tôi.",
        },
        {
            question: "Liệu chỉ trí tuệ nhân tạo (AI) đã đủ để tìm được việc làm?",
            answer: "Các công cụ tìm kiếm việc làm bằng AI mang lại lợi thế to lớn bằng cách tự động hóa các nhiệm vụ nhàm chán và tăng độ chính xác. Tuy nhiên, việc kết hợp AI với kết nối mạng lưới, giới thiệu và tiếp cận trực tiếp vẫn mang lại kết quả tốt nhất. Sử dụng cả hai chiến lược để tối đa hóa cơ hội việc làm của bạn.",
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-[#22C55E] text-sm font-semibold tracking-widest uppercase mb-4">
                        câu hỏi thường gặp
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white mb-4">
                        Chúng tôi có câu trả lời
                    </h2>
                </motion.div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] rounded-2xl overflow-hidden transition-all hover:border-[rgba(145,158,171,0.32)]">
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <span className="text-base font-semibold text-[#1C252E] dark:text-white pr-4">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-[#637381] dark:text-[#919EAB] flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <div className="px-5 pb-5 text-sm text-[#637381] dark:text-[#C4CDD5] leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Testimonials Section ───────────────────────────
function TestimonialsReviewSection() {
    const reviews = [
        {
            name: "Minh T.",
            date: "11/12/2025",
            text: "Thời gian tôi tiết kiệm được với SmartHire thật không thể tin được. Đây là một trong những dịch vụ hữu ích nhất mà tôi từng trả tiền.",
            rating: 5,
        },
        {
            name: "Lan P.",
            date: "21/11/2025",
            text: "Sau ba tháng sử dụng SmartHire, tôi đã nhận được phỏng vấn tại những công ty mà trước đây tôi không nghĩ mình có thể tiếp cận. Đặc biệt cảm ơn đội ngũ hỗ trợ khách hàng!",
            rating: 5,
        },
        {
            name: "Hoàng N.",
            date: "23/11/2025",
            text: "Tôi dùng thử gói miễn phí trước, rồi chuyển sang Premium — nâng cấp rất đáng! Câu trả lời cho các câu hỏi ứng tuyển thực sự có ý nghĩa và phù hợp với tôi.",
            rating: 5,
        },
        {
            name: "Thảo V.",
            date: "09/12/2025",
            text: "Là một bà mẹ đơn thân bận rộn giữa công việc và con cái, công cụ này đã gỡ bỏ gánh nặng rất lớn bằng cách nộp đơn ứng tuyển tự động trong nền.",
            rating: 5,
        },
        {
            name: "Đức L.",
            date: "23/11/2025",
            text: "Nhanh chóng và hiệu quả. Đã ứng tuyển hơn 30 vị trí phù hợp trong tuần đầu. Tốt hơn nhiều so với tìm kiếm thủ công trên các trang việc làm.",
            rating: 5,
        },
        {
            name: "Hương M.",
            date: "22/11/2025",
            text: "Vợ chồng tôi đều dùng SmartHire. Tiết kiệm rất nhiều thời gian và công sức. Cuối cùng chúng tôi cũng lấy lại được thời gian thay vì phải ngồi trên LinkedIn.",
            rating: 5,
        },
        {
            name: "Khoa T.",
            date: "19/01/2026",
            text: "Trước đây tôi phải trả 500 đô la mỗi tháng cho ai đó xử lý đơn ứng tuyển. Giờ với SmartHire, tôi có kết quả tốt hơn và không còn sai sót nào.",
            rating: 5,
        },
        {
            name: "Thu H.",
            date: "20/01/2026",
            text: "Thư xin việc được tạo ra rất tuyệt — hay hơn nhiều so với bất kỳ công cụ AI nào tôi đã thử.",
            rating: 5,
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-[#22C55E] text-sm font-semibold tracking-widest uppercase mb-4">
                        Đánh giá
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white mb-4">
                        Từ người dùng của chúng tôi
                    </h2>
                    <p className="text-[#637381] dark:text-[#C4CDD5] text-lg max-w-2xl mx-auto">
                        Mục tiêu của chúng tôi là tạo ra sản phẩm và dịch vụ mà bạn hài lòng và sử dụng hàng ngày.
                        Đây là lý do tại sao chúng tôi liên tục cải thiện dịch vụ và thực sự lắng nghe những gì người dùng nói.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] rounded-2xl p-6 hover:border-[rgba(145,158,171,0.32)] hover:shadow-lg transition-all group"
                        >
                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[#FFAB00] text-[#FFAB00]" />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-sm text-[#637381] dark:text-[#C4CDD5] leading-relaxed mb-4">
                                &ldquo;{review.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-[rgba(145,158,171,0.12)]">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-green-500/25">
                                    {review.name[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#1C252E] dark:text-white">{review.name}</p>
                                    <p className="text-xs text-[#919EAB]">{review.date}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Main Export ─────────────────────────────────────
export function AIJobSearchPage() {
    return (
        <>
            <AIJobSearchHero />
            <StepsSection />
            <FeaturesDetailSection />
            <FAQSection />
            <TestimonialsReviewSection />
        </>
    );
}
