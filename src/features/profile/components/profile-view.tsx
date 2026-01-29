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
        <div className="relative min-h-screen bg-background overflow-hidden grain-overlay">
            {/* Aurora Background Blobs */}
            <div className="aurora-blob aurora-blob-1" />
            <div className="aurora-blob aurora-blob-2" />
            <div className="aurora-blob aurora-blob-3" />

            {/* Main Content */}
            <div className="relative z-10 py-6 sm:py-10 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-6 sm:space-y-8">
                    {/* Header Section */}
                    <ProfileHeader profile={profile} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Left Column (Main Info) */}
                        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                            <ProfileAbout about={profile.about} />
                            <ProfileExperience experiences={profile.experiences} />
                            <ProfileEducation educations={profile.educations} />
                        </div>

                        {/* Right Column (Sidebar) */}
                        <div className="space-y-6 sm:space-y-8">
                            <ProfileSkills skills={profile.skills} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

