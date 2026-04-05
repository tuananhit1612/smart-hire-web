"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { OnboardingCvData } from "../api/onboarding-api";
import { Input } from "@/shared/components/ui/input";

interface StepVerifyCVProps {
    cvData: OnboardingCvData;
    onNext: (data: OnboardingCvData) => void;
    onBack: () => void;
}

export function StepVerifyCV({ cvData, onNext, onBack }: StepVerifyCVProps) {
    const [formData, setFormData] = useState<OnboardingCvData>(cvData);

    const handleChange = (field: keyof OnboardingCvData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center w-full space-y-8 p-4 sm:p-8"
        >
            <div className="space-y-4 text-center max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-500 dark:to-amber-400">
                    Tuyệt vời! Đây là thông tin chúng tôi đã trích xuất từ sơ yếu lý lịch của bạn.
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Vui lòng kiểm tra nhanh để đảm bảo mọi thứ đều chính xác.
                </p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                {/* THÔNG TIN CÁ NHÂN */}
                <div className="bg-white dark:bg-[#1C252E] border border-slate-200 dark:border-[rgba(145,158,171,0.24)] rounded-2xl p-6 md:p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Thông tin cá nhân</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 relative">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                                Tên
                            </label>
                            <Input 
                                value={formData.firstName || ""} 
                                onChange={(e) => handleChange("firstName", e.target.value)}
                                className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" 
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                                Họ
                            </label>
                            <Input 
                                value={formData.lastName || ""} 
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" 
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                                Số điện thoại
                            </label>
                            <Input 
                                value={formData.phone || ""} 
                                onChange={(e) => handleChange("phone", e.target.value)}
                                className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500 pl-4" 
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                                Email
                            </label>
                            <Input 
                                value={formData.email || ""} 
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" 
                            />
                        </div>
                        <div className="space-y-2 relative md:col-span-2">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                                Linkedin
                            </label>
                            <Input 
                                value={formData.linkedin || ""} 
                                onChange={(e) => handleChange("linkedin", e.target.value)}
                                className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" 
                            />
                        </div>
                        <div className="space-y-2 relative md:col-span-2">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                                Website
                            </label>
                            <Input 
                                value={formData.website || ""} 
                                onChange={(e) => handleChange("website", e.target.value)}
                                className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" 
                            />
                        </div>
                    </div>
                </div>

                {/* TÓM TẮT & KỸ NĂNG */}
                <div className="bg-white dark:bg-[#1C252E] border border-slate-200 dark:border-[rgba(145,158,171,0.24)] rounded-2xl p-6 md:p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Hồ sơ chuyên môn</h3>
                    <div className="space-y-6">
                        <div className="space-y-2 relative">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                                Tóm tắt bản thân
                            </label>
                            <textarea 
                                value={formData.summary || ""} 
                                onChange={(e) => handleChange("summary", e.target.value)}
                                className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-3 text-sm shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 dark:border-[rgba(145,158,171,0.24)] dark:placeholder:text-slate-400" 
                            />
                        </div>

                        <div className="space-y-2 relative">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                                Kỹ năng (ngăn cách bởi dấu phẩy)
                            </label>
                            <Input 
                                value={formData.skills?.join(", ") || ""} 
                                onChange={(e) => handleChange("skills", e.target.value.split(",").map(s => s.trim()))}
                                className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" 
                            />
                        </div>
                    </div>
                </div>

                {/* KINH NGHIỆM */}
                {formData.experience && formData.experience.length > 0 && (
                    <div className="bg-white dark:bg-[#1C252E] border border-slate-200 dark:border-[rgba(145,158,171,0.24)] rounded-2xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Kinh nghiệm làm việc</h3>
                        <div className="space-y-4">
                            {formData.experience.map((exp, idx) => (
                                <div key={idx} className="border-l-2 border-emerald-500 pl-4 py-1">
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">{exp.title}</h4>
                                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{exp.company}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{exp.startDate} - {exp.endDate}</p>
                                    {exp.description && <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">{exp.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* HỌC VẤN */}
                {formData.education && formData.education.length > 0 && (
                    <div className="bg-white dark:bg-[#1C252E] border border-slate-200 dark:border-[rgba(145,158,171,0.24)] rounded-2xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Học vấn</h3>
                        <div className="space-y-4">
                            {formData.education.map((edu, idx) => (
                                <div key={idx} className="border-l-2 border-purple-500 pl-4 py-1">
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">{edu.degree} {edu.major && `- ${edu.major}`}</h4>
                                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{edu.school}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-4 w-full max-w-3xl mt-4">
                <Button
                    onClick={onBack}
                    variant="ghost"
                    size="lg"
                    className="rounded-xl px-8 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative z-50"
                >
                    Mặt sau
                </Button>
                <Button
                    onClick={() => onNext(formData)}
                    size="lg"
                    className="rounded-xl px-8 shadow-[0_8px_16px_rgba(118,53,220,0.24)] bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold relative z-50"
                >
                    Trông rất tốt, tiếp tục nhé!
                </Button>
            </div>
        </motion.div>
    );
}
