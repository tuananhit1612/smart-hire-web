"use client";

import * as React from "react";
import { ProfileHeader } from "./profile-header";
import { ProfileAbout } from "./profile-about";
import { ProfileSkills } from "./profile-skills";
import { ProfileExperience } from "./profile-experience";
import { ProfileEducation } from "./profile-education";
import { ProfileProjects } from "./profile-projects";
import { ProfileCertificates } from "./profile-certificates";
import { ProfileLanguages } from "./profile-languages";
import { ProfileCompletionWidget } from "./profile-completion-widget";
import { useProfileStore } from "../stores/profile-store";

export function ProfileView() {
  const { profile } = useProfileStore();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden grain-overlay">
      {/* Aurora Background */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-6 sm:pt-28 sm:pb-10 md:pt-32 md:pb-16 max-w-5xl">
        <div className="space-y-6 sm:space-y-8">
          <ProfileHeader profile={profile} />

          {/* Completion Widget */}
          <ProfileCompletionWidget profile={profile} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
              <ProfileAbout about={profile.about} />
              
              <ProfileExperience experiences={profile.experiences} />
              
              <ProfileEducation educations={profile.educations} />
              
              <ProfileProjects projects={profile.projects} />

              <ProfileCertificates certificates={profile.certificates} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ProfileSkills skills={profile.skills} />
              <ProfileLanguages languages={profile.languages} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
