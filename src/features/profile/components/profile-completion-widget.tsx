"use client";

import * as React from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Check, X, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { CandidateProfile } from "../types/profile";
import {
  calculateProfileCompletion,
  getCompletionLevel,
  CompletionSection,
} from "../utils/profile-completion-utils";

interface ProfileCompletionWidgetProps {
  profile: CandidateProfile;
  showSections?: boolean;
  compact?: boolean;
}

// Animated counter component
function AnimatedCounter({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    spring.set(value);
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [value, spring, display]);

  return <span>{displayValue}</span>;
}

// Circular progress ring
function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 8,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
      </svg>

      {/* Progress circle with gradient */}
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground">
          <AnimatedCounter value={percentage} />
          <span className="text-lg">%</span>
        </span>
      </div>
    </div>
  );
}

// Section item
function SectionItem({
  section,
  index,
}: {
  section: CompletionSection;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index + 0.5 }}
      className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
        section.isComplete
          ? "bg-green-500/10"
          : "bg-muted/30 hover:bg-muted/50"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center ${
          section.isComplete
            ? "bg-green-500 text-white"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {section.isComplete ? (
          <Check className="w-3 h-3" />
        ) : (
          <X className="w-3 h-3" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${
            section.isComplete ? "text-green-600 dark:text-green-400" : "text-foreground"
          }`}
        >
          {section.label}
        </p>
        {!section.isComplete && (
          <p className="text-xs text-muted-foreground truncate">
            {section.description}
          </p>
        )}
      </div>
      <span className="text-xs font-medium text-muted-foreground">
        {section.weight}%
      </span>
    </motion.div>
  );
}

export function ProfileCompletionWidget({
  profile,
  showSections = true,
  compact = false,
}: ProfileCompletionWidgetProps) {
  const { percentage, sections, missingItems } = calculateProfileCompletion(profile);
  const level = getCompletionLevel(percentage);

  if (percentage >= 100 && compact) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 dark:bg-[#22c55e] backdrop-blur-xl border border-white/20 dark:border-[#22c55e]/30 rounded-3xl shadow-xl shadow-[#22c55e]/20 p-6"
    >
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Left: Circular Progress */}
        <div className="flex flex-col items-center gap-3">
          <CircularProgress percentage={percentage} />
          <div className="text-center">
            <p className={`text-sm font-semibold ${level.color}`}>
              {level.label}
            </p>
            {missingItems.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                Còn {missingItems.length} mục chưa hoàn thiện
              </p>
            )}
          </div>
        </div>

        {/* Right: Sections & CTA */}
        <div className="flex-1 w-full">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#22c55e]" />
            <h3 className="text-lg font-bold text-[#1C252E] dark:text-[#22c55e]">
              Độ hoàn thiện hồ sơ
            </h3>
          </div>

          {/* Section list */}
          {showSections && (
            <div className="space-y-2 mb-4 max-h-[200px] overflow-y-auto pr-2">
              {sections.map((section, index) => (
                <SectionItem key={section.id} section={section} index={index} />
              ))}
            </div>
          )}

          {/* CTA Button */}
          {percentage < 100 && (
            <Link href="/profile/edit" className="block">
              <Button className="w-full bg-gradient-to-r from-[#22c55e] to-green-500 hover:from-[#22c55e] hover:to-green-600 text-white shadow-lg hover:scale-105 transition-transform">
                Hoàn thiện hồ sơ ngay
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}

          {percentage >= 100 && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">
                Hồ sơ đã hoàn thiện! Bạn đã sẵn sàng ứng tuyển.
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

