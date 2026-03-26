"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfileStore } from "../stores/profile-store";
import { ProfileHeader } from "./profile-header";
import { ProfileTabPersonal } from "./profile-tab-personal";
import { ProfileTabJobPreference } from "./profile-tab-job-preference";
import { ProfileTabExperience } from "./profile-tab-experience";
import { ProfileTabQuestions } from "./profile-tab-questions";
import { cn } from "@/lib/utils";
import { Contact, FileText, Briefcase, HelpCircle } from "lucide-react";

/* ─── Tabs Config ─── */
const TABS = [
  { id: "personal", label: "Cá nhân", icon: Contact },
  { id: "job-preference", label: "Sở thích việc làm", icon: FileText },
  { id: "experiences", label: "Kinh nghiệm", icon: Briefcase },
  { id: "questions", label: "Câu hỏi AI", icon: HelpCircle },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ─── Tab Content Animation (§9.2) ─── */
const tabContentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

export function ProfileView() {
  const { profile, fetchProfile } = useProfileStore();
  const [activeTab, setActiveTab] = useState<TabId>("personal");

  // Hydrate from API on mount — keeps mock as fallback
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="w-full max-w-[1080px] mx-auto px-4 md:px-6 lg:px-8 pb-12">
      {/* ── Profile Header (Cover + Avatar + Contact) ── */}
      <ProfileHeader profile={profile} />

      {/* ── Tab Navigation ── */}
      <div className="mt-8 mb-8 border-b border-[rgba(145,158,171,0.12)] dark:border-white/[0.06]">
        <nav className="flex gap-1 -mb-px overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative group inline-flex items-center gap-2 px-5 py-3.5 text-[14px] font-semibold whitespace-nowrap transition-colors",
                  isActive
                    ? "text-[#1C252E] dark:text-white"
                    : "text-[#919EAB] hover:text-[#637381] dark:hover:text-[#C4CDD5]"
                )}
              >
                <Icon className={cn(
                  "w-[18px] h-[18px] transition-colors",
                  isActive ? "text-[#22C55E]" : "text-current"
                )} />
                {tab.label}

                {/* Animated underline indicator */}
                {isActive && (
                  <motion.span
                    layoutId="profileTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C252E] dark:bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Tab Content with AnimatePresence ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {activeTab === "personal" && <ProfileTabPersonal profile={profile} />}
          {activeTab === "job-preference" && <ProfileTabJobPreference jobPreference={profile.jobPreference} />}
          {activeTab === "experiences" && <ProfileTabExperience experiences={profile.experiences} educations={profile.educations} />}
          {activeTab === "questions" && <ProfileTabQuestions questions={profile.aiQuestions} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
