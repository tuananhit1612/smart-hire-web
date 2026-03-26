"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Lock, CheckCircle2, RefreshCw, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { resetPasswordSchema, type ResetPasswordSchema } from "../schemas/reset-password-schema";
import { authApi } from "../api/auth-api";
import { isApiError } from "@/shared/lib/api-error";

interface ResetPasswordFormProps {
    token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();
    const toastHelpers = useToastHelpers();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordSchema) => {
        setIsLoading(true);
        try {
            await authApi.resetPassword(token, data.password);
            setIsSuccess(true);
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (error) {
            const message = isApiError(error)
                ? error.message
                : "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
            toastHelpers.error("Không thể đặt lại mật khẩu", message);
        } finally {
            setIsLoading(false);
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    const inputClasses = "h-12 bg-transparent border-[rgba(145,158,171,0.2)] dark:border-[rgba(145,158,171,0.12)] focus:border-[#22C55E] focus:ring-[#22C55E]/10 rounded-xl transition-all text-[#1C252E] dark:text-white placeholder:text-[#919EAB]";

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1, duration: 0.4 }}
            className="w-full"
        >
            <AnimatePresence mode="wait">
                {!isSuccess ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Header */}
                        <motion.div className="space-y-2 text-center mb-6" variants={itemVariants}>
                            <div className="inline-flex items-center justify-center w-14 h-14 mb-3 rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#10b981] shadow-lg shadow-green-500/25">
                                <ShieldCheck className="w-7 h-7 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-[#1C252E] dark:text-white">
                                Đặt lại mật khẩu
                            </h1>
                            <p className="text-[#637381] dark:text-[#C4CDD5] text-sm max-w-xs mx-auto">
                                Tạo mật khẩu mới cho tài khoản của bạn. Hãy đảm bảo mật khẩu đủ mạnh và an toàn.
                            </p>
                        </motion.div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <motion.div variants={itemVariants}>
                                <Input
                                    label="Mật khẩu mới"
                                    type="password"
                                    placeholder="••••••••"
                                    error={errors.password?.message}
                                    {...register("password")}
                                    className={inputClasses}
                                    startIcon={<Lock className="text-[#919EAB] w-4 h-4" />}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Input
                                    label="Xác nhận mật khẩu"
                                    type="password"
                                    placeholder="••••••••"
                                    error={errors.confirmPassword?.message}
                                    {...register("confirmPassword")}
                                    className={inputClasses}
                                    startIcon={<Lock className="text-[#919EAB] w-4 h-4" />}
                                    endIcon={
                                        !errors.confirmPassword && !errors.password && (
                                            <CheckCircle2 className="text-[#22C55E] h-4 w-4" />
                                        )
                                    }
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-semibold bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 shadow-none border-0 rounded-xl transition-all"
                                    isLoading={isLoading}
                                    variant="primary"
                                >
                                    <span className="mr-2">Cập nhật mật khẩu</span>
                                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                ) : (
                    /* ─── Success State ─── */
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="flex flex-col items-center justify-center py-8 text-center space-y-6"
                    >
                        <div className="relative w-20 h-20 flex items-center justify-center">
                            <div className="absolute inset-0 bg-[#22C55E]/15 blur-xl rounded-full animate-pulse" />
                            <CheckCircle2 className="h-14 w-14 text-[#22C55E] relative z-10" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-[#1C252E] dark:text-white">
                                Cập nhật thành công
                            </h3>
                            <p className="text-[#637381] dark:text-[#C4CDD5] text-sm max-w-xs mx-auto">
                                Mật khẩu của bạn đã được cập nhật. Đang chuyển hướng đến trang đăng nhập...
                            </p>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full h-1 bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.06] rounded-full overflow-hidden mt-4">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#22c55e] to-[#10b981] rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3, ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
