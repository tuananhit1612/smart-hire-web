"use client";

import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2, ChevronDown, X, ArrowRight, RotateCcw,
  Save, Download, Check, ChevronRight,
} from "lucide-react";
import {
  cvAiApi,
  type AiCvReviewResponse,
  type ReviewSection,
  type ReviewItem,
  type TopIssue,
  type OptimizeResponse,
  type DataCompleteness,
} from "../../api/cv-ai-api";
import { motion, AnimatePresence } from "framer-motion";


// CV Builder imports
import { TEMPLATE_COMPONENTS, DefaultTemplate } from "../cv-templates";
import { CVDesignPreviewWrapper } from "../CVDesignPreviewWrapper";
import { cvApi, type CvBuilderApiResponse } from "../../api/cv-api";
import { DEFAULT_DESIGN_TOKENS } from "../../types/types";
import type { CVData } from "../../types/types";

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */
function parseJsonSafe<T>(raw: string | null | undefined, fb: T): T {
  if (!raw) return fb;
  try { return JSON.parse(raw); } catch { return fb; }
}

const scoreColor = (s: number) =>
  s >= 85 ? "#22c55e" : s >= 70 ? "#3b82f6" : s >= 50 ? "#f59e0b" : "#ef4444";

const scoreLabel = (s: number) =>
  s >= 85 ? "Xuất sắc" : s >= 70 ? "Tốt" : s >= 50 ? "Khá" : "Cần cải thiện";

const statusMap: Record<string, { dot: string; label: string; cls: string }> = {
  STRONG:   { dot: "bg-emerald-400", label: "Mạnh",         cls: "text-emerald-600 bg-emerald-500/8 ring-emerald-500/20" },
  GOOD:     { dot: "bg-sky-400",     label: "Tốt",          cls: "text-sky-600 bg-sky-500/8 ring-sky-500/20" },
  IMPROVE:  { dot: "bg-amber-400",   label: "Cải thiện",    cls: "text-amber-600 bg-amber-500/8 ring-amber-500/20" },
  WEAK:     { dot: "bg-orange-400",  label: "Yếu",          cls: "text-orange-600 bg-orange-500/8 ring-orange-500/20" },
  CRITICAL: { dot: "bg-red-400",     label: "Nghiêm trọng", cls: "text-red-600 bg-red-500/8 ring-red-500/20" },
};

const actionMap: Record<string, { label: string; cls: string }> = {
  MUST_FIX: { label: "Bắt buộc sửa", cls: "bg-red-500/10 text-red-600 dark:text-red-400 ring-1 ring-red-500/15" },
  REWRITE:  { label: "Viết lại",      cls: "bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-1 ring-orange-500/15" },
  IMPROVE:  { label: "Nên cải thiện", cls: "bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/15" },
  KEEP:     { label: "Giữ nguyên",    cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/15" },
};

interface CVAnalysisBoardProps { cvFileId: number }

/* ═══════════════════════════════════════════════════════════════
   ANIMATED SCORE GAUGE — conic-gradient style
   ═══════════════════════════════════════════════════════════════ */
function ScoreGauge({ score, size = 100, label, sub, delay = 0 }: {
  score: number; size?: number; label: string; sub?: string; delay?: number;
}) {
  const color = scoreColor(score);
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="6"
            className="stroke-[rgba(145,158,171,0.08)]" />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c - (score / 100) * c }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: delay + 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-bold text-[#1C252E] dark:text-white"
            style={{ fontSize: size * 0.28 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.6, duration: 0.4 }}
          >{score}</motion.span>
          <span className="text-[8px] font-semibold uppercase tracking-wider mt-[-2px]"
            style={{ color }}>{scoreLabel(score)}</span>
        </div>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#919EAB] mt-2">{label}</span>
      {sub && <span className="text-[9px] text-[#919EAB]/60 mt-0.5">{sub}</span>}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ISSUE PILL — clickable top-issue
   ═══════════════════════════════════════════════════════════════ */
function IssuePill({ issue, index, isActive, onClick }: {
  issue: TopIssue; index: number; isActive: boolean; onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.05, duration: 0.35 }}
      className={`group w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
        isActive
          ? "bg-[#1C252E] dark:bg-white/[0.08] border-[#1C252E]/20 dark:border-white/10 shadow-sm"
          : "bg-white dark:bg-white/[0.02] border-[rgba(145,158,171,0.08)] hover:border-[rgba(145,158,171,0.16)]"
      }`}
    >
      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold ${
        isActive ? "bg-white/20 text-white" :
        issue.severity === "HIGH" ? "bg-red-500/10 text-red-500" :
        issue.severity === "MEDIUM" ? "bg-amber-500/10 text-amber-600" :
        "bg-blue-500/10 text-blue-500"
      }`}>
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[12.5px] font-medium leading-snug transition-colors ${
          isActive ? "text-white dark:text-white" : "text-[#1C252E] dark:text-white"
        }`}>{issue.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
            isActive ? "bg-white/15 text-white/70" :
            issue.severity === "HIGH" ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400" :
            issue.severity === "MEDIUM" ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" :
            "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
          }`}>{issue.severity === "HIGH" ? "Cao" : issue.severity === "MEDIUM" ? "Trung bình" : "Thấp"}</span>
          <span className={`text-[9px] ${isActive ? "text-white/40" : "text-[#919EAB]"}`}>{issue.section}</span>
        </div>
      </div>
      <ChevronRight className={`w-3.5 h-3.5 mt-1 shrink-0 transition-all ${
        isActive ? "text-white/40" : "text-transparent group-hover:text-[#919EAB]"
      }`} />
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION REVIEW CARD — expandable
   ═══════════════════════════════════════════════════════════════ */
function ReviewSectionCard({ section, index, onFocusItem, onApplyFix, appliedFixes }: {
  section: ReviewSection; index: number; onFocusItem: (text: string) => void;
  onApplyFix?: (original: string, suggested: string) => void;
  appliedFixes?: Set<string>;
}) {
  const [open, setOpen] = useState(false);
  const color = scoreColor(section.score);
  const st = statusMap[section.status] || statusMap.GOOD;
  const needsWork = section.items.filter(i => i.action !== "KEEP").length;
  const appliedCount = section.items.filter(i => appliedFixes?.has(i.originalText)).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.04, duration: 0.35 }}
      className="group rounded-xl overflow-hidden border border-[rgba(145,158,171,0.06)] bg-white dark:bg-white/[0.015] hover:border-[rgba(145,158,171,0.12)] transition-all duration-200"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-[rgba(145,158,171,0.02)] transition-colors"
      >
        {/* Mini gauge */}
        <div className="relative w-10 h-10 shrink-0">
          <svg width="40" height="40" className="-rotate-90">
            <circle cx="20" cy="20" r="15" fill="none" strokeWidth="3" className="stroke-[rgba(145,158,171,0.06)]" />
            <circle cx="20" cy="20" r="15" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 15}`}
              strokeDashoffset={`${2 * Math.PI * 15 * (1 - section.score / 100)}`}
              style={{ transition: "stroke-dashoffset 0.8s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#1C252E] dark:text-white">{section.score}</span>
          </div>
        </div>

        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-[#1C252E] dark:text-white">{section.name}</span>
            {appliedCount > 0 && (
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                {appliedCount} đã sửa
              </span>
            )}
            {needsWork > 0 && appliedCount < needsWork && (
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                {needsWork - appliedCount} cần sửa
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
            <span className="text-[10px] font-medium text-[#919EAB]">{st.label}</span>
          </div>
        </div>

        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-[#C4CDD5]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && section.items.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-4 pb-4 space-y-2 border-t border-[rgba(145,158,171,0.04)] pt-3">
              {section.items.map((item, idx) => (
                <ReviewItemCard
                  key={idx}
                  item={item}
                  onFocus={onFocusItem}
                  onApplyFix={item.suggestedText && item.action !== "KEEP" ? onApplyFix : undefined}
                  isApplied={appliedFixes?.has(item.originalText)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   REVIEW ITEM CARD — with Apply Fix button
   ═══════════════════════════════════════════════════════════════ */
function ReviewItemCard({ item, onFocus, onApplyFix, isApplied }: {
  item: ReviewItem; onFocus: (text: string) => void;
  onApplyFix?: (original: string, suggested: string) => void;
  isApplied?: boolean;
}) {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const st = statusMap[item.status] || statusMap.GOOD;
  const act = actionMap[item.action] || actionMap.KEEP;

  return (
    <div
      className={`rounded-lg p-3 border transition-all cursor-pointer group/item ${
        isApplied
          ? "border-emerald-200 dark:border-emerald-800/30 bg-emerald-50/30 dark:bg-emerald-900/5"
          : "border-[rgba(145,158,171,0.06)] bg-[rgba(145,158,171,0.015)] hover:bg-[rgba(145,158,171,0.03)]"
      }`}
      onClick={() => item.originalText && onFocus(item.originalText)}
    >
      <div className="flex items-start gap-2.5">
        {/* Status indicator bar */}
        <div className={`w-0.5 rounded-full min-h-[24px] self-stretch shrink-0 mt-0.5 ${isApplied ? "bg-emerald-400" : st.dot}`} />

        <div className="flex-1 min-w-0">
          {/* Original text */}
          {item.originalText && (
            <p className={`text-[12px] leading-relaxed mb-1 ${
              isApplied ? "line-through text-[#919EAB] dark:text-[#637381]" : "text-[#1C252E] dark:text-white/90"
            }`}>
              &ldquo;{item.originalText}&rdquo;
            </p>
          )}

          {/* Applied replacement */}
          {isApplied && item.suggestedText && (
            <p className="text-[12px] text-emerald-700 dark:text-emerald-300 font-medium leading-relaxed mb-1">
              {item.suggestedText}
            </p>
          )}

          {/* Reason */}
          <p className="text-[11px] text-[#637381] dark:text-[#919EAB] leading-relaxed">{item.reason}</p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {isApplied ? (
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/15">
                Đã áp dụng
              </span>
            ) : (
              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${act.cls}`}>
                {act.label}
              </span>
            )}
            {item.priority && item.priority !== "NONE" && !isApplied && (
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[rgba(145,158,171,0.06)] text-[#637381]">
                {item.priority === "HIGH" ? "Ưu tiên cao" : item.priority === "MEDIUM" ? "Trung bình" : "Thấp"}
              </span>
            )}
          </div>

          {/* AI Suggestion + Apply Fix */}
          {item.suggestedText && !isApplied && (
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowSuggestion(!showSuggestion); }}
                  className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  {showSuggestion ? "Ẩn gợi ý" : "Xem gợi ý"}
                </button>
                {onApplyFix && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onApplyFix(item.originalText, item.suggestedText!);
                    }}
                    className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors"
                  >
                    Áp dụng
                  </button>
                )}
              </div>
              <AnimatePresence>
                {showSuggestion && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1.5 rounded-lg bg-blue-50/60 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/20 p-2.5"
                  >
                    <p className="text-[12px] text-blue-900 dark:text-blue-200 leading-relaxed">
                      {item.suggestedText}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EMPTY STATE — no builder data
   ═══════════════════════════════════════════════════════════════ */
function BuilderOnlyEmptyState() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="w-14 h-14 rounded-xl bg-[rgba(145,158,171,0.08)] flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-[#919EAB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6" />
          <path d="M12 18v-6" />
          <path d="M9 15h6" />
        </svg>
      </div>
      <h3 className="text-sm font-semibold text-[#1C252E] dark:text-white mb-1.5">
        CV này chưa có dữ liệu Builder
      </h3>
      <p className="text-[12px] text-[#637381] dark:text-[#919EAB] leading-relaxed max-w-xs mb-5">
        Phân tích CV chỉ hỗ trợ CV tạo từ Resume Builder để hiển thị preview và highlight trực tiếp các vấn đề.
      </p>
      <button
        onClick={() => router.push("/cv-builder")}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] text-[12px] font-semibold rounded-lg transition-colors hover:bg-[#2d3a47] dark:hover:bg-gray-100"
      >
        Tạo CV với Builder
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export function CVAnalysisBoard({ cvFileId }: CVAnalysisBoardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState<AiCvReviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [activeIssueIdx, setActiveIssueIdx] = useState<number | null>(null);
  const [focusedText, setFocusedText] = useState<string | null>(null);
  const cvScrollRef = useRef<HTMLDivElement>(null);
  const cvPreviewRef = useRef<HTMLDivElement>(null);

  // CV data fetched from API by cvFileId (NOT from local store)
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [originalCvData, setOriginalCvData] = useState<CVData | null>(null);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [cvDataLoading, setCvDataLoading] = useState(true);
  const designTokens = DEFAULT_DESIGN_TOKENS;

  // Quick Fix & Optimize state
  const [appliedFixes, setAppliedFixes] = useState<Set<string>>(new Set());
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const hasChanges = appliedFixes.size > 0;

  // Fetch CV builder data from API by cvFileId
  useEffect(() => {
    const fetchCvData = async () => {
      try {
        setCvDataLoading(true);
        const res = await cvApi.getCvBuilderByCvFileId(cvFileId);
        const data = res.data;
        if (data) {
          const parsed = data.sectionsData as CVData;
          setCvData(parsed);
          setOriginalCvData(JSON.parse(JSON.stringify(parsed))); // deep clone
          setTemplateId(data.templateId);
        }
      } catch (err) {
        console.warn("Could not load CV builder data for cvFileId:", cvFileId, err);
      } finally {
        setCvDataLoading(false);
      }
    };
    if (cvFileId) fetchCvData();
  }, [cvFileId]);

  // Fetch AI review — robust flow: GET → 404? POST trigger → poll GET
  useEffect(() => {
    let cancelled = false;
    let pollTimer: ReturnType<typeof setTimeout>;

    const delay = (ms: number) => new Promise(r => { pollTimer = setTimeout(r, ms); });

    const tryGetReview = async (): Promise<AiCvReviewResponse | null> => {
      try {
        const res = await cvAiApi.getReview(cvFileId);
        return res.data.data ?? null;
      } catch {
        return null;
      }
    };

    const pollUntilReady = async (maxSeconds: number = 120): Promise<AiCvReviewResponse | null> => {
      const maxAttempts = Math.ceil(maxSeconds / 3);
      for (let i = 0; i < maxAttempts; i++) {
        if (cancelled) return null;
        await delay(3000);
        if (cancelled) return null;
        const result = await tryGetReview();
        if (result) return result;
      }
      return null;
    };

    const fetchReview = async () => {
      setIsLoading(true);
      setError(null);

      const existing = await tryGetReview();
      if (cancelled) return;

      if (existing) {
        setReview(existing);
        setIsLoading(false);
        return;
      }

      try {
        const triggerRes = await cvAiApi.triggerReview(cvFileId);
        if (cancelled) return;
        if (triggerRes.data?.data) {
          setReview(triggerRes.data.data);
          setIsLoading(false);
          return;
        }
      } catch (triggerErr) {
        console.warn("POST trigger failed/timed out, falling back to polling", triggerErr);
      }

      if (cancelled) return;

      const result = await pollUntilReady(120);
      if (cancelled) return;

      if (result) {
        setReview(result);
        setIsLoading(false);
      } else {
        setError("Phân tích mất quá nhiều thời gian. Vui lòng tải lại trang.");
        setIsLoading(false);
      }
    };

    if (cvFileId) fetchReview();

    return () => {
      cancelled = true;
      clearTimeout(pollTimer);
    };
  }, [cvFileId]);

  // ═══ FOCUS & HIGHLIGHT on CV ═══
  const scrollAndHighlight = useCallback((text: string) => {
    setFocusedText(text);
    if (!cvPreviewRef.current || !cvScrollRef.current) return;

    cvPreviewRef.current.querySelectorAll("[data-ai-hl]").forEach(el => {
      (el as HTMLElement).style.cssText = "";
      el.removeAttribute("data-ai-hl");
    });

    const normalizedSearch = text.toLowerCase().trim().substring(0, 60);
    const walker = document.createTreeWalker(cvPreviewRef.current, NodeFilter.SHOW_TEXT, null);
    let found = false;

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const nodeText = (node.textContent || "").toLowerCase();
      if (nodeText.includes(normalizedSearch) && node.parentElement) {
        const parent = node.parentElement;
        if (parent.closest("[data-ai-hl]")) continue;

        parent.setAttribute("data-ai-hl", "true");
        parent.style.cssText = `
          position: relative;
          outline: 2px solid rgba(99,102,241,0.6);
          outline-offset: 2px;
          border-radius: 4px;
          background: rgba(99,102,241,0.05);
          transition: all 0.3s ease;
          z-index: 20;
        `;

        const scrollContainer = cvScrollRef.current!;
        const elTop = parent.getBoundingClientRect().top;
        const containerTop = scrollContainer.getBoundingClientRect().top;
        const scrollOffset = elTop - containerTop - scrollContainer.clientHeight / 3;
        scrollContainer.scrollBy({ top: scrollOffset, behavior: "smooth" });

        found = true;
        break;
      }
    }
  }, []);

  const clearHighlight = useCallback(() => {
    setFocusedText(null);
    setActiveIssueIdx(null);
    if (!cvPreviewRef.current) return;
    cvPreviewRef.current.querySelectorAll("[data-ai-hl]").forEach(el => {
      (el as HTMLElement).style.cssText = "";
      el.removeAttribute("data-ai-hl");
    });
  }, []);

  // Parse data
  const sections = useMemo(() => parseJsonSafe<ReviewSection[]>(review?.sectionScores, []), [review?.sectionScores]);
  const topIssues = useMemo(() => parseJsonSafe<TopIssue[]>(review?.topIssues, []), [review?.topIssues]);
  const strengths = useMemo(() => parseJsonSafe<string[]>(review?.strengths, []), [review?.strengths]);
  const weaknesses = useMemo(() => parseJsonSafe<string[]>(review?.weaknesses, []), [review?.weaknesses]);
  const completeness = useMemo(() => parseJsonSafe<DataCompleteness | null>(review?.dataCompleteness, null), [review?.dataCompleteness]);
  const canOptimize = completeness?.canOptimize !== false;

  const overallScore = review?.overallScore ?? 0;
  const atsScore = review?.atsScore ?? 0;
  const TemplateComponent = templateId ? (TEMPLATE_COMPONENTS[templateId] || DefaultTemplate) : DefaultTemplate;

  const totalItems = sections.reduce((s, sec) => s + sec.items.length, 0);
  const goodItems = sections.reduce((s, sec) => s + sec.items.filter(i => i.action === "KEEP").length, 0);

  // ═══ FUZZY TEXT MATCHING HELPERS ═══
  const normalize = useCallback((s: string) =>
    s.replace(/\s+/g, " ").trim().toLowerCase(), []);

  const fuzzyReplaceInObj = useCallback((obj: any, originalText: string, replacementText: string): boolean => {
    if (typeof obj === "string") return false;
    const normOriginal = normalize(originalText);
    const prefix = normOriginal.length > 40 ? normOriginal.substring(0, 40) : null;

    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i] === "string") {
          if (obj[i].includes(originalText)) {
            obj[i] = obj[i].replace(originalText, replacementText);
            return true;
          }
          const normValue = normalize(obj[i]);
          if (normValue.includes(normOriginal)) {
            obj[i] = replacementText;
            return true;
          }
          if (prefix && normValue.includes(prefix)) {
            obj[i] = replacementText;
            return true;
          }
        }
        if (fuzzyReplaceInObj(obj[i], originalText, replacementText)) return true;
      }
      return false;
    }
    if (typeof obj === "object" && obj !== null) {
      for (const key of Object.keys(obj)) {
        if (typeof obj[key] === "string") {
          if (obj[key].includes(originalText)) {
            obj[key] = obj[key].replace(originalText, replacementText);
            return true;
          }
          const normValue = normalize(obj[key]);
          if (normValue.includes(normOriginal)) {
            obj[key] = replacementText;
            return true;
          }
          if (prefix && normValue.includes(prefix)) {
            obj[key] = replacementText;
            return true;
          }
        }
        if (fuzzyReplaceInObj(obj[key], originalText, replacementText)) return true;
      }
    }
    return false;
  }, [normalize]);

  // ═══ QUICK FIX — Apply single suggestion ═══
  const handleApplyFix = useCallback((originalText: string, suggestedText: string) => {
    if (!cvData) return;
    const updated = JSON.parse(JSON.stringify(cvData)) as CVData;
    const didReplace = fuzzyReplaceInObj(updated, originalText, suggestedText);
    if (didReplace) {
      setCvData(updated);
    }
    setAppliedFixes(prev => new Set([...prev, originalText]));
    clearHighlight();
  }, [cvData, clearHighlight, fuzzyReplaceInObj]);

  // ═══ OPTIMIZE FULL CV ═══
  const handleOptimize = useCallback(async () => {
    if (isOptimizing) return;
    setIsOptimizing(true);
    try {
      const res = await cvAiApi.optimizeCv(cvFileId);
      const jsonStr = res.data?.data;
      if (jsonStr) {
        const parsed: OptimizeResponse = typeof jsonStr === "string" ? JSON.parse(jsonStr) : jsonStr;
        if (parsed.optimizedSections && cvData) {
          const updated = JSON.parse(JSON.stringify(cvData)) as CVData;
          const newApplied = new Set(appliedFixes);
          let totalReplaced = 0;

          for (const section of parsed.optimizedSections) {
            for (const item of section.items) {
              if (item.action !== "KEEP" && item.originalText && item.optimizedText) {
                const didReplace = fuzzyReplaceInObj(updated, item.originalText, item.optimizedText);
                if (didReplace) {
                  totalReplaced++;
                  newApplied.add(item.originalText);
                } else {
                  console.warn(
                    `[Optimize] Could not match originalText in cvData:`,
                    item.originalText.substring(0, 80) + "..."
                  );
                }
              }
            }
          }

          if (parsed.optimizedSummary && updated.summary) {
            updated.summary = parsed.optimizedSummary;
            totalReplaced++;
          }

          console.log(`[Optimize] Applied ${totalReplaced} replacements out of ${parsed.changeCount ?? "?"} changes`);
          setCvData(updated);
          setAppliedFixes(newApplied);
        }
      }
    } catch (err) {
      console.error("Optimize failed:", err);
    } finally {
      setIsOptimizing(false);
    }
  }, [isOptimizing, cvFileId, cvData, appliedFixes, fuzzyReplaceInObj]);

  // ═══ SAVE ═══
  const handleSave = useCallback(async () => {
    if (!cvData || !templateId || isSaving) return;
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await cvApi.updateCV(cvFileId, {
        templateId: templateId,
        cvData: cvData,
      });
      setOriginalCvData(JSON.parse(JSON.stringify(cvData)));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  }, [cvFileId, cvData, templateId, isSaving]);

  // ═══ EXPORT PDF ═══
  const handleExport = useCallback(async () => {
    if (!cvData || !templateId || isExporting) return;
    setIsExporting(true);
    try {
      const blob = await cvApi.exportPDF({
        templateId: templateId,
        cvData: cvData,
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `CV_Optimized_${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  }, [cvData, templateId, isExporting]);

  // ═══ LOADING STATE ═══
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 mb-6">
            <div
              className="absolute inset-0 rounded-full border-2 border-[rgba(145,158,171,0.08)]"
            />
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#1C252E] dark:border-t-white animate-spin"
            />
          </div>
          <h2 className="text-base font-semibold text-[#1C252E] dark:text-white mb-1">
            Đang phân tích CV
          </h2>
          <p className="text-[12px] text-[#637381] dark:text-[#919EAB] text-center max-w-xs">
            Đánh giá toàn diện theo các tiêu chuẩn chuyên nghiệp
          </p>
        </div>
      </div>
    );
  }

  // ═══ ERROR STATE ═══
  if (error || !review) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <circle cx="12" cy="16" r="0.5" fill="currentColor" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-[#1C252E] dark:text-white mb-1">Không thể phân tích</h2>
        <p className="text-[12px] text-[#637381] text-center max-w-sm mb-5">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] font-semibold rounded-lg text-[12px] transition-colors hover:bg-[#2d3a47]"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full">
      {/* ═══════════ LEFT — CV Live Preview ═══════════ */}
      <div className="w-[44%] h-full flex flex-col border-r border-[rgba(145,158,171,0.06)]">
        {/* Toolbar */}
        <div className="h-11 px-5 flex items-center justify-between border-b border-[rgba(145,158,171,0.06)] bg-white/80 dark:bg-[#1C252E]/80 backdrop-blur-lg">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-semibold text-[#637381] dark:text-[#919EAB] uppercase tracking-wider">Preview</span>
          </div>
          <div className="flex items-center gap-2">
            {focusedText && (
              <button
                onClick={clearHighlight}
                className="flex items-center gap-1 text-[10px] font-medium text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded hover:bg-red-100 transition-colors"
              >
                <X className="w-3 h-3" /> Bỏ highlight
              </button>
            )}
            <span className="text-[10px] font-medium text-[#919EAB] px-2 py-0.5 rounded bg-[rgba(145,158,171,0.06)]">
              {templateId || "default"}
            </span>
          </div>
        </div>

        {/* CV Render area */}
        <div ref={cvScrollRef} className="flex-1 overflow-y-auto bg-[#f4f6f8] dark:bg-[#111820] p-6">
          {cvDataLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <Loader2 className="w-6 h-6 text-[#919EAB] animate-spin" />
              <span className="text-[11px] font-medium text-[#919EAB]">Đang tải CV...</span>
            </div>
          ) : !cvData ? (
            <BuilderOnlyEmptyState />
          ) : (
            <div
              ref={cvPreviewRef}
              className="mx-auto rounded-xl overflow-hidden shadow-lg ring-1 ring-black/[0.04]"
              style={{ maxWidth: "580px" }}
            >
              <CVDesignPreviewWrapper designTokens={designTokens}>
                <TemplateComponent data={cvData} />
              </CVDesignPreviewWrapper>
            </div>
          )}
        </div>
      </div>

      {/* ═══════════ RIGHT — Analysis Dashboard ═══════════ */}
      <div className="w-[56%] h-full flex flex-col bg-[#fafbfc] dark:bg-[#0d1117]">

        {/* ── Score Header ── */}
        <div className="px-7 py-5 bg-white dark:bg-[#1C252E] border-b border-[rgba(145,158,171,0.06)]">
          <div className="flex items-start gap-7">
            {/* Gauges */}
            <div className="flex gap-4 shrink-0">
              <ScoreGauge score={overallScore} size={88} label="Tổng điểm" delay={0.1} />
              <ScoreGauge score={atsScore} size={88} label="ATS Score" sub="Tương thích hệ thống" delay={0.2} />
            </div>

            {/* Summary */}
            <div className="flex-1 min-w-0 pt-1">
              <h1 className="text-sm font-semibold text-[#1C252E] dark:text-white mb-2">Phân tích CV</h1>
              <p className="text-[12px] text-[#637381] dark:text-[#919EAB] leading-relaxed line-clamp-2 mb-3">
                {review.summary}
              </p>

              {/* Stats bar */}
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-semibold text-emerald-600">{goodItems} tốt</span>
                <div className="flex-1 h-1.5 rounded-full bg-[rgba(145,158,171,0.06)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-emerald-400"
                    initial={{ width: 0 }}
                    animate={{ width: totalItems > 0 ? `${(goodItems / totalItems) * 100}%` : "0%" }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                  />
                </div>
                <span className="text-[10px] font-medium text-[#919EAB]">{goodItems}/{totalItems}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Scrollable Content ── */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="px-7 py-5 space-y-6">

            {/* ── DATA COMPLETENESS WARNING ── */}
            {completeness && !canOptimize && (
              <div className="rounded-xl border border-red-200 dark:border-red-800/30 bg-red-50/50 dark:bg-red-950/20 p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4" />
                      <circle cx="12" cy="16" r="0.5" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[13px] font-semibold text-red-700 dark:text-red-400 mb-0.5">
                      CV thiếu thông tin
                    </h3>
                    <p className="text-[11px] text-red-600/70 dark:text-red-400/60 leading-relaxed">
                      {completeness.verdict || "CV không đủ thông tin để tối ưu. Vui lòng bổ sung đầy đủ trước."}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2.5 mb-3">
                  {completeness.missingCritical && completeness.missingCritical.length > 0 && (
                    <div className="rounded-lg bg-white/60 dark:bg-white/5 p-3">
                      <span className="text-[9px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1.5">
                        Phần còn thiếu
                      </span>
                      <ul className="space-y-1">
                        {completeness.missingCritical.map((item, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-[11px] text-red-700/70 dark:text-red-300/60">
                            <div className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {completeness.junkEntries && completeness.junkEntries.length > 0 && (
                    <div className="rounded-lg bg-white/60 dark:bg-white/5 p-3">
                      <span className="text-[9px] font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider block mb-1.5">
                        Dữ liệu không hợp lệ
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {completeness.junkEntries.slice(0, 6).map((junk, i) => (
                          <span key={i} className="text-[10px] font-mono text-orange-600/60 dark:text-orange-400/50 bg-orange-500/8 px-1.5 py-0.5 rounded">
                            &quot;{junk}&quot;
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-medium text-red-600/60 shrink-0">
                    {completeness.filledSections}/{completeness.totalExpectedSections} phần
                  </span>
                  <div className="flex-1 h-1.5 rounded-full bg-red-200/30 dark:bg-red-950/30 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-red-400"
                      style={{ width: `${(completeness.filledSections / Math.max(completeness.totalExpectedSections, 1)) * 100}%`, transition: "width 0.8s ease" }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => router.push("/cv-builder")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 text-white text-[12px] font-semibold rounded-lg hover:bg-red-600 transition-colors"
                >
                  Quay lại CV Builder
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* ── TOP ISSUES ── */}
            {topIssues.length > 0 && (
              <section>
                <h2 className="text-[11px] font-semibold text-[#637381] dark:text-[#919EAB] uppercase tracking-wider mb-3">
                  Vấn đề ưu tiên
                </h2>
                <div className="space-y-1.5">
                  {topIssues.map((issue, idx) => (
                    <IssuePill
                      key={idx}
                      issue={issue}
                      index={idx}
                      isActive={activeIssueIdx === idx}
                      onClick={() => {
                        setActiveIssueIdx(activeIssueIdx === idx ? null : idx);
                        if (issue.quote && issue.quote !== "N/A") {
                          scrollAndHighlight(issue.quote);
                        }
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* ── STRENGTHS & WEAKNESSES ── */}
            <section className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-white dark:bg-white/[0.02] border border-[rgba(145,158,171,0.06)]">
                <h3 className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2.5">
                  Điểm mạnh
                </h3>
                <ul className="space-y-1.5">
                  {strengths.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[11px] text-[#1C252E] dark:text-gray-300 leading-relaxed"
                    >
                      <div className="w-1 h-1 rounded-full bg-emerald-400 mt-[6px] shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl p-4 bg-white dark:bg-white/[0.02] border border-[rgba(145,158,171,0.06)]">
                <h3 className="text-[11px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2.5">
                  Cần cải thiện
                </h3>
                <ul className="space-y-1.5">
                  {weaknesses.map((w, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[11px] text-[#1C252E] dark:text-gray-300 leading-relaxed"
                    >
                      <div className="w-1 h-1 rounded-full bg-red-400 mt-[6px] shrink-0" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ── SECTION BREAKDOWN ── */}
            {sections.length > 0 && (
              <section>
                <h2 className="text-[11px] font-semibold text-[#637381] dark:text-[#919EAB] uppercase tracking-wider mb-3">
                  Chi tiết từng phần
                </h2>
                <div className="space-y-1.5">
                  {sections.map((section, idx) => (
                    <ReviewSectionCard
                      key={idx}
                      section={section}
                      index={idx}
                      onFocusItem={scrollAndHighlight}
                      onApplyFix={canOptimize ? handleApplyFix : undefined}
                      appliedFixes={appliedFixes}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Bottom spacer */}
            <div className="h-16" />
          </div>
        </div>

        {/* ── Action Footer ── */}
        {review && (
          <div className="px-5 py-3 border-t border-[rgba(145,158,171,0.08)] bg-white/95 dark:bg-[#1C252E]/95 backdrop-blur-lg">
            <div className="flex items-center justify-between gap-3">
              {/* Left: Status */}
              <div className="flex items-center gap-2">
                {hasChanges && (
                  <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded">
                    <Check className="w-3 h-3" />
                    {appliedFixes.size} thay đổi
                  </span>
                )}
                {saveSuccess && (
                  <span className="text-[10px] font-medium text-emerald-500">
                    Đã lưu thành công
                  </span>
                )}
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                {/* Optimize all */}
                <button
                  onClick={handleOptimize}
                  disabled={isOptimizing || !canOptimize}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] text-[11px] font-semibold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-[#2d3a47] dark:hover:bg-gray-100"
                  title={!canOptimize ? "CV thiếu thông tin — không thể tối ưu" : ""}
                >
                  {isOptimizing ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang tối ưu...</>
                  ) : (
                    "Tối ưu toàn bộ CV"
                  )}
                </button>

                {/* Save */}
                <button
                  onClick={handleSave}
                  disabled={isSaving || !hasChanges}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-[rgba(145,158,171,0.08)] text-[#1C252E] dark:text-white text-[11px] font-semibold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-[rgba(145,158,171,0.14)]"
                >
                  {isSaving ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang lưu...</>
                  ) : (
                    <><Save className="w-3.5 h-3.5" /> Lưu CV</>
                  )}
                </button>

                {/* Export PDF */}
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex items-center gap-1.5 px-3.5 py-2 border border-[rgba(145,158,171,0.12)] text-[#1C252E] dark:text-white text-[11px] font-semibold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-[rgba(145,158,171,0.04)]"
                >
                  {isExporting ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Xuất PDF...</>
                  ) : (
                    <><Download className="w-3.5 h-3.5" /> Xuất PDF</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
