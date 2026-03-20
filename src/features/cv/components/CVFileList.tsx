"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload,
    Search,
    SortAsc,
    FileText,
    Plus,
    FolderOpen,
    Sparkles,
} from "lucide-react";
import { CVFile, CVFileVersion, CVFileSortOption, CVFileStatus } from "../types/cv-file-types";
import { MOCK_CV_FILES } from "../data/mock-cv-files";
import { cvApi } from "../api/cv-api";
import { useToast } from "@/shared/components/ui/toast";
import { CVFileCard } from "./cv-files/CVFileCard";
import { DeleteConfirmDialog } from "./cv-files/DeleteConfirmDialog";
import { RenameDialog } from "./cv-files/RenameDialog";
import { UploadCVModal } from "./cv-files/UploadCVModal";

type FilterTab = "all" | CVFileStatus;

export function CVFileList() {
    const [files, setFiles] = React.useState<CVFile[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { addToast } = useToast();
    const [searchQuery, setSearchQuery] = React.useState("");

    React.useEffect(() => {
        const fetchFiles = async () => {
            try {
                const data = await cvApi.getCVFiles();
                setFiles(data);
            } catch (error) {
                console.error("Failed to fetch CV files:", error);
                // Fallback for UI demonstration if backend is not available
                setFiles(MOCK_CV_FILES);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFiles();
    }, []);
    const [activeFilter, setActiveFilter] = React.useState<FilterTab>("all");
    const [sortBy, setSortBy] = React.useState<CVFileSortOption>("newest");
    const [showSortMenu, setShowSortMenu] = React.useState(false);
    const [uploadModalOpen, setUploadModalOpen] = React.useState(false);

    // Dialog states
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState<CVFile | null>(null);

    const sortMenuRef = React.useRef<HTMLDivElement>(null);

    // Close sort menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
                setShowSortMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter and sort files
    const filteredFiles = React.useMemo(() => {
        let result = [...files];

        if (activeFilter !== "all") {
            result = result.filter((f) => f.status === activeFilter);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (f) =>
                    f.name.toLowerCase().includes(query) ||
                    f.description?.toLowerCase().includes(query)
            );
        }

        switch (sortBy) {
            case "newest":
                result.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
                break;
            case "oldest":
                result.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());
                break;
            case "name":
                result.sort((a, b) => a.name.localeCompare(b.name, "vi"));
                break;
            case "size":
                result.sort(
                    (a, b) => b.currentVersion.fileSize - a.currentVersion.fileSize
                );
                break;
        }

        return result;
    }, [files, activeFilter, searchQuery, sortBy]);

    // Count by status
    const statusCounts = React.useMemo(() => {
        return {
            all: files.length,
            active: files.filter((f) => f.status === "active").length,
            draft: files.filter((f) => f.status === "draft").length,
            archived: files.filter((f) => f.status === "archived").length,
        };
    }, [files]);

    // Handlers
    const handleView = (file: CVFile) => {
        console.log("View:", file.name);
    };

    const handleDownload = (file: CVFile, version?: CVFileVersion) => {
        const v = version || file.currentVersion;
        console.log("Download:", v.fileName);
    };

    const handleRename = (file: CVFile) => {
        setSelectedFile(file);
        setRenameDialogOpen(true);
    };

    const handleDelete = (file: CVFile) => {
        setSelectedFile(file);
        setDeleteDialogOpen(true);
    };

    const handleSetDefault = async (file: CVFile) => {
        try {
            await cvApi.setDefaultCV(file.id);
            setFiles((prev: CVFile[]) =>
                prev.map((f: CVFile) => ({
                    ...f,
                    isDefault: f.id === file.id,
                }))
            );
            addToast("Đã đặt làm CV mặc định", "success");
        } catch (error) {
            addToast("Lỗi khi đặt CV mặc định", "error");
        }
    };

    const handleArchive = async (file: CVFile) => {
        try {
            await cvApi.archiveCVFile(file.id);
            setFiles((prev: CVFile[]) =>
                prev.map((f: CVFile) =>
                    f.id === file.id
                        ? { ...f, status: "archived" as CVFileStatus, isDefault: false }
                        : f
                )
            );
            addToast("Đã lưu trữ CV", "success");
        } catch (error) {
            addToast("Lỗi khi lưu trữ CV", "error");
        }
    };

    const confirmDelete = async () => {
        if (selectedFile) {
            try {
                await cvApi.deleteCVFile(selectedFile.id);
                setFiles((prev: CVFile[]) => prev.filter((f: CVFile) => f.id !== selectedFile.id));
                addToast("Đã xóa CV", "success");
            } catch (error) {
                addToast("Lỗi khi xóa CV", "error");
            } finally {
                setDeleteDialogOpen(false);
                setSelectedFile(null);
            }
        }
    };

    const confirmRename = async (newName: string) => {
        if (selectedFile) {
            try {
                await cvApi.renameCVFile(selectedFile.id, newName);
                setFiles((prev: CVFile[]) =>
                    prev.map((f: CVFile) =>
                        f.id === selectedFile.id ? { ...f, name: newName } : f
                    )
                );
                addToast("Đã đổi tên CV", "success");
            } catch (error) {
                addToast("Lỗi khi đổi tên CV", "error");
            } finally {
                setRenameDialogOpen(false);
                setSelectedFile(null);
            }
        }
    };

    const filterTabs: { id: FilterTab; label: string; count: number }[] = [
        { id: "all", label: "Tất cả", count: statusCounts.all },
        { id: "active", label: "Đang dùng", count: statusCounts.active },
        { id: "draft", label: "Bản nháp", count: statusCounts.draft },
        { id: "archived", label: "Đã lưu trữ", count: statusCounts.archived },
    ];

    const sortOptions: { id: CVFileSortOption; label: string }[] = [
        { id: "newest", label: "Mới nhất" },
        { id: "oldest", label: "Cũ nhất" },
        { id: "name", label: "Theo tên" },
        { id: "size", label: "Theo dung lượng" },
    ];

    return (
        <div className="w-full">
            {/* Header section */}
            <div className="pb-6 border-b border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] mb-6">
                <div className="max-w-5xl mx-auto px-4 pt-4">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
                            <Sparkles className="w-4 h-4" />
                            Quản lý CV của bạn
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white mb-2">
                            Thư viện CV
                        </h1>
                        <p className="text-[#637381] dark:text-[#919EAB] max-w-lg mx-auto">
                            Quản lý tất cả CV đã tải lên, theo dõi phiên bản và ứng tuyển
                            dễ dàng
                        </p>
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                    >
                        {[
                            {
                                label: "Tổng CV",
                                value: statusCounts.all,
                                icon: FileText,
                                color: "from-green-500 to-green-600",
                            },
                            {
                                label: "Đang dùng",
                                value: statusCounts.active,
                                icon: FolderOpen,
                                color: "from-green-500 to-emerald-600",
                            },
                            {
                                label: "Bản nháp",
                                value: statusCounts.draft,
                                icon: FileText,
                                color: "from-amber-500 to-orange-600",
                            },
                            {
                                label: "Đã lưu trữ",
                                value: statusCounts.archived,
                                icon: FileText,
                                color: "from-gray-400 to-gray-500",
                            },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                className="bg-white dark:bg-[#1C252E] rounded-2xl p-4 border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div
                                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}
                                >
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-2xl font-bold text-[#1C252E] dark:text-white">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-[#637381] dark:text-[#919EAB]">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Search & Upload */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#919EAB]" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm CV..."
                                className="w-full pl-12 pr-4 py-3.5 rounded-full border-2 border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] text-[#1C252E] dark:text-white placeholder:text-[#919EAB] focus:border-green-500 dark:focus:border-green-400 focus:ring-4 focus:ring-green-500/10 outline-none font-medium transition-all"
                            />
                        </div>

                        {/* Upload button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setUploadModalOpen(true)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl transition-all"
                        >
                            <Upload className="w-5 h-5" />
                            <span>Tải CV lên</span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-5xl mx-auto px-4 pb-12">
                {/* Filter tabs & Sort */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    {/* Filter tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                        {filterTabs.map((tab) => (
                            <motion.button
                                key={tab.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveFilter(tab.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                                    activeFilter === tab.id
                                        ? "bg-green-600 text-white shadow-lg shadow-green-500/25"
                                        : "bg-white dark:bg-[#1C252E] text-[#637381] dark:text-[#919EAB] border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] hover:bg-[rgba(145,158,171,0.06)] dark:hover:bg-white/[0.04]"
                                }`}
                            >
                                {tab.label}
                                <span
                                    className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                                        activeFilter === tab.id
                                            ? "bg-white/20 text-white"
                                            : "bg-[rgba(145,158,171,0.1)] dark:bg-white/[0.06] text-[#637381] dark:text-[#919EAB]"
                                    }`}
                                >
                                    {tab.count}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Sort dropdown */}
                    <div className="relative" ref={sortMenuRef}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowSortMenu(!showSortMenu)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] text-[#637381] dark:text-[#919EAB] text-sm font-medium hover:bg-[rgba(145,158,171,0.06)] dark:hover:bg-white/[0.04] transition-colors"
                        >
                            <SortAsc className="w-4 h-4" />
                            {sortOptions.find((o) => o.id === sortBy)?.label}
                        </motion.button>

                        <AnimatePresence>
                            {showSortMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-[#1C252E] rounded-xl shadow-xl shadow-black/10 dark:shadow-black/30 border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] py-2 z-20"
                                >
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => {
                                                setSortBy(option.id);
                                                setShowSortMenu(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                                sortBy === option.id
                                                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-medium"
                                                    : "text-[#637381] dark:text-[#919EAB] hover:bg-[rgba(145,158,171,0.06)] dark:hover:bg-white/[0.04]"
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* CV File List */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="text-center py-16">
                            <div className="w-8 h-8 mx-auto border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 text-[#637381]">Đang tải CV...</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredFiles.length > 0 ? (
                                filteredFiles.map((file, index) => (
                                    <motion.div
                                        key={file.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <CVFileCard
                                            file={file}
                                            onView={handleView}
                                            onDownload={handleDownload}
                                            onRename={handleRename}
                                            onDelete={handleDelete}
                                            onSetDefault={handleSetDefault}
                                            onArchive={handleArchive}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16"
                                >
                                    <div className="w-20 h-20 rounded-full bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-10 h-10 text-[#919EAB]" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1C252E] dark:text-white mb-2">
                                        Không tìm thấy CV
                                    </h3>
                                    <p className="text-[#637381] dark:text-[#919EAB] mb-6">
                                        {searchQuery
                                            ? "Thử thay đổi từ khóa tìm kiếm"
                                            : "Hãy tải lên CV đầu tiên của bạn"}
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setUploadModalOpen(true)}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow-lg shadow-green-500/25"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Tải CV lên
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </div>

            {/* Upload Modal */}
            <UploadCVModal
                isOpen={uploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                onUpload={(newFile) => {
                    setFiles((prev) => [newFile, ...prev]);
                }}
            />

            {/* Dialogs */}
            <DeleteConfirmDialog
                isOpen={deleteDialogOpen}
                fileName={selectedFile?.name || ""}
                onConfirm={confirmDelete}
                onCancel={() => {
                    setDeleteDialogOpen(false);
                    setSelectedFile(null);
                }}
            />

            <RenameDialog
                isOpen={renameDialogOpen}
                currentName={selectedFile?.name || ""}
                onConfirm={confirmRename}
                onCancel={() => {
                    setRenameDialogOpen(false);
                    setSelectedFile(null);
                }}
            />
        </div>
    );
}
