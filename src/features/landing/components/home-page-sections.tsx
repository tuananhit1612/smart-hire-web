"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight, Target, Rocket, Brain, Search, FileText, Users, Briefcase, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ParticleBackground } from "@/shared/components/effects/ParticleBackground";

// ============================================
// HOMEPAGE - SmartHire Design System
// Purple (#22c55e) + Yellow (#FFAB00) Theme
// ============================================

// ─── Hero Section ───────────────────────────────────
export function HeroSection() {
    return (
        <section className="w-full relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden pt-20">

            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[900px] mx-auto flex flex-col items-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6"
                    >
                    </motion.div>

                    {/* H1 */}
                    <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1C252E] dark:text-white leading-[1.2]">
                        <span className="block text-[#1C252E] dark:text-white">Tìm Việc Thông Minh,</span>
                        <span className="block mt-1 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#FFAB00] bg-clip-text text-transparent inline-block pb-3 leading-[1.3]">
                            Thành Công Dễ Dàng!
                        </span>
                    </h1>

                    {/* Subheading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="max-w-2xl mx-auto mb-10"
                    >
                        <p className="text-lg md:text-xl text-[#637381] dark:text-[#C4CDD5] font-normal leading-relaxed">
                            SmartHire - Trợ lý AI tuyển dụng cá nhân của bạn.
                            Phân tích CV thông minh, ghép nối việc làm phù hợp và chuẩn bị phỏng vấn hiệu quả.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                    >
                        <Button asChild variant="primary" size="lg" className="h-14 px-8 text-base bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 shadow-none border-0">
                            <Link href="/register">
                                Dùng Thử Miễn Phí
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base border border-[rgba(145,158,171,0.32)] text-[#1C252E] dark:text-white hover:bg-[rgba(145,158,171,0.08)]">
                            <Link href="/jobs">
                                Xem Việc Làm
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.35 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6"
                    >
                        {/* Avatar Group + Text */}
                        <div className="flex items-center gap-3 bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] border border-[rgba(145,158,171,0.12)] px-4 py-2 rounded-full">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#141A21] overflow-hidden bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">{['T', 'S', 'N'][i - 1]}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="text-left">
                                <p className="text-[#1C252E] dark:text-white font-bold text-sm">23,000+</p>
                                <p className="text-[#C4CDD5] text-xs font-medium uppercase tracking-wider">Ứng viên hài lòng</p>
                            </div>
                        </div>

                        {/* Rating Badge */}
                        <Link href="#" className="flex items-center gap-3 px-4 py-2 bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] border border-[rgba(145,158,171,0.12)] rounded-full">
                            <div className="text-left">
                                <div className="flex items-center gap-1 mb-0.5">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-[#FFAB00] text-[#FFAB00]" />
                                    ))}
                                </div>
                                <p className="text-[#C4CDD5] text-xs">
                                    <span className="text-[#1C252E] dark:text-white font-bold">4.7</span> / 5 dựa trên <span className="text-[#1C252E] dark:text-white font-bold">83</span> đánh giá
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// ─── Features Section ───────────────────────────────
export function FeaturesSection() {
    const features = [
        {
            title: "AI Tìm Kiếm Việc",
            description: "Thuật toán AI thông minh tìm kiếm hàng nghìn tin tuyển dụng, ghép nối vị trí phù hợp với kỹ năng của bạn.",
            icon: Search,
            color: "green"
        },
        {
            title: "Phân Tích CV AI",
            description: "AI tự động phân tích và đánh giá CV của bạn, đề xuất cải thiện để tăng cơ hội được tuyển.",
            icon: FileText,
            color: "yellow"
        },
        {
            title: "Ghép Nối Thông Minh",
            description: "Hiểu hồ sơ của bạn và kết nối với các công ty phù hợp với mục tiêu nghề nghiệp.",
            icon: Target,
            color: "green"
        },
        {
            title: "Luyện Phỏng Vấn",
            description: "Chuẩn bị phỏng vấn với AI, mô phỏng câu hỏi và nhận phản hồi cá nhân hóa.",
            icon: MessageSquare,
            color: "yellow"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white mb-4">
                        Trợ Lý AI Tuyển Dụng Cá Nhân
                    </h2>
                    <p className="text-[#637381] dark:text-[#C4CDD5] text-lg max-w-2xl mx-auto">
                        Để SmartHire lo việc tìm kiếm, bạn tập trung vào điều quan trọng nhất - sự nghiệp của mình.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] rounded-2xl p-6 hover:border-[rgba(145,158,171,0.32)] hover:shadow-lg transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color === 'green'
                                ? 'bg-gradient-to-br from-[#22c55e] to-[#10b981] shadow-lg shadow-green-500/25'
                                : 'bg-gradient-to-br from-[#FFAB00] to-[#FFD666] shadow-lg shadow-yellow-500/25'
                                }`}>
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-[#1C252E] dark:text-white mb-2 group-hover:text-[#22c55e] transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-[#637381] dark:text-[#C4CDD5] text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── How It Works Section ───────────────────────────
export function HowItWorksSection() {
    const steps = [
        {
            number: "01",
            title: "Tạo Hồ Sơ",
            description: "Đăng ký và cho chúng tôi biết về kỹ năng, kinh nghiệm và mong muốn công việc của bạn.",
            icon: Users
        },
        {
            number: "02",
            title: "AI Làm Việc",
            description: "AI của chúng tôi tìm kiếm và ứng tuyển hàng trăm công việc phù hợp tự động.",
            icon: Rocket
        },
        {
            number: "03",
            title: "Nhận Phỏng Vấn",
            description: "Nhận lời mời phỏng vấn trực tiếp từ nhà tuyển dụng.",
            icon: Briefcase
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
                    className="text-center mb-20"
                >
                    <span className="inline-block text-[#22C55E] text-sm font-semibold tracking-widest uppercase mb-4">
                        Quy Trình
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1C252E] dark:text-white mb-4">
                        Cách Hoạt Động
                    </h2>
                    <p className="text-[#637381] dark:text-[#C4CDD5] text-lg max-w-2xl mx-auto">
                        Ba bước đơn giản để tìm được công việc mơ ước với sức mạnh của AI
                    </p>
                </motion.div>

                {/* Connecting Line (desktop) */}
                <div className="hidden md:block absolute top-[58%] left-[15%] right-[15%] h-[2px]">
                    <div className="w-full h-full border-t-2 border-dashed border-[rgba(145,158,171,0.15)] dark:border-[rgba(145,158,171,0.1)]" />
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8 md:gap-10 relative">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative group"
                        >
                            {/* Glow effect behind card on hover */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#22C55E]/20 via-[#22C55E]/10 to-[#22C55E]/20 rounded-[28px] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

                            {/* Card */}
                            <div className="relative backdrop-blur-xl bg-white/70 dark:bg-white/[0.04] border border-white/50 dark:border-white/[0.08] rounded-3xl p-8 md:p-10 text-center transition-all duration-500 group-hover:border-[#22C55E]/30 dark:group-hover:border-[#22C55E]/20 group-hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.15)] group-hover:-translate-y-1">

                                {/* Step Number Badge */}
                                <div className="relative mx-auto mb-8 w-16 h-16">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500 shadow-[0_8px_30px_-5px_rgba(34,197,94,0.3)]" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl flex items-center justify-center">
                                        <span className="text-white text-2xl font-bold">{step.number}</span>
                                    </div>
                                </div>

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-[#F4F6F8] dark:bg-white/[0.06] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500">
                                    <step.icon className="w-6 h-6 text-[#1C252E] dark:text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-[#1C252E] dark:text-white mb-3">{step.title}</h3>
                                <p className="text-[#637381] dark:text-[#919EAB] text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
                            </div>

                            {/* Arrow connector (between cards on desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] shadow-sm flex items-center justify-center">
                                        <ArrowRight className="w-4 h-4 text-[#22C55E]" />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Testimonials Section ───────────────────────────
export function TestimonialsSection() {
    const testimonials = [
        {
            name: "Tuấn",
            role: "Product Manager",
            quote: "Tôi dành 2 tiếng mỗi tối để nộp đơn xin việc. SmartHire đã trả lại những buổi tối cho gia đình tôi.",
            stats: "275 công việc • 14 phỏng vấn • 8 tuần nhận offer"
        },
        {
            name: "Sarah",
            role: "Full-Stack Developer",
            quote: "SmartHire lo việc nộp đơn trong khi tôi tập trung vào dự án. Khi có phỏng vấn, tôi đã sẵn sàng.",
            stats: "Tập trung học tập • Nhận công việc mơ ước • Không kiệt sức"
        },
        {
            name: "Minh",
            role: "Fulfillment Associate",
            quote: "Thiết lập SmartHire và bây giờ nó nộp đơn trong giờ làm việc trong khi tôi ngủ hoặc làm việc. Thay đổi cuộc chơi!",
            stats: "195 công việc • 6 cuộc gọi • 2 phỏng vấn"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white mb-4">
                        Câu Chuyện Thành Công
                    </h2>
                    <p className="text-[#637381] dark:text-[#C4CDD5] text-lg">
                        Kết quả thực từ những người thực
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] rounded-2xl p-6 hover:border-[rgba(145,158,171,0.32)] hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/25">
                                    {testimonial.name[0]}
                                </div>
                                <div>
                                    <h4 className="text-[#1C252E] dark:text-white font-semibold">{testimonial.name}</h4>
                                    <p className="text-[#C4CDD5] text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-[#637381] dark:text-[#C4CDD5] mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                            <p className="text-[#118D57] dark:text-[#22c55e] text-xs font-medium">{testimonial.stats}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Stats Section ──────────────────────────────────
export function StatsSection() {
    const stats = [
        { value: "50K+", label: "Công Việc Đã Ứng Tuyển", icon: Briefcase },
        { value: "23K+", label: "Ứng Viên Hài Lòng", icon: Users },
        { value: "45%+", label: "Tỷ Lệ Phỏng Vấn", icon: Zap },
        { value: "95%", label: "Độ Chính Xác AI", icon: Brain },
    ];

    return (
        <section className="py-16 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="flex justify-center mb-3">
                                <div className="w-12 h-12 rounded-xl bg-[rgba(145,158,171,0.06)] dark:bg-[rgba(145,158,171,0.1)] flex items-center justify-center">
                                    <stat.icon className="w-6 h-6 text-[#1C252E] dark:text-white" />
                                </div>
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-[#1C252E] dark:text-white mb-2">
                                {stat.value}
                            </div>
                            <div className="text-[#637381] dark:text-[#C4CDD5] text-sm uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── CTA Section ────────────────────────────────────
export function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-[#22c55e]/10 via-[#10b981]/5 to-[#FFAB00]/10 border border-[#22c55e]/20 rounded-3xl p-12 text-center relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#22c55e]/5 to-[#FFAB00]/5" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#22c55e]/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFAB00]/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Sẵn Sàng Tìm Việc Mơ Ước?
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                            Tham gia cùng hàng nghìn ứng viên đã tìm được thành công với SmartHire.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button asChild variant="primary" size="lg" className="h-14 px-8 bg-gradient-to-r from-[#22c55e] to-[#10b981] hover:from-[#10b981] hover:to-[#22c55e] shadow-lg shadow-green-500/25 hover:shadow-green-500/40">
                                <Link href="/register">
                                    Bắt Đầu Miễn Phí
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ─── Footer ─────────────────────────────────────────
export function Footer() {
    const footerLinks = {
        "Tính năng": [
            { label: "AI Resume Builder", href: "/cv-builder" },
            { label: "AI Cover Letter", href: "/cover-letter" },
            { label: "AI Tìm Việc", href: "/jobs" },
            { label: "ATS Checker", href: "/ats-checker" }
        ],
        "SmartHire": [
            { label: "Về Chúng Tôi", href: "/about" },
            { label: "Liên Hệ", href: "/contact" },
            { label: "Tuyển Dụng", href: "/careers" }
        ],
        "Pháp lý": [
            { label: "Điều Khoản", href: "/terms" },
            { label: "Chính Sách Bảo Mật", href: "/privacy" }
        ]
    };

    return (
        <footer className="py-16 bg-[#141A21] relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <span className="text-white font-bold text-xl tracking-tight">SmartHire</span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed">
                            SmartHire: Kết nối nhân tài với cơ hội việc làm hoàn hảo thông qua công nghệ AI thông minh.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-white/40 font-semibold mb-4 text-xs uppercase tracking-wider">{title}</h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="!text-white/80 hover:!text-white text-sm transition-colors duration-200">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-sm">
                        © 2026 SmartHire. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="!text-white/40 hover:!text-white transition-colors">
                            <span className="sr-only">Twitter</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </Link>
                        <Link href="#" className="!text-white/40 hover:!text-white transition-colors">
                            <span className="sr-only">LinkedIn</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </Link>
                        <Link href="#" className="!text-white/40 hover:!text-white transition-colors">
                            <span className="sr-only">GitHub</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
