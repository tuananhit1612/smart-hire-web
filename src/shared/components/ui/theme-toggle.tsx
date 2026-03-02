"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Wait for mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className={cn(
          "relative p-2 rounded-full transition-colors",
          "bg-slate-100 dark:bg-slate-800",
          "hover:bg-slate-200 dark:hover:bg-slate-700",
          className
        )}
      >
        <span className="w-5 h-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative p-2 rounded-full transition-all duration-300",
        "bg-slate-100 dark:bg-slate-800",
        "hover:bg-slate-200 dark:hover:bg-slate-700",
        "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
        "dark:focus:ring-offset-slate-900",
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "w-5 h-5 transition-all duration-300",
          "text-amber-500",
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        )}
      />
      <Moon
        className={cn(
          "absolute top-2 left-2 w-5 h-5 transition-all duration-300",
          "text-slate-400",
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
        )}
      />
    </button>
  );
}
