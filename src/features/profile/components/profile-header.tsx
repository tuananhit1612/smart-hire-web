"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Linkedin, Github, Globe, Twitter, CheckCircle2, Camera, X, Upload, Loader2 } from "lucide-react";
import { CandidateProfile, SocialLink } from "../types/profile";
import { useProfileStore } from "../stores/profile-store";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { resolveAvatarUrl } from "@/shared/utils/resolve-avatar-url";

interface ProfileHeaderProps {
  profile: CandidateProfile;
}

const socialIcons: Record<SocialLink["platform"], React.ElementType> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Website: Globe,
  Twitter: Twitter,
};

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const { uploadAvatar } = useProfileStore();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedFileRef = useRef<File | null>(null);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) return;

    const url = URL.createObjectURL(file);
    selectedFileRef.current = file;
    setPreviewUrl(url);
    setShowPreview(true);
    setUploadError(null);
  };

  const handleConfirmAvatar = async () => {
    const file = selectedFileRef.current;
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    try {
      await uploadAvatar(file);
      // Success — clean up preview
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setShowPreview(false);
      selectedFileRef.current = null;
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setUploadError("Không thể tải ảnh. Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelAvatar = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setShowPreview(false);
    setUploadError(null);
    selectedFileRef.current = null;
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white dark:bg-[#1C252E] rounded-2xl overflow-hidden border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] hover:border-[rgba(145,158,171,0.32)] dark:hover:border-white/[0.12] transition-all"
      >
        {/* Cover Banner */}
        <div className="h-36 md:h-48 relative bg-gradient-to-br from-[#1C252E] to-[#0A0F14]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#22C55E]/40 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-[#10B981]/30 to-transparent rounded-full blur-3xl" />
          </div>
        </div>

        {/* Profile Info — overlaps cover */}
        <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-16 md:-mt-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="flex-1 min-w-0">
              {/* Avatar with Upload */}
              <div
                className="relative inline-block mb-3 cursor-pointer group"
                onMouseEnter={() => setIsHoveringAvatar(true)}
                onMouseLeave={() => setIsHoveringAvatar(false)}
                onClick={handleAvatarClick}
              >
                <div className="h-28 w-28 md:h-32 md:w-32 rounded-2xl border-4 border-white dark:border-[#1C252E] overflow-hidden shadow-lg bg-white dark:bg-[#1C252E] relative">
                  {profile.avatarUrl ? (
                    <img
                      src={resolveAvatarUrl(profile.avatarUrl)}
                      alt={isMounted ? (profile.fullName || user?.fullName || "Avatar") : "Avatar"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-extrabold text-[#22C55E] bg-gradient-to-br from-[#22C55E]/10 to-transparent">
                      {isMounted ? (profile.fullName || user?.fullName || "U").charAt(0).toUpperCase() : "U"}
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <AnimatePresence>
                    {isHoveringAvatar && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1"
                      >
                        <Camera className="w-6 h-6 text-white" />
                        <span className="text-[11px] font-semibold text-white">
                          {profile.avatarUrl ? "Đổi ảnh" : "Thêm ảnh"}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Online indicator */}
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#22C55E] border-[3px] border-white dark:border-[#1C252E] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Name & Title */}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1C252E] dark:text-white">
                    {isMounted ? (profile.fullName || user?.fullName || "Người dùng ẩn danh") : "Người dùng ẩn danh"}
                  </h1>
                  <CheckCircle2 className="w-6 h-6 text-[#22C55E] fill-[#22C55E]/20 shrink-0" />
                </div>
                <p className="text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#22C55E] to-[#10B981] mt-0.5 inline-block">
                  {profile.title || "Ứng viên"}
                </p>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap items-center gap-y-3 gap-x-5 mt-4 text-[14px] font-medium text-[#637381] dark:text-[#C4CDD5]">
                {isMounted && (profile.email || user?.email) && (
                  <span className="flex items-center gap-2 hover:text-[#22C55E] transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[#1C252E] dark:text-white" />
                    </div>
                    {profile.email || user?.email}
                  </span>
                )}
                {profile.phone && (
                  <span className="flex items-center gap-2 hover:text-[#22C55E] transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[#1C252E] dark:text-white" />
                    </div>
                    {profile.phone}
                  </span>
                )}
                {profile.location && (
                  <span className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-[#1C252E] dark:text-white" />
                    </div>
                    {profile.location}
                  </span>
                )}
              </div>

              {/* Social Links */}
              {profile.socialLinks && profile.socialLinks.length > 0 && (
                <div className="flex items-center gap-2 mt-4">
                  {profile.socialLinks.map((link) => {
                    const Icon = socialIcons[link.platform];
                    return (
                      <motion.a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] border border-transparent hover:border-[#22C55E]/30 hover:bg-[#22C55E]/10 text-[#637381] dark:text-[#919EAB] hover:text-[#22C55E] transition-all"
                        title={link.platform}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </motion.a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Avatar Preview Modal */}
      <AnimatePresence>
        {showPreview && previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={handleCancelAvatar}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-[#1C252E] rounded-2xl p-6 shadow-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#1C252E] dark:text-white">Xem trước ảnh đại diện</h3>
                <button
                  onClick={handleCancelAvatar}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[rgba(145,158,171,0.08)] text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview */}
              <div className="flex justify-center mb-6">
                <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-[#22C55E]/20 shadow-lg">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Upload error message */}
              {uploadError && (
                <p className="text-sm text-red-500 text-center mb-4">{uploadError}</p>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancelAvatar}
                  disabled={isUploading}
                  className="flex-1 h-12 px-4 text-[14px] font-bold rounded-xl border border-[rgba(145,158,171,0.32)] text-[#1C252E] dark:text-white hover:bg-[rgba(145,158,171,0.08)] transition-all disabled:opacity-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmAvatar}
                  disabled={isUploading}
                  className="flex-1 h-12 px-4 text-[14px] font-bold rounded-xl bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {isUploading ? "Đang tải..." : "Cập nhật"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
