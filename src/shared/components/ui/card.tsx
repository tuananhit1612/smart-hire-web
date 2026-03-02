"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "glass" | "bordered" | "elevated" | "premium";
    interactive?: boolean;
    hoverEffect?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "default", interactive = false, hoverEffect = false, ...props }, ref) => {
        const variants = {
            // Default - White/Light card (Design System)
            default: "bg-white dark:bg-[#1C252E] border border-[#E5E7EB] dark:border-[#2D3748] shadow-md",
            // Glass - Glassmorphism effect (Design System)
            glass: "bg-white/80 dark:bg-[#1C252E]/80 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg",
            // Bordered - Only border, no shadow
            bordered: "bg-transparent border-2 border-[#E5E7EB] dark:border-[#2D3748]",
            // Elevated - Premium elevated card (Design System)
            elevated: "bg-white dark:bg-[#1C252E] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300",
            // Premium - Interactive purple themed (Design System)
            premium: "bg-white dark:bg-[#1C252E] border border-[#E5E7EB] dark:border-[#2D3748] rounded-xl shadow-md hover:border-[#7635dc]/30 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300",
        };

        const baseClasses = cn(
            "rounded-xl text-card-foreground transition-all duration-300",
            variants[variant],
            className
        );

        if (interactive || hoverEffect) {
            return (
                <motion.div
                    ref={ref}
                    className={baseClasses}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.99 }}
                >
                    {props.children}
                </motion.div>
            );
        }

        return (
            <div
                ref={ref}
                className={baseClasses}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-xl font-semibold leading-none tracking-tight text-[#1C252E] dark:text-white",
            className
        )}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-[#637381] dark:text-[#919EAB]", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
