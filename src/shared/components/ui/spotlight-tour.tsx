"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

// Mascot SVG Component - Cute robot guide
// (Moved to bottom to avoid clutter)

interface TourStep {
    id: string;
    targetId: string;
    title: string;
    description: string;
    position: "top" | "bottom" | "left" | "right" | "center";
    mascotMood?: "wave" | "point" | "happy";
}

const TOUR_STEPS: TourStep[] = [
    {
        id: "welcome",
        targetId: "",
        title: "Chào mừng đến CV Builder! 👋",
        description: "Mình là Robo - sẽ hướng dẫn bạn sử dụng CV Builder để tạo CV chuyên nghiệp!",
        position: "center",
        mascotMood: "wave",
    },
    {
        id: "header",
        targetId: "cv-builder-header",
        title: "Thanh công cụ 🛠️",
        description: "Quản lý file CV, lưu trữ và các tùy chọn hiển thị nằm ở đây.",
        position: "bottom",
        mascotMood: "point",
    },
    {
        id: "sidebar",
        targetId: "cv-section-nav",
        title: "Menu điều hướng 📋",
        description: "Click vào các mục này để chuyển giữa 6 phần: Thông tin, Giới thiệu, Học vấn, Kinh nghiệm, Kỹ năng, Dự án.",
        position: "right",
        mascotMood: "point",
    },
    {
        id: "form",
        targetId: "cv-builder-form",
        title: "Form nhập liệu ✏️",
        description: "Đây là nơi bạn điền thông tin cho CV. Mỗi section có các trường khác nhau.",
        position: "left",
        mascotMood: "happy",
    },
    {
        id: "autosave",
        targetId: "autosave-indicator",
        title: "Tự động lưu 💾",
        description: "Mọi thay đổi sẽ được tự động lưu sau 3 giây. Bạn không cần lo mất dữ liệu!",
        position: "bottom",
        mascotMood: "happy",
    },
    {
        id: "preview",
        targetId: "cv-preview-panel",
        title: "Bản xem trước 📄",
        description: "CV của bạn sẽ hiển thị ở đây theo thời gian thực. Thanh tiến độ cho biết % hoàn thành!",
        position: "left",
        mascotMood: "happy",
    },
    {
        id: "finish",
        targetId: "",
        title: "Sẵn sàng tạo CV! 🎉",
        description: "Giờ thì bạn đã biết cách sử dụng rồi. Hãy bắt đầu điền thông tin và tạo CV chuyên nghiệp nhé!",
        position: "center",
        mascotMood: "wave",
    },
];

const STORAGE_KEY = "cv-builder-tour-v2-completed";

interface SpotlightPosition {
    top: number;
    left: number;
    width: number;
    height: number;
}

export function SpotlightTour() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentStep, setCurrentStep] = React.useState(0);
    const [spotlightPos, setSpotlightPos] = React.useState<SpotlightPosition | null>(null);

    React.useEffect(() => {
        const hasCompleted = localStorage.getItem(STORAGE_KEY);
        if (!hasCompleted) {
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    // Lock body scroll when tour is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    React.useEffect(() => {
        if (!isOpen) return;

        const step = TOUR_STEPS[currentStep];

        if (step.position === "center" || !step.targetId) {
            setSpotlightPos(null);
            return;
        }

        const element = document.getElementById(step.targetId);
        if (element) {
            // Simple scroll to element to ensure it's in view
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            const rect = element.getBoundingClientRect();
            const padding = 8;
            setSpotlightPos({
                top: rect.top - padding,
                left: rect.left - padding,
                width: rect.width + padding * 2,
                height: rect.height + padding * 2,
            });
        } else {
            setSpotlightPos(null);
        }
    }, [currentStep, isOpen]);

    const handleNext = () => {
        if (currentStep < TOUR_STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        localStorage.setItem(STORAGE_KEY, "true");
        setIsOpen(false);
    };

    const currentTourStep = TOUR_STEPS[currentStep];
    const isLastStep = currentStep === TOUR_STEPS.length - 1;
    const isFirstStep = currentStep === 0;
    const isCentered = currentTourStep.position === "center" || !currentTourStep.targetId;

    // Calculate tooltip position relative to spotlight
    const getTooltipStyle = (): React.CSSProperties => {
        if (!spotlightPos) {
            return {};
        }

        const tooltipWidth = 320;
        const tooltipHeight = 220;
        const gap = 16;

        let top = 0;
        let left = 0;

        switch (currentTourStep.position) {
            case "right":
                top = spotlightPos.top + spotlightPos.height / 2 - tooltipHeight / 2;
                left = spotlightPos.left + spotlightPos.width + gap;
                if (left + tooltipWidth > window.innerWidth - 20) {
                    left = spotlightPos.left - tooltipWidth - gap;
                }
                break;
            case "left":
                top = spotlightPos.top + spotlightPos.height / 2 - tooltipHeight / 2;
                left = spotlightPos.left - tooltipWidth - gap;
                if (left < 20) {
                    left = spotlightPos.left + spotlightPos.width + gap;
                }
                break;
            case "bottom":
                top = spotlightPos.top + spotlightPos.height + gap;
                left = spotlightPos.left + spotlightPos.width / 2 - tooltipWidth / 2;
                break;
            case "top":
                top = spotlightPos.top - tooltipHeight - gap;
                left = spotlightPos.left + spotlightPos.width / 2 - tooltipWidth / 2;
                break;
        }

        top = Math.max(20, Math.min(top, window.innerHeight - tooltipHeight - 20));
        left = Math.max(20, Math.min(left, window.innerWidth - tooltipWidth - 20));

        return { top, left };
    };

    const tooltipProps = {
        currentTourStep,
        currentStep,
        isFirstStep,
        isLastStep,
        onPrev: handlePrev,
        onNext: handleNext
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Dark overlay - only shown when centered (no spotlight) */}
                    {isCentered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/70"
                            onClick={handleComplete}
                        />
                    )}

                    {/* Spotlight cutout (if not centered) */}
                    {spotlightPos && !isCentered && (
                        <>
                            {/* Transparent cutout - creates dark area around */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    top: spotlightPos.top,
                                    left: spotlightPos.left,
                                    width: spotlightPos.width,
                                    height: spotlightPos.height,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed z-[101] rounded-xl pointer-events-none"
                                style={{
                                    boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7)",
                                }}
                            />
                            {/* Border highlight */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    top: spotlightPos.top - 4,
                                    left: spotlightPos.left - 4,
                                    width: spotlightPos.width + 8,
                                    height: spotlightPos.height + 8,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed z-[100] rounded-xl pointer-events-none"
                                style={{
                                    border: "3px solid rgba(99, 102, 241, 1)",
                                    boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
                                }}
                            />
                        </>
                    )}

                    {/* Tooltip - Centered for welcome/finish steps */}
                    {isCentered ? (
                        <div className="fixed inset-0 z-[102] flex items-center justify-center pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="w-80 pointer-events-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <TooltipContent {...tooltipProps} />
                            </motion.div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            style={getTooltipStyle()}
                            className="fixed z-[102] w-80"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <TooltipContent {...tooltipProps} />
                        </motion.div>
                    )}
                </>
            )}
        </AnimatePresence>
    );
}

// Separate component needed because we used Mascot in header now
function MascotGuide({ isWaving = false }: { isWaving?: boolean }) {
    return (
        <motion.div
            animate={isWaving ? { rotate: [0, -5, 5, -5, 0] } : {}}
            transition={{ duration: 0.5, repeat: isWaving ? Infinity : 0, repeatDelay: 2 }}
            className="relative scale-90"
        >
            <svg width="70" height="70" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Body */}
                <rect x="20" y="30" width="40" height="35" rx="8" fill="url(#bodyGradient)" />
                {/* Head */}
                <rect x="15" y="8" width="50" height="28" rx="10" fill="url(#headGradient)" />
                {/* Eyes */}
                <circle cx="30" cy="20" r="6" fill="white" />
                <circle cx="50" cy="20" r="6" fill="white" />
                <motion.circle
                    cx="30" cy="20" r="3" fill="#0f172a"
                    animate={{ y: [0, -1, 0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle
                    cx="50" cy="20" r="3" fill="#0f172a"
                    animate={{ y: [0, -1, 0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Smile */}
                <path d="M32 28 Q40 34 48 28" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Antenna */}
                <line x1="40" y1="8" x2="40" y2="2" stroke="url(#antennaGradient)" strokeWidth="3" strokeLinecap="round" />
                <motion.circle
                    cx="40" cy="2" r="4" fill="#fbbf24"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                {/* Arms */}
                <motion.rect
                    x="8" y="35" width="12" height="8" rx="4" fill="url(#bodyGradient)"
                    animate={isWaving ? { rotate: [0, 20, 0] } : {}}
                    style={{ originX: 1, originY: 0.5 }}
                    transition={{ duration: 0.5, repeat: isWaving ? Infinity : 0 }}
                />
                <rect x="60" y="35" width="12" height="8" rx="4" fill="url(#bodyGradient)" />
                {/* Legs */}
                <rect x="25" y="65" width="10" height="10" rx="3" fill="url(#bodyGradient)" />
                <rect x="45" y="65" width="10" height="10" rx="3" fill="url(#bodyGradient)" />
                {/* Chest light */}
                <motion.circle
                    cx="40" cy="47" r="5" fill="#38bdf8"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <defs>
                    <linearGradient id="headGradient" x1="15" y1="8" x2="65" y2="36">
                        <stop stopColor="#0284c7" />
                        <stop offset="1" stopColor="#0ea5e9" />
                    </linearGradient>
                    <linearGradient id="bodyGradient" x1="20" y1="30" x2="60" y2="65">
                        <stop stopColor="#0369a1" />
                        <stop offset="1" stopColor="#0ea5e9" />
                    </linearGradient>
                    <linearGradient id="antennaGradient" x1="40" y1="8" x2="40" y2="2">
                        <stop stopColor="#0369a1" />
                        <stop offset="1" stopColor="#fbbf24" />
                    </linearGradient>
                </defs>
            </svg>
        </motion.div>
    );
}

export function useSpotlightTour() {
    const resetTour = () => {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
    };
    return { resetTour };
}

interface TooltipContentProps {
    currentTourStep: TourStep;
    currentStep: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    onPrev: () => void;
    onNext: () => void;
}

function TooltipContent({
    currentTourStep,
    currentStep,
    isFirstStep,
    isLastStep,
    onPrev,
    onNext
}: TooltipContentProps) {
    return (
        <>
            {/* Mascot */}
            <div className="flex justify-center mb-2">
                <MascotGuide isWaving={currentTourStep.mascotMood === "wave"} />
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Content */}
                <div className="p-5">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {currentTourStep.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {currentTourStep.description}
                        </p>
                    </motion.div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 bg-gray-50 flex items-center justify-between border-t border-gray-200">
                    {/* Progress dots */}
                    <div className="flex items-center gap-1.5">
                        {TOUR_STEPS.map((_, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "h-2 rounded-full transition-all",
                                    index === currentStep
                                        ? "w-5 bg-[#22c55e]"
                                        : index < currentStep
                                            ? "w-2 bg-[rgba(145,158,171,0.04)]"
                                            : "w-2 bg-gray-300"
                                )}
                            />
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-2">
                        {!isFirstStep && (
                            <button
                                onClick={onPrev}
                                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-600" />
                            </button>
                        )}
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={onNext}
                            rightIcon={!isLastStep ? <ChevronRight className="w-4 h-4" /> : undefined}
                            className="bg-[#22c55e] hover:bg-[#22c55e] text-white border-none shadow-lg shadow-green-500/20"
                        >
                            {isLastStep ? "Bắt đầu ngay!" : "Tiếp theo"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

