"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";

interface Tab {
    id: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (id: string) => void;
    className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
    return (
        <div
            className={cn(
                "flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-zinc-800/50",
                className
            )}
        >
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={cn(
                        "relative flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2",
                        activeTab === tab.id
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    )}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                >
                    {activeTab === tab.id && (
                        <motion.span
                            layoutId="bubble"
                            className="absolute inset-0 z-10 bg-white shadow-sm dark:bg-zinc-700"
                            style={{ borderRadius: 8 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-20">{tab.label}</span>
                </button>
            ))}
        </div>
    );
}
