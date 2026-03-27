"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Building2, Globe, Users, ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useRouter } from "next/navigation";
import { companyApi } from "../api/company-api";

/* ─── Animation Variants (Design System §9) ─── */
const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        y: -30,
        scale: 0.98,
        transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
    },
};

const staggerChildren: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

/* ─── Step Indicator ─── */
function StepIndicator({ current, total }: { current: number; total: number }) {
    return (
        <div className="flex items-center gap-2 mb-10">
            {Array.from({ length: total }, (_, i) => {
                const stepNum = i + 1;
                const isActive = stepNum === current;
                const isDone = stepNum < current;
                return (
                    <div key={stepNum} className="flex items-center gap-2">
                        <motion.div
                            animate={{
                                scale: isActive ? 1 : 0.85,
                                backgroundColor: isDone || isActive ? "#22C55E" : "rgba(145,158,171,0.12)",
                            }}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm"
                            style={{ color: isDone || isActive ? "#fff" : "#919EAB" }}
                        >
                            {isDone ? <CheckCircle className="w-4 h-4" /> : stepNum}
                        </motion.div>
                        {i < total - 1 && (
                            <div className="w-10 h-[2px] rounded-full bg-[rgba(145,158,171,0.12)] overflow-hidden">
                                <motion.div
                                    animate={{ width: isDone ? "100%" : "0%" }}
                                    transition={{ duration: 0.4 }}
                                    className="h-full bg-[#22C55E] rounded-full"
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/* ─── Main Component ─── */
export function EmployerOnboarding() {
    const [step, setStep] = useState(1);
    const { completeOnboarding, user } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        companyName: "",
        website: "",
        size: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleComplete = async () => {
        try {
            setIsSubmitting(true);
            await companyApi.createCompany({
                name: formData.companyName,
                website: formData.website,
                companySize: formData.size || undefined,
            });
            completeOnboarding();
            router.push("/employer/dashboard");
        } catch (error) {
            console.error("Failed to create company", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
            {/* Transparent bg — particle background shows through (Design System §10.1) */}

            <StepIndicator current={step} total={3} />

            <AnimatePresence mode="wait">
                {/* ═══ Step 1: Welcome ═══ */}
                {step === 1 && (
                    <motion.div
                        key="welcome"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="max-w-xl w-full text-center"
                    >
                        <motion.div variants={staggerChildren} initial="hidden" animate="visible" className="space-y-6">
                            {/* Overline (§14) */}
                            <motion.span
                                variants={fadeUp}
                                className="inline-block text-[#22C55E] text-sm font-semibold tracking-widest uppercase"
                            >
                                Nhà tuyển dụng
                            </motion.span>

                            {/* Heading (§2.2) */}
                            <motion.h1
                                variants={fadeUp}
                                className="text-4xl md:text-5xl font-bold text-[#1C252E] dark:text-white tracking-tight leading-[1.15]"
                            >
                                Chào mừng đến với{" "}
                                <span className="bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#FFAB00] bg-clip-text text-transparent">
                                    SmartHire
                                </span>
                            </motion.h1>

                            {/* Body (§2.3) */}
                            <motion.p
                                variants={fadeUp}
                                className="text-lg text-[#637381] dark:text-[#C4CDD5] max-w-md mx-auto"
                            >
                                Tìm kiếm, quản lý và tuyển dụng những ứng viên xuất sắc nhất bằng công nghệ AI tiên tiến.
                            </motion.p>

                            {/* CTA — Primary Inverted (§3.1) */}
                            <motion.div variants={fadeUp} className="pt-4">
                                <button
                                    onClick={() => setStep(2)}
                                    className="h-14 px-8 text-base font-semibold rounded-xl bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 transition-colors inline-flex items-center gap-2"
                                >
                                    Thiết lập công ty
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}

                {/* ═══ Step 2: Company Info ═══ */}
                {step === 2 && (
                    <motion.div
                        key="company-info"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="max-w-md w-full"
                    >
                        {/* Glassmorphism Card (§4.2) */}
                        <div className="relative group">
                            {/* Glow behind card */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#22C55E]/20 via-[#22C55E]/10 to-[#22C55E]/20 rounded-[28px] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

                            <div className="relative backdrop-blur-xl bg-white/70 dark:bg-white/[0.04] border border-white/50 dark:border-white/[0.08] rounded-3xl p-8 md:p-10 transition-all duration-500 group-hover:border-[#22C55E]/30 dark:group-hover:border-[#22C55E]/20 group-hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.15)]">
                                <motion.div variants={staggerChildren} initial="hidden" animate="visible" className="space-y-6">
                                    {/* Section Header */}
                                    <motion.div variants={fadeUp}>
                                        <h2 className="text-2xl font-bold text-[#1C252E] dark:text-white mb-1">
                                            Thông tin công ty
                                        </h2>
                                        <p className="text-sm text-[#919EAB]">Điền thông tin cơ bản để bắt đầu</p>
                                    </motion.div>

                                    {/* Form Fields */}
                                    <motion.div variants={fadeUp} className="space-y-2">
                                        <label className="text-sm font-semibold text-[#1C252E] dark:text-white flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-[#22c55e]/10 flex items-center justify-center">
                                                <Building2 className="w-3.5 h-3.5 text-[#22c55e]" />
                                            </div>
                                            Tên doanh nghiệp
                                        </label>
                                        <input
                                            placeholder="VD: SmartHire Platform"
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                            className="w-full h-12 rounded-xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] px-4 text-[#1C252E] dark:text-white placeholder:text-[#919EAB] focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30 focus:border-[#22C55E]/50 transition-all text-sm"
                                        />
                                    </motion.div>

                                    <motion.div variants={fadeUp} className="space-y-2">
                                        <label className="text-sm font-semibold text-[#1C252E] dark:text-white flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-[#22c55e]/10 flex items-center justify-center">
                                                <Globe className="w-3.5 h-3.5 text-[#22c55e]" />
                                            </div>
                                            Website
                                        </label>
                                        <input
                                            placeholder="https://congtycuaban.com"
                                            value={formData.website}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            className="w-full h-12 rounded-xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] px-4 text-[#1C252E] dark:text-white placeholder:text-[#919EAB] focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30 focus:border-[#22C55E]/50 transition-all text-sm"
                                        />
                                    </motion.div>

                                    <motion.div variants={fadeUp} className="space-y-2">
                                        <label className="text-sm font-semibold text-[#1C252E] dark:text-white flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-[#22c55e]/10 flex items-center justify-center">
                                                <Users className="w-3.5 h-3.5 text-[#22c55e]" />
                                            </div>
                                            Quy mô nhân sự
                                        </label>
                                        <select
                                            className="w-full h-12 rounded-xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] px-4 text-[#1C252E] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30 focus:border-[#22C55E]/50 transition-all text-sm appearance-none"
                                            value={formData.size}
                                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                        >
                                            <option value="" disabled>Chọn quy mô</option>
                                            <option value="1-10">1 - 10 nhân viên</option>
                                            <option value="11-50">11 - 50 nhân viên</option>
                                            <option value="51-200">51 - 200 nhân viên</option>
                                            <option value="200+">Hơn 200 nhân viên</option>
                                        </select>
                                    </motion.div>

                                    {/* Buttons — Outline + Primary (§3.1 + §3.2) */}
                                    <motion.div variants={fadeUp} className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="h-12 px-6 rounded-xl text-sm font-semibold border border-[rgba(145,158,171,0.32)] text-[#1C252E] dark:text-white hover:bg-[rgba(145,158,171,0.08)] transition-colors"
                                        >
                                            Trở lại
                                        </button>
                                        <button
                                            onClick={() => setStep(3)}
                                            disabled={!formData.companyName}
                                            className="h-12 flex-1 rounded-xl text-sm font-semibold bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                                        >
                                            Tiếp tục
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══ Step 3: Complete ═══ */}
                {step === 3 && (
                    <motion.div
                        key="complete"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="max-w-lg w-full text-center"
                    >
                        <motion.div variants={staggerChildren} initial="hidden" animate="visible" className="space-y-8">
                            {/* Success Icon — Green Gradient (§5.2) */}
                            <motion.div
                                variants={fadeUp}
                                className="flex justify-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                                    className="w-24 h-24 rounded-full bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center shadow-[0_16px_32px_-8px_rgba(34,197,94,0.4)]"
                                >
                                    <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
                                </motion.div>
                            </motion.div>

                            <motion.div variants={fadeUp} className="space-y-3">
                                <h2 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white">
                                    Hoàn tất thiết lập!
                                </h2>
                                <p className="text-lg text-[#637381] dark:text-[#C4CDD5]">
                                    Hồ sơ công ty{" "}
                                    <span className="font-bold text-[#1C252E] dark:text-white">
                                        {formData.companyName}
                                    </span>{" "}
                                    đã được tạo thành công.
                                </p>
                            </motion.div>

                            {/* Info card (§4.1) */}
                            <motion.div
                                variants={fadeUp}
                                className="p-6 rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] text-left"
                            >
                                <p className="text-sm font-semibold text-[#919EAB] mb-4">Điều gì tiếp theo?</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#22C55E] mt-0.5">✨</span>
                                        <span className="text-sm text-[#637381] dark:text-[#C4CDD5]">
                                            Đăng tin tuyển dụng và AI sẽ tự động sàng lọc ứng viên phù hợp.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#22C55E] mt-0.5">🚀</span>
                                        <span className="text-sm text-[#637381] dark:text-[#C4CDD5]">
                                            Quản lý pipeline tuyển dụng trực quan và hiệu quả.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#22C55E] mt-0.5">📊</span>
                                        <span className="text-sm text-[#637381] dark:text-[#C4CDD5]">
                                            Xem dashboard phân tích hiệu quả tuyển dụng theo thời gian thực.
                                        </span>
                                    </li>
                                </ul>
                            </motion.div>

                            {/* CTA Button — Primary (§3.1) */}
                            <motion.div variants={fadeUp}>
                                <button
                                    onClick={handleComplete}
                                    disabled={isSubmitting}
                                    className="w-full h-14 rounded-xl text-base font-semibold bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? "Đang xử lý..." : "Truy cập Dashboard"}
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
