"use client";

import * as React from "react";
import { CVData, DEFAULT_CV_DATA } from "@/features/cv/types/types";
import { useSearchParams } from "next/navigation";
import { getMockDataForTemplate, MOCK_DATA_MAP } from "@/features/cv/data/mock-data";
import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { useToast } from "@/shared/components/ui/toast";
import { useCVAutoFill } from "@/features/cv/hooks/useCVAutoFill";
import { useCVHistory } from "@/features/cv/hooks/useCVHistory";
import { format } from "date-fns";
import { useProfileStore } from "@/features/profile/stores/profile-store";
import { mapProfileToCVData } from "@/features/cv/utils/profile-to-cv-mapper";

interface UseCVDataReturn {
    cvData: CVData;
    setCvData: React.Dispatch<React.SetStateAction<CVData>>;
    displayData: CVData;
    activeTemplateId: string;
    TemplateComponent: React.ComponentType<{ data: CVData }>;
    isSaving: boolean;
    isAutoFilling: boolean;
    autosaveStatus: "saved";
    lastSaved: Date;
    hasTemplate: boolean;
    handleSave: () => Promise<void>;
    handleFillProfileData: () => void;
    handleRestoreVersion: (data: CVData) => void;
    saveSnapshot: (data: CVData, name: string) => void;
}

export function useCVData(): UseCVDataReturn {
    const searchParams = useSearchParams();
    const activeTemplateId = searchParams.get('template') || 'modern-tech';
    const mode = searchParams.get('mode');
    const hasTemplate = !!searchParams.get('template');

    const [cvData, setCvData] = React.useState<CVData>(DEFAULT_CV_DATA);
    const [isSaving, setIsSaving] = React.useState(false);
    const { addToast } = useToast();
    const { fillData, isFilling: isAutoFilling } = useCVAutoFill(setCvData);
    const { saveSnapshot } = useCVHistory();

    // Mock autosave values for UI compatibility (autosave was removed)
    const autosaveStatus = "saved" as const;
    const lastSaved = React.useMemo(() => new Date(), []);

    const fetchProfile = useProfileStore((state) => state.fetchProfile);
    const profile = useProfileStore((state) => state.profile);

    // Fetch profile on initial load if not present
    React.useEffect(() => {
        if (!profile || profile.id === "") {
            fetchProfile().catch(console.error);
        }
    }, [profile, fetchProfile]);

    // Select Template Component
    const TemplateComponent = TEMPLATE_COMPONENTS[activeTemplateId] || TEMPLATE_COMPONENTS['modern-tech'];

    // Get base mock data for specific template
    const templateMockData = React.useMemo(() => {
        const mock = getMockDataForTemplate(activeTemplateId);
        return mock && mock.personalInfo ? mock : DEFAULT_CV_DATA;
    }, [activeTemplateId]);

    // Deep merge display data (Mock + User Input)
    const displayData: CVData = React.useMemo(() => {
        if (mode === 'new') {
            return cvData;
        }

        return {
            personalInfo: {
                fullName: cvData.personalInfo.fullName || templateMockData.personalInfo.fullName,
                title: cvData.personalInfo.title || templateMockData.personalInfo.title,
                email: cvData.personalInfo.email || templateMockData.personalInfo.email,
                phone: cvData.personalInfo.phone || templateMockData.personalInfo.phone,
                location: cvData.personalInfo.location || templateMockData.personalInfo.location,
                website: cvData.personalInfo.website || templateMockData.personalInfo.website,
                avatarUrl: cvData.personalInfo.avatarUrl || templateMockData.personalInfo.avatarUrl,
                additionalInfo: cvData.personalInfo.additionalInfo || templateMockData.personalInfo.additionalInfo,
                socials: (cvData.personalInfo.socials && cvData.personalInfo.socials.length > 0)
                    ? cvData.personalInfo.socials
                    : templateMockData.personalInfo.socials,
            },
            summary: cvData.summary || templateMockData.summary,
            experience: cvData.experience.length > 0 ? cvData.experience : templateMockData.experience,
            education: cvData.education.length > 0 ? cvData.education : templateMockData.education,
            skills: cvData.skills.length > 0 ? cvData.skills : templateMockData.skills,
            projects: cvData.projects.length > 0 ? cvData.projects : templateMockData.projects,
            languages: cvData.languages?.length > 0 ? cvData.languages : (templateMockData.languages ?? []),
            certifications: cvData.certifications?.length > 0 ? cvData.certifications : (templateMockData.certifications ?? []),
            awards: cvData.awards?.length > 0 ? cvData.awards : (templateMockData.awards ?? []),
        };
    }, [cvData, mode, templateMockData]);

    // Use Ref to keep track of latest data for event listeners
    const cvDataRef = React.useRef(cvData);
    React.useEffect(() => {
        cvDataRef.current = cvData;
    }, [cvData]);

    // Save on Tab Close / Refresh (beforeunload)
    React.useEffect(() => {
        const handleBeforeUnload = () => {
            const currentData = cvDataRef.current;
            saveSnapshot(currentData, `Lưu tự động trước khi thoát ${format(new Date(), "HH:mm")}`);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [saveSnapshot]);

    // Save on Component Unmount (Navigation away within App)
    React.useEffect(() => {
        return () => {
            const currentData = cvDataRef.current;
            if (currentData !== DEFAULT_CV_DATA) {
                saveSnapshot(currentData, `Lưu tự động khi thoát ${format(new Date(), "HH:mm")}`);
            }
        };
    }, [saveSnapshot]);

    // Manual save with toast
    const handleSave = async () => {
        setIsSaving(true);
        try {
            saveSnapshot(cvData, `Bản lưu thủ công ${format(new Date(), "HH:mm dd/MM")}`);
            await new Promise((resolve) => setTimeout(resolve, 500));
            addToast("CV đã được lưu vào Lịch sử!", "success");
        } catch {
            addToast("Có lỗi khi lưu CV. Vui lòng thử lại.", "error");
        } finally {
            setIsSaving(false);
        }
    };

    // Fill real profile data with AI animation
    const handleFillProfileData = () => {
        if (!profile || profile.id === "") {
            addToast("Chưa có dữ liệu Hồ sơ! Vui lòng cập nhật Hồ sơ trước.", "error");
            return;
        }
        const dataToLoad = mapProfileToCVData(profile);
        fillData(dataToLoad);
        addToast("Hệ thống đang đồng bộ dữ liệu vào CV...", "info");
    };

    // Restore from version history
    const handleRestoreVersion = (data: CVData) => {
        setCvData(data);
        addToast("Đã khôi phục phiên bản CV!", "success");
    };

    return {
        cvData,
        setCvData,
        displayData,
        activeTemplateId,
        TemplateComponent,
        isSaving,
        isAutoFilling,
        autosaveStatus,
        lastSaved,
        hasTemplate,
        handleSave,
        handleFillProfileData,
        handleRestoreVersion,
        saveSnapshot,
    };
}
