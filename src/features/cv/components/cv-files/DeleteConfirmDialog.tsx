"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    fileName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function DeleteConfirmDialog({
    isOpen,
    fileName,
    onConfirm,
    onCancel,
}: DeleteConfirmDialogProps) {
    // Close on escape key
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [isOpen, onCancel]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCancel}
                        className="absolute inset-0 bg-sky-950/30 backdrop-blur-sm"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-sky-900/20 overflow-hidden"
                    >
                        {/* Close button */}
                        <button
                            onClick={onCancel}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        {/* Content */}
                        <div className="p-6 pt-8 text-center">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: "spring" }}
                                className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4"
                            >
                                <AlertTriangle className="w-8 h-8 text-red-500" />
                            </motion.div>

                            <h3 className="text-xl font-bold text-sky-900 mb-2">
                                Xóa CV này?
                            </h3>
                            <p className="text-sky-700/70 mb-6">
                                Bạn có chắc chắn muốn xóa{" "}
                                <span className="font-semibold text-sky-900">
                                    &quot;{fileName}&quot;
                                </span>
                                ? Hành động này không thể hoàn tác.
                            </p>

                            {/* Action buttons */}
                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onCancel}
                                    className="flex-1 px-6 py-3 rounded-full border border-sky-200 text-sky-700 font-semibold hover:bg-sky-50 transition-colors"
                                >
                                    Hủy bỏ
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onConfirm}
                                    className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 shadow-lg shadow-red-500/25 transition-colors"
                                >
                                    Xóa CV
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
