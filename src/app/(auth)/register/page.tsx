"use client";

import { AuthLayout } from "@/features/auth/components/auth-layout";
import { RegisterForm } from "@/features/auth/components/register-form";
import { RegisterRoleSelection } from "@/features/auth/components/register-role-selection";
import type { UserRole } from "@/features/auth/types/auth-types";
import { AnimatePresence,motion } from "framer-motion";
import { useState } from "react";

export default function RegisterPage() {
    const [step, setStep] = useState<"role" | "form">("role");
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

    const handleRoleSelected = (role: UserRole) => {
        setSelectedRole(role);
        setStep("form");
    };

    const handleBack = () => {
        setStep("role");
    };

    return (
        <AuthLayout heading="Quản lý công việc" subheading="Tạo tài khoản để bắt đầu hành trình cùng SmartHire">
            <AnimatePresence mode="wait">
                {step === "role" ? (
                    <motion.div
                        key="role"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                    >
                        <RegisterRoleSelection onRoleSelect={handleRoleSelected} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.25 }}
                    >
                        <RegisterForm role={selectedRole!} onBack={handleBack} />
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthLayout>
    );
}
