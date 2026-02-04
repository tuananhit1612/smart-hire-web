"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Pencil } from "lucide-react";

interface RenameDialogProps {
    isOpen: boolean;
    currentName: string;
    onConfirm: (newName: string) => void;
    onCancel: () => void;
}

export function RenameDialog({
    isOpen,
    currentName,
    onConfirm,
    onCancel,
}: RenameDialogProps) {
    const [newName, setNewName] = React.useState(currentName);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Reset and focus when opening
    React.useEffect(() => {
        if (isOpen) {
            setNewName(currentName);
            setTimeout(() => {
                inputRef.current?.focus();
                inputRef.current?.select();
            }, 100);
        }
    }, [isOpen, currentName]);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newName.trim() && newName.trim() !== currentName) {
            onConfirm(newName.trim());
        }
    };

    const isValid = newName.trim().length > 0 && newName.trim() !== currentName;

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
                        <form onSubmit={handleSubmit} className="p-6 pt-8">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: "spring" }}
                                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-sky-100 to-green-100 flex items-center justify-center mb-4"
                            >
                                <div className="relative">
                                    <FileText className="w-7 h-7 text-sky-600" />
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                        <Pencil className="w-2.5 h-2.5 text-white" />
                                    </div>
                                </div>
                            </motion.div>

                            <h3 className="text-xl font-bold text-sky-900 text-center mb-2">
                                Đổi tên CV
                            </h3>
                            <p className="text-sky-700/70 text-center mb-6">
                                Nhập tên mới cho CV của bạn
                            </p>

                            {/* Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-sky-800 mb-2">
                                    Tên CV
                                </label>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-sky-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none text-sky-900 font-medium transition-all"
                                    placeholder="Nhập tên CV..."
                                />
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-3">
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onCancel}
                                    className="flex-1 px-6 py-3 rounded-full border border-sky-200 text-sky-700 font-semibold hover:bg-sky-50 transition-colors"
                                >
                                    Hủy bỏ
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: isValid ? 1.02 : 1 }}
                                    whileTap={{ scale: isValid ? 0.98 : 1 }}
                                    disabled={!isValid}
                                    className={`flex-1 px-6 py-3 rounded-full font-semibold transition-all ${isValid
                                            ? "bg-gradient-to-r from-sky-600 to-green-500 text-white shadow-lg shadow-sky-500/25 hover:shadow-xl"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Lưu thay đổi
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
