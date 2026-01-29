"use client";

import { mockProfile } from "../types/mock-data";
import { ProfileHeader } from "./profile-header";
import { ProfileAbout } from "./profile-about";
import { ProfileSkills } from "./profile-skills";
import { ProfileExperience } from "./profile-experience";
import { ProfileEducation } from "./profile-education";

export function ProfileView() {
  const profile = mockProfile;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden grain-overlay">
      {/* Aurora Background */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-10 md:py-16 max-w-5xl">
        <div className="space-y-6 sm:space-y-8">
          <ProfileHeader profile={profile} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
              <ProfileAbout about={profile.about} />
              <ProfileExperience experiences={profile.experiences} />
              <ProfileEducation educations={profile.educations} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ProfileSkills skills={profile.skills} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
