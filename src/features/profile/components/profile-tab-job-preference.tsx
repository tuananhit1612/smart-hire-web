"use client";

import { motion } from "framer-motion";
import { JobPreference } from "../types/profile";
import { HelpCircle } from "lucide-react";
import { FormField, FormSelect, SaveButton, SectionCard } from "./profile-form-fields";

interface Props {
    jobPreference?: JobPreference;
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ProfileTabJobPreference({ jobPreference }: Props) {
    const pref = jobPreference;

    return (
        <motion.div
            className="space-y-6"
            variants={stagger}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={fadeUp}>
                <SectionCard>
                    <div className="flex items-center gap-2 mb-6">
                        <h3 className="text-lg font-bold text-[#1C252E] dark:text-white">Sở thích việc làm</h3>
                        <div
                            className="w-5 h-5 rounded-full bg-[#22C55E]/10 flex items-center justify-center cursor-help"
                            title="Thông tin này giúp AI SmartHire gợi ý công việc phù hợp nhất với bạn"
                        >
                            <HelpCircle className="w-3.5 h-3.5 text-[#22C55E]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField label="Vị trí mong muốn" value={pref?.jobTitles?.join(", ")} placeholder="VD: Frontend Developer, Tech Lead" />
                        <FormSelect label="Địa điểm ưa thích" value={pref?.preferredLocations?.[0]} options={["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Remote", "Nước ngoài"]} />
                        <FormSelect label="Ngành nghề ưa thích" value={pref?.preferredIndustry} options={["Công nghệ thông tin", "Ngân hàng / Tài chính", "Thương mại điện tử", "Giáo dục", "Y tế", "Sản xuất", "Khác"]} />
                        <FormSelect label="Loại hình việc làm" value={pref?.employmentType} options={["Full-time", "Part-time", "Contract", "Freelance", "Internship"]} />
                        <FormSelect label="Cấp bậc kinh nghiệm" value={pref?.preferredExperienceLevel} options={["Intern", "Fresher", "Junior", "Mid-level", "Senior", "Lead", "Manager"]} />
                        <FormSelect label="Quy mô công ty" value={pref?.companySize} options={["1-10", "11-50", "50-200", "200-500", "500-1000", "1000+"]} />
                        <FormSelect label="Hình thức làm việc" value={pref?.workPreference || ""} options={["Remote", "Onsite", "Hybrid"]} />
                        <FormSelect label="Sẵn sàng chuyển nơi ở?" value={pref?.willingToRelocate ? "Có" : "Không"} options={["Có", "Không"]} />
                        <FormField label="Ngày sẵn sàng" value={pref?.availabilityDate} type="date" />
                        <FormField label="Mức lương kỳ vọng" value={pref?.salary} placeholder="VD: 30.000.000 - 50.000.000 VND" />
                    </div>
                </SectionCard>
            </motion.div>

            <motion.div variants={fadeUp}>
                <SaveButton />
            </motion.div>
        </motion.div>
    );
}
