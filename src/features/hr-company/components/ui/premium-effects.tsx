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
    duration = 2,
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

// Floating decoration elements
export function FloatingElements() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Gradient Orbs with animation */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-sky-400/20 to-blue-500/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    scale: [1.1, 1, 1.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-bl from-green-400/15 to-emerald-500/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, 15, 0],
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-tr from-purple-400/10 to-pink-400/5 rounded-full blur-3xl"
            />

            {/* Floating geometric shapes */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-32 right-20 w-16 h-16 border-2 border-sky-200/30 rounded-xl"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-40 left-20 w-12 h-12 border-2 border-green-200/30 rounded-full"
            />
            <motion.div
                animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-1/4 w-3 h-3 bg-sky-400 rounded-full"
            />
            <motion.div
                animate={{
                    y: [0, 12, 0],
                    opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-2/3 right-1/4 w-2 h-2 bg-green-400 rounded-full"
            />
        </div>
    );
}

// Bento Grid Item Component
interface BentoItemProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    hoverScale?: number;
}

export function BentoItem({
    children,
    className = "",
    delay = 0,
    hoverScale = 1.02,
}: BentoItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
                scale: hoverScale,
                y: -4,
                transition: { duration: 0.2 },
            }}
            className={`relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl shadow-sky-900/5 hover:shadow-2xl hover:shadow-sky-900/10 transition-shadow ${className}`}
        >
            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
            {children}
        </motion.div>
    );
}

// Glowing border effect
export function GlowingBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 via-green-500 to-sky-500 rounded-3xl opacity-20 blur-sm animate-pulse" />
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
            <div className="relative p-5 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 ${gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                    {icon}
                </div>
                <div className="text-2xl font-bold text-sky-900 font-orbitron">
                    <AnimatedCounter value={value} suffix={suffix} />
                </div>
                <div className="text-sm text-sky-600 mt-1">{label}</div>
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
                className="inline-block w-0.5 h-5 bg-sky-500 ml-1"
            />
        </span>
    );
}
