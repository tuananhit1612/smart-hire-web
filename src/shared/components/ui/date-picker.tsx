"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
    label?: string;
    value?: string; // Format: YYYY-MM
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    minDate?: string;
    maxDate?: string;
}

const MONTHS = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
    "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
    "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

export function DatePicker({
    label,
    value,
    onChange,
    placeholder = "Chọn tháng/năm",
    disabled = false,
    className,
    minDate,
    maxDate,
}: DatePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [viewYear, setViewYear] = React.useState(() => {
        if (value) {
            return parseInt(value.split("-")[0]);
        }
        return new Date().getFullYear();
    });

    const containerRef = React.useRef<HTMLDivElement>(null);

    // Parse current value
    const selectedYear = value ? parseInt(value.split("-")[0]) : null;
    const selectedMonth = value ? parseInt(value.split("-")[1]) - 1 : null;

    // Close on outside click
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Check if month is selectable
    const isMonthDisabled = (year: number, month: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}`;
        if (minDate && dateStr < minDate) return true;
        if (maxDate && dateStr > maxDate) return true;
        return false;
    };

    const handleMonthSelect = (month: number) => {
        const dateStr = `${viewYear}-${String(month + 1).padStart(2, "0")}`;
        onChange?.(dateStr);
        setIsOpen(false);
    };

    const formatDisplayValue = () => {
        if (!value) return "";
        const [year, month] = value.split("-");
        return `${MONTHS[parseInt(month) - 1]} ${year}`;
    };

    return (
        <div ref={containerRef} className={cn("relative", className)}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label}
                </label>
            )}

            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200",
                    "bg-transparent text-sm",
                    disabled
                        ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-zinc-800"
                        : "hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer",
                    isOpen
                        ? "border-indigo-500 ring-2 ring-indigo-500/20"
                        : "border-gray-200 dark:border-zinc-800",
                    value ? "text-gray-900 dark:text-white" : "text-gray-400"
                )}
            >
                <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="flex-1">
                    {value ? formatDisplayValue() : placeholder}
                </span>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 mt-2 w-full min-w-[280px] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl p-4"
                >
                    {/* Year Selector */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            type="button"
                            onClick={() => setViewYear((y) => y - 1)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            {viewYear}
                        </span>
                        <button
                            type="button"
                            onClick={() => setViewYear((y) => y + 1)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Month Grid */}
                    <div className="grid grid-cols-3 gap-2">
                        {MONTHS.map((monthName, index) => {
                            const isSelected = selectedYear === viewYear && selectedMonth === index;
                            const isDisabled = isMonthDisabled(viewYear, index);

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => !isDisabled && handleMonthSelect(index)}
                                    disabled={isDisabled}
                                    className={cn(
                                        "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                        isDisabled && "opacity-40 cursor-not-allowed",
                                        isSelected
                                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                                            : "hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                                    )}
                                >
                                    {monthName.replace("Tháng ", "T")}
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-zinc-800">
                        <button
                            type="button"
                            onClick={() => {
                                const now = new Date();
                                setViewYear(now.getFullYear());
                                handleMonthSelect(now.getMonth());
                            }}
                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            Hiện tại
                        </button>
                        {value && (
                            <button
                                type="button"
                                onClick={() => {
                                    onChange?.("");
                                    setIsOpen(false);
                                }}
                                className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                            >
                                Xóa
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
