"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useCompanyStore } from "../stores/company-store";
import { CompanyHeader } from "./CompanyHeader";
import { CompanyAbout } from "./CompanyAbout";
import { CompanyBenefits } from "./CompanyBenefits";
import { CompanyTechStack } from "./CompanyTechStack";
import { CompanySocialLinks } from "./CompanySocialLinks";
import { Company } from "../types/company";
import { useToast } from "@/shared/components/ui/toast";

export function CompanyProfileView() {
    const { company, updateField } = useCompanyStore();
    const { addToast } = useToast();

    const handleUpdate = (updates: Partial<Company>) => {
        Object.entries(updates).forEach(([key, value]) => {
            updateField(key as keyof Company, value);
        });
        addToast("Đã cập nhật thông tin!", "success", 2000);
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Aurora Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 1 }}
                    className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[rgba(145,158,171,0.04)] via-white to-transparent rounded-full blur-3xl"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-green-200/30 via-emerald-200/20 to-transparent rounded-full blur-3xl"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 pt-24 pb-12 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Page Title */}
                    <div className="text-center mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl sm:text-4xl font-bold text-[#1C252E]"
                        >
                            Hồ sơ{" "}
                            <span className="bg-gradient-to-r from-[#22c55e] to-[#10b981] bg-clip-text text-transparent">
                                Công ty
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-[#22c55e] mt-2"
                        >
                            Quản lý thông tin và hình ảnh công ty của bạn
                        </motion.p>
                    </div>

                    {/* Header Section */}
                    <CompanyHeader
                        company={company}
                        onUpdate={handleUpdate}
                    />

                    {/* About Section */}
                    <CompanyAbout
                        about={company.about}
                        mission={company.mission}
                        vision={company.vision}
                        onUpdate={(updates) => handleUpdate(updates)}
                    />

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Benefits */}
                        <CompanyBenefits
                            benefits={company.benefits}
                            onUpdate={(benefits) => handleUpdate({ benefits })}
                        />

                        {/* Social Links */}
                        <CompanySocialLinks
                            socialLinks={company.socialLinks}
                            onUpdate={(socialLinks) => handleUpdate({ socialLinks })}
                        />
                    </div>

                    {/* Tech Stack - Full Width */}
                    <CompanyTechStack
                        techStack={company.techStack}
                        onUpdate={(techStack) => handleUpdate({ techStack })}
                    />
                </motion.div>
            </div>
        </div>
    );
}

