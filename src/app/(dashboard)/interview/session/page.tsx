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
    introduction: { label: "Giới thiệu", color: "bg-green- dark:bg-green-/30 text-green- dark:text-green-" },
    technical: { label: "Kỹ thuật", color: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400" },
    behavioral: { label: "Hành vi", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" },
    situational: { label: "Tình huống", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" },
    closing: { label: "Kết thúc", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400" },
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green- to-emerald-600 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white dark:bg-[#1C252E] border border-slate-100 dark:border-white/[0.08] rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
                <div className="flex items-center gap-1.5">
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                        className="w-2.5 h-2.5 rounded-full bg-green-"
                    />
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                        className="w-2.5 h-2.5 rounded-full bg-green-"
                    />
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                        className="w-2.5 h-2.5 rounded-full bg-green-"
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
            className={cn("flex items-end gap-3 max-w-[85%]", !isAI && "ml-auto flex-row-reverse")}
        >
            {/* Avatar */}
            {isAI && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green- to-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
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
                            ? "bg-white dark:bg-[#1C252E] border border-slate-100 dark:border-white/[0.08] rounded-2xl rounded-bl-md shadow-sm text-slate-700 dark:text-[#C4CDD5]"
                            : "bg-green- text-white rounded-2xl rounded-br-md shadow-lg shadow-green-/20"
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
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-[#141A21]/90 backdrop-blur-xl border-b border-slate-100 dark:border-white/[0.08]">
                <div className="mx-auto max-w-3xl px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <Link
                                href="/interview/setup"
                                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] flex items-center justify-center transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-[#C4CDD5]" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-green- dark:text-white flex items-center gap-2">
                                    <BrainCircuit className="w-6 h-6 text-green- dark:text-green-" />
                                    AI Interview
                                </h1>
                                <p className="text-sm text-slate-400 dark:text-[#637381]">
                                    Câu {Math.min(currentQIndex + 1, mockInterviewQuestions.length)}/{mockInterviewQuestions.length}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-base text-slate-400 dark:text-[#637381]">
                                <Clock className="w-4 h-4" />
                                <span>{messages.filter((m) => m.role === "user").length} trả lời</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-base text-slate-400 dark:text-[#637381]">
                                <MessageSquare className="w-4 h-4" />
                                <span>{progress}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 bg-slate-100 dark:bg-white/[0.06] rounded-full -mt-0.5 mb-0.5 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-green- to-emerald-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 space-y-4">
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
                            className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl p-6 mt-4"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400">Phỏng vấn hoàn tất!</h3>
                            </div>
                            <p className="text-base text-emerald-600 dark:text-emerald-400/80 mb-4">
                                Bạn đã trả lời {messages.filter((m) => m.role === "user").length} câu hỏi.
                                Kết quả đánh giá sẽ có sẵn trong phần Kết quả phỏng vấn.
                            </p>
                            <div className="flex gap-2">
                                <Link href="/interview/setup">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-full text-base px-5 py-2 cursor-pointer"
                                    >
                                        Phỏng vấn lại
                                    </Button>
                                </Link>
                                <Button
                                    size="sm"
                                    className="rounded-full text-base px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
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
                        className="bg-amber-50 dark:bg-amber-900/10 border-t border-amber-100 dark:border-amber-800/30"
                    >
                        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-2.5 flex items-start gap-2">
                            <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                            <p className="text-base text-amber-700 dark:text-amber-400">{currentQuestion.hint}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="sticky bottom-0 bg-white/90 dark:bg-[#141A21]/90 backdrop-blur-xl border-t border-slate-100 dark:border-white/[0.08]">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4">
                    {!isComplete ? (
                        <div className="flex items-end gap-3">
                            {/* Hint Toggle */}
                            {currentQuestion?.hint && (
                                <button
                                    onClick={() => setShowHint(!showHint)}
                                    className={cn(
                                        "w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer",
                                        showHint
                                            ? "bg-amber-100 text-amber-600"
                                            : "bg-slate-100 dark:bg-white/[0.06] text-slate-400 dark:text-[#637381] hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-500"
                                    )}
                                    title="Xem gợi ý"
                                >
                                    <Lightbulb className="w-5 h-5" />
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
                                        "w-full resize-none rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#1C252E] px-5 py-3.5 pr-14",
                                        "text-lg text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#637381]",
                                        "focus:outline-none focus:ring-2 focus:ring-green-/30 focus:border-green-",
                                        "transition-all max-h-32",
                                        "disabled:opacity-50"
                                    )}
                                    style={{ minHeight: "52px" }}
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
                                        "absolute right-2.5 bottom-2 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer",
                                        input.trim() && !isTyping
                                            ? "bg-green- text-white shadow-md shadow-green-/20 hover:bg-green- hover:scale-105"
                                            : "bg-slate-200 dark:bg-white/[0.06] text-slate-400 dark:text-[#637381] cursor-not-allowed"
                                    )}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-base text-slate-400 dark:text-[#637381] py-1">
                            Buổi phỏng vấn đã kết thúc.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
