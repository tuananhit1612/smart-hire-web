"use client";

import { cn } from "@/shared/utils/cn";

export type NotificationFilter = "all" | "unread" | "read";

interface NotificationFiltersProps {
    readonly activeFilter: NotificationFilter;
    readonly onFilterChange: (filter: NotificationFilter) => void;
    readonly unreadCount: number;
}

const FILTERS: { key: NotificationFilter; label: string }[] = [
    { key: "all", label: "Tất cả" },
    { key: "unread", label: "Chưa đọc" },
    { key: "read", label: "Đã đọc" },
];

export function NotificationFilters({ activeFilter, onFilterChange, unreadCount }: NotificationFiltersProps) {
    return (
        <div className="flex items-center gap-2">
            {FILTERS.map((f) => (
                <button
                    key={f.key}
                    onClick={() => onFilterChange(f.key)}
                    className={cn(
                        "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer",
                        activeFilter === f.key
                            ? "bg-sky-600 text-white shadow-md shadow-sky-600/25"
                            : "bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-700"
                    )}
                >
                    {f.label}
                    {f.key === "unread" && unreadCount > 0 && (
                        <span
                            className={cn(
                                "absolute -top-1.5 -right-1.5 min-w-5 h-5 flex items-center justify-center",
                                "text-[10px] font-bold rounded-full px-1",
                                activeFilter === "unread"
                                    ? "bg-white text-sky-600"
                                    : "bg-red-500 text-white"
                            )}
                        >
                            {unreadCount}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}
