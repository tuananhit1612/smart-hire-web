"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Github, Linkedin, Globe, Edit } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { CandidateProfile } from "../types/profile";

interface ProfileHeaderProps {
  profile: CandidateProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="glass-card overflow-hidden">
        {/* Holographic Cover Gradient */}
        <div className="h-32 sm:h-40 md:h-48 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        
        <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-0 md:px-10">
          <div className="relative flex flex-col items-center md:flex-row md:items-end -mt-14 sm:-mt-16 md:-mt-20 mb-6 sm:mb-8">
            {/* Avatar with Glow */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-lg opacity-60" />
              <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden shadow-2xl bg-white dark:bg-gray-800 flex items-center justify-center">
                {profile.avatarUrl ? (
                  <Image
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {profile.fullName.split(" ").map((n) => n[0]).slice(-2).join("")}
                  </span>
                )}
              </div>
            </div>
            
            {/* Basic Info - ULTRA Typography */}
            <div className="mt-4 sm:mt-6 flex-1 text-center md:ml-8 md:mt-0 md:mb-4 md:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {profile.fullName}
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-medium text-muted-foreground mt-1">
                {profile.title}
              </p>
              <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground md:justify-start">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{profile.location}</span>
                </div>
                {profile.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="truncate max-w-[200px] sm:max-w-none">{profile.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Edit Button with Glow */}
            <div className="mt-4 sm:mt-6 flex gap-3 md:mt-0 md:mb-6">
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)]"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Social Links with Hover Glow */}
          <div className="border-t border-border/50 pt-4 sm:pt-6 flex flex-wrap gap-2 sm:gap-4 items-center justify-center md:justify-start">
            {profile.socialLinks.map((link) => {
              let Icon = Globe;
              if (link.platform === "GitHub") Icon = Github;
              if (link.platform === "LinkedIn") Icon = Linkedin;
              
              return (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-muted/50 hover:bg-primary/10 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:shadow-[0_0_10px_rgba(79,70,229,0.2)]"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden xs:inline">{link.platform}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

