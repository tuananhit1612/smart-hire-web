"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, PenLine, User, Upload, ArrowRight, CheckCircle2,
    Loader2, AlertCircle
} from "lucide-react";
import { useCVBuilderStore } from "@/features/cv/stores/cv-builder-store";
import { getMockDataForTemplate } from "@/features/cv/data/mock-data";
import { useProfileStore } from "@/features/profile/stores/profile-store";
import { mapProfileToCVData } from "@/features/cv/utils/profile-to-cv-mapper";
import { mapOnboardingCvToCVData } from "@/features/cv/utils/onboarding-cv-to-cv-mapper";
import { onboardingApi } from "@/features/onboarding/api/onboarding-api";
import { validateFile, CV_RULES } from "@/shared/utils/file-validation";

interface CVDataSourceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type SourceId = "manual" | "profile" | "upload";
type ModalPhase = "select" | "loading-profile" | "uploading" | "error";

const DATA_SOURCES = [
    {
        id: "manual" as const,
        icon: PenLine,
        title: "Nhập tay",
        description: "Tự điền thông tin từng mục trong CV",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        iconColor: "text-blue-500",
    },
    {
        id: "profile" as const,
        icon: User,
        title: "Lấy từ Hồ sơ",
        description: "Tự động điền từ thông tin cá nhân có sẵn",
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        iconColor: "text-green-500",
    },
    {
        id: "upload" as const,
        icon: Upload,
        title: "Upload CV có sẵn",
        description: "Tải lên file PDF/DOCX, AI sẽ trích xuất thông tin",
        color: "from-purple-500 to-violet-500",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        iconColor: "text-purple-500",
        badge: "AI",
    },
];

export function CVDataSourceModal({ isOpen, onClose }: CVDataSourceModalProps) {
    const { selectedTemplateId, setCvData } = useCVBuilderStore();
    const { profile, fetchProfile } = useProfileStore();
    const [selectedSource, setSelectedSource] = React.useState<SourceId | null>(null);
    const [phase, setPhase] = React.useState<ModalPhase>("select");
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [progressText, setProgressText] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const progressIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, []);

    // Reset state when modal opens
    React.useEffect(() => {
        if (isOpen) {
            setSelectedSource(null);
            setPhase("select");
            setUploadProgress(0);
            setProgressText("");
            setErrorMsg("");
        }
    }, [isOpen]);

    /* ── Manual ─────────────────────────────────────────── */
    const handleManual = () => {
        setSelectedSource("manual");
        setTimeout(() => {
            const sampleData = getMockDataForTemplate(selectedTemplateId || "modern-tech");
            setCvData(sampleData);
            onClose();
            setSelectedSource(null);
        }, 600);
    };

    /* ── Profile ────────────────────────────────────────── */
    const handleProfile = async () => {
        setSelectedSource("profile");
        setPhase("loading-profile");

        try {
            // Fetch latest profile from API
            await fetchProfile();

            // Get the freshly-fetched profile from the store
            const freshProfile = useProfileStore.getState().profile;

            // Check if profile has meaningful data
            const hasData = freshProfile.fullName || freshProfile.email ||
                (freshProfile.experiences?.length > 0) ||
                (freshProfile.educations?.length > 0) ||
                (freshProfile.skills?.length > 0);

            if (!hasData) {
                setPhase("error");
                setErrorMsg("Hồ sơ cá nhân trống. Vui lòng cập nhật hồ sơ trước khi sử dụng tính năng này.");
                return;
            }

            // Map profile to CV data
            const cvData = mapProfileToCVData(freshProfile);
            setCvData(cvData);

            // Short delay for UX feedback
            setTimeout(() => {
                onClose();
                setSelectedSource(null);
                setPhase("select");
            }, 500);
        } catch (err) {
            console.error("[CVDataSource] Failed to fetch profile:", err);
            setPhase("error");
            setErrorMsg("Không thể tải hồ sơ cá nhân. Vui lòng thử lại sau.");
        }
    };

    /* ── Upload + AI Parse ──────────────────────────────── */
    const handleUpload = () => {
        setSelectedSource("upload");
        // Trigger file picker
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // Reset the input so re-selecting the same file works
        if (fileInputRef.current) fileInputRef.current.value = "";

        if (!file) {
            setSelectedSource(null);
            return;
        }


        // Validate file
        const validation = validateFile(file, CV_RULES);
        if (!validation.valid) {
            setPhase("error");
            setErrorMsg(validation.errors[0]);
            return;
        }

        setPhase("uploading");
        setUploadProgress(10);
        setProgressText("Đang tải file lên hệ thống...");

        try {
            // 1. Upload CV
            const uploadRes = await onboardingApi.uploadCv(file);
            setUploadProgress(30);
            setProgressText("Đang đọc nội dung file...");

            // Visual progress while waiting for AI
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) return 90;
                    return prev + Math.random() * 5;
                });
            }, 600);
            progressIntervalRef.current = interval;

            // 2. Poll for AI parsing result
            setProgressText("AI đang phân tích kỹ năng và kinh nghiệm...");
            const parseRes = await onboardingApi.getParseStatus(uploadRes.cvFileId);

            clearInterval(interval);
            progressIntervalRef.current = null;

            // 3. Handle result
            if (parseRes.status === "COMPLETED" && parseRes.data) {
                setUploadProgress(100);
                setProgressText("Trích xuất thành công!");

                const cvData = mapOnboardingCvToCVData(parseRes.data);
                setCvData(cvData);

                setTimeout(() => {
                    onClose();
                    setSelectedSource(null);
                    setPhase("select");
                }, 800);
            } else {
                console.error("[CVDataSource] AI parse failed:", parseRes);
                setPhase("error");
                setErrorMsg(parseRes.message || "AI không thể phân tích file này. Vui lòng thử file khác.");
            }
        } catch (error: any) {
            console.error("[CVDataSource] Upload/parse error:", error);
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }
            setPhase("error");
            const msg = error?.response?.data?.message || error?.message || "Đã xảy ra lỗi khi tải lên. Vui lòng thử lại.";
            setErrorMsg(msg);
        }
    };

    const handleSelectSource = (sourceId: SourceId) => {
        switch (sourceId) {
            case "manual":
                handleManual();
                break;
            case "profile":
                handleProfile();
                break;
            case "upload":
                handleUpload();
                break;
        }
    };

    const handleRetry = () => {
        setPhase("select");
        setSelectedSource(null);
        setErrorMsg("");
        setUploadProgress(0);
    };

    const isProcessing = phase === "loading-profile" || phase === "uploading";
    const isBusy = isProcessing || selectedSource === "upload"; // block close while file picker is open

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={!isBusy ? onClose : undefined}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-white dark:bg-[#1C252E] rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* ── Source Selection Phase ── */}
                        {phase === "select" && (
                            <>
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                            Bắt đầu tạo CV
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            Chọn cách bạn muốn nhập thông tin
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Options */}
                                <div className="space-y-3">
                                    {DATA_SOURCES.map((source) => {
                                        const Icon = source.icon;
                                        const isSelected = selectedSource === source.id;

                                        return (
                                            <motion.button
                                                key={source.id}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleSelectSource(source.id)}
                                                disabled={!!selectedSource}
                                                className={`
                                                    w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left
                                                    ${isSelected
                                                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
                                                    }
                                                    disabled:cursor-not-allowed
                                                `}
                                            >
                                                {/* Icon */}
                                                <div className={`w-12 h-12 rounded-xl ${source.bgColor} flex items-center justify-center shrink-0`}>
                                                    {isSelected ? (
                                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                                    ) : (
                                                        <Icon className={`w-6 h-6 ${source.iconColor}`} />
                                                    )}
                                                </div>

                                                {/* Text */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                                                            {source.title}
                                                        </h3>
                                                        {source.badge && (
                                                            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-md">
                                                                {source.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                        {source.description}
                                                    </p>
                                                </div>

                                                {/* Arrow */}
                                                <ArrowRight className={`w-4 h-4 shrink-0 transition-colors ${isSelected ? "text-green-500" : "text-gray-300"}`} />
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Skip hint */}
                                <p className="text-center text-xs text-gray-400 mt-5">
                                    Bạn có thể thay đổi dữ liệu bất kỳ lúc nào sau khi chọn
                                </p>
                            </>
                        )}

                        {/* ── Loading Profile Phase ── */}
                        {phase === "loading-profile" && (
                            <div className="flex flex-col items-center py-12 space-y-6">
                                <div className="relative w-20 h-20 flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 rounded-full border-4 border-green-200 dark:border-green-900/30 border-t-green-500"
                                    />
                                    <User className="w-8 h-8 text-green-500" />
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                        Đang tải hồ sơ cá nhân...
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Đang lấy thông tin từ hồ sơ của bạn
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ── Uploading + AI Parse Phase ── */}
                        {phase === "uploading" && (
                            <div className="flex flex-col items-center py-10 space-y-8">
                                {/* Scanning Animation */}
                                <div className="relative w-28 h-28 flex items-center justify-center">
                                    <motion.div
                                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute inset-0 rounded-full border-4 border-purple-500/30"
                                    />
                                    <motion.div
                                        animate={{ y: [-4, 4, -4] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative z-10 w-14 h-18 bg-white dark:bg-[#1C252E] rounded-xl shadow-2xl border border-purple-100 dark:border-purple-500/20 flex flex-col items-center justify-start py-2.5 px-2.5 gap-1.5 overflow-hidden"
                                    >
                                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                        <div className="w-3/4 h-1.5 self-start bg-slate-100 dark:bg-slate-800 rounded-full" />
                                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                        <div className="w-5/6 h-1.5 self-start bg-slate-100 dark:bg-slate-800 rounded-full" />

                                        {/* Scanning Line */}
                                        <motion.div
                                            animate={{ top: ["-10%", "110%"] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 w-full h-[2px] bg-purple-500 shadow-[0_0_8px_2px_rgba(139,92,246,0.5)] z-20"
                                        />
                                    </motion.div>
                                </div>

                                <div className="text-center space-y-2">
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                                        Đang phân tích hồ sơ
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                        {progressText}
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full max-w-xs space-y-2">
                                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-purple-500 to-violet-400"
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
                                                className="text-purple-500 flex items-center gap-1"
                                            >
                                                <CheckCircle2 className="w-3 h-3" /> Hoàn thành
                                            </motion.span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── Error Phase ── */}
                        {phase === "error" && (
                            <div className="flex flex-col items-center py-10 space-y-6">
                                <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                                    <AlertCircle className="w-8 h-8 text-red-500" />
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                        Đã xảy ra lỗi
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                                        {errorMsg}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleRetry}
                                        className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                                    >
                                        Thử lại
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-2.5 rounded-xl bg-gray-800 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
                                    >
                                        Đóng
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Hidden file input – MUST be inside inner dialog to avoid backdrop click closing modal */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.docx"
                            onChange={handleFileChange}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
