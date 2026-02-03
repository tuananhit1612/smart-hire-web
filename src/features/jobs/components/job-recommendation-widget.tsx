"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, TrendingUp, MapPin, Briefcase, ChevronRight } from "lucide-react";
import { Job } from "../types/job";
import { mockJobs } from "../types/mock-jobs";
import { getRecommendedJobs, JobMatchResult } from "../utils/job-recommendation-utils";
import { CandidateProfile } from "@/features/profile/types/profile";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface JobRecommendationWidgetProps {
  profile: CandidateProfile;
}

export function JobRecommendationWidget({ profile }: JobRecommendationWidgetProps) {
  const recommendations = getRecommendedJobs(profile, mockJobs, 3);

  // Empty state - not enough profile data
  if (recommendations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            Việc làm gợi ý
          </h3>
        </div>
        <div className="text-center py-6">
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Hoàn thiện hồ sơ của bạn để nhận được gợi ý việc làm phù hợp!
          </p>
          <Link href="/profile/edit">
            <Button variant="outline" className="rounded-full">
              Cập nhật hồ sơ
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Việc làm gợi ý cho bạn
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Dựa trên hồ sơ của bạn
            </p>
          </div>
        </div>
        <Link href="/jobs">
          <Button variant="ghost" size="sm" className="text-sky-600 dark:text-sky-400">
            Xem tất cả
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Recommendation Cards */}
      <div className="space-y-4">
        {recommendations.map((result, index) => (
          <RecommendationCard key={result.job.id} result={result} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

interface RecommendationCardProps {
  result: JobMatchResult;
  index: number;
}

function RecommendationCard({ result, index }: RecommendationCardProps) {
  const { job, score, matchReasons } = result;

  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30";
    if (score >= 50) return "text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/30";
    return "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/jobs/${job.id}`}>
        <div className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
          {/* Match Score Circle */}
          <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center shrink-0 ${getScoreColor(score)}`}>
            <span className="text-lg font-bold">{score}%</span>
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-1">
                  {job.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                  {job.company}
                </p>
              </div>
              <div className="shrink-0">
                <img
                  src={job.logoUrl}
                  alt={job.company}
                  className="w-10 h-10 rounded-lg bg-white dark:bg-slate-700 p-1"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-slate-200/50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-1 px-2 py-0.5">
                <MapPin className="w-3 h-3" />
                {job.location}
              </Badge>
              <Badge variant="secondary" className="bg-slate-200/50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-1 px-2 py-0.5">
                <Briefcase className="w-3 h-3" />
                {job.type}
              </Badge>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                {job.salary}
              </span>
            </div>

            {/* Match Reasons */}
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-3.5 h-3.5 text-purple-500 shrink-0" />
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {matchReasons[0]}
              </p>
            </div>
          </div>

          {/* Arrow */}
          <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-sky-500 transition-colors shrink-0 self-center" />
        </div>
      </Link>
    </motion.div>
  );
}
