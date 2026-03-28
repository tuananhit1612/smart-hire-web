/**
 * ═══════════════════════════════════════════════════════════
 *  WebSocket Client — STOMP over SockJS factory
 *
 *  Creates a STOMP client connected to the backend at /ws.
 *  JWT token is passed as an Authorization header on CONNECT.
 * ═══════════════════════════════════════════════════════════
 */

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

/**
 * Derive WebSocket URL from NEXT_PUBLIC_API_URL.
 * The API URL is http://localhost:8080/api but WebSocket
 * is registered at /ws (root), so we strip the /api suffix.
 */
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
const WS_URL = apiUrl.replace(/\/api\/?$/, "") + "/ws";

/**
 * Create and configure a STOMP client.
 * Call `.activate()` to connect, `.deactivate()` to disconnect.
 */
export function createStompClient(accessToken: string): Client {
  const client = new Client({
    // Use SockJS as the WebSocket factory (matches backend withSockJS())
    webSocketFactory: () => new SockJS(WS_URL) as unknown as WebSocket,

    // Send JWT in CONNECT frame headers
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },

    // Auto-reconnect after 5 seconds
    reconnectDelay: 5_000,

    // Heartbeat every 10s
    heartbeatIncoming: 10_000,
    heartbeatOutgoing: 10_000,

    // Debug logging in development only
    debug: (msg) => {
      if (process.env.NODE_ENV === "development") {
        console.debug("[STOMP]", msg);
      }
    },
  });

  return client;
}
