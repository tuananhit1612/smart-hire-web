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
    Star,
    Loader2
} from "lucide-react";
import { useCvFileStore } from "@/features/cv/stores/cv-file-store";
import type { CvFileResponse } from "@/features/profile/types/profile-api-types";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { CVFileCard } from "./cv-files/CVFileCard";
import { DeleteConfirmDialog } from "./cv-files/DeleteConfirmDialog";
import { UploadCVModal } from "./cv-files/UploadCVModal";

type FilterTab = "all" | "primary" | "uploaded" | "generated";
type CVFileSortOption = "newest" | "oldest" | "name" | "size";

export function CVFileList() {
    const {
        cvFiles: files,
        isLoading,
        fetchCvFiles,
        setPrimaryCv,
        deleteCvFile,
        downloadCvFile,
    } = useCvFileStore();
    
    const toast = useToastHelpers();

    React.useEffect(() => {
        fetchCvFiles();
    }, [fetchCvFiles]);

    const [searchQuery, setSearchQuery] = React.useState("");
    const [activeFilter, setActiveFilter] = React.useState<FilterTab>("all");
    const [sortBy, setSortBy] = React.useState<CVFileSortOption>("newest");
    const [showSortMenu, setShowSortMenu] = React.useState(false);
    const [uploadModalOpen, setUploadModalOpen] = React.useState(false);

    // Dialog states
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState<CvFileResponse | null>(null);

    const sortMenuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
                setShowSortMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredFiles = React.useMemo(() => {
        let result = [...files];

        if (activeFilter === "primary") {
            result = result.filter((f) => f.isPrimary);
        } else if (activeFilter === "uploaded") {
            result = result.filter((f) => f.source === "UPLOADED");
        } else if (activeFilter === "generated") {
            result = result.filter((f) => f.source === "BUILT");
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (f) => f.fileName.toLowerCase().includes(query)
            );
        }

        switch (sortBy) {
            case "newest":
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case "oldest":
                result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case "name":
                result.sort((a, b) => a.fileName.localeCompare(b.fileName, "vi"));
                break;
            case "size":
                result.sort((a, b) => b.fileSize - a.fileSize);
                break;
        }

        return result;
    }, [files, activeFilter, searchQuery, sortBy]);

    const statusCounts = React.useMemo(() => {
        return {
            all: files.length,
            primary: files.filter((f) => f.isPrimary).length,
            uploaded: files.filter((f) => f.source === "UPLOADED").length,
            generated: files.filter((f) => f.source === "BUILT").length,
        };
    }, [files]);

    const handleView = async (file: CvFileResponse) => {
        try {
            await useCvFileStore.getState().viewCvFile(file.id, file.fileType);
        } catch (err: any) {
            toast.error(err.message || "Lỗi khi xem CV");
        }
    };

    const handleDownload = async (file: CvFileResponse) => {
        try {
            await downloadCvFile(file.id, file.fileName);
            toast.success("Đã tải xuống CV");
        } catch (err: any) {
            toast.error(err.message || "Lỗi khi tải CV");
        }
    };

    const handleDelete = (file: CvFileResponse) => {
        setSelectedFile(file);
        setDeleteDialogOpen(true);
    };

    const handleSetDefault = async (file: CvFileResponse) => {
        try {
            await setPrimaryCv(file.id);
            toast.success("Đã đặt làm CV mặc định");
        } catch (err: any) {
            toast.error(err.message || "Không thể đặt làm mặc định");
        }
    };

    const confirmDelete = async () => {
        if (selectedFile) {
            try {
                await deleteCvFile(selectedFile.id);
                toast.success("Đã xoá CV");
                setDeleteDialogOpen(false);
                setSelectedFile(null);
            } catch (err: any) {
                toast.error(err.message || "Lỗi khi xoá CV");
            }
        }
    };

    const filterTabs: { id: FilterTab; label: string; count: number }[] = [
        { id: "all", label: "Tất cả", count: statusCounts.all },
        { id: "primary", label: "CV Mặc định", count: statusCounts.primary },
        { id: "uploaded", label: "Tải lên", count: statusCounts.uploaded },
        { id: "generated", label: "Tạo từ Builder", count: statusCounts.generated },
    ];

    const sortOptions: { id: CVFileSortOption; label: string }[] = [
        { id: "newest", label: "Mới nhất" },
        { id: "oldest", label: "Cũ nhất" },
        { id: "name", label: "Theo tên" },
        { id: "size", label: "Dung lượng" },
    ];

    return (
        <div className="w-full">
            <div className="pb-6 border-b border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] mb-6">
                <div className="max-w-5xl mx-auto px-4 pt-4">
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
                            Quản lý tất cả CV đã tải lên, chọn CV mặc định và ứng tuyển dễ dàng
                        </p>
                    </motion.div>

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
                                label: "Mặc định",
                                value: statusCounts.primary,
                                icon: Star,
                                color: "from-amber-500 to-amber-600",
                            },
                            {
                                label: "Tải lên",
                                value: statusCounts.uploaded,
                                icon: Upload,
                                color: "from-blue-500 to-blue-600",
                            },
                            {
                                label: "Tạo từ Builder",
                                value: statusCounts.generated,
                                icon: FolderOpen,
                                color: "from-purple-500 to-purple-600",
                            },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                className="bg-white dark:bg-[#1C252E] rounded-2xl p-4 border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-sm"
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

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#919EAB]" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm CV..."
                                className="w-full pl-12 pr-4 py-3.5 rounded-full border-2 border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] text-[#1C252E] dark:text-white placeholder:text-[#919EAB] focus:border-green-500 dark:focus:border-green-400 outline-none transition-all"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setUploadModalOpen(true)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            <Upload className="w-5 h-5" />
                            <span>Tải mới lên</span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 pb-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
                                        : "bg-white dark:bg-[#1C252E] text-[#637381] dark:text-[#919EAB] border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08]"
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

                    <div className="relative" ref={sortMenuRef}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowSortMenu(!showSortMenu)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] text-[#637381] dark:text-[#919EAB] text-sm font-medium"
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
                                                    : "text-[#637381] dark:text-[#919EAB]"
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

                <div className="space-y-4 min-h-[400px]">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-48">
                            <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
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
                                            onDelete={handleDelete}
                                            onSetDefault={handleSetDefault}
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

            <UploadCVModal
                isOpen={uploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                onUpload={() => {
                    fetchCvFiles();
                }}
            />

            <DeleteConfirmDialog
                isOpen={deleteDialogOpen}
                fileName={selectedFile?.fileName || ""}
                onConfirm={confirmDelete}
                onCancel={() => {
                    setDeleteDialogOpen(false);
                    setSelectedFile(null);
                }}
            />
        </div>
    );
}
