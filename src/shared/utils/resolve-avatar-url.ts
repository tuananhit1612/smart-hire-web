/**
 * Resolves a potentially relative avatar URL to an absolute URL.
 *
 * The backend stores avatar paths as relative strings like "avatars/uuid.png".
 * This helper prepends the server base URL + "/uploads/" when needed.
 *
 * @param url - The raw avatarUrl from the API (e.g. "avatars/abc.png" or "https://...")
 * @param fallback - Optional fallback URL when avatarUrl is null/undefined
 * @returns A fully qualified URL ready for <img src="...">
 */

const DEFAULT_FALLBACK =
  "https://api.dicebear.com/7.x/avataaars/svg?seed=smarthire";

/** Base URL without the /api suffix */
function getUploadsBase(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return "";
  try {
    return new URL(apiUrl).origin;
  } catch {
    return apiUrl.replace(/\/api.*$/, "");
  }
}

export function resolveAvatarUrl(
  url: string | null | undefined,
  fallback: string = DEFAULT_FALLBACK
): string {
  if (!url || !url.trim()) return fallback;

  // Already an absolute URL — use as-is
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }

  // Relative path from backend (e.g. "avatars/uuid.png") — prepend uploads base
  return `${getUploadsBase()}/uploads/${url}`;
}
