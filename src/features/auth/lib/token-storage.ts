/**
 * ═══════════════════════════════════════════════════════════
 *  Token Storage — Centralised localStorage wrapper for
 *  access/refresh tokens.
 *
 *  Used by:
 *    • auth-context.tsx (store/clear on login/logout)
 *    • api-client.ts   (attach Bearer header on every request)
 * ═══════════════════════════════════════════════════════════
 */

const ACCESS_TOKEN_KEY = "smarthire-access-token";
const REFRESH_TOKEN_KEY = "smarthire-refresh-token";

function isClient() {
    return typeof window !== "undefined";
}

export const tokenStorage = {
    getAccessToken(): string | null {
        return isClient() ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
    },

    getRefreshToken(): string | null {
        return isClient() ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
    },

    setAccessToken(token: string) {
        if (!isClient()) return;
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    },

    setTokens(accessToken: string, refreshToken: string) {
        if (!isClient()) return;
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    },

    clearTokens() {
        if (!isClient()) return;
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    },

    /** @deprecated use clearTokens() */
    clear() {
        this.clearTokens();
    },
};
