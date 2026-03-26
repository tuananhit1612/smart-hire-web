"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  RealtimeProvider — Bridges SSE events to Zustand stores
 *
 *  Wraps the app tree. When the user is authenticated,
 *  it connects the RealtimeService and routes incoming
 *  server events to the appropriate store actions.
 *
 *  Renders a small connection-status indicator for debugging.
 * ═══════════════════════════════════════════════════════════
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { RealtimeService, type ServerEvent } from "@/core/realtime/realtime-service";
import { useNotificationStore } from "@/features/notifications/stores/notification-store";
import { tokenStorage } from "@/features/auth/lib/token-storage";
import {
  type Notification,
  type NotificationType,
  type NotificationCategory,
} from "@/features/notifications/types/mock-notifications";

// ─── Event → Store Router ────────────────────────────────

function handleServerEvent(event: ServerEvent): void {
  const { addRealtimeNotification, fetchNotifications } =
    useNotificationStore.getState();

  switch (event.type) {
    case "NOTIFICATION": {
      const p = event.payload;
      const notification: Notification = {
        id: String(p.id ?? Date.now()),
        type: (p.type as NotificationType) ?? "SYSTEM",
        category: (p.category as NotificationCategory) ?? "SYSTEM_UPDATE",
        title: String(p.title ?? "Thông báo mới"),
        message: String(p.message ?? ""),
        isRead: false,
        createdAt: String(p.createdAt ?? new Date().toISOString()),
        link: p.link ? String(p.link) : undefined,
        metadata: p.metadata as Notification["metadata"],
      };
      addRealtimeNotification(notification);
      break;
    }

    case "APPLICATION_UPDATE":
      // Trigger a re-fetch so the applications page picks up changes
      fetchNotifications();
      break;

    case "POLL_UPDATE":
      // Polling fallback — refresh notification list from server
      fetchNotifications();
      break;

    default:
      // Unknown event type — silently ignore
      break;
  }
}

// ─── Provider Component ──────────────────────────────────

interface RealtimeProviderProps {
  readonly children: ReactNode;
}

export function RealtimeProvider({ children }: RealtimeProviderProps) {
  const serviceRef = useRef<RealtimeService | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Only connect on the client when a token exists
    const token = tokenStorage.getAccessToken();
    if (!token) return;

    const service = new RealtimeService(handleServerEvent, setIsConnected);
    serviceRef.current = service;
    service.connect();

    return () => {
      service.disconnect();
      serviceRef.current = null;
    };
  }, []);

  return (
    <>
      {children}

      {/* Minimal connection indicator (bottom-right, dev-friendly) */}
      {process.env.NODE_ENV === "development" && (
        <div
          className="fixed bottom-4 right-4 z-[9999] flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border shadow-sm pointer-events-none select-none"
          style={{
            background: isConnected
              ? "rgba(34, 197, 94, 0.1)"
              : "rgba(145, 158, 171, 0.1)",
            borderColor: isConnected
              ? "rgba(34, 197, 94, 0.3)"
              : "rgba(145, 158, 171, 0.2)",
            color: isConnected ? "#22c55e" : "#919EAB",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: isConnected ? "#22c55e" : "#919EAB",
              boxShadow: isConnected ? "0 0 6px #22c55e" : "none",
            }}
          />
          {isConnected ? "Realtime" : "Polling"}
        </div>
      )}
    </>
  );
}
