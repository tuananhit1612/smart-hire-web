/**
 * ═══════════════════════════════════════════════════════════
 *  Realtime Service — SSE client for server-pushed events
 *
 *  Connects to the Spring Boot SSE endpoint to receive
 *  real-time notifications. Falls back to periodic polling
 *  when SSE is unavailable or fails.
 *
 *  Usage:
 *    const rt = new RealtimeService(token, onEvent);
 *    rt.connect();     // opens SSE or starts polling
 *    rt.disconnect();  // cleans up
 * ═══════════════════════════════════════════════════════════
 */

import { tokenStorage } from "@/features/auth/lib/token-storage";

// ─── Types ───────────────────────────────────────────────

export interface ServerEvent {
  /** Event type from the backend (e.g. "NOTIFICATION", "APPLICATION_UPDATE") */
  type: string;
  /** Event payload — shape depends on `type` */
  payload: Record<string, unknown>;
}

export type EventHandler = (event: ServerEvent) => void;

// ─── Constants ───────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api";
const SSE_ENDPOINT = `${API_BASE}/sse/subscribe`;
const POLL_ENDPOINT = `${API_BASE}/notifications/unread-count`;
const POLL_INTERVAL_MS = 30_000; // 30 seconds
const RECONNECT_DELAY_MS = 5_000;
const MAX_RECONNECT_ATTEMPTS = 5;

// ─── Service ─────────────────────────────────────────────

export class RealtimeService {
  private eventSource: EventSource | null = null;
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private isConnected = false;
  private onEvent: EventHandler;
  private onConnectionChange?: (connected: boolean) => void;

  constructor(
    onEvent: EventHandler,
    onConnectionChange?: (connected: boolean) => void
  ) {
    this.onEvent = onEvent;
    this.onConnectionChange = onConnectionChange;
  }

  // ── Public API ─────────────────────────────────────────

  /** Attempt SSE connection; fall back to polling on failure. */
  connect(): void {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      this.startPolling();
      return;
    }

    this.connectSSE(token);
  }

  /** Tear down all connections, timers, and listeners. */
  disconnect(): void {
    this.closeSSE();
    this.stopPolling();
    this.clearReconnectTimer();
    this.setConnected(false);
  }

  // ── SSE ────────────────────────────────────────────────

  private connectSSE(token: string): void {
    this.closeSSE();

    try {
      // SSE doesn't support custom headers — pass token as query param
      const url = `${SSE_ENDPOINT}?token=${encodeURIComponent(token)}`;
      this.eventSource = new EventSource(url);

      this.eventSource.onopen = () => {
        this.reconnectAttempts = 0;
        this.setConnected(true);
        this.stopPolling(); // SSE is active, no need to poll
      };

      this.eventSource.onmessage = (e) => {
        this.handleRawEvent(e.data);
      };

      // Handle named events from Spring Boot SseEmitter
      this.eventSource.addEventListener("notification", (e) => {
        this.handleRawEvent((e as MessageEvent).data);
      });

      this.eventSource.addEventListener("application-update", (e) => {
        this.handleRawEvent((e as MessageEvent).data);
      });

      this.eventSource.onerror = () => {
        this.closeSSE();
        this.setConnected(false);

        if (this.reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          this.reconnectAttempts++;
          this.reconnectTimer = setTimeout(() => {
            const freshToken = tokenStorage.getAccessToken();
            if (freshToken) {
              this.connectSSE(freshToken);
            } else {
              this.startPolling();
            }
          }, RECONNECT_DELAY_MS * this.reconnectAttempts);
        } else {
          // Max retries reached — fall back to polling
          this.startPolling();
        }
      };
    } catch {
      // EventSource constructor can throw in some environments
      this.startPolling();
    }
  }

  private closeSSE(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  // ── Polling Fallback ───────────────────────────────────

  private startPolling(): void {
    if (this.pollTimer) return;

    this.pollTimer = setInterval(() => {
      this.pollForUpdates();
    }, POLL_INTERVAL_MS);

    // Also do an immediate poll
    this.pollForUpdates();
  }

  private stopPolling(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  private async pollForUpdates(): Promise<void> {
    const token = tokenStorage.getAccessToken();
    if (!token) return;

    try {
      const response = await fetch(POLL_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.onEvent({
          type: "POLL_UPDATE",
          payload: data,
        });
      }
    } catch {
      // Silently ignore poll failures
    }
  }

  // ── Internal Helpers ───────────────────────────────────

  private handleRawEvent(raw: string): void {
    try {
      const parsed = JSON.parse(raw) as ServerEvent;
      this.onEvent(parsed);
    } catch {
      // Ignore malformed events
    }
  }

  private setConnected(connected: boolean): void {
    if (this.isConnected !== connected) {
      this.isConnected = connected;
      this.onConnectionChange?.(connected);
    }
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
}
