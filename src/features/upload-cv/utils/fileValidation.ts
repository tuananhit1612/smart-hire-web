import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, AllowedMimeType } from '../types';

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

/**
 * Validate file type - only PDF and DOCX allowed
 */
export function validateFileType(file: File): ValidationResult {
    const allowedMimes = Object.keys(ALLOWED_FILE_TYPES) as AllowedMimeType[];

    if (!allowedMimes.includes(file.type as AllowedMimeType)) {
        const allowedExtensions = Object.values(ALLOWED_FILE_TYPES).flat().join(', ');
        return {
            isValid: false,
            error: `Định dạng file không hợp lệ. Chỉ chấp nhận: ${allowedExtensions}`,
        };
    }

    return { isValid: true };
}

/**
 * Validate file size - max 10MB
 */
export function validateFileSize(file: File): ValidationResult {
    if (file.size > MAX_FILE_SIZE) {
        const maxSizeMB = MAX_FILE_SIZE / (1024 * 1024);
        return {
            isValid: false,
            error: `File quá lớn. Kích thước tối đa: ${maxSizeMB}MB`,
        };
    }

    return { isValid: true };
}

/**
 * Validate a single file
 */
export function validateFile(file: File): ValidationResult {
    const typeValidation = validateFileType(file);
    if (!typeValidation.isValid) return typeValidation;

    const sizeValidation = validateFileSize(file);
    if (!sizeValidation.isValid) return sizeValidation;

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

/**
 * Check if file is PDF
 */
export function isPDF(file: File): boolean {
    return file.type === 'application/pdf' || getFileExtension(file.name) === 'pdf';
}

/**
 * Check if file is DOCX/DOC
 */
export function isWord(file: File): boolean {
    return file.type.includes('wordprocessingml') ||
        file.type === 'application/msword' ||
        ['doc', 'docx'].includes(getFileExtension(file.name));
}
