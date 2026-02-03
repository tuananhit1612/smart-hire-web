"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export function FloatingBackButton() {
    const router = useRouter();
    const pathname = usePathname();
    const [showBackButton, setShowBackButton] = React.useState(false);

    // Logic: Hide on Homepage ("/")
    const shouldRender = pathname !== "/";

    React.useEffect(() => {
        if (!shouldRender) return;

        const handleMouseMove = (e: MouseEvent) => {
            // Show if near left edge (< 40px)
            if (e.clientX < 40) {
                setShowBackButton(true);
            }
            // Hide if user moves away (> 250px)
            else if (e.clientX > 250) {
                setShowBackButton(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [shouldRender]);

    if (!shouldRender) return null;

    return (
        <AnimatePresence>
            {showBackButton && (
                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -80, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] group perspective-1000"
                >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-sky-400/30 rounded-full blur-xl scale-75 group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100" />

                    {/* Button */}
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => router.back()}
                        className="relative flex items-center justify-center w-14 h-14 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(3,105,161,0.15)] rounded-full text-sky-700 hover:text-sky-600 hover:border-white transition-all overflow-hidden"
                        style={{ boxShadow: "inset 0 0 20px rgba(255,255,255,0.5)" }}
                    >
                        {/* Shine Effect */}
                        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />

                        <ArrowLeft className="w-6 h-6 z-10 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2.5} />
                    </motion.button>

                    {/* Floating Label (Tooltip) */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 pointer-events-none">
                        <div className="bg-white/90 backdrop-blur-xl border border-white/60 px-4 py-2 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-sky-900 font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0">
                            Quay lại
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
