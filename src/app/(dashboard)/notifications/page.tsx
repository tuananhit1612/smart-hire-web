"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellRing, CheckCheck, Inbox } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { NotificationCard } from "@/features/notifications/components/notification-card";
import {
    NotificationFilters,
    NotificationFilter,
} from "@/features/notifications/components/notification-filters";
import { mockNotifications, Notification } from "@/features/notifications/types/mock-notifications";
import { RealtimeEventTrigger } from "@/features/notifications/components/realtime-event-trigger";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>(
        () => [...mockNotifications]
    );
    const [filter, setFilter] = useState<NotificationFilter>("all");

    const unreadCount = useMemo(
        () => notifications.filter((n) => !n.isRead).length,
        [notifications]
    );

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

    const handleMarkRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
    };

    const handleMarkAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    };

    return (
        <section className="relative z-10 pt-6 pb-8 md:pt-8 md:pb-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 dark:bg-[#22c55e]/20 flex items-center justify-center">
                            <BellRing className="w-6 h-6 text-[#22c55e] dark:text-[#22c55e]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#1C252E] dark:text-white">
                                Thông báo
                            </h1>
                            <p className="text-base text-[#637381] dark:text-[#919EAB]">
                                {unreadCount > 0
                                    ? `Bạn có ${unreadCount} thông báo chưa đọc`
                                    : "Tất cả thông báo đã được đọc"}
                            </p>
                        </div>
                    </div>

                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleMarkAllRead}
                            className="h-9 text-sm text-[#22c55e] hover:text-[#22c55e] hover:bg-[#22c55e]/10 dark:hover:bg-[#22c55e]/20 rounded-full gap-1.5 cursor-pointer"
                        >
                            <CheckCheck className="w-4 h-4" />
                            Đánh dấu tất cả đã đọc
                        </Button>
                    )}
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <NotificationFilters
                        activeFilter={filter}
                        onFilterChange={setFilter}
                        unreadCount={unreadCount}
                    />
                </motion.div>

                {/* Realtime Event Trigger (Mock) */}
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mb-6"
                >
                    <RealtimeEventTrigger />
                </motion.div>

                {/* Notification List */}
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((notification, index) => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                    onMarkRead={handleMarkRead}
                                    index={index}
                                />
                            ))
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-16 text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] flex items-center justify-center mb-4">
                                    <Inbox className="w-8 h-8 text-[#C4CDD5] dark:text-[#637381]" />
                                </div>
                                <h3 className="text-base font-semibold text-[#637381] dark:text-[#919EAB] mb-1">
                                    Không có thông báo
                                </h3>
                                <p className="text-sm text-[#919EAB] dark:text-[#637381]">
                                    {filter === "unread"
                                        ? "Bạn đã đọc tất cả thông báo rồi 🎉"
                                        : "Chưa có thông báo nào trong mục này."}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

