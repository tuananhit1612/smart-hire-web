import * as React from "react";
import { useConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { format, formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { History, Save, RotateCcw, Trash2, Clock, Sparkles, X, Eye, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useCVHistory } from "../../hooks/useCVHistory";
import { CVData } from "../../types/types";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils/cn";

export interface VersionHistoryDialogProps {
    currentData: CVData;
    Template?: React.ComponentType<{ data: CVData }>;
    onRestore: (data: CVData) => void;
}

export function VersionHistoryDialog({ currentData, Template, onRestore }: VersionHistoryDialogProps) {
    const { history, saveSnapshot, deleteSnapshot, clearHistory } = useCVHistory();
    const [isOpen, setIsOpen] = React.useState(false);
    const [newVersionName, setNewVersionName] = React.useState("");
    const { confirm, DialogComponent } = useConfirmDialog();

    // Selection & Drag State
    const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
    const [isDragging, setIsDragging] = React.useState(false);
    const [isOverTrash, setIsOverTrash] = React.useState(false);

    const handleSave = () => {
        if (!newVersionName.trim()) return;
        saveSnapshot(currentData, newVersionName);
        setNewVersionName("");
    };

    const handleClearAll = async () => {
        const isConfirmed = await confirm({
            title: "Xóa toàn bộ lịch sử?",
            message: "Hành động này sẽ xóa vĩnh viễn tất cả các bản lưu cũ. Bạn không thể hoàn tác.",
            variant: "danger",
            confirmText: "Xóa tất cả",
            cancelText: "Hủy bỏ"
        });

        if (isConfirmed) {
            clearHistory();
            setSelectedIds(new Set());
        }
    };

    // Multi-select Logic
    const toggleSelection = (id: string, multi: boolean) => {
        let newSet;

        if (multi) {
            newSet = new Set(selectedIds);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
        } else {
            // Single select mode behavior
            // If clicking the ONLY currently selected item -> Deselect it
            if (selectedIds.has(id) && selectedIds.size === 1) {
                newSet = new Set();
            } else {
                // Otherwise, select ONLY this item
                newSet = new Set([id]);
            }
        }

        setSelectedIds(newSet);
    };

    const handleRestore = async (data: CVData) => {
        const isConfirmed = await confirm({
            title: "Khôi phục phiên bản này?",
            message: "Nội dung CV hiện tại của bạn sẽ bị thay thế bởi phiên bản đã chọn. Bạn có chắc không?",
            variant: "info",
            confirmText: "Khôi phục",
            cancelText: "Hủy bỏ"
        });

        if (isConfirmed) {
            onRestore(data);
            setIsOpen(false);
        }
    };

    const handleDeleteSelected = () => {
        selectedIds.forEach(id => deleteSnapshot(id));
        setSelectedIds(new Set());
        setIsOverTrash(false);
    };

    // Drag Handlers
    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData("text/plain", id);
        e.dataTransfer.effectAllowed = "move";
        setIsDragging(true);

        if (!selectedIds.has(id)) {
            setSelectedIds(new Set([id]));
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setIsOverTrash(false);
    };

    const handleDropOnTrash = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleDeleteSelected();
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 flex items-center gap-2 px-3 rounded-md text-sm font-medium transition-all !ring-0 !outline-none !border-transparent border-0 ring-0 outline-none shadow-none hover:shadow-none focus:ring-0 focus:outline-none focus:border-transparent text-slate-600 hover:text-sky-600 hover:bg-sky-50 active:bg-sky-100 active:text-sky-700 active:shadow-inner select-none"
                    style={{ boxSizing: 'border-box' }}
                >
                    <History className="w-4 h-4" />
                    <span className="hidden xl:inline">Lịch sử</span>
                </Button>
            </DialogTrigger>

            <DialogContent className={cn(
                "fixed left-[50%] top-[50%] z-[101] grid w-full max-w-[98vw] h-[95vh] translate-x-[-50%] translate-y-[-50%] gap-0 border-0 p-0 shadow-2xl duration-300 sm:rounded-[24px] overflow-hidden",
                "bg-white/95 backdrop-blur-3xl ring-1 ring-white/50",
                "data-[state=open]:animate-in data-[state=closed]:animate-out"
            )}>
                {DialogComponent}
                <div className="flex flex-col h-full bg-slate-50/50">

                    {/* 1. HEADER */}
                    <div className="px-8 py-4 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between shrink-0 z-20 shadow-sm">
                        <DialogHeader className="p-0 text-left">
                            <DialogTitle className="flex items-center gap-3 text-slate-800 text-2xl font-bold font-be-vietnam">
                                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-600 text-white shadow-md shadow-sky-600/20">
                                    <History className="w-5 h-5" />
                                </span>
                                <div>
                                    <div className="leading-none">Lịch sử phiên bản</div>
                                    <div className="text-sm font-medium text-slate-400 font-normal mt-1">
                                        {history.length} bản lưu • Kéo thả để xóa
                                    </div>
                                </div>
                            </DialogTitle>
                        </DialogHeader>

                        {/* Right Toolbar */}
                        <div className="flex items-center gap-3">
                            {/* CLEAR ALL BUTTON */}
                            {history.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleClearAll}
                                    className="h-10 w-10 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors mr-2"
                                    title="Xóa tất cả lịch sử"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            )}

                            {/* TRASH ZONE (Header) */}
                            <AnimatePresence>
                                {(isDragging || selectedIds.size > 0) && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                                    >
                                        <div
                                            className={cn(
                                                "flex items-center gap-2 px-6 h-11 rounded-full border-2 transition-all cursor-pointer font-bold text-sm select-none",
                                                isOverTrash
                                                    ? "bg-red-500 border-red-500 text-white shadow-lg scale-105"
                                                    : "bg-red-50 border-red-100 text-red-500 hover:bg-red-100 hover:border-red-200"
                                            )}
                                            onDragOver={(e) => { e.preventDefault(); setIsOverTrash(true); }}
                                            onDragLeave={() => setIsOverTrash(false)}
                                            onDrop={handleDropOnTrash}
                                            onClick={handleDeleteSelected}
                                            title="Kéo thả vào đây hoặc Click để xóa"
                                        >
                                            <Trash2 className={cn("w-4 h-4", isOverTrash && "animate-bounce")} />
                                            <span>
                                                {isOverTrash ? "Thả ngay!" : `Xóa (${selectedIds.size})`}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Save Input */}
                            <div className="relative w-64 group">
                                <Input
                                    placeholder="Tên phiên bản mới..."
                                    value={newVersionName}
                                    onChange={(e) => setNewVersionName(e.target.value)}
                                    className="pl-4 pr-10 h-11 rounded-full border-slate-200 bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all font-be-vietnam text-sm"
                                />
                                <Save className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
                            </div>

                            <Button
                                onClick={handleSave}
                                disabled={!newVersionName.trim()}
                                className="h-11 px-6 rounded-full bg-slate-900 hover:bg-sky-600 text-white font-bold shadow-lg active:scale-95 transition-all"
                            >
                                Lưu
                            </Button>

                            <div className="w-px h-8 bg-slate-200 mx-1"></div>

                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-10 w-10 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                                <X className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>

                    {/* 2. GALLERY GRID (Vertical Scroll) */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative bg-slate-50">
                        {history.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full opacity-60">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                    <Sparkles className="w-10 h-10 text-sky-200" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700">Chưa có bản lưu nào</h3>
                                <p className="text-slate-400 text-sm">Hãy lưu lại cột mốc đầu tiên của bạn</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 pb-20">
                                <AnimatePresence initial={false} mode="popLayout">
                                    {history.map((item, index) => {
                                        const isLatest = index === 0;
                                        const isSelected = selectedIds.has(item.id);
                                        const timeAgo = formatDistanceToNow(new Date(item.timestamp), { addSuffix: true, locale: vi });

                                        return (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                                                className={cn(
                                                    "group relative bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col transition-all duration-300",
                                                    "border hover:shadow-xl hover:-translate-y-1",
                                                    isSelected ? "ring-2 ring-sky-500 border-sky-500 shadow-md transform scale-[1.02] z-10" :
                                                        (isLatest ? "border-sky-200 ring-2 ring-sky-50 shadow-md" : "border-slate-200 shadow-sm")
                                                )}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e as any, item.id)}
                                                onDragEnd={handleDragEnd}
                                                onClick={(e) => toggleSelection(item.id, e.ctrlKey || e.metaKey)}
                                            >
                                                {/* Selection Checkbox */}
                                                <div className={cn(
                                                    "absolute top-3 left-3 z-20 w-5 h-5 rounded-md border-2 bg-white flex items-center justify-center transition-all shadow-sm",
                                                    isSelected ? "border-sky-500 bg-sky-500 text-white" : "border-slate-200 opacity-0 group-hover:opacity-100"
                                                )}>
                                                    {isSelected && <Check className="w-3 h-3" />}
                                                </div>

                                                {/* Latest Badge */}
                                                {isLatest && (
                                                    <div className="absolute top-3 right-3 z-20 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                                        Mới nhất
                                                    </div>
                                                )}

                                                {/* PREVIEW AREA (Card Top) */}
                                                <div className="relative w-full aspect-[210/297] bg-slate-100 overflow-hidden border-b border-slate-100 group-hover:border-slate-200">
                                                    {/* Scale Wrapper to Center Content */}
                                                    <div className="absolute inset-0 flex items-center justify-center p-4">
                                                        <div className="relative w-full h-full flex items-center justify-center">
                                                            {Template ? (
                                                                <div className="transform scale-[0.25] origin-center shadow-lg bg-white">
                                                                    <div className="w-[210mm] h-[297mm] pointer-events-none select-none bg-white">
                                                                        <Template data={item.data} />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">Preview</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Hover Overlay Actions */}
                                                    {/* Hover Action - Revert Only */}
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none">
                                                        <Button
                                                            size="icon"
                                                            title="Sử dụng phiên bản này (Thay thế hiện tại)"
                                                            onClick={(e) => { e.stopPropagation(); handleRestore(item.data); }}
                                                            className="pointer-events-auto h-12 w-12 rounded-full bg-white/95 backdrop-blur-sm text-sky-600 shadow-xl border border-sky-100 hover:bg-sky-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300"
                                                        >
                                                            <RotateCcw className="w-6 h-6" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* CARD FOOTER (Info) */}
                                                <div className="p-3 bg-white flex flex-col gap-1">
                                                    <h4 className="font-bold text-sm text-slate-800 truncate" title={item.name}>{item.name}</h4>
                                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            <span>{format(new Date(item.timestamp), "HH:mm")}</span>
                                                        </div>
                                                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">
                                                            #{history.length - index}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
