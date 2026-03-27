"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  RealtimeProvider — Root-level component for WebSocket
 *
 *  Place this inside the authenticated layout to:
 *  1. Connect to WebSocket on login
 *  2. Show toast notifications for realtime events
 *  3. Fetch initial unread count from REST API
 * ═══════════════════════════════════════════════════════════
 */

import React, { useEffect } from "react";
import { useWebSocket } from "@/shared/hooks/use-websocket";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useNotificationStore } from "@/features/notifications/stores/notification-store";
import { useToastHelpers } from "@/shared/components/ui/toast";
import type { RealtimeEvent } from "@/shared/types/realtime";
import { EventType } from "@/shared/types/realtime";

/** Human-readable labels for toast messages */
const EVENT_LABELS: Record<string, { title: string; description: (p: Record<string, unknown>) => string }> = {
  [EventType.APPLICATION_SUBMITTED]: {
    title: "📋 Ứng tuyển mới!",
    description: (p) => `Có ứng viên mới apply "${p.jobTitle ?? "Việc làm"}"`,
  },
  [EventType.APPLICATION_STAGE_CHANGED]: {
    title: "🔄 Cập nhật trạng thái",
    description: (p) =>
      `Đơn ứng tuyển "${p.jobTitle ?? ""}" chuyển sang ${p.toStage ?? "trạng thái mới"}`,
  },
  [EventType.NEW_NOTIFICATION]: {
    title: "🔔 Thông báo mới",
    description: (p) => (p as { title?: string }).title ?? "Bạn có thông báo mới",
  },
};

export function RealtimeProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const { fetchUnreadCount } = useNotificationStore();
  const toast = useToastHelpers();

  // Fetch initial unread count when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchUnreadCount();
    }
  }, [isAuthenticated, fetchUnreadCount]);

  // Connect WebSocket + handle incoming events with toast
  useWebSocket({
    onEvent: (event: RealtimeEvent) => {
      const label = EVENT_LABELS[event.type];
      if (label) {
        const payload = (event.payload ?? {}) as Record<string, unknown>;
        toast.success(label.title, label.description(payload));
      }
    },
  });

  return <>{children}</>;
}
