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
export { EmptyState,type EmptyStateProps } from "./empty-state";
export { ErrorState,type ErrorStateProps } from "./error-state";
export { LoadingState,type LoadingStateProps } from "./loading-state";
export { StateContainer,type StateContainerProps } from "./state-container";

// ─── Skeleton Presets ────────────────────────────────────
export {
CardGridSkeleton,CardSkeleton,ListSkeleton,ProfileSkeleton,TableSkeleton,type CardGridSkeletonProps,type CardSkeletonProps,type ListSkeletonProps,type TableSkeletonProps
} from "./skeletons";
