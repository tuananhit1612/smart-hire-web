"use client";

import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { MockCVData } from "./step-activation";
import { Input } from "@/shared/components/ui/input";

interface StepVerifyCVProps {
    cvData: MockCVData;
    onNext: () => void;
    onBack: () => void;
}

export function StepVerifyCV({ cvData, onNext, onBack }: StepVerifyCVProps) {
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

            <div className="w-full max-w-3xl bg-white dark:bg-[#1C252E] border border-slate-200 dark:border-[rgba(145,158,171,0.24)] rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Thông tin cá nhân</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                            Tên
                        </label>
                        <Input defaultValue={cvData.firstName} className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" />
                    </div>
                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                            Họ
                        </label>
                        <Input defaultValue={cvData.lastName} className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" />
                    </div>
                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                            Số điện thoại
                        </label>
                        <Input defaultValue={cvData.phone} className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500 pl-4" />
                    </div>
                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                            Email ứng tuyển
                        </label>
                        <Input defaultValue={cvData.email} className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" />
                    </div>
                    <div className="space-y-2 relative md:col-span-2">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                            Linkedin
                        </label>
                        <Input defaultValue={cvData.linkedin} className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" />
                    </div>
                    <div className="space-y-2 relative md:col-span-2">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                            Trang web cá nhân
                        </label>
                        <Input defaultValue={cvData.website} className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" />
                    </div>
                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                            Quốc gia
                        </label>
                        <Input defaultValue={cvData.country} className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" />
                    </div>
                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                            Tiểu bang/vùng
                        </label>
                        <Input defaultValue={cvData.state} className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" />
                    </div>
                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                            Thành phố
                        </label>
                        <Input defaultValue={cvData.city} className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" />
                    </div>
                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 absolute -top-2 left-3 bg-white dark:bg-[#1C252E] px-1 z-10">
                            Giới tính
                        </label>
                        <Input defaultValue={cvData.gender} className="h-12 bg-transparent dark:border-[rgba(145,158,171,0.24)] focus-visible:ring-emerald-500" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 w-full max-w-3xl mt-4">
                <Button
                    onClick={onBack}
                    variant="ghost"
                    size="lg"
                    className="rounded-xl px-8 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    Mặt sau
                </Button>
                <Button
                    onClick={onNext}
                    size="lg"
                    className="rounded-xl px-8 shadow-[0_8px_16px_rgba(118,53,220,0.24)] bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold"
                >
                    Trông rất tốt, tiếp tục nhé!
                </Button>
            </div>
        </motion.div>
    );
}
