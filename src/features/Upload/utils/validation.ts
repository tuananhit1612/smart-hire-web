// File validation utilities

import { UPLOAD_CONSTRAINTS, UPLOAD_ERROR_MESSAGES, type ValidationResult } from '../types';

/**
 * Validate file size (max 20MB)
 */
export function validateFileSize(file: File): ValidationResult {
    if (file.size > UPLOAD_CONSTRAINTS.MAX_FILE_SIZE_BYTES) {
        return {
            isValid: false,
            error: 'FILE_TOO_LARGE',
            message: UPLOAD_ERROR_MESSAGES.FILE_TOO_LARGE,
        };
    }
    return { isValid: true };
}

/**
 * Validate file type (PDF, DOC, DOCX only)
 */
export function validateFileType(file: File): ValidationResult {
    const isValidMimeType = UPLOAD_CONSTRAINTS.ALLOWED_MIME_TYPES.includes(file.type as any);

    // Also check extension as fallback (some browsers may not set correct MIME type)
    const fileName = file.name.toLowerCase();
    const hasValidExtension = UPLOAD_CONSTRAINTS.ALLOWED_EXTENSIONS.some(ext =>
        fileName.endsWith(ext)
    );

    if (!isValidMimeType && !hasValidExtension) {
        return {
            isValid: false,
            error: 'INVALID_FILE_TYPE',
            message: UPLOAD_ERROR_MESSAGES.INVALID_FILE_TYPE,
        };
    }
    return { isValid: true };
}

/**
 * Validate file (size + type)
 */
export function validateFile(file: File): ValidationResult {
    // Check file type first
    const typeResult = validateFileType(file);
    if (!typeResult.isValid) {
        return typeResult;
    }

    // Check file size
    const sizeResult = validateFileSize(file);
    if (!sizeResult.isValid) {
        return sizeResult;
    }

    return { isValid: true };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
}
