"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Github, Linkedin, Globe, Edit } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { CandidateProfile } from "../types/profile";

interface ProfileHeaderProps {
  profile: CandidateProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm">
        {/* Cover Image Placeholder - could be dynamic in future */}
        <div className="h-32 w-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90" />
        
        <div className="px-6 pb-6 pt-0 md:px-8">
          <div className="relative flex flex-col items-center md:flex-row md:items-end -mt-12 mb-6">
            {/* Avatar */}
            <div className="relative h-32 w-32 rounded-full border-4 border-white dark:border-zinc-900 overflow-hidden shadow-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
               {profile.avatarUrl ? (
                 <Image
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  fill
                  className="object-cover"
                />
               ) : (
                 <span className="text-4xl font-bold text-zinc-400 dark:text-zinc-500">
                    {profile.fullName.split(" ").map((n) => n[0]).slice(-2).join("")}
                 </span>
               )}
            </div>
            
            {/* Basic Info */}
            <div className="mt-4 flex-1 text-center md:ml-6 md:mt-0 md:mb-2 md:text-left">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{profile.fullName}</h1>
              <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">{profile.title}</p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500 dark:text-zinc-500 md:justify-start">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
                {profile.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{profile.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-3 md:mt-0 md:mb-4">
              <Button variant="outline" size="sm" className="hidden md:flex">
                 <Edit className="mr-2 h-4 w-4" />
                 Edit Profile
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                 <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Social Links & Contact */}
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 flex flex-wrap gap-4 items-center justify-center md:justify-start">
             {profile.socialLinks.map((link) => {
                 let Icon = Globe;
                 if (link.platform === "GitHub") Icon = Github;
                 if (link.platform === "LinkedIn") Icon = Linkedin;
                 if (link.platform === "Twitter") Icon = Globe; // Lucide doesn't have Twitter brand icon by default always, using Globe fallback or import Twitter
                 
                 return (
                     <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
                     >
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{link.platform}</span>
                     </a>
                 )
             })}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
