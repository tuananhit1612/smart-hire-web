/**
 * ═══════════════════════════════════════════════════════════
 *  Shared State Components — Barrel Export
 *
 *  Usage:
 *    import { LoadingState, ErrorState, EmptyState, StateContainer } from "@/shared/components/states";
 *    import { CardGridSkeleton, TableSkeleton } from "@/shared/components/states";
 * ═══════════════════════════════════════════════════════════
 */

// ─── State Components ────────────────────────────────────
export { LoadingState, type LoadingStateProps } from "./loading-state";
export { ErrorState, type ErrorStateProps } from "./error-state";
export { EmptyState, type EmptyStateProps } from "./empty-state";
export { StateContainer, type StateContainerProps } from "./state-container";

// ─── Skeleton Presets ────────────────────────────────────
export {
    CardSkeleton,
    CardGridSkeleton,
    TableSkeleton,
    ProfileSkeleton,
    ListSkeleton,
    type CardSkeletonProps,
    type CardGridSkeletonProps,
    type TableSkeletonProps,
    type ListSkeletonProps,
} from "./skeletons";
