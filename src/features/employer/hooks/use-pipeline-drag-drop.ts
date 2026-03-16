"use client";

/**
 * ═════════════════════════════════════════════════════════
 *  usePipelineDragDrop Hook
 *  Manages drag-and-drop state for the Kanban pipeline board.
 *  Uses HTML5 Drag & Drop API with local state management.
 * ═════════════════════════════════════════════════════════
 */

import { useState, useCallback, useRef } from "react";

// ─── Types ───────────────────────────────────────────
export type StageId = "applied" | "screening" | "interview" | "offer" | "hired" | "rejected";

export interface PipelineCandidate {
    id: string;
    name: string;
    avatar: string;
    email: string;
    position: string;
    aiScore: number;
    appliedDate: string;
    daysInStage: number;
    tags: string[];
}

export type BoardState = Record<StageId, PipelineCandidate[]>;

export interface DragState {
    /** Currently dragged candidate ID */
    candidateId: string | null;
    /** Stage the candidate is dragged from */
    fromStage: StageId | null;
    /** Stage currently being hovered over */
    overStage: StageId | null;
}

export interface MoveEvent {
    candidateId: string;
    candidateName: string;
    fromStage: StageId;
    toStage: StageId;
    timestamp: number;
}

// ─── Hook ────────────────────────────────────────────
export function usePipelineDragDrop(initialBoard: BoardState) {
    const [board, setBoard] = useState<BoardState>(initialBoard);
    const [dragState, setDragState] = useState<DragState>({
        candidateId: null,
        fromStage: null,
        overStage: null,
    });
    const [moveHistory, setMoveHistory] = useState<MoveEvent[]>([]);
    const dragCounterRef = useRef<Record<string, number>>({});

    // ─── Drag Handlers ───────────────────────────────

    /** Called when drag starts on a candidate card */
    const handleDragStart = useCallback(
        (candidateId: string, fromStage: StageId) => {
            setDragState({ candidateId, fromStage, overStage: null });
        },
        []
    );

    /** Called when drag ends (drop or cancel) */
    const handleDragEnd = useCallback(() => {
        setDragState({ candidateId: null, fromStage: null, overStage: null });
        dragCounterRef.current = {};
    }, []);

    /** Called when dragging over a stage column */
    const handleDragEnter = useCallback((stageId: StageId) => {
        dragCounterRef.current[stageId] = (dragCounterRef.current[stageId] ?? 0) + 1;
        setDragState((prev) => ({ ...prev, overStage: stageId }));
    }, []);

    /** Called when leaving a stage column */
    const handleDragLeave = useCallback((stageId: StageId) => {
        dragCounterRef.current[stageId] = (dragCounterRef.current[stageId] ?? 0) - 1;
        if (dragCounterRef.current[stageId] <= 0) {
            dragCounterRef.current[stageId] = 0;
            setDragState((prev) =>
                prev.overStage === stageId ? { ...prev, overStage: null } : prev
            );
        }
    }, []);

    /** Called when dropping on a stage column */
    const handleDrop = useCallback(
        (toStage: StageId) => {
            const { candidateId, fromStage } = dragState;
            if (!candidateId || !fromStage || fromStage === toStage) {
                handleDragEnd();
                return;
            }
            moveCandidate(candidateId, fromStage, toStage);
            handleDragEnd();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dragState]
    );

    // ─── Move Logic ──────────────────────────────────

    /** Move a candidate from one stage to another */
    const moveCandidate = useCallback(
        (candidateId: string, fromStage: StageId, toStage: StageId) => {
            setBoard((prev) => {
                const candidate = prev[fromStage].find((c) => c.id === candidateId);
                if (!candidate) return prev;

                const event: MoveEvent = {
                    candidateId,
                    candidateName: candidate.name,
                    fromStage,
                    toStage,
                    timestamp: Date.now(),
                };
                setMoveHistory((h) => [event, ...h]);

                return {
                    ...prev,
                    [fromStage]: prev[fromStage].filter((c) => c.id !== candidateId),
                    [toStage]: [...prev[toStage], { ...candidate, daysInStage: 0 }],
                };
            });
        },
        []
    );

    /** Undo the last move */
    const undoLastMove = useCallback(() => {
        if (moveHistory.length === 0) return;
        const last = moveHistory[0];
        setBoard((prev) => {
            const candidate = prev[last.toStage].find((c) => c.id === last.candidateId);
            if (!candidate) return prev;
            return {
                ...prev,
                [last.toStage]: prev[last.toStage].filter((c) => c.id !== last.candidateId),
                [last.fromStage]: [...prev[last.fromStage], candidate],
            };
        });
        setMoveHistory((h) => h.slice(1));
    }, [moveHistory]);

    /** Reset board to initial state */
    const resetBoard = useCallback(() => {
        setBoard(initialBoard);
        setMoveHistory([]);
    }, [initialBoard]);

    // ─── Drag Props Generators ───────────────────────

    /** Props to spread on a draggable candidate card */
    const getDragProps = useCallback(
        (candidateId: string, stageId: StageId) => ({
            draggable: true,
            onDragStart: (e: React.DragEvent) => {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", candidateId);
                // Delay to allow browser to capture drag image
                requestAnimationFrame(() => handleDragStart(candidateId, stageId));
            },
            onDragEnd: handleDragEnd,
        }),
        [handleDragStart, handleDragEnd]
    );

    /** Props to spread on a droppable stage column */
    const getDropZoneProps = useCallback(
        (stageId: StageId) => ({
            onDragOver: (e: React.DragEvent) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
            },
            onDragEnter: (e: React.DragEvent) => {
                e.preventDefault();
                handleDragEnter(stageId);
            },
            onDragLeave: () => handleDragLeave(stageId),
            onDrop: (e: React.DragEvent) => {
                e.preventDefault();
                handleDrop(stageId);
            },
        }),
        [handleDragEnter, handleDragLeave, handleDrop]
    );

    return {
        board,
        dragState,
        moveHistory,
        isDragging: dragState.candidateId !== null,
        moveCandidate,
        undoLastMove,
        resetBoard,
        getDragProps,
        getDropZoneProps,
    };
}
