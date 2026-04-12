"use client";

import React from 'react';
import { CVData } from '../../types/types';
import { Mail, Phone, MapPin, Linkedin, Calendar, Globe, Award, FileText, Languages, ShieldCheck } from 'lucide-react';
import { formatDateRange } from '../../utils/format-date';
import type { TemplateProps } from './template-props';
import { useEditableCV } from '../../hooks/useEditableCV';
import { useSectionLayout, CVSection } from '../../hooks/useSectionLayout';
import { CVSectionWrapper } from '../CVSectionWrapper';
import { CVItemWrapper } from '../inline-edit/CVItemWrapper';

export function CreativeBATemplate({ data, editable, onDataChange, sectionOrder, hiddenSections, showSectionToolbar, onSectionAction }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects, languages, certifications, awards } = data;
    const e = useEditableCV({ data, editable, onDataChange });
    const { isVisible, sectionIndex, totalVisible } = useSectionLayout(sectionOrder, hiddenSections);

    const mainSections: { key: CVSection; visible: boolean }[] = [
        { key: 'summary', visible: isVisible('summary') && !!summary },
        { key: 'education', visible: isVisible('education') && education.length > 0 },
        { key: 'experience', visible: isVisible('experience') && experience.length > 0 },
        { key: 'certifications', visible: isVisible('certifications') && !!certifications && certifications.length > 0 },
    ];

    const sidebarSections: { key: CVSection; visible: boolean }[] = [
        { key: 'skills', visible: isVisible('skills') && skills.length > 0 },
        { key: 'languages', visible: isVisible('languages') && !!languages && languages.length > 0 },
        { key: 'awards', visible: isVisible('awards') && !!awards && awards.length > 0 },
        { key: 'projects', visible: isVisible('projects') && (!awards || awards.length === 0) && projects.length > 0 },
    ];

    const sortedMain = mainSections.filter(s => s.visible).sort((a, b) => sectionIndex(a.key) - sectionIndex(b.key));
    const sortedSidebar = sidebarSections.filter(s => s.visible).sort((a, b) => sectionIndex(a.key) - sectionIndex(b.key));

    const renderMainSection = (key: CVSection, columnItems: CVSection[]) => {
        const colIndex = columnItems.indexOf(key);
        const colTotal = columnItems.length;
        switch (key) {
            case 'summary':
                return (
                    <CVSectionWrapper key="summary" section="summary" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections}>
                    <section className="bg-[#fff3cd] p-6 rounded-lg border-l-4 border-[#e9bc2e]">
                        <h3 className="text-xl font-bold text-[#d4a017] uppercase mb-3">
                            Mục tiêu nghề nghiệp
                        </h3>
                        <div className="text-slate-700 leading-relaxed text-justify text-sm">
                            {e.summaryField()}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );
            case 'education':
                return (
                    <CVSectionWrapper key="education" section="education" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addEducation}>
                    <section>
                        <h3 className="text-xl font-bold text-[#d4a017] uppercase border-b-2 border-[#e9bc2e] pb-2 mb-6 flex items-center gap-2">
                            <span>Học vấn</span>
                            <div className="flex-1 h-[1px] bg-[#e9bc2e]"></div>
                        </h3>
                        <div className="space-y-6">
                            {education.map((edu, eduIdx) => (
                                <CVItemWrapper key={edu.id} onRemove={() => e.arrayHelpers.removeEducation(eduIdx)} editable={editable}>
                                <div className="flex justify-between">
                                    <div className="space-y-1">
                                        <div className="font-bold text-slate-900 text-lg">{e.eduField(eduIdx, 'school')}</div>
                                        <div className="text-slate-600 font-medium">{e.eduField(eduIdx, 'degree')}</div>
                                        <div className="text-slate-500 italic text-sm">{e.eduField(eduIdx, 'field')}</div>
                                    </div>
                                    <div className="text-slate-900 font-bold whitespace-nowrap">
                                        {formatDateRange(edu.startDate, edu.endDate)}
                                    </div>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );
            case 'experience':
                return (
                    <CVSectionWrapper key="experience" section="experience" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addExperience}>
                    <section>
                        <h3 className="text-xl font-bold text-[#d4a017] uppercase border-b-2 border-[#e9bc2e] pb-2 mb-8 flex items-center gap-2">
                            <span>Kinh nghiệm làm việc</span>
                            <div className="flex-1 h-[1px] bg-[#e9bc2e]"></div>
                        </h3>
                        <div className="space-y-0 relative border-l-2 border-[#e9bc2e00] pl-0 ml-2">
                            <div className="absolute left-[7px] top-2 bottom-0 w-[2px] bg-[#e9bc2e]/30"></div>
                            {experience.map((exp, expIdx) => (
                                <CVItemWrapper key={exp.id} onRemove={() => e.arrayHelpers.removeExperience(expIdx)} editable={editable}>
                                <div className="relative pl-10 pb-10 group last:pb-0">
                                    <div className="absolute left-[0px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#e9bc2e] z-10 group-hover:scale-125 transition-transform"></div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                        <h4 className="font-bold text-slate-900 text-lg uppercase group-hover:text-[#d4a017] transition-colors">{e.expField(expIdx, 'company')}</h4>
                                        <span className="text-slate-500 font-mono text-sm bg-[#fff3cd] px-2 py-1 rounded">
                                            {formatDateRange(exp.startDate, exp.isCurrent ? undefined : exp.endDate, exp.isCurrent)}
                                        </span>
                                    </div>
                                    <div className="text-[#d4a017] font-bold mb-3 uppercase tracking-wide text-sm">{e.expField(expIdx, 'position')}</div>
                                    <div className="text-slate-600 whitespace-pre-line leading-relaxed text-sm text-justify">
                                        {e.expField(expIdx, 'description', undefined, { multiline: true })}
                                    </div>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );
            case 'certifications':
                return certifications && certifications.length > 0 ? (
                    <CVSectionWrapper key="certifications" section="certifications" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addCertification}>
                    <section>
                        <h3 className="text-xl font-bold text-[#d4a017] uppercase border-b-2 border-[#e9bc2e] pb-2 mb-6 flex items-center gap-2">
                            <span>Chứng chỉ</span>
                            <div className="flex-1 h-[1px] bg-[#e9bc2e]"></div>
                        </h3>
                        <div className="space-y-4">
                            {certifications.map((cert, certIdx) => (
                                <CVItemWrapper key={cert.id} onRemove={() => e.arrayHelpers.removeCertification(certIdx)} editable={editable}>
                                <div className="flex justify-between items-baseline">
                                    <div>
                                        <div className="font-bold text-slate-900">{e.certFieldById(cert.id, 'name')}</div>
                                        <div className="text-slate-500 text-sm">{e.certFieldById(cert.id, 'issuer')}</div>
                                    </div>
                                    <div className="text-slate-500 text-sm whitespace-nowrap">{e.certFieldById(cert.id, 'date')}</div>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                ) : null;
            default:
                return null;
        }
    };

    const renderSidebarSection = (key: CVSection, columnItems: CVSection[]) => {
        const colIndex = columnItems.indexOf(key);
        const colTotal = columnItems.length;
        switch (key) {
            case 'skills':
                return (
                    <CVSectionWrapper key="skills" section="skills" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addSkill}>
                    <section>
                        <h3 className="text-white font-bold uppercase border-b border-gray-500 pb-2 mb-6">
                            Kỹ năng
                        </h3>
                        <div className="space-y-5">
                            {skills.map((skill) => (
                                <CVItemWrapper key={skill.id} onRemove={() => e.arrayHelpers.removeSkillById(skill.id)} editable={editable}>
                                <div>
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="text-gray-200">{e.skillField(skill.id, 'name')}</span>
                                    </div>
                                    <div className="w-full bg-gray-600 h-2.5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#e9bc2e]"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );
            case 'languages':
                return languages && languages.length > 0 ? (
                    <CVSectionWrapper key="languages" section="languages" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addLanguage}>
                    <section>
                        <h3 className="text-[#e9bc2e] font-bold uppercase border-b border-gray-500 pb-2 mb-6 flex items-center gap-2">
                            <Languages className="w-5 h-5" />
                            Ngôn ngữ
                        </h3>
                        <div className="space-y-3 text-sm">
                            {languages.map((lang) => (
                                <CVItemWrapper key={lang.id} onRemove={() => e.arrayHelpers.removeLanguageById(lang.id)} editable={editable}>
                                <div className="flex justify-between">
                                    <span className="text-gray-200">{e.langField(lang.id, 'name')}</span>
                                    <span className="text-gray-400 text-xs">{e.langField(lang.id, 'level')}</span>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                ) : null;
            case 'awards':
                return awards && awards.length > 0 ? (
                    <CVSectionWrapper key="awards" section="awards" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addAward}>
                    <section>
                        <h3 className="text-[#e9bc2e] font-bold uppercase border-b border-gray-500 pb-2 mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            Danh hiệu & Giải thưởng
                        </h3>
                        <div className="space-y-4 text-sm">
                            {awards.map((award, awardIdx) => (
                                <CVItemWrapper key={award.id} onRemove={() => e.arrayHelpers.removeAward(awardIdx)} editable={editable}>
                                <div>
                                    <div className="font-bold text-white mb-1">{e.awardField(awardIdx, 'title')}</div>
                                    <div className="text-gray-400 text-xs">{e.awardField(awardIdx, 'issuer')} · {e.awardField(awardIdx, 'date')}</div>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                ) : null;
            case 'projects':
                return (
                    <CVSectionWrapper key="projects" section="projects" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addProject}>
                    <section>
                        <h3 className="text-[#e9bc2e] font-bold uppercase border-b border-gray-500 pb-2 mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            Danh hiệu & Giải thưởng
                        </h3>
                        <div className="space-y-4 text-sm">
                            {projects.map((proj, projIdx) => (
                                <CVItemWrapper key={proj.id} onRemove={() => e.arrayHelpers.removeProject(projIdx)} editable={editable}>
                                <div>
                                    <div className="font-bold text-white mb-1">{proj.description.split('-')[0]}</div>
                                    <div className="text-gray-400 text-xs">{proj.name}</div>
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
        <div className="w-full bg-[#fffcf5] min-h-[1000px] grid grid-cols-12 text-slate-800 font-sans">
            <div className="col-span-8 p-10 space-y-10">
                {sortedMain.map(s => renderMainSection(s.key, sortedMain.map(x => x.key)))}
            </div>
            <div className="col-span-4 bg-[#333333] text-white p-8 space-y-10 border-l border-gray-600">
                <div className="text-center pt-8">
                    <h1 className="text-2xl font-bold uppercase mb-2 text-[#e9bc2e]">
                        {e.personalField('fullName')}
                    </h1>
                    <div className="text-white uppercase tracking-widest text-sm font-medium mb-8">
                        {e.personalField('title')}
                    </div>
                    {(personalInfo.avatarUrl || e.isEditable) && (
                        <div className="w-40 h-40 mx-auto rounded-full border-4 border-[#e9bc2e] overflow-hidden mb-8 bg-white">
                            {e.avatarField("rounded-full", { size: "w-40 h-40" })}
                        </div>
                    )}
                </div>
                <div className="space-y-4 text-sm text-gray-300">
                    {personalInfo.phone && (
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-[#e9bc2e]" />
                            <span>{e.personalField('phone')}</span>
                        </div>
                    )}
                    {personalInfo.email && (
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-[#e9bc2e]" />
                            <span className="truncate">{e.personalField('email')}</span>
                        </div>
                    )}
                    {personalInfo.location && (
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-[#e9bc2e]" />
                            <span>{e.personalField('location')}</span>
                        </div>
                    )}
                    {personalInfo.socials?.map(social => (
                        <div key={social.id} className="flex items-center gap-3">
                            <Globe className="w-4 h-4 text-[#e9bc2e]" />
                            <a href={`https://${social.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline truncate text-gray-300 hover:text-[#e9bc2e] transition-colors">
                                {social.url}
                            </a>
                        </div>
                    ))}
                    {personalInfo.additionalInfo?.map((info, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-[#e9bc2e]" />
                            <span>{info.value}</span>
                        </div>
                    ))}
                </div>
                {sortedSidebar.map(s => renderSidebarSection(s.key, sortedSidebar.map(x => x.key)))}
            </div>
        </div>
    );
}
