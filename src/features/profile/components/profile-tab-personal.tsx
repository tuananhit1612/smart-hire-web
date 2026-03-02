"use client";

import { motion } from "framer-motion";
import { CandidateProfile } from "../types/profile";
import { FormField, FormSelect, SaveButton, SectionCard } from "./profile-form-fields";

interface Props {
    profile: CandidateProfile;
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export function ProfileTabPersonal({ profile }: Props) {
    return (
        <motion.div
            className="space-y-6"
            variants={stagger}
            initial="hidden"
            animate="visible"
        >
            {/* Thông tin cá nhân */}
            <motion.div variants={fadeUp}>
                <SectionCard>
                    <h3 className="text-lg font-bold text-[#1C252E] dark:text-white mb-6">
                        Thông tin cá nhân
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField label="Họ" value={profile.fullName.split(" ").slice(0, -1).join(" ")} />
                        <FormField label="Tên" value={profile.lastName || profile.fullName.split(" ").pop()} />
                        <FormField label="Số điện thoại" value={profile.phone} type="tel" />
                        <FormField label="Email" value={profile.email} type="email" />
                        <FormField label="LinkedIn" value={profile.linkedIn} />
                        <FormField label="Website cá nhân" value={profile.website} />
                        <FormSelect label="Quốc gia" value={profile.country} options={["Việt Nam", "United States", "Japan", "Singapore", "South Korea", "Australia"]} />
                        <FormField label="Bang / Tỉnh" value={profile.state} />
                        <FormField label="Thành phố" value={profile.city} />
                        <FormSelect label="Giới tính" value={profile.gender} options={["Nam", "Nữ", "Khác", "Không muốn tiết lộ"]} />
                    </div>
                </SectionCard>
            </motion.div>

            {/* Cơ hội bình đẳng */}
            <motion.div variants={fadeUp}>
                <SectionCard>
                    <h3 className="text-lg font-bold text-[#1C252E] dark:text-white mb-6">
                        Cơ hội bình đẳng
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormSelect label="Đại từ nhân xưng" value={profile.equalOpportunity?.pronouns} options={["Anh ấy / He/Him", "Cô ấy / She/Her", "They/Them", "Khác"]} />
                        <FormSelect label="Bạn có khuyết tật không?" value={profile.equalOpportunity?.disability} options={["Không", "Có", "Không muốn tiết lộ"]} />
                        <FormSelect label="Tình trạng cựu chiến binh" value={profile.equalOpportunity?.veteranStatus} options={["Không", "Có", "Không muốn tiết lộ"]} />
                        <FormSelect label="Dân tộc" value={profile.equalOpportunity?.ethnicity} options={["Kinh", "Hoa", "Khmer", "Khác", "Không muốn tiết lộ"]} />
                        <FormSelect label="Xu hướng tình dục" value={profile.equalOpportunity?.sexualOrientation} options={["Không muốn tiết lộ", "Dị tính", "Đồng tính", "Song tính", "Khác"]} />
                    </div>
                </SectionCard>
            </motion.div>

            <motion.div variants={fadeUp}>
                <SaveButton />
            </motion.div>
        </motion.div>
    );
}
