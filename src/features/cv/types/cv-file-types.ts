// CV File & Version Management Types

export type CVFileStatus = 'active' | 'archived' | 'draft';
export type CVFileType = 'pdf' | 'docx';

export interface CVFileVersion {
    id: string;
    versionNumber: number;
    fileName: string;
    fileSize: number; // in bytes
    fileType: CVFileType;
    uploadedAt: Date;
    note?: string;
}

export interface CVFile {
    id: string;
    name: string;
    description?: string;
    status: CVFileStatus;
    isDefault: boolean;
    currentVersion: CVFileVersion;
    versions: CVFileVersion[];
    createdAt: Date;
    updatedAt: Date;
    matchScore?: number; // AI matching score if available
}

// Action types for CV file management
export type CVFileAction = 'view' | 'download' | 'rename' | 'delete' | 'set-default' | 'archive';

// Sort options
export type CVFileSortOption = 'newest' | 'oldest' | 'name' | 'size';

// Filter options
export interface CVFileFilter {
    status?: CVFileStatus;
    fileType?: CVFileType;
    searchQuery?: string;
}
