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

export function MinimalCleanTemplate({ data, editable, onDataChange, sectionOrder, hiddenSections, showSectionToolbar, onSectionAction }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects, languages, certifications, awards } = data;
    const e = useEditableCV({ data, editable, onDataChange });
    const { visibleSections, sectionIndex, totalVisible } = useSectionLayout(sectionOrder, hiddenSections);

    const renderSection = (section: CVSection): React.ReactNode => {
        switch (section) {
            case 'summary':
                if (!summary) return null;
                return (
                    <CVSectionWrapper key="summary" section="summary" index={sectionIndex('summary')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections}>
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                            About Me
                        </h3>
                        <div className="text-sm text-gray-700 leading-relaxed max-w-2xl">
                            {e.summaryField()}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'experience':
                if (experience.length === 0) return null;
                return (
                    <CVSectionWrapper key="experience" section="experience" index={sectionIndex('experience')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addExperience}>
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 pb-2">
                            Experience
                        </h3>
                        <div className="space-y-6">
                            {experience.map((exp, idx) => (
                                <CVItemWrapper key={exp.id} onRemove={() => e.arrayHelpers.removeExperience(idx)} editable={editable}>
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-3 text-right pr-4">
                                        <div className="text-sm font-bold text-gray-900">{e.expField(idx, 'company')}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {formatDateRange(exp.startDate, exp.isCurrent ? undefined : exp.endDate, exp.isCurrent)}
                                        </div>
                                    </div>
                                    <div className="col-span-9 border-l border-gray-100 pl-6 pb-2">
                                        <h4 className="text-sm font-bold text-gray-800 mb-2">{e.expField(idx, 'position')}</h4>
                                        <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
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
                    <CVSectionWrapper key="projects" section="projects" index={sectionIndex('projects')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addProject}>
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 pb-2">
                            Projects
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            {projects.map((project, idx) => (
                                <CVItemWrapper key={project.id} onRemove={() => e.arrayHelpers.removeProject(idx)} editable={editable}>
                                <div className="group">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-sm text-gray-900 group-hover:text-green-600 transition-colors">
                                            {e.projectField(idx, 'name')}
                                        </h4>
                                        {project.link && (
                                            <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-green-500" />
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-600 leading-relaxed mb-2">
                                        {e.projectField(idx, 'description')}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.map(tech => (
                                            <span key={tech} className="text-[10px] text-gray-400">
                                                #{tech}
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
                    <CVSectionWrapper key="education" section="education" index={sectionIndex('education')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addEducation}>
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-100 pb-2">
                            Education
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu, idx) => (
                                <CVItemWrapper key={edu.id} onRemove={() => e.arrayHelpers.removeEducation(idx)} editable={editable}>
                                <div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-sm font-bold text-gray-900">{e.eduField(idx, 'school')}</h4>
                                        <span className="text-xs text-gray-500">{formatDateRange(edu.startDate, edu.endDate)}</span>
                                    </div>
                                    <div className="text-sm text-gray-700">{e.eduField(idx, 'degree')}</div>
                                    <div className="text-xs text-gray-500">{e.eduField(idx, 'field')}</div>
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
                    <CVSectionWrapper key="skills" section="skills" index={sectionIndex('skills')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addSkill}>
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-100 pb-2">
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-x-2 gap-y-2">
                            {skills.map((skill) => (
                                <CVItemWrapper key={skill.id} onRemove={() => e.arrayHelpers.removeSkillById(skill.id)} editable={editable}>
                                <span className="text-sm text-gray-700 border-b border-gray-100 pb-0.5">
                                    {e.skillField(skill.id, 'name')}
                                </span>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'languages':
                if (!languages || languages.length === 0) return null;
                return (
                    <CVSectionWrapper key="languages" section="languages" index={sectionIndex('languages')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addLanguage}>
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-100 pb-2">
                            Languages
                        </h3>
                        <div className="space-y-1.5">
                            {languages.map((lang) => (
                                <CVItemWrapper key={lang.id} onRemove={() => e.arrayHelpers.removeLanguageById(lang.id)} editable={editable}>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-700">{e.langField(lang.id, 'name')}</span>
                                    <span className="text-gray-400 text-xs">{e.langField(lang.id, 'level')}</span>
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
                    <CVSectionWrapper key="certifications" section="certifications" index={sectionIndex('certifications')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addCertification}>
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-100 pb-2">
                            Certifications
                        </h3>
                        <div className="space-y-3">
                            {certifications.map((cert, idx) => (
                                <CVItemWrapper key={cert.id} onRemove={() => e.arrayHelpers.removeCertification(idx)} editable={editable}>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">{e.certField(idx, 'name')}</div>
                                    <div className="text-xs text-gray-500">{e.certField(idx, 'issuer')} · {e.certField(idx, 'date')}</div>
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
                    <CVSectionWrapper key="awards" section="awards" index={sectionIndex('awards')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addAward}>
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-100 pb-2">
                            Awards
                        </h3>
                        <div className="space-y-3">
                            {awards.map((award, idx) => (
                                <CVItemWrapper key={award.id} onRemove={() => e.arrayHelpers.removeAward(idx)} editable={editable}>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">{e.awardField(idx, 'title')}</div>
                                    <div className="text-xs text-gray-500">{e.awardField(idx, 'issuer')} · {e.awardField(idx, 'date')}</div>
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

    const contentSections = visibleSections.filter(s => s !== 'personal');

    return (
        <div className="w-full bg-white min-h-[1000px] p-12 text-gray-800 font-sans max-w-[210mm] mx-auto">
            <header className="text-center mb-10">
                {(personalInfo.avatarUrl || e.isEditable) && (
                    <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-100 bg-gray-50 mx-auto mb-6">
                        {e.avatarField("rounded-full", { size: "w-28 h-28" })}
                    </div>
                )}
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3 uppercase">
                    {e.personalField('fullName') || 'YOUR NAME'}
                </h1>
                <h2 className="text-lg text-gray-500 font-medium tracking-widest uppercase mb-6">
                    {e.personalField('title') || 'Professional Title'}
                </h2>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
                    {personalInfo.email && (
                        <span className="flex items-center gap-1.5">{e.personalField('email')}</span>
                    )}
                    {personalInfo.phone && (
                        <span className="flex items-center gap-1.5">{e.personalField('phone')}</span>
                    )}
                    {personalInfo.location && (
                        <span className="flex items-center gap-1.5">{e.personalField('location')}</span>
                    )}
                    {personalInfo.socials?.map(social => (
                        <span key={social.id} className="flex items-center gap-1.5">
                            <a href={`https://${social.url}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 border-b border-gray-200 hover:border-gray-900 transition-all">
                                {social.url}
                            </a>
                        </span>
                    ))}
                </div>
            </header>
            <div className="space-y-8">
                {contentSections.map(s => renderSection(s))}
            </div>
        </div>
    );
}
