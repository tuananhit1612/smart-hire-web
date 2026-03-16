"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { forgotPasswordSchema, type ForgotPasswordSchema } from "../schemas/forgot-password-schema";

export function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordSchema) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsSubmitted(true);
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4 }}
            className="w-full"
        >
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
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
                                <KeyRound className="w-7 h-7 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-[#1C252E] dark:text-white">
                                Đặt lại mật khẩu
                            </h1>
                            <p className="text-[#637381] dark:text-[#C4CDD5] text-sm max-w-xs mx-auto">
                                Nhập địa chỉ email của bạn, chúng tôi sẽ gửi liên kết để đặt lại mật khẩu.
                            </p>
                        </motion.div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <motion.div variants={itemVariants}>
                                <Input
                                    label="Địa chỉ email"
                                    type="email"
                                    placeholder="ten@congty.com"
                                    error={errors.email?.message}
                                    {...register("email")}
                                    className="h-12 bg-transparent border-[rgba(145,158,171,0.2)] dark:border-[rgba(145,158,171,0.12)] focus:border-[#22C55E] focus:ring-[#22C55E]/10 rounded-xl transition-all text-[#1C252E] dark:text-white placeholder:text-[#919EAB]"
                                    startIcon={<Mail className="text-[#919EAB] w-4 h-4" />}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} className="pt-1">
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-semibold bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 shadow-none border-0 rounded-xl transition-all"
                                    isLoading={isLoading}
                                    variant="primary"
                                >
                                    Gửi liên kết đặt lại
                                </Button>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Link
                                    href="/login"
                                    className="flex items-center justify-center text-sm font-medium text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white transition-colors mt-4"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Quay lại đăng nhập
                                </Link>
                            </motion.div>
                        </form>
                    </motion.div>
                ) : (
                    /* ─── Success State ─── */
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="flex flex-col items-center justify-center py-6 text-center space-y-6"
                    >
                        <div className="w-16 h-16 bg-[#22C55E]/10 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-8 w-8 text-[#22C55E]" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-[#1C252E] dark:text-white">
                                Kiểm tra email của bạn
                            </h3>
                            <p className="text-[#637381] dark:text-[#C4CDD5] text-sm max-w-xs mx-auto">
                                Chúng tôi đã gửi liên kết đặt lại mật khẩu đến{" "}
                                <span className="font-semibold text-[#1C252E] dark:text-white">email của bạn</span>
                            </p>
                        </div>
                        <div className="w-full space-y-3">
                            <Button
                                variant="outline"
                                onClick={() => setIsSubmitted(false)}
                                className="w-full h-11 border-[rgba(145,158,171,0.2)] dark:border-[rgba(145,158,171,0.12)] text-[#1C252E] dark:text-white hover:bg-[rgba(145,158,171,0.08)] rounded-xl"
                            >
                                Thử email khác
                            </Button>
                            <Link href="/login" className="block w-full">
                                <Button
                                    variant="ghost"
                                    className="w-full text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white"
                                >
                                    Bỏ qua, đi đến đăng nhập
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
