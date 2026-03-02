import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

// Design System Badge Variants - Purple (#7635dc) + Status Colors
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 cursor-default",
  {
    variants: {
      variant: {
        // Primary - Purple (Design System)
        default:
          "bg-[#EBD6FD] text-[#431A9E] border border-[#7635dc]/30 dark:bg-[#7635dc]/20 dark:text-[#EBD6FD] dark:border-[#7635dc]/40",
        // Secondary - Purple variant
        secondary:
          "bg-[#C684FF]/20 text-[#5119B7] border border-[#8E33FF]/30 dark:bg-[#8E33FF]/20 dark:text-[#C684FF] dark:border-[#8E33FF]/40",
        // Success - Green
        success:
          "bg-[#22C55E]/10 text-[#16A34A] border border-[#22C55E]/20 dark:bg-[#22C55E]/20 dark:text-[#4ADE80] dark:border-[#22C55E]/30",
        // Warning - Yellow/Amber
        warning:
          "bg-[#FFAB00]/10 text-[#D97706] border border-[#FFAB00]/20 dark:bg-[#FFAB00]/20 dark:text-[#FFD666] dark:border-[#FFAB00]/30",
        // Error - Red
        destructive:
          "bg-[#FF5630]/10 text-[#DC2626] border border-[#FF5630]/20 dark:bg-[#FF5630]/20 dark:text-[#FF6B4A] dark:border-[#FF5630]/30",
        // Info - Cyan
        info:
          "bg-[#00B8D9]/10 text-[#0891B2] border border-[#00B8D9]/20 dark:bg-[#00B8D9]/20 dark:text-[#33C9E4] dark:border-[#00B8D9]/30",
        // Outline - Purple border
        outline: "border border-[#7635dc] text-[#7635dc] bg-transparent dark:border-[#C684FF] dark:text-[#C684FF]",
        // Ghost - Subtle
        ghost: "bg-[#F9FAFB] text-[#637381] border border-transparent dark:bg-[#1C252E] dark:text-[#919EAB]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
