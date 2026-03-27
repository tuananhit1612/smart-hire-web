"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  useWebSocket — React hook for STOMP WebSocket connection
 *
 *  Manages connect/disconnect lifecycle tied to auth state.
 *  Subscribes to the user's personal notification queue and
 *  dispatches events to the notification store.
 * ═══════════════════════════════════════════════════════════
 */

import { useEffect, useRef } from "react";
import type { Client, IMessage } from "@stomp/stompjs";
import { createStompClient } from "@/shared/lib/websocket-client";
import { tokenStorage } from "@/features/auth/lib/token-storage";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useNotificationStore } from "@/features/notifications/stores/notification-store";
import type { RealtimeEvent } from "@/shared/types/realtime";
import type { NotificationDto } from "@/features/notifications/api/notification-api";
import { EventType } from "@/shared/types/realtime";

interface UseWebSocketOptions {
  /** Callback when any realtime event arrives */
  onEvent?: (event: RealtimeEvent) => void;
}

/**
 * Hook that manages the STOMP WebSocket lifecycle.
 * Only connects when the user is authenticated.
 */
export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { user, isAuthenticated } = useAuth();
  const clientRef = useRef<Client | null>(null);
  const { addRealtimeNotification, fetchUnreadCount } =
    useNotificationStore();

  useEffect(() => {
    // Only connect when authenticated
    if (!isAuthenticated || !user) return;

    const token = tokenStorage.getAccessToken();
    if (!token) return;

    const client = createStompClient(token);
    clientRef.current = client;

    client.onConnect = () => {
      console.info("[WebSocket] Connected as user:", user.id);

      // Subscribe to personal notification queue
      client.subscribe(
        `/user/${user.id}/queue/notifications`,
        (message: IMessage) => {
          try {
            const event: RealtimeEvent = JSON.parse(message.body);
            console.info("[WebSocket] Received event:", event.type);

            // Handle NEW_NOTIFICATION events → add to store
            if (event.type === EventType.NEW_NOTIFICATION) {
              const notif = event.payload as NotificationDto;
              addRealtimeNotification(notif);
            } else {
              // For other events, just bump the unread count
              // (the backend also creates a notification for stage changes, etc.)
              fetchUnreadCount();
            }

            // Fire custom callback
            options.onEvent?.(event);
          } catch (err) {
            console.error("[WebSocket] Error parsing message:", err);
          }
        }
      );
    };

    client.onStompError = (frame) => {
      console.error("[WebSocket] STOMP error:", frame.headers.message);
    };

    client.onWebSocketClose = () => {
      console.info("[WebSocket] Connection closed, will auto-reconnect...");
    };

    // Activate (connect)
    client.activate();

    // Cleanup on unmount or auth change
    return () => {
      if (clientRef.current?.active) {
        clientRef.current.deactivate();
        clientRef.current = null;
        console.info("[WebSocket] Disconnected");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.id]);
}
