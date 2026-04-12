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

export function RegisterRoleSelection({ onRoleSelect }: RegisterRoleSelectionProps) {
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

    const handleContinue = () => {
        if (selectedRole && onRoleSelect) {
            onRoleSelect(selectedRole);
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1, duration: 0.4 }}
            className="space-y-8"
        >
            {/* Header */}
            <motion.div className="space-y-2 text-center" variants={itemVariants}>
                <h1 className="text-2xl font-bold tracking-tight text-[#1C252E] dark:text-white">
                    Tạo tài khoản
                </h1>
                <p className="text-[#637381] dark:text-[#C4CDD5] text-sm max-w-sm mx-auto">
                    Chọn cách bạn muốn sử dụng SmartHire.
                </p>
            </motion.div>

            {/* Role cards */}
            <motion.div className="grid gap-4 md:grid-cols-2" variants={itemVariants}>
                <RoleCard
                    icon={User}
                    title="Tôi là Ứng viên"
                    description="Tìm việc & phát triển sự nghiệp"
                    isSelected={selectedRole === "candidate"}
                    onSelect={() => setSelectedRole("candidate")}
                />
                <RoleCard
                    icon={Building2}
                    title="Tôi là Nhà tuyển dụng"
                    description="Tuyển dụng nhân tài & đăng tin"
                    isSelected={selectedRole === "hr"}
                    onSelect={() => setSelectedRole("hr")}
                />
            </motion.div>

            {/* Continue */}
            <motion.div variants={itemVariants}>
                <Button
                    className="w-full h-12 text-base font-semibold bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 shadow-none border-0 rounded-xl transition-all disabled:opacity-40"
                    disabled={!selectedRole}
                    onClick={handleContinue}
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                    Tiếp tục
                </Button>
            </motion.div>

            {/* Login link */}
            <motion.p
                className="text-center text-sm text-[#637381] dark:text-[#C4CDD5]"
                variants={itemVariants}
            >
                Đã có tài khoản?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-[#22C55E] hover:text-[#16A34A] transition-colors"
                >
                    Đăng nhập
                </Link>
            </motion.p>
        </motion.div>
    );
}

// ─── Role Card ──────────────────────────────────────

interface RoleCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    isSelected: boolean;
    onSelect: () => void;
}

function RoleCard({ icon: Icon, title, description, isSelected, onSelect }: RoleCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className={cn(
                "relative cursor-pointer rounded-2xl p-6 transition-all duration-300 border-2 group",
                isSelected
                    ? "border-[#22C55E]/40 bg-[#22C55E]/[0.04] dark:bg-[#22C55E]/[0.06] shadow-[0_8px_30px_-5px_rgba(34,197,94,0.12)]"
                    : "border-[rgba(145,158,171,0.12)] bg-white dark:bg-[#1C252E] hover:border-[rgba(145,158,171,0.32)] hover:shadow-lg"
            )}
        >
            {/* Check icon when selected */}
            {isSelected && (
                <div className="absolute top-4 right-4">
                    <CheckCircle className="w-5 h-5 fill-[#22C55E] text-white" />
                </div>
            )}

            {/* Icon container */}
            <div className={cn(
                "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300",
                isSelected
                    ? "bg-gradient-to-br from-[#22c55e] to-[#10b981] shadow-lg shadow-green-500/25"
                    : "bg-[rgba(145,158,171,0.06)] dark:bg-[rgba(145,158,171,0.1)] group-hover:bg-[rgba(145,158,171,0.1)]"
            )}>
                <Icon className={cn(
                    "h-6 w-6 transition-colors",
                    isSelected ? "text-white" : "text-[#1C252E] dark:text-white"
                )} />
            </div>

            <div className="space-y-1">
                <h3 className="font-bold text-lg text-[#1C252E] dark:text-white">
                    {title}
                </h3>
                <p className="text-sm text-[#637381] dark:text-[#C4CDD5]">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
