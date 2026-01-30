"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Job } from "../types/job";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { MapPin, Heart, Clock, Briefcase } from "lucide-react";

interface JobCardProps {
  job: Job;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  onApply?: (id: string) => void;
}

export function JobCard({ job, isSaved = false, onSave, onApply }: JobCardProps) {
  // Determine badge color based on level
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Senior":
      case "Lead":
      case "Manager":
        return "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "Middle":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "Junior":
      case "Fresher":
      case "Intern":
        return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 border-green-200 dark:border-green-800";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300 border-slate-200 dark:border-slate-800";
    }
  };

  // Format relative time (basic implementation)
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Vừa xong";
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ngày trước`;
  };

  // Handle save button click without navigating
  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave?.(job.id);
  };

  // Handle apply button click without navigating
  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onApply?.(job.id);
  };

  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="group bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 relative overflow-hidden h-full"
      >
        {/* Saved indicator */}
        {isSaved && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Heart className="w-3 h-3 fill-current" />
              Đã lưu
            </div>
          </div>
        )}

        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="relative flex flex-col h-full gap-4">
          {/* Header */}
          <div className="flex justify-between items-start gap-3">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 p-1 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center shrink-0">
                <img src={job.logoUrl} alt={job.company} className="w-full h-full object-contain rounded-lg" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">
                  {job.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {job.company}
                </p>
              </div>
            </div>
            <p className="text-xs font-medium text-slate-400 flex items-center gap-1 shrink-0 bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              {getRelativeTime(job.postedAt)}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={`border rounded-md px-2 py-0.5 text-xs font-semibold ${getLevelColor(job.level)}`}>
              {job.level}
            </Badge>
            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-normal text-xs flex items-center gap-1">
               <MapPin className="w-3 h-3" />
               {job.location}
            </Badge>
            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-normal text-xs flex items-center gap-1">
               <Briefcase className="w-3 h-3" />
               {job.type}
            </Badge>
          </div>

          {/* Salary & Desc */}
          <div className="mt-1 space-y-2">
              <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {job.salary}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {job.description}
              </p>
          </div>

          <div className="flex-grow" />

          {/* Footer actions */}
          <div className="flex items-center justify-between gap-3 pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
              <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`transition-colors rounded-full ${
                    isSaved 
                      ? "text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30" 
                      : "text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  }`}
                  onClick={handleSaveClick}
              >
                  <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
              </Button>
              <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-lg shadow-blue-500/25 rounded-full font-semibold group-hover:scale-105 transition-all duration-300"
                  onClick={handleApplyClick}
              >
                  Ứng tuyển ngay
              </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
