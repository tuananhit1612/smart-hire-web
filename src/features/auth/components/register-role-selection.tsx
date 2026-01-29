"use client";

import { motion } from "framer-motion";
import { User, Building2, ArrowRight, CheckCircle } from "lucide-react";
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
            transition: { staggerChildren: 0.1, duration: 0.4 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
        >
            <div className="space-y-2 text-center">
                <motion.h1
                    className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-inter"
                    variants={itemVariants}
                >
                    Create an account
                </motion.h1>
                <motion.p
                    className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-base"
                    variants={itemVariants}
                >
                    Choose how you want to use SmartHire.
                </motion.p>
            </div>

            <motion.div
                className="grid gap-4 md:grid-cols-2"
                variants={itemVariants}
            >
                <RoleCard
                    role="candidate"
                    icon={User}
                    title="I'm a Candidate"
                    description="Find jobs & build your career"
                    isSelected={selectedRole === "candidate"}
                    onSelect={() => setSelectedRole("candidate")}
                />
                <RoleCard
                    role="employer"
                    icon={Building2}
                    title="I'm an Employer"
                    description="Hire talent & post jobs"
                    isSelected={selectedRole === "employer"}
                    onSelect={() => setSelectedRole("employer")}
                />
            </motion.div>

            <motion.div variants={itemVariants}>
                <Button
                    className="w-full h-14 text-base font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    disabled={!selectedRole}
                    onClick={handleContinue}
                    variant="primary"
                >
                    <span className="flex items-center justify-center">
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                </Button>
            </motion.div>

            <motion.p
                className="text-center text-sm text-slate-500 dark:text-slate-400"
                variants={itemVariants}
            >
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-blue-600 hover:underline hover:text-blue-700 transition-colors"
                >
                    Log in
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

function RoleCard({ role, icon: Icon, title, description, isSelected, onSelect }: RoleCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className={cn(
                "relative cursor-pointer rounded-2xl p-6 transition-all duration-200 border-2",
                isSelected
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/10"
                    : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200 dark:hover:border-blue-800"
            )}
        >
            {isSelected && (
                <div className="absolute top-4 right-4 text-blue-600">
                    <CheckCircle className="w-5 h-5 fill-blue-600 text-white" />
                </div>
            )}

            <div className={cn(
                "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            )}>
                <Icon className="h-6 w-6" />
            </div>

            <div className="space-y-1">
                <h3 className={cn("font-bold text-lg", isSelected ? "text-blue-900 dark:text-blue-100" : "text-slate-900 dark:text-white")}>
                    {title}
                </h3>
                <p className={cn("text-sm", isSelected ? "text-blue-700 dark:text-blue-300" : "text-slate-500 dark:text-slate-400")}>
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
