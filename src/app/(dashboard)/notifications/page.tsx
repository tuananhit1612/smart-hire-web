"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellRing, CheckCheck, Inbox, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { NotificationCard } from "@/features/notifications/components/notification-card";
import {
    NotificationFilters,
    NotificationFilter,
} from "@/features/notifications/components/notification-filters";
import { useNotificationStore } from "@/features/notifications/stores/notification-store";
import { RealtimeEventTrigger } from "@/features/notifications/components/realtime-event-trigger";

export default function NotificationsPage() {
    const { 
        notifications, 
        unreadCount, 
        isLoading, 
        fetchNotifications, 
        markAsRead, 
        markAllAsRead, 
        currentPage, 
        totalPages 
    } = useNotificationStore();

    const [filter, setFilter] = useState<NotificationFilter>("all");

    // Fetch initial data
    useEffect(() => {
        fetchNotifications(0);
    }, [fetchNotifications]);

    const filteredNotifications = useMemo(() => {
        switch (filter) {
            case "unread":
                return notifications.filter((n) => !n.isRead);
            case "read":
                return notifications.filter((n) => n.isRead);
            default:
                return notifications;
        }
    }, [notifications, filter]);

    const handleLoadMore = () => {
        if (currentPage < totalPages - 1) {
            fetchNotifications(currentPage + 1);
        }
    };

    return (
        <section className="relative z-10 pt-6 pb-8 md:pt-8 md:pb-12 min-h-screen bg-[rgba(145,158,171,0.02)] dark:bg-transparent">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22c55e] to-emerald-400 flex items-center justify-center shadow-lg shadow-[#22c55e]/20">
                            <BellRing className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#1C252E] dark:text-white tracking-tight">
                                Thông báo
                            </h1>
                            <p className="text-sm font-medium text-[#637381] dark:text-[#919EAB]">
                                {unreadCount > 0
                                    ? `Bạn có ${unreadCount} thông báo chưa đọc`
                                    : "Tất cả thông báo đã được đọc 🎉"}
                            </p>
                        </div>
                    </div>

                    {unreadCount > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={markAllAsRead}
                            className={cn(
                                "h-10 px-4 text-sm font-bold text-[#22c55e] border-[#22c55e]/20 hover:bg-[#22c55e]/5 rounded-xl gap-2 transition-all",
                                "hover:border-[#22c55e]/50 hover:scale-[1.02] active:scale-95"
                            )}
                        >
                            <CheckCheck className="w-4 h-4" />
                            Đánh dấu tất cả đã đọc
                        </Button>
                    )}
                </motion.div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <NotificationFilters
                            activeFilter={filter}
                            onFilterChange={setFilter}
                            unreadCount={unreadCount}
                        />
                    </motion.div>

                    {/* Mock trigger - helpful for testing */}
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <RealtimeEventTrigger />
                    </motion.div>
                </div>

                {/* Notification List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {filteredNotifications.length > 0 ? (
                            <>
                                {filteredNotifications.map((notification, index) => (
                                    <NotificationCard
                                        key={notification.id}
                                        notification={notification as any}
                                        onMarkRead={(id) => markAsRead(Number(id))}
                                        index={index}
                                    />
                                ))}
                                
                                {currentPage < totalPages - 1 && (
                                    <div className="flex justify-center pt-8 pb-4">
                                        <Button
                                            variant="ghost"
                                            onClick={handleLoadMore}
                                            disabled={isLoading}
                                            className="text-[#637381] hover:text-[#22c55e] hover:bg-[#22c55e]/5 font-bold"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                            ) : null}
                                            Tải thêm thông báo
                                        </Button>
                                    </div>
                                )}
                            </>
                        ) : isLoading ? (
                            <div className="flex flex-col items-center justify-center py-24 space-y-4">
                                <Loader2 className="w-10 h-10 text-[#22c55e] animate-spin" />
                                <p className="text-[#637381] font-medium">Đang tải thông báo...</p>
                            </div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-[#1C252E] rounded-3xl border border-[rgba(145,158,171,0.12)] shadow-sm"
                            >
                                <div className="w-20 h-20 rounded-full bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] flex items-center justify-center mb-6">
                                    <Inbox className="w-10 h-10 text-[#C4CDD5] dark:text-[#637381]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1C252E] dark:text-white mb-2">
                                    Không có thông báo
                                </h3>
                                <p className="text-[#637381] dark:text-[#919EAB] max-w-xs">
                                    {filter === "unread"
                                        ? "Tuyệt vời! Bạn đã đọc sạch sẽ mọi thông báo mới rồi 🚀"
                                        : "Vùng đất này có vẻ yên tĩnh... Hiện tại chưa có thông báo nào dành cho bạn."}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

// Internal cn helper if not available from shared utility
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}

