"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Toast types
type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (message: string, type?: ToastType, duration?: number) => void;
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
        success: (message: string) => addToast(message, "success"),
        error: (message: string) => addToast(message, "error"),
        warning: (message: string) => addToast(message, "warning"),
        info: (message: string) => addToast(message, "info"),
    };
}

const TOAST_ICONS: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
};

const TOAST_STYLES: Record<ToastType, string> = {
    success: "border-emerald-500/20 bg-emerald-500/5",
    error: "border-red-500/20 bg-red-500/5",
    warning: "border-amber-500/20 bg-amber-500/5",
    info: "border-blue-500/20 bg-blue-500/5",
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onRemove();
        }, toast.duration || 4000);

        return () => clearTimeout(timer);
    }, [toast.duration, onRemove]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-xl border",
                "bg-white dark:bg-zinc-900 shadow-lg backdrop-blur-xl",
                TOAST_STYLES[toast.type]
            )}
        >
            {TOAST_ICONS[toast.type]}
            <span className="text-sm font-medium text-gray-900 dark:text-white flex-1">
                {toast.message}
            </span>
            <button
                onClick={onRemove}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
                <X className="w-4 h-4 text-gray-400" />
            </button>
        </motion.div>
    );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const addToast = React.useCallback(
        (message: string, type: ToastType = "info", duration = 4000) => {
            const id = Math.random().toString(36).substr(2, 9);
            setToasts((prev) => [...prev, { id, message, type, duration }]);
        },
        []
    );

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <div key={toast.id} className="pointer-events-auto">
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
