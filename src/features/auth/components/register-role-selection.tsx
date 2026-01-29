"use client";

import { motion } from "framer-motion";
import { User, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserRole } from "../types/auth-types";

interface RegisterRoleSelectionProps {
    onRoleSelect?: (role: UserRole) => void;
}

export function RegisterRoleSelection() {
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

    const handleContinue = () => {
        if (selectedRole) {
            console.log("Selected role:", selectedRole);
            // In a real app, this would navigate to the next step or save to store
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { staggerChildren: 0.1, duration: 0.5 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-10"
        >
            <div className="space-y-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 tracking-widest uppercase font-orbitron mb-2"
                >
                    System Initialization
                </motion.div>
                <motion.h1
                    className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans"
                    variants={itemVariants}
                >
                    Define Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Identity Protocol</span>
                </motion.h1>
                <motion.p
                    className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-lg"
                    variants={itemVariants}
                >
                    Select your operating mode to access the neural network.
                </motion.p>
            </div>

            <motion.div
                className="grid gap-6 md:grid-cols-2"
                variants={itemVariants}
            >
                <HolographicCard
                    role="candidate"
                    icon={User}
                    title="Candidate Node"
                    description="Seek opporunities & upgrade skills"
                    isSelected={selectedRole === "candidate"}
                    onSelect={() => setSelectedRole("candidate")}
                />
                <HolographicCard
                    role="employer"
                    icon={Building2}
                    title="Employer Core"
                    description="Acquire talent & manage resources"
                    isSelected={selectedRole === "employer"}
                    onSelect={() => setSelectedRole("employer")}
                />
            </motion.div>

            <motion.div variants={itemVariants}>
                <Button
                    className="w-full h-14 text-lg font-bold shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] transition-all duration-300 bg-gradient-to-r from-indigo-600 to-pink-600 border-0 rounded-2xl relative overflow-hidden"
                    size="lg"
                    disabled={!selectedRole}
                    onClick={handleContinue}
                    variant="primary"
                >
                    <span className="relative z-10 flex items-center justify-center">
                        Proceed to Data Entry
                        <ArrowRight className="ml-2 h-6 w-6" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300" />
                </Button>
            </motion.div>

            <motion.p
                className="px-8 text-center text-sm text-slate-500 dark:text-slate-400"
                variants={itemVariants}
            >
                Existing Entity?{" "}
                <Link
                    href="/login"
                    className="font-bold text-indigo-500 hover:text-indigo-400 dark:text-indigo-400 hover:tracking-wide transition-all"
                >
                    Login to System
                </Link>
            </motion.p>
        </motion.div>
    );
}

interface RoleCardProps {
    role: UserRole;
    icon: React.ElementType;
    title: string;
    description: string;
    isSelected: boolean;
    onSelect: () => void;
}

function HolographicCard({ role, icon: Icon, title, description, isSelected, onSelect }: RoleCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, translateY: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelect}
            className={cn(
                "cursor-pointer group relative overflow-hidden rounded-3xl p-[2px] transition-all duration-300",
                isSelected
                    ? "shadow-[0_0_40px_rgba(99,102,241,0.3)]"
                    : "hover:shadow-2xl"
            )}
        >
            {/* Animated Gradient Border */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300",
                isSelected ? "opacity-100" : "group-hover:opacity-100"
            )} />

            <div className={cn(
                "absolute inset-0 bg-slate-200 dark:bg-slate-800 transition-colors duration-300",
                isSelected ? "opacity-0" : "opacity-100 group-hover:opacity-0"
            )} />

            {/* Inner Content Card */}
            <div className="relative h-full w-full bg-slate-50 dark:bg-[#0B0F19] rounded-[22px] p-6 flex flex-col items-center text-center space-y-4 overflow-hidden">

                {/* Background Grid Pattern inside card */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,rgba(0,0,0,1)_25%,transparent_25%,transparent_75%,rgba(0,0,0,1)_75%,rgba(0,0,0,1)),linear-gradient(45deg,rgba(0,0,0,1)_25%,transparent_25%,transparent_75%,rgba(0,0,0,1)_75%,rgba(0,0,0,1))] bg-[length:20px_20px] dark:bg-[linear-gradient(45deg,rgba(255,255,255,1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,1)_75%,rgba(255,255,255,1)),linear-gradient(45deg,rgba(255,255,255,1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,1)_75%,rgba(255,255,255,1))]" />

                <div
                    className={cn(
                        "relative flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 transform group-hover:rotate-6",
                        isSelected
                            ? "bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-lg"
                            : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-pink-500"
                    )}
                >
                    <Icon className="h-9 w-9" />
                </div>

                <div className="space-y-1 z-10">
                    <h3 className={cn("font-bold text-xl font-sans", isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-900 dark:text-white")}>
                        {title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {description}
                    </p>
                </div>

                {/* Status Indicator */}
                <motion.div
                    animate={{
                        opacity: isSelected ? 1 : 0,
                        scale: isSelected ? 1 : 0.5
                    }}
                    className="absolute top-4 right-4"
                >
                    <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
                </motion.div>
            </div>
        </motion.div>
    );
}
