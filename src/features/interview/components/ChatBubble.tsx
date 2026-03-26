"use client";

import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import type { ChatMessage, QuestionCategory } from "../types/interview-ui-types";
import { CATEGORY_LABELS } from "../types/interview-ui-types";

// ─── Typing Indicator ────────────────────────────────

export function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-end gap-2.5 max-w-[85%]"
        >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center shrink-0 shadow-sm">
                <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white dark:bg-[#1C252E] border border-slate-100 dark:border-white/[0.08] rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
                <div className="flex items-center gap-1.5">
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                        className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"
                    />
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                        className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"
                    />
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                        className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"
                    />
                </div>
            </div>
        </motion.div>
    );
}

// ─── Chat Bubble ─────────────────────────────────────

interface ChatBubbleProps {
    readonly message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
    const isAI = message.role === "ai";

    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn("flex items-end gap-3 max-w-[85%]", !isAI && "ml-auto flex-row-reverse")}
        >
            {/* Avatar */}
            {isAI && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center shrink-0 shadow-sm">
                    <BrainCircuit className="w-5 h-5 text-white" />
                </div>
            )}

            <div className="space-y-1.5">
                {/* Category Badge */}
                {isAI && message.category && (
                    <span
                        className={cn(
                            "inline-block px-3 py-1 rounded-full text-sm font-semibold",
                            CATEGORY_LABELS[message.category].color
                        )}
                    >
                        {CATEGORY_LABELS[message.category].label}
                    </span>
                )}

                {/* Bubble */}
                <div
                    className={cn(
                        "px-5 py-4 text-lg leading-relaxed",
                        isAI
                            ? "bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] rounded-2xl rounded-bl-md shadow-sm text-[#1C252E] dark:text-white"
                            : "bg-[#22c55e] text-white rounded-2xl rounded-br-md shadow-lg shadow-[#22c55e]/20"
                    )}
                >
                    {message.content}
                </div>

                {/* Time */}
                <p className={cn("text-sm text-slate-300 dark:text-[#637381] px-1 mt-1", !isAI && "text-right")}>
                    {message.timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                </p>
            </div>
        </motion.div>
    );
}
