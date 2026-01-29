"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";
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
import { resetPasswordSchema, type ResetPasswordSchema } from "../schemas/reset-password-schema";

export function ResetPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordSchema) => {
        setIsLoading(true);
        // Simulate API call
        console.log("Reset password data:", data);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
        setIsSuccess(true);

        // Mock redirect
        setTimeout(() => {
            router.push("/login");
        }, 3000);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                duration: 0.6
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
        >
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
                    Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">Reset</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Establish a new security key for your account.
                </p>
            </div>

            {/* Holographic Card Container */}
            <div className="relative group">
                {/* Animated Gradient Border Layer */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 group-hover:opacity-60 blur transition duration-1000 group-hover:duration-200" />

                <Card className="relative border-0 shadow-2xl bg-white/90 backdrop-blur-xl dark:bg-[#0B0F19]/90 rounded-3xl ring-1 ring-white/50 dark:ring-white/10 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {!isSuccess ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <CardHeader className="space-y-1 pb-2 text-center">
                                        <CardTitle className="text-xl font-orbitron uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                                            New Credentials
                                        </CardTitle>
                                        <CardDescription className="text-slate-500 dark:text-slate-400">
                                            Ensure your new key is strong and unique.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-5 pt-4">
                                        <div className="space-y-2">
                                            <Input
                                                label="New Security Key"
                                                type="password"
                                                placeholder="••••••••"
                                                error={errors.password?.message}
                                                {...register("password")}
                                                className="h-12 bg-slate-50 dark:bg-black/50 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all rounded-xl"
                                                startIcon={<Lock className="text-slate-400" />}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Input
                                                label="Confirm Security Key"
                                                type="password"
                                                placeholder="••••••••"
                                                error={errors.confirmPassword?.message}
                                                {...register("confirmPassword")}
                                                className="h-12 bg-slate-50 dark:bg-black/50 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all rounded-xl"
                                                startIcon={<Lock className="text-slate-400" />}
                                                endIcon={
                                                    !errors.confirmPassword && !errors.password &&
                                                    (
                                                        <CheckCircle2 className="text-green-500 h-4 w-4" />
                                                    )
                                                }
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col gap-4 pt-4">
                                        <Button
                                            type="submit"
                                            className="w-full h-12 text-base font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all duration-300 bg-gradient-to-r from-indigo-600 to-violet-600 border-0"
                                            isLoading={isLoading}
                                            variant="primary"
                                        >
                                            <span className="mr-2">Update Credentials</span>
                                            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                                        </Button>
                                    </CardFooter>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, type: "spring" }}
                                className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-6"
                            >
                                <div className="relative h-20 w-20 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse" />
                                    <CheckCircle2 className="h-16 w-16 text-green-500 relative z-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-orbitron">
                                        Update Specific
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                                        Your security key has been successfully updated. Redirecting to login sequence...
                                    </p>
                                </div>
                                <div className="w-full h-1 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mt-6">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-pink-500"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 3, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>
            </div>
        </motion.div>
    );
}
