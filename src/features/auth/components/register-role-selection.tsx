"use client";

import { motion } from "framer-motion";
import { User, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserRole } from "../types/auth-types";

interface RegisterRoleSelectionProps {
    onRoleSelect: (role: UserRole) => void;
}

export function RegisterRoleSelection() {
    // For now, we just handle local state or navigation. 
    // Since the full flow isn't built, we can just log or navigate.
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

    const handleContinue = () => {
        if (selectedRole) {
            console.log("Selected role:", selectedRole);
            // In a real app, this would navigate to the next step or save to store
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Tạo tài khoản mới
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Bạn muốn tham gia SmartHire với vai trò gì?
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <RoleCard
                    role="candidate"
                    icon={User}
                    title="Ứng viên"
                    description="Tôi đang tìm kiếm cơ hội việc làm mới"
                    isSelected={selectedRole === "candidate"}
                    onSelect={() => setSelectedRole("candidate")}
                />
                <RoleCard
                    role="employer"
                    icon={Building2}
                    title="Nhà tuyển dụng"
                    description="Tôi muốn đăng tin và tìm kiếm nhân tài"
                    isSelected={selectedRole === "employer"}
                    onSelect={() => setSelectedRole("employer")}
                />
            </div>

            <Button
                className="w-full"
                size="lg"
                disabled={!selectedRole}
                onClick={handleContinue}
            >
                Tiếp tục quy trình
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="px-8 text-center text-sm text-gray-500 dark:text-gray-400">
                Đã có tài khoản?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                    Đăng nhập ngay
                </Link>
            </p>
        </div>
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
                "cursor-pointer relative overflow-hidden rounded-2xl border p-6 transition-all duration-200",
                isSelected
                    ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600 ring-offset-2 dark:border-blue-500 dark:bg-blue-900/10 dark:ring-offset-black"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-700"
            )}
        >
            <div className="flex flex-col items-center text-center space-y-4">
                <div
                    className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-full transition-colors",
                        isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600"
                    )}
                >
                    <Icon className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                    <h3 className={cn("font-semibold text-lg", isSelected ? "text-blue-700 dark:text-blue-400" : "text-gray-900 dark:text-white")}>
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                </div>
            </div>

            {/* Active Indicator Checkmark */}
            {isSelected && (
                <div className="absolute top-4 right-4">
                    <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
