"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LogIn, Github, ArrowRight, Sparkles, ScanFace } from "lucide-react"; // ScanFace for futuristic feel
import { motion } from "framer-motion";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Tabs } from "@/shared/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { loginSchema, type LoginSchema } from "../schemas/login-schema";

export function LoginForm() {
    const [role, setRole] = useState("candidate");
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        setIsLoading(true);
        // Simulate API call
        console.log("Login data:", { ...data, role });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
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
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex justify-center mb-4"
                >
                    <div className="relative h-16 w-16 rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden ring-1 ring-white/10">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-20 animate-pulse" />
                        <Sparkles className="h-8 w-8 text-indigo-400 relative z-10" />
                    </div>
                </motion.div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
                    Welcome Back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">Ultra</span>.
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Initialize your session to continue.
                </p>
            </div>

            <motion.div>
                <Tabs
                    activeTab={role}
                    onChange={setRole}
                    tabs={[
                        { id: "candidate", label: "Candidate Node" },
                        { id: "employer", label: "Employer Core" },
                    ]}
                    className="mb-8"
                />
            </motion.div>

            {/* Holographic Card Container */}
            <div className="relative group">
                {/* Animated Gradient Border Layer */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 group-hover:opacity-60 blur transition duration-1000 group-hover:duration-200" />

                <Card className="relative border-0 shadow-2xl bg-white/90 backdrop-blur-xl dark:bg-[#0B0F19]/90 rounded-3xl ring-1 ring-white/50 dark:ring-white/10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardHeader className="space-y-1 pb-2 text-center">
                            <CardTitle className="text-xl font-orbitron uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                                {role === "candidate" ? "Candidate Access" : "Core Access"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-4">
                            <div className="space-y-2">
                                <Input
                                    label="Identity Protocol (Email)"
                                    type="email"
                                    placeholder="user@smarthire.ultra"
                                    error={errors.email?.message}
                                    {...register("email")}
                                    className="h-12 bg-slate-50 dark:bg-black/50 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    label="Security Key (Password)"
                                    type="password"
                                    placeholder="••••••••"
                                    error={errors.password?.message}
                                    {...register("password")}
                                    className="h-12 bg-slate-50 dark:bg-black/50 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all rounded-xl"
                                />
                                <div className="flex justify-end pt-1">
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs font-bold uppercase tracking-wide text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-all hover:tracking-wider"
                                    >
                                        Recover Key?
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 pt-4">
                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all duration-300 bg-gradient-to-r from-indigo-600 to-violet-600 border-0"
                                isLoading={isLoading}
                                variant="primary"
                            >
                                <span className="mr-2">Initiate Sequence</span>
                                <ArrowRight className="h-5 w-5" />
                            </Button>

                            <div className="relative w-full my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-200 dark:border-white/10" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                                    <span className="bg-transparent px-2 text-slate-400">
                                        Or Connect With
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full h-12 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all rounded-xl relative overflow-hidden group/btn"
                                type="button"
                            >
                                <Github className="mr-2 h-5 w-5 relative z-10 group-hover/btn:text-white transition-colors" />
                                <span className="relative z-10 group-hover/btn:text-white transition-colors">Github Protocol</span>
                                <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            </Button>

                            <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                                New to the network?{" "}
                                <Link
                                    href="/register"
                                    className="font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline transition-all"
                                >
                                    Generate Identity
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </motion.div>
    );
}
