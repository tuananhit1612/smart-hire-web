"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, TrendingUp, Clock, SortAsc, Check } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export type SortOption = 'popular' | 'newest' | 'name';

interface SortDropdownProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string; icon: React.ElementType; color: string }[] = [
    { value: 'popular', label: 'Phổ biến nhất', icon: TrendingUp, color: "text-amber-500" },
    { value: 'newest', label: 'Mới nhất', icon: Clock, color: "text-emerald-500" },
    { value: 'name', label: 'Tên A-Z', icon: SortAsc, color: "text-sky-500" }
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const currentOption = sortOptions.find(o => o.value === value) || sortOptions[0];
    const CurrentIcon = currentOption.icon;

    // Close on click outside
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                    "bg-white border border-gray-200",
                    "hover:border-sky-300 hover:shadow-md",
                    isOpen && "border-sky-500 ring-4 ring-sky-500/10 shadow-lg"
                )}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 360 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <CurrentIcon className={cn("w-4 h-4", currentOption.color)} />
                </motion.div>
                <span className="text-gray-700">{currentOption.label}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </motion.div>
            </motion.button>

            {/* Dropdown menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute right-0 top-full mt-2 w-52 py-2 bg-white rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Decorative gradient line */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500" />

                        {sortOptions.map((option, index) => {
                            const Icon = option.icon;
                            const isSelected = value === option.value;

                            return (
                                <motion.button
                                    key={option.value}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 4 }}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200",
                                        isSelected
                                            ? "bg-gradient-to-r from-sky-50 to-emerald-50"
                                            : "hover:bg-gray-50"
                                    )}
                                >
                                    <motion.div
                                        animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Icon className={cn("w-4 h-4", option.color)} />
                                    </motion.div>
                                    <span className={cn(
                                        "flex-1 text-left",
                                        isSelected
                                            ? "font-semibold text-sky-600"
                                            : "text-gray-700"
                                    )}>
                                        {option.label}
                                    </span>

                                    {/* Animated checkmark */}
                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                exit={{ scale: 0, rotate: 180 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className="w-5 h-5 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 flex items-center justify-center"
                                            >
                                                <Check className="w-3 h-3 text-white" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
