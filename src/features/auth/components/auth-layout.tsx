"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import Link from "next/link";

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center overflow-hidden relative px-4">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />

            {/* Subtle Ambient Glow */}
            <div className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-blue-500/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-indigo-500/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

            {/* Logo for Auth Pages */}
            <div className="absolute top-8 left-8 z-20">
                <Link href="/" className="flex items-center gap-2 cursor-pointer">
                    <div className="bg-blue-600 h-8 w-8 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <Layers className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">SmartHire</span>
                </Link>
            </div>

            {/* Central Form Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[480px] bg-card p-8 md:p-10 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-border"
            >
                {children}
            </motion.div>

            {/* Footer Link / Copyright for Auth */}
            <div className="absolute bottom-6 text-center text-xs text-slate-400 font-medium">
                &copy; 2030 SmartHire Inc. All rights reserved.
            </div>
        </div>
    );
}
