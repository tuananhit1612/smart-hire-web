"use client";

import { motion } from "framer-motion";
// import { ThemeToggle } from "@/shared/components/ThemeToggle";
// Wait, the header has a theme toggle? Project guide says "Header" has links.
// I'll skip ThemeToggle import for now and just focus on layout structure.

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-black">
            {/* Left Side - Form */}
            <div className="flex w-full flex-col justify-center px-4 sm:px-12 md:w-1/2 lg:w-[45%] xl:w-[40%] xl:px-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm mx-auto"
                >
                    {children}
                </motion.div>
            </div>

            {/* Right Side - Artistic Background */}
            <div className="relative hidden w-0 flex-1 bg-zinc-900 md:block">
                <div className="absolute inset-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <blockquote className="space-y-2">
                            <p className="text-lg font-medium leading-relaxed">
                                &ldquo;SmartHire đã giúp tôi tìm được công việc mơ ước chỉ trong vòng 3 ngày.
                                Giao diện quá đẹp và dễ sử dụng!&rdquo;
                            </p>
                            <footer className="text-sm font-semibold text-gray-300">
                                — Nguyễn Văn A, Senior React Developer
                            </footer>
                        </blockquote>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
