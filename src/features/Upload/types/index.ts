// Upload CV Types

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export type UploadErrorType = 'FILE_TOO_LARGE' | 'INVALID_FILE_TYPE' | 'UPLOAD_FAILED';

export interface UploadedFile {
    id: string;
    file: File;
    name: string;
    size: number;
    type: string;
    status: UploadStatus;
    progress: number;
    error?: UploadErrorType;
    uploadedAt?: Date;
}

export interface ValidationResult {
    isValid: boolean;
    error?: UploadErrorType;
    message?: string;
}

// Upload constraints
export const UPLOAD_CONSTRAINTS = {
    MAX_FILE_SIZE_MB: 20,
    MAX_FILE_SIZE_BYTES: 20 * 1024 * 1024, // 20MB
    ALLOWED_MIME_TYPES: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx'],
} as const;

// Error messages in Vietnamese
export const UPLOAD_ERROR_MESSAGES: Record<UploadErrorType, string> = {
    FILE_TOO_LARGE: `File quá lớn. Kích thước tối đa là ${UPLOAD_CONSTRAINTS.MAX_FILE_SIZE_MB}MB.`,
    INVALID_FILE_TYPE: 'Định dạng file không hợp lệ. Chỉ chấp nhận PDF, DOC, DOCX.',
    UPLOAD_FAILED: 'Tải file lên thất bại. Vui lòng thử lại.',
};
