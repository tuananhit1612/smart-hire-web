"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Experience, Education, Project, Skill } from "../types/profile";
import { Plus, Pencil, Trash2, Briefcase, GraduationCap } from "lucide-react";
import { SectionCard } from "./profile-form-fields";
import { useProfileStore } from "../stores/profile-store";
import { ProfileEditExperience } from "./profile-edit-experience";
import { ProfileEditEducation } from "./profile-edit-education";
import { ProfileProjects } from "./profile-projects";
import { ProfileSkills } from "./profile-skills";
import { ProfileEditProjects } from "./profile-edit-projects";
import { 
    mapExperienceToApi, 
    mapEducationToApi, 
    mapProjectToApi, 
    mapSkillToApi 
} from "../utils/profile-mapper";

interface Props {
    experiences: Experience[];
    educations: Education[];
    projects: Project[];
    skills: Skill[];
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
    onEdit,
    onDelete,
}: {
    title: string;
    subtitle: string;
    dateRange: string;
    description?: string;
    accentColor?: string;
    onEdit?: () => void;
    onDelete?: () => void;
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
            <div className="absolute top-0 right-0 gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex">
                {onEdit && (
                    <button 
                        onClick={onEdit}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#22C55E] hover:text-white transition-all"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                    </button>
                )}
                {onDelete && (
                    <button 
                        onClick={onDelete}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FF5630]/10 text-[#FF5630] hover:bg-[#FF5630] hover:text-white transition-all"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
        </motion.div>
    );
}

export function ProfileTabExperience({ experiences, educations, projects, skills }: Props) {
    const store = useProfileStore();

    // Exp Modals
    const [expModalOpen, setExpModalOpen] = React.useState(false);
    const [editingExp, setEditingExp] = React.useState<Experience | null>(null);

    // Edu Modals
    const [eduModalOpen, setEduModalOpen] = React.useState(false);
    const [editingEdu, setEditingEdu] = React.useState<Education | null>(null);

    // Project Modals
    const [projModalOpen, setProjModalOpen] = React.useState(false);
    const [editingProj, setEditingProj] = React.useState<Project | null>(null);

    const handleSaveExp = async (exp: Experience | Omit<Experience, "id">) => {
        const payload = mapExperienceToApi(exp as Experience);
        if ("id" in exp && !exp.id.startsWith("exp-") && !exp.id.startsWith("new-")) {
            await store.updateExperience(exp.id, payload);
        } else {
            await store.addExperience(payload);
        }
    };

    const handleDeleteExp = async (id: string) => {
        if (confirm("Xác nhận xóa kinh nghiệm này?")) {
            await store.deleteExperience(id);
        }
    };

    const handleSaveEdu = async (edu: Education | Omit<Education, "id">) => {
        const payload = mapEducationToApi(edu as Education);
        if ("id" in edu && !edu.id.startsWith("edu-") && !edu.id.startsWith("new-")) {
            await store.updateEducation(edu.id, payload);
        } else {
            await store.addEducation(payload);
        }
    };

    const handleDeleteEdu = async (id: string) => {
        if (confirm("Xác nhận xóa quá trình học vấn này?")) {
            await store.deleteEducation(id);
        }
    };

    const handleSaveProj = async (proj: Project | Omit<Project, "id">) => {
        const payload = mapProjectToApi(proj as Project);
        if ("id" in proj && !proj.id.startsWith("proj-") && !proj.id.startsWith("new-")) {
            await store.updateProject(proj.id, payload);
        } else {
            await store.addProject(payload);
        }
    };

    const handleDeleteProj = async (id: string) => {
        if (confirm("Xác nhận xóa dự án này?")) {
            await store.deleteProject(id);
        }
    };

    // Bulk Save cho Skills vì ProfileEditSkills trả về mảng đầy đủ
    const handleSaveSkillsBulk = async (newSkills: Skill[]) => {
        // Find deleted skills
        const existingIds = skills.map(s => s.id);
        const newIds = newSkills.map(s => s.id);
        
        const deletedIds = existingIds.filter(id => !newIds.includes(id));
        for (const id of deletedIds) {
            await store.deleteSkill(id);
        }

        // Add or Update
        for (const skill of newSkills) {
            const payload = mapSkillToApi(skill);
            if (skill.id.startsWith("new-") || !existingIds.includes(skill.id)) {
                await store.addSkill(payload);
            } else {
                await store.updateSkill(skill.id, payload);
            }
        }
    };

    return (
        <motion.div
            className="space-y-6"
            variants={stagger}
            initial="hidden"
            animate="visible"
        >
            {/* Add buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-end gap-3">
                <button 
                    onClick={() => { setEditingExp(null); setExpModalOpen(true); }}
                    className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 h-11 px-5 bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] text-[13px] font-bold rounded-xl hover:bg-[#1C252E]/90 dark:hover:bg-white/90 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Thêm kinh nghiệm
                </button>
                <button 
                    onClick={() => { setEditingEdu(null); setEduModalOpen(true); }}
                    className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 h-11 px-5 bg-[#FFAB00]/10 text-[#FFAB00] text-[13px] font-bold rounded-xl hover:bg-[#FFAB00] hover:text-white transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Thêm học vấn
                </button>
                <button 
                    onClick={() => { setEditingProj(null); setProjModalOpen(true); }}
                    className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 h-11 px-5 bg-purple-500/10 text-purple-500 text-[13px] font-bold rounded-xl hover:bg-purple-500 hover:text-white transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Thêm dự án
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
                                        title={exp.title}
                                        subtitle={exp.companyName}
                                        dateRange={`${exp.startDate} — ${exp.endDate || "Hiện tại"}`}
                                        description={exp.description}
                                        accentColor="#22C55E"
                                        onEdit={() => { setEditingExp(exp); setExpModalOpen(true); }}
                                        onDelete={() => handleDeleteExp(exp.id)}
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
                                        title={edu.institution}
                                        subtitle={`${edu.degree} — ${edu.fieldOfStudy}`}
                                        dateRange={`${edu.startDate} — ${edu.endDate || "Hiện tại"}`}
                                        accentColor="#FFAB00"
                                        onEdit={() => { setEditingEdu(edu); setEduModalOpen(true); }}
                                        onDelete={() => handleDeleteEdu(edu.id)}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </SectionCard>
                </motion.div>
            </div>

            <motion.div variants={fadeUp}>
                <div className="relative group">
                    <ProfileProjects projects={projects} />
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex flex-col gap-1">
                            {projects.map(proj => (
                                <div key={proj.id} className="flex gap-1 justify-end">
                                    <button onClick={() => { setEditingProj(proj); setProjModalOpen(true); }} className="p-1.5 bg-white dark:bg-[#212B36] border border-border rounded shadow-sm hover:text-purple-500" title={`Sửa ${proj.projectName}`}>
                                        <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => handleDeleteProj(proj.id)} className="p-1.5 bg-white dark:bg-[#212B36] border border-border rounded shadow-sm hover:text-red-500" title={`Xoá ${proj.projectName}`}>
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={fadeUp}>
                <ProfileSkills skills={skills} onSave={handleSaveSkillsBulk} />
            </motion.div>

            <ProfileEditExperience 
                open={expModalOpen}
                onOpenChange={setExpModalOpen}
                experience={editingExp}
                onSave={handleSaveExp}
            />

            <ProfileEditEducation 
                open={eduModalOpen}
                onOpenChange={setEduModalOpen}
                education={editingEdu}
                onSave={handleSaveEdu}
            />

            <ProfileEditProjects 
                open={projModalOpen}
                onOpenChange={setProjModalOpen}
                project={editingProj}
                onSave={handleSaveProj}
            />
        </motion.div>
    );
}
