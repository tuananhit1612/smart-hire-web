"use client";

import React from 'react';
import { CVData, CVSection } from '../../types/types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { formatDateRange } from '../../utils/format-date';
import type { TemplateProps } from './template-props';
import { useEditableCV } from '../../hooks/useEditableCV';
import { useSectionLayout } from '../../hooks/useSectionLayout';
import { CVSectionWrapper } from '../CVSectionWrapper';
import { CVItemWrapper } from '../inline-edit/CVItemWrapper';

/** Sections that live in the left sidebar column */
const SIDEBAR_SECTIONS = new Set<CVSection>(['education', 'skills', 'languages', 'certifications']);

export function ModernTechTemplate({ data, editable, onDataChange, sectionOrder, hiddenSections, showSectionToolbar, onSectionAction }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects, languages, certifications, awards } = data;
    const e = useEditableCV({ data, editable, onDataChange });
    const { visibleSections, sectionIndex, totalVisible } = useSectionLayout(sectionOrder, hiddenSections);

    const renderSection = (section: CVSection, columnItems: CVSection[]): React.ReactNode => {
        const colIndex = columnItems.indexOf(section);
        const colTotal = columnItems.length;
        switch (section) {
            case 'education':
                if (education.length === 0) return null;
                return (
                    <CVSectionWrapper key="education" section="education" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addEducation}>
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-200 pb-3 mb-5">
                            Education
                        </h3>
                        <div className="space-y-6">
                            {education.map((edu, eduIdx) => (
                                <CVItemWrapper key={edu.id} onRemove={() => e.arrayHelpers.removeEducation(eduIdx)} editable={editable}>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-base">{e.eduField(eduIdx, 'school')}</h4>
                                    <div className="text-sm text-rose-600 font-semibold mb-1">{e.eduField(eduIdx, 'degree')}</div>
                                    <div className="text-xs text-slate-500 italic mb-2 relative top-[-2px]">
                                        {formatDateRange(edu.startDate, edu.endDate)}
                                    </div>
                                    <div className="text-xs text-slate-600 leading-snug">{e.eduField(eduIdx, 'field')}</div>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'skills':
                if (skills.length === 0) return null;
                return (
                    <CVSectionWrapper key="skills" section="skills" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addSkill}>
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-200 pb-3 mb-5">
                            Skills
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-extrabold text-slate-400 uppercase mb-3 tracking-wider">Technical</h4>
                                <div className="flex flex-wrap gap-2">
                                    {skills.filter(s => s.category === 'technical').map((skill) => (
                                        <CVItemWrapper key={skill.id} onRemove={() => e.arrayHelpers.removeSkillById(skill.id)} editable={editable}>
                                        <span className="text-xs px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-semibold shadow-sm">
                                            {e.skillField(skill.id, 'name')}
                                        </span>
                                        </CVItemWrapper>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-extrabold text-slate-400 uppercase mb-3 tracking-wider">Soft Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {skills.filter(s => s.category === 'soft').map((skill) => (
                                        <CVItemWrapper key={skill.id} onRemove={() => e.arrayHelpers.removeSkillById(skill.id)} editable={editable}>
                                        <span className="text-xs px-3 py-1.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg font-semibold">
                                            {e.skillField(skill.id, 'name')}
                                        </span>
                                        </CVItemWrapper>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'languages':
                if (!languages || languages.length === 0) return null;
                return (
                    <CVSectionWrapper key="languages" section="languages" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addLanguage}>
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-200 pb-3 mb-5">
                            Languages
                        </h3>
                        <div className="space-y-2">
                            {languages.map((lang) => (
                                <CVItemWrapper key={lang.id} onRemove={() => e.arrayHelpers.removeLanguageById(lang.id)} editable={editable}>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-slate-700">{e.langField(lang.id, 'name')}</span>
                                    <span className="text-xs text-rose-600 font-medium bg-rose-50 px-2 py-0.5 rounded-full">{e.langField(lang.id, 'level')}</span>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'certifications':
                if (!certifications || certifications.length === 0) return null;
                return (
                    <CVSectionWrapper key="certifications" section="certifications" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addCertification}>
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-200 pb-3 mb-5">
                            Certifications
                        </h3>
                        <div className="space-y-4">
                            {certifications.map((cert, certIdx) => (
                                <CVItemWrapper key={cert.id} onRemove={() => e.arrayHelpers.removeCertification(certIdx)} editable={editable}>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{e.certFieldById(cert.id, 'name')}</h4>
                                    <div className="text-xs text-rose-600 font-semibold">{e.certFieldById(cert.id, 'issuer')}</div>
                                    <div className="text-xs text-slate-500 italic">{e.certFieldById(cert.id, 'date')}</div>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'summary':
                if (!summary) return null;
                return (
                    <CVSectionWrapper key="summary" section="summary" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections}>
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            Professional Summary
                        </h3>
                        <div className="text-sm text-slate-700 leading-7 text-justify font-medium">
                            {e.summaryField()}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'experience':
                if (experience.length === 0) return null;
                return (
                    <CVSectionWrapper key="experience" section="experience" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addExperience}>
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            Work Experience
                        </h3>
                        <div className="space-y-8 relative">
                            <div className="absolute left-[-29px] top-2 bottom-2 w-[1px] bg-slate-100 hidden"></div>
                            {experience.map((exp, expIdx) => (
                                <CVItemWrapper key={exp.id} onRemove={() => e.arrayHelpers.removeExperience(expIdx)} editable={editable}>
                                <div className="relative group">
                                    <div className="absolute -left-[33px] top-1.5 w-2 h-2 rounded-full bg-slate-200 border-2 border-white ring-1 ring-slate-200 group-hover:bg-rose-500 group-hover:ring-rose-200 transition-all hidden"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-slate-900 text-lg group-hover:text-rose-700 transition-colors">{e.expField(expIdx, 'position')}</h4>
                                        <span className="text-xs text-slate-500 font-bold bg-slate-50 px-2 py-1 rounded">
                                            {formatDateRange(exp.startDate, exp.isCurrent ? undefined : exp.endDate, exp.isCurrent)}
                                        </span>
                                    </div>
                                    <div className="text-sm text-rose-600 font-bold mb-3 uppercase tracking-wide">{e.expField(expIdx, 'company')}</div>
                                    <div className="text-sm text-slate-600 whitespace-pre-line leading-relaxed border-l-2 border-rose-100 pl-4">
                                        {e.expField(expIdx, 'description', undefined, { multiline: true })}
                                    </div>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'projects':
                if (projects.length === 0) return null;
                return (
                    <CVSectionWrapper key="projects" section="projects" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addProject}>
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            Key Projects
                        </h3>
                        <div className="grid grid-cols-1 gap-5">
                            {projects.map((project, projIdx) => (
                                <CVItemWrapper key={project.id} onRemove={() => e.arrayHelpers.removeProject(projIdx)} editable={editable}>
                                <div className="bg-slate-50 p-5 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-slate-800 text-sm">{e.projectField(projIdx, 'name')}</h4>
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noreferrer" className="text-[10px] text-rose-600 hover:underline flex items-center gap-1 bg-white px-2 py-0.5 rounded-full shadow-sm">
                                                Link <Globe className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded-md text-slate-600 font-semibold shadow-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="text-xs text-slate-600 leading-relaxed">
                                        {e.projectField(projIdx, 'description')}
                                    </div>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'awards':
                if (!awards || awards.length === 0) return null;
                return (
                    <CVSectionWrapper key="awards" section="awards" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addAward}>
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            Awards & Achievements
                        </h3>
                        <div className="space-y-4">
                            {awards.map((award, awardIdx) => (
                                <CVItemWrapper key={award.id} onRemove={() => e.arrayHelpers.removeAward(awardIdx)} editable={editable}>
                                <div className="bg-slate-50 p-4 rounded-xl border border-transparent hover:border-slate-100">
                                    <h4 className="font-bold text-slate-800 text-sm">{e.awardField(awardIdx, 'title')}</h4>
                                    <div className="text-xs text-rose-600 font-semibold">{e.awardField(awardIdx, 'issuer')}</div>
                                    <div className="text-xs text-slate-500 italic mb-1">{e.awardField(awardIdx, 'date')}</div>
                                    {award.description && <div className="text-xs text-slate-600 leading-relaxed">{award.description}</div>}
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            default:
                return null;
        }
    };

    const sidebarItems = visibleSections.filter(s => SIDEBAR_SECTIONS.has(s));
    const mainItems = visibleSections.filter(s => !SIDEBAR_SECTIONS.has(s) && s !== 'personal');

    return (
        <div className="w-full bg-white min-h-[1000px] text-slate-800 font-sans tracking-tight">
            <header className="bg-gradient-to-r from-slate-50 to-white pt-10 pb-8 px-10 border-b border-slate-200">
                <div className="flex items-center gap-8">
                    {(personalInfo.avatarUrl || e.isEditable) && (
                        <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-white shadow-lg flex-shrink-0 ring-1 ring-slate-100">
                            {e.avatarField("", { size: "w-28 h-28" })}
                        </div>
                    )}
                    <div className="flex-1">
                        <h1 className="text-4xl font-extrabold uppercase tracking-tight mb-2 text-slate-900 group-hover:text-rose-600 transition-colors">
                            {e.personalField('fullName') || 'YOUR NAME'}
                        </h1>
                        <h2 className="text-lg text-rose-600 font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <div className="h-0.5 w-8 bg-rose-600"></div>
                            {e.personalField('title') || 'Professional Title'}
                        </h2>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 font-medium">
                            {personalInfo.email && (
                                <div className="flex items-center gap-2 hover:text-rose-600 transition-colors">
                                    <div className="p-1.5 bg-rose-50 rounded-full text-rose-600"><Mail className="w-3.5 h-3.5" /></div>
                                    <span>{e.personalField('email')}</span>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-center gap-2 hover:text-rose-600 transition-colors">
                                    <div className="p-1.5 bg-rose-50 rounded-full text-rose-600"><Phone className="w-3.5 h-3.5" /></div>
                                    <span>{e.personalField('phone')}</span>
                                </div>
                            )}
                            {personalInfo.location && (
                                <div className="flex items-center gap-2 hover:text-rose-600 transition-colors">
                                    <div className="p-1.5 bg-rose-50 rounded-full text-rose-600"><MapPin className="w-3.5 h-3.5" /></div>
                                    <span>{e.personalField('location')}</span>
                                </div>
                            )}
                            {personalInfo.socials?.map(social => (
                                <div key={social.id} className="flex items-center gap-2 hover:text-rose-600 transition-colors">
                                    <div className="p-1.5 bg-rose-50 rounded-full text-rose-600"><Globe className="w-3.5 h-3.5" /></div>
                                    <a href={`https://${social.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{social.url}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-0">
                <div className="col-span-4 bg-slate-50/50 p-10 space-y-10 border-r border-slate-100 min-h-[1000px]">
                    {sidebarItems.map(s => renderSection(s, sidebarItems))}
                </div>
                <div className="col-span-8 p-10 space-y-10 pl-12">
                    {mainItems.map(s => renderSection(s, mainItems))}
                </div>
            </div>
        </div>
    );
}
