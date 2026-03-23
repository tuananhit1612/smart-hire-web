/**
 * Token Storage — localStorage wrapper for JWT tokens.
 * Used by auth-context to persist login/register sessions.
 */

const ACCESS_TOKEN_KEY = "smarthire_access_token";
const REFRESH_TOKEN_KEY = "smarthire_refresh_token";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export const tokenStorage = {
  getAccessToken(): string | null {
    if (!isBrowser()) return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    if (!isBrowser()) return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setTokens(accessToken: string, refreshToken?: string): void {
    if (!isBrowser()) return;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  },

  clear(): void {
    if (!isBrowser()) return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
