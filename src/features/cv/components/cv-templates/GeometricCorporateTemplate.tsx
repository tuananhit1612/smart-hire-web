"use client";
import React from 'react';
import { CVData, CVSection } from '../../types/types';
import { Mail, Phone, MapPin, Globe, ExternalLink, ChevronRight, Hexagon, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDateRange } from '../../utils/format-date';
import type { TemplateProps } from './template-props';
import { useEditableCV } from '../../hooks/useEditableCV';
import { useSectionLayout } from '../../hooks/useSectionLayout';
import { CVSectionWrapper } from '../CVSectionWrapper';
import { CVItemWrapper } from '../inline-edit/CVItemWrapper';

export function GeometricCorporateTemplate({ data, editable, onDataChange, sectionOrder, hiddenSections, showSectionToolbar, onSectionAction, onRestoreSection }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects, languages, certifications, awards } = data;
    const e = useEditableCV({ data, editable, onDataChange });

    // Split logic
    const sidebarSections: CVSection[] = ['skills', 'languages', 'certifications', 'awards'];
    const mainSections: CVSection[] = ['experience', 'education', 'projects'];

    const { visibleSections, sectionIndex, totalVisible } = useSectionLayout(sectionOrder, hiddenSections);
    
    const visibleSidebar = visibleSections.filter(s => sidebarSections.includes(s));
    const visibleMain = visibleSections.filter(s => mainSections.includes(s));

    const renderSection = (section: CVSection, isSidebar: boolean): React.ReactNode => {
        switch (section) {
            case 'experience':
                if (experience.length === 0) return null;
                return (
                    <CVSectionWrapper key="experience" section="experience" index={sectionIndex('experience')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addExperience}>
                    <section className="mb-12">
                        <div className="flex items-center gap-4 mb-8">
                            <Square className="w-5 h-5 text-amber-500 fill-amber-500" />
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">Professional Experience</h3>
                            <div className="flex-1 h-px bg-slate-200 ml-4"></div>
                        </div>
                        <div className="space-y-10">
                            {experience.map((exp, idx) => (
                                <CVItemWrapper key={exp.id} onRemove={() => e.arrayHelpers.removeExperience(idx)} editable={editable}>
                                <div className="relative pl-8 border-l-2 border-slate-200">
                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-4 border-slate-900 rounded-none transform rotate-45" />
                                    
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900">{e.expField(idx, 'company')}</h4>
                                            <div className="text-base font-medium text-amber-600 uppercase tracking-wider">{e.expField(idx, 'position')}</div>
                                        </div>
                                        <div className="text-sm font-semibold text-slate-500 bg-slate-50 px-3 py-1 mt-1">
                                            {formatDateRange(exp.startDate, exp.isCurrent ? undefined : exp.endDate, exp.isCurrent)}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-[15px] leading-relaxed whitespace-pre-line mt-4">
                                        {e.expField(idx, 'description')}
                                    </p>
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
                        <div className="flex items-center gap-4 mb-8">
                            <Square className="w-5 h-5 text-amber-500 fill-amber-500" />
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">Key Initiatives</h3>
                            <div className="flex-1 h-px bg-slate-200 ml-4"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 pl-2">
                            {projects.map((project, idx) => (
                                <CVItemWrapper key={project.id} onRemove={() => e.arrayHelpers.removeProject(idx)} editable={editable}>
                                <div className="group border border-slate-200 p-6 hover:border-slate-400 hover:shadow-sm transition-all bg-white relative">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    
                                    <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center justify-between">
                                        {e.projectField(idx, 'name')}
                                        {project.link && <ExternalLink className="w-4 h-4 text-slate-400" />}
                                    </h4>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                                        {e.projectField(idx, 'description')}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.technologies.slice(0, 3).map(tech => (
                                            <span key={tech} className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1">
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
                    <section className="mb-12">
                        <div className="flex items-center gap-4 mb-8">
                            <Square className="w-5 h-5 text-amber-500 fill-amber-500" />
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">Academic Background</h3>
                            <div className="flex-1 h-px bg-slate-200 ml-4"></div>
                        </div>
                        <div className="space-y-6">
                            {education.map((edu, idx) => (
                                <CVItemWrapper key={edu.id} onRemove={() => e.arrayHelpers.removeEducation(idx)} editable={editable}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900">{e.eduField(idx, 'school')}</h4>
                                        <div className="text-base font-semibold text-slate-600">{e.eduField(idx, 'degree')} in {e.eduField(idx, 'field')}</div>
                                    </div>
                                    <div className="text-sm font-semibold text-slate-500 bg-slate-50 px-3 py-1">
                                        {formatDateRange(edu.startDate, edu.endDate)}
                                    </div>
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
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5 border-b border-slate-700/50 pb-2">Technical Skills</h3>
                        <div className="flex flex-col gap-3">
                            {skills.map((skill) => (
                                <CVItemWrapper key={skill.id} onRemove={() => e.arrayHelpers.removeSkillById(skill.id)} editable={editable}>
                                <div className="flex items-center gap-3">
                                    <ChevronRight className="w-4 h-4 text-amber-500 shrink-0" />
                                    <span className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
                                        {e.skillField(skill.id, 'name')}
                                    </span>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'languages':
                if (!languages || languages.length === 0) return null;
                return (
                    <CVSectionWrapper key="languages" section="languages" index={sectionIndex('languages')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addLanguage}>
                    <section className="mb-10">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5 border-b border-slate-700/50 pb-2">Languages</h3>
                        <div className="space-y-4">
                            {languages.map((lang) => (
                                <CVItemWrapper key={lang.id} onRemove={() => e.arrayHelpers.removeLanguageById(lang.id)} editable={editable}>
                                <div>
                                    <div className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-1">{e.langField(lang.id, 'name')}</div>
                                    <div className="text-xs text-slate-400 font-medium">{e.langField(lang.id, 'level')}</div>
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
                    <CVSectionWrapper key="certifications" section="certifications" index={sectionIndex('certifications')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addCertification}>
                    <section className="mb-10">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5 border-b border-slate-700/50 pb-2">Certifications</h3>
                        <div className="space-y-4">
                            {certifications.map((cert, idx) => (
                                <CVItemWrapper key={cert.id} onRemove={() => e.arrayHelpers.removeCertification(idx)} editable={editable}>
                                <div className="relative pl-4 border-l-2 border-slate-700">
                                    <div className="text-sm font-bold text-slate-200 uppercase leading-snug tracking-wide">{e.certField(idx, 'name')}</div>
                                    <div className="text-xs text-amber-500 font-medium mt-1">{e.certField(idx, 'issuer')}</div>
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
                    <CVSectionWrapper key="awards" section="awards" index={sectionIndex('awards')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addAward}>
                    <section className="mb-10">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5 border-b border-slate-700/50 pb-2">Awards</h3>
                        <div className="space-y-4">
                            {awards.map((award, idx) => (
                                <CVItemWrapper key={award.id} onRemove={() => e.arrayHelpers.removeAward(idx)} editable={editable}>
                                <div className="relative pl-4 border-l-2 border-slate-700">
                                    <div className="text-sm font-bold text-slate-200 uppercase leading-snug tracking-wide">{e.awardField(idx, 'title')}</div>
                                    <div className="text-xs text-amber-500 font-medium mt-1">{e.awardField(idx, 'issuer')}</div>
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

    return (
        <div className="w-full bg-slate-50 min-h-[1123px] text-slate-800 font-sans max-w-[210mm] mx-auto overflow-hidden">
            <div className="flex h-full min-h-[1123px]"> 
                
                {/* Left Sidebar (Navy Blue) */}
                <div className="w-[35%] bg-slate-900 border-r-8 border-amber-500 p-10 flex flex-col text-white">
                    
                    {/* Header Info */}
                    <div className="mb-12">
                         {/* Avatar */}
                        {(personalInfo.avatarUrl || e.isEditable) && (
                            <div className="w-32 h-32 mb-8 bg-slate-800 border-4 border-white transform rotate-45 overflow-hidden mx-auto shadow-2xl">
                                <div className="w-[150%] h-[150%] max-w-none origin-center transform -translate-x-[16.5%] -translate-y-[16.5%] -rotate-45">
                                    {e.avatarField("object-cover", { size: "w-full h-full" })}
                                </div>
                            </div>
                        )}
                        <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase leading-[1.1] mb-2 text-center">
                            {e.personalField('fullName')}
                        </h1>
                        <h2 className="text-sm font-bold text-amber-500 tracking-widest uppercase text-center mb-8">
                            {e.personalField('title')}
                        </h2>

                        {/* Summary in Sidebar for corporate compactness */}
                        {visibleSections.includes('summary') && summary && (
                            <CVSectionWrapper key="summary" section="summary" index={sectionIndex('summary')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction}>
                            <div className="text-slate-300 text-sm leading-relaxed font-medium mb-10 text-center">
                                {e.summaryField()}
                            </div>
                            </CVSectionWrapper>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="mb-12 font-medium text-sm space-y-4 text-slate-300">
                        {personalInfo.email && (
                            <div className="flex items-center gap-3 bg-slate-800/50 p-3">
                                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                                <span className="truncate">{e.personalField('email')}</span>
                            </div>
                        )}
                        {personalInfo.phone && (
                            <div className="flex items-center gap-3 bg-slate-800/50 p-3">
                                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                                <span>{e.personalField('phone')}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div className="flex items-center gap-3 bg-slate-800/50 p-3">
                                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                                <span className="truncate">{e.personalField('location')}</span>
                            </div>
                        )}
                        {personalInfo.socials?.[0] && (
                            <div className="flex items-center gap-3 bg-slate-800/50 p-3">
                                <Globe className="w-4 h-4 text-amber-500 shrink-0" />
                                <a href={`https://${personalInfo.socials[0].url}`} className="truncate hover:text-white transition-colors">{personalInfo.socials[0].url}</a>
                            </div>
                        )}
                    </div>

                    {/* Left sections (Skills, Langs, Certs, Awards) */}
                    <div className="flex-1 space-y-2">
                        {visibleSidebar.map(s => renderSection(s, true))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="w-[65%] p-10 md:p-12 bg-white">
                    <div className="space-y-4 mt-8">
                        {visibleMain.map(s => renderSection(s, false))}
                    </div>
                </div>
                
            </div>
        </div>
    );
}
