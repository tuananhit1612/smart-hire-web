"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, ArrowRight, Wallet, Fingerprint, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Tabs } from "@/shared/components/ui/tabs";
import { useToastHelpers } from "@/shared/components/ui/toast";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { loginSchema, type LoginSchema } from "../schemas/login-schema";
import { useAuth } from "../hooks/use-auth";
import type { UserRole } from "../types/auth-types";

export function LoginForm() {
    const [role, setRole] = useState<string>("candidate");
    const [isLoading, setIsLoading] = useState(false);
    const toastHelpers = useToastHelpers();
    const router = useRouter();
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "topre@ultratech.ai",
            password: "password",
        }
    });

    const onSubmit = async (data: LoginSchema) => {
        setIsLoading(true);
        console.log("Login data:", { ...data, role });

        // Đăng nhập qua auth context (mock)
        await login(role as UserRole);
        setIsLoading(false);

        toastHelpers.success("Chào mừng trở lại!", "Bạn đã đăng nhập thành công.");

        // Chuyển trang dựa trên vai trò
        const redirectMap: Record<string, string> = {
            candidate: "/jobs",
            employer: "/employer/dashboard",
            admin: "/admin/dashboard",
        };
        router.push(redirectMap[role] ?? "/jobs");
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.4,
                ease: "easeOut" as const
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
        >
            <div className="space-y-1 text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    <Fingerprint className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-inter">
                    Chào mừng trở lại
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Nhập thông tin đăng nhập để truy cập tài khoản của bạn.
                </p>
            </div>

            <Tabs
                activeTab={role}
                onChange={setRole}
                tabs={[
                    { id: "candidate", label: "Ứng viên" },
                    { id: "employer", label: "Nhà tuyển dụng" },
                ]}
                className="mb-6 w-full"
            />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Input
                        label="Email công việc"
                        type="email"
                        placeholder="ten@congty.com"
                        error={errors.email?.message}
                        {...register("email")}
                        className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/10 rounded-lg transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-300">Mật khẩu</label>
                        <Link
                            href="/forgot-password"
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register("password")}
                        className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/10 rounded-lg transition-all"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 text-sm font-semibold transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:bg-blue-700 bg-blue-600 text-white border-0 rounded-lg mt-4"
                    isLoading={isLoading}
                    variant="primary"
                >
                    Đăng nhập
                </Button>

                <div className="relative w-full py-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase font-medium">
                        <span className="bg-white dark:bg-[#0B0F19] px-2 text-slate-400">
                            Hoặc tiếp tục với
                        </span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full h-12 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all rounded-lg text-slate-600 dark:text-slate-300 font-medium bg-transparent"
                    type="button"
                >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                </Button>

                <div className="text-center text-sm text-slate-500 mt-6">
                    Chưa có tài khoản?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Đăng ký
                    </Link>
                </div>
            </form>
        </motion.div>
    );
}
