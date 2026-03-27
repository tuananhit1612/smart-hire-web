/**
 * ═══════════════════════════════════════════════════════════
 *  NotificationProvider — Mounts the realtime hook
 *
 *  Place this inside AuthProvider + ToastProvider in the
 *  root layout. Only activates WebSocket when authenticated.
 * ═══════════════════════════════════════════════════════════
 */

"use client";

import { useRealtimeNotifications } from "../hooks/useRealtimeNotifications";

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    useRealtimeNotifications();
    return <>{children}</>;
}
