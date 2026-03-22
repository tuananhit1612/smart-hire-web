"use client";

import * as React from "react";

interface UseCVCanvasReturn {
    zoomLevel: number;
    pan: { x: number; y: number };
    isPanMode: boolean;
    isPanning: boolean;
    previewRef: React.RefObject<HTMLDivElement | null>;
    previewContentRef: React.RefObject<HTMLDivElement | null>;
    handleZoomIn: () => void;
    handleZoomOut: () => void;
    handleResetZoom: () => void;
    handleTogglePanMode: () => void;
    handleMouseDown: (e: React.MouseEvent) => void;
    handleMouseMove: (e: React.MouseEvent) => void;
    handleMouseUp: () => void;
}

export function useCVCanvas(): UseCVCanvasReturn {
    const [zoomLevel, setZoomLevel] = React.useState(0.45);
    const [pan, setPan] = React.useState({ x: 0, y: 0 });
    const panRef = React.useRef({ x: 0, y: 0 });
    const [isPanMode, setIsPanMode] = React.useState(false);
    const [isPanning, setIsPanning] = React.useState(false);

    const previewRef = React.useRef<HTMLDivElement>(null);
    const previewContentRef = React.useRef<HTMLDivElement>(null);
    const lastMousePos = React.useRef({ x: 0, y: 0 });

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.3));
    const handleResetZoom = () => {
        setZoomLevel(0.45);
        setPan({ x: 0, y: 0 });
        panRef.current = { x: 0, y: 0 };
    };

    const handleTogglePanMode = () => setIsPanMode(prev => !prev);

    // Sync Ref with State when State changes
    React.useEffect(() => {
        panRef.current = pan;
    }, [pan]);

    // Pan Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isPanMode || !previewRef.current) return;
        setIsPanning(true);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isPanning || !previewRef.current || !previewContentRef.current) return;

        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;

        panRef.current = {
            x: panRef.current.x + deltaX,
            y: panRef.current.y + deltaY
        };

        // Direct DOM Update for Performance
        previewContentRef.current.style.transform = `translate(${panRef.current.x}px, ${panRef.current.y}px) scale(${zoomLevel})`;

        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        if (isPanning) {
            setIsPanning(false);
            setPan(panRef.current);
        }
    };

    // Wheel Zoom Handler
    React.useEffect(() => {
        const container = previewRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const delta = e.deltaY * -0.01;
                const smoothDelta = Math.max(Math.min(delta, 0.2), -0.2);

                setZoomLevel(prev => {
                    const newZoom = prev + smoothDelta;
                    if (previewContentRef.current) {
                        previewContentRef.current.style.transform = `translate(${panRef.current.x}px, ${panRef.current.y}px) scale(${Math.max(0.3, Math.min(newZoom, 2.0))})`;
                    }
                    return Math.max(0.3, Math.min(newZoom, 2.0));
                });
            } else if (isPanMode) {
                e.preventDefault();
                panRef.current = {
                    x: panRef.current.x - e.deltaX,
                    y: panRef.current.y - e.deltaY
                };
                if (previewContentRef.current) {
                    previewContentRef.current.style.transform = `translate(${panRef.current.x}px, ${panRef.current.y}px) scale(${zoomLevel})`;
                }
                setPan(panRef.current);
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [isPanMode, zoomLevel]);

    // Ctrl Key Pan Handler
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Control') {
                setIsPanMode(true);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Control') {
                setIsPanMode(false);
                setIsPanning(false);
                if (isPanning) setPan(panRef.current);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isPanning]);

    return {
        zoomLevel,
        pan,
        isPanMode,
        isPanning,
        previewRef,
        previewContentRef,
        handleZoomIn,
        handleZoomOut,
        handleResetZoom,
        handleTogglePanMode,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    };
}
