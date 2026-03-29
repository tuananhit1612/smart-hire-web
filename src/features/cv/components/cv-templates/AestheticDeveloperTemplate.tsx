"use client";
import React from 'react';
import { CVData, CVSection } from '../../types/types';
import { Mail, Phone, MapPin, Globe, ExternalLink, Terminal, Code2, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDateRange } from '../../utils/format-date';
import type { TemplateProps } from './template-props';
import { useEditableCV } from '../../hooks/useEditableCV';
import { useSectionLayout } from '../../hooks/useSectionLayout';
import { CVSectionWrapper } from '../CVSectionWrapper';
import { CVItemWrapper } from '../inline-edit/CVItemWrapper';

export function AestheticDeveloperTemplate({ data, editable, onDataChange, sectionOrder, hiddenSections, showSectionToolbar, onSectionAction, onRestoreSection }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects, languages, certifications, awards } = data;
    const e = useEditableCV({ data, editable, onDataChange });

    // Split logic to place some sections in the sidebar. 
    // This is a common pattern for tech templates.
    const sidebarSections: CVSection[] = ['skills', 'languages', 'certifications', 'education'];
    const mainSections: CVSection[] = ['summary', 'experience', 'projects', 'awards'];

    // We still use useSectionLayout, but we'll manually filter them into our 2 columns while preserving order
    const { visibleSections, sectionIndex, totalVisible } = useSectionLayout(sectionOrder, hiddenSections);
    
    const visibleSidebar = visibleSections.filter(s => sidebarSections.includes(s));
    const visibleMain = visibleSections.filter(s => mainSections.includes(s));

    // Colors
    // Use teal/emerald as matrix-style accent
    const accentColor = "text-teal-400";
    const accentBg = "bg-teal-400/10";
    const accentBorder = "border-teal-400/30";

    const renderSection = (section: CVSection, isSidebar: boolean): React.ReactNode => {
        switch (section) {
            case 'summary':
                if (!summary) return null;
                return (
                    <CVSectionWrapper key="summary" section="summary" index={sectionIndex('summary')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction}>
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Terminal className={cn("w-5 h-5", accentColor)} />
                            <h3 className="font-mono text-lg text-white font-semibold">~/about</h3>
                        </div>
                        <div className="text-gray-400 text-sm leading-relaxed font-sans border-l-2 border-gray-800 pl-4 py-1">
                            {e.summaryField()}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'experience':
                if (experience.length === 0) return null;
                return (
                    <CVSectionWrapper key="experience" section="experience" index={sectionIndex('experience')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addExperience}>
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <Code2 className={cn("w-5 h-5", accentColor)} />
                            <h3 className="font-mono text-lg text-white font-semibold">~/experience</h3>
                        </div>
                        <div className="space-y-8 pl-1">
                            {experience.map((exp, idx) => (
                                e.arrayHelpers.removeExperience(idx)} editable={editable}>
                                <div className="relative border-l border-gray-800 pl-6 pb-2">
                                    <div className={cn("absolute -left-[5px] top-1.5 w-2 h-2 rounded-full", exp.isCurrent ? "bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]" : "bg-gray-700")} />
                                    
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-base font-semibold text-white">{e.expField(idx, 'position')}</h4>
                                        <span className="font-mono text-xs text-gray-500 whitespace-nowrap ml-4">
                                            {formatDateRange(exp.startDate, exp.isCurrent ? undefined : exp.endDate, exp.isCurrent)}
                                        </span>
                                    </div>
                                    <div className={cn("text-sm mb-3", accentColor)}>{e.expField(idx, 'company')}</div>
                                    <div className="text-sm text-gray-400 whitespace-pre-line leading-relaxed font-sans">
                                        {e.expField(idx, 'description')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'projects':
                if (projects.length === 0) return null;
                return (
                    <CVSectionWrapper key="projects" section="projects" index={sectionIndex('projects')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addProject}>
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <Database className={cn("w-5 h-5", accentColor)} />
                            <h3 className="font-mono text-lg text-white font-semibold">~/projects</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {projects.map((project, idx) => (
                                e.arrayHelpers.removeProject(idx)} editable={editable}>
                                <div className="bg-gray-900/50 border border-gray-800 h-full rounded-lg p-5 hover:border-gray-700 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-white text-sm">
                                            {e.projectField(idx, 'name')}
                                        </h4>
                                        {project.link && (
                                            <ExternalLink className="w-3.5 h-3.5 text-gray-500 hover:text-white transition-colors" />
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-400 leading-relaxed mb-4 font-sans line-clamp-3">
                                        {e.projectField(idx, 'description')}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                        {project.technologies.map(tech => (
                                            <span key={tech} className={cn("text-[10px] px-2 py-0.5 rounded border font-mono", accentBg, accentBorder, accentColor)}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'education':
                if (education.length === 0) return null;
                return (
                    <CVSectionWrapper key="education" section="education" index={sectionIndex('education')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addEducation}>
                    <section className={cn("mb-8", !isSidebar && "col-span-2")}>
                        <h3 className="font-mono text-sm uppercase tracking-wider text-gray-500 mb-4 border-b border-gray-800 pb-2">Education</h3>
                        <div className="space-y-4">
                            {education.map((edu, idx) => (
                                e.arrayHelpers.removeEducation(idx)} editable={editable}>
                                <div>
                                    <div className="text-sm font-semibold text-white mb-1">{e.eduField(idx, 'school')}</div>
                                    <div className={cn("text-xs mb-1", accentColor)}>{e.eduField(idx, 'degree')} · {e.eduField(idx, 'field')}</div>
                                    <div className="text-xs text-gray-500 font-mono">{formatDateRange(edu.startDate, edu.endDate)}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'skills':
                if (skills.length === 0) return null;
                return (
                    <CVSectionWrapper key="skills" section="skills" index={sectionIndex('skills')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addSkill}>
                    <section className="mb-8">
                        <h3 className="font-mono text-sm uppercase tracking-wider text-gray-500 mb-4 border-b border-gray-800 pb-2">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, idx) => (
                                e.arrayHelpers.removeSkill(idx)} editable={editable}>
                                <span className="text-xs text-gray-300 font-mono bg-gray-800/50 px-2 py-1 border border-gray-700/50 rounded block">
                                    {e.skillField(skill.id, 'name')}
                                </span>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'languages':
                if (!languages || languages.length === 0) return null;
                return (
                    <CVSectionWrapper key="languages" section="languages" index={sectionIndex('languages')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addLanguage}>
                    <section className="mb-8">
                        <h3 className="font-mono text-sm uppercase tracking-wider text-gray-500 mb-4 border-b border-gray-800 pb-2">Languages</h3>
                        <div className="space-y-2">
                            {languages.map((lang, idx) => (
                                e.arrayHelpers.removeLanguageById(lang.id)} editable={editable}>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-300">{e.langField(lang.id, 'name')}</span>
                                    <span className="text-gray-500 text-xs font-mono">{e.langField(lang.id, 'level')}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'certifications':
                if (!certifications || certifications.length === 0) return null;
                return (
                    <CVSectionWrapper key="certifications" section="certifications" index={sectionIndex('certifications')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addCertification}>
                    <section className="mb-8">
                        <h3 className="font-mono text-sm uppercase tracking-wider text-gray-500 mb-4 border-b border-gray-800 pb-2">Certifications</h3>
                        <div className="space-y-3">
                            {certifications.map((cert, idx) => (
                                e.arrayHelpers.removeCertification(idx)} editable={editable}>
                                <div>
                                    <div className="text-sm text-gray-200 mb-1 leading-tight">{e.certField(idx, 'name')}</div>
                                    <div className="text-xs text-gray-500 font-mono">{e.certField(idx, 'issuer')}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'awards':
                if (!awards || awards.length === 0) return null;
                return (
                    <CVSectionWrapper key="awards" section="awards" index={sectionIndex('awards')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addAward}>
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className={cn("text-lg", accentColor)}>★</span>
                            <h3 className="font-mono text-lg text-white font-semibold">~/awards</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {awards.map((award, idx) => (
                                e.arrayHelpers.removeAward(idx)} editable={editable}>
                                <div className="border-l-2 border-gray-800 pl-4 py-1">
                                    <div className="text-sm font-bold text-white mb-1">{e.awardField(idx, 'title')}</div>
                                    <div className={cn("text-xs mb-2", accentColor)}>{e.awardField(idx, 'issuer')}</div>
                                    {award.description && <p className="text-xs text-gray-500 font-sans">{award.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full bg-[#0a0f16] min-h-[1000px] text-gray-300 font-sans max-w-[210mm] mx-auto overflow-hidden">
            {/* Dark background requires a solid color block to match A4 printing */}
            <div className="flex h-full min-h-[1123px]"> 
                
                {/* Left Sidebar */}
                <div className="w-[30%] bg-[#0f151c] p-8 border-r border-gray-800 flex flex-col">
                    {/* Avatar */}
                    <div className="mb-8 flex justify-center">
                        <div className={cn("w-32 h-32 rounded-full overflow-hidden border-2 p-1", accentBorder)}>
                            {personalInfo.avatarUrl ? (
                                <img
                                    src={personalInfo.avatarUrl}
                                    alt="Avatar"
                                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
                                    <span className="text-gray-500 font-mono text-sm">No Image</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Info (Terminal style) */}
                    <div className="mb-10 font-mono text-xs space-y-3">
                        {personalInfo.email && (
                            <div className="flex items-start gap-2 break-all">
                                <span className={accentColor}>&gt;</span>
                                <span className="text-gray-400">{e.personalField('email')}</span>
                            </div>
                        )}
                        {personalInfo.phone && (
                            <div className="flex items-start gap-2">
                                <span className={accentColor}>&gt;</span>
                                <span className="text-gray-400">{e.personalField('phone')}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div className="flex items-start gap-2">
                                <span className={accentColor}>&gt;</span>
                                <span className="text-gray-400">{e.personalField('location')}</span>
                            </div>
                        )}
                        {personalInfo.socials?.map(social => (
                            <div key={social.id} className="flex items-start gap-2 break-all">
                                <span className={accentColor}>&gt;</span>
                                <a href={`https://${social.url}`} className="text-gray-400 hover:text-white transition-colors">{social.url}</a>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar components */}
                    <div className="flex-1">
                        {visibleSidebar.map(s => renderSection(s, true))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-[70%] p-8 md:p-10">
                    {/* Header */}
                    <header className="mb-12 border-b border-gray-800 pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
                            {e.personalField('fullName')}
                        </h1>
                        <h2 className={cn("text-xl font-mono", accentColor)}>
                            {e.personalField('title')}
                        </h2>
                    </header>

                    {/* Main Content Sections */}
                    <div className="space-y-2">
                        {visibleMain.map(s => renderSection(s, false))}
                    </div>
                </div>
            </div>
        </div>
    );
}
