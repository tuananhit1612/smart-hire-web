"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ProfileEditInfoForm } from "./profile-edit-info-form";
import { ProfileEditSkillsForm } from "./profile-edit-skills-form";
import { ProfileEditExperienceForm } from "./profile-edit-experience-form";
import { ProfileEditEducationForm } from "./profile-edit-education-form";
import { ProfileEditProjectsForm } from "./profile-edit-projects-form";
import { ProfileEditCertificatesForm } from "./profile-edit-certificates-form";
import { ProfileEditLanguagesForm } from "./profile-edit-languages-form";
import { useProfileStore } from "../stores/profile-store";
import { cn } from "@/shared/utils/cn";

export function ProfileEditForm() {
  const router = useRouter();
  const { profile, setProfile } = useProfileStore();
  const [activeTab, setActiveTab] = React.useState<"general" | "skills" | "experience" | "education" | "projects" | "certificates" | "languages">("general");
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call (data is already in Zustand store)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    router.push("/profile");
  };

  const tabs = [
    { id: "general", label: "Thông tin chung" },
    { id: "experience", label: "Kinh nghiệm" },
    { id: "education", label: "Học vấn" },
    { id: "skills", label: "Kỹ năng" },
    { id: "projects", label: "Dự án" },
    { id: "certificates", label: "Chứng chỉ" },
    { id: "languages", label: "Ngôn ngữ" },
  ] as const;

  return (
    <div className="min-h-screen bg-background pb-20 pt-24 sm:pt-28">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Integrated Header Card */}
        <div className="bg-white/70 dark:bg-sky-950/30 backdrop-blur-xl border border-white/20 dark:border-sky-800/30 rounded-3xl shadow-xl shadow-blue-900/5 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/profile")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-sky-900 dark:text-white">Chỉnh sửa hồ sơ</h1>
            </div>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
              {!isSaving && <Save className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "w-full text-left px-5 py-3 rounded-full text-sm font-medium transition-all hover:scale-105",
                  activeTab === tab.id
                    ? "bg-sky-700 text-white shadow-lg shadow-sky-700/20"
                    : "hover:bg-sky-50 text-sky-900 dark:text-gray-300 dark:hover:bg-zinc-800"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            <div className="bg-white/70 dark:bg-sky-950/30 backdrop-blur-xl border border-white/20 dark:border-sky-800/30 rounded-3xl shadow-xl shadow-blue-900/5 p-6 md:p-8 min-h-[500px]">
              {activeTab === "general" && (
                <ProfileEditInfoForm
                  profile={profile}
                  onChange={setProfile}
                />
              )}
              {activeTab === "skills" && (
                <ProfileEditSkillsForm
                  skills={profile.skills}
                  onChange={(newSkills) => setProfile({ ...profile, skills: newSkills })}
                />
              )}
              {activeTab === "experience" && (
                <ProfileEditExperienceForm
                  experiences={profile.experiences}
                  onChange={(newExperiences) => setProfile({ ...profile, experiences: newExperiences })}
                />
              )}
              {activeTab === "education" && (
                <ProfileEditEducationForm
                  educations={profile.educations}
                  onChange={(newEducations) => setProfile({ ...profile, educations: newEducations })}
                />
              )}
               {activeTab === "projects" && (
                <ProfileEditProjectsForm
                  projects={profile.projects}
                  onChange={(newProjects) => setProfile({ ...profile, projects: newProjects })}
                />
              )}
              {activeTab === "certificates" && (
                <ProfileEditCertificatesForm
                  certificates={profile.certificates}
                  onChange={(newCerts) => setProfile({ ...profile, certificates: newCerts })}
                />
              )}
               {activeTab === "languages" && (
                <ProfileEditLanguagesForm
                  languages={profile.languages}
                  onChange={(newLangs) => setProfile({ ...profile, languages: newLangs })}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
