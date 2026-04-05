"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { onboardingApi, OnboardingCvData, CompleteOnboardingPayload } from "../api/onboarding-api";

interface StepCompleteProps {
    preferences: {
        activationMethod: "ai" | "manual" | null;
        role: string | null;
        experience: string | null;
        cvData: OnboardingCvData | null;
    };
}

const mapExperience = (label: string | null) => {
    switch (label) {
        case "Mới ra trường": return "JUNIOR";
        case "Trình độ trung cấp": return "MID";
        case "Cao cấp / Chuyên viên": return "SENIOR";
        case "Quản lý / Trưởng nhóm": return "MANAGER";
        default: return "JUNIOR";
    }
};

export function StepComplete({ preferences }: StepCompleteProps) {
    const router = useRouter();
    const { completeOnboarding: authCompleteOnboarding } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasSubmitted = useRef(false);

    const submitData = async () => {
        setIsSubmitting(true);
        setError(null);
        hasSubmitted.current = true;
        
        try {
            // Build verified CV data, converting gender to backend enum
            let cvData = undefined;
            if (preferences.activationMethod === "ai" && preferences.cvData) {
                const raw = preferences.cvData;
                // Map Vietnamese gender labels to backend enum
                const genderMap: Record<string, string> = {
                    "Nam": "MALE", "Nữ": "FEMALE", "Khác": "OTHER",
                    "MALE": "MALE", "FEMALE": "FEMALE", "OTHER": "OTHER",
                };
                cvData = {
                    ...raw,
                    gender: genderMap[raw.gender] || raw.gender || "OTHER",
                };
            }

            const payload: CompleteOnboardingPayload = {
                roleId: preferences.role || "Candidate",
                experienceLevel: mapExperience(preferences.experience),
                verifiedCvData: cvData,
            };
            
            console.log("[StepComplete] Sending payload:", JSON.stringify(payload, null, 2));
            
            await onboardingApi.completeOnboarding(payload);
            setIsSubmitting(false);
        } catch (err: any) {
            console.error("Lỗi khi hoàn tất onboarding:", err);
            setIsSubmitting(false);
            setError(err?.message || "Đã xảy ra lỗi khi lưu thông tin. Vui lòng thử lại.");
        }
    };

    useEffect(() => {
        if (!hasSubmitted.current) {
            submitData();
        }
    }, []);

    const handleGoToDashboard = () => {
        // Mark onboarding complete in auth context
        authCompleteOnboarding();
        // Force a hard navigation to guarantee server reads the updated session cookie
        // and avoids React Context state batching race conditions with usePathname.
        window.location.href = "/dashboard";
    };

    if (isSubmitting) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center w-full max-w-lg mx-auto text-center space-y-6 p-8 min-h-[400px]"
            >
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Đang lưu hồ sơ của bạn
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Vui lòng đợi vài giây để chúng tôi thiết lập trải nghiệm cá nhân hóa cho bạn...
                    </p>
                </div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center w-full max-w-lg mx-auto text-center space-y-6 p-8 min-h-[400px]"
            >
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Opps, có lỗi xảy ra!
                    </h2>
                    <p className="text-red-500">{error}</p>
                </div>
                <Button
                    onClick={() => {
                        submitData();
                    }}
                    className="mt-4"
                >
                    Thử lại
                </Button>
            </motion.div>
        );
    }

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
                    <span className="font-semibold text-slate-900 dark:text-white capitalize">{preferences.role || "Ứng viên"}</span>
                    {" "}với cấp độ{" "}
                    <span className="font-semibold text-slate-900 dark:text-white">{preferences.experience || "Mới bắt đầu"}</span>.
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
