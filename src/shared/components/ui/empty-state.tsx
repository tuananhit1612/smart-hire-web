import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";

/**
 * ═══════════════════════════════════════════════════════════
 *  Empty State — Reusable "no data" component with icon,
 *  title, description, and optional action button.
 * ═══════════════════════════════════════════════════════════
 */

interface EmptyStateProps {
    /** Lucide icon component */
    readonly icon: LucideIcon;
    /** Primary heading */
    readonly title: string;
    /** Supporting description */
    readonly description?: string;
    /** Optional action below the description */
    readonly action?: ReactNode;
    /** Extra wrapper class */
    readonly className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
            <Icon className="w-10 h-10 text-slate-200 mb-3" />
            <p className="text-sm font-medium text-slate-400">{title}</p>
            {description && (
                <p className="text-xs text-slate-300 mt-1 max-w-xs">{description}</p>
            )}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
