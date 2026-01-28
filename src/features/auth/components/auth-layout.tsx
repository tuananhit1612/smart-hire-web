"use client";

import { motion } from "framer-motion";

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#0B0F19] relative">
            {/* Global Aurora Background - Moving Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-blue-500/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10s]" />
                <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-indigo-500/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[15s]" />
            </div>

            {/* Left Side - Form Container */}
            <div className="relative z-10 flex w-full flex-col justify-center px-4 sm:px-12 md:w-1/2 lg:w-[45%] xl:w-[40%] xl:px-24">
                <motion.div
                    initial={{ opacity: 0, x: -30, filter: "blur(12px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "circOut" }} // Custom easing for premium feel
                    className="relative w-full max-w-[440px] mx-auto"
                >
                    {children}
                </motion.div>
            </div>

            {/* Right Side - Ultra Premium Holographic Visual */}
            <div className="relative hidden w-0 flex-1 lg:block">
                {/* Darker base for contrast */}
                <div className="absolute inset-0 bg-[#050B14]">

                    {/* Abstract Cyberpunk Grid/Net */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

                    {/* Central Holographic Orb */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-[100px] opacity-40 animate-pulse" />

                    {/* Glass Overlay Card for Quote */}
                    <div className="absolute bottom-12 left-12 right-12 z-20">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-[2px]">
                                    <img
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
                                        alt="User"
                                        className="rounded-full h-full w-full object-cover border-2 border-[#0B0F19]"
                                    />
                                </div>
                                <div>
                                    <div className="text-white font-bold font-sans">Elena Void</div>
                                    <div className="text-indigo-300 text-xs uppercase tracking-widest font-orbitron">AI Talent Director</div>
                                </div>
                            </div>
                            <blockquote className="text-xl md:text-2xl font-light text-slate-200 leading-relaxed font-sans">
                                "SmartHire Ultra isn't just a platform. It's a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 font-bold">sentient partner</span> that understands potential before we do."
                            </blockquote>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
