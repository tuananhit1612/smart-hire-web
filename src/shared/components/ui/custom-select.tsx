"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface SelectOption {
    value: string;
    label: string;
    icon?: React.ElementType;
}

interface CustomSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    required?: boolean;
    placeholder?: string;
}

export function CustomSelect({
    label,
    value,
    onChange,
    options,
    required,
    placeholder = "Chọn...",
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    // Close on click outside
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close on escape
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    return (
        <div className="space-y-1.5" ref={ref}>
            <label className="block text-sm font-semibold text-sky-800">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 bg-white border-2 rounded-2xl transition-all text-left text-base ${isOpen
                            ? "border-sky-400 ring-4 ring-sky-100"
                            : "border-sky-100 hover:border-sky-200"
                        }`}
                >
                    <span className={selectedOption ? "text-sky-900" : "text-sky-300"}>
                        {selectedOption?.label || placeholder}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-5 h-5 text-sky-400" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl border border-sky-100 overflow-hidden"
                        >
                            <div className="max-h-64 overflow-y-auto py-2">
                                {options.map((option) => {
                                    const isSelected = option.value === value;
                                    const Icon = option.icon;
                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => {
                                                onChange(option.value);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${isSelected
                                                    ? "bg-sky-50 text-sky-700"
                                                    : "text-sky-800 hover:bg-sky-50"
                                                }`}
                                        >
                                            {Icon && <Icon className="w-4 h-4 text-sky-400" />}
                                            <span className="flex-1">{option.label}</span>
                                            {isSelected && (
                                                <Check className="w-4 h-4 text-sky-600" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
