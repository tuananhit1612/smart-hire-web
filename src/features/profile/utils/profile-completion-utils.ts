import { CandidateProfile } from "../types/profile";

export interface CompletionSection {
  id: string;
  label: string;
  weight: number;
  isComplete: boolean;
  description: string;
}

export interface ProfileCompletion {
  percentage: number;
  sections: CompletionSection[];
  missingItems: string[];
}

/**
 * Calculate profile completion percentage based on weighted sections
 */
export function calculateProfileCompletion(profile: CandidateProfile): ProfileCompletion {
  const sections: CompletionSection[] = [
    {
      id: "basicInfo",
      label: "Thông tin cơ bản",
      weight: 20,
      isComplete: Boolean(
        profile.fullName?.trim() &&
        profile.title?.trim() &&
        profile.email?.trim() &&
        profile.location?.trim()
      ),
      description: "Họ tên, chức danh, email, địa điểm",
    },
    {
      id: "avatar",
      label: "Ảnh đại diện",
      weight: 10,
      isComplete: Boolean(profile.avatarUrl?.trim()),
      description: "Thêm ảnh đại diện chuyên nghiệp",
    },
    {
      id: "about",
      label: "Giới thiệu bản thân",
      weight: 15,
      isComplete: Boolean(profile.about?.trim() && profile.about.length >= 50),
      description: "Viết ít nhất 50 ký tự giới thiệu",
    },
    {
      id: "skills",
      label: "Kỹ năng",
      weight: 15,
      isComplete: profile.skills?.length >= 3,
      description: "Thêm ít nhất 3 kỹ năng",
    },
    {
      id: "experience",
      label: "Kinh nghiệm làm việc",
      weight: 20,
      isComplete: profile.experiences?.length >= 1,
      description: "Thêm ít nhất 1 kinh nghiệm",
    },
    {
      id: "education",
      label: "Học vấn",
      weight: 10,
      isComplete: profile.educations?.length >= 1,
      description: "Thêm ít nhất 1 trình độ học vấn",
    },
    {
      id: "socialLinks",
      label: "Liên kết mạng xã hội",
      weight: 10,
      isComplete: profile.socialLinks?.length >= 1,
      description: "Thêm ít nhất 1 liên kết",
    },
  ];

  // Calculate percentage
  const completedWeight = sections
    .filter((s) => s.isComplete)
    .reduce((sum, s) => sum + s.weight, 0);

  const percentage = Math.round(completedWeight);

  // Get missing items
  const missingItems = sections
    .filter((s) => !s.isComplete)
    .map((s) => s.label);

  return {
    percentage,
    sections,
    missingItems,
  };
}

/**
 * Get completion level label based on percentage
 */
export function getCompletionLevel(percentage: number): {
  label: string;
  color: string;
} {
  if (percentage >= 100) {
    return { label: "Hoàn thiện", color: "text-green-500" };
  } else if (percentage >= 70) {
    return { label: "Tốt", color: "text-sky-500" };
  } else if (percentage >= 40) {
    return { label: "Trung bình", color: "text-yellow-500" };
  } else {
    return { label: "Cần cải thiện", color: "text-red-500" };
  }
}
