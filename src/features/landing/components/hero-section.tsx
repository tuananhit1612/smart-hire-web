"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring, type Variants } from "framer-motion";
import Image from "next/image";
import { Star, Play, Zap, Search, FileText, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useRef, useState, useEffect } from "react";

import { AnimatedBackground } from "@/shared/components/effects/AnimatedBackground";

// Floating Cards with Job Search Animation
const FloatingCards = () => {
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.5 + i * 0.15,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            },
        }),
    };

    return (
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
            {/* Card 1 - Job Match */}
            <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="absolute top-1/4 left-[5%] xl:left-[10%]"
                style={{ y: "-50%" }}
            >
                <div className="bg-white/90 dark:bg-[#1C252E]/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 dark:border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Search className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Tìm thấy</p>
                            <p className="text-xs text-green-600 dark:text-green-400 font-medium">247 việc làm phù hợp</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                                key={i}
                                className="h-1.5 rounded-full bg-green-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${15 + i * 3}px` }}
                                transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Card 2 - Resume Score */}
            <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="absolute top-1/3 right-[5%] xl:right-[10%]"
                style={{ y: "-50%" }}
            >
                <div className="bg-white/90 dark:bg-[#1C252E]/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 dark:border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">ATS Score</p>
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">92/100</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Card 3 - AI Success */}
            <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="absolute bottom-1/4 left-[8%] xl:left-[12%]"
                style={{ y: "50%" }}
            >
                <div className="bg-white/90 dark:bg-[#1C252E]/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 dark:border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">AI đã nộp</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">15 đơn xin hôm nay</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Typing Effect Component
const TypingEffect = ({ texts }: { texts: string[] }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fullText = texts[currentTextIndex];

            if (!isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length + 1));
                if (currentText === fullText) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setCurrentText(fullText.substring(0, currentText.length - 1));
                if (currentText === "") {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentTextIndex, texts]);

    return <span className="text-green-500 dark:text-green-400">{currentText}</span>;
};

// Reviews Badge Component
const ReviewsBadge = () => {
    return (
        <Link
            href="https://reviews.io"
            target="_blank"
            className="flex items-center gap-2 text-[#1C252E] dark:text-white hover:opacity-80 transition-opacity"
        >
            <div className="flex gap-[2px]">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
            </div>
            <span className="text-sm font-medium">
                <span className="font-bold">4.7</span> out of 5 based on <span className="font-bold">83</span> reviews
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Star className="w-3 h-3" />
                Reviews.io
            </span>
        </Link>
    );
};

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-[#141A21]"
        >
            {/* ============================================ */}
            {/* MODERN BACKGROUND ANIMATION LAYERS (2026) */}
            {/* ============================================ */}
            <AnimatedBackground showRings={true} particleCount={35} />

            {/* Floating Cards */}
            <FloatingCards />

            {/* Content */}
            <motion.div
                style={{ y, opacity }}
                className="container mx-auto px-4 relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[900px] mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 dark:bg-green-900/30 border border-green-200/50 dark:border-green-700/50 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                🚀 Hơn 23,000+ ứng viên đã tìm được việc
                            </span>
                        </div>
                    </motion.div>

                    {/* H1 - Animated Gradient */}
                    <h1 className="text-center font-heading font-extrabold text-[2rem] sm:text-[2.5rem] md:text-[2.75rem] lg:text-[4.5rem] leading-[1.1] lg:leading-[90px] mb-6">
                        <span className="block text-[#1C252E] dark:text-white opacity-90">
                            Tìm Việc Nhanh Hơn,
                        </span>
                        <span className="block mt-1">
                            <span className="bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#FFAB00] bg-[length:400%_400%] bg-clip-text text-transparent animate-gradient">
                                Thành Công Dễ Dàng!
                            </span>
                        </span>
                    </h1>

                    {/* Subtitle with Typing Effect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-[680px] mx-auto mb-8"
                    >
                        <p className="text-center text-lg md:text-xl text-gray-600 dark:text-gray-300 font-normal leading-relaxed">
                            SmartHire - <span className="text-[#1C252E] dark:text-white font-semibold">Trợ lý AI tuyển dụng</span> cá nhân của bạn.
                            Tìm kiếm và ứng tuyển tự động vào các công việc phù hợp nhất. Phỏng vấn, không phải đơn xin việc!
                        </p>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10"
                    >
                        {/* Avatar Group */}
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-3">
                                {[
                                    "/assets/images/mock/avatar/avatar-4.webp",
                                    "/assets/images/mock/avatar/avatar-3.webp",
                                    "/assets/images/mock/avatar/avatar-2.webp"
                                ].map((src, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#141A21] overflow-hidden bg-gray-200 relative z-[30-i]">
                                        <Image src={src} alt="Avatar" width={40} height={40} className="object-cover" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-[#1C252E] dark:text-white font-semibold text-sm">
                                23,000+ Khách hàng hài lòng
                            </span>
                        </div>

                        {/* Reviews Badge */}
                        <ReviewsBadge />
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        {/* Primary CTA */}
                        <Button asChild className="h-14 px-8 text-base font-bold rounded-full shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all group">
                            <Link href="/register">
                                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                                Dùng Thử Miễn Phí
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>

                        {/* Secondary CTA */}
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-bold rounded-full border-2 border-gray-300 dark:border-gray-700 hover:border-[#22c55e] hover:text-[#22c55e]">
                            <Link href="/about">
                                <Play className="w-5 h-5 mr-2" />
                                Xem Cách Hoạt Động
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50"
                    >
                        {[
                            { value: "247", label: "Việc làm/ngày" },
                            { value: "92%", label: "ATS Score" },
                            { value: "15min", label: "Thời gian thiết lập" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <p className="text-2xl md:text-3xl font-bold text-[#1C252E] dark:text-white">{stat.value}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex justify-center pt-2"
                >
                    <motion.div
                        animate={{ opacity: [1, 0], y: [0, 10] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-gray-400"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
