"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Briefcase, Calendar, BrainCircuit, Sparkles, Bell } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { cn } from "@/shared/utils/cn";

interface MockEvent {
    readonly label: string;
    readonly icon: typeof Bell;
    readonly color: string;
    readonly bg: string;
    readonly fire: (toast: ReturnType<typeof useToastHelpers>) => void;
}

const MOCK_EVENTS: MockEvent[] = [
    {
        label: "Hồ sơ được xem",
        icon: Briefcase,
        color: "text-[#22c55e] dark:text-[#22c55e]",
        bg: "bg-[#22c55e]/10 dark:bg-[#22c55e]/20 hover:bg-[#22c55e]/15 dark:hover:bg-[#22c55e]/20 border-[#22c55e]/30 dark:border-[#22c55e]/30",
        fire: (t) => t.info("Hồ sơ đã được xem", "Nhà tuyển dụng FPT Software vừa xem hồ sơ của bạn."),
    },
    {
        label: "Mời phỏng vấn",
        icon: Calendar,
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700/50",
        fire: (t) => t.success("Lời mời phỏng vấn!", "VNG Corporation mời bạn phỏng vấn vòng Technical, 15/02 lúc 10:00 AM."),
    },
    {
        label: "AI phân tích xong",
        icon: BrainCircuit,
        color: "text-violet-600 dark:text-violet-400",
        bg: "bg-violet-50 dark:bg-violet-900/20 hover:bg-violet-100 dark:hover:bg-violet-900/30 border-violet-200 dark:border-violet-700/50",
        fire: (t) => t.info("AI đã phân tích CV", "Điểm phù hợp: 88% cho vị trí Fullstack Developer."),
    },
    {
        label: "Job mới phù hợp",
        icon: Sparkles,
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 border-amber-200 dark:border-amber-700/50",
        fire: (t) => t.warning("Việc làm mới phù hợp!", "Có 3 vị trí React Developer mới match với profile của bạn."),
    },
    {
        label: "Hồ sơ bị từ chối",
        icon: Bell,
        color: "text-rose-600 dark:text-rose-400",
        bg: "bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/30 border-rose-200 dark:border-rose-700/50",
        fire: (t) => t.error("Hồ sơ bị từ chối", "Rất tiếc, hồ sơ tại Shopee không phù hợp lần này."),
    },
];

export function RealtimeEventTrigger() {
    const toast = useToastHelpers();
    const [lastFired, setLastFired] = useState<string | null>(null);

    const handleFire = (event: MockEvent) => {
        event.fire(toast);
        setLastFired(event.label);
        setTimeout(() => setLastFired(null), 1500);
    };

    return (
        <div className="bg-white dark:bg-[#1C252E] rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-[#1C252E] dark:text-white">
                        Mô phỏng Realtime Events
                    </h3>
                    <p className="text-xs text-[#919EAB] dark:text-[#637381]">
                        Bấm nút để kích hoạt toast notification
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MOCK_EVENTS.map((event) => {
                    const Icon = event.icon;
                    const isFired = lastFired === event.label;

                    return (
                        <Button
                            key={event.label}
                            variant="ghost"
                            onClick={() => handleFire(event)}
                            className={cn(
                                "relative h-auto py-3 px-3 rounded-xl border justify-start gap-2.5 cursor-pointer",
                                "transition-all duration-200 hover:scale-[1.02] hover:shadow-md",
                                event.bg
                            )}
                        >
                            <Icon className={cn("w-4 h-4 shrink-0", event.color)} />
                            <span className="text-xs font-medium text-[#637381] dark:text-[#C4CDD5] text-left">
                                {event.label}
                            </span>

                            <AnimatePresence>
                                {isFired && (
                                    <motion.span
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="absolute right-2 text-[10px] text-emerald-500 font-bold"
                                    >
                                        ✓ Sent
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}

