"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export function AnimatedCounter({
    value,
    suffix = "",
    prefix = "",
    duration = 0.6,
    className = "",
}: AnimatedCounterProps) {
    const [count, setCount] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const end = value;
        const incrementTime = (duration * 1000) / end;
        const step = Math.max(1, Math.floor(end / 100));

        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, incrementTime * step);

        return () => clearInterval(timer);
    }, [isVisible, value, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}

// Floating decoration elements - CSS-only for performance
export function FloatingElements() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Static gradient orbs with CSS animations */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#22c55e]/20 to-[#10b981]/10 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-bl from-green-400/15 to-emerald-500/10 rounded-full blur-3xl animate-float-slow-reverse" />
            <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-tr from-purple-400/10 to-pink-400/5 rounded-full blur-3xl animate-float-gentle" />

            {/* Simple geometric shapes with CSS rotation */}
            <div className="absolute top-32 right-20 w-16 h-16 border-2 border-[#22c55e]/30 rounded-xl animate-spin-slow" />
            <div className="absolute bottom-40 left-20 w-12 h-12 border-2 border-green-200/30 rounded-full animate-spin-slower" />

            {/* CSS for animations */}
            <style jsx global>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-20px) scale(1.1); }
                }
                @keyframes float-slow-reverse {
                    0%, 100% { transform: translateY(0) scale(1.1); }
                    50% { transform: translateY(20px) scale(1); }
                }
                @keyframes float-gentle {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(15px, -10px); }
                }
                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }
                .animate-float-slow-reverse {
                    animation: float-slow-reverse 8s ease-in-out infinite;
                }
                .animate-float-gentle {
                    animation: float-gentle 10s ease-in-out infinite;
                }
                .animate-spin-slow {
                    animation: spin 20s linear infinite;
                }
                .animate-spin-slower {
                    animation: spin 25s linear infinite reverse;
                }
            `}</style>
        </div>
    );
}

// Bento Grid Item Component - CSS-only hover for performance
interface BentoItemProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function BentoItem({
    children,
    className = "",
    delay = 0,
}: BentoItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay,
                ease: "easeOut",
            }}
            className={`relative overflow-hidden rounded-3xl bg-white/70 dark:bg-[#1C252E] backdrop-blur-xl border border-white/50 dark:border-white/[0.08] shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-200 ${className}`}
        >
            {children}
        </motion.div>
    );
}

// Glowing border effect
export function GlowingBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#22c55e] via-green-500 to-[#10b981] rounded-3xl opacity-20 blur-sm animate-pulse" />
            <div className="relative">{children}</div>
        </div>
    );
}

// Stat Card with animated counter
interface StatCardProps {
    icon: React.ReactNode;
    value: number;
    label: string;
    suffix?: string;
    gradient: string;
    delay?: number;
}

export function StatCard({ icon, value, label, suffix = "", gradient, delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
        >
            <div className={`absolute inset-0 ${gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`} />
            <div className="relative p-5 bg-white/80 dark:bg-[#1C252E]/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/[0.08] text-center">
                <div className={`w-12 h-12 mx-auto mb-3 ${gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                    {icon}
                </div>
                <div className="text-2xl font-bold text-[#1C252E] dark:text-white font-orbitron">
                    <AnimatedCounter value={value} suffix={suffix} />
                </div>
                <div className="text-sm text-[#22c55e] dark:text-[#C4CDD5] mt-1">{label}</div>
            </div>
        </motion.div>
    );
}

// Parallax wrapper
interface ParallaxWrapperProps {
    children: React.ReactNode;
    offset?: number;
}

export function ParallaxWrapper({ children, offset = 50 }: ParallaxWrapperProps) {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

    return (
        <motion.div ref={ref} style={{ y }}>
            {children}
        </motion.div>
    );
}

// Animated typing effect
export function TypewriterText({ text, className = "" }: { text: string; className?: string }) {
    const [displayText, setDisplayText] = React.useState("");
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
        if (!isVisible) return;

        let index = 0;
        const timer = setInterval(() => {
            if (index <= text.length) {
                setDisplayText(text.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 50);

        return () => clearInterval(timer);
    }, [isVisible, text]);

    return (
        <span ref={ref} className={className}>
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-[#22c55e] ml-1"
            />
        </span>
    );
}

