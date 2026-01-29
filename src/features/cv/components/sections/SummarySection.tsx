"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface SummarySectionProps {
    data: string;
    onChange: (data: string) => void;
}

const MAX_CHARACTERS = 500;

export function SummarySection({ data, onChange }: SummarySectionProps) {
    const characterCount = data.length;
    const isOverLimit = characterCount > MAX_CHARACTERS;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Section Header */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2 md:gap-3">
                    <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex-shrink-0">
                        <FileText className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span>Giới thiệu bản thân</span>
                </h2>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
                    Tóm tắt ngắn gọn về kinh nghiệm, mục tiêu nghề nghiệp và điểm mạnh của bạn
                </p>
            </div>

            {/* AI Suggestion Button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Sparkles className="w-4 h-4" />}
                    className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20 hover:border-indigo-500/40 w-fit"
                >
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-medium">
                        Gợi ý bằng AI
                    </span>
                </Button>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                    Tự động tạo mô tả dựa trên thông tin CV
                </span>
            </div>

            {/* Textarea */}
            <div className="relative">
                <textarea
                    value={data}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Ví dụ: Là một Full-stack Developer với 3 năm kinh nghiệm, tôi chuyên về xây dựng ứng dụng web với React và Node.js. Tôi đam mê tạo ra các sản phẩm có trải nghiệm người dùng tuyệt vời và luôn tìm kiếm cơ hội để học hỏi công nghệ mới..."
                    rows={6}
                    className="w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-zinc-900/50 dark:text-white transition-all duration-200 resize-none"
                />

                {/* Character Counter */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <span
                        className={`text-xs font-medium ${isOverLimit
                            ? "text-red-500"
                            : characterCount > MAX_CHARACTERS * 0.8
                                ? "text-amber-500"
                                : "text-gray-400"
                            }`}
                    >
                        {characterCount}/{MAX_CHARACTERS}
                    </span>
                </div>
            </div>

            {/* Tips */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-xl p-4">
                <h4 className="text-sm font-medium text-indigo-900 dark:text-indigo-300 mb-2">
                    💡 Mẹo viết phần giới thiệu hiệu quả
                </h4>
                <ul className="text-xs text-indigo-700 dark:text-indigo-400 space-y-1">
                    <li>• Bắt đầu bằng vai trò và số năm kinh nghiệm</li>
                    <li>• Nêu rõ kỹ năng/công nghệ chính bạn sử dụng</li>
                    <li>• Đề cập đến thành tựu nổi bật (nếu có)</li>
                    <li>• Chia sẻ mục tiêu nghề nghiệp ngắn hạn</li>
                </ul>
            </div>
        </motion.div>
    );
}
