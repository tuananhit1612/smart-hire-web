"use client";
import React from 'react';
import { CVData, CVSection } from '../../types/types';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDateRange } from '../../utils/format-date';
import type { TemplateProps } from './template-props';
import { useEditableCV } from '../../hooks/useEditableCV';
import { useSectionLayout } from '../../hooks/useSectionLayout';
import { CVSectionWrapper } from '../CVSectionWrapper';
import { CVItemWrapper } from '../inline-edit/CVItemWrapper';

export function ElegantCreativeTemplate({ data, editable, onDataChange, sectionOrder, hiddenSections, showSectionToolbar, onSectionAction, onRestoreSection }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects, languages, certifications, awards } = data;
    const e = useEditableCV({ data, editable, onDataChange });
    const { visibleSections, sectionIndex, totalVisible } = useSectionLayout(sectionOrder, hiddenSections);

    const renderSection = (section: CVSection): React.ReactNode => {
        switch (section) {
            case 'summary':
                if (!summary) return null;
                return (
                    <CVSectionWrapper key="summary" section="summary" index={sectionIndex('summary')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction}>
                    <section className="mb-12">
                        <h3 className="font-serif italic text-2xl text-stone-800 mb-4 flex items-center gap-4">
                            <span>Profile</span>
                            <div className="h-px bg-stone-200 flex-1 mt-2"></div>
                        </h3>
                        <div className="text-stone-600 text-[15px] leading-loose font-light">
                            {e.summaryField()}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'experience':
                if (experience.length === 0) return null;
                return (
                    <CVSectionWrapper key="experience" section="experience" index={sectionIndex('experience')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addExperience}>
                    <section className="mb-12">
                        <h3 className="font-serif italic text-2xl text-stone-800 mb-8 flex items-center gap-4">
                            <span>Experience</span>
                            <div className="h-px bg-stone-200 flex-1 mt-2"></div>
                        </h3>
                        <div className="space-y-10 pl-2">
                            {experience.map((exp, idx) => (
                                <CVItemWrapper key={exp.id} onRemove={() => e.arrayHelpers.removeExperience(idx)} editable={editable}>
                                <div className="relative group">
                                    <div className="flex justify-between items-end border-b border-stone-200 pb-3 mb-4">
                                        <div>
                                            <h4 className="text-lg font-medium text-stone-900">{e.expField(idx, 'position')}</h4>
                                            <div className="text-sm font-serif text-amber-700/80 italic mt-1">{e.expField(idx, 'company')}</div>
                                        </div>
                                        <div className="text-xs uppercase tracking-widest text-stone-400 font-medium pb-1">
                                            {formatDateRange(exp.startDate, exp.isCurrent ? undefined : exp.endDate, exp.isCurrent)}
                                        </div>
                                    </div>
                                    <div className="text-stone-600 text-sm whitespace-pre-line leading-relaxed font-light">
                                        {e.expField(idx, 'description')}
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
                    <CVSectionWrapper key="projects" section="projects" index={sectionIndex('projects')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addProject}>
                    <section className="mb-12">
                        <h3 className="font-serif italic text-2xl text-stone-800 mb-8 flex items-center gap-4">
                            <span>Selected Work</span>
                            <div className="h-px bg-stone-200 flex-1 mt-2"></div>
                        </h3>
                        <div className="grid grid-cols-2 gap-8">
                            {projects.map((project, idx) => (
                                <CVItemWrapper key={project.id} onRemove={() => e.arrayHelpers.removeProject(idx)} editable={editable}>
                                <div className="bg-white/50 p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-stone-800">
                                            {e.projectField(idx, 'name')}
                                        </h4>
                                    </div>
                                    <div className="text-sm text-stone-500 font-light leading-relaxed mb-4">
                                        {e.projectField(idx, 'description')}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.slice(0, 3).map(tech => (
                                            <span key={tech} className="text-[11px] px-3 py-1 bg-stone-100 text-stone-600 rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'education':
                if (education.length === 0) return null;
                return (
                    <CVSectionWrapper key="education" section="education" index={sectionIndex('education')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addEducation}>
                    <section className="mb-10">
                        <h3 className="font-serif italic text-xl text-stone-800 mb-6">Education</h3>
                        <div className="space-y-6">
                            {education.map((edu, idx) => (
                                <CVItemWrapper key={edu.id} onRemove={() => e.arrayHelpers.removeEducation(idx)} editable={editable}>
                                <div>
                                    <div className="text-base font-medium text-stone-900">{e.eduField(idx, 'degree')} in {e.eduField(idx, 'field')}</div>
                                    <div className="text-sm font-serif text-amber-700/80 italic my-1">{e.eduField(idx, 'school')}</div>
                                    <div className="text-xs tracking-widest text-stone-400">{formatDateRange(edu.startDate, edu.endDate)}</div>
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
                    <CVSectionWrapper key="skills" section="skills" index={sectionIndex('skills')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addSkill}>
                    <section className="mb-10">
                        <h3 className="font-serif italic text-xl text-stone-800 mb-6">Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <CVItemWrapper key={skill.id} onRemove={() => e.arrayHelpers.removeSkillById(skill.id)} editable={editable}>
                                <span className="text-sm text-stone-600 border border-stone-200 px-4 py-1.5 rounded-full bg-white/50">
                                    {e.skillField(skill.id, 'name')}
                                </span>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'languages':
            case 'certifications':
            case 'awards':
                // Group minor sections into a grid if they exist
                return null; // Handled separately in the layout below

            default:
                return null;
        }
    };

    const contentSections = visibleSections.filter(s => s !== 'personal' && !['languages', 'certifications', 'awards'].includes(s));
    
    // Check if we need to render the bottom grid
    const hasBottomSections = visibleSections.some(s => ['languages', 'certifications', 'awards'].includes(s));

    return (
        <div className="w-full bg-[#FCFAEF] min-h-[1123px] font-sans max-w-[210mm] mx-auto overflow-hidden relative selection:bg-amber-100">
            
            {/* Background decorative blob */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-50 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none" />
            <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-rose-50 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none" />

            <div className="relative z-10 p-12">
                
                {/* GLASSMORPHISM HEADER */}
                <header className="mb-16 bg-white/40 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex items-center gap-8">
                    {/* Avatar */}
                    <div className="shrink-0 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 to-rose-200 rounded-[1.5rem] blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-36 h-36 rounded-[1.5rem] overflow-hidden border-2 border-white bg-stone-100">
                            {e.avatarField("", { size: "w-36 h-36" })}
                        </div>
                    </div>

                    <div className="flex-1">
                        <h1 className="text-5xl font-serif text-stone-900 tracking-tight leading-none mb-3">
                            {e.personalField('fullName')}
                        </h1>
                        <h2 className="text-xl font-light text-stone-500 tracking-wide mb-6">
                            {e.personalField('title')}
                        </h2>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600 font-light">
                            {personalInfo.email && <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" />{e.personalField('email')}</span>}
                            {personalInfo.phone && <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{e.personalField('phone')}</span>}
                            {personalInfo.location && <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{e.personalField('location')}</span>}
                            {personalInfo.socials?.map(social => (
                                <span key={social.id} className="flex items-center gap-2">
                                    <Globe className="w-3.5 h-3.5" />
                                    <a href={`https://${social.url}`} className="hover:text-stone-900 border-b border-transparent hover:border-stone-900 transition-all">{social.url}</a>
                                </span>
                            ))}
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <div className="max-w-[85%] mx-auto">
                    {contentSections.map(s => renderSection(s))}
                </div>

                {/* BOTTOM METADATA GRID (Languages, Certs, Awards) */}
                {hasBottomSections && (
                    <div className="max-w-[85%] mx-auto mt-12 pt-12 border-t border-stone-200/60 grid grid-cols-2 lg:grid-cols-3 gap-8">
                        {visibleSections.includes('languages') && languages && languages.length > 0 && (
                             <CVSectionWrapper key="languages" section="languages" index={sectionIndex('languages')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addLanguage}>
                             <div>
                                <h3 className="font-serif italic text-lg text-stone-800 mb-4">Languages</h3>
                                <div className="space-y-3">
                                    {languages.map(lang => (
                                        <CVItemWrapper key={lang.id} onRemove={() => e.arrayHelpers.removeLanguageById(lang.id)} editable={editable}>
                                        <div className="flex justify-between items-center bg-white/50 px-3 py-2 rounded-lg text-sm border border-stone-100">
                                            <span className="text-stone-700">{e.langField(lang.id, 'name')}</span>
                                            <span className="text-stone-400 text-xs tracking-wide">{e.langField(lang.id, 'level')}</span>
                                        </div>
                                        </CVItemWrapper>
                                    ))}
                                </div>
                             </div>
                             </CVSectionWrapper>
                        )}

                        {visibleSections.includes('certifications') && certifications && certifications.length > 0 && (
                            <CVSectionWrapper key="certifications" section="certifications" index={sectionIndex('certifications')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addCertification}>
                            <div>
                                <h3 className="font-serif italic text-lg text-stone-800 mb-4">Certifications</h3>
                                <div className="space-y-4">
                                    {certifications.map((cert, idx) => (
                                        <CVItemWrapper key={cert.id} onRemove={() => e.arrayHelpers.removeCertification(idx)} editable={editable}>
                                        <div>
                                            <div className="font-medium text-sm text-stone-800">{e.certField(idx, 'name')}</div>
                                            <div className="text-xs text-stone-500 font-serif italic mt-0.5">{e.certField(idx, 'issuer')}</div>
                                        </div>
                                        </CVItemWrapper>
                                    ))}
                                </div>
                            </div>
                            </CVSectionWrapper>
                        )}

                        {visibleSections.includes('awards') && awards && awards.length > 0 && (
                            <CVSectionWrapper key="awards" section="awards" index={sectionIndex('awards')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addAward}>
                            <div>
                                <h3 className="font-serif italic text-lg text-stone-800 mb-4">Awards</h3>
                                <div className="space-y-4">
                                    {awards.map((award, idx) => (
                                        <CVItemWrapper key={award.id} onRemove={() => e.arrayHelpers.removeAward(idx)} editable={editable}>
                                        <div>
                                            <div className="font-medium text-sm text-stone-800">{e.awardField(idx, 'title')}</div>
                                            <div className="text-xs text-stone-500 font-serif italic mt-0.5">{e.awardField(idx, 'issuer')}</div>
                                        </div>
                                        </CVItemWrapper>
                                    ))}
                                </div>
                            </div>
                            </CVSectionWrapper>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
