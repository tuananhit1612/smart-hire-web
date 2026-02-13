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

const TOAST_CONFIG: Record<ToastType, { icon: React.ElementType; color: string; bgColor: string; borderColor: string; stripColor: string; shadowColor: string }> = {
    success: {
        icon: Check,
        color: "text-emerald-600",
        bgColor: "bg-emerald-100/50",
        borderColor: "border-emerald-200",
        stripColor: "bg-emerald-500",
        shadowColor: "shadow-emerald-500/10"
    },
    error: {
        icon: XCircle,
        color: "text-rose-600",
        bgColor: "bg-rose-100/50",
        borderColor: "border-rose-200",
        stripColor: "bg-rose-500",
        shadowColor: "shadow-rose-500/10"
    },
    warning: {
        icon: AlertTriangle,
        color: "text-amber-600",
        bgColor: "bg-amber-100/50",
        borderColor: "border-amber-200",
        stripColor: "bg-amber-500",
        shadowColor: "shadow-amber-500/10"
    },
    info: {
        icon: Info,
        color: "text-sky-600",
        bgColor: "bg-sky-100/50",
        borderColor: "border-sky-200",
        stripColor: "bg-sky-500",
        shadowColor: "shadow-sky-500/10"
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
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
                "group relative flex w-full max-w-sm overflow-hidden rounded-2xl border bg-white/80 p-4 shadow-xl backdrop-blur-2xl transition-all hover:scale-[1.02]",
                config.borderColor,
                config.shadowColor
            )}
        >
            {/* Colored Glow Background */}
            <div className={cn("absolute inset-0 opacity-20 pointer-events-none", config.bgColor)} />

            {/* Colored Strip on Left (Gradient) */}
            <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", config.stripColor)} />

            {/* Icon Container */}
            <div className={cn("relative mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-white/50", config.color)}>
                <Icon className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="flex-1 pr-6 relative">
                <h4 className="text-sm font-bold text-gray-800">
                    {toast.message}
                </h4>
                {toast.description && (
                    <p className="mt-1 text-xs font-medium text-gray-500 leading-relaxed">
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
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-bold text-sky-700 border border-sky-200 hover:bg-sky-50 hover:border-sky-400 hover:scale-105 transition-all shadow-sm"
                    >
                        <RotateCcw className="w-3 h-3" />
                        {toast.action.label}
                    </button>
                )}
            </div>

            {/* Close Button */}
            <button
                onClick={onRemove}
                className="absolute right-2 top-2 rounded-full p-1.5 text-gray-400 opacity-60 transition-all hover:bg-gray-100 hover:text-gray-600 hover:opacity-100"
            >
                <X className="h-3.5 w-3.5" />
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
