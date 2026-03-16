"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

// ============================================
// MODERN BACKGROUND ANIMATIONS (2025-2026)
// ============================================

// 1. Animated Mesh Gradient - Main background with smooth color transitions
const AnimatedMeshGradient = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Base gradient mesh */}
            <div
                className="absolute inset-0 opacity-100"
                style={{
                    background: `
                        radial-gradient(ellipse at 20% 30%, rgba(118, 53, 220, 0.15) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 20%, rgba(255, 171, 0, 0.12) 0%, transparent 45%),
                        radial-gradient(ellipse at 60% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 45%),
                        radial-gradient(ellipse at 40% 50%, rgba(118, 53, 220, 0.08) 0%, transparent 60%)
                    `,
                }}
            />

            {/* Animated color blobs */}
            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full opacity-40 blur-[120px]"
                style={{
                    background: "linear-gradient(135deg, #7635dc 0%, #B985F4 100%)",
                    left: "10%",
                    top: "-20%",
                }}
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full opacity-35 blur-[100px]"
                style={{
                    background: "linear-gradient(135deg, #FFAB00 0%, #FF6B00 100%)",
                    right: "-10%",
                    top: "20%",
                }}
                animate={{
                    x: [0, -80, 0],
                    y: [0, 60, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[90px]"
                style={{
                    background: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
                    left: "40%",
                    bottom: "-10%",
                }}
                animate={{
                    x: [0, 60, 0],
                    y: [0, -40, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                }}
            />

            {/* Purple accent glow */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full opacity-25 blur-[80px]"
                style={{
                    background: "radial-gradient(circle, #7635dc 0%, transparent 70%)",
                    right: "30%",
                    bottom: "20%",
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.25, 0.4, 0.25],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};

// 2. Floating Particles - Modern particle system
const FloatingParticles = ({ count = 30 }: { count?: number }) => {
    // We only render on client to avoid hydration mismatch with random values
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: count }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 2,
                duration: Math.random() * 20 + 15,
                delay: Math.random() * 5,
            }))
        );
    }, [count]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        background: particle.size > 4
                            ? "rgba(118, 53, 220, 0.6)"
                            : "rgba(255, 171, 0, 0.4)",
                        boxShadow: particle.size > 4
                            ? "0 0 10px rgba(118, 53, 220, 0.4)"
                            : "none",
                    }}
                    animate={{
                        y: [0, -100, -200],
                        x: [0, Math.random() * 50 - 25, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: particle.delay,
                    }}
                />
            ))}
        </div>
    );
};

// 3. Mesh Grid Lines - Subtle grid pattern
const MeshGridLines = () => {
    return (
        <div className="absolute inset-0 overflow-hidden opacity-[0.03] dark:opacity-[0.05]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path
                            d="M 60 0 L 0 0 0 60"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-[#7635dc]"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    );
};

// 4. Mouse Reactive Glow - Glow that follows mouse
const MouseReactiveGlow = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 2;
            const y = (e.clientY / innerHeight - 0.5) * 2;
            mouseX.set(x * 50);
            mouseY.set(y * 30);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="absolute w-[600px] h-[400px] rounded-full opacity-30 blur-[100px] pointer-events-none"
            style={{
                background: "radial-gradient(ellipse at center, rgba(118, 53, 220, 0.4) 0%, rgba(118, 53, 220, 0) 70%)",
                left: "50%",
                top: "50%",
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
            }}
        />
    );
};

// 5. Animated Dots Grid - Interactive dots with connections
const AnimatedDotsGrid = () => {
    const dots = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: (i % 6) * 20 + 10,
        y: Math.floor(i / 6) * 40 + 20,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-15">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Connection lines */}
                {dots.map((dot, i) => {
                    const nextDot = dots[i + 1];
                    if (!nextDot || i % 6 === 5) return null;
                    return (
                        <motion.line
                            key={`h-${i}`}
                            x1={`${dot.x}%`}
                            y1={`${dot.y}%`}
                            x2={`${nextDot.x}%`}
                            y2={`${nextDot.y}%`}
                            stroke="url(#dotGradient)"
                            strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 3 }}
                        />
                    );
                })}
                {dots.map((dot, i) => {
                    const belowDot = dots[i + 6];
                    if (!belowDot) return null;
                    return (
                        <motion.line
                            key={`v-${i}`}
                            x1={`${dot.x}%`}
                            y1={`${dot.y}%`}
                            x2={`${belowDot.x}%`}
                            y2={`${belowDot.y}%`}
                            stroke="url(#dotGradient)"
                            strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: i * 0.1 + 0.5, repeat: Infinity, repeatDelay: 3 }}
                        />
                    );
                })}
                <defs>
                    <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7635dc" />
                        <stop offset="100%" stopColor="#FFAB00" />
                    </linearGradient>
                </defs>
                {/* Dots */}
                {dots.map((dot, i) => (
                    <motion.circle
                        key={dot.id}
                        cx={`${dot.x}%`}
                        cy={`${dot.y}%`}
                        r="3"
                        fill="#7635dc"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.5] }}
                        transition={{
                            duration: 3,
                            delay: i * 0.15,
                            repeat: Infinity,
                            repeatDelay: 2,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};

// 6. Gradient Orbiting Rings - Rings that rotate
const GradientOrbitingRings = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Large rotating ring */}
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{
                    width: "800px",
                    height: "800px",
                    borderRadius: "50%",
                    border: "1px solid rgba(118, 53, 220, 0.1)",
                }}
            />

            {/* Medium rotating ring - reverse */}
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    border: "1px dashed rgba(255, 171, 0, 0.15)",
                }}
            />

            {/* Small rotating ring */}
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    border: "2px solid rgba(34, 197, 94, 0.2)",
                }}
            />
        </div>
    );
};

// 7. Pulse Glow Spots - Pulsing glow spots
const PulseGlowSpots = () => {
    const spots = [
        { x: 15, y: 20, color: "#7635dc", size: 200 },
        { x: 85, y: 30, color: "#FFAB00", size: 150 },
        { x: 70, y: 70, color: "#22c55e", size: 180 },
        { x: 25, y: 75, color: "#7635dc", size: 160 },
    ];

    return (
        <div className="absolute inset-0 pointer-events-none">
            {spots.map((spot, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full blur-[80px]"
                    style={{
                        left: `${spot.x}%`,
                        top: `${spot.y}%`,
                        width: spot.size,
                        height: spot.size,
                        background: spot.color,
                        opacity: 0.15,
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 1.5,
                    }}
                />
            ))}
        </div>
    );
};

export function AnimatedBackground({
    showRings = false,
    particleCount = 20
}: {
    showRings?: boolean;
    particleCount?: number;
}) {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* 1. Animated Mesh Gradient - Main background */}
            <AnimatedMeshGradient />

            {/* 2. Floating Particles - Particle system */}
            <FloatingParticles count={particleCount} />

            {/* 3. Mesh Grid Lines - Subtle grid pattern */}
            <MeshGridLines />

            {/* 4. Mouse Reactive Glow - Follows cursor */}
            <MouseReactiveGlow />

            {/* 5. Animated Dots Grid - Interactive connections */}
            <AnimatedDotsGrid />

            {/* 6. Gradient Orbiting Rings - Rotating rings */}
            {showRings && <GradientOrbitingRings />}

            {/* 7. Pulse Glow Spots - Pulsing spots */}
            <PulseGlowSpots />
        </div>
    );
}
