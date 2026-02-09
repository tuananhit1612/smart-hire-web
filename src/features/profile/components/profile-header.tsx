"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Linkedin, Github, Globe, Twitter, Pencil } from "lucide-react";
import { CandidateProfile, SocialLink } from "../types/profile";
import { Button } from "@/shared/components/ui/button";

interface ProfileHeaderProps {
  profile: CandidateProfile;
  onEdit?: () => void;
}

const socialIcons: Record<SocialLink["platform"], React.ElementType> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Website: Globe,
  Twitter: Twitter,
};

export function ProfileHeader({ profile, onEdit }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 dark:bg-sky-950/30 backdrop-blur-xl border border-white/20 dark:border-sky-800/30 rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden"
    >
      {/* Holographic Cover */}
      <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-20" />
      </div>

      {/* Profile Info */}
      <div className="px-4 sm:px-6 md:px-8 pb-6 md:pb-8 -mt-16 sm:-mt-20 relative">
        {/* Avatar */}
        <div className="relative inline-block">
          <div className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden shadow-xl glow-primary">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.fullName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center text-white text-4xl font-bold">
                {profile.fullName.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Name & Title */}
        <div className="mt-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-sky-900 dark:text-white">
            {profile.fullName}
          </h1>
          <p className="text-lg sm:text-xl text-sky-700 dark:text-sky-400 font-semibold mt-1">
            {profile.title}
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sky-800 dark:text-sky-300 text-sm">
          <span className="flex items-center gap-1.5">
            <Mail className="h-4 w-4" />
            <span className="truncate max-w-[200px]">{profile.email}</span>
          </span>
          {profile.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              {profile.phone}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {profile.location}
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3 mt-6">
          {profile.socialLinks.map((link) => {
            const Icon = socialIcons[link.platform];
            return (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 dark:bg-sky-900/30 hover:bg-sky-100 dark:hover:bg-sky-800/50 text-sky-700 dark:text-sky-300 transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm hidden xs:inline">{link.platform}</span>
              </motion.a>
            );
          })}
        </div>

        {/* Edit Button */}
        <div className="absolute top-4 right-4 sm:right-6 md:right-8">
          <a 
            href="/profile/edit"
            className="inline-flex items-center justify-center h-9 px-5 text-xs font-semibold rounded-full bg-white text-sky-700 border border-sky-100 hover:bg-sky-50 hover:scale-105 transition-all shadow-lg"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Chỉnh sửa
          </a>
        </div>
      </div>
    </motion.div>
  );
}
