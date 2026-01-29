"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Sparkles, GripVertical, Calendar, Save, Eye, Lightbulb } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface TourStep {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    position?: "center" | "top" | "bottom";
}

const TOUR_STEPS: TourStep[] = [
    {
        id: "welcome",
        title: "Chào mừng đến CV Builder! 🎉",
        description: "Công cụ giúp bạn tạo CV chuyên nghiệp theo chuẩn ATS chỉ trong vài phút. Hãy cùng khám phá các tính năng chính!",
        icon: <Sparkles className="w-8 h-8" />,
        position: "center",
    },
    {
        id: "sections",
        title: "6 Phần CV quan trọng",
        description: "CV của bạn được chia thành 6 phần: Thông tin cá nhân, Giới thiệu, Học vấn, Kinh nghiệm, Kỹ năng, và Dự án. Click vào menu bên trái để chuyển đổi giữa các phần.",
        icon: <Lightbulb className="w-8 h-8" />,
    },
    {
        id: "drag-drop",
        title: "Kéo thả để sắp xếp",
        description: "Trong các phần Học vấn, Kinh nghiệm, Dự án - bạn có thể kéo thả icon ⋮⋮ để sắp xếp lại thứ tự hiển thị theo ý muốn.",
        icon: <GripVertical className="w-8 h-8" />,
    },
    {
        id: "date-picker",
        title: "Chọn ngày dễ dàng",
        description: "Click vào các ô ngày tháng để mở bộ chọn tháng/năm trực quan. Không cần nhập tay, chỉ cần click để chọn!",
        icon: <Calendar className="w-8 h-8" />,
    },
    {
        id: "autosave",
        title: "Tự động lưu",
        description: "Mọi thay đổi sẽ được tự động lưu sau 3 giây. Bạn sẽ thấy chỉ báo 'Đã lưu' ở góc trên bên phải. Không lo mất dữ liệu!",
        icon: <Save className="w-8 h-8" />,
    },
    {
        id: "preview",
        title: "Xem trước CV",
        description: "Nhấn nút 'Xem trước' để xem CV của bạn sẽ trông như thế nào. Panel bên phải cũng hiển thị tiến độ hoàn thành CV.",
        icon: <Eye className="w-8 h-8" />,
    },
];

const STORAGE_KEY = "cv-builder-onboarding-completed";

interface OnboardingTourProps {
    onComplete?: () => void;
}

export function OnboardingTour({ onComplete }: OnboardingTourProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentStep, setCurrentStep] = React.useState(0);

    // Check if user has seen the tour before
    React.useEffect(() => {
        const hasCompleted = localStorage.getItem(STORAGE_KEY);
        if (!hasCompleted) {
            // Delay a bit for page to load
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

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
        onComplete?.();
    };

    const handleSkip = () => {
        handleComplete();
    };

    const currentTourStep = TOUR_STEPS[currentStep];
    const isLastStep = currentStep === TOUR_STEPS.length - 1;
    const isFirstStep = currentStep === 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Tour Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                    >
                        <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden">
                            {/* Gradient Header */}
                            <div className="relative h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                                {/* Animated background circles */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                                </div>

                                {/* Icon */}
                                <motion.div
                                    key={currentStep}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", duration: 0.5 }}
                                    className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white"
                                >
                                    {currentTourStep.icon}
                                </motion.div>

                                {/* Close button */}
                                <button
                                    onClick={handleSkip}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 pb-4">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">
                                        {currentTourStep.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                                        {currentTourStep.description}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Progress Dots */}
                            <div className="flex items-center justify-center gap-2 pb-4">
                                {TOUR_STEPS.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentStep(index)}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            index === currentStep
                                                ? "w-6 bg-gradient-to-r from-indigo-500 to-purple-500"
                                                : index < currentStep
                                                    ? "bg-indigo-300"
                                                    : "bg-gray-300 dark:bg-gray-600"
                                        )}
                                    />
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between p-4 pt-0 gap-3">
                                <button
                                    onClick={handleSkip}
                                    className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                >
                                    Bỏ qua
                                </button>

                                <div className="flex items-center gap-2">
                                    {!isFirstStep && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handlePrev}
                                            leftIcon={<ChevronLeft className="w-4 h-4" />}
                                        >
                                            Trước
                                        </Button>
                                    )}
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={handleNext}
                                        rightIcon={!isLastStep ? <ChevronRight className="w-4 h-4" /> : undefined}
                                    >
                                        {isLastStep ? "Bắt đầu ngay!" : "Tiếp theo"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Hook to manually trigger tour
export function useOnboardingTour() {
    const resetTour = () => {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
    };

    return { resetTour };
}
