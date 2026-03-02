"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertTriangle, Info, Bell, XCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

// Toast types
type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
    id: string;
    message: string;
    description?: string;
    type: ToastType;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (message: string, type?: ToastType, duration?: number, description?: string, action?: Toast["action"]) => void;
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
        success: (message: string, description?: string, action?: Toast["action"]) => addToast(message, "success", 4000, description, action),
        error: (message: string, description?: string) => addToast(message, "error", 5000, description),
        warning: (message: string, description?: string, action?: Toast["action"]) => addToast(message, "warning", 5000, description, action),
        info: (message: string, description?: string) => addToast(message, "info", 4000, description),
    };
}

const TOAST_CONFIG: Record<ToastType, { icon: React.ElementType; color: string; stripColor: string }> = {
    success: {
        icon: Check,
        color: "text-emerald-500",
        stripColor: "bg-emerald-500",
    },
    error: {
        icon: XCircle,
        color: "text-rose-500",
        stripColor: "bg-rose-500",
    },
    warning: {
        icon: AlertTriangle,
        color: "text-amber-500",
        stripColor: "bg-amber-500",
    },
    info: {
        icon: Info,
        color: "text-sky-500",
        stripColor: "bg-sky-500",
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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
                "group relative flex w-full max-w-[360px] items-center overflow-hidden rounded-[2rem] bg-white dark:bg-[#1A2227] p-3 shadow-2xl transition-all sm:rounded-full border border-slate-100 dark:border-white/5",
            )}
        >
            {/* Colored Strip on Left */}
            <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", config.stripColor)} />

            {/* Icon Container */}
            <div className="relative ml-2 mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 dark:bg-black/30">
                <Icon className={cn("h-5 w-5", config.color)} />
            </div>

            {/* Content */}
            <div className="flex-1 pr-10 relative py-1">
                <h4 className="text-sm font-bold text-slate-800 dark:text-gray-100 leading-tight">
                    {toast.message}
                </h4>
                {toast.description && (
                    <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-gray-400 leading-tight line-clamp-2">
                        {toast.description}
                    </p>
                )}
                {/* Undo / Action Button */}
                {toast.action && (
                    <button
                        onClick={() => {
                            toast.action!.onClick();
                            onRemove();
                        }}
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-white/10 rounded-full text-xs font-bold text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-all shadow-sm"
                    >
                        <RotateCcw className="w-3 h-3" />
                        {toast.action.label}
                    </button>
                )}
            </div>

            {/* Close Button */}
            <button
                onClick={onRemove}
                className="absolute right-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 dark:text-slate-500 dark:hover:text-white transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </motion.div>
    );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const addToast = React.useCallback(
        (message: string, type: ToastType = "info", duration = 4000, description?: string, action?: Toast["action"]) => {
            const id = Math.random().toString(36).substr(2, 9);
            setToasts((prev) => [...prev, { id, message, type, duration, description, action }]);
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
