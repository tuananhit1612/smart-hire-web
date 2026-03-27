/**
 * ═══════════════════════════════════════════════════════════
 *  WebSocket STOMP Client — Singleton
 *
 *  Kết nối tới Spring Boot backend qua SockJS + STOMP.
 *    • JWT auth trên CONNECT frame
 *    • Auto-reconnect (exponential backoff, built-in @stomp/stompjs)
 *    • Quản lý subscription theo destination
 *    • Phát connection status cho subscribers
 * ═══════════════════════════════════════════════════════════
 */

import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { SocketConnectionStatus } from "../types/notification-types";

// ─── Config ──────────────────────────────────────────────

const WS_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") ?? "http://localhost:8080";
const WS_ENDPOINT = `${WS_BASE_URL}/ws`;

const RECONNECT_DELAY_MS = 3_000;
const HEARTBEAT_MS = 10_000;

// ─── Internal types ──────────────────────────────────────

type StatusListener = (status: SocketConnectionStatus) => void;
type MessageCallback<T = unknown> = (body: T) => void;

// ─── Module-scoped singleton state ───────────────────────

let client: Client | null = null;
let activeToken: string | null = null;

const statusListeners = new Set<StatusListener>();
const subscriptions = new Map<string, StompSubscription>();

// ─── Helpers ─────────────────────────────────────────────

function broadcast(status: SocketConnectionStatus): void {
    statusListeners.forEach((fn) => fn(status));
}

function teardownSubscriptions(): void {
    subscriptions.forEach((sub) => {
        try {
            sub.unsubscribe();
        } catch {
            // Subscription may already be invalid — safe to ignore
        }
    });
    subscriptions.clear();
}

// ─── Public API ──────────────────────────────────────────

/**
 * Mở kết nối STOMP tới backend.
 * Nếu đang connected với cùng token thì skip.
 */
export function connectSocket(token: string): void {
    if (client?.connected && activeToken === token) return;

    disconnectSocket();
    activeToken = token;
    broadcast("connecting");

    client = new Client({
        webSocketFactory: () => new SockJS(WS_ENDPOINT) as WebSocket,
        connectHeaders: { Authorization: `Bearer ${token}` },
        reconnectDelay: RECONNECT_DELAY_MS,
        heartbeatIncoming: HEARTBEAT_MS,
        heartbeatOutgoing: HEARTBEAT_MS,

        onConnect: () => {
            console.info("[WS] ✓ Connected", WS_ENDPOINT);
            broadcast("connected");
        },
        onStompError: (frame) => {
            console.error("[WS] STOMP error:", frame.headers.message);
            broadcast("error");
        },
        onWebSocketError: () => broadcast("error"),
        onDisconnect: () => broadcast("disconnected"),
        onWebSocketClose: () => broadcast("disconnected"),
    });

    client.activate();
}

/**
 * Đóng kết nối, hủy hết subscriptions, reset state.
 */
export function disconnectSocket(): void {
    if (!client) return;

    teardownSubscriptions();

    try {
        client.deactivate();
    } catch {
        // Client may already be deactivated — safe to ignore
    }

    client = null;
    activeToken = null;
    broadcast("disconnected");
}

/**
 * Subscribe tới một STOMP destination.
 *
 * @returns Hàm unsubscribe — gọi khi không cần nhận message nữa
 *
 * @example
 * ```ts
 * const unsub = subscribe("/user/queue/notifications", (event) => { ... });
 * // later
 * unsub();
 * ```
 */
export function subscribe<T = unknown>(
    destination: string,
    callback: MessageCallback<T>,
): () => void {
    if (!client?.connected) {
        console.warn("[WS] Cannot subscribe — not connected:", destination);
        return () => {};
    }

    // Cancel existing subscription to the same destination
    const existing = subscriptions.get(destination);
    if (existing) {
        try {
            existing.unsubscribe();
        } catch {
            // Already invalid — safe to ignore
        }
    }

    const sub = client.subscribe(destination, (message: IMessage) => {
        try {
            callback(JSON.parse(message.body) as T);
        } catch (err) {
            console.error("[WS] Failed to parse message body:", err);
        }
    });

    subscriptions.set(destination, sub);

    return () => {
        try {
            sub.unsubscribe();
        } catch {
            // Already invalid — safe to ignore
        }
        subscriptions.delete(destination);
    };
}

/**
 * Đăng ký listener cho connection status changes.
 * @returns Hàm unsubscribe
 */
export function onStatusChange(listener: StatusListener): () => void {
    statusListeners.add(listener);
    return () => {
        statusListeners.delete(listener);
    };
}

/** Kiểm tra trạng thái kết nối hiện tại. */
export function isConnected(): boolean {
    return client?.connected ?? false;
}
