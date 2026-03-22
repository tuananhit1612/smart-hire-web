"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Plus, X, ChevronDown, Check } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { Language } from "../../types/types";
import { cn } from "@/lib/utils";

interface LanguagesSectionProps {
    data: Language[];
    onChange: (data: Language[]) => void;
}

const LANGUAGE_LEVELS: { value: Language["level"]; label: string; color: string }[] = [
    { value: "beginner", label: "Sơ cấp", color: "bg-gray-400" },
    { value: "elementary", label: "Cơ bản", color: "bg-blue-400" },
    { value: "intermediate", label: "Trung cấp", color: "bg-green-400" },
    { value: "upper-intermediate", label: "Trung cấp cao", color: "bg-green-500" },
    { value: "advanced", label: "Nâng cao", color: "bg-teal-500" },
    { value: "native", label: "Bản ngữ", color: "bg-purple-500" },
];

const LANGUAGE_SUGGESTIONS = [
    "Tiếng Việt", "Tiếng Anh", "Tiếng Nhật", "Tiếng Hàn", "Tiếng Trung",
    "Tiếng Pháp", "Tiếng Đức", "Tiếng Tây Ban Nha", "Tiếng Nga", "Tiếng Thái",
];

const generateId = () => Math.random().toString(36).substr(2, 9);

// Custom Level Dropdown
function LevelDropdown({
    value,
    onChange,
}: {
    value: Language["level"];
    onChange: (level: Language["level"]) => void;
}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const currentLevel = LANGUAGE_LEVELS.find(l => l.value === value) || LANGUAGE_LEVELS[2];

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 h-9 px-3 rounded-xl border border-gray-200 dark:border-zinc-700",
                    "bg-white dark:bg-zinc-800 text-sm font-medium",
                    "hover:border-green-400 dark:hover:border-green-500",
                    "focus:outline-none focus:ring-2 focus:ring-green-500",
                    "transition-all duration-200 w-full"
                )}
            >
                <span className={cn("w-2.5 h-2.5 rounded-full", currentLevel.color)} />
                <span className="text-gray-700 dark:text-gray-200 flex-1 text-left">{currentLevel.label}</span>
                <ChevronDown className={cn(
                    "w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200",
                    isOpen && "rotate-180"
                )} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-30 mt-1 w-full min-w-[160px] bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg overflow-hidden"
                    >
                        {LANGUAGE_LEVELS.map((level) => (
                            <button
                                key={level.value}
                                type="button"
                                onClick={() => { onChange(level.value); setIsOpen(false); }}
                                className={cn(
                                    "flex items-center gap-2 w-full px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-200",
                                    "hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors",
                                    value === level.value && "bg-green-50 dark:bg-green-900/30"
                                )}
                            >
                                <span className={cn("w-2.5 h-2.5 rounded-full", level.color)} />
                                <span className="flex-1">{level.label}</span>
                                {value === level.value && <Check className="w-4 h-4 text-green-500" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function LanguagesSection({ data, onChange }: LanguagesSectionProps) {
    const { DialogComponent, confirm } = useConfirmDialog();

    const addLanguage = () => {
        onChange([...data, { id: generateId(), name: "", level: "intermediate" }]);
    };

    const updateLanguage = (id: string, field: keyof Language, value: string) => {
        onChange(data.map(lang => lang.id === id ? { ...lang, [field]: value } : lang));
    };

    const removeLanguage = async (id: string) => {
        const lang = data.find(l => l.id === id);
        const confirmed = await confirm({
            title: "Xóa ngôn ngữ",
            message: `Bạn có chắc muốn xóa "${lang?.name || "ngôn ngữ này"}"?`,
            confirmText: "Xóa",
            cancelText: "Hủy",
            variant: "danger",
        });
        if (confirmed) {
            onChange(data.filter(l => l.id !== id));
        }
    };

    const addFromSuggestion = (name: string) => {
        if (!data.some(l => l.name === name)) {
            onChange([...data, { id: generateId(), name, level: "intermediate" }]);
        }
    };

    const availableSuggestions = LANGUAGE_SUGGESTIONS.filter(
        s => !data.some(l => l.name === s)
    );

    return (
        <div className="space-y-6">
            {DialogComponent}

            {/* Header */}
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-zinc-700">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
                    <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Ngôn ngữ</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Trình độ ngoại ngữ của bạn</p>
                </div>
            </div>

            {/* Language Items */}
            <AnimatePresence mode="popLayout">
                {data.map((lang) => (
                    <motion.div
                        key={lang.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        layout
                        className="group relative flex items-center gap-3 bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-2xl p-4 hover:border-purple-200 dark:hover:border-purple-700 hover:shadow-md transition-all duration-200"
                    >
                        <div className="flex-1 grid grid-cols-2 gap-3">
                            <Input
                                value={lang.name}
                                onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                                placeholder="Tên ngôn ngữ"
                                className="h-9 rounded-xl"
                            />
                            <LevelDropdown
                                value={lang.level}
                                onChange={(level) => updateLanguage(lang.id, "level", level)}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeLanguage(lang.id)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                        >
                            <X className="w-4 h-4 text-red-400" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Add Button */}
            <Button
                variant="outline"
                size="md"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={addLanguage}
                className="w-full border-dashed border-gray-300 dark:border-zinc-600 hover:border-purple-400 hover:text-purple-600"
            >
                Thêm ngôn ngữ
            </Button>

            {/* Suggestions */}
            {availableSuggestions.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">Gợi ý</p>
                    <div className="flex flex-wrap gap-2">
                        {availableSuggestions.slice(0, 6).map((name) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => addFromSuggestion(name)}
                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700 transition-all"
                            >
                                <Plus className="w-3 h-3" />
                                {name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
