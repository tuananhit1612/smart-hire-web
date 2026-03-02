"use client";

import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";

interface StepWelcomeProps {
    onNext: () => void;
}

export function StepWelcome({ onNext }: StepWelcomeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center space-y-8 p-8"
        >
            <div className="space-y-4 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-500 dark:to-amber-400">
                    Hãy xây dựng chiến lược tìm việc cá nhân hóa của bạn
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Trước tiên, chúng tôi sẽ hỏi một vài câu ngắn để hiểu điều gì là quan trọng nhất với bạn. Chỉ mất khoảng một phút thôi.
                </p>
            </div>

            <div className="relative w-full max-w-md h-64 md:h-80 mx-auto rounded-3xl overflow-hidden glass-card flex items-center justify-center bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl border border-[rgba(145,158,171,0.12)]">
                {/* Fallback graphic matching SmartHire's tech style instead of Wobo's lottie */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/10 to-transparent dark:from-[#22c55e]/5" />
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(34,197,94,0.3)]"
                >
                    <span className="text-white font-bold text-6xl">S</span>
                </motion.div>
            </div>

            <Button
                onClick={onNext}
                size="lg"
                className="rounded-full px-12 py-6 text-lg font-semibold shadow-[0_8px_16px_rgba(34,197,94,0.24)] hover:-translate-y-1 transition-all duration-300 bg-[#1C252E] text-white dark:bg-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90"
            >
                Bắt đầu
            </Button>
        </motion.div>
    );
}
