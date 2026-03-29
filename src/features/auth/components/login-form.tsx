"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Fingerprint, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { useAuth } from "../hooks/use-auth";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
    email: z.string().email("Vui lòng nhập địa chỉ email hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toastHelpers = useToastHelpers();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setIsLoading(true);
        try {
            const sessionUser = await login(data.email, data.password);
            toastHelpers.success("Đăng nhập thành công!", "Chào mừng trở lại SmartHire.");

            const callbackUrl = searchParams.get("callbackUrl");
            if (callbackUrl) {
                router.push(callbackUrl);
            } else if (sessionUser.role === "candidate" && sessionUser.isOnboarded === false) {
                // Candidate hasn't completed onboarding yet
                router.push("/dashboard/onboarding");
            } else {
                router.push("/dashboard");
            }
        } catch (error: any) {
            toastHelpers.error("Đăng nhập thất bại", error.message || "Vui lòng kiểm tra lại email hoặc mật khẩu.");
        } finally {
            setIsLoading(false);
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 },
    };

    // Common input classes matching Design System
    const inputClasses = "h-12 bg-transparent border-[rgba(145,158,171,0.2)] dark:border-[rgba(145,158,171,0.12)] focus:border-[#22C55E] focus:ring-[#22C55E]/10 rounded-xl transition-all text-[#1C252E] dark:text-white placeholder:text-[#919EAB]";

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
                    Đăng nhập hệ thống
                </h1>
                <p className="text-[#637381] dark:text-[#C4CDD5] text-sm">
                    Nhập email và mật khẩu của bạn để tiếp tục.
                </p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <motion.div variants={itemVariants}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="ten@congty.com"
                        error={errors.email?.message}
                        {...register("email")}
                        className={inputClasses}
                        startIcon={<Mail className="text-[#919EAB] w-4 h-4" />}
                    />
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants}>
                    <div className="relative">
                        <Input
                            label="Mật khẩu"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register("password")}
                            className={`${inputClasses} pr-10`}
                            startIcon={<Lock className="text-[#919EAB] w-4 h-4" />}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[38px] text-[#919EAB] hover:text-[#637381] dark:hover:text-[#C4CDD5] transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="flex justify-end mt-1">
                        <Link href="/forgot-password" className="text-xs text-[#22c55e] hover:text-[#16a34a] font-medium transition-colors">
                            Quên mật khẩu?
                        </Link>
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
