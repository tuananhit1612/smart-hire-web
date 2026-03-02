"use client";

import Link from "next/link";
import { Job } from "../types/job";
import { MapPin, Heart, Clock, Briefcase } from "lucide-react";

interface JobCardProps {
  job: Job;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  onApply?: (id: string) => void;
  index?: number;
}

export function JobCard({ job, isSaved = false, onSave, onApply, index = 0 }: JobCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Senior":
      case "Lead":
      case "Manager":
        return "bg-[#FFAB00]/10 text-[#FFAB00] border-[#FFAB00]/20";
      case "Middle":
        return "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20";
      case "Junior":
      case "Fresher":
      case "Intern":
        return "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20";
      default:
        return "bg-[rgba(145,158,171,0.04)] text-[#637381] border-[rgba(145,158,171,0.12)]";
    }
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return "Vừa xong";
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ngày trước`;
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave?.(job.id);
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onApply?.(job.id);
  };

  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <div
        style={{
          animationDelay: `${index * 60}ms`,
        }}
        className="group animate-in fade-in duration-500 fill-mode-both bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-5 hover:border-[rgba(145,158,171,0.32)] dark:hover:border-white/[0.12] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out h-full relative overflow-hidden"
      >
        {/* Saved indicator */}
        {isSaved && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-[#FF5630] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Heart className="w-3 h-3 fill-current" />
              Đã lưu
            </div>
          </div>
        )}

        {/* Green glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#22C55E]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="relative flex flex-col h-full gap-4">
          {/* Header */}
          <div className="flex justify-between items-start gap-3">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1C252E] p-1 border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] flex items-center justify-center shrink-0">
                <img src={job.logoUrl} alt={job.company} className="w-full h-full object-contain rounded-lg" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#1C252E] dark:text-white line-clamp-1 group-hover:text-[#22C55E] transition-colors duration-200">
                  {job.title}
                </h3>
                <p className="text-[13px] font-medium text-[#637381] dark:text-[#919EAB]">
                  {job.company}
                </p>
              </div>
            </div>
            <p className="text-[11px] font-medium text-[#919EAB] flex items-center gap-1 shrink-0 bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] px-2.5 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              {getRelativeTime(job.postedAt)}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className={`border rounded-lg px-2.5 py-0.5 text-[12px] font-semibold ${getLevelColor(job.level)}`}>
              {job.level}
            </span>
            <span className="bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] text-[#637381] dark:text-[#C4CDD5] text-[12px] flex items-center gap-1 px-2.5 py-0.5 rounded-lg">
              <MapPin className="w-3 h-3" />
              {job.location}
            </span>
            <span className="bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] text-[#637381] dark:text-[#C4CDD5] text-[12px] flex items-center gap-1 px-2.5 py-0.5 rounded-lg">
              <Briefcase className="w-3 h-3" />
              {job.type}
            </span>
          </div>

          {/* Salary & Desc */}
          <div className="space-y-2">
            <p className="font-bold text-[#22C55E] text-[14px]">
              {job.salary}
            </p>
            <p className="text-[13px] text-[#637381] dark:text-[#919EAB] line-clamp-2 leading-relaxed">
              {job.description}
            </p>
          </div>

          <div className="flex-grow" />

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 pt-4 mt-2 border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.06]">
            <button
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${isSaved
                  ? "text-[#FF5630] bg-[#FF5630]/10"
                  : "text-[#919EAB] hover:text-[#FF5630] hover:bg-[#FF5630]/10"
                }`}
              onClick={handleSaveClick}
            >
              <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
            </button>
            <button
              className="flex-1 h-10 bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] text-[13px] font-bold rounded-xl hover:bg-[#1C252E]/90 dark:hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
              onClick={handleApplyClick}
            >
              Ứng tuyển ngay
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
