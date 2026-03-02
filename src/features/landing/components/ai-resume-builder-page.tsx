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
// AI RESUME BUILDER PAGE — SmartHire Design System
// Reusing structure from AI Job Application
// ============================================

// ─── Hero Section ───────────────────────────────────
function AIResumeBuilderHero() {
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
                            <span className="block text-3xl sm:text-4xl text-[#1C252E]/70 dark:text-white/70 font-medium mb-1">Miễn phí</span>
                            <span className="block">Trình tạo CV chuẩn ATS</span>
                            <span className="block mt-1 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#FFAB00] bg-clip-text text-transparent">
                                bằng công nghệ AI
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-[#637381] dark:text-[#C4CDD5] leading-relaxed mb-8 max-w-xl">
                            Tạo một CV chất lượng thân thiện với hệ thống ATS chỉ trong 2 phút.
                            Trí tuệ nhân tạo của chúng tôi phân tích 24+ tiêu chí để tối ưu hóa lý lịch của bạn cho bất kỳ công việc nào.
                            Bắt đầu ngay hôm nay để có nhiều cơ hội phỏng vấn hơn!
                        </p>

                        <Button asChild variant="primary" size="lg" className="h-14 px-8 text-base bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 shadow-none border-0">
                            <Link href="/register">
                                Bắt đầu tạo CV miễn phí
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
                            src="/assets/images/ai-resume-builder/hero.png"
                            alt="AI Resume Builder"
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
            description: "Tạo tài khoản miễn phí chỉ trong vài giây để truy cập công cụ Ứng tuyển việc làm bằng AI mạnh mẽ của chúng tôi và hơn thế nữa!",
        },
        {
            number: "Bước 2",
            title: "Cung cấp thông tin của bạn",
            description: "Điền một vài thông tin chi tiết để xây dựng Hồ sơ SmartHire được cá nhân hóa của riêng bạn.",
        },
        {
            number: "Bước 3",
            title: "AI tìm kiếm việc làm",
            description: "Chúng tôi quét toàn bộ thị trường việc làm dựa trên sở thích của bạn để tìm ra những vị trí phù hợp nhất cho bạn.",
        },
        {
            number: "Bước 4",
            title: "Tự động ứng tuyển",
            description: "Hãy để chúng tôi nộp đơn ứng tuyển thay bạn với các bộ hồ sơ được tối ưu hóa, làm tăng cơ hội tham gia các buổi phỏng vấn.",
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
                        4 bước đơn giản để có một hồ sơ ứng tuyển tuyệt vời
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
                            <div className="relative backdrop-blur-xl bg-white/70 dark:bg-white/[0.04] border border-white/50 dark:border-white/[0.08] rounded-3xl p-8 text-center transition-all duration-500 group-hover:border-[#22C55E]/30 dark:group-hover:border-[#22C55E]/20 group-hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.15)] group-hover:-translate-y-1 h-full flex flex-col items-center">

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
                            Bắt đầu tạo hồ sơ AI
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
    subtitle?: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    reversed?: boolean;
}

function FeatureBlock({ subtitle, title, description, image, imageAlt, reversed }: FeatureData) {
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
            title: "AI Tìm kiếm việc làm",
            description: "Mỗi ngày, AI của SmartHire hoạt động như một chuyên gia săn đầu người cá nhân của bạn, tìm kiếm trên thị trường việc làm các cơ hội mới nhất và triển vọng nhất dựa trên sở thích của bạn. Để đảm bảo bạn không bao giờ bỏ lỡ một vị trí hoàn hảo, chúng tôi tạo ra điểm số AI cho mọi sự kết hợp giữa bạn và cơ hội việc làm.",
            image: "/assets/images/ai-job-application/search.png",
            imageAlt: "AI Job Search",
            reversed: false,
        },
        {
            title: "Hồ sơ cá nhân SmartHire",
            subtitle: "SmartHire Persona",
            description: "SmartHire Persona là hình ảnh đại diện kỹ thuật số của bạn trên thị trường việc làm. Nó giúp chúng tôi hiểu nhu cầu của bạn, tìm đúng cơ hội và soạn các câu trả lời hấp dẫn cho các câu hỏi ứng tuyển, tối đa hóa cơ hội thành công. Nó giống như có một người đại diện tìm việc cá nhân làm việc không mệt mỏi cho bạn.",
            image: "/assets/images/ai-job-application/persona.png",
            imageAlt: "SmartHire Persona",
            reversed: true,
        },
        {
            title: "Bot ứng tuyển tự động",
            description: "Tiết kiệm hàng giờ bằng cách để SmartHire nộp đơn đăng ký thay bạn. Chúng tôi thay mặt bạn ứng tuyển vào các vị trí chất lượng hàng đầu, đảm bảo rằng mỗi bộ hồ sơ ứng tuyển đều được cá nhân hóa và chuyên nghiệp.",
            image: "/assets/images/ai-job-application/bot.png",
            imageAlt: "AI Job Applying Bot",
            reversed: false,
        },
        {
            title: "Chất lượng hơn Số lượng",
            description: "Hãy quên đi những danh sách việc làm kém chất lượng. Chúng tôi ưu tiên các cơ hội thực sự tại các công ty hàng đầu, các startup năng động và các tập đoàn Fortune 500 — tập trung hoàn toàn vào các vai trò phù hợp với mục tiêu của bạn thay vì rải đơn rác vào mọi công việc có sẵn.",
            image: "/assets/images/ai-job-application/quality.png",
            imageAlt: "Quality Over Quantity",
            reversed: true,
        },
        {
            title: "Hoàn toàn minh bạch",
            description: "Tò mò muốn biết chúng tôi đã nộp đơn thay bạn ở đâu? Truy cập toàn bộ chi tiết ứng tuyển — từ mô tả công việc, các câu trả lời đã nộp, đến CV và Thư xin việc đã được sử dụng — để bạn luôn nắm rõ tiến trình.",
            image: "/assets/images/ai-job-application/transparency.png",
            imageAlt: "Complete Transparency",
            reversed: false,
        },
        {
            title: "Phản hồi được tối ưu",
            description: "Chúng tôi điều chỉnh từng câu trả lời để làm nổi bật các kỹ năng phù hợp nhất của bạn. Cách tiếp cận của chúng tôi đảm bảo các nhà tuyển dụng hiểu chính xác lý do vì sao bạn là người phù hợp nhất, mang lại lợi thế so với các hồ sơ ứng tuyển chung chung.",
            image: "/assets/images/ai-job-application/responses.png",
            imageAlt: "Optimized Responses",
            reversed: true,
        },
        {
            title: "Sức mạnh tiết kiệm thời gian",
            description: "Không còn phải điền các form vô tận hay lướt vô số các trang web việc làm. Hãy tập trung thời gian của bạn vào vòng phỏng vấn, xây dựng kỹ năng hay tận hưởng cuộc sống — SmartHire sẽ lo phần việc vất vả trong nền.",
            image: "/assets/images/ai-job-application/time.png",
            imageAlt: "Time-Saving Superpower",
            reversed: false,
        },
    ];

    return (
        <>
            {features.map((feature, index) => (
                <FeatureBlock key={index} {...feature} />
            ))}
        </>
    );
}

// ─── FAQ Section ────────────────────────────────────
function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "Làm thế nào để tận dụng AI cho việc tìm kiếm việc làm?",
            answer: "Bằng cách sử dụng một nhà tuyển dụng AI cá nhân như SmartHire, bạn có thể tự động hóa toàn bộ quá trình tìm kiếm việc làm. Chúng tôi phân tích các tùy chọn của bạn, tìm vị trí tốt nhất và thậm chí thay mặt bạn ứng tuyển, giải phóng bạn để tập trung vào chuẩn bị phỏng vấn và phát triển sự nghiệp.",
        },
        {
            question: "Liệu AI có tự động ứng tuyển vào các công việc không?",
            answer: "Có. Trí tuệ nhân tạo của SmartHire quét thị trường hàng ngày và thay mặt bạn ứng tuyển vào các vị trí tuyển dụng có liên quan. Chúng tôi lo liệu mọi thứ từ điền form đến trả lời các câu hỏi ứng tuyển, tiết kiệm thời gian và công sức cho bạn.",
        },
        {
            question: "Bạn có tạo thư xin việc (cover letter) được cá nhân hóa cho từng đơn ứng tuyển không?",
            answer: "Hoàn toàn có, nhưng chỉ dành cho gói Premium của chúng tôi. Chúng tôi tạo một thư xin việc được tùy chỉnh cho mỗi vị trí, đảm bảo rằng mỗi đơn ứng tuyển đều mang lại cảm giác cá nhân và chuyên nghiệp.",
        },
        {
            question: "Các nhà tuyển dụng có thể nhận ra chúng tôi đã ứng tuyển bằng bot của SmartHire không?",
            answer: "Không. Mặc dù AI của chúng tôi cung cấp các câu trả lời, chúng tôi sử dụng SmartHire Persona của bạn để đảm bảo chúng nghe giống như lời của chính bạn — làm nổi bật kinh nghiệm và kỹ năng của bạn một cách tự nhiên và giống con người. Các nhà tuyển dụng sẽ không nghi ngờ sự can thiệp của AI.",
        },
        {
            question: "SmartHire có phải là công cụ tìm kiếm việc làm AI tốt nhất không?",
            answer: "Với mô hình AI độc quyền, SmartHire cung cấp trải nghiệm tìm kiếm việc làm chính xác và được cá nhân hóa hơn so với các công cụ khác trên thị trường. Sự kết hợp giữa khả năng của mô hình Ngôn ngữ Lớn (LLM) và các quy trình tự động khiến nó trở thành hệ thống toàn diện nhất hiện nay.",
        },
        {
            question: "Tôi có nên thuê một chuyên viên săn đầu người (headhunter) thay thế không?",
            answer: "Các chuyên viên săn đầu người truyền thống có thể tốn rất nhiều tiền mỗi tháng. Công cụ của chúng tôi hợp túi tiền hơn nhiều, hoạt động như một nhà tuyển dụng AI cá nhân của bạn để tìm kiếm trên toàn thị trường và thay mặt bạn nộp đơn — mà không có bất kì khoản phí đắt đỏ nào.",
        },
        {
            question: "Bot của SmartHire có thể tự động ứng tuyển các công việc trên LinkedIn không?",
            answer: "Không. Nhiều tin tuyển dụng trên LinkedIn có thể là những tin kém chất lượng hoặc ẩn danh. Chúng tôi tập trung vào các cơ hội hợp pháp tại các công ty khởi nghiệp, doanh nghiệp Fortune 500 và các công ty công nghệ hàng đầu, lọc tìm trực tiếp các website công ty chất lượng nhất.",
        },
        {
            question: "Lợi ích của ứng dụng do AI điều khiển là gì?",
            answer: "Các đơn ứng tuyển bằng AI giúp tiết kiệm thời gian, đảm bảo tính nhất quán và tận dụng dữ liệu để kết nối bạn với các vai trò tốt nhất. Phương pháp tiếp cận cá nhân hóa cũng tùy chỉnh mỗi đơn ứng tuyển, nâng cao cơ hội thành công của bạn.",
        },
        {
            question: "SmartHire có thể nộp đơn vào các vị trí đã đăng từ 2 tuần trước không?",
            answer: "Có. Chúng tôi quét toàn bộ thị trường hàng ngày, bao gồm cả các bài thông báo mới và cũ. Nếu một vai trò vẫn đang chấp nhận ứng tuyển, chúng tôi sẽ ứng tuyển thay bạn.",
        },
        {
            question: "Đâu là những nền tảng AI tốt nhất để tìm việc?",
            answer: "Có một số nền tảng, nhưng SmartHire nổi bật với ứng dụng tự động, quét công việc hàng ngày và hồ sơ Persona cá nhân hóa. Sự kết hợp độc đáo này khiến nó trở thành một giải pháp hàng đầu để tìm việc được thúc đẩy bằng AI.",
        },
        {
            question: "Tôi có thể tránh nộp đơn vào một số công ty nhất định không?",
            answer: "Có. Bạn có thể cho phép danh sách đen (blacklist) bất kỳ công ty nào vào danh sách loại trừ trong tài khoản, nhờ vậy SmartHire sẽ không bao giờ ứng tuyển vào các công ty đó.",
        },
        {
            question: "Làm thế nào SmartHire xử lý các «bẫy» AI trong bản mô tả công việc?",
            answer: "Hệ thống tiên tiến của chúng tôi phân tích kỹ lưỡng từng danh sách, phát hiện ra các bẫy hay những yêu cầu khắt khe được cài cắm để đánh lừa bot tự động. Chúng tôi đưa ra những phản hồi tự nhiên và chính xác đáp ứng mọi tính năng của con người yêu cầu.",
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
            name: "Hùng T.",
            date: "11/12/2025",
            text: "Lượng thời gian tôi tiết kiệm được với SmartHire thật không thể tin được. Đó là một trong những dịch vụ hữu ích nhất mà tôi từng trả tiền để hệ thống tự chạy.",
            rating: 5,
        },
        {
            name: "Linh N.",
            date: "21/11/2025",
            text: "Sau ba tháng sử dụng SmartHire, tôi đã nhận được rất nhiều phỏng vấn tại các công ty mà lúc trước tôi còn không biết. Quá khủng khiếp!",
            rating: 5,
        },
        {
            name: "Tuấn K.",
            date: "23/11/2025",
            text: "Tôi đã xài gói miễn phí trước, rồi chuyển qua Premium — đó là một nâng cấp rất lớn! Câu trả lời mà bot tạo ra khi ứng tuyển thực sự có ý nghĩa và vừa vặn với tôi.",
            rating: 5,
        },
        {
            name: "Vy H.",
            date: "09/12/2025",
            text: "Là một người mẹ đơn thân, việc cân bằng các công việc với con cái thật mệt mỏi, nên ứng dụng này đã trút một gánh nặng khổng lồ trên vai tôi nhờ việc nộp đơn ngầm tự động.",
            rating: 5,
        },
        {
            name: "Sơn L.",
            date: "23/11/2025",
            text: "Bot ứng tuyển mượt và nhanh quá. Nộp hơn 30 đơn trong một tuần và trúng 5 cái ngay tuần đầu tiên. Đỉnh của đỉnh.",
            rating: 5,
        },
        {
            name: "Lan V.",
            date: "22/11/2025",
            text: "Chồng tôi và tôi cả hai người đều dùng bot auto. Nó tiết kiệm cả mấy tiếng đồng hồ quẹt đi quẹt lại trên LinkedIn để tìm việc.",
            rating: 5,
        },
        {
            name: "Hải P.",
            date: "19/01/2026",
            text: "Trước khi có SmartHire, tôi thuê người nộp đơn với giá $500 một tháng. Còn bây giờ tôi tiết kiệm hơn và làm hiệu quả hơn rất nhiều, tỷ lệ phản hồi lại cao!",
            rating: 5,
        },
        {
            name: "Thu Thủy",
            date: "20/01/2026",
            text: "Thư xin việc và các form trả lời khi bot nộp đỉnh lắm — viết mượt mà và như con người thật.",
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
                        nhận xét
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white mb-4">
                        Từ người dùng của chúng tôi
                    </h2>
                    <p className="text-[#637381] dark:text-[#C4CDD5] text-lg max-w-2xl mx-auto">
                        Mục tiêu của chúng tôi là tạo ra sản phẩm và dịch vụ mà bạn hài lòng và sử dụng hàng ngày.
                        Điều này là cốt lõi để chúng tôi cập nhật cải tiến công cụ nộp đơn hàng ngày.
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
export function AIResumeBuilderPage() {
    return (
        <>
            <AIResumeBuilderHero />
            <StepsSection />
            <FeaturesDetailSection />
            <FAQSection />
            <TestimonialsReviewSection />
        </>
    );
}
