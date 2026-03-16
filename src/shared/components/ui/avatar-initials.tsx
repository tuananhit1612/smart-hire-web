import { cn } from "@/shared/utils/cn";

/**
 * ═══════════════════════════════════════════════════════════
 *  Avatar Initials — Displays 2-3 letter initials in a
 *  colored box. Replaces duplicated inline avatar patterns.
 * ═══════════════════════════════════════════════════════════
 */

type AvatarSize = "xs" | "sm" | "md" | "lg";

const SIZE_MAP: Record<AvatarSize, string> = {
    xs: "w-6 h-6 text-[8px]",
    sm: "w-8 h-8 text-[10px]",
    md: "w-10 h-10 text-xs",
    lg: "w-12 h-12 text-sm",
};

interface AvatarInitialsProps {
    /** 2-3 character initials */
    readonly initials: string;
    /** Size variant */
    readonly size?: AvatarSize;
    /** Override background/color classes */
    readonly colorClassName?: string;
    /** Shape: "rounded-lg" or "rounded-full" */
    readonly shape?: "square" | "circle";
    readonly className?: string;
}

export function AvatarInitials({
    initials,
    size = "sm",
    colorClassName = "bg-gradient-to-br from-[#22c55e] to-[#10b981] text-white shadow-lg shadow-green-500/25",
    shape = "circle",
    className,
}: AvatarInitialsProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-center font-bold shrink-0",
                SIZE_MAP[size],
                shape === "circle" ? "rounded-full" : "rounded-lg",
                colorClassName,
                className,
            )}
        >
            {initials}
        </div>
    );
}
