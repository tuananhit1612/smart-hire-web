"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight
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
import { ApplicationStatus, ApplicationStage } from "@/shared/types/application";
import { cn } from "@/shared/lib/utils";

// --- Design Standards Constants (per DESIGN_STANDARD.md) ---
// Primary: Sky Blue
// Accent: Growth Green (used for success/active states)
// Background: strictly white / slate-50

const ACTIVE_STAGES = new Set([
  ApplicationStage.APPLIED,
  ApplicationStage.SCREENING,
  ApplicationStage.INTERVIEW,
  ApplicationStage.OFFER,
]);

// --- Components ---

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
        return { color: "text-green-700", bg: "bg-green-50", border: "border-green-200", label: "Đề nghị nhận việc" }; // Growth Green
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

function ApplicationCard({ application }: { application: Application }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentEvent = useMemo(() =>
    application.timeline.find(e => !e.isCompleted) ||
    application.timeline[application.timeline.length - 1],
    [application.timeline]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      // Card Design: Rounded-2xl, Shadow-xl shadow-[#22c55e]/20, Border Sky-100
      className="group bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#22c55e]/20 hover:border-[#22c55e]/30 dark:hover:border-[#22c55e]/30 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo Container */}
          <div className="shrink-0">
            <div className="w-16 h-16 rounded-xl border border-[rgba(145,158,171,0.1)] dark:border-white/[0.06] bg-white dark:bg-[#1C252E] p-2 flex items-center justify-center shadow-sm">
              <img
                src={application.job.logoUrl}
                alt={application.job.company}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
              <div>
                <Link href={`/jobs/${application.job.id}`} className="block">
                  {/* Primary Color: Text Sky 900 */}
                  <h3 className="text-xl font-bold text-[#1C252E] dark:text-white group-hover:text-[#22c55e] dark:group-hover:text-[#22c55e] transition-colors">
                    {application.job.title}
                  </h3>
                </Link>
                <p className="text-[#637381] dark:text-[#919EAB] font-medium mt-1">
                  {application.job.company}
                </p>
              </div>
              <div className="shrink-0">
                <StatusBadge status={application.status} />
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-[#637381] dark:text-[#919EAB] mb-6">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#22c55e]" />
                {application.job.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#22c55e]" />
                {application.job.type}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#22c55e]" />
                {new Date(application.appliedAt).toLocaleDateString('vi-VN')}
              </div>
            </div>

            {/* Micro-interaction: Hover/Click area with explicit feedback */}
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              // Interaction: Cursor pointer
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
                {/* Icon using Growth Green for active/success feeling */}
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-semibold text-[#637381] dark:text-[#C4CDD5] text-sm">
                  {currentEvent?.title}
                </span>
                <span className="text-sm text-[#919EAB]">
                  • {currentEvent?.description || (currentEvent?.date && new Date(currentEvent.date).toLocaleDateString('vi-VN'))}
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
                    {/* Time line connector */}
                    <div className="absolute left-[19px] top-8 bottom-4 w-0.5 bg-[rgba(145,158,171,0.15)] dark:bg-white/[0.08]" />

                    {application.timeline.map((event) => (
                      <div key={event.id} className="relative flex gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 z-10 bg-white dark:bg-[#1C252E]",
                          event.isCompleted
                            ? "border-green-500 text-green-500"
                            : "border-[rgba(145,158,171,0.2)] dark:border-white/[0.1] text-[#C4CDD5] dark:text-[#637381]"
                        )}>
                          {event.isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-[rgba(145,158,171,0.3)] dark:bg-white/[0.15]" />}
                        </div>
                        <div className="flex-1 pt-2">
                          <h5 className={cn("font-semibold", event.isCompleted ? "text-[#1C252E] dark:text-white" : "text-[#919EAB]")}>
                            {event.title}
                          </h5>
                          {event.description && <p className="text-sm text-[#637381] dark:text-[#919EAB] mt-1">{event.description}</p>}
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

import { useApplicationStore } from "@/features/jobs/stores/application-store";
import { mockJobs } from "@/features/jobs/types/mock-jobs";

// ... previous imports

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [searchQuery, setSearchQuery] = useState("");

  // Get local state from store
  const { appliedJobIds, applicationDates } = useApplicationStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const allApplications = useMemo(() => {
    if (!isMounted) return mockApplications;

    // 1. Convert local Applied Job IDs to Application objects
    const userApplications = appliedJobIds.map(jobId => {
      const job = mockJobs.find(j => j.id === jobId);
      if (!job) return null;

      const appliedAt = applicationDates[jobId] || new Date().toISOString();

      // Create a dynamic application object for locally applied jobs
      const newApp: Application = {
        id: `local-${jobId}`,
        jobId: job.id,
        job: job,
        status: "APPLIED" as ApplicationStatus,
        appliedAt: appliedAt,
        lastUpdated: appliedAt,
        timeline: [
          {
            id: `evt-${jobId}-1`,
            stage: "APPLIED" as ApplicationStatus,
            title: "Đã nộp hồ sơ",
            date: appliedAt,
            isCompleted: true
          }
        ],
        notes: "Ứng tuyển gần đây"
      };
      return newApp;
    }).filter((app): app is Application => app !== null);

    // 2. Merge with mock applications
    // Filter out mock apps if they are already in userApplications (by job ID) to avoid duplicates if we had overlapping IDs
    const userJobIds = new Set(userApplications.map(app => app.jobId));
    const nonDuplicateMocks = mockApplications.filter(app => !userJobIds.has(app.jobId));

    return [...userApplications, ...nonDuplicateMocks];
  }, [appliedJobIds, applicationDates, isMounted]);

  const filteredApplications = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return allApplications.filter(app => {
      const isActive = ACTIVE_STAGES.has(app.status as ApplicationStage);
      const matchesTab = activeTab === "active" ? isActive : !isActive;
      if (!matchesTab) return false;
      return !query || app.job.title.toLowerCase().includes(query) || app.job.company.toLowerCase().includes(query);
    });
  }, [activeTab, searchQuery, allApplications]);

  return (
    // Background: Transparent to show ParticleBackground, but Content Z-Index > 0 to sit ABOVE particles
    <div className="w-full bg-transparent font-sans pt-6 pb-12 relative z-10">
      <div className="container mx-auto px-4 max-w-5xl">

        <div className="mb-10 text-center md:text-left">
          {/* Typography: Be Vietnam Pro (font-sans) */}
          <h1 className="text-4xl font-bold text-[#1C252E] dark:text-white mb-3 tracking-tight">
            Hồ sơ ứng tuyển
          </h1>
          <p className="text-[#637381] dark:text-[#919EAB] text-lg">
            Theo dõi hành trình sự nghiệp của bạn.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 sticky top-20 z-30 bg-white/90 dark:bg-[#1C252E]/90 backdrop-blur-xl py-4 rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-sm px-6">
          {/* Tabs */}
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

        <div className="space-y-6">
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
                <p className="text-[#637381] dark:text-[#919EAB] mb-8 max-w-sm mx-auto">Hãy bắt đầu hành trình mới bằng việc tìm kiếm công việc phù hợp.</p>
                <Link href="/jobs">
                  {/* Button: Primary Gradient Blue or Solid Green. Using Green for Action */}
                  <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-green-500/20 hover:scale-105 transition-transform">
                    Tìm việc ngay
                  </Button>
                </Link>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

