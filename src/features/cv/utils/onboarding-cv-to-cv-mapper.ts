/**
 * ═══════════════════════════════════════════════════════════
 *  OnboardingCvData → CVData Mapper
 *  Converts AI-parsed CV data from the onboarding API into
 *  the CV Builder's CVData shape.
 * ═══════════════════════════════════════════════════════════
 */

import type { OnboardingCvData } from "@/features/onboarding/api/onboarding-api";
import type { CVData } from "@/features/cv/types/types";
import { DEFAULT_CV_DATA } from "@/features/cv/types/types";

export function mapOnboardingCvToCVData(
    data: OnboardingCvData | null | undefined
): CVData {
    if (!data) return DEFAULT_CV_DATA;

    const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
    const locationParts = [data.city, data.state, data.country].filter(Boolean);
    const location = locationParts.join(", ");

    // Build socials from linkedin / website
    const socials: CVData["personalInfo"]["socials"] = [];
    if (data.linkedin) {
        socials.push({ id: crypto.randomUUID(), network: "LinkedIn", url: data.linkedin });
    }
    if (data.website) {
        socials.push({ id: crypto.randomUUID(), network: "Website", url: data.website });
    }

    return {
        ...DEFAULT_CV_DATA,

        personalInfo: {
            fullName,
            title: "",
            email: data.email || "",
            phone: data.phone || "",
            location,
            socials,
        },

        summary: data.summary || "",

        experience: (data.experience || []).map((exp) => ({
            id: crypto.randomUUID(),
            company: exp.company || "",
            position: exp.title || "",
            location: "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "Hiện tại",
            isCurrent: !exp.endDate,
            description: exp.description || "",
        })),

        education: (data.education || []).map((edu) => ({
            id: crypto.randomUUID(),
            school: edu.school || "",
            degree: edu.degree || "",
            field: edu.major || "",
            startDate: edu.startDate || "",
            endDate: edu.endDate || "",
            description: "",
        })),

        skills: (data.skills || []).map((skillName) => ({
            id: crypto.randomUUID(),
            name: skillName,
            level: 3 as number, // Default intermediate
            category: "technical" as const,
        })),

        // AI parse doesn't return these, keep empty
        projects: [],
        languages: [],
        certifications: [],
        awards: [],
    };
}
