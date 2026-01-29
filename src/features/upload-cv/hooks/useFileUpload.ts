'use client';

import { useState, useCallback } from 'react';
import { CVFile, MAX_FILES } from '../types';
import { validateFile } from '../utils/fileValidation';

export function useFileUpload() {
    const [files, setFiles] = useState<CVFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);

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
                };
            });

            // Simulate upload for valid files
            filesToAdd
                .filter((f) => f.status === 'uploading')
                .forEach((f) => simulateUpload(f.id));

            return [...prev, ...filesToAdd];
        });
    }, []);

    const simulateUpload = useCallback((fileId: string) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileId
                            ? { ...f, progress: 100, status: 'success' }
                            : f
                    )
                );
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
        setFiles((prev) => prev.filter((f) => f.id !== fileId));
    }, []);

    const clearAll = useCallback(() => {
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
        addFiles,
        removeFile,
        clearAll,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
    };
}
