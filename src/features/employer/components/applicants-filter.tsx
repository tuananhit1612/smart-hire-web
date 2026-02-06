// src/features/employer/components/applicants-filter.tsx
"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { 
    Search, 
    Filter, 
    ArrowDownWideNarrow, 
    ArrowUpWideNarrow,
    Sparkles
} from "lucide-react";
import { useState } from "react";

interface ApplicantsFilterProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortBy: "score-desc" | "score-asc" | "date-desc";
    onSortChange: (sort: "score-desc" | "score-asc" | "date-desc") => void;
}

export function ApplicantsFilter({ 
    searchQuery, 
    onSearchChange,
    sortBy,
    onSortChange
}: ApplicantsFilterProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm sticky top-20 z-10">
            {/* Search */}
            <div className="relative w-full md:w-80 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                <Input 
                    placeholder="Tìm theo tên, kỹ năng..." 
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 rounded-xl bg-slate-50 border-slate-200 focus:ring-sky-500/20"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <Button 
                    variant="outline" 
                    size="sm" 
                    className={`rounded-full border-slate-200 gap-2 ${sortBy.includes('score') ? 'bg-sky-50 text-sky-700 border-sky-200' : 'text-slate-600'}`}
                    onClick={() => onSortChange("score-desc")}
                >
                    <Sparkles className="w-4 h-4" />
                    AI Match
                    {sortBy === "score-desc" && <ArrowDownWideNarrow className="w-3 h-3 ml-1" />}
                </Button>
                
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full border-slate-200 gap-2 text-slate-600"
                    onClick={() => onSortChange("date-desc")}
                >
                    Mới nhất
                </Button>

                <div className="h-6 w-px bg-slate-200 mx-2" />

                <Button variant="ghost" size="icon" className="rounded-full text-slate-400">
                    <Filter className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
