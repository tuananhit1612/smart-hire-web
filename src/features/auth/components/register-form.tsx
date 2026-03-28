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
    Eye,
    EyeOff,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { useAuth } from "../hooks/use-auth";
import { registerSchema, type RegisterSchema } from "../schemas/register-schema";
import type { UserRole } from "../types/auth-types";
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
    const { register: registerAuth } = useAuth();

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
            await registerAuth({
                email: data.email,
                password: data.password,
                fullName: data.fullName,
                role: role === "candidate" ? "CANDIDATE" : "HR",
            });
            
            const roleName = role === "candidate" ? "Ứng viên" : "Nhà tuyển dụng";
            toast.success(
                "Đăng ký thành công!",
                `Tài khoản ${roleName} đã được tạo. Vui lòng đăng nhập.`
            );
            router.push("/login");
        } catch (error: any) {
            const message = error instanceof Error ? error.message : error?.message || "Vui lòng thử lại sau.";
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

    // Common input classes matching Design System
    const inputClasses = "h-12 bg-transparent border-[rgba(145,158,171,0.2)] dark:border-[rgba(145,158,171,0.12)] focus:border-[#22C55E] focus:ring-[#22C55E]/10 rounded-xl transition-all text-[#1C252E] dark:text-white placeholder:text-[#919EAB]";

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, duration: 0.4 }}
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
    );
}
