"use client";

import { MOCK_PROFILE } from "../types/mock-data";
import { ProfileHeader } from "./profile-header";
import { ProfileAbout } from "./profile-about";
import { ProfileExperience } from "./profile-experience";
import { ProfileEducation } from "./profile-education";
import { ProfileSkills } from "./profile-skills";

export function ProfileView() {
    const profile = MOCK_PROFILE;

    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50 py-10">
            <div className="container mx-auto px-4 max-w-5xl space-y-6">
                {/* Header Section */}
                <ProfileHeader profile={profile} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column (Main Info) */}
                    <div className="md:col-span-2 space-y-6">
                        <ProfileAbout about={profile.about} />
                        <ProfileExperience experiences={profile.experiences} />
                        <ProfileEducation educations={profile.educations} />
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-6">
                        <ProfileSkills skills={profile.skills} />
                        
                        {/* Potential future widgets: Resume, Portfolio, Languages, etc. */}
                        {/* <ProfileResume /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
