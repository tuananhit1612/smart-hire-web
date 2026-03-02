"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AIQuestion } from "../types/profile";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormTextarea, SaveButton, SectionCard } from "./profile-form-fields";

interface Props {
    questions?: AIQuestion[];
}

function QuestionItem({ question, index }: { question: AIQuestion; index: number }) {
    const [open, setOpen] = useState(false);
    const hasAnswer = !!question.answer;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-xl overflow-hidden transition-all hover:border-[rgba(145,158,171,0.32)] dark:hover:border-white/[0.12]"
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-start gap-4 p-5 text-left"
            >
                {/* Number badge */}
                <span className="w-7 h-7 shrink-0 rounded-lg bg-[#22C55E]/10 flex items-center justify-center text-[12px] font-bold text-[#22C55E]">
                    {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                    <p className={cn(
                        "text-[14px] leading-relaxed",
                        hasAnswer
                            ? "font-semibold text-[#1C252E] dark:text-white"
                            : "font-medium text-[#637381] dark:text-[#C4CDD5]"
                    )}>
                        {question.question}
                    </p>
                </div>
                <ChevronDown className={cn(
                    "w-5 h-5 shrink-0 text-[#919EAB] transition-transform mt-0.5",
                    open && "rotate-180"
                )} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 -mt-1">
                            {hasAnswer ? (
                                <div className="bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] rounded-xl p-4">
                                    <p className="text-[14px] text-[#637381] dark:text-[#C4CDD5] leading-relaxed">{question.answer}</p>
                                </div>
                            ) : (
                                <FormTextarea
                                    placeholder="Nhập câu trả lời của bạn..."
                                    rows={4}
                                />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function ProfileTabQuestions({ questions }: Props) {
    return (
        <div className="space-y-6">
            <SectionCard>
                <h3 className="text-lg font-bold text-[#1C252E] dark:text-white mb-2">Câu hỏi cá nhân hóa</h3>
                <p className="text-[13px] text-[#919EAB] mb-6 leading-relaxed">
                    Trả lời các câu hỏi dưới đây để AI SmartHire hiểu bạn tốt hơn và gợi ý công việc chính xác hơn.
                </p>

                <div className="space-y-3">
                    {questions && questions.length > 0 ? (
                        questions.map((q, i) => (
                            <QuestionItem key={q.id} question={q} index={i} />
                        ))
                    ) : (
                        <p className="text-[14px] text-[#919EAB] italic">Chưa có câu hỏi nào</p>
                    )}
                </div>
            </SectionCard>

            <SaveButton />
        </div>
    );
}
