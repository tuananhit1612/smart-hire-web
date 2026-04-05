"use client";

import React from 'react';
import { CVData } from '../../types/types';
import { Mail, Phone, MapPin, Globe, Calendar, User, Award, BookOpen, Languages, ShieldCheck } from 'lucide-react';
import { formatDateRange } from '../../utils/format-date';
import type { TemplateProps } from './template-props';
import { useEditableCV } from '../../hooks/useEditableCV';
import { useSectionLayout, CVSection } from '../../hooks/useSectionLayout';
import { CVSectionWrapper } from '../CVSectionWrapper';
import { CVItemWrapper } from '../inline-edit/CVItemWrapper';

export function ProfessionalSalesTemplate({ data, editable, onDataChange, sectionOrder, hiddenSections, showSectionToolbar, onSectionAction }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects, languages, certifications, awards } = data;
    const e = useEditableCV({ data, editable, onDataChange });
    const { isVisible, sectionIndex, totalVisible } = useSectionLayout(sectionOrder, hiddenSections);

    const sidebarSections: { key: CVSection; visible: boolean }[] = [
        { key: 'education', visible: isVisible('education') && education.length > 0 },
        { key: 'skills', visible: isVisible('skills') && skills.length > 0 },
        { key: 'languages', visible: isVisible('languages') && !!languages && languages.length > 0 },
    ];

    const mainSections: { key: CVSection; visible: boolean }[] = [
        { key: 'summary', visible: isVisible('summary') && !!summary },
        { key: 'experience', visible: isVisible('experience') && experience.length > 0 },
        { key: 'certifications', visible: isVisible('certifications') && !!certifications && certifications.length > 0 },
        { key: 'awards', visible: isVisible('awards') && !!awards && awards.length > 0 },
        { key: 'projects', visible: isVisible('projects') && (!awards || awards.length === 0) && projects.length > 0 },
    ];

    const sortedSidebar = sidebarSections.filter(s => s.visible).sort((a, b) => sectionIndex(a.key) - sectionIndex(b.key));
    const sortedMain = mainSections.filter(s => s.visible).sort((a, b) => sectionIndex(a.key) - sectionIndex(b.key));

    const sidebarItems = sortedSidebar.map(s => s.key);
    const mainItems = sortedMain.map(s => s.key);

    const renderSidebarSection = (key: CVSection, colIndex: number) => {
        const colTotal = sidebarItems.length;
        switch (key) {
            case 'education':
                return (
                    <CVSectionWrapper key="education" section="education" index={colIndex} total={colTotal} columnSections={sidebarItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addEducation}>
                    <section>
                        <h3 className="text-lg font-bold text-[#8e5252] uppercase border-b border-[#ddb8a9] pb-2 mb-4">
                            Học vấn
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu, eduIdx) => (
                                <CVItemWrapper key={edu.id} onRemove={() => e.arrayHelpers.removeEducation(eduIdx)} editable={editable}>
                                <div>
                                    <div className="flex justify-between items-baseline font-bold text-slate-800">
                                        <span>{e.eduField(eduIdx, 'school')}</span>
                                        <span className="text-xs text-slate-600">{formatDateRange(edu.startDate, edu.endDate)}</span>
                                    </div>
                                    <div className="text-sm text-slate-700 mt-1">{e.eduField(eduIdx, 'degree')}</div>
                                    <div className="text-sm text-slate-600 italic">{e.eduField(eduIdx, 'field')}</div>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );
            case 'skills':
                return (
                    <CVSectionWrapper key="skills" section="skills" index={colIndex} total={colTotal} columnSections={sidebarItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addSkill}>
                    <section>
                        <h3 className="text-lg font-bold text-[#8e5252] uppercase border-b border-[#ddb8a9] pb-2 mb-4">
                            Kỹ năng
                        </h3>
                        <div className="space-y-4 text-sm">
                            {skills.map((skill) => (
                                <CVItemWrapper key={skill.id} onRemove={() => e.arrayHelpers.removeSkillById(skill.id)} editable={editable}>
                                <div>
                                    <div className="font-bold text-slate-800 mb-1">{e.skillField(skill.id, 'name')}</div>
                                    <div className="w-full bg-[#fcece6] border border-[#eddcd2] rounded-full h-2">
                                        <div
                                            className="h-full bg-[#8e5252] rounded-full"
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
                    <CVSectionWrapper key="languages" section="languages" index={colIndex} total={colTotal} columnSections={sidebarItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addLanguage}>
                    <section>
                        <h3 className="text-lg font-bold text-[#8e5252] uppercase border-b border-[#ddb8a9] pb-2 mb-4 flex items-center gap-2">
                            <Languages className="w-5 h-5" />
                            Ngôn ngữ
                        </h3>
                        <div className="space-y-2 text-sm text-slate-700">
                            {languages.map((lang) => (
                                <CVItemWrapper key={lang.id} onRemove={() => e.arrayHelpers.removeLanguageById(lang.id)} editable={editable}>
                                <div className="flex justify-between">
                                    <span className="font-medium">{e.langField(lang.id, 'name')}</span>
                                    <span className="text-slate-500 text-xs">{e.langField(lang.id, 'level')}</span>
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

    const renderMainSection = (key: CVSection, colIndex: number) => {
        const colTotal = mainItems.length;
        switch (key) {
            case 'summary':
                return (
                    <CVSectionWrapper key="summary" section="summary" index={colIndex} total={colTotal} columnSections={mainItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections}>
                    <section>
                        <h3 className="text-xl font-bold text-[#8e5252] uppercase mb-3 flex items-center gap-2">
                            Mục tiêu nghề nghiệp
                        </h3>
                        <div className="text-slate-600 leading-relaxed text-justify">
                            {e.summaryField()}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );
            case 'experience':
                return (
                    <CVSectionWrapper key="experience" section="experience" index={colIndex} total={colTotal} columnSections={mainItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addExperience}>
                    <section>
                        <h3 className="text-xl font-bold text-[#8e5252] uppercase mb-4 flex items-center gap-2">
                            Kinh nghiệm làm việc
                        </h3>
                        <div className="space-y-6">
                            {experience.map((exp, expIdx) => (
                                <CVItemWrapper key={exp.id} onRemove={() => e.arrayHelpers.removeExperience(expIdx)} editable={editable}>
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <h4 className="font-bold text-slate-900 text-lg uppercase">{e.expField(expIdx, 'position')}</h4>
                                        <span className="text-slate-500 font-medium italic">
                                            {formatDateRange(exp.startDate, exp.isCurrent ? undefined : exp.endDate, exp.isCurrent)}
                                        </span>
                                    </div>
                                    <div className="text-[#8e5252] font-bold mb-2">{e.expField(expIdx, 'company')}</div>
                                    <div className="text-slate-600 whitespace-pre-line leading-relaxed text-sm">
                                        {e.expField(expIdx, 'description')}
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
                    <CVSectionWrapper key="certifications" section="certifications" index={colIndex} total={colTotal} columnSections={mainItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addCertification}>
                    <section>
                        <h3 className="text-xl font-bold text-[#8e5252] uppercase mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5" />
                            Chứng chỉ
                        </h3>
                        <div className="space-y-4">
                            {certifications.map((cert, certIdx) => (
                                <CVItemWrapper key={cert.id} onRemove={() => e.arrayHelpers.removeCertification(certIdx)} editable={editable}>
                                <div className="border-l-4 border-[#fcede8] pl-4">
                                    <div className="font-bold text-slate-800">{e.certFieldById(cert.id, 'name')}</div>
                                    <div className="text-sm text-slate-600">{e.certFieldById(cert.id, 'issuer')} · {e.certFieldById(cert.id, 'date')}</div>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                ) : null;
            case 'awards':
                return awards && awards.length > 0 ? (
                    <CVSectionWrapper key="awards" section="awards" index={colIndex} total={colTotal} columnSections={mainItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addAward}>
                    <section>
                        <h3 className="text-xl font-bold text-[#8e5252] uppercase mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            Danh hiệu & Giải thưởng
                        </h3>
                        <div className="space-y-4">
                            {awards.map((award, awardIdx) => (
                                <CVItemWrapper key={award.id} onRemove={() => e.arrayHelpers.removeAward(awardIdx)} editable={editable}>
                                <div className="border-l-4 border-[#fcede8] pl-4">
                                    <div className="font-bold text-slate-800">{e.awardField(awardIdx, 'title')}</div>
                                    <div className="text-sm text-slate-600">{e.awardField(awardIdx, 'issuer')} · {e.awardField(awardIdx, 'date')}</div>
                                </div>
                                </CVItemWrapper>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                ) : null;
            case 'projects':
                return (
                    <CVSectionWrapper key="projects" section="projects" index={colIndex} total={colTotal} columnSections={mainItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onAddItem={e.arrayHelpers.addProject}>
                    <section>
                        <h3 className="text-xl font-bold text-[#8e5252] uppercase mb-4 flex items-center gap-2">
                            Danh hiệu & Giải thưởng
                        </h3>
                        <div className="space-y-4">
                            {projects.map((proj, projIdx) => (
                                <CVItemWrapper key={proj.id} onRemove={() => e.arrayHelpers.removeProject(projIdx)} editable={editable}>
                                <div className="border-l-4 border-[#fcede8] pl-4">
                                    <div className="flex justify-between font-bold text-slate-800">
                                        <span>{e.projectField(projIdx, 'name')}</span>
                                    </div>
                                    <div className="text-sm text-slate-600">{e.projectField(projIdx, 'description')}</div>
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
        <div className="w-full bg-white min-h-[1000px] grid grid-cols-12 text-slate-800 font-sans">
            <div className="col-span-4 bg-[#fcede8] p-6 space-y-8 flex flex-col h-full border-r border-[#eddcd2]">
                <div className="text-center">
                    {(personalInfo.avatarUrl || e.isEditable) && (
                        <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#8e5252] overflow-hidden mb-4 shadow-xl">
                            {e.avatarField("rounded-full", { size: "w-32 h-32" })}
                        </div>
                    )}
                </div>
                <section>
                    <h3 className="text-lg font-bold text-[#8e5252] uppercase border-b border-[#ddb8a9] pb-2 mb-4">
                        Thông tin cá nhân
                    </h3>
                    <div className="space-y-3 text-sm text-slate-700">
                        {personalInfo.additionalInfo?.map((info, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#8e5252]" />
                                <span className="font-medium">{info.value}</span>
                            </div>
                        ))}
                        {personalInfo.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-[#8e5252]" />
                                <span>{e.personalField('phone')}</span>
                            </div>
                        )}
                        {personalInfo.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#8e5252]" />
                                <span className="truncate">{e.personalField('email')}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#8e5252]" />
                                <span>{e.personalField('location')}</span>
                            </div>
                        )}
                        {personalInfo.socials?.map(social => (
                            <div key={social.id} className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-[#8e5252]" />
                                <a href={`https://${social.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline truncate text-slate-700">
                                    {social.url}
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
                {sortedSidebar.map((s, i) => renderSidebarSection(s.key, i))}
            </div>
            <div className="col-span-8 p-8 space-y-8 bg-white">
                <div className="border-b-2 border-[#fcede8] pb-6">
                    <h1 className="text-4xl font-bold text-[#5c3a3a] uppercase tracking-wide mb-2">
                        {e.personalField('fullName')}
                    </h1>
                    <h2 className="text-xl text-[#8e5252] font-semibold uppercase tracking-widest">
                        {e.personalField('title')}
                    </h2>
                </div>
                {sortedMain.map((s, i) => renderMainSection(s.key, i))}
            </div>
        </div>
    );
}
