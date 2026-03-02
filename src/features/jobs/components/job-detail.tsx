"use client";

import { useState, useEffect } from "react";
import { Job } from "../types/job";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { useToast } from "@/shared/components/ui/toast";
import { ApplyModal } from "./apply-modal";
import { useApplicationStore } from "../stores/application-store";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Calendar,
  Heart,
  Share2,
  CheckCircle2,
  Building2,
  ArrowLeft,
  Globe,
  Users,
  CalendarDays,
  Phone,
  Mail,
  ExternalLink,
  AlertTriangle,
  XCircle,
  Navigation,
  User,
} from "lucide-react";
import Link from "next/link";

interface JobDetailProps {
  job: Job;
}

export function JobDetail({ job }: JobDetailProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const { addToast } = useToast();
  const { hasApplied, getApplicationDate } = useApplicationStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isJobClosed = job.status === "closed";
  // Only check application status after mount to avoid hydration mismatch
  const hasUserApplied = isMounted && hasApplied(job.id);
  const applicationDate = getApplicationDate(job.id);

  // Auto-open modal when returning from CV preview (check URL on mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("openApply") === "true") {
        setIsApplyModalOpen(true);
        // Clean up URL
        window.history.replaceState({}, "", `/jobs/${job.id}`);
      }
    }
  }, [job.id]);

  // Handle apply success
  const handleApplySuccess = () => {
    addToast(
      "Ứng tuyển thành công!",
      "success",
      4000,
      `Hồ sơ của bạn đã được gửi đến ${job.company}. Chúc bạn may mắn!`
    );
  };

  // Format relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Vừa đăng";
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} tuần trước`;
  };

  // Format deadline
  const formatDeadline = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Get level color
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Senior":
      case "Lead":
      case "Manager":
        return "bg-[#FFAB00]/10 text-[#FFAB00] border-[#FFAB00]/20";
      case "Middle":
        return "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20";
      default:
        return "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20";
    }
  };

  // Generate Google Maps URL
  const getGoogleMapsUrl = () => {
    if (job.locationInfo?.coordinates) {
      const { lat, lng } = job.locationInfo.coordinates;
      return `https://www.google.com/maps?q=${lat},${lng}`;
    }
    if (job.locationInfo?.address) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        job.locationInfo.address + ", " + job.locationInfo.city
      )}`;
    }
    return null;
  };

  const mapsUrl = getGoogleMapsUrl();

  return (
    <div className="min-h-screen pt-20">
      {/* Company Cover Image */}
      {job.companyInfo?.coverImageUrl && (
        <div className="relative h-48 md:h-56 w-full overflow-hidden">
          <img
            src={job.companyInfo.coverImageUrl}
            alt={`${job.company} office`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#141A21] via-transparent to-transparent" />
        </div>
      )}

      {/* Navigation - Between cover and card */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4 pb-4">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-[#919EAB] hover:text-[#22C55E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách việc làm
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div
              className="animate-fade-in-up bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 md:p-8 hover:border-[rgba(145,158,171,0.32)] transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Logo */}
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-[#1C252E] p-2 shadow-lg border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] flex items-center justify-center shrink-0">
                  <img
                    src={job.companyInfo?.logoUrl || job.logoUrl}
                    alt={job.company}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#1C252E] dark:text-white mb-2">
                    {job.title}
                  </h1>
                  <p className="text-lg font-medium text-[#637381] dark:text-[#C4CDD5] mb-4">
                    {job.company}
                    {job.companyInfo?.industry && (
                      <span className="text-[#919EAB] font-normal"> • {job.companyInfo.industry}</span>
                    )}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      variant="outline"
                      className={`border rounded-lg px-3 py-1 text-sm font-semibold ${getLevelColor(
                        job.level
                      )}`}
                    >
                      {job.level}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] text-[#637381] dark:text-[#C4CDD5] text-sm flex items-center gap-1.5 px-3 py-1 rounded-lg"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      {job.type}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] text-[#637381] dark:text-[#C4CDD5] text-sm flex items-center gap-1.5 px-3 py-1 rounded-lg"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {getRelativeTime(job.postedAt)}
                    </Badge>
                  </div>

                  {/* Salary */}
                  <div className="flex items-center gap-2 text-xl font-bold text-[#22C55E]">
                    <DollarSign className="w-5 h-5" />
                    {job.salary}
                  </div>
                </div>
              </div>

              {/* Actions (Mobile) */}
              <div className="flex gap-3 mt-6 lg:hidden">
                {isJobClosed ? (
                  <div className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] text-[#919EAB]">
                    <XCircle className="w-5 h-5" />
                    <span className="font-medium">Tin đã đóng</span>
                  </div>
                ) : hasUserApplied ? (
                  <div className="flex-1 flex items-center justify-center gap-2 h-12 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Đã ứng tuyển</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => setIsApplyModalOpen(true)}
                    className="flex-1 bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 rounded-full font-semibold h-12"
                  >
                    Ứng tuyển ngay
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-xl border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]"
                >
                  <Heart className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-xl border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Location Card with Map Link */}
            {job.locationInfo && (
              <div
                style={{ animationDelay: '50ms' }}
                className="animate-fade-in-up bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#1C252E] dark:text-white">
                    Địa điểm làm việc
                  </h2>
                </div>

                <div className="space-y-2">
                  <p className="text-lg font-medium text-[#1C252E] dark:text-[#C4CDD5]">
                    {job.locationInfo.city}
                    {job.locationInfo.district && `, ${job.locationInfo.district}`}
                  </p>
                  {job.locationInfo.address && (
                    <p className="text-[#637381] dark:text-[#919EAB]">
                      {job.locationInfo.address}
                    </p>
                  )}
                </div>

                {mapsUrl && (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#22C55E]/10 text-[#22C55E] rounded-xl text-sm font-medium hover:bg-[#22C55E]/20 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Xem trên Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* Description */}
            {job.fullDescription && (
              <div
                style={{ animationDelay: '100ms' }}
                className="animate-fade-in-up bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-4">
                  Mô tả công việc
                </h2>
                <div className="prose dark:prose-invert max-w-none text-[#637381] dark:text-[#C4CDD5] whitespace-pre-line leading-relaxed">
                  {job.fullDescription}
                </div>
              </div>
            )}

            {/* Skills */}
            <div
              style={{ animationDelay: '150ms' }}
              className="animate-fade-in-up bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 md:p-8"
            >
              <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-4">
                Kỹ năng yêu cầu
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20 px-4 py-1.5 text-sm font-medium rounded-full"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div
                style={{ animationDelay: '200ms' }}
                className="animate-fade-in-up bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-4">
                  Yêu cầu ứng viên
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                      <span className="text-[#637381] dark:text-[#C4CDD5]">
                        {req}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div
                style={{ animationDelay: '250ms' }}
                className="animate-fade-in-up bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-4">
                  Trách nhiệm công việc
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FFAB00] shrink-0 mt-0.5" />
                      <span className="text-[#637381] dark:text-[#C4CDD5]">
                        {resp}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div
                style={{ animationDelay: '300ms' }}
                className="animate-fade-in-up bg-[#22C55E]/5 dark:bg-[#22C55E]/10 border border-[#22C55E]/20 dark:border-[#22C55E]/15 rounded-2xl p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-[#22C55E] mb-4">
                  Phúc lợi
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                      <span className="text-[#1C252E] dark:text-[#C4CDD5]">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Company Section */}
            {job.companyInfo && (
              <div
                style={{ animationDelay: '350ms' }}
                className="animate-fade-in-up bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 md:p-8 overflow-hidden"
              >
                {/* Company Header with Cover */}
                {job.companyInfo.coverImageUrl && (
                  <div className="relative -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 h-32 overflow-hidden rounded-t-3xl">
                    <img
                      src={job.companyInfo.coverImageUrl}
                      alt={`${job.company} office`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#1C252E] to-transparent" />
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-white dark:bg-[#1C252E] p-2 shadow-sm border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] flex items-center justify-center shrink-0">
                    <img
                      src={job.companyInfo.logoUrl}
                      alt={job.company}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white">
                      {job.companyInfo.name}
                    </h2>
                    {job.companyInfo.industry && (
                      <p className="text-[#919EAB] text-sm">
                        {job.companyInfo.industry}
                      </p>
                    )}
                  </div>
                </div>

                {job.companyInfo.description && (
                  <p className="text-[#637381] dark:text-[#C4CDD5] leading-relaxed mb-6">
                    {job.companyInfo.description}
                  </p>
                )}

                {/* Company Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {job.companyInfo.size && (
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-[#919EAB]" />
                      <span className="text-[#637381] dark:text-[#C4CDD5]">{job.companyInfo.size}</span>
                    </div>
                  )}
                  {job.companyInfo.founded && (
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="w-4 h-4 text-[#919EAB]" />
                      <span className="text-[#637381] dark:text-[#C4CDD5]">Thành lập {job.companyInfo.founded}</span>
                    </div>
                  )}
                  {job.companyInfo.website && (
                    <a
                      href={job.companyInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#22C55E] hover:underline"
                    >
                      <Globe className="w-4 h-4" />
                      Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Contact Info Section */}
            {job.contactInfo && (
              <div
                style={{ animationDelay: '400ms' }}
                className="animate-fade-in-up bg-[#22C55E]/5 dark:bg-[#22C55E]/10 border border-[#22C55E]/20 dark:border-[#22C55E]/15 rounded-2xl p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-[#22C55E] mb-4">
                  Thông tin liên hệ
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-[#22C55E]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1C252E] dark:text-white">
                        {job.contactInfo.name}
                      </p>
                      {job.contactInfo.title && (
                        <p className="text-sm text-[#919EAB]">
                          {job.contactInfo.title}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#22C55E]" />
                    <a
                      href={`mailto:${job.contactInfo.email}`}
                      className="text-[#637381] dark:text-[#C4CDD5] hover:text-[#22C55E] transition-colors"
                    >
                      {job.contactInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#22C55E]" />
                    <a
                      href={`tel:${job.contactInfo.phone}`}
                      className="text-[#637381] dark:text-[#C4CDD5] hover:text-[#22C55E] transition-colors"
                    >
                      {job.contactInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div
              style={{ animationDelay: '200ms' }}
              className="animate-fade-in-up sticky top-28 bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-6 space-y-6"
            >
              {/* Apply Button */}
              {isJobClosed ? (
                <div className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] text-[#919EAB]">
                  <XCircle className="w-5 h-5" />
                  <span className="font-semibold">Tin đã đóng</span>
                </div>
              ) : hasUserApplied ? (
                <div className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold">Đã ứng tuyển</span>
                </div>
              ) : (
                <Button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 rounded-xl font-semibold h-12 text-base"
                >
                  Ứng tuyển ngay
                </Button>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl h-10 border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] text-[#637381] dark:text-[#C4CDD5]"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Lưu
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl h-10 border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] text-[#637381] dark:text-[#C4CDD5]"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia sẻ
                </Button>
              </div>

              <hr className="border-[rgba(145,158,171,0.12)] dark:border-white/[0.06]" />

              {/* Job Overview */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#1C252E] dark:text-white">
                  Tổng quan
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-[#919EAB]" />
                    <span className="text-[#919EAB]">Loại hình:</span>
                    <span className="font-medium text-[#1C252E] dark:text-[#C4CDD5] ml-auto">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#919EAB]" />
                    <span className="text-[#919EAB]">Địa điểm:</span>
                    <span className="font-medium text-[#1C252E] dark:text-[#C4CDD5] ml-auto">
                      {job.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-[#919EAB]" />
                    <span className="text-[#919EAB]">Mức lương:</span>
                    <span className="font-medium text-[#22C55E] ml-auto">
                      {job.salary}
                    </span>
                  </div>
                  {job.workingHours && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#919EAB]" />
                      <span className="text-[#919EAB]">Giờ làm:</span>
                      <span className="font-medium text-[#1C252E] dark:text-[#C4CDD5] ml-auto text-right text-xs">
                        {job.workingHours}
                      </span>
                    </div>
                  )}
                  {job.teamSize && (
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-[#919EAB]" />
                      <span className="text-[#919EAB]">Team:</span>
                      <span className="font-medium text-[#1C252E] dark:text-[#C4CDD5] ml-auto">
                        {job.teamSize}
                      </span>
                    </div>
                  )}
                  {job.deadline && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#919EAB]" />
                      <span className="text-[#919EAB]">Hạn nộp:</span>
                      <span className="font-medium text-[#FFAB00] ml-auto text-right text-xs">
                        {formatDeadline(job.deadline)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Map Link */}
              {mapsUrl && (
                <>
                  <hr className="border-slate-200 dark:border-slate-700" />
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] text-[#637381] dark:text-[#C4CDD5] rounded-xl text-sm font-medium hover:bg-[rgba(145,158,171,0.12)] transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Xem vị trí trên Google Maps
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        job={job}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSuccess={handleApplySuccess}
      />
    </div>
  );
}
