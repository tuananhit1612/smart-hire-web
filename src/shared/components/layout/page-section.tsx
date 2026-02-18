import { type ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

/**
 * ═══════════════════════════════════════════════════════════
 *  Page Section — Shared wrapper for main content sections.
 *  Replaces `<section className="relative z-10 pt-24 ...">`.
 *  Used in 9+ pages across employer, admin, and interview.
 * ═══════════════════════════════════════════════════════════
 */

interface PageSectionProps {
    readonly children: ReactNode;
    /** Extra class added to outer section */
    readonly className?: string;
    /** Max-width of inner container (default: max-w-6xl) */
    readonly maxWidth?: string;
}

export function PageSection({ children, className, maxWidth = "max-w-6xl" }: PageSectionProps) {
    return (
        <section className={cn("relative z-10 pt-24 pb-12 md:pt-28", className)}>
            <div className={cn("mx-auto px-4 sm:px-6", maxWidth)}>{children}</div>
        </section>
    );
}
