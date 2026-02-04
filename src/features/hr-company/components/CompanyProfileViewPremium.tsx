"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompanyStore } from "../stores/company-store";
import { CompanyHeaderPremium } from "./CompanyHeaderPremium";
import { CompanyAbout } from "./CompanyAbout";
import { CompanyBenefits } from "./CompanyBenefits";
import { CompanyTechStack } from "./CompanyTechStack";
import { CompanySocialLinks } from "./CompanySocialLinks";
import { Company } from "../types/company";
import { useToast } from "@/shared/components/ui/toast";
import { FloatingElements, BentoItem, ParallaxWrapper } from "./ui/premium-effects";
import {
    Briefcase,
    MapPin,
    Clock,
    Users,
    Star,
    ChevronRight,
    Zap,
    Target,
    Heart,
    Coffee,
    Rocket,
} from "lucide-react";

// Feature highlight data
const COMPANY_HIGHLIGHTS = [
    {
        icon: <Rocket className="w-6 h-6" />,
        title: "Tăng trưởng nhanh",
        description: "Môi trường phát triển năng động",
        gradient: "from-orange-500 to-red-500",
    },
    {
        icon: <Heart className="w-6 h-6" />,
        title: "Văn hóa tuyệt vời",
        description: "Đội ngũ thân thiện và hỗ trợ",
        gradient: "from-pink-500 to-rose-500",
    },
    {
        icon: <Coffee className="w-6 h-6" />,
        title: "Work-Life Balance",
        description: "Cân bằng công việc cuộc sống",
        gradient: "from-amber-500 to-orange-500",
    },
];

export function CompanyProfileViewPremium() {
    const { company, updateField } = useCompanyStore();
    const { addToast } = useToast();

    const handleUpdate = (updates: Partial<Company>) => {
        Object.entries(updates).forEach(([key, value]) => {
            updateField(key as keyof Company, value);
        });
        addToast("Đã cập nhật thông tin!", "success", 2000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50/50 via-white to-green-50/30">
            {/* Floating Background Elements */}
            <FloatingElements />

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 container mx-auto px-4 pt-24 pb-16 max-w-6xl"
            >
                {/* Page Title with Animated Gradient */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-100 rounded-full text-sky-700 text-sm font-medium mb-4"
                    >
                        <Zap className="w-4 h-4" />
                        Hồ sơ công ty được xác minh
                    </motion.div>
                    <h1 className="text-4xl sm:text-5xl font-bold">
                        <span className="text-sky-900">Hồ sơ </span>
                        <span className="relative">
                            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-sky-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                Công ty
                            </span>
                            <motion.span
                                animate={{
                                    opacity: [0.5, 1, 0.5],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -right-6 -top-2"
                            >
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            </motion.span>
                        </span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-sky-600 mt-3 text-lg"
                    >
                        Thu hút nhân tài với thương hiệu nhà tuyển dụng độc đáo
                    </motion.p>
                </motion.div>

                {/* Premium Header */}
                <CompanyHeaderPremium company={company} onUpdate={handleUpdate} />

                {/* Highlights Section - Horizontal Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
                >
                    {COMPANY_HIGHLIGHTS.map((highlight, index) => (
                        <motion.div
                            key={highlight.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            whileHover={{ scale: 1.03, y: -5 }}
                            className="group relative p-5 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all overflow-hidden"
                        >
                            {/* Background gradient on hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                            />
                            <div className="relative flex items-center gap-4">
                                <div
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${highlight.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                                >
                                    {highlight.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sky-900">{highlight.title}</h3>
                                    <p className="text-sm text-sky-600">{highlight.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* About Section - Large Card */}
                    <BentoItem className="lg:col-span-8" delay={0.2}>
                        <div className="p-6">
                            <CompanyAbout
                                about={company.about}
                                mission={company.mission}
                                vision={company.vision}
                                onUpdate={(updates) => handleUpdate(updates)}
                            />
                        </div>
                    </BentoItem>

                    {/* Social Links - Side Card */}
                    <BentoItem className="lg:col-span-4" delay={0.3}>
                        <div className="p-6 h-full">
                            <CompanySocialLinks
                                socialLinks={company.socialLinks}
                                onUpdate={(socialLinks) => handleUpdate({ socialLinks })}
                            />
                        </div>
                    </BentoItem>

                    {/* Benefits - Full Width */}
                    <BentoItem className="lg:col-span-12" delay={0.4}>
                        <div className="p-6">
                            <CompanyBenefits
                                benefits={company.benefits}
                                onUpdate={(benefits) => handleUpdate({ benefits })}
                            />
                        </div>
                    </BentoItem>

                    {/* Tech Stack - Two-thirds */}
                    <BentoItem className="lg:col-span-8" delay={0.5}>
                        <div className="p-6">
                            <CompanyTechStack
                                techStack={company.techStack}
                                onUpdate={(techStack) => handleUpdate({ techStack })}
                            />
                        </div>
                    </BentoItem>

                    {/* Quick Actions Card */}
                    <BentoItem className="lg:col-span-4" delay={0.6}>
                        <div className="p-6 h-full flex flex-col">
                            <h3 className="text-lg font-bold text-sky-900 mb-4 flex items-center gap-2">
                                <Target className="w-5 h-5 text-sky-500" />
                                Hành động nhanh
                            </h3>
                            <div className="space-y-3 flex-1">
                                <QuickActionButton
                                    label="Đăng tin tuyển dụng"
                                    description="Tìm ứng viên phù hợp"
                                    gradient="from-green-500 to-emerald-600"
                                />
                                <QuickActionButton
                                    label="Xem analytics"
                                    description="Theo dõi hiệu suất"
                                    gradient="from-sky-500 to-blue-600"
                                />
                                <QuickActionButton
                                    label="Quản lý ứng viên"
                                    description="Xử lý hồ sơ ứng tuyển"
                                    gradient="from-purple-500 to-indigo-600"
                                />
                            </div>
                        </div>
                    </BentoItem>
                </div>

                {/* Call to Action Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10"
                >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-600 p-8 text-white shadow-2xl">
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <svg width="100%" height="100%">
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <circle cx="20" cy="20" r="1" fill="white" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>
                        </div>

                        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">
                                    Sẵn sàng thu hút nhân tài?
                                </h3>
                                <p className="text-white/80">
                                    Hoàn thiện hồ sơ công ty để tăng khả năng tiếp cận ứng viên chất lượng
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-3 bg-white text-sky-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                            >
                                Đăng tin ngay
                                <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* CSS for gradient animation */}
            <style jsx global>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </div>
    );
}

function QuickActionButton({
    label,
    description,
    gradient,
}: {
    label: string;
    description: string;
    gradient: string;
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-sky-50 hover:bg-sky-100 rounded-xl text-left transition-all group border border-sky-100 hover:border-sky-200"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-semibold text-sky-900">{label}</h4>
                    <p className="text-sm text-sky-600">{description}</p>
                </div>
                <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                    <ChevronRight className="w-4 h-4 text-white" />
                </div>
            </div>
        </motion.button>
    );
}
