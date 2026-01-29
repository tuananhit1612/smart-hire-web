"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertTriangle, Info, Bell, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Toast types
type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
    id: string;
    message: string;
    description?: string;
    type: ToastType;
    duration?: number;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (message: string, type?: ToastType, duration?: number, description?: string) => void;
    removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

export function useToast() {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

// Helper functions for common toast types
export function useToastHelpers() {
    const { addToast } = useToast();

    return {
        success: (message: string, description?: string) => addToast(message, "success", 4000, description),
        error: (message: string, description?: string) => addToast(message, "error", 5000, description),
        warning: (message: string, description?: string) => addToast(message, "warning", 4000, description),
        info: (message: string, description?: string) => addToast(message, "info", 4000, description),
    };
}

const TOAST_CONFIG: Record<ToastType, { icon: React.ElementType; color: string; bgColor: string; borderColor: string; stripColor: string }> = {
    success: {
        icon: Check,
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        borderColor: "border-emerald-200 dark:border-emerald-800",
        stripColor: "bg-emerald-500 dark:bg-emerald-500"
    },
    error: {
        icon: XCircle,
        color: "text-rose-600 dark:text-rose-400",
        bgColor: "bg-rose-50 dark:bg-rose-900/20",
        borderColor: "border-rose-200 dark:border-rose-800",
        stripColor: "bg-rose-500 dark:bg-rose-500"
    },
    warning: {
        icon: AlertTriangle,
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-50 dark:bg-amber-900/20",
        borderColor: "border-amber-200 dark:border-amber-800",
        stripColor: "bg-amber-500 dark:bg-amber-500"
    },
    info: {
        icon: Info,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        borderColor: "border-blue-200 dark:border-blue-800",
        stripColor: "bg-blue-500 dark:bg-blue-500"
    }
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
    const config = TOAST_CONFIG[toast.type];
    const Icon = config.icon;

    React.useEffect(() => {
        const timer = setTimeout(() => {
            onRemove();
        }, toast.duration || 4000);

        return () => clearTimeout(timer);
    }, [toast.duration, onRemove]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={cn(
                "group relative flex w-full max-w-sm overflow-hidden rounded-2xl border bg-white/95 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-3xl dark:bg-zinc-900/95 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
                config.borderColor
            )}
        >
            {/* Colored Strip on Left */}
            {/* Colored Strip on Left */}
            <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", config.stripColor)} />

            {/* Icon Container */}
            <div className={cn("mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full", config.bgColor)}>
                <Icon className={cn("h-5 w-5", config.color)} />
            </div>

            {/* Content */}
            <div className="flex-1 pr-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {toast.message}
                </h4>
                {toast.description && (
                    <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                        {toast.description}
                    </p>
                )}
            </div>

            {/* Close Button */}
            <button
                onClick={onRemove}
                className="absolute right-2 top-2 rounded-lg p-1.5 text-gray-400 opacity-0 transition-all hover:bg-gray-100 group-hover:opacity-100 dark:hover:bg-zinc-800"
            >
                <X className="h-4 w-4" />
            </button>
        </motion.div>
    );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const addToast = React.useCallback(
        (message: string, type: ToastType = "info", duration = 4000, description?: string) => {
            const id = Math.random().toString(36).substr(2, 9);
            setToasts((prev) => [...prev, { id, message, type, duration, description }]);
        },
        []
    );

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            {/* Toast Container - Top Right */}
            <div className="fixed top-20 right-4 md:top-6 md:right-6 z-[100] flex flex-col gap-3 w-full max-w-[380px] pointer-events-none p-4 md:p-0">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <div key={toast.id} className="pointer-events-auto w-full flex justify-end">
                            <ToastItem
                                toast={toast}
                                onRemove={() => removeToast(toast.id)}
                            />
                        </div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
