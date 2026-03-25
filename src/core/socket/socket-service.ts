/**
 * ═════════════════════════════════════════════════════════
 *  SmartHire WebSocket Service
 *  Singleton SockJS + STOMP client for realtime communication
 *  with the Spring Boot backend.
 * ═════════════════════════════════════════════════════════
 */

import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export type ConnectionStatus = "connected" | "disconnected" | "reconnecting";

export interface SocketEventHandlers {
    onConnect?: () => void;
    onDisconnect?: () => void;
    onReconnecting?: () => void;
    onError?: (error: string) => void;
}

const WS_BASE = process.env.NEXT_PUBLIC_WS_URL ?? "http://localhost:8080/ws";
const RECONNECT_DELAY = 5000;
const MAX_RECONNECT_DELAY = 30000;

class SocketService {
    private client: Client | null = null;
    private subscriptions: Map<string, StompSubscription> = new Map();
    private _status: ConnectionStatus = "disconnected";
    private handlers: SocketEventHandlers = {};
    private reconnectAttempts = 0;

    get status(): ConnectionStatus {
        return this._status;
    }

    /**
     * Connect to WebSocket with optional JWT token.
     */
    connect(token?: string, handlers?: SocketEventHandlers): void {
        if (this.client?.active) return;

        if (handlers) this.handlers = handlers;

        this.client = new Client({
            // Use SockJS for fallback transport
            webSocketFactory: () => new SockJS(WS_BASE) as unknown as WebSocket,

            // Auth header
            connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},

            // Reconnect config
            reconnectDelay: RECONNECT_DELAY,

            onConnect: () => {
                this._status = "connected";
                this.reconnectAttempts = 0;
                this.handlers.onConnect?.();
                console.log("[Socket] ✅ Connected to", WS_BASE);
            },

            onDisconnect: () => {
                this._status = "disconnected";
                this.handlers.onDisconnect?.();
                console.log("[Socket] ❌ Disconnected");
            },

            onStompError: (frame) => {
                const errorMsg = frame.headers["message"] ?? "Unknown STOMP error";
                this.handlers.onError?.(errorMsg);
                console.error("[Socket] STOMP error:", errorMsg);
            },

            onWebSocketClose: () => {
                if (this._status !== "disconnected") {
                    this._status = "reconnecting";
                    this.reconnectAttempts++;
                    this.handlers.onReconnecting?.();

                    // Exponential backoff cap
                    const delay = Math.min(
                        RECONNECT_DELAY * Math.pow(2, this.reconnectAttempts),
                        MAX_RECONNECT_DELAY
                    );
                    console.log(`[Socket] 🔄 Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
                }
            },
        });

        this._status = "reconnecting";
        this.client.activate();
    }

    /**
     * Disconnect from WebSocket and clear all subscriptions.
     */
    disconnect(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
        this.subscriptions.clear();

        if (this.client?.active) {
            this.client.deactivate();
        }
        this.client = null;
        this._status = "disconnected";
        this.reconnectAttempts = 0;
    }

    /**
     * Subscribe to a STOMP destination.
     * Returns an unsubscribe function.
     */
    subscribe(
        destination: string,
        callback: (message: IMessage) => void
    ): () => void {
        if (!this.client?.active) {
            console.warn("[Socket] Cannot subscribe — not connected");
            return () => {};
        }

        // Avoid duplicate subscriptions
        if (this.subscriptions.has(destination)) {
            this.subscriptions.get(destination)!.unsubscribe();
        }

        const subscription = this.client.subscribe(destination, callback);
        this.subscriptions.set(destination, subscription);

        return () => {
            subscription.unsubscribe();
            this.subscriptions.delete(destination);
        };
    }

    /**
     * Send a message to a STOMP destination.
     */
    send(destination: string, body: unknown): void {
        if (!this.client?.active) {
            console.warn("[Socket] Cannot send — not connected");
            return;
        }

        this.client.publish({
            destination,
            body: JSON.stringify(body),
        });
    }

    /**
     * Check if the client is currently connected.
     */
    isConnected(): boolean {
        return this._status === "connected";
    }
}

// Singleton instance
export const socketService = new SocketService();
