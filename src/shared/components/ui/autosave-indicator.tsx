"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, CloudOff, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface AutosaveIndicatorProps {
    status: SaveStatus;
    lastSaved?: Date | null;
    className?: string;
}

export function AutosaveIndicator({
    status,
    lastSaved,
    className,
}: AutosaveIndicatorProps) {
    const formatLastSaved = () => {
        if (!lastSaved) return "";
        const now = new Date();
        const diff = Math.floor((now.getTime() - lastSaved.getTime()) / 1000);

        if (diff < 5) return "Vừa xong";
        if (diff < 60) return `${diff} giây trước`;
        if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
        return lastSaved.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <AnimatePresence mode="wait">
                {status === "saving" && (
                    <motion.div
                        key="saving"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 text-gray-500 dark:text-gray-400"
                    >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-xs">Đang lưu...</span>
                    </motion.div>
                )}

                {status === "saved" && (
                    <motion.div
                        key="saved"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400"
                    >
                        <Check className="w-4 h-4" />
                        <span className="text-xs">Đã lưu {formatLastSaved()}</span>
                    </motion.div>
                )}

                {status === "error" && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 text-red-500"
                    >
                        <CloudOff className="w-4 h-4" />
                        <span className="text-xs">Lỗi lưu</span>
                    </motion.div>
                )}

                {status === "idle" && lastSaved && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 text-gray-400 dark:text-gray-500"
                    >
                        <Cloud className="w-4 h-4" />
                        <span className="text-xs">Lưu lần cuối: {formatLastSaved()}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Hook for autosave functionality
export function useAutosave<T>(
    data: T,
    onSave: (data: T) => Promise<void>,
    options: {
        debounceMs?: number;
        enabled?: boolean;
    } = {}
) {
    const { debounceMs = 3000, enabled = true } = options;

    const [status, setStatus] = React.useState<SaveStatus>("idle");
    const [lastSaved, setLastSaved] = React.useState<Date | null>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const initialDataRef = React.useRef<T>(data);
    const isFirstRender = React.useRef(true);

    // Debounced save
    React.useEffect(() => {
        // Skip first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            initialDataRef.current = data;
            return;
        }

        if (!enabled) return;

        // Clear existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout
        timeoutRef.current = setTimeout(async () => {
            try {
                setStatus("saving");
                await onSave(data);
                setStatus("saved");
                setLastSaved(new Date());

                // Reset to idle after a while
                setTimeout(() => setStatus("idle"), 2000);
            } catch {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        }, debounceMs);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [data, onSave, debounceMs, enabled]);

    // Manual save
    const save = React.useCallback(async () => {
        try {
            setStatus("saving");
            await onSave(data);
            setStatus("saved");
            setLastSaved(new Date());
            setTimeout(() => setStatus("idle"), 2000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    }, [data, onSave]);

    return { status, lastSaved, save };
}
