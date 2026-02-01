"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Job } from "../types/job";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { useToast } from "@/shared/components/ui/toast";
import { ApplyModal } from "./apply-modal";
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
  ExternalLink,
  Navigation,
  Mail,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";

interface JobDetailProps {
  job: Job;
}

export function JobDetail({ job }: JobDetailProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const { addToast } = useToast();

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
        return "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border-purple-200";
      case "Middle":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200";
      default:
        return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 border-green-200";
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pt-20">
      {/* Company Cover Image */}
      {job.companyInfo?.coverImageUrl && (
        <div className="relative h-48 md:h-56 w-full overflow-hidden">
          <img
            src={job.companyInfo.coverImageUrl}
            alt={`${job.company} office`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950/50 via-transparent to-transparent" />
        </div>
      )}

      {/* Navigation - Between cover and card */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4 pb-4">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 transition-colors"
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Logo */}
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 p-2 shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center shrink-0">
                  <img
                    src={job.companyInfo?.logoUrl || job.logoUrl}
                    alt={job.company}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {job.title}
                  </h1>
                  <p className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-4">
                    {job.company}
                    {job.companyInfo?.industry && (
                      <span className="text-slate-400 font-normal"> • {job.companyInfo.industry}</span>
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
                      className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm flex items-center gap-1.5 px-3 py-1 rounded-lg"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      {job.type}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm flex items-center gap-1.5 px-3 py-1 rounded-lg"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {getRelativeTime(job.postedAt)}
                    </Badge>
                  </div>

                  {/* Salary */}
                  <div className="flex items-center gap-2 text-xl font-bold text-green-600 dark:text-green-400">
                    <DollarSign className="w-5 h-5" />
                    {job.salary}
                  </div>
                </div>
              </div>

              {/* Actions (Mobile) */}
              <div className="flex gap-3 mt-6 lg:hidden">
                <Button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-lg shadow-blue-500/25 rounded-full font-semibold h-12"
                >
                  Ứng tuyển ngay
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full border-slate-200 dark:border-slate-700"
                >
                  <Heart className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full border-slate-200 dark:border-slate-700"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Location Card with Map Link */}
            {job.locationInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Địa điểm làm việc
                  </h2>
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                    {job.locationInfo.city}
                    {job.locationInfo.district && `, ${job.locationInfo.district}`}
                  </p>
                  {job.locationInfo.address && (
                    <p className="text-slate-500 dark:text-slate-400">
                      {job.locationInfo.address}
                    </p>
                  )}
                </div>

                {mapsUrl && (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 rounded-full text-sm font-medium hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Xem trên Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            )}

            {/* Description */}
            {job.fullDescription && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Mô tả công việc
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {job.fullDescription}
                </div>
              </motion.div>
            )}

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 md:p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Kỹ năng yêu cầu
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 border-sky-200 dark:border-sky-800 px-4 py-1.5 text-sm font-medium rounded-full"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Yêu cầu ứng viên
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-300">
                        {req}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Trách nhiệm công việc
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-300">
                        {resp}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/50 rounded-3xl p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4">
                  Phúc lợi
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                      <span className="text-green-700 dark:text-green-300">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Company Section */}
            {job.companyInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 md:p-8 overflow-hidden"
              >
                {/* Company Header with Cover */}
                {job.companyInfo.coverImageUrl && (
                  <div className="relative -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 h-32 overflow-hidden rounded-t-3xl">
                    <img
                      src={job.companyInfo.coverImageUrl}
                      alt={`${job.company} office`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-800 p-2 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center shrink-0">
                    <img
                      src={job.companyInfo.logoUrl}
                      alt={job.company}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {job.companyInfo.name}
                    </h2>
                    {job.companyInfo.industry && (
                      <p className="text-slate-500 dark:text-slate-400 text-sm">
                        {job.companyInfo.industry}
                      </p>
                    )}
                  </div>
                </div>

                {job.companyInfo.description && (
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {job.companyInfo.description}
                  </p>
                )}

                {/* Company Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {job.companyInfo.size && (
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-300">{job.companyInfo.size}</span>
                    </div>
                  )}
                  {job.companyInfo.founded && (
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-300">Thành lập {job.companyInfo.founded}</span>
                    </div>
                  )}
                  {job.companyInfo.website && (
                    <a
                      href={job.companyInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      <Globe className="w-4 h-4" />
                      Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}

            {/* Contact Info Section */}
            {job.contactInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border border-sky-200 dark:border-sky-800/50 rounded-3xl p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-sky-800 dark:text-sky-300 mb-4">
                  Thông tin liên hệ
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {job.contactInfo.name}
                      </p>
                      {job.contactInfo.title && (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {job.contactInfo.title}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    <a
                      href={`mailto:${job.contactInfo.email}`}
                      className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {job.contactInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    <a
                      href={`tel:${job.contactInfo.phone}`}
                      className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {job.contactInfo.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-28 bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 space-y-6"
            >
              {/* Apply Button */}
              <Button
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-lg shadow-blue-500/25 rounded-full font-semibold h-12 text-base"
              >
                Ứng tuyển ngay
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full h-10 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Lưu
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-full h-10 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia sẻ
                </Button>
              </div>

              <hr className="border-slate-200 dark:border-slate-700" />

              {/* Job Overview */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Tổng quan
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Loại hình:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200 ml-auto">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Địa điểm:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200 ml-auto">
                      {job.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Mức lương:</span>
                    <span className="font-medium text-green-600 dark:text-green-400 ml-auto">
                      {job.salary}
                    </span>
                  </div>
                  {job.workingHours && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-500">Giờ làm:</span>
                      <span className="font-medium text-slate-700 dark:text-slate-200 ml-auto text-right text-xs">
                        {job.workingHours}
                      </span>
                    </div>
                  )}
                  {job.teamSize && (
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-500">Team:</span>
                      <span className="font-medium text-slate-700 dark:text-slate-200 ml-auto">
                        {job.teamSize}
                      </span>
                    </div>
                  )}
                  {job.deadline && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-500">Hạn nộp:</span>
                      <span className="font-medium text-orange-600 dark:text-orange-400 ml-auto text-right text-xs">
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
                    className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Xem vị trí trên Google Maps
                  </a>
                </>
              )}
            </motion.div>
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
