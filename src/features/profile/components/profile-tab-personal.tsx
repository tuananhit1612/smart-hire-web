"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useProfileStore } from "../stores/profile-store";
import { FormField, FormSelect, SaveButton, SectionCard } from "./profile-form-fields";

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * Split fullName into [họ đệm, tên].
 * "Nguyễn Văn An" → ["Nguyễn Văn", "An"]
 * "An"            → ["", "An"]
 */
function splitName(fullName: string): [string, string] {
    const trimmed = (fullName || "").trim();
    const lastSpace = trimmed.lastIndexOf(" ");
    if (lastSpace === -1) return ["", trimmed];
    return [trimmed.slice(0, lastSpace), trimmed.slice(lastSpace + 1)];
}

export function ProfileTabPersonal() {
    const { profile, setProfile } = useProfileStore();

    // Derive Họ / Tên from fullName
    const [ho, ten] = splitName(profile.fullName);
    const [firstName, setFirstName] = useState(ho);  // Họ đệm
    const [lastName, setLastName] = useState(ten);    // Tên

    // Re-sync when profile.fullName changes externally (e.g. after fetch)
    useEffect(() => {
        const [h, t] = splitName(profile.fullName);
        setFirstName(h);
        setLastName(t);
    }, [profile.fullName]);

    const updateName = (newFirst: string, newLast: string) => {
        const combined = [newFirst, newLast].filter(Boolean).join(" ").trim();
        setProfile({ ...profile, fullName: combined });
    };

    const update = (field: string, value: string) => {
        setProfile({ ...profile, [field]: value });
    };

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
                        <FormField
                            label="Họ và tên đệm"
                            value={firstName}
                            onChange={(v) => {
                                setFirstName(v);
                                updateName(v, lastName);
                            }}
                        />
                        <FormField
                            label="Tên"
                            value={lastName}
                            onChange={(v) => {
                                setLastName(v);
                                updateName(firstName, v);
                            }}
                        />
                        <FormField label="Số điện thoại" value={profile.phone} type="tel" onChange={(v) => update("phone", v)} />
                        <FormField label="Email" value={profile.email} type="email" onChange={(v) => update("email", v)} />
                        <FormField label="LinkedIn" value={profile.linkedIn} onChange={(v) => update("linkedIn", v)} />
                        <FormField label="Website cá nhân" value={profile.website} onChange={(v) => update("website", v)} />
                        <FormSelect label="Quốc gia" value={profile.country} options={["Việt Nam", "United States", "Japan", "Singapore", "South Korea", "Australia"]} onChange={(v) => update("country", v)} />
                        <FormField label="Bang / Tỉnh" value={profile.state} onChange={(v) => update("state", v)} />
                        <FormField label="Thành phố" value={profile.city} onChange={(v) => update("city", v)} />
                        <FormSelect label="Giới tính" value={profile.gender} options={["Nam", "Nữ", "Khác", "Không muốn tiết lộ"]} onChange={(v) => update("gender", v)} />
                    </div>
                </SectionCard>
            </motion.div>

            <motion.div variants={fadeUp}>
                <SaveButton />
            </motion.div>
        </motion.div>
    );
}
