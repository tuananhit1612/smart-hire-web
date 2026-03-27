import { 
    CandidateProfile, 
    Education as ProfileEducation, 
    Experience as ProfileExperience, 
    Project as ProfileProject, 
    Skill as ProfileSkill,
    Language as ProfileLanguage,
    Certificate as ProfileCertificate,
    SocialLink as ProfileSocialLink
} from "@/features/profile/types/profile";
import { CVData, Education, Experience, Project, Skill, SocialLink, Language, Certification, DEFAULT_CV_DATA } from "@/features/cv/types/types";

export function mapProfileToCVData(profile: CandidateProfile | null | undefined): CVData {
    if (!profile) return DEFAULT_CV_DATA;

    return {
        ...DEFAULT_CV_DATA, // Base structure

        personalInfo: {
            fullName: profile.fullName || "",
            title: profile.title || profile.headline || "",
            email: profile.email || "",
            phone: profile.phone || "",
            location: profile.location || "",
            avatarUrl: profile.avatarUrl,
            socials: profile.socialLinks?.map((link: ProfileSocialLink) => ({
                id: crypto.randomUUID(),
                network: link.platform as SocialLink["network"],
                url: link.url
            })) || [],
            additionalInfo: [],
        },

        summary: profile.summary || profile.about || "",

        education: profile.educations?.map((edu: ProfileEducation): Education => ({
            id: edu.id || crypto.randomUUID(),
            school: edu.institution,
            degree: edu.degree,
            field: edu.fieldOfStudy || "",
            startDate: edu.startDate,
            endDate: edu.endDate || "Hiện tại",
            description: edu.gpa ? `GPA: ${edu.gpa}` : "",
        })) || [],

        experience: profile.experiences?.map((exp: ProfileExperience): Experience => ({
            id: exp.id || crypto.randomUUID(),
            company: exp.companyName,
            position: exp.title,
            location: exp.location || "",
            startDate: exp.startDate,
            endDate: exp.endDate || "Hiện tại",
            isCurrent: exp.isCurrent || false,
            description: exp.description || "",
        })) || [],

        skills: profile.skills?.map((skill: ProfileSkill): Skill => {
            // Map proficiency string to a 1-5 level or string enum
            let level: Skill["level"] = 3; // default intermediate
            if (skill.proficiencyLevel) {
                const map: Record<string, number> = {
                    "BEGINNER": 1,
                    "INTERMEDIATE": 3,
                    "ADVANCED": 4,
                    "EXPERT": 5,
                };
                level = map[skill.proficiencyLevel.toUpperCase()] || 3;
            }

            return {
                id: skill.id || crypto.randomUUID(),
                name: skill.skillName,
                level,
                category: "technical", // Default to technical since we don't have this field in DB
            };
        }) || [],

        projects: profile.projects?.map((proj: ProfileProject): Project => ({
            id: proj.id || crypto.randomUUID(),
            name: proj.projectName,
            role: "", // Not explicitly saved in backend profile
            description: proj.description || "",
            technologies: proj.technologies || [],
            link: proj.link || "",
            startDate: proj.startDate,
            endDate: proj.endDate || "",
        })) || [],

        languages: profile.languages?.map((lang: ProfileLanguage): Language => ({
            id: lang.id || crypto.randomUUID(),
            name: lang.language,
            level: 'fluent' as any // Fallback
        })) || [],
        
        certifications: profile.certificates?.map((cert: ProfileCertificate): Certification => ({
            id: cert.id || crypto.randomUUID(),
            name: cert.name,
            issuer: cert.issuingOrganization || "",
            date: cert.issueDate || "",
        })) || [],
    };
}
