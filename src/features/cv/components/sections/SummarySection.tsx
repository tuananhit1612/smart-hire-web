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
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-sky-900 flex items-center gap-2 md:gap-3">
                    <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-r from-sky-500 to-green-500 text-white flex-shrink-0 shadow-lg shadow-sky-500/20">
                        <FileText className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span>Giới thiệu bản thân</span>
                </h2>
                <p className="text-sm md:text-base text-gray-500 mt-2">
                    Tóm tắt ngắn gọn về kinh nghiệm, mục tiêu nghề nghiệp và điểm mạnh của bạn
                </p>
            </div>

            {/* AI Suggestion Button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Sparkles className="w-4 h-4" />}
                    className="bg-gradient-to-r from-sky-500/10 to-green-500/10 border-sky-500/20 hover:border-sky-500/40 w-fit"
                >
                    <span className="bg-gradient-to-r from-sky-600 to-green-600 bg-clip-text text-transparent font-medium">
                        Gợi ý bằng AI
                    </span>
                </Button>
                <span className="text-xs text-gray-500">
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
                    className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 resize-none hover:border-sky-200"
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
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
                <h4 className="text-sm font-medium text-sky-900 mb-2">
                    💡 Mẹo viết phần giới thiệu hiệu quả
                </h4>
                <ul className="text-xs text-sky-700 space-y-1">
                    <li>• Bắt đầu bằng vai trò và số năm kinh nghiệm</li>
                    <li>• Nêu rõ kỹ năng/công nghệ chính bạn sử dụng</li>
                    <li>• Đề cập đến thành tựu nổi bật (nếu có)</li>
                    <li>• Chia sẻ mục tiêu nghề nghiệp ngắn hạn</li>
                </ul>
            </div>
        </motion.div>
    );
}
