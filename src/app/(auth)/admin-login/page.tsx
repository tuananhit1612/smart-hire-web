"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Lock, Mail, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { loginSchema, type LoginSchema } from "@/features/auth/schemas/login-schema";
import { useAuth } from "@/features/auth/hooks/use-auth";

function AdminLoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const toast = useToastHelpers();
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "admin@smarthire.ai",
            password: "password",
        },
    });

    const onSubmit = async (data: LoginSchema) => {
        setIsLoading(true);
        await login("admin");
        setIsLoading(false);
        toast.success("Xin chào, Admin!", "Đăng nhập quản trị thành công.");

        const callbackUrl = searchParams.get("callbackUrl");
        router.push(callbackUrl || "/admin/dashboard");
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    const inputClasses = "h-12 bg-transparent border-[rgba(145,158,171,0.12)] focus:border-[#22C55E] focus:ring-[#22C55E]/10 rounded-xl transition-all text-white placeholder:text-[#637381]";

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#141A21]">
            {/* Background blur orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#22C55E]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.1, duration: 0.4 }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                {/* Green glow behind card */}
                <div className="absolute -inset-3 bg-gradient-to-r from-[#22C55E]/10 via-[#22C55E]/5 to-[#22C55E]/10 rounded-[32px] blur-2xl opacity-50 pointer-events-none" />

                {/* Card */}
                <div className="relative backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-8">
                    {/* Header */}
                    <motion.div className="text-center mb-8" variants={itemVariants}>
                        <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#10b981] shadow-lg shadow-green-500/25">
                            <Shield className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Quản trị hệ thống
                        </h1>
                        <p className="text-[#919EAB] text-sm mt-1">
                            Đăng nhập với tài khoản quản trị viên SmartHire.
                        </p>
                    </motion.div>

                    {/* Security badge */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-2 px-3 py-2.5 mb-6 rounded-xl bg-[#FFAB00]/10 border border-[#FFAB00]/20 text-[#FFAB00] text-xs font-medium"
                    >
                        <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                        Khu vực bảo mật cao — chỉ dành cho quản trị viên
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <motion.div variants={itemVariants}>
                            <Input
                                label="Email quản trị"
                                type="email"
                                placeholder="admin@smarthire.ai"
                                error={errors.email?.message}
                                {...register("email")}
                                className={inputClasses}
                                startIcon={<Mail className="text-[#637381] w-4 h-4" />}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Input
                                label="Mật khẩu"
                                type="password"
                                placeholder="••••••••"
                                error={errors.password?.message}
                                {...register("password")}
                                className={inputClasses}
                                startIcon={<Lock className="text-[#637381] w-4 h-4" />}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-2">
                            <Button
                                type="submit"
                                className="w-full h-12 text-sm font-semibold bg-gradient-to-r from-[#22c55e] to-[#10b981] hover:from-[#10b981] hover:to-[#22c55e] text-white rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all border-0"
                                isLoading={isLoading}
                                variant="primary"
                            >
                                <Fingerprint className="w-4 h-4 mr-2" />
                                Xác thực đăng nhập
                            </Button>
                        </motion.div>
                    </form>

                    {/* Footer */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-6 text-center text-xs text-[#637381]"
                    >
                        Phiên bản quản trị v2.0 — SmartHire Admin Console
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#141A21] text-[#919EAB]">Loading...</div>}>
            <AdminLoginForm />
        </Suspense>
    );
}
