"use client";
import React from 'react';
import { CVData, CVSection } from '../../types/types';
import { Mail, Phone, MapPin, Globe, ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDateRange } from '../../utils/format-date';
import type { TemplateProps } from './template-props';
import { useEditableCV } from '../../hooks/useEditableCV';
import { useSectionLayout } from '../../hooks/useSectionLayout';
import { CVSectionWrapper } from '../CVSectionWrapper';
import { CVItemWrapper } from '../inline-edit/CVItemWrapper';

export function NeobrutalismTemplate({ data, editable, onDataChange, sectionOrder, hiddenSections, showSectionToolbar, onSectionAction, onRestoreSection }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects, languages, certifications, awards } = data;
    const e = useEditableCV({ data, editable, onDataChange });
    const { visibleSections, sectionIndex, totalVisible } = useSectionLayout(sectionOrder, hiddenSections);

    const brutalStyle = "border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-6 rounded-none";
    const brutalBadge = "border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase tracking-wider text-xs px-3 py-1";

    const renderSection = (section: CVSection): React.ReactNode => {
        switch (section) {
            case 'summary':
                if (!summary) return null;
                return (
                    <CVSectionWrapper key="summary" section="summary" index={sectionIndex('summary')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction}>
                    <section className="mb-10">
                        <div className={cn(brutalStyle, "bg-indigo-100")}>
                            <h3 className="font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4">About Me</h3>
                            <p className="text-black text-lg font-bold leading-relaxed">
                                {e.summaryField()}
                            </p>
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'experience':
                if (experience.length === 0) return null;
                return (
                    <CVSectionWrapper key="experience" section="experience" index={sectionIndex('experience')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addExperience}>
                    <section className="mb-10">
                        <h3 className="font-black text-4xl uppercase mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-emerald-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block"></span>
                            Experience
                        </h3>
                        <div className="space-y-8">
                            {experience.map((exp, idx) => (
e.arrayHelpers.removeExperience(idx)} editable={editable}>
<div key={exp.id} className={cn(brutalStyle, "relative")}>
                                    <div className="absolute -top-4 -right-4 bg-yellow-300 border-4 border-black px-4 py-1 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-3 z-10">
                                        {formatDateRange(exp.startDate, exp.isCurrent ? undefined : exp.endDate, exp.isCurrent)}
                                    </div>
                                    <h4 className="text-2xl font-black uppercase tracking-tight">{e.expField(idx, 'company')}</h4>
                                    <div className="text-xl font-bold text-amber-600 border-b-4 border-black pb-4 mb-4">{e.expField(idx, 'position')}</div>
                                    <p className="font-medium text-black leading-relaxed whitespace-pre-line text-base">
                                        {e.expField(idx, 'description')}
                                    </p>
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
                        <h3 className="font-black text-4xl uppercase mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-pink-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block"></span>
                            Projects
                        </h3>
                        <div className="grid grid-cols-2 gap-8">
                            {projects.map((project, idx) => (
e.arrayHelpers.removeProject(idx)} editable={editable}>
<div key={project.id} className={cn(brutalStyle, "bg-slate-50 flex flex-col")}>
                                    <div className="flex justify-between items-start mb-3 border-b-4 border-black pb-3">
                                        <h4 className="text-xl font-black uppercase w-full">
                                            {e.projectField(idx, 'name')}
                                        </h4>
                                        {project.link && <ArrowRight className="w-6 h-6 shrink-0 ml-2" strokeWidth={3} />}
                                    </div>
                                    <p className="font-medium text-black mb-6 leading-snug flex-grow">
                                        {e.projectField(idx, 'description')}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.technologies.slice(0, 4).map(tech => (
                                            <span key={tech} className={cn(brutalBadge, "bg-emerald-300")}>
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
                    <section className="mb-10">
                        <div className={cn(brutalStyle, "bg-orange-100")}>
                            <h3 className="font-black text-2xl uppercase border-b-4 border-black pb-2 mb-6">Education</h3>
                            <div className="space-y-6">
                                {education.map((edu, idx) => (
e.arrayHelpers.removeEducation(idx)} editable={editable}>
<div key={edu.id} className="border-l-4 border-black pl-4">
                                        <h4 className="text-xl font-black uppercase text-black">{e.eduField(idx, 'school')}</h4>
                                        <div className="text-base font-bold text-amber-700 my-1">{e.eduField(idx, 'degree')} IN {e.eduField(idx, 'field')}</div>
                                        <div className="font-black text-black bg-white inline-block px-2 border-2 border-black mt-2">{formatDateRange(edu.startDate, edu.endDate)}</div>
                                    </div>
))}
                            </div>
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'skills':
                if (skills.length === 0) return null;
                return (
                    <CVSectionWrapper key="skills" section="skills" index={sectionIndex('skills')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addSkill}>
                    <section className="mb-10">
                        <div className={cn(brutalStyle, "bg-fuchsia-100")}>
                            <h3 className="font-black text-2xl uppercase border-b-4 border-black pb-2 mb-6">Skills</h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, idx) => {
                                    const colors = ["bg-yellow-300", "bg-green-300", "bg-blue-300", "bg-red-300", "bg-purple-300", "bg-pink-300"];
                                    const color = colors[idx % colors.length];
                                    return (
e.arrayHelpers.removeSkill(idx)} editable={editable}>

                                        <span  className={cn(brutalBadge, color, "text-sm")}>
                                            {e.skillField(skill.id, 'name')}
                                        </span>
);
                                })}
                            </div>
                        </div>
                    </section>
                    </CVSectionWrapper>
                );

            case 'languages':
            case 'certifications':
            case 'awards':
                return null; // Grouped

            default:
                return null;
        }
    };

    const contentSections = visibleSections.filter(s => s !== 'personal' && !['languages', 'certifications', 'awards'].includes(s));
    const hasBottomSections = visibleSections.some(s => ['languages', 'certifications', 'awards'].includes(s));

    return (
        <div className="w-full bg-[#fdfaf6] min-h-[1123px] font-sans max-w-[210mm] mx-auto overflow-hidden text-black selection:bg-black selection:text-white p-8 md:p-12">
            
            {/* HER0 / HEADER */}
            <header className={cn(brutalStyle, "bg-rose-100 mb-12 flex flex-col md:flex-row gap-8 items-center")}>
                
                {/* Avatar */}
                <div className="shrink-0 relative">
                    <div className="w-40 h-40 rounded-full border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-cyan-300">
                        {personalInfo.avatarUrl ? (
                            <img
                                src={personalInfo.avatarUrl}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center font-black text-2xl uppercase">Hey</div>
                        )}
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-black mb-2" style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}>
                        {e.personalField('fullName')}
                    </h1>
                    <div className="inline-block bg-yellow-300 border-4 border-black px-4 py-2 font-black text-xl md:text-2xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 mt-2 mb-6">
                        {e.personalField('title')}
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm font-bold uppercase">
                        {personalInfo.email && <div className={cn(brutalBadge, "bg-white")}>{e.personalField('email')}</div>}
                        {personalInfo.phone && <div className={cn(brutalBadge, "bg-white")}>{e.personalField('phone')}</div>}
                        {personalInfo.location && <div className={cn(brutalBadge, "bg-white")}>{e.personalField('location')}</div>}
                        {personalInfo.socials?.[0] && <div className={cn(brutalBadge, "bg-blue-300")}><a href={`https://${personalInfo.socials[0].url}`}>{personalInfo.socials[0].network}</a></div>}
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <div className="space-y-2">
                {contentSections.map(s => renderSection(s))}
            </div>

            {/* BOTTOM METADATA GRID */}
            {hasBottomSections && (
                <div className="grid grid-cols-3 gap-6 mt-10">
                    {visibleSections.includes('languages') && languages && languages.length > 0 && (
                        <CVSectionWrapper key="languages" section="languages" index={sectionIndex('languages')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addLanguage}>
                        <div className={cn(brutalStyle, "bg-cyan-100 p-4")}>
                            <h3 className="text-xl font-black uppercase border-b-4 border-black pb-2 mb-4">Langs</h3>
                            <div className="space-y-3">
                                {languages.map(lang => (
e.arrayHelpers.removeLanguageById(lang.id)} editable={editable}>

                                    <div  className="text-sm font-bold bg-white border-2 border-black flex justify-between p-2">
                                        <span className="uppercase">{e.langField(lang.id, 'name')}</span> 
                                        <span className="text-gray-500 uppercase">{e.langField(lang.id, 'level')}</span>
                                    </div>
))}
                            </div>
                        </div>
                        </CVSectionWrapper>
                    )}
                    {visibleSections.includes('certifications') && certifications && certifications.length > 0 && (
                        <CVSectionWrapper key="certifications" section="certifications" index={sectionIndex('certifications')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addCertification}>
                        <div className={cn(brutalStyle, "bg-lime-200 p-4")}>
                            <h3 className="text-xl font-black uppercase border-b-4 border-black pb-2 mb-4">Certs</h3>
                            <div className="space-y-3">
                                {certifications.map((cert, idx) => (
e.arrayHelpers.removeCertification(idx)} editable={editable}>
<div key={cert.id} className="bg-white border-2 border-black p-2">
                                        <div className="text-sm font-black uppercase truncate">{e.certField(idx, 'name')}</div>
                                        <div className="text-xs font-bold text-gray-500 uppercase">{e.certField(idx, 'issuer')}</div>
                                    </div>
))}
                            </div>
                        </div>
                        </CVSectionWrapper>
                    )}
                    {visibleSections.includes('awards') && awards && awards.length > 0 && (
                        <CVSectionWrapper key="awards" section="awards" index={sectionIndex('awards')} total={totalVisible} showToolbar={showSectionToolbar} onAction={onSectionAction} onAddItem={e.arrayHelpers.addAward}>
                        <div className={cn(brutalStyle, "bg-violet-200 p-4")}>
                            <h3 className="text-xl font-black uppercase border-b-4 border-black pb-2 mb-4">Awards</h3>
                            <div className="space-y-3">
                                {awards.map((award, idx) => (
e.arrayHelpers.removeAward(idx)} editable={editable}>
<div key={award.id} className="bg-white border-2 border-black p-2">
                                        <div className="text-sm font-black uppercase truncate">{e.awardField(idx, 'title')}</div>
                                        <div className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">★ {e.awardField(idx, 'issuer')}</div>
                                    </div>
))}
                            </div>
                        </div>
                        </CVSectionWrapper>
                    )}
                </div>
            )}
        </div>
    );
}
