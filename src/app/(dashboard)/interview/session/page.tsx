"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BrainCircuit,
    Send,
    Lightbulb,
    Clock,
    MessageSquare,
    CheckCircle2,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";
import { mockInterviewQuestions, InterviewQuestion } from "@/features/interview/types/mock-questions";

// ─── Types ───────────────────────────────────────────
interface ChatMessage {
    id: string;
    role: "ai" | "user";
    content: string;
    timestamp: Date;
    category?: InterviewQuestion["category"];
}

// ─── Category Badge ──────────────────────────────────
const CATEGORY_LABELS: Record<InterviewQuestion["category"], { label: string; color: string }> = {
    introduction: { label: "Giới thiệu", color: "bg-sky-100 text-sky-700" },
    technical: { label: "Kỹ thuật", color: "bg-violet-100 text-violet-700" },
    behavioral: { label: "Hành vi", color: "bg-amber-100 text-amber-700" },
    situational: { label: "Tình huống", color: "bg-emerald-100 text-emerald-700" },
    closing: { label: "Kết thúc", color: "bg-rose-100 text-rose-700" },
};

// ─── Typing Indicator ────────────────────────────────
function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-end gap-2.5 max-w-[85%]"
        >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 rounded-full bg-sky-400"
                    />
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-sky-400"
                    />
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-sky-400"
                    />
                </div>
            </div>
        </motion.div>
    );
}

// ─── Chat Bubble ─────────────────────────────────────
function ChatBubble({ message }: { readonly message: ChatMessage }) {
    const isAI = message.role === "ai";

    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn("flex items-end gap-2.5 max-w-[85%]", !isAI && "ml-auto flex-row-reverse")}
        >
            {/* Avatar */}
            {isAI && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                    <BrainCircuit className="w-4 h-4 text-white" />
                </div>
            )}

            <div className="space-y-1">
                {/* Category Badge */}
                {isAI && message.category && (
                    <span
                        className={cn(
                            "inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold",
                            CATEGORY_LABELS[message.category].color
                        )}
                    >
                        {CATEGORY_LABELS[message.category].label}
                    </span>
                )}

                {/* Bubble */}
                <div
                    className={cn(
                        "px-4 py-3 text-sm leading-relaxed",
                        isAI
                            ? "bg-white border border-slate-100 rounded-2xl rounded-bl-md shadow-sm text-slate-700"
                            : "bg-sky-600 text-white rounded-2xl rounded-br-md shadow-lg shadow-sky-500/20"
                    )}
                >
                    {message.content}
                </div>

                {/* Time */}
                <p className={cn("text-[10px] text-slate-300 px-1", !isAI && "text-right")}>
                    {message.timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                </p>
            </div>
        </motion.div>
    );
}

// ─── Main Page ───────────────────────────────────────
export default function InterviewSessionPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const currentQuestion = useMemo(
        () => mockInterviewQuestions[currentQIndex] ?? null,
        [currentQIndex]
    );

    const progress = useMemo(
        () => Math.round((currentQIndex / mockInterviewQuestions.length) * 100),
        [currentQIndex]
    );

    // Auto-scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Push AI question as a chat message with typing delay
    const pushAIQuestion = useCallback(
        (question: InterviewQuestion) => {
            setIsTyping(true);
            setShowHint(false);

            const delay = 800 + Math.random() * 800;
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `ai-${question.id}`,
                        role: "ai",
                        content: question.question,
                        timestamp: new Date(),
                        category: question.category,
                    },
                ]);
                setIsTyping(false);
                inputRef.current?.focus();
            }, delay);
        },
        []
    );

    // Send first question on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            pushAIQuestion(mockInterviewQuestions[0]);
        }, 600);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed || isTyping || isComplete) return;

        // Add user message
        setMessages((prev) => [
            ...prev,
            {
                id: `user-${Date.now()}`,
                role: "user",
                content: trimmed,
                timestamp: new Date(),
            },
        ]);
        setInput("");

        // Move to next question
        const nextIndex = currentQIndex + 1;
        if (nextIndex < mockInterviewQuestions.length) {
            setCurrentQIndex(nextIndex);
            pushAIQuestion(mockInterviewQuestions[nextIndex]);
        } else {
            // Interview complete
            setIsTyping(true);
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: "ai-complete",
                        role: "ai",
                        content:
                            "Buổi phỏng vấn đã kết thúc! Cảm ơn bạn đã tham gia. AI đang phân tích câu trả lời của bạn và sẽ đưa ra đánh giá chi tiết. 🎉",
                        timestamp: new Date(),
                        category: "closing",
                    },
                ]);
                setIsTyping(false);
                setIsComplete(true);
            }, 1200);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <section className="relative z-10 flex flex-col h-screen">
            {/* Top Bar */}
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-slate-100">
                <div className="mx-auto max-w-2xl px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14">
                        <div className="flex items-center gap-3">
                            <Link
                                href="/interview/setup"
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 text-slate-600" />
                            </Link>
                            <div>
                                <h1 className="text-sm font-bold text-sky-900 flex items-center gap-1.5">
                                    <BrainCircuit className="w-4 h-4 text-sky-600" />
                                    AI Interview
                                </h1>
                                <p className="text-[10px] text-slate-400">
                                    Câu {Math.min(currentQIndex + 1, mockInterviewQuestions.length)}/{mockInterviewQuestions.length}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{messages.filter((m) => m.role === "user").length} trả lời</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>{progress}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1 bg-slate-100 rounded-full -mt-0.5 mb-0.5 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 space-y-4">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <ChatBubble key={msg.id} message={msg} />
                        ))}
                    </AnimatePresence>

                    {isTyping && <TypingIndicator />}

                    {/* Completion Card */}
                    {isComplete && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 rounded-2xl p-5 mt-4"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <h3 className="text-sm font-bold text-emerald-800">Phỏng vấn hoàn tất!</h3>
                            </div>
                            <p className="text-xs text-emerald-600 mb-4">
                                Bạn đã trả lời {messages.filter((m) => m.role === "user").length} câu hỏi.
                                Kết quả đánh giá sẽ có sẵn trong phần Kết quả phỏng vấn.
                            </p>
                            <div className="flex gap-2">
                                <Link href="/interview/setup">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-full text-xs cursor-pointer"
                                    >
                                        Phỏng vấn lại
                                    </Button>
                                </Link>
                                <Button
                                    size="sm"
                                    className="rounded-full text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                                >
                                    Xem đánh giá AI
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Hint Banner */}
            <AnimatePresence>
                {showHint && currentQuestion?.hint && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-amber-50 border-t border-amber-100"
                    >
                        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-2.5 flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                            <p className="text-xs text-amber-700">{currentQuestion.hint}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-slate-100">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 py-3">
                    {!isComplete ? (
                        <div className="flex items-end gap-2">
                            {/* Hint Toggle */}
                            {currentQuestion?.hint && (
                                <button
                                    onClick={() => setShowHint(!showHint)}
                                    className={cn(
                                        "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer",
                                        showHint
                                            ? "bg-amber-100 text-amber-600"
                                            : "bg-slate-100 text-slate-400 hover:bg-amber-50 hover:text-amber-500"
                                    )}
                                    title="Xem gợi ý"
                                >
                                    <Lightbulb className="w-4 h-4" />
                                </button>
                            )}

                            {/* Textarea */}
                            <div className="flex-1 relative">
                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={isTyping ? "AI đang suy nghĩ..." : "Nhập câu trả lời..."}
                                    disabled={isTyping}
                                    rows={1}
                                    className={cn(
                                        "w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-12",
                                        "text-sm text-slate-700 placeholder:text-slate-400",
                                        "focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400",
                                        "transition-all max-h-32",
                                        "disabled:opacity-50"
                                    )}
                                    style={{ minHeight: "40px" }}
                                    onInput={(e) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = "auto";
                                        target.style.height = Math.min(target.scrollHeight, 128) + "px";
                                    }}
                                />

                                {/* Send Button */}
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className={cn(
                                        "absolute right-2 bottom-1.5 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer",
                                        input.trim() && !isTyping
                                            ? "bg-sky-600 text-white shadow-md shadow-sky-500/20 hover:bg-sky-700 hover:scale-105"
                                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                    )}
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-xs text-slate-400 py-1">
                            Buổi phỏng vấn đã kết thúc.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
