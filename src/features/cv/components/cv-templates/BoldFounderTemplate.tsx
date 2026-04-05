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

export function BoldFounderTemplate({ data, editable, onDataChange, sectionOrder, hiddenSections, showSectionToolbar, onSectionAction, onRestoreSection }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects, languages, certifications, awards } = data;
    const e = useEditableCV({ data, editable, onDataChange });
    const { visibleSections, sectionIndex, totalVisible } = useSectionLayout(sectionOrder, hiddenSections);

    const renderSection = (section: CVSection): React.ReactNode => {
        switch (section) {
            case 'summary':
                if (!summary) return null;
                return (
                    <CVSectionWrapper key="summary" section="summary" index={sectionIndex('summary')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction}>
                    <section className="mb-14">
                        <div className="text-xl md:text-2xl font-semibold leading-tight text-black max-w-3xl tracking-tight">
                            {e.summaryField()}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'experience':
                if (experience.length === 0) return null;
                return (
                    <CVSectionWrapper key="experience" section="experience" index={sectionIndex('experience')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addExperience}>
                    <section className="mb-14">
                        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-8 border-b-2 border-black pb-4">
                            Work Experience
                        </h3>
                        <div className="space-y-10">
                            {experience.map((exp, idx) => (
                                <CVItemWrapper key={exp.id} onRemove={() => e.arrayHelpers.removeExperience(idx)} editable={editable}>
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="col-span-3 text-sm font-bold text-gray-500 uppercase tracking-widest pt-1">
                                        {formatDateRange(exp.startDate, exp.isCurrent ? undefined : exp.endDate, exp.isCurrent)}
                                    </div>
                                    <div className="col-span-9">
                                        <h4 className="text-2xl font-black text-black tracking-tight mb-1">{e.expField(idx, 'company')}</h4>
                                        <div className="text-lg font-medium text-blue-600 mb-4">{e.expField(idx, 'position')}</div>
                                        <div className="text-gray-700 leading-relaxed font-medium">
                                            {e.expField(idx, 'description')}
                                        </div>
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
                    <section className="mb-14">
                        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-8 border-b-2 border-black pb-4">
                            Key Projects
                        </h3>
                        <div className="space-y-8">
                            {projects.map((project, idx) => (
                                <CVItemWrapper key={project.id} onRemove={() => e.arrayHelpers.removeProject(idx)} editable={editable}>
                                <div className="group">
                                    <h4 className="text-xl font-bold text-black group-hover:text-blue-600 transition-colors mb-2 inline-flex items-center gap-2">
                                        {e.projectField(idx, 'name')}
                                        {project.link && <ExternalLink className="w-4 h-4 text-gray-400" />}
                                    </h4>
                                    <div className="text-gray-600 font-medium leading-relaxed mb-3">
                                        {e.projectField(idx, 'description')}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map(tech => (
                                            <span key={tech} className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-800 uppercase tracking-wider">
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
                    <section className="mb-14">
                        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-8 border-b-2 border-black pb-4">
                            Education
                        </h3>
                        <div className="grid grid-cols-2 gap-8">
                            {education.map((edu, idx) => (
                                <CVItemWrapper key={edu.id} onRemove={() => e.arrayHelpers.removeEducation(idx)} editable={editable}>
                                <div>
                                    <h4 className="text-lg font-black text-black">{e.eduField(idx, 'school')}</h4>
                                    <div className="text-gray-600 font-medium my-1">{e.eduField(idx, 'degree')} — {e.eduField(idx, 'field')}</div>
                                    <div className="text-sm font-bold text-gray-400">{formatDateRange(edu.startDate, edu.endDate)}</div>
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
                    <section className="mb-14">
                        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-8 border-b-2 border-black pb-4">
                            Core Capabilities
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill) => (
                                <CVItemWrapper key={skill.id} onRemove={() => e.arrayHelpers.removeSkillById(skill.id)} editable={editable}>
                                <span className="text-sm font-bold border-2 border-black px-4 py-2 text-black uppercase tracking-wide">
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
                return null;

            default:
                return null;
        }
    };

    const contentSections = visibleSections.filter(s => s !== 'personal' && !['languages', 'certifications', 'awards'].includes(s));
    const hasBottomSections = visibleSections.some(s => ['languages', 'certifications', 'awards'].includes(s));

    return (
        <div className="w-full bg-white min-h-[1123px] font-sans max-w-[210mm] mx-auto overflow-hidden text-black selection:bg-black selection:text-white">
            <div className="p-10 md:p-14">
                
                {/* HEADER (High Impact Typography) */}
                <header className="mb-16">
                    <div className="flex justify-between items-start mb-8 gap-8">
                        <div className="flex-1">
                            <h1 className="text-6xl font-black tracking-tighter uppercase leading-[1.1] text-black break-words max-w-[500px]">
                                {e.personalField('fullName')}
                            </h1>
                            <div className="mt-6 w-16 h-2 bg-blue-600"></div>
                            <h2 className="text-2xl font-bold text-gray-500 uppercase tracking-widest mt-6">
                                {e.personalField('title')}
                            </h2>
                        </div>
                        
                        {/* Avatar square */}
                        {(personalInfo.avatarUrl || e.isEditable) && (
                            <div className="w-48 h-48 shrink-0 grayscale hover:grayscale-0 transition-all duration-500">
                                {e.avatarField("", { size: "w-48 h-48" })}
                            </div>
                        )}
                    </div>

                    {/* Contact grid */}
                    <div className="grid grid-cols-4 gap-4 pt-8 border-t-2 border-black text-sm font-bold uppercase tracking-wider text-gray-600">
                        {personalInfo.email && <div className="truncate pr-4">{e.personalField('email')}</div>}
                        {personalInfo.phone && <div>{e.personalField('phone')}</div>}
                        {personalInfo.location && <div>{e.personalField('location')}</div>}
                        {personalInfo.socials?.[0] && <div className="text-right"><a href={`https://${personalInfo.socials[0].url}`} className="hover:text-black hover:underline">{personalInfo.socials[0].network}</a></div>}
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <div className="max-w-[100%]">
                    {contentSections.map(s => renderSection(s))}
                </div>

                {/* BOTTOM METADATA GRID */}
                {hasBottomSections && (
                    <div className="grid grid-cols-3 gap-8 pt-8 border-t-2 border-black">
                        {visibleSections.includes('languages') && languages && languages.length > 0 && (
                            <CVSectionWrapper key="languages" section="languages" index={sectionIndex('languages')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addLanguage}>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Languages</h3>
                                <div className="space-y-2">
                                    {languages.map(lang => (
                                        <CVItemWrapper key={lang.id} onRemove={() => e.arrayHelpers.removeLanguageById(lang.id)} editable={editable}>
                                        <div className="text-sm font-bold text-black uppercase">
                                            {e.langField(lang.id, 'name')} <span className="text-gray-400 ml-2">— {e.langField(lang.id, 'level')}</span>
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
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Certifications</h3>
                                <div className="space-y-3">
                                    {certifications.map((cert, idx) => (
                                        <CVItemWrapper key={cert.id} onRemove={() => e.arrayHelpers.removeCertification(idx)} editable={editable}>
                                        <div>
                                            <div className="text-sm font-bold text-black leading-snug">{e.certField(idx, 'name')}</div>
                                            <div className="text-xs font-bold text-gray-500 uppercase mt-1">{e.certField(idx, 'issuer')}</div>
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
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Awards</h3>
                                <div className="space-y-3">
                                    {awards.map((award, idx) => (
                                        <CVItemWrapper key={award.id} onRemove={() => e.arrayHelpers.removeAward(idx)} editable={editable}>
                                        <div>
                                            <div className="text-sm font-bold text-black leading-snug">{e.awardField(idx, 'title')}</div>
                                            <div className="text-xs font-bold text-gray-500 uppercase mt-1">{e.awardField(idx, 'issuer')}</div>
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
