"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, FileText, CheckCircle, AlertCircle, Loader2, Star } from "lucide-react";
import { useCvFileStore } from "@/features/cv/stores/cv-file-store";

interface UploadCVModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: () => void;
}

type UploadState = "idle" | "dragging" | "uploading" | "success" | "error";

const ACCEPTED_TYPES: Record<string, string> = {
    "application/pdf": "pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadCVModal({ isOpen, onClose, onUpload }: UploadCVModalProps) {
    const { uploadCvFile } = useCvFileStore();
    const [uploadState, setUploadState] = React.useState<UploadState>("idle");
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [isPrimary, setIsPrimary] = React.useState(true);
    const [error, setError] = React.useState("");
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setUploadState("idle");
                setSelectedFile(null);
                setIsPrimary(true);
                setError("");
            }, 300);
        }
    }, [isOpen]);

    const validateFile = (file: File): string | null => {
        if (!ACCEPTED_TYPES[file.type] && !file.name.toLowerCase().endsWith('.pdf') && !file.name.toLowerCase().endsWith('.docx')) {
            return "Chỉ chấp nhận file PDF hoặc DOCX";
        }
        if (file.size > 10 * 1024 * 1024) {
            return "File không được vượt quá 10MB";
        }
        return null;
    };

    const handleFile = (file: File) => {
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            setSelectedFile(null);
            return;
        }
        setError("");
        setSelectedFile(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setUploadState("dragging");
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setUploadState("idle");
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setUploadState("idle");
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploadState("uploading");
        try {
            await uploadCvFile(selectedFile, isPrimary);
            setUploadState("success");
            setTimeout(() => {
                onUpload();
                onClose();
            }, 1200);
        } catch (err: any) {
            setUploadState("error");
            setError(err.message || "Có lỗi xảy ra khi tải CV lên");
        }
    };

    const isDragging = uploadState === "dragging";
    const hasFile = !!selectedFile;

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
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full max-w-lg bg-white dark:bg-[#1C252E] rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/50 overflow-hidden border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]">
                                <div>
                                    <h2 className="text-lg font-bold text-[#1C252E] dark:text-white">Tải CV lên</h2>
                                    <p className="text-sm text-[#637381] dark:text-[#919EAB] mt-0.5">Hỗ trợ PDF và DOCX, tối đa 10MB</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.06] transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Drop zone */}
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`
                                        relative border-2 border-dashed rounded-2xl p-8 cursor-pointer text-center transition-all duration-200
                                        ${isDragging
                                            ? "border-green-500 bg-green-500/5 dark:bg-green-500/10"
                                            : hasFile
                                                ? "border-green-500/50 bg-green-500/5 dark:bg-green-500/5"
                                                : "border-[rgba(145,158,171,0.3)] dark:border-white/[0.12] bg-[rgba(145,158,171,0.04)] dark:bg-white/[0.02] hover:border-[rgba(145,158,171,0.5)] dark:hover:border-white/[0.2] hover:bg-[rgba(145,158,171,0.06)] dark:hover:bg-white/[0.04]"
                                        }
                                    `}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        onChange={handleInputChange}
                                        className="hidden"
                                    />

                                    <AnimatePresence mode="wait">
                                        {hasFile ? (
                                            <motion.div
                                                key="selected"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex flex-col items-center gap-2"
                                            >
                                                <div className="w-12 h-12 rounded-xl bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center">
                                                    <FileText className="w-6 h-6 text-green-500" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#1C252E] dark:text-white text-sm break-all">{selectedFile!.name}</p>
                                                    <p className="text-xs text-[#637381] dark:text-[#919EAB] mt-0.5">{formatFileSize(selectedFile!.size)}</p>
                                                </div>
                                                <p className="text-xs text-green-500 font-medium">Click để đổi file khác</p>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="empty"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex flex-col items-center gap-3"
                                            >
                                                <motion.div
                                                    animate={isDragging ? { scale: 1.15 } : { scale: 1 }}
                                                    className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                                                >
                                                    <Upload className="w-7 h-7 text-green-500 dark:text-green-400" />
                                                </motion.div>
                                                <div>
                                                    <p className="font-semibold text-[#1C252E] dark:text-white">
                                                        {isDragging ? "Thả file vào đây" : "Kéo thả file vào đây"}
                                                    </p>
                                                    <p className="text-sm text-[#637381] dark:text-[#919EAB] mt-1">
                                                        hoặc <span className="text-green-600 dark:text-green-400 font-medium">chọn file</span> từ máy tính
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Error message */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm"
                                        >
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Options */}
                                <AnimatePresence>
                                    {hasFile && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <label className="flex items-center gap-3 p-3 rounded-xl border border-[rgba(145,158,171,0.2)] dark:border-white/[0.1] bg-[rgba(145,158,171,0.04)] dark:bg-white/[0.02] cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={isPrimary}
                                                    onChange={(e) => setIsPrimary(e.target.checked)}
                                                    className="w-4 h-4 text-green-500 rounded border-[rgba(145,158,171,0.3)] focus:ring-green-500"
                                                />
                                                <div className="flex items-center gap-2 text-sm font-medium text-[#1C252E] dark:text-white">
                                                    <Star className="w-4 h-4 text-amber-500" />
                                                    Đặt làm CV mặc định
                                                </div>
                                            </label>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Action buttons */}
                                <div className="flex gap-3 pt-1">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 h-12 rounded-xl border-2 border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] text-[#637381] dark:text-[#919EAB] font-semibold hover:bg-[rgba(145,158,171,0.06)] dark:hover:bg-white/[0.04] transition-colors"
                                    >
                                        Huỷ
                                    </button>
                                    <motion.button
                                        whileHover={hasFile ? { scale: 1.02 } : {}}
                                        whileTap={hasFile ? { scale: 0.98 } : {}}
                                        onClick={handleUpload}
                                        disabled={!hasFile || uploadState === "uploading" || uploadState === "success"}
                                        className="flex-1 h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <AnimatePresence mode="wait">
                                            {uploadState === "uploading" ? (
                                                <motion.span
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Đang tải...
                                                </motion.span>
                                            ) : uploadState === "success" ? (
                                                <motion.span
                                                    key="success"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                    Thành công!
                                                </motion.span>
                                            ) : (
                                                <motion.span
                                                    key="idle"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    Tải lên
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
