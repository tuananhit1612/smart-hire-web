"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    User,
    Mail,
    Lock,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { cn } from "@/lib/utils";
import { registerSchema, type RegisterSchema } from "../schemas/register-schema";
import type { UserRole } from "../types/auth-types";

// ─── Props ───────────────────────────────────────────
interface RegisterFormProps {
    role: UserRole;
    onBack: () => void;
}

export function RegisterForm({ role, onBack }: RegisterFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();
    const toast = useToastHelpers();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            agreeTerms: false as unknown as true,
        },
    });

    const onSubmit = async (data: RegisterSchema) => {
        setIsLoading(true);
        // Giả lập API đăng ký
        console.log("Register data:", { ...data, role });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);

        const roleName = role === "candidate" ? "Ứng viên" : "Nhà tuyển dụng";
        toast.success(
            "Đăng ký thành công!",
            `Tài khoản ${roleName} đã được tạo. Vui lòng đăng nhập.`
        );
        router.push("/login");
    };

    const roleName = role === "candidate" ? "Ứng viên" : "Nhà tuyển dụng";

    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { staggerChildren: 0.08, duration: 0.4 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-5"
        >
            {/* Header */}
            <motion.div className="space-y-1 text-center" variants={itemVariants}>
                <div className="inline-flex items-center justify-center p-3 mb-3 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    <User className="w-7 h-7" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-inter">
                    Tạo tài khoản {roleName}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Nhập thông tin để hoàn tất đăng ký.
                </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Họ tên */}
                <motion.div variants={itemVariants}>
                    <Input
                        label="Họ và tên"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        error={errors.fullName?.message}
                        {...register("fullName")}
                        className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/10 rounded-lg transition-all"
                        startIcon={<User className="text-slate-400 w-4 h-4" />}
                    />
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="ten@congty.com"
                        error={errors.email?.message}
                        {...register("email")}
                        className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/10 rounded-lg transition-all"
                        startIcon={<Mail className="text-slate-400 w-4 h-4" />}
                    />
                </motion.div>

                {/* Mật khẩu */}
                <motion.div variants={itemVariants}>
                    <div className="relative">
                        <Input
                            label="Mật khẩu"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register("password")}
                            className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/10 rounded-lg transition-all pr-10"
                            startIcon={<Lock className="text-slate-400 w-4 h-4" />}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </motion.div>

                {/* Xác nhận mật khẩu */}
                <motion.div variants={itemVariants}>
                    <div className="relative">
                        <Input
                            label="Xác nhận mật khẩu"
                            type={showConfirm ? "text" : "password"}
                            placeholder="••••••••"
                            error={errors.confirmPassword?.message}
                            {...register("confirmPassword")}
                            className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/10 rounded-lg transition-all pr-10"
                            startIcon={<Lock className="text-slate-400 w-4 h-4" />}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </motion.div>

                {/* Điều khoản */}
                <motion.div variants={itemVariants}>
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            {...register("agreeTerms")}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-colors"
                        />
                        <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                            Tôi đồng ý với{" "}
                            <Link href="#" className="text-blue-600 hover:underline font-medium">
                                Điều khoản sử dụng
                            </Link>{" "}
                            và{" "}
                            <Link href="#" className="text-blue-600 hover:underline font-medium">
                                Chính sách bảo mật
                            </Link>
                        </span>
                    </label>
                    {errors.agreeTerms && (
                        <p className="text-xs text-rose-500 mt-1">{errors.agreeTerms.message}</p>
                    )}
                </motion.div>

                {/* Nút đăng ký */}
                <motion.div variants={itemVariants} className="pt-1">
                    <Button
                        type="submit"
                        className="w-full h-12 text-sm font-semibold transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:bg-blue-700 bg-blue-600 text-white border-0 rounded-lg"
                        isLoading={isLoading}
                        variant="primary"
                    >
                        <span className="flex items-center justify-center">
                            Đăng ký
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                    </Button>
                </motion.div>

                {/* Quay lại */}
                <motion.div variants={itemVariants}>
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center justify-center w-full text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors mt-2"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Quay lại chọn vai trò
                    </button>
                </motion.div>

                {/* Link đăng nhập */}
                <motion.div variants={itemVariants}>
                    <p className="text-center text-sm text-slate-500 mt-2">
                        Đã có tài khoản?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Đăng nhập
                        </Link>
                    </p>
                </motion.div>
            </form>
        </motion.div>
    );
}
