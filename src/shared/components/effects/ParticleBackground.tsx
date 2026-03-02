"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// Particle colors based on design system
const PARTICLE_COLORS = [
    { primary: "#7635dc", light: "#B985F4", name: "purple" },
    { primary: "#FFAB00", light: "#FFD666", name: "yellow" },
    { primary: "#22C55E", light: "#86EFAC", name: "green" },
];

// Floating particles configuration
const PARTICLES = [
    { id: 1, size: 6, color: "purple", x: "10%", delay: 0, duration: 18 },
    { id: 2, size: 4, color: "yellow", x: "20%", delay: 2, duration: 22 },
    { id: 3, size: 8, color: "green", x: "35%", delay: 1, duration: 20 },
    { id: 4, size: 5, color: "purple", x: "50%", delay: 3, duration: 25 },
    { id: 5, size: 7, color: "yellow", x: "65%", delay: 0.5, duration: 19 },
    { id: 6, size: 4, color: "green", x: "75%", delay: 2.5, duration: 23 },
    { id: 7, size: 6, color: "purple", x: "85%", delay: 1.5, duration: 21 },
    { id: 8, size: 5, color: "yellow", x: "95%", delay: 3.5, duration: 17 },
];

function getColorClass(colorName: string, isDark: boolean, variant: "primary" | "light") {
    const colorMap: Record<string, { dark: string; light: string }> = {
        purple: { dark: variant === "primary" ? "bg-[#7635dc]" : "bg-[#B985F4]", light: variant === "primary" ? "bg-[#8B5CF6]" : "bg-[#A78BFA]" },
        yellow: { dark: variant === "primary" ? "bg-[#FFAB00]" : "bg-[#FFD666]", light: variant === "primary" ? "bg-[#F59E0B]" : "bg-[#FBBF24]" },
        green: { dark: variant === "primary" ? "bg-[#22C55E]" : "bg-[#86EFAC]", light: variant === "primary" ? "bg-[#10B981]" : "bg-[#34D399]" },
    };

    return isDark ? colorMap[colorName]?.dark : colorMap[colorName]?.light || "bg-purple-500";
}

function FloatingParticle({ particle, isDark }: { particle: typeof PARTICLES[0]; isDark: boolean }) {
    const colorClass = getColorClass(particle.color, isDark, "primary");

    return (
        <motion.div
            className={`absolute rounded-full ${colorClass}`}
            style={{
                width: particle.size,
                height: particle.size,
                left: particle.x,
                bottom: "-20px",
            }}
            animate={{
                y: [0, -1200],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.5],
            }}
            transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
}

function AnimatedMeshGradient({ isDark }: { isDark: boolean }) {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <motion.div
                className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-30"
                style={{
                    background: isDark
                        ? "radial-gradient(circle, rgba(118,53,220,0.4) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 dark:opacity-30"
                style={{
                    background: isDark
                        ? "radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(16,185,129,0.45) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
                animate={{
                    x: [0, -80, 0],
                    y: [0, -40, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full opacity-20 dark:opacity-20"
                style={{
                    background: isDark
                        ? "radial-gradient(circle, rgba(255,171,0,0.25) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
                animate={{
                    x: [0, 60, 0],
                    y: [0, -60, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                }}
            />
        </div>
    );
}

function GradientOrbitingRings() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
            <motion.div
                className="absolute inset-0 border border-[#7635dc]/25 dark:border-[#7635dc]/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute inset-8 border border-[#FFAB00]/20 dark:border-[#FFAB00]/15 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute inset-16 border border-[#22C55E]/20 dark:border-[#22C55E]/15 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}

function PulseGlowSpots() {
    const spots = [
        { x: "15%", y: "20%", color: "#7635dc" },
        { x: "80%", y: "25%", color: "#FFAB00" },
        { x: "70%", y: "75%", color: "#22C55E" },
        { x: "25%", y: "70%", color: "#7635dc" },
    ];

    return (
        <>
            {spots.map((spot, i) => (
                <motion.div
                    key={i}
                    className="absolute w-32 h-32 rounded-full pointer-events-none"
                    style={{
                        left: spot.x,
                        top: spot.y,
                        background: `radial-gradient(circle, ${spot.color}30 0%, transparent 70%)`,
                        filter: "blur(20px)",
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </>
    );
}

function MeshGridLines() {
    return (
        <div
            className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.02]"
            style={{
                backgroundImage: `
                    linear-gradient(#7635dc 1px, transparent 1px),
                    linear-gradient(90deg, #7635dc 1px, transparent 1px)
                `,
                backgroundSize: '64px 64px',
            }}
        />
    );
}

function MouseReactiveGlow() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const glowX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
    const glowY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth);
            mouseY.set(e.clientY / window.innerHeight);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-40"
            style={{
                background: "radial-gradient(circle, rgba(118,53,220,0.15) 0%, transparent 70%)",
                filter: "blur(80px)",
                x: glowX,
                y: glowY,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
    );
}

export function ParticleBackground({ showRings = false }: { showRings?: boolean }) {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        setMounted(true);
        const dark = document.documentElement.classList.contains("dark");
        setIsDark(dark);

        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-50">
            <AnimatedMeshGradient isDark={isDark} />
            {showRings && <GradientOrbitingRings />}
            <PulseGlowSpots />
            <MeshGridLines />
            <MouseReactiveGlow />

            {PARTICLES.map((particle) => (
                <FloatingParticle
                    key={particle.id}
                    particle={particle}
                    isDark={isDark}
                />
            ))}

            <div className={`absolute inset-0 ${isDark
                ? "bg-gradient-to-b from-[#141A21]/80 via-transparent to-[#141A21]/80"
                : "bg-gradient-to-b from-white/60 via-transparent to-white/60"
                }`} />
        </div>
    );
}
