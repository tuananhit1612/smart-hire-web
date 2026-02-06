// src/features/employer/components/score-breakdown.tsx
"use client";

import { motion } from "framer-motion";
import { AIAnalysis } from "../types/mock-applicants";

interface ScoreBreakdownProps {
    breakdown: AIAnalysis["breakdown"];
}

export function ScoreBreakdown({ breakdown }: ScoreBreakdownProps) {
    const getColor = (score: number) => {
        if (score >= 80) return "bg-green-500";
        if (score >= 50) return "bg-amber-500";
        return "bg-red-500";
    };

    const items = [
        { label: "Độ hợp Kỹ năng", score: breakdown.skillMatch },
        { label: "Kinh nghiệm", score: breakdown.experienceMatch },
        { label: "Độ hợp văn hóa", score: breakdown.semanticMatch },
    ];

    return (
        <div className="space-y-3 mt-6 pt-6 border-t border-slate-100">
            {items.map((item, index) => (
                <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-600">
                        <span>{item.label}</span>
                        <span>{item.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                            className={`h-full rounded-full ${getColor(item.score)}`}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
