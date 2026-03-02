"use client";

import { motion } from "framer-motion";

export function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center pt-16 pb-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-3xl flex flex-col items-center gap-8 relative z-10"
            >
                {children}
            </motion.div>
        </div>
    );
}
