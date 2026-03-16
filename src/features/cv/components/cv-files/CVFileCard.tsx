"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
    FileText,
    MoreVertical,
    Download,
    Pencil,
    Trash2,
    Star,
    Archive,
    Eye,
    Clock,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { CVFile, CVFileVersion } from "../../types/cv-file-types";
import { formatFileSize, formatRelativeTime } from "../../data/mock-cv-files";

interface CVFileCardProps {
    file: CVFile;
    onView: (file: CVFile) => void;
    onDownload: (file: CVFile, version?: CVFileVersion) => void;
    onRename: (file: CVFile) => void;
    onDelete: (file: CVFile) => void;
    onSetDefault: (file: CVFile) => void;
    onArchive: (file: CVFile) => void;
}

export function CVFileCard({
    file,
    onView,
    onDownload,
    onRename,
    onDelete,
    onSetDefault,
    onArchive,
}: CVFileCardProps) {
    const [showActions, setShowActions] = React.useState(false);
    const [showVersions, setShowVersions] = React.useState(false);
    const [dropdownCoords, setDropdownCoords] = React.useState({ top: 0, left: 0, position: 'bottom' as 'bottom' | 'top' });
    const actionsRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
                setShowActions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Calculate dropdown position based on available space
    React.useEffect(() => {
        if (showActions && buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const dropdownHeight = 280; // Approximate dropdown height
            const dropdownWidth = 192; // w-48 = 12rem = 192px
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

    // Close on scroll
    React.useEffect(() => {
        if (showActions) {
            const handleScroll = () => setShowActions(false);
            window.addEventListener('scroll', handleScroll, true);
            return () => window.removeEventListener('scroll', handleScroll, true);
        }
    }, [showActions]);

    const getStatusBadge = () => {
        switch (file.status) {
            case "active":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Đang dùng
                    </span>
                );
            case "draft":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Bản nháp
                    </span>
                );
            case "archived":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        Đã lưu trữ
                    </span>
                );
        }
    };

    const getFileIcon = () => {
        const isDocx = file.currentVersion.fileType === "docx";
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
            {/* Default badge */}
            {file.isDefault && (
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
                {/* File icon */}
                {getFileIcon()}

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="font-semibold text-green-900 dark:text-white truncate">
                                {file.name}
                            </h3>
                            {file.description && (
                                <p className="text-sm text-green-700/70 dark:text-gray-400 mt-0.5 line-clamp-1">
                                    {file.description}
                                </p>
                            )}
                        </div>

                        {/* Actions dropdown */}
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

                            {/* Dropdown menu - rendered via Portal */}
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
                                    <button
                                        onClick={() => {
                                            onRename(file);
                                            setShowActions(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-800 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <Pencil className="w-4 h-4 text-green-500" />
                                        Đổi tên
                                    </button>
                                    {!file.isDefault && file.status === "active" && (
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
                                    {file.status !== "archived" && (
                                        <button
                                            onClick={() => {
                                                onArchive(file);
                                                setShowActions(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-800 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-white/5 transition-colors"
                                        >
                                            <Archive className="w-4 h-4 text-green-500" />
                                            Lưu trữ
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

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-green-600 dark:text-gray-400">
                        {getStatusBadge()}
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatRelativeTime(file.updatedAt)}
                        </span>
                        <span className="uppercase font-medium">
                            {file.currentVersion.fileType}
                        </span>
                        <span>{formatFileSize(file.currentVersion.fileSize)}</span>
                        {file.matchScore && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                                AI: {file.matchScore}%
                            </span>
                        )}
                    </div>

                    {/* Version toggle */}
                    {file.versions.length > 1 && (
                        <button
                            onClick={() => setShowVersions(!showVersions)}
                            className="mt-3 flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                        >
                            {showVersions ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                            )}
                            {file.versions.length} phiên bản
                        </button>
                    )}
                </div>
            </div>

            {/* Version history */}
            {showVersions && file.versions.length > 1 && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-green-100 dark:border-white/10"
                >
                    <h4 className="text-xs font-semibold text-green-800 dark:text-gray-300 mb-3">
                        Lịch sử phiên bản
                    </h4>
                    <div className="space-y-2">
                        {file.versions.map((version, index) => (
                            <div
                                key={version.id}
                                className={`flex items-center justify-between p-3 rounded-xl ${index === 0
                                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/20"
                                    : "bg-gray-50 dark:bg-white/[0.04]"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${index === 0
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400"
                                            }`}
                                    >
                                        v{version.versionNumber}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-green-900 dark:text-white">
                                            {version.fileName}
                                        </p>
                                        {version.note && (
                                            <p className="text-xs text-green-600/70 dark:text-gray-500 mt-0.5">
                                                {version.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-green-600 dark:text-gray-400">
                                        {formatRelativeTime(version.uploadedAt)}
                                    </span>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => onDownload(file, version)}
                                        className="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-white/10 transition-colors"
                                    >
                                        <Download className="w-4 h-4 text-green-600" />
                                    </motion.button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
