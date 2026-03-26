/**
 * ═══════════════════════════════════════════════════════════
 *  File Validation Utilities
 *  Client-side validation for file uploads — fail fast
 *  before wasting bandwidth on invalid files.
 * ═══════════════════════════════════════════════════════════
 */

/* ── Types ─────────────────────────────────────────────── */

export interface FileValidationRule {
  /** Maximum file size in megabytes */
  maxSizeMB: number;
  /** Allowed MIME types (e.g. "image/png", "application/pdf") */
  allowedTypes: string[];
  /** Allowed extensions without dot (e.g. "pdf", "docx") */
  allowedExtensions: string[];
}

export interface FileValidationResult {
  valid: boolean;
  errors: string[];
}

/* ── Presets ───────────────────────────────────────────── */

/** Avatar upload: images only, max 5 MB */
export const AVATAR_RULES: FileValidationRule = {
  maxSizeMB: 5,
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  allowedExtensions: ["jpg", "jpeg", "png", "webp"],
};

/** CV / Resume upload: PDF and DOCX, max 10 MB */
export const CV_RULES: FileValidationRule = {
  maxSizeMB: 10,
  allowedTypes: [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  allowedExtensions: ["pdf", "docx"],
};

/* ── Helpers ──────────────────────────────────────────── */

/** Extract lowercase extension from a filename (without dot) */
export function getFileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

/**
 * Format bytes into human-readable string.
 *  - `formatFileSize(2_621_440)` → `"2.5 MB"`
 *  - `formatFileSize(512)`       → `"512 B"`
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);

  return `${size % 1 === 0 ? size : size.toFixed(1)} ${units[i]}`;
}

/* ── Core Validator ───────────────────────────────────── */

/**
 * Validate a `File` against the given rules.
 *
 * ```ts
 * const result = validateFile(file, CV_RULES);
 * if (!result.valid) toast.error(result.errors[0]);
 * ```
 */
export function validateFile(
  file: File,
  rules: FileValidationRule
): FileValidationResult {
  const errors: string[] = [];

  // Size check
  const maxBytes = rules.maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    errors.push(
      `Kích thước file vượt quá ${rules.maxSizeMB} MB (hiện tại: ${formatFileSize(file.size)})`
    );
  }

  // MIME type check
  if (rules.allowedTypes.length > 0 && !rules.allowedTypes.includes(file.type)) {
    errors.push(
      `Loại file không được hỗ trợ. Chấp nhận: ${rules.allowedExtensions.map((e) => `.${e}`).join(", ")}`
    );
  }

  // Extension check (fallback when MIME is unreliable)
  const ext = getFileExtension(file.name);
  if (
    rules.allowedExtensions.length > 0 &&
    !rules.allowedExtensions.includes(ext)
  ) {
    // Only add if we haven't already flagged MIME
    if (rules.allowedTypes.length === 0 || rules.allowedTypes.includes(file.type)) {
      errors.push(
        `Phần mở rộng .${ext} không hợp lệ. Chấp nhận: ${rules.allowedExtensions.map((e) => `.${e}`).join(", ")}`
      );
    }
  }

  return { valid: errors.length === 0, errors };
}
