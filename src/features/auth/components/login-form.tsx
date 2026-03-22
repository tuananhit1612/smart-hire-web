"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Fingerprint, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { useAuth } from "../hooks/use-auth";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toastHelpers = useToastHelpers();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email.trim() || !password) {
            setError("Vui lòng nhập email và mật khẩu.");
            return;
        }

        setIsLoading(true);
        try {
            const user = await login(email.trim(), password);

            toastHelpers.success(
                "Chào mừng trở lại!",
                `Xin chào ${user.name}, bạn đã đăng nhập thành công.`
            );

            const callbackUrl = searchParams.get("callbackUrl");
            if (callbackUrl) {
                router.push(callbackUrl);
            } else {
                const redirectMap: Record<string, string> = {
                    candidate: "/jobs",
                    employer: "/employer/dashboard",
                    admin: "/admin/dashboard",
                };
                router.push(redirectMap[user.role] ?? "/jobs");
            }
        } catch (err: unknown) {
            const msg =
                err instanceof Error
                    ? err.message
                    : "Đã có lỗi xảy ra. Vui lòng thử lại.";
            setError(msg);
        } finally {
            setIsLoading(false);
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
                    Đăng nhập
                </h1>
                <p className="text-[#637381] dark:text-[#C4CDD5] text-sm">
                    Nhập email và mật khẩu để tiếp tục.
                </p>
            </motion.div>

            <form onSubmit={handleLogin} className="space-y-4">
                {/* Error */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-3 rounded-xl text-sm font-medium bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Email */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-[#1C252E] dark:text-white">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#919EAB]" />
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-12 pl-11 pr-4 rounded-xl border border-[rgba(145,158,171,0.2)] dark:border-[rgba(145,158,171,0.12)] bg-transparent text-sm text-[#1C252E] dark:text-white placeholder:text-[#919EAB] focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] outline-none transition-all"
                        />
                    </div>
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-semibold text-[#1C252E] dark:text-white">
                            Mật khẩu
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-xs font-semibold text-[#22C55E] hover:text-[#16A34A] transition-colors"
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#919EAB]" />
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-12 pl-11 pr-11 rounded-xl border border-[rgba(145,158,171,0.2)] dark:border-[rgba(145,158,171,0.12)] bg-transparent text-sm text-[#1C252E] dark:text-white placeholder:text-[#919EAB] focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] outline-none transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#919EAB] hover:text-[#637381] transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                        </button>
                    </div>
                </motion.div>

                {/* Submit */}
                <motion.div variants={itemVariants} className="pt-4">
                    <Button
                        type="submit"
                        className="w-full h-12 text-base font-semibold bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 shadow-none border-0 rounded-xl transition-all"
                        isLoading={isLoading}
                        variant="primary"
                    >
                        Đăng nhập
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
                        Chưa có tài khoản?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-[#22C55E] hover:text-[#16A34A] transition-colors"
                        >
                            Đăng ký ngay
                        </Link>
                    </p>
                </motion.div>
            </form>
        </motion.div>
    );
}
