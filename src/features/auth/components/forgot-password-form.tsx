"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/shared/components/ui/card";
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
        // Simulate API call
        console.log("Forgot password data:", data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsSubmitted(true);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
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
                        <div className="space-y-2 text-center mb-6">
                            <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                <KeyRound className="w-6 h-6" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-inter">
                                Đặt lại mật khẩu
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                                Nhập địa chỉ email của bạn, chúng tôi sẽ gửi liên kết để đặt lại mật khẩu.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <Input
                                label="Địa chỉ email"
                                type="email"
                                placeholder="ten@congty.com"
                                error={errors.email?.message}
                                {...register("email")}
                                className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-blue-600/10 rounded-lg"
                            />

                            <Button
                                type="submit"
                                className="w-full h-12 text-sm font-semibold transition-all shadow-lg shadow-blue-600/20 hover:bg-blue-700 bg-blue-600 text-white border-0 rounded-lg mt-2"
                                isLoading={isLoading}
                                variant="primary"
                            >
                                Gửi liên kết đặt lại
                            </Button>

                            <Link
                                href="/login"
                                className="flex items-center justify-center text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors mt-6"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Quay lại đăng nhập
                            </Link>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="flex flex-col items-center justify-center py-6 text-center space-y-6"
                    >
                        <div className="h-16 w-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                Kiểm tra email của bạn
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                                Chúng tôi đã gửi liên kết đặt lại mật khẩu đến <span className="font-semibold text-slate-900 dark:text-white">email của bạn</span>
                            </p>
                        </div>
                        <div className="w-full space-y-3">
                            <Button
                                variant="outline"
                                onClick={() => setIsSubmitted(false)}
                                className="w-full h-11 border-slate-200"
                            >
                                Thử email khác
                            </Button>
                            <Link
                                href="/login"
                                className="block w-full"
                            >
                                <Button variant="ghost" className="w-full text-slate-500">
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
