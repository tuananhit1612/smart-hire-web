"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
    User,
    Mail,
    Lock,
    ArrowLeft,
    ArrowRight,
    Eye,
    EyeOff,
    CheckCircle2,
    MailCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { registerSchema, type RegisterSchema } from "../schemas/register-schema";
import type { UserRole } from "../types/auth-types";
import { authApi } from "../api/auth-api";
import { isApiError } from "@/shared/lib/api-error";

interface RegisterFormProps {
    role: UserRole;
    onBack: () => void;
}

export function RegisterForm({ role, onBack }: RegisterFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
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
        try {
            await authApi.register({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                role,
            });

            // Show "check your email" success state
            setRegisteredEmail(data.email);
        } catch (error) {
            const message = isApiError(error)
                ? error.message
                : "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
            toast.error("Đăng ký thất bại", message);
        } finally {
            setIsLoading(false);
        }
    };

    const roleName = role === "candidate" ? "Ứng viên" : "Nhà tuyển dụng";

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    const inputClasses = "h-12 bg-transparent border-[rgba(145,158,171,0.2)] dark:border-[rgba(145,158,171,0.12)] focus:border-[#22C55E] focus:ring-[#22C55E]/10 rounded-xl transition-all text-[#1C252E] dark:text-white placeholder:text-[#919EAB]";

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, duration: 0.4 }}
            className="space-y-5"
        >
            <AnimatePresence mode="wait">
                {!registeredEmail ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5"
                    >
                        {/* Header */}
                        <motion.div className="space-y-2 text-center" variants={itemVariants}>
                            <div className="inline-flex items-center justify-center w-14 h-14 mb-3 rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#10b981] shadow-lg shadow-green-500/25">
                                <User className="w-7 h-7 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-[#1C252E] dark:text-white">
                                Tạo tài khoản {roleName}
                            </h1>
                            <p className="text-[#637381] dark:text-[#C4CDD5] text-sm">
                                Nhập thông tin để hoàn tất đăng ký.
                            </p>
                        </motion.div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Full name */}
                            <motion.div variants={itemVariants}>
                                <Input
                                    label="Họ và tên"
                                    type="text"
                                    placeholder="Nguyễn Văn A"
                                    error={errors.fullName?.message}
                                    {...register("fullName")}
                                    className={inputClasses}
                                    startIcon={<User className="text-[#919EAB] w-4 h-4" />}
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
                            </motion.div>

                            {/* Confirm password */}
                            <motion.div variants={itemVariants}>
                                <div className="relative">
                                    <Input
                                        label="Xác nhận mật khẩu"
                                        type={showConfirm ? "text" : "password"}
                                        placeholder="••••••••"
                                        error={errors.confirmPassword?.message}
                                        {...register("confirmPassword")}
                                        className={`${inputClasses} pr-10`}
                                        startIcon={<Lock className="text-[#919EAB] w-4 h-4" />}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-[38px] text-[#919EAB] hover:text-[#637381] dark:hover:text-[#C4CDD5] transition-colors"
                                    >
                                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </motion.div>

                            {/* Terms */}
                            <motion.div variants={itemVariants}>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        {...register("agreeTerms")}
                                        className="mt-1 h-4 w-4 rounded border-[rgba(145,158,171,0.3)] text-[#22C55E] focus:ring-[#22C55E] accent-[#22c55e] transition-colors"
                                    />
                                    <span className="text-sm text-[#637381] dark:text-[#C4CDD5] group-hover:text-[#1C252E] dark:group-hover:text-white transition-colors">
                                        Tôi đồng ý với{" "}
                                        <Link href="#" className="text-[#22C55E] hover:text-[#16A34A] font-medium">
                                            Điều khoản sử dụng
                                        </Link>{" "}
                                        và{" "}
                                        <Link href="#" className="text-[#22C55E] hover:text-[#16A34A] font-medium">
                                            Chính sách bảo mật
                                        </Link>
                                    </span>
                                </label>
                                {errors.agreeTerms && (
                                    <p className="text-xs text-[#FF5630] mt-1">{errors.agreeTerms.message}</p>
                                )}
                            </motion.div>

                            {/* Submit */}
                            <motion.div variants={itemVariants} className="pt-1">
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-semibold bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 shadow-none border-0 rounded-xl transition-all"
                                    isLoading={isLoading}
                                    variant="primary"
                                    rightIcon={<ArrowRight className="h-4 w-4" />}
                                >
                                    Đăng ký
                                </Button>
                            </motion.div>

                            {/* Back */}
                            <motion.div variants={itemVariants}>
                                <button
                                    type="button"
                                    onClick={onBack}
                                    className="flex items-center justify-center w-full text-sm font-medium text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white transition-colors mt-2"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Quay lại chọn vai trò
                                </button>
                            </motion.div>

                            {/* Login link */}
                            <motion.div variants={itemVariants}>
                                <p className="text-center text-sm text-[#637381] dark:text-[#C4CDD5] mt-1">
                                    Đã có tài khoản?{" "}
                                    <Link
                                        href="/login"
                                        className="font-semibold text-[#22C55E] hover:text-[#16A34A] transition-colors"
                                    >
                                        Đăng nhập
                                    </Link>
                                </p>
                            </motion.div>
                        </form>
                    </motion.div>
                ) : (
                    /* ─── Post-Registration: Check Your Email ─── */
                    <motion.div
                        key="check-email"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="flex flex-col items-center justify-center py-8 text-center space-y-6"
                    >
                        <div className="relative w-20 h-20 flex items-center justify-center">
                            <div className="absolute inset-0 bg-[#22C55E]/15 blur-xl rounded-full animate-pulse" />
                            <MailCheck className="w-12 h-12 text-[#22C55E] relative z-10" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-[#1C252E] dark:text-white">
                                Kiểm tra email của bạn
                            </h3>
                            <p className="text-sm text-[#637381] dark:text-[#C4CDD5] max-w-xs mx-auto">
                                Chúng tôi đã gửi email xác thực đến{" "}
                                <span className="font-semibold text-[#1C252E] dark:text-white">
                                    {registeredEmail}
                                </span>
                                . Nhấn vào liên kết trong email để kích hoạt tài khoản.
                            </p>
                        </div>

                        <div className="w-full space-y-3 max-w-xs">
                            <div className="px-4 py-3 rounded-xl bg-[rgba(145,158,171,0.06)] dark:bg-white/[0.04] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]">
                                <div className="flex items-center gap-2 text-sm text-[#637381] dark:text-[#919EAB]">
                                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                                    <span>Tài khoản {roleName} đã được tạo</span>
                                </div>
                            </div>

                            <Link href="/login" className="block w-full">
                                <Button
                                    variant="primary"
                                    className="w-full h-11 text-base font-semibold rounded-xl bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E]"
                                >
                                    Đi đến đăng nhập
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>

                            <button
                                type="button"
                                onClick={() => setRegisteredEmail(null)}
                                className="w-full text-sm font-medium text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white transition-colors"
                            >
                                Dùng email khác
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
