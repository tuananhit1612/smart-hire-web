"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  NotificationProvider
 *
 *  Mount trong root layout (bên trong AuthProvider + ToastProvider).
 *  Kích hoạt WebSocket khi user authenticated.
 * ═══════════════════════════════════════════════════════════
 */

import type { ReactNode } from "react";
import { useRealtimeNotifications } from "../hooks/useRealtimeNotifications";

interface Props {
    readonly children: ReactNode;
}

export function NotificationProvider({ children }: Props) {
    useRealtimeNotifications();
    return <>{children}</>;
}
