"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "./button";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning" | "info";
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Xác nhận",
    cancelText = "Hủy",
    variant = "danger",
}: ConfirmDialogProps) {
    // Close on escape key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    const iconColors = {
        danger: "text-red-500 bg-red-100 dark:bg-red-900/30",
        warning: "text-amber-500 bg-amber-100 dark:bg-amber-900/30",
        info: "text-[#22c55e] bg-[#22c55e]/15 dark:bg-[#22c55e]/20",
    };

    const confirmVariant = variant === "danger" ? "danger" : "primary";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="relative w-full max-w-sm bg-white/90 backdrop-blur-2xl rounded-[24px] shadow-2xl ring-1 ring-white/60 pointer-events-auto p-6 overflow-hidden">
                            {/* Decorative Top Gradient */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-green-400 opacity-50"></div>

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 transition-all active:scale-95"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Content */}
                            <div className="flex flex-col items-center text-center gap-4 mt-2">
                                <div className={`p-4 rounded-2xl shadow-inner ${iconColors[variant]} mb-2`}>
                                    <AlertTriangle className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 font-be-vietnam">
                                        {title}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500 font-medium leading-relaxed">
                                        {message}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3 mt-8">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={onClose}
                                    className="rounded-full border-slate-200 hover:bg-slate-50 text-slate-600 font-bold h-12"
                                >
                                    {cancelText}
                                </Button>
                                <Button
                                    variant={confirmVariant}
                                    size="lg"
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className="rounded-full font-bold shadow-lg shadow-[#22c55e]/20 h-12"
                                >
                                    {confirmText}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Hook for easier usage
export function useConfirmDialog() {
    const resolveRef = React.useRef<((value: boolean) => void) | null>(null);

    const [state, setState] = React.useState<{
        isOpen: boolean;
        title: string;
        message: string;
        variant: "danger" | "warning" | "info";
        confirmText?: string;
        cancelText?: string;
    }>({
        isOpen: false,
        title: "",
        message: "",
        variant: "danger",
    });

    const confirm = React.useCallback(
        (options: {
            title: string;
            message: string;
            variant?: "danger" | "warning" | "info";
            confirmText?: string;
            cancelText?: string;
        }): Promise<boolean> => {
            // If a previous dialog is still pending, resolve it as cancelled
            if (resolveRef.current) {
                resolveRef.current(false);
                resolveRef.current = null;
            }

            return new Promise((resolve) => {
                resolveRef.current = resolve;
                setState({
                    isOpen: true,
                    title: options.title,
                    message: options.message,
                    variant: options.variant || "danger",
                    confirmText: options.confirmText,
                    cancelText: options.cancelText,
                });
            });
        },
        []
    );

    const handleConfirm = React.useCallback(() => {
        if (resolveRef.current) {
            resolveRef.current(true);
            resolveRef.current = null;
        }
    }, []);

    const close = React.useCallback(() => {
        // Resolve as cancelled so the awaiting code can continue
        if (resolveRef.current) {
            resolveRef.current(false);
            resolveRef.current = null;
        }
        setState((prev) => ({ ...prev, isOpen: false }));
        // Force-restore scroll in case AnimatePresence exit animation races
        document.body.style.overflow = "";
    }, []);

    const DialogComponent = React.useMemo(
        () => (
            <ConfirmDialog
                isOpen={state.isOpen}
                onClose={close}
                onConfirm={handleConfirm}
                title={state.title}
                message={state.message}
                variant={state.variant}
                confirmText={state.confirmText}
                cancelText={state.cancelText}
            />
        ),
        [state, close, handleConfirm]
    );

    return { confirm, DialogComponent };
}

