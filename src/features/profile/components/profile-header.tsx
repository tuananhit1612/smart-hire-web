"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Linkedin, Github, Globe, Twitter, Pencil } from "lucide-react";
import { CandidateProfile, SocialLink } from "../types/profile";
import { Button } from "@/shared/components/ui/button";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      {/* Holographic Cover */}
      <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
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
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                {profile.fullName.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Name & Title */}
        <div className="mt-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {profile.fullName}
          </h1>
          <p className="text-lg sm:text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold mt-1">
            {profile.title}
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-muted-foreground text-sm">
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
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm hidden xs:inline">{link.platform}</span>
              </motion.a>
            );
          })}
        </div>

        {/* Edit Button */}
        <div className="absolute top-4 right-4 sm:right-6 md:right-8">
          <Button variant="outline" size="sm" leftIcon={<Pencil className="h-4 w-4" />}>
            Edit Profile
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
