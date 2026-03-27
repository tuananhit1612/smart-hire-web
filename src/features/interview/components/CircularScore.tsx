"use client";

import { motion } from "framer-motion";

interface CircularScoreProps {
    readonly score: number;
    readonly max: number;
    readonly size?: number;
}

export function CircularScore({ score, max, size = 120 }: CircularScoreProps) {
    const percentage = (score / max) * 100;
    const radius = (size - 12) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const getColor = () => {
        if (percentage >= 80) return "stroke-emerald-500";
        if (percentage >= 60) return "stroke-[#22c55e]";
        if (percentage >= 40) return "stroke-amber-500";
        return "stroke-rose-500";
    };

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={10} className="dark:stroke-white/[0.06]" />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    className={getColor()}
                    strokeWidth={10}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-3xl font-black text-[#22c55e] dark:text-white"
                >
                    {score}
                </motion.span>
                <span className="text-xs text-slate-400 dark:text-[#637381] -mt-0.5">/ {max}</span>
            </div>
        </div>
    );
}
