"use client";

import Link from "next/link";
import { LucideIcon, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    gradient: string; // e.g. "from-[#22C55E] to-[#16A34A]"
    badge?: string;
    featured?: boolean;
}

export function FeatureCard({
    title,
    description,
    icon: Icon,
    href,
    gradient,
    badge,
    featured,
}: Props) {
    return (
        <Link
            href={href}
            className={cn(
                "group relative flex flex-col rounded-2xl p-5 border transition-all duration-300 overflow-hidden",
                "bg-white dark:bg-[#1C252E]",
                "border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]",
                "hover:border-[rgba(145,158,171,0.32)] dark:hover:border-white/20",
                "hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/30"
            )}
        >
            {/* Gradient glow corner on hover */}
            <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500 pointer-events-none`} />

            {/* Featured ribbon */}
            {featured && (
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-[#22C55E]/30">
                    <Sparkles className="w-2.5 h-2.5" />
                    Mới
                </span>
            )}

            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Text */}
            <div className="flex-1">
                {badge && (
                    <span className="inline-flex items-center mb-2 text-[10px] font-bold text-[#22C55E] uppercase tracking-wider bg-[#22C55E]/10 px-2 py-0.5 rounded-full">
                        {badge}
                    </span>
                )}
                <h3 className="text-base font-bold text-[#1C252E] dark:text-white mb-1 group-hover:text-[#22C55E] transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-[#637381] dark:text-[#919EAB] leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Arrow CTA */}
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#919EAB] group-hover:text-[#22C55E] transition-colors">
                <span>Mở</span>
                <ArrowRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            </div>
        </Link>
    );
}
