"use client";

import { useState } from "react";
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

export default function AdminLoginPage() {
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
        console.log("Admin login:", data);
        await login("admin");
        setIsLoading(false);
        toast.success("Xin chào, Admin!", "Đăng nhập quản trị thành công.");

        const callbackUrl = searchParams.get("callbackUrl");
        router.push(callbackUrl || "/admin/dashboard");
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { staggerChildren: 0.1, duration: 0.4 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative z-10 w-full max-w-md mx-4"
            >
                {/* Card */}
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl shadow-black/30 p-8">
                    {/* Header */}
                    <motion.div className="text-center mb-8" variants={itemVariants}>
                        <div className="inline-flex items-center justify-center p-4 mb-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                            <Shield className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Quản trị hệ thống
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Đăng nhập với tài khoản quản trị viên SmartHire.
                        </p>
                    </motion.div>

                    {/* Security badge */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-2 px-3 py-2 mb-6 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium"
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
                                className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/10 rounded-xl transition-all"
                                startIcon={<Mail className="text-slate-500 w-4 h-4" />}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Input
                                label="Mật khẩu"
                                type="password"
                                placeholder="••••••••"
                                error={errors.password?.message}
                                {...register("password")}
                                className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/10 rounded-xl transition-all"
                                startIcon={<Lock className="text-slate-500 w-4 h-4" />}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-2">
                            <Button
                                type="submit"
                                className="w-full h-12 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all"
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
                        className="mt-6 text-center text-xs text-slate-500"
                    >
                        Phiên bản quản trị v2.0 — SmartHire Admin Console
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
