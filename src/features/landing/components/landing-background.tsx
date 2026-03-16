"use client";

import { motion } from "framer-motion";

/**
 * Premium landing page background.
 * Uses CSS gradient orbs + subtle dot grid + noise overlay.
 * No particles, no floating dots — clean, modern, premium.
 */
export function LandingBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Base dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0F172A] to-[#0B1120]" />

            {/* Primary green orb - top center */}
            <motion.div
                className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.04) 40%, transparent 70%)",
                }}
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.8, 1, 0.8],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Secondary blue orb - left */}
            <motion.div
                className="absolute top-[30%] -left-[200px] w-[600px] h-[600px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.02) 50%, transparent 70%)",
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Tertiary purple orb - right */}
            <motion.div
                className="absolute top-[55%] -right-[200px] w-[500px] h-[500px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.02) 50%, transparent 70%)",
                }}
                animate={{
                    scale: [1, 1.05, 1],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            {/* Warm accent orb - bottom */}
            <motion.div
                className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 60%)",
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 20, 0],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                }}
            />

            {/* Subtle dot grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Top edge vignette */}
            <div className="absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-[#0B1120] to-transparent" />

            {/* Bottom edge vignette */}
            <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-[#0B1120] to-transparent" />
        </div>
    );
}
