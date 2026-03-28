"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
    FileText,
    MoreVertical,
    Download,
    Trash2,
    Star,
    Eye,
    Clock,
} from "lucide-react";
import type { CvFileResponse } from "@/features/profile/types/profile-api-types";
import { formatRelativeTime } from "../../data/mock-cv-files";

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

interface CVFileCardProps {
    file: CvFileResponse;
    onView: (file: CvFileResponse) => void;
    onDownload: (file: CvFileResponse) => void;
    onDelete: (file: CvFileResponse) => void;
    onSetDefault: (file: CvFileResponse) => void;
}

export function CVFileCard({
    file,
    onView,
    onDownload,
    onDelete,
    onSetDefault,
}: CVFileCardProps) {
    const [showActions, setShowActions] = React.useState(false);
    const [dropdownCoords, setDropdownCoords] = React.useState({ top: 0, left: 0, position: 'bottom' as 'bottom' | 'top' });
    const actionsRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                actionsRef.current && 
                !actionsRef.current.contains(event.target as Node) &&
                (!dropdownRef.current || !dropdownRef.current.contains(event.target as Node))
            ) {
                setShowActions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    React.useEffect(() => {
        if (showActions && buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const dropdownHeight = 200; 
            const dropdownWidth = 192; 
            const spaceBelow = window.innerHeight - buttonRect.bottom;
            const spaceAbove = buttonRect.top;
            const position = spaceBelow < dropdownHeight && spaceAbove > spaceBelow ? 'top' : 'bottom';

            setDropdownCoords({
                top: position === 'bottom' ? buttonRect.bottom + 4 : buttonRect.top - dropdownHeight - 4,
                left: Math.max(8, Math.min(buttonRect.right - dropdownWidth, window.innerWidth - dropdownWidth - 8)),
                position,
            });
        }
    }, [showActions]);

    React.useEffect(() => {
        if (showActions) {
            const handleScroll = () => setShowActions(false);
            window.addEventListener('scroll', handleScroll, true);
            return () => window.removeEventListener('scroll', handleScroll, true);
        }
    }, [showActions]);

    const getFileIcon = () => {
        const isDocx = file.fileType === "DOCX";
        return (
            <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDocx
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                    }`}
            >
                <FileText className="w-6 h-6" />
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            className="relative bg-white dark:bg-[#1C252E] rounded-2xl border border-green-100 dark:border-white/10 p-5 shadow-sm hover:shadow-lg hover:shadow-green-100/50 transition-all duration-200"
        >
            {file.isPrimary && (
                <div className="absolute -top-2 -right-2">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-gradient-to-r from-green-500 to-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg shadow-green-500/25"
                    >
                        <Star className="w-3 h-3 inline mr-1" />
                        Mặc định
                    </motion.div>
                </div>
            )}

            <div className="flex gap-4">
                {getFileIcon()}

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="font-semibold text-green-900 dark:text-white truncate" title={file.fileName}>
                                {file.fileName}
                            </h3>
                            <p className="text-sm text-green-700/70 dark:text-gray-400 mt-0.5 line-clamp-1">
                                {file.source === "BUILT" ? "Tạo từ Resume Builder" : "Tải lên"}
                            </p>
                        </div>

                        <div className="relative" ref={actionsRef}>
                            <motion.button
                                ref={buttonRef}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowActions(!showActions)}
                                className="p-2 rounded-full hover:bg-green-50 dark:hover:bg-white/5 transition-colors"
                            >
                                <MoreVertical className="w-4 h-4 text-green-600" />
                            </motion.button>

                            {showActions && typeof document !== 'undefined' && createPortal(
                                <motion.div
                                    ref={dropdownRef}
                                    initial={{ opacity: 0, scale: 0.95, y: dropdownCoords.position === 'bottom' ? -10 : 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    style={{
                                        position: 'fixed',
                                        top: dropdownCoords.top,
                                        left: dropdownCoords.left,
                                        zIndex: 9999,
                                    }}
                                    className="w-48 bg-white dark:bg-[#141A21] rounded-xl shadow-xl shadow-green-900/10 dark:shadow-black/50 border border-green-100 dark:border-white/10 py-2"
                                >
                                    <button
                                        onClick={() => {
                                            onView(file);
                                            setShowActions(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-800 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <Eye className="w-4 h-4 text-green-500" />
                                        Xem CV
                                    </button>
                                    <button
                                        onClick={() => {
                                            onDownload(file);
                                            setShowActions(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-800 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <Download className="w-4 h-4 text-green-500" />
                                        Tải xuống
                                    </button>
                                    {!file.isPrimary && (
                                        <button
                                            onClick={() => {
                                                onSetDefault(file);
                                                setShowActions(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-800 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-white/5 transition-colors"
                                        >
                                            <Star className="w-4 h-4 text-amber-500" />
                                            Đặt làm mặc định
                                        </button>
                                    )}
                                    <div className="my-1 border-t border-green-100 dark:border-white/10" />
                                    <button
                                        onClick={() => {
                                            onDelete(file);
                                            setShowActions(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Xóa CV
                                    </button>
                                </motion.div>,
                                document.body
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-green-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatRelativeTime(new Date(file.createdAt))}
                        </span>
                        <span className="uppercase font-medium">
                            {file.fileType}
                        </span>
                        <span>{formatFileSize(file.fileSize)}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
