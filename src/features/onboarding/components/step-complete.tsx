"use client";

import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/use-auth";

interface StepCompleteProps {
    role: string | null;
    experience: string | null;
}

export function StepComplete({ role, experience }: StepCompleteProps) {
    const router = useRouter();
    const { completeOnboarding } = useAuth();

    const handleGoToDashboard = () => {
        // Mark onboarding complete in auth context
        completeOnboarding();
        // Here we would typically save the user's preferences to the backend
        router.push("/jobs");
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center w-full max-w-lg mx-auto text-center space-y-8 p-4 sm:p-8"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center shadow-[0_16px_32px_-8px_rgba(34,197,94,0.4)]"
            >
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
            </motion.div>

            <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-500 dark:to-amber-400">
                    Tuyệt vời! Bạn đã hoàn tất.
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Chúng tôi đã cá nhân hóa trải nghiệm SmartHire cho các vị trí{" "}
                    <span className="font-semibold text-slate-900 dark:text-white capitalize">{role || "Ứng viên"}</span>
                    {" "}với cấp độ{" "}
                    <span className="font-semibold text-slate-900 dark:text-white">{experience || "Mới bắt đầu"}</span>.
                </p>
            </div>

            <div className="w-full mt-8 p-6 rounded-2xl border border-[rgba(145,158,171,0.12)] bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Điều gì sẽ xảy ra tiếp theo?</p>
                <ul className="text-left space-y-3">
                    <li className="flex items-start gap-3">
                        <span className="text-emerald-500 mt-0.5">✨</span>
                        <span className="text-slate-700 dark:text-slate-300 text-sm">Chúng tôi sẽ cho bạn thấy các công việc liên quan cao nhất.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-emerald-500 mt-0.5">🚀</span>
                        <span className="text-slate-700 dark:text-slate-300 text-sm">AI của chúng tôi sẽ giúp tối ưu hóa CV cho các vị trí này.</span>
                    </li>
                </ul>
            </div>

            <Button
                onClick={handleGoToDashboard}
                size="lg"
                className="w-full rounded-full shadow-[0_8px_16px_rgba(34,197,94,0.24)] bg-[#22c55e] hover:bg-[#10b981] text-white py-6 text-lg font-semibold"
            >
                Bắt đầu tìm việc
            </Button>
        </motion.div>
    );
}
