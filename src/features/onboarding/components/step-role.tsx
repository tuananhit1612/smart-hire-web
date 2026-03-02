"use client";

import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { Check } from "lucide-react";

interface StepRoleProps {
    onNext: () => void;
    onBack: () => void;
    selectedRole: string | null;
    onSelectRole: (role: string) => void;
}

const roles = [
    { id: "software-engineering", label: "Kỹ sư phần mềm", icon: "💻" },
    { id: "design", label: "Thiết kế & UX", icon: "🎨" },
    { id: "product", label: "Quản lý sản phẩm", icon: "📦" },
    { id: "data", label: "Khoa học dữ liệu", icon: "📊" },
    { id: "marketing", label: "Marketing", icon: "🚀" },
    { id: "sales", label: "Bán hàng", icon: "📈" },
];

export function StepRole({ onNext, onBack, selectedRole, onSelectRole }: StepRoleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center w-full space-y-8 p-4 sm:p-8"
        >
            <div className="space-y-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-500 dark:to-amber-400">
                    Bạn đang tìm kiếm vị trí nào?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Chọn lĩnh vực chuyên môn chính để chúng tôi điều chỉnh các công việc phù hợp với bạn.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                {roles.map((role) => {
                    const isSelected = selectedRole === role.label;
                    return (
                        <motion.button
                            key={role.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onSelectRole(role.label)}
                            className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 backdrop-blur-xl ${isSelected
                                ? "border-[#22c55e] bg-[rgba(34,197,94,0.08)] shadow-[0_8px_24px_-8px_rgba(34,197,94,0.25)]"
                                : "border-[rgba(145,158,171,0.12)] bg-white/50 dark:bg-white/[0.02] hover:border-[rgba(145,158,171,0.24)] hover:bg-white/70 dark:hover:bg-white/[0.04]"
                                }`}
                        >
                            <span className="text-4xl mb-3">{role.icon}</span>
                            <span className={`font-semibold text-lg ${isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}>
                                {role.label}
                            </span>

                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-4 right-4 w-6 h-6 bg-[#22c55e] rounded-full flex items-center justify-center"
                                >
                                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <div className="flex gap-4 w-full max-w-2xl mt-8 pt-8 border-t border-[rgba(145,158,171,0.12)]">
                <Button
                    onClick={onBack}
                    variant="outline"
                    size="lg"
                    className="flex-1 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                    Quay lại
                </Button>
                <Button
                    onClick={onNext}
                    disabled={!selectedRole}
                    size="lg"
                    className="flex-1 rounded-full shadow-[0_8px_16px_rgba(34,197,94,0.24)] bg-[#22c55e] hover:bg-[#10b981] text-white disabled:opacity-50 disabled:shadow-none"
                >
                    Tiếp tục
                </Button>
            </div>
        </motion.div>
    );
}
