"use client";

import { BackButton } from "@/shared/components/ui/back-button";
import { motion } from "framer-motion";
import { Mic2, BrainCircuit, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InterviewPage() {
    return (
        <section className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-md w-full"
            >
                {/* Back button */}
                <div className="flex justify-start mb-8">
                    <BackButton fallbackHref="/dashboard" />
                </div>

                {/* Icon */}
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-sky-500/25">
                    <Mic2 className="w-9 h-9 text-white" />
                </div>

                {/* Content */}
                <h1 className="text-3xl font-bold text-[#1C252E] dark:text-white mb-3">
                    Phỏng vấn AI
                </h1>
                <p className="text-[#637381] dark:text-[#919EAB] text-base leading-relaxed mb-8">
                    Tính năng phỏng vấn thông minh với AI đang được phát triển.
                    Bạn có thể bắt đầu một buổi luyện tập phỏng vấn ngay bây giờ!
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/interview/setup"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20"
                    >
                        <BrainCircuit className="w-5 h-5" />
                        Bắt đầu phỏng vấn thử
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
