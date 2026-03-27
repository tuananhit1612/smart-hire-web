'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { CVFile, MAX_FILES } from '../types';
import { validateFile } from '../utils/fileValidation';

export function useFileUpload() {
    const [files, setFiles] = useState<CVFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    // Track pending validation timeouts for cleanup on unmount / removeFile
    const validationTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

    // Cleanup all pending timeouts on unmount
    useEffect(() => {
        return () => {
            validationTimeouts.current.forEach((t) => clearTimeout(t));
            validationTimeouts.current.clear();
        };
    }, []);

    const generateId = () => `cv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const addFiles = useCallback((newFiles: FileList | File[]) => {
        const fileArray = Array.from(newFiles);

        setFiles((prev) => {
            const remainingSlots = MAX_FILES - prev.length;
            if (remainingSlots <= 0) return prev;

            const filesToAdd = fileArray.slice(0, remainingSlots).map((file): CVFile => {
                const validation = validateFile(file);

                return {
                    id: generateId(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    uploadedAt: new Date(),
                    status: validation.isValid ? 'uploading' : 'error',
                    progress: 0,
                    errorMessage: validation.error,
                    rawFile: file,
                };
            });

            // Simulate progress then real upload for valid files
            filesToAdd
                .filter((f) => f.status === 'uploading')
                .forEach((f) => simulateUpload(f.id, f.name, f.rawFile));

            return [...prev, ...filesToAdd];
        });
    }, []);

    const simulateUpload = useCallback((fileId: string, fileName: string, rawFile?: File) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                // Phase 1: Enter validating state (async check simulation)
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileId
                            ? { ...f, progress: 100, status: 'validating' as const }
                            : f
                    )
                );

                // Phase 2: Async validation with cleanup tracking + Real API call
                const timeoutId = setTimeout(async () => {
                    validationTimeouts.current.delete(fileId);

                    // Fake virus/mime scan
                    const nameLower = fileName.toLowerCase();
                    if (nameLower.startsWith('virus') || nameLower.startsWith('malware') || /\.(exe|bat|sh)$/i.test(fileName)) {
                        setFiles((prev) => prev.map((f) => f.id === fileId ? { ...f, status: 'error' as const, errorMessage: 'File không hợp lệ hoặc chứa mã độc' } : f));
                        return;
                    }

                    // Real API Upload
                    if (rawFile) {
                        try {
                            const { useCvFileStore } = await import('@/features/cv/stores/cv-file-store');
                            await useCvFileStore.getState().uploadCvFile(rawFile);
                            setFiles((prev) => prev.map((f) => f.id === fileId ? { ...f, status: 'success' as const } : f));
                        } catch (err: any) {
                            setFiles((prev) => prev.map((f) => f.id === fileId ? { ...f, status: 'error' as const, errorMessage: err.message || 'Lỗi khi tải lên máy chủ' } : f));
                        }
                    } else {
                        setFiles((prev) => prev.map((f) => f.id === fileId ? { ...f, status: 'success' as const } : f));
                    }
                }, 800);

                validationTimeouts.current.set(fileId, timeoutId);
            } else {
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileId ? { ...f, progress: Math.min(progress, 99) } : f
                    )
                );
            }
        }, 200);
    }, []);

    const removeFile = useCallback((fileId: string) => {
        // Clear any pending validation timeout for this file
        const timeout = validationTimeouts.current.get(fileId);
        if (timeout) {
            clearTimeout(timeout);
            validationTimeouts.current.delete(fileId);
        }
        setFiles((prev) => prev.filter((f) => f.id !== fileId));
    }, []);

    const clearAll = useCallback(() => {
        // Clear all pending validation timeouts
        validationTimeouts.current.forEach((t) => clearTimeout(t));
        validationTimeouts.current.clear();
        setFiles([]);
    }, []);

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            const droppedFiles = e.dataTransfer.files;
            if (droppedFiles.length > 0) {
                addFiles(droppedFiles);
            }
        },
        [addFiles]
    );

    return {
        files,
        isDragging,
        isUploading: files.some((f) => f.status === 'uploading'),
        isValidating: files.some((f) => f.status === 'validating'),
        addFiles,
        removeFile,
        clearAll,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
    };
}
