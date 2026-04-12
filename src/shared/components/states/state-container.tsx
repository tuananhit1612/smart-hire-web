"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  StateContainer — Smart wrapper for data-driven views
 *
 *  Automatically renders the appropriate state:
 *   1. Loading  → LoadingState
 *   2. Error    → ErrorState with retry
 *   3. Empty    → EmptyState
 *   4. Content  → children
 *
 *  Eliminates repetitive if/else chains in pages.
 * ═══════════════════════════════════════════════════════════
 */

import { type ReactNode } from "react";
import { Inbox, type LucideIcon } from "lucide-react";
import { LoadingState, type LoadingStateProps } from "./loading-state";
import { ErrorState, type ErrorStateProps } from "./error-state";
import { EmptyState, type EmptyStateProps } from "./empty-state";

// ─── Props ───────────────────────────────────────────────

export interface StateContainerProps {
    /** Whether data is loading */
    readonly isLoading?: boolean;
    /** Error message — shows ErrorState when truthy */
    readonly error?: string | null;
    /** Whether the dataset is empty (checked after loading + no error) */
    readonly isEmpty?: boolean;
    /** Retry handler for error state */
    readonly onRetry?: () => void;

    // ─── Customization ──────────────────────────────────

    /** Custom loading fallback (overrides default LoadingState) */
    readonly loadingFallback?: ReactNode;
    /** Custom error fallback (overrides default ErrorState) */
    readonly errorFallback?: ReactNode;
    /** Custom empty fallback (overrides default EmptyState) */
    readonly emptyFallback?: ReactNode;

    /** Loading text */
    readonly loadingText?: string;
    /** Loading variant */
    readonly loadingVariant?: LoadingStateProps["variant"];

    /** Empty state config */
    readonly emptyTitle?: string;
    readonly emptyDescription?: string;
    readonly emptyIcon?: LucideIcon;
    readonly emptyAction?: ReactNode;

    /** Error type */
    readonly errorType?: ErrorStateProps["type"];

    /** Content variant shared across states */
    readonly variant?: "page" | "inline";

    /** Extra wrapper class */
    readonly className?: string;

    /** Content to render when data is available */
    readonly children: ReactNode;
}

// ─── Component ───────────────────────────────────────────

export function StateContainer({
    isLoading = false,
    error,
    isEmpty = false,
    onRetry,
    loadingFallback,
    errorFallback,
    emptyFallback,
    loadingText,
    loadingVariant,
    emptyTitle = "Chưa có dữ liệu",
    emptyDescription = "Dữ liệu sẽ hiển thị tại đây khi có.",
    emptyIcon = Inbox,
    emptyAction,
    errorType,
    variant = "inline",
    className,
    children,
}: StateContainerProps) {
    // 1. Loading
    if (isLoading) {
        return (
            <>
                {loadingFallback ?? (
                    <LoadingState
                        variant={loadingVariant ?? variant}
                        text={loadingText}
                        className={className}
                    />
                )}
            </>
        );
    }

    // 2. Error
    if (error) {
        return (
            <>
                {errorFallback ?? (
                    <ErrorState
                        description={error}
                        onRetry={onRetry}
                        variant={variant}
                        type={errorType}
                        className={className}
                    />
                )}
            </>
        );
    }

    // 3. Empty
    if (isEmpty) {
        return (
            <>
                {emptyFallback ?? (
                    <EmptyState
                        icon={emptyIcon}
                        title={emptyTitle}
                        description={emptyDescription}
                        action={emptyAction}
                        variant={variant}
                        className={className}
                    />
                )}
            </>
        );
    }

    // 4. Content
    return <>{children}</>;
}
