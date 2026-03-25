"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  ArrowRight,
  Trash2,
  Loader2
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  mockApplications,
  Application,
  ApplicationTimelineEvent
} from "@/features/jobs/types/mock-applications";
import { ApplicationTrackingResponse } from "@/features/jobs/api/application-api";
import { ApplicationStatus, ApplicationStage } from "@/shared/types/application";
import { cn } from "@/shared/lib/utils";
import { useApplicationStore } from "@/features/jobs/stores/application-store";
import { CheckCircle2 } from "lucide-react";

// ─── Design Constants ─────────────────────────────────────────────────────────
const ACTIVE_STAGES = new Set([
  ApplicationStage.APPLIED,
  ApplicationStage.SCREENING,
  ApplicationStage.INTERVIEW,
  ApplicationStage.OFFER,
]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Map a backend ApplicationTrackingResponse to the view Application type used by ApplicationCard */
function toViewApplication(raw: ApplicationTrackingResponse): Application {
  const appliedAt = raw.appliedAt ?? new Date().toISOString();

  // Build a minimal 1-entry timeline from what the tracking endpoint gives us.
  // A richer timeline can be loaded on-demand from /applications/{id}.
  const timeline: ApplicationTimelineEvent[] = [
    {
      id: `evt-${raw.id}-applied`,
      stage: "APPLIED" as ApplicationStatus,
      title: "Đã nộp hồ sơ",
      date: appliedAt,
      isCompleted: true,
    },
  ];

  if (raw.currentStage !== "APPLIED") {
    const stageLabels: Record<string, string> = {
      SCREENING: "Đang xét duyệt",
      INTERVIEW: "Phỏng vấn",
      OFFER: "Đề nghị nhận việc",
      HIRED: "Đã nhận việc",
      REJECTED: "Từ chối",
    };
    timeline.push({
      id: `evt-${raw.id}-current`,
      stage: raw.currentStage as ApplicationStatus,
      title: stageLabels[raw.currentStage] ?? raw.currentStage,
      date: raw.updatedAt ?? appliedAt,
      isCompleted: true,
    });
  }

  return {
    id: String(raw.id),
    jobId: String(raw.jobId),
    // Synthesise a minimal Job object from the tracking fields
    job: {
      id: String(raw.jobId),
      title: raw.jobTitle,
      company: raw.companyName,
      // Placeholders — the real job detail page is linked via /jobs/{id}
      location: "",
      type: "",
      logoUrl: "",
      salary: "",
      description: "",
      tags: [],
      postedAt: appliedAt,
    } as unknown as Application["job"],
    status: raw.currentStage as ApplicationStatus,
    appliedAt,
    lastUpdated: raw.updatedAt ?? appliedAt,
    timeline,
  };
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: ApplicationStatus }) {
  const config = useMemo(() => {
    switch (status) {
      case ApplicationStage.APPLIED:
        return { color: "text-[#22c55e]", bg: "bg-[#22c55e]/10", border: "border-[#22c55e]/30", label: "Đã nộp hồ sơ" };
      case ApplicationStage.SCREENING:
        return { color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200", label: "Đang xét duyệt" };
      case ApplicationStage.INTERVIEW:
        return { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", label: "Phỏng vấn" };
      case ApplicationStage.OFFER:
        return { color: "text-green-700", bg: "bg-green-50", border: "border-green-200", label: "Đề nghị nhận việc" };
      case ApplicationStage.HIRED:
        return { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", label: "Đã nhận việc" };
      case ApplicationStage.REJECTED:
        return { color: "text-red-700", bg: "bg-red-50", border: "border-red-200", label: "Đã từ chối" };
      default:
        return { color: "text-slate-700", bg: "bg-slate-50", border: "border-slate-200", label: status };
    }
  }, [status]);

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-sm font-semibold border inline-flex items-center gap-1.5",
      config.bg, config.color, config.border
    )}>
      <span className={cn("w-2 h-2 rounded-full bg-current opacity-70")} />
      {config.label}
    </span>
  );
}

// ─── Skeleton Card ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 animate-pulse">
      <div className="flex gap-6">
        <div className="w-16 h-16 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-2/5" />
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-1/4" />
          <div className="flex gap-4 mt-4">
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-24" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-20" />
          </div>
        </div>
        <div className="h-7 w-28 bg-slate-200 dark:bg-slate-700 rounded-full shrink-0" />
      </div>
    </div>
  );
}

// ─── ApplicationCard ──────────────────────────────────────────────────────────
function ApplicationCard({ application }: { application: Application }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);
  const { withdrawApplication, withdrawingJobId, withdrawError, clearWithdrawError } = useApplicationStore();
  const isWithdrawing = withdrawingJobId === application.jobId;

  const handleWithdraw = async () => {
    if (!confirmWithdraw) {
      setConfirmWithdraw(true);
      return;
    }
    await withdrawApplication(application.jobId);
  };

  const currentEvent = useMemo(() =>
    application.timeline.find(e => !e.isCompleted) ||
    application.timeline[application.timeline.length - 1],
    [application.timeline]);

  const hasLocation = Boolean(application.job.location);
  const hasType = Boolean(application.job.type);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#22c55e]/20 hover:border-[#22c55e]/30 dark:hover:border-[#22c55e]/30 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo / Initials placeholder */}
          <div className="shrink-0">
            <div className="w-16 h-16 rounded-xl border border-[rgba(145,158,171,0.1)] dark:border-white/[0.06] bg-white dark:bg-[#1C252E] p-2 flex items-center justify-center shadow-sm">
              {application.job.logoUrl ? (
                <img
                  src={application.job.logoUrl}
                  alt={application.job.company}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-2xl font-bold text-[#22c55e]">
                  {application.job.company?.[0]?.toUpperCase() ?? "?"}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
              <div>
                <Link href={`/jobs/${application.job.id}`} className="block">
                  <h3 className="text-xl font-bold text-[#1C252E] dark:text-white group-hover:text-[#22c55e] dark:group-hover:text-[#22c55e] transition-colors">
                    {application.job.title}
                  </h3>
                </Link>
                <p className="text-[#637381] dark:text-[#919EAB] font-medium mt-1">
                  {application.job.company}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <StatusBadge status={application.status} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWithdraw();
                  }}
                  onBlur={() => setConfirmWithdraw(false)}
                  disabled={isWithdrawing}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 flex items-center gap-1.5",
                    isWithdrawing
                      ? "opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700"
                      : confirmWithdraw
                        ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:bg-red-100"
                        : "bg-white dark:bg-[#1C252E] text-[#637381] dark:text-[#919EAB] border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] hover:text-red-600 hover:border-red-300 hover:bg-red-50"
                  )}
                >
                  {isWithdrawing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  {isWithdrawing ? "Đang rút..." : confirmWithdraw ? "Xác nhận rút?" : "Rút hồ sơ"}
                </button>
                {withdrawError && withdrawingJobId === null && (
                  <button
                    onClick={(e) => { e.stopPropagation(); clearWithdrawError(); }}
                    className="text-xs text-red-500 dark:text-red-400 underline hover:no-underline"
                  >
                    {withdrawError}
                  </button>
                )}
              </div>
            </div>

            {/* Meta — only show if data is available */}
            <div className="flex flex-wrap gap-4 text-sm text-[#637381] dark:text-[#919EAB] mb-6">
              {hasLocation && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#22c55e]" />
                  {application.job.location}
                </div>
              )}
              {hasType && (
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#22c55e]" />
                  {application.job.type}
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#22c55e]" />
                {new Date(application.appliedAt).toLocaleDateString("vi-VN")}
              </div>
            </div>

            {/* Progress row */}
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-[rgba(145,158,171,0.06)] dark:bg-white/[0.04] rounded-xl p-4 border border-[rgba(145,158,171,0.1)] dark:border-white/[0.06] cursor-pointer hover:bg-[#22c55e]/10 dark:hover:bg-[#22c55e]/20 hover:border-[rgba(145,158,171,0.12)] dark:hover:border-[#22c55e]/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#919EAB] uppercase tracking-wider">
                  Tiến độ
                </span>
                <span className="text-xs text-[#22c55e] font-semibold flex items-center gap-1">
                  {isExpanded ? "Thu gọn" : "Chi tiết"}
                  <ArrowRight className={cn("w-3 h-3 transition-transform duration-300", isExpanded && "rotate-90")} />
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-semibold text-[#637381] dark:text-[#C4CDD5] text-sm">
                  {currentEvent?.title}
                </span>
                <span className="text-sm text-[#919EAB]">
                  • {currentEvent?.description || (currentEvent?.date && new Date(currentEvent.date).toLocaleDateString("vi-VN"))}
                </span>
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 pl-2 space-y-6 relative">
                    <div className="absolute left-[19px] top-8 bottom-4 w-0.5 bg-[rgba(145,158,171,0.15)] dark:bg-white/[0.08]" />
                    {application.timeline.map((event) => (
                      <div key={event.id} className="relative flex gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 z-10 bg-white dark:bg-[#1C252E]",
                          event.isCompleted
                            ? "border-green-500 text-green-500"
                            : "border-[rgba(145,158,171,0.2)] dark:border-white/[0.1] text-[#C4CDD5] dark:text-[#637381]"
                        )}>
                          {event.isCompleted
                            ? <CheckCircle2 className="w-5 h-5" />
                            : <div className="w-2 h-2 rounded-full bg-[rgba(145,158,171,0.3)] dark:bg-white/[0.15]" />}
                        </div>
                        <div className="flex-1 pt-2">
                          <h5 className={cn("font-semibold", event.isCompleted ? "text-[#1C252E] dark:text-white" : "text-[#919EAB]")}>
                            {event.title}
                          </h5>
                          {event.description && (
                            <p className="text-sm text-[#637381] dark:text-[#919EAB] mt-1">{event.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    serverApplications,
    isLoadingApplications,
    applicationsError,
    fetchApplications,
    appliedJobIds,
    applicationDates,
  } = useApplicationStore();

  // Fetch real data from the backend on mount
  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * allApplications builds the final list combining:
   *   1. Real server data (preferred when available)
   *   2. Fallback: locally-applied job IDs merged with mockApplications
   *      — used when the fetch fails (e.g. user not logged in)
   */
  const allApplications = useMemo((): Application[] => {
    // If we have server data, use it exclusively
    if (serverApplications.length > 0) {
      return serverApplications.map(toViewApplication);
    }

    // Fallback: merge locally applied jobs + mock data
    const userApplications = appliedJobIds
      .map(jobId => {
        const appliedAt = applicationDates[jobId] || new Date().toISOString();
        const mockJob = mockApplications.find(a => a.jobId === jobId)?.job;
        if (!mockJob) return null;

        const app: Application = {
          id: `local-${jobId}`,
          jobId,
          job: mockJob,
          status: "APPLIED" as ApplicationStatus,
          appliedAt,
          lastUpdated: appliedAt,
          timeline: [
            {
              id: `evt-${jobId}-1`,
              stage: "APPLIED" as ApplicationStatus,
              title: "Đã nộp hồ sơ",
              date: appliedAt,
              isCompleted: true,
            },
          ],
        };
        return app;
      })
      .filter((a): a is Application => a !== null);

    const userJobIds = new Set(userApplications.map(a => a.jobId));
    const nonDuplicateMocks = [...mockApplications].filter(a => !userJobIds.has(a.jobId));
    return [...userApplications, ...nonDuplicateMocks];
  }, [serverApplications, appliedJobIds, applicationDates]);

  const filteredApplications = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return allApplications.filter(app => {
      const isActive = ACTIVE_STAGES.has(app.status as ApplicationStage);
      if (activeTab === "active" ? !isActive : isActive) return false;
      return !query
        || app.job.title?.toLowerCase().includes(query)
        || app.job.company?.toLowerCase().includes(query);
    });
  }, [activeTab, searchQuery, allApplications]);

  return (
    <div className="w-full bg-transparent font-sans pt-6 pb-12 relative z-10">
      <div className="container mx-auto px-4 max-w-5xl">

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold text-[#1C252E] dark:text-white mb-3 tracking-tight">
            Hồ sơ ứng tuyển
          </h1>
          <p className="text-[#637381] dark:text-[#919EAB] text-lg">
            Theo dõi hành trình sự nghiệp của bạn.
          </p>
        </div>

        {/* Sticky toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 sticky top-20 z-30 bg-white/90 dark:bg-[#1C252E]/90 backdrop-blur-xl py-4 rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-sm px-6">
          <div className="flex p-1 bg-[rgba(145,158,171,0.1)] dark:bg-white/[0.06] rounded-full w-full md:w-auto">
            {(["active", "archived"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 md:flex-none px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                  activeTab === tab
                    ? "bg-white dark:bg-[#1C252E] text-[#22c55e] dark:text-[#22c55e] shadow-md"
                    : "text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white"
                )}
              >
                {tab === "active" ? "Đang ứng tuyển" : "Lịch sử"}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#919EAB] group-focus-within:text-[#22c55e] transition-colors" />
            <Input
              placeholder="Tìm theo vị trí..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 rounded-2xl bg-[rgba(145,158,171,0.06)] dark:bg-white/[0.04] border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] focus:border-[#22c55e]/30 focus:ring-[#22c55e]/50"
            />
          </div>
        </div>

        {/* Error banner (non-blocking) */}
        {applicationsError && serverApplications.length === 0 && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-sm">
            ⚠ Không thể tải dữ liệu từ máy chủ — đang hiển thị dữ liệu mẫu.
            {" "}
            <span className="opacity-60 text-xs">({applicationsError})</span>
          </div>
        )}

        {/* Card list */}
        <div className="space-y-6">
          {isLoadingApplications ? (
            // Skeleton loaders while fetching
            <div className="space-y-6">
              {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))
              ) : (
                <div className="text-center py-24 bg-[rgba(145,158,171,0.04)] dark:bg-white/[0.02] rounded-3xl border border-dashed border-[rgba(145,158,171,0.2)] dark:border-white/[0.08]">
                  <div className="w-20 h-20 bg-white dark:bg-[#1C252E] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Briefcase className="w-10 h-10 text-[#22c55e]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1C252E] dark:text-white mb-2">Chưa có hồ sơ nào</h3>
                  <p className="text-[#637381] dark:text-[#919EAB] mb-8 max-w-sm mx-auto">
                    Hãy bắt đầu hành trình mới bằng việc tìm kiếm công việc phù hợp.
                  </p>
                  <Link href="/jobs">
                    <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-green-500/20 hover:scale-105 transition-transform">
                      Tìm việc ngay
                    </Button>
                  </Link>
                </div>
              )}
            </AnimatePresence>
          )}
        </div>

      </div>
    </div>
  );
}
