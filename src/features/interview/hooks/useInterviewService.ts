/**
 * ═════════════════════════════════════════════════════════
 *  Interview Hooks — State management for interview API
 *  Provides loading/error/data state for each operation.
 *  Uses useState-based approach (no React Query dependency).
 * ═════════════════════════════════════════════════════════
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import { interviewService } from "../api/interviewService";
import type {
    InterviewResponse,
    CreateInterviewRequest,
    UpdateInterviewRequest,
    InterviewStatus,
} from "../types/interview-types";

// ─── Shared State Type ───────────────────────────────

interface AsyncState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

// ─── Query Hooks ─────────────────────────────────────

/** Fetch interviews for the current authenticated user */
export function useMyInterviews() {
    const [state, setState] = useState<AsyncState<InterviewResponse[]>>({
        data: null,
        isLoading: false,
        error: null,
    });

    const fetch = useCallback(async () => {
        setState((s) => ({ ...s, isLoading: true, error: null }));
        try {
            const data = await interviewService.getMy();
            setState({ data, isLoading: false, error: null });
        } catch (err) {
            setState({ data: null, isLoading: false, error: (err as Error).message });
        }
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { ...state, refetch: fetch };
}

/** Fetch interviews for a specific application */
export function useInterviewsByApplication(applicationId: number | null) {
    const [state, setState] = useState<AsyncState<InterviewResponse[]>>({
        data: null,
        isLoading: false,
        error: null,
    });

    const fetch = useCallback(async () => {
        if (!applicationId) return;
        setState((s) => ({ ...s, isLoading: true, error: null }));
        try {
            const data = await interviewService.getByApplication(applicationId);
            setState({ data, isLoading: false, error: null });
        } catch (err) {
            setState({ data: null, isLoading: false, error: (err as Error).message });
        }
    }, [applicationId]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { ...state, refetch: fetch };
}

// ─── Mutation Hooks ──────────────────────────────────

/** Create a new interview room */
export function useCreateInterview() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = useCallback(async (data: CreateInterviewRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await interviewService.create(data);
            setIsLoading(false);
            return result;
        } catch (err) {
            const message = (err as Error).message;
            setError(message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    return { mutate, isLoading, error };
}

/** Update an existing interview */
export function useUpdateInterview() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = useCallback(async (id: number, data: UpdateInterviewRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await interviewService.update(id, data);
            setIsLoading(false);
            return result;
        } catch (err) {
            const message = (err as Error).message;
            setError(message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    return { mutate, isLoading, error };
}

/** Change interview status */
export function useChangeInterviewStatus() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = useCallback(async (id: number, status: InterviewStatus) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await interviewService.changeStatus(id, status);
            setIsLoading(false);
            return result;
        } catch (err) {
            const message = (err as Error).message;
            setError(message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    return { mutate, isLoading, error };
}

/** Delete an interview */
export function useDeleteInterview() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = useCallback(async (id: number) => {
        setIsLoading(true);
        setError(null);
        try {
            await interviewService.delete(id);
            setIsLoading(false);
        } catch (err) {
            const message = (err as Error).message;
            setError(message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    return { mutate, isLoading, error };
}
