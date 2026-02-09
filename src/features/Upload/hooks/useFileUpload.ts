'use client';

import { useState, useCallback, useRef } from 'react';
import { validateFile } from '../utils/validation';
import type { UploadedFile, UploadStatus, UploadErrorType } from '../types';
import { UPLOAD_ERROR_MESSAGES } from '../types';

interface UseFileUploadOptions {
    onError?: (error: UploadErrorType, message: string) => void;
    onSuccess?: (file: UploadedFile) => void;
}

interface UseFileUploadReturn {
    files: UploadedFile[];
    isUploading: boolean;
    addFiles: (fileList: FileList | File[]) => void;
    removeFile: (id: string) => void;
    clearFiles: () => void;
}

function generateId(): string {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function useFileUpload(options: UseFileUploadOptions = {}): UseFileUploadReturn {
    const { onError, onSuccess } = options;
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    // Use refs to avoid stale closure issues
    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;

    // Store file info for success callback
    const filesRef = useRef<UploadedFile[]>([]);
    filesRef.current = files;

    const simulateUpload = useCallback((fileId: string) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                // Update files state
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileId
                            ? { ...f, status: 'success' as UploadStatus, progress: 100, uploadedAt: new Date() }
                            : f
                    )
                );

                setIsUploading(false);

                // Call success callback in next event loop tick to avoid setState during render
                setTimeout(() => {
                    const uploadedFile = filesRef.current.find((f) => f.id === fileId);
                    if (uploadedFile) {
                        // Create updated file object since the ref might not have the latest status yet
                        const successFile = { ...uploadedFile, status: 'success' as UploadStatus, progress: 100, uploadedAt: new Date() };
                        onSuccessRef.current?.(successFile);
                    }
                }, 0);
            } else {
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileId ? { ...f, progress: Math.min(progress, 99) } : f
                    )
                );
            }
        }, 200);
    }, []);

    const addFiles = useCallback((fileList: FileList | File[]) => {
        const newFiles = Array.from(fileList);

        newFiles.forEach((file) => {
            // Validate file
            const validationResult = validateFile(file);

            if (!validationResult.isValid && validationResult.error) {
                // Call error callback
                onError?.(validationResult.error, validationResult.message || UPLOAD_ERROR_MESSAGES[validationResult.error]);
                return;
            }

            // Create uploaded file entry
            const uploadedFile: UploadedFile = {
                id: generateId(),
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                status: 'uploading',
                progress: 0,
            };

            setFiles((prev) => [...prev, uploadedFile]);
            setIsUploading(true);

            // Simulate upload progress
            simulateUpload(uploadedFile.id);
        });
    }, [onError, simulateUpload]);

    const removeFile = useCallback((id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    }, []);

    const clearFiles = useCallback(() => {
        setFiles([]);
    }, []);

    return {
        files,
        isUploading,
        addFiles,
        removeFile,
        clearFiles,
    };
}
