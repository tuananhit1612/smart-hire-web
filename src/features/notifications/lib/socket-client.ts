/**
 * ═══════════════════════════════════════════════════════════
 *  WebSocket STOMP Client — Singleton
 *
 *  Connects to Spring Boot backend via SockJS + STOMP.
 *  Features:
 *    • JWT auth on CONNECT (Authorization header)
 *    • Auto-reconnect with exponential backoff
 *    • Connection status tracking
 *    • Type-safe subscribe/unsubscribe
 * ═══════════════════════════════════════════════════════════
 */

import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { SocketConnectionStatus } from "../types/notification-types";

// ─── Constants ───────────────────────────────────────────

const WS_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") ?? "http://localhost:8080";
const WS_ENDPOINT = `${WS_BASE_URL}/ws`;

/** Reconnect delay bounds (ms) */
const RECONNECT_DELAY_MIN = 2_000;
const RECONNECT_DELAY_MAX = 30_000;

// ─── Types ───────────────────────────────────────────────

type StatusListener = (status: SocketConnectionStatus) => void;
type MessageCallback = (body: unknown) => void;

// ─── Singleton Client ────────────────────────────────────

let stompClient: Client | null = null;
let currentToken: string | null = null;
const statusListeners = new Set<StatusListener>();
const subscriptions = new Map<string, StompSubscription>();

function notifyStatus(status: SocketConnectionStatus) {
    statusListeners.forEach((fn) => fn(status));
}

/**
 * Connect to the WebSocket server with JWT authentication.
 * If already connected with the same token, does nothing.
 */
export function connectSocket(token: string): void {
    // Already connected with same token — skip
    if (stompClient?.connected && currentToken === token) return;

    // Disconnect previous connection if exists
    disconnectSocket();

    currentToken = token;
    notifyStatus("connecting");

    stompClient = new Client({
        // Use SockJS as the WebSocket factory (matches backend .withSockJS())
        webSocketFactory: () => new SockJS(WS_ENDPOINT) as WebSocket,

        // STOMP CONNECT headers — JWT auth
        connectHeaders: {
            Authorization: `Bearer ${token}`,
        },

        // Reconnect with exponential backoff
        reconnectDelay: RECONNECT_DELAY_MIN,

        // Heartbeat (ms) — keep connection alive
        heartbeatIncoming: 10_000,
        heartbeatOutgoing: 10_000,

        // ── Callbacks ──
        onConnect: () => {
            console.log("[WebSocket] Connected to", WS_ENDPOINT);
            notifyStatus("connected");
        },

        onStompError: (frame) => {
            console.error("[WebSocket] STOMP error:", frame.headers.message);
            notifyStatus("error");
        },

        onWebSocketError: (event) => {
            console.error("[WebSocket] Connection error:", event);
            notifyStatus("error");
        },

        onDisconnect: () => {
            console.log("[WebSocket] Disconnected");
            notifyStatus("disconnected");
        },

        onWebSocketClose: () => {
            notifyStatus("disconnected");
        },
    });

    stompClient.activate();
}

/**
 * Disconnect from the WebSocket server and clean up all subscriptions.
 */
export function disconnectSocket(): void {
    if (stompClient) {
        // Unsubscribe all
        subscriptions.forEach((sub) => {
            try { sub.unsubscribe(); } catch { /* ignore */ }
        });
        subscriptions.clear();

        try {
            stompClient.deactivate();
        } catch { /* ignore */ }

        stompClient = null;
        currentToken = null;
        notifyStatus("disconnected");
    }
}

/**
 * Subscribe to a STOMP destination.
 * Returns an unsubscribe function.
 *
 * @param destination  e.g. "/user/queue/notifications" or "/topic/jobs/5/applications"
 * @param callback     Called with parsed JSON body on each message
 */
export function subscribe(
    destination: string,
    callback: MessageCallback
): () => void {
    if (!stompClient?.connected) {
        console.warn("[WebSocket] Cannot subscribe — not connected. Destination:", destination);
        return () => {};
    }

    // Avoid duplicate subscriptions
    if (subscriptions.has(destination)) {
        subscriptions.get(destination)!.unsubscribe();
        subscriptions.delete(destination);
    }

    const sub = stompClient.subscribe(destination, (message: IMessage) => {
        try {
            const body = JSON.parse(message.body);
            callback(body);
        } catch (e) {
            console.error("[WebSocket] Failed to parse message:", e);
        }
    });

    subscriptions.set(destination, sub);

    return () => {
        try { sub.unsubscribe(); } catch { /* ignore */ }
        subscriptions.delete(destination);
    };
}

/**
 * Register a connection status listener.
 * Returns an unsubscribe function.
 */
export function onStatusChange(listener: StatusListener): () => void {
    statusListeners.add(listener);
    return () => statusListeners.delete(listener);
}

/**
 * Check if currently connected.
 */
export function isConnected(): boolean {
    return stompClient?.connected ?? false;
}
