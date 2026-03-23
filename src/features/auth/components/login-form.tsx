"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Github, Fingerprint, User, Briefcase, Sparkles, UserCheck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { useAuth } from "../hooks/use-auth";
import type { MockUserKey } from "../types/auth-types";
import { cn } from "@/lib/utils";

const MOCK_OPTIONS = [
    {
        id: "candidate-new" as MockUserKey,
        label: "Ứng viên (Mới)",
        desc: "Luồng tạo CV / Hoàn thiện hồ sơ lần đầu",
        icon: Sparkles,
        role: "candidate"
    },
    {
        id: "candidate-returning" as MockUserKey,
        label: "Ứng viên (Đã có data)",
        desc: "Luồng tìm việc / Quản lý việc làm, CV",
        icon: User,
        role: "candidate"
    },
    {
        id: "employer-new" as MockUserKey,
        label: "Nhà tuyển dụng (Mới)",
        desc: "Luồng setup thông tin công ty lần đầu",
        icon: ShieldCheck,
        role: "employer"
    },
    {
        id: "employer-returning" as MockUserKey,
        label: "Nhà tuyển dụng (Đã có data)",
        desc: "Luồng quản lý ứng viên, tin tuyển dụng",
        icon: Briefcase,
        role: "employer"
    },
];

export function LoginForm() {
    const [selectedRoleKey, setSelectedRoleKey] = useState<MockUserKey>("candidate-returning");
    const [isLoading, setIsLoading] = useState(false);
    const toastHelpers = useToastHelpers();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock login — selectedRoleKey selects user persona, real API needs email+password
        await login(`${selectedRoleKey}@mock.smarthire.ai`, "mock-password");
        setIsLoading(false);

        toastHelpers.success("Chào mừng trở lại!", "Bạn đã đăng nhập thành công giả lập.");

        const callbackUrl = searchParams.get("callbackUrl");
        if (callbackUrl) {
            router.push(callbackUrl);
        } else {
            // Role mapping for fallback
            const role = MOCK_OPTIONS.find(o => o.id === selectedRoleKey)?.role;
            const redirectMap: Record<string, string> = {
                candidate: "/jobs",
                employer: "/employer/dashboard",
                admin: "/admin/dashboard",
            };
            router.push(redirectMap[role || "candidate"] ?? "/jobs");
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, duration: 0.4 }}
            className="space-y-6"
        >
            {/* Header */}
            <motion.div className="space-y-2 text-center mb-6" variants={itemVariants}>
                <div className="inline-flex items-center justify-center w-14 h-14 mb-3 rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#10b981] shadow-lg shadow-green-500/25">
                    <Fingerprint className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-[#1C252E] dark:text-white">
                    Simulate Login
                </h1>
                <p className="text-[#637381] dark:text-[#C4CDD5] text-sm">
                    Chọn một tài khoản mock dưới đây để trải nghiệm các luồng.
                </p>
            </motion.div>

            <form onSubmit={handleLogin} className="space-y-4">

                <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3">
                    {MOCK_OPTIONS.map((option) => {
                        const Icon = option.icon;
                        const isSelected = selectedRoleKey === option.id;
                        return (
                            <div
                                key={option.id}
                                onClick={() => setSelectedRoleKey(option.id)}
                                className={cn(
                                    "relative flex items-center p-4 border rounded-xl cursor-pointer transition-all",
                                    isSelected
                                        ? "border-[#22c55e] bg-[#22c55e]/5 shadow-sm"
                                        : "border-[rgba(145,158,171,0.2)] dark:border-[rgba(145,158,171,0.12)] hover:bg-[rgba(145,158,171,0.04)]"
                                )}
                            >
                                <div className={cn(
                                    "flex items-center justify-center w-10 h-10 rounded-full mr-4 transition-colors",
                                    isSelected
                                        ? "bg-[#22c55e]/20 text-[#22c55e]"
                                        : "bg-[rgba(145,158,171,0.08)] text-[#637381] dark:text-[#919EAB]"
                                )}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className={cn("text-sm font-bold", isSelected ? "text-[#22c55e]" : "text-[#1C252E] dark:text-white")}>
                                        {option.label}
                                    </h3>
                                    <p className="text-xs text-[#919EAB] mt-0.5">
                                        {option.desc}
                                    </p>
                                </div>
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center ml-2",
                                    isSelected ? "border-[#22c55e]" : "border-[rgba(145,158,171,0.32)]"
                                )}>
                                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Submit */}
                <motion.div variants={itemVariants} className="pt-4">
                    <Button
                        type="submit"
                        className="w-full h-12 text-base font-semibold bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 shadow-none border-0 rounded-xl transition-all"
                        isLoading={isLoading}
                        variant="primary"
                    >
                        Đăng nhập bằng Mock
                    </Button>
                </motion.div>

                {/* Divider */}
                <motion.div className="relative w-full py-3" variants={itemVariants}>
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-[rgba(145,158,171,0.2)] dark:border-white/[0.08]" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase font-medium">
                        <span className="bg-white/80 dark:bg-white/[0.04] px-3 text-[#919EAB]">
                            Hoặc
                        </span>
                    </div>
                </motion.div>

                {/* Register link */}
                <motion.div variants={itemVariants}>
                    <p className="text-center text-sm text-[#637381] dark:text-[#C4CDD5]">
                        <Link
                            href="/register"
                            className="font-semibold text-[#22C55E] hover:text-[#16A34A] transition-colors"
                        >
                            Đăng ký tài khoản
                        </Link>
                    </p>
                </motion.div>
            </form>
        </motion.div>
    );
}
