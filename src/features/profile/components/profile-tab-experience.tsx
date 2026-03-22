"use client";

import { motion } from "framer-motion";
import { Experience, Education } from "../types/profile";
import { Plus, Pencil, Trash2, Briefcase, GraduationCap } from "lucide-react";
import { SectionCard } from "./profile-form-fields";

interface Props {
    experiences: Experience[];
    educations: Education[];
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

function TimelineItem({
    title,
    subtitle,
    dateRange,
    description,
    accentColor = "#22C55E",
}: {
    title: string;
    subtitle: string;
    dateRange: string;
    description?: string;
    accentColor?: string;
}) {
    return (
        <motion.div
            variants={fadeUp}
            className="group relative pl-4 border-l-2 border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] hover:border-current transition-colors"
            style={{ "--tw-border-opacity": 1, borderColor: undefined } as React.CSSProperties}
            whileHover={{ x: 2 }}
        >
            <div className="group-hover:border-l-current">
                <h4 className="text-[15px] font-bold text-[#1C252E] dark:text-white">{title}</h4>
                <p className="text-[14px] font-medium text-[#637381] dark:text-[#C4CDD5]">{subtitle}</p>
                <p className="text-[12px] font-semibold mt-1" style={{ color: accentColor }}>
                    {dateRange}
                </p>
                {description && (
                    <p className="text-[13px] text-[#637381] dark:text-[#919EAB] mt-2 leading-relaxed line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
            {/* Action buttons on hover */}
            <div className="absolute top-0 right-0 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#22C55E] hover:text-white transition-all">
                    <Pencil className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FF5630]/10 text-[#FF5630] hover:bg-[#FF5630] hover:text-white transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>
        </motion.div>
    );
}

export function ProfileTabExperience({ experiences, educations }: Props) {
    return (
        <motion.div
            className="space-y-6"
            variants={stagger}
            initial="hidden"
            animate="visible"
        >
            {/* Add button */}
            <motion.div variants={fadeUp} className="flex justify-end">
                <button className="inline-flex items-center gap-2 h-11 px-5 bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] text-[13px] font-bold rounded-xl hover:bg-[#1C252E]/90 dark:hover:bg-white/90 transition-all">
                    <Plus className="w-4 h-4" />
                    Thêm kinh nghiệm
                </button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Professional History */}
                <motion.div variants={fadeUp}>
                    <SectionCard>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-[#22C55E]" />
                            </div>
                            <h3 className="text-lg font-bold text-[#1C252E] dark:text-white">Kinh nghiệm làm việc</h3>
                        </div>

                        {experiences.length === 0 ? (
                            <p className="text-[14px] text-[#919EAB] italic">Chưa có thông tin kinh nghiệm</p>
                        ) : (
                            <motion.div className="space-y-5" variants={stagger}>
                                {experiences.map((exp) => (
                                    <TimelineItem
                                        key={exp.id}
                                        title={exp.role}
                                        subtitle={exp.company}
                                        dateRange={`${exp.startDate} — ${exp.endDate || "Hiện tại"}`}
                                        description={exp.description}
                                        accentColor="#22C55E"
                                    />
                                ))}
                            </motion.div>
                        )}
                    </SectionCard>
                </motion.div>

                {/* Education History */}
                <motion.div variants={fadeUp}>
                    <SectionCard>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#FFAB00]/10 flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-[#FFAB00]" />
                            </div>
                            <h3 className="text-lg font-bold text-[#1C252E] dark:text-white">Học vấn</h3>
                        </div>

                        {educations.length === 0 ? (
                            <p className="text-[14px] text-[#919EAB] italic">Chưa có thông tin học vấn</p>
                        ) : (
                            <motion.div className="space-y-5" variants={stagger}>
                                {educations.map((edu) => (
                                    <TimelineItem
                                        key={edu.id}
                                        title={edu.school}
                                        subtitle={`${edu.degree} — ${edu.fieldOfStudy}`}
                                        dateRange={`${edu.startDate} — ${edu.endDate || "Hiện tại"}`}
                                        accentColor="#FFAB00"
                                    />
                                ))}
                            </motion.div>
                        )}
                    </SectionCard>
                </motion.div>
            </div>
        </motion.div>
    );
}
