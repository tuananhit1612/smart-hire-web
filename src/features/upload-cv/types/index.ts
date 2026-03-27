// Upload CV Types
export interface CVFile {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadedAt: Date;
    status: 'uploading' | 'success' | 'error' | 'validating';
    progress: number;
    errorMessage?: string;
    rawFile?: File;
}

export interface UploadState {
    files: CVFile[];
    isDragging: boolean;
    isUploading: boolean;
}

export const ALLOWED_FILE_TYPES = {
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/msword': ['.doc'],
} as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FILES = 5;

export type AllowedMimeType = keyof typeof ALLOWED_FILE_TYPES;
