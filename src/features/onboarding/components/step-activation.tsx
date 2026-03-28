"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { Loader2, FileText, CheckCircle2 } from "lucide-react";
import { onboardingApi, OnboardingCvData } from "../api/onboarding-api";

interface StepActivationProps {
    onNext: (option: "ai" | "manual", cvData?: OnboardingCvData) => void;
    onBack: () => void;
}

export function StepActivation({ onNext, onBack }: StepActivationProps) {
    const [selectedOption, setSelectedOption] = useState<"ai" | "manual" | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [progressText, setProgressText] = useState("Đang trích xuất các kỹ năng và kinh nghiệm chính...");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
        };
    }, []);

    const handleContinue = () => {
        if (!selectedOption) return;

        if (selectedOption === "ai") {
            // Trigger file input dialog
            fileInputRef.current?.click();
        } else {
            // Manual flow, just proceed
            onNext("manual");
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(10);
        setProgressText("Đang tải file lên hệ thống...");
        
        // Mock data logic as requested
        let progress = 10;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setProgressText("Trích xuất thành công");
                
                setTimeout(() => {
                    const mockData: OnboardingCvData = {
                        cvFileId: 999, // Fake ID for mock
                        firstName: "Tuấn Anh",
                        lastName: "Trần",
                        phone: "0987654321",
                        email: "tta24.dev@gmail.com",
                        linkedin: "https://linkedin.com/in/tuananh",
                        website: "https://github.com/tuananhhit1612",
                        country: "VN",
                        state: "Đồng Nai",
                        city: "Biên Hòa",
                        gender: "Nam"
                    };
                    onNext("ai", mockData);
                }, 800);
            } else if (progress > 60) {
                setProgressText("Đang phân tích kỹ năng và kinh nghiệm...");
            } else if (progress > 30) {
                setProgressText("Đang đọc nội dung file...");
            }
            setUploadProgress(Math.min(progress, 100));
        }, 300);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center w-full space-y-10 p-4 sm:p-8"
        >
            <div className="space-y-4 text-center max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-500 dark:to-amber-400">
                    Hãy kích hoạt công cụ tuyển dụng AI cá nhân của bạn
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Tải lên sơ yếu lý lịch của bạn để tạo ngay chiến lược tìm việc phù hợp với cá nhân bạn. Đây là lần duy nhất bạn cần thực hiện thao tác này.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* AI Option */}
                <motion.button
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedOption("ai")}
                    className={`relative flex flex-col items-center text-center p-8 rounded-3xl border-2 transition-all duration-300 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(34,197,94,0.25)] ${selectedOption === "ai"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-transparent bg-white/50 dark:bg-[#1C252E]/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/10"
                        }`}
                >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-emerald-500/25">
                        <span>🏆</span> Phổ biến nhất & Nhanh nhất
                    </div>

                    <div className="w-48 h-48 mb-6 mt-4 relative">
                        {/* We use a clean structural graphic instead of techy AI icons */}
                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-100 to-transparent dark:from-emerald-900/20 rounded-2xl" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-32 bg-white dark:bg-[#1C252E] rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col items-center p-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-3" />
                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-2" />
                            <div className="w-4/5 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-4" />
                            <div className="w-full h-1 bg-emerald-500/20 rounded-full mb-1" />
                            <div className="w-full h-1 bg-emerald-500/20 rounded-full mb-1" />
                            <div className="w-3/4 h-1 bg-emerald-500/20 rounded-full" />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                        Kích hoạt bằng AI (10 giây)
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Để AI của chúng tôi phân tích sơ yếu lý lịch để xây dựng hồ sơ độc quyền ngay lập tức.
                    </p>
                </motion.button>

                {/* Manual Option */}
                <motion.button
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedOption("manual")}
                    className={`relative flex flex-col items-center text-center p-8 rounded-3xl border transition-all duration-300 backdrop-blur-xl ${selectedOption === "manual"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#1C252E]/50 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                >
                    <div className="w-48 h-48 mb-6 mt-4 relative">
                        {/* Clean structural graphic for manual creation */}
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-transparent dark:from-slate-800/50 rounded-2xl" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-32 bg-white dark:bg-[#141A21] rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col items-start p-4">
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-3" />
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-3" />
                            <div className="w-3/4 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-3" />
                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-3 mt-4" />
                            <div className="w-2/3 h-2 bg-slate-100 dark:bg-slate-800 rounded-full" />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                        Tôi sẽ tự bắt đầu (15-20 phút)
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Bắt đầu từ trang trắng và dành 15+ phút để nhập chi tiết nghề nghiệp của bạn.
                    </p>
                </motion.button>
            </div>

            <div className="flex items-center gap-2 mt-8 px-6 py-3 bg-amber-50 dark:bg-amber-500/10 rounded-full text-amber-700 dark:text-amber-400 text-sm font-medium">
                <span>✨</span>
                <p>
                    <span className="font-bold">Mẹo nhỏ:</span> Bắt đầu bằng sơ yếu lý lịch của bạn giúp AI Resume Builder nhanh hơn tới 90%.
                </p>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
            />

            <div className="flex gap-4 w-full max-w-4xl mt-4 pt-4 border-t border-[rgba(145,158,171,0.12)]">
                <Button
                    onClick={onBack}
                    variant="outline"
                    size="lg"
                    className="flex-1 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-50"
                    disabled={isUploading}
                >
                    Quay lại
                </Button>
                <Button
                    onClick={handleContinue}
                    disabled={!selectedOption || isUploading}
                    size="lg"
                    className="flex-1 rounded-full shadow-[0_8px_16px_rgba(34,197,94,0.24)] bg-[#22c55e] hover:bg-[#10b981] text-white disabled:opacity-50 disabled:shadow-none"
                >
                    Tiếp tục
                </Button>
            </div>

            {/* Premium Loading Overlay */}
            <AnimatePresence>
                {isUploading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-white/80 dark:bg-[#141A21]/90 backdrop-blur-md"
                    >
                        <div className="flex flex-col items-center w-full max-w-sm mx-auto space-y-8">
                            {/* Scanning Animation Graphic */}
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                {/* Outer pulsing ring */}
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 rounded-full border-4 border-emerald-500/30"
                                />
                                {/* Inner Document Icon */}
                                <motion.div
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative z-10 w-16 h-20 bg-white dark:bg-[#1C252E] rounded-xl shadow-2xl border border-emerald-100 dark:border-emerald-500/20 flex flex-col items-center justify-start py-3 px-3 gap-2 overflow-hidden"
                                >
                                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                    <div className="w-3/4 h-2 self-start bg-slate-100 dark:bg-slate-800 rounded-full" />
                                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                    <div className="w-5/6 h-2 self-start bg-slate-100 dark:bg-slate-800 rounded-full" />

                                    {/* Scanning Line */}
                                    <motion.div
                                        animate={{ top: ["-10%", "110%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 w-full h-[2px] bg-emerald-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.5)] z-20"
                                    />
                                </motion.div>
                            </div>

                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                                    Đang phân tích hồ sơ
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 font-medium text-center">
                                    {progressText}
                                </p>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full max-w-xs space-y-2">
                                <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${uploadProgress}%` }}
                                        transition={{ type: "spring", stiffness: 50, damping: 15 }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    <span>{Math.round(uploadProgress)}%</span>
                                    {uploadProgress === 100 && (
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-emerald-500 flex items-center gap-1"
                                        >
                                            <CheckCircle2 className="w-3 h-3" /> Hoàn thành
                                        </motion.span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
