"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";


const resumeFeatures = [
    {
        icon: CheckCircle,
        text: "Tạo CV chuyên nghiệp, chuẩn ATS trong vài phút.",
    },
    {
        icon: TrendingUp,
        text: "Phân tích và đánh giá CV để tối ưu hóa cơ hội.",
    },
    {
        icon: Sparkles,
        text: "Gợi ý cải thiện nội dung bằng AI thông minh.",
    },
];

export function ResumeBuilderSection() {
    return (
        <section className="w-full py-24 relative overflow-hidden">

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Side: Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <span className="text-[#22c55e] font-bold tracking-wider uppercase text-[11px] mb-3">
                            Gây ấn tượng với nhà tuyển dụng
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white mb-6">
                            AI Resume Builder
                        </h2>
                        <p className="text-lg text-[#637381] dark:text-[#C4CDD5] leading-relaxed mb-8">
                            Công cụ{" "}
                            <strong className="text-[#1C252E] dark:text-white">
                                tạo CV bằng AI
                            </strong>{" "}
                            của chúng tôi xây dựng các bản CV hiện đại,{" "}
                            <strong className="text-[#1C252E] dark:text-white">
                                chuẩn ATS
                            </strong>{" "}
                            giúp bạn nổi bật giữa hàng nghìn ứng viên và nhận
                            được nhiều lời mời phỏng vấn hơn. AI sẽ phân tích
                            nội dung, đề xuất cải thiện và cho bạn điểm đánh giá
                            để tối ưu hóa hiệu quả.
                        </p>

                        {/* Feature Checklist */}
                        <div className="space-y-4 mb-10">
                            {resumeFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1,
                                    }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 flex items-center justify-center shrink-0">
                                        <feature.icon className="w-4 h-4 text-[#22c55e]" />
                                    </div>
                                    <p className="text-sm font-medium text-[#637381] dark:text-[#C4CDD5]">
                                        {feature.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <div>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 text-base font-semibold border-[rgba(145,158,171,0.32)] text-[#1C252E] dark:text-white hover:text-[#22c55e] hover:border-[#22c55e]"
                                asChild
                            >
                                <Link href="/cv-builder">
                                    Tạo CV ngay{" "}
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Side: Animated Resume Illustration */}
                    <div className="w-full lg:w-1/2 relative">
                        {/* Decorative background blur */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="relative"
                        >
                            {/* Resume Mockup Card */}
                            <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] border border-[rgba(145,158,171,0.12)] bg-white dark:bg-[#1C252E] max-w-md mx-auto">
                                {/* Browser bar */}
                                <div className="h-8 bg-[rgba(145,158,171,0.06)] dark:bg-slate-800 border-b border-[rgba(145,158,171,0.12)] flex items-center px-3 gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-400/60" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                                    <div className="w-2 h-2 rounded-full bg-green-400/60" />
                                    <div className="ml-3 h-4 w-32 bg-[rgba(145,158,171,0.12)] rounded-full" />
                                </div>

                                {/* Resume Content */}
                                <div className="p-8">
                                    {/* Header Section */}
                                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[rgba(145,158,171,0.12)]">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/20">
                                            T
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#1C252E] dark:text-white">
                                                Tuấn Anh
                                            </h3>
                                            <p className="text-sm text-[#C4CDD5]">
                                                Full-Stack Developer
                                            </p>
                                            <div className="flex gap-2 mt-2">
                                                <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">
                                                    React
                                                </span>
                                                <span className="px-2.5 py-0.5 bg-amber-900/30 text-amber-400 text-[10px] font-bold uppercase rounded-full">
                                                    Node.js
                                                </span>
                                                <span className="px-2.5 py-0.5 bg-purple-900/30 text-purple-400 text-[10px] font-bold uppercase rounded-full">
                                                    AWS
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ATS Score */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.3,
                                        }}
                                        className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-emerald-500/5 border border-primary/10"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-[#C4CDD5] uppercase tracking-wider">
                                                Điểm ATS
                                            </span>
                                            <span className="text-2xl font-black text-[#22c55e]">
                                                92
                                                <span className="text-sm text-[#C4CDD5]">
                                                    /100
                                                </span>
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-[rgba(145,158,171,0.12)] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "92%" }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 1.2,
                                                    delay: 0.5,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Skeleton lines */}
                                    <div className="space-y-3">
                                        <div className="h-3 bg-[rgba(145,158,171,0.12)] rounded-full w-full" />
                                        <div className="h-3 bg-[rgba(145,158,171,0.12)] rounded-full w-4/5" />
                                        <div className="h-3 bg-[rgba(145,158,171,0.12)] rounded-full w-3/4" />
                                        <div className="h-3 bg-[rgba(145,158,171,0.12)] rounded-full w-full mt-5" />
                                        <div className="h-3 bg-[rgba(145,158,171,0.12)] rounded-full w-5/6" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="absolute -top-4 -right-4 lg:-right-8 bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] rounded-xl shadow-xl p-3 flex items-center gap-2"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[#1C252E] dark:text-white">
                                        Chuẩn ATS
                                    </p>
                                    <p className="text-[10px] text-[#22c55e] font-semibold">
                                        Tối ưu 100%
                                    </p>
                                </div>
                            </motion.div>

                            {/* Floating badge 2 */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="absolute -bottom-4 -left-4 lg:-left-8 bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] rounded-xl shadow-xl p-3 flex items-center gap-2"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[#1C252E] dark:text-white">
                                        AI Gợi Ý
                                    </p>
                                    <p className="text-[10px] text-amber-500 font-semibold">
                                        +3 đề xuất mới
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
