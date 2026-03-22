import React from 'react';
import { CVData } from '../../types/types';
import { Mail, Phone, MapPin, Globe, Calendar, User, Award, BookOpen, Languages, ShieldCheck, Briefcase, GraduationCap, Star } from 'lucide-react';
import { formatDateRange } from '../../utils/format-date';
import type { TemplateProps } from './template-props';
import { useEditableCV } from '../../hooks/useEditableCV';
import { useSectionLayout, CVSection } from '../../hooks/useSectionLayout';
import { CVSectionWrapper } from '../CVSectionWrapper';

export function ExecutiveHRTemplate({ data, editable, onDataChange, sectionOrder, hiddenSections, showSectionToolbar, onSectionAction, onRestoreSection }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects, languages, certifications, awards } = data;
    const e = useEditableCV({ data, editable, onDataChange });
    const { isVisible, sectionIndex, totalVisible } = useSectionLayout(sectionOrder, hiddenSections);

    // Define main content (left) sections and sidebar (right) sections
    const mainSections: { key: CVSection; visible: boolean }[] = [
        { key: 'summary', visible: isVisible('summary') && !!summary },
        { key: 'experience', visible: isVisible('experience') && experience.length > 0 },
        { key: 'education', visible: isVisible('education') && education.length > 0 },
        { key: 'certifications', visible: isVisible('certifications') && !!certifications && certifications.length > 0 },
        { key: 'projects', visible: isVisible('projects') && projects.length > 0 },
    ];

    const sidebarSections: { key: CVSection; visible: boolean }[] = [
        { key: 'skills', visible: isVisible('skills') && skills.length > 0 },
        { key: 'languages', visible: isVisible('languages') && !!languages && languages.length > 0 },
        { key: 'awards', visible: isVisible('awards') && !!awards && awards.length > 0 },
    ];

    // Sort by sectionIndex
    const sortedMain = mainSections.filter(s => s.visible).sort((a, b) => sectionIndex(a.key) - sectionIndex(b.key));
    const sortedSidebar = sidebarSections.filter(s => s.visible).sort((a, b) => sectionIndex(a.key) - sectionIndex(b.key));

    // Section renderers for main content
    const renderMainSection = (key: CVSection, columnItems: CVSection[]) => {
        const colIndex = columnItems.indexOf(key);
        const colTotal = columnItems.length;
        switch (key) {
            case 'summary':
                return (
                    <CVSectionWrapper key="summary" section="summary" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-xl font-bold text-[#1a365d] uppercase border-b-2 border-[#1a365d] pb-2 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Mục tiêu nghề nghiệp
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-justify">
                            {e.summaryField()}
                        </p>
                    </section>
                    </CVSectionWrapper>
                );
            case 'experience':
                return (
                    <CVSectionWrapper key="experience" section="experience" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-xl font-bold text-[#1a365d] uppercase border-b-2 border-[#1a365d] pb-2 mb-6 mt-6 flex items-center gap-2">
                            <Briefcase className="w-5 h-5" />
                            Kinh nghiệm làm việc
                        </h3>
                        <div className="space-y-8">
                            {experience.map((exp, expIdx) => (
                                <div key={exp.id} className="border-l-4 border-[#1a365d] pl-5 hover:border-blue-400 transition-colors">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                        <h4 className="font-bold text-gray-800 text-xl uppercase">{e.expField(expIdx, 'position')}</h4>
                                        <span className="text-slate-400 italic text-sm">
                                            {formatDateRange(exp.startDate, exp.isCurrent ? undefined : exp.endDate, exp.isCurrent)}
                                        </span>
                                    </div>
                                    <div className="text-[#1a365d] font-bold mb-2">{e.expField(expIdx, 'company')}</div>
                                    <div className="text-slate-600 whitespace-pre-line leading-relaxed text-sm text-justify">
                                        {e.expField(expIdx, 'description', undefined, { multiline: true })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );
            case 'education':
                return (
                    <CVSectionWrapper key="education" section="education" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-xl font-bold text-[#1a365d] uppercase border-b-2 border-[#1a365d] pb-2 mb-6 mt-6 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            Học vấn
                        </h3>
                        <div className="space-y-6">
                            {education.map((edu, eduIdx) => (
                                <div key={edu.id} className="flex justify-between items-start border-l-4 border-[#1a365d] pl-5">
                                    <div>
                                        <div className="font-bold text-gray-800 text-lg">{e.eduField(eduIdx, 'school')}</div>
                                        <div className="text-[#1a365d] font-semibold">{e.eduField(eduIdx, 'degree')}</div>
                                        <div className="text-gray-500 italic text-sm">{e.eduField(eduIdx, 'field')}</div>
                                    </div>
                                    <div className="text-sm text-slate-500 whitespace-nowrap">{formatDateRange(edu.startDate, edu.endDate)}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );
            case 'certifications':
                return certifications && certifications.length > 0 ? (
                    <CVSectionWrapper key="certifications" section="certifications" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-xl font-bold text-[#1a365d] uppercase border-b-2 border-[#1a365d] pb-2 mb-6 mt-6 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5" />
                            Chứng chỉ
                        </h3>
                        <div className="space-y-4">
                            {certifications.map((cert) => (
                                <div key={cert.id} className="border-l-4 border-[#1a365d] pl-5">
                                    <div className="font-bold text-gray-800">{e.certFieldById(cert.id, 'name')}</div>
                                    <div className="text-sm text-slate-500">{e.certFieldById(cert.id, 'issuer')} · {e.certFieldById(cert.id, 'date')}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                ) : null;
            case 'projects':
                return (
                    <CVSectionWrapper key="projects" section="projects" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-xl font-bold text-[#1a365d] uppercase border-b-2 border-[#1a365d] pb-2 mb-6 flex items-center gap-2">
                            Dự án
                        </h3>
                        <div className="space-y-4">
                            {projects.map((proj, projIdx) => (
                                <div key={proj.id} className="border-l-4 border-[#1a365d] pl-5">
                                    <div className="font-bold text-gray-800">{e.projectField(projIdx, 'name')}</div>
                                    <div className="text-sm text-slate-600">{e.projectField(projIdx, 'description')}</div>
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

    // Section renderers for sidebar
    const renderSidebarSection = (key: CVSection, columnItems: CVSection[]) => {
        const colIndex = columnItems.indexOf(key);
        const colTotal = columnItems.length;
        switch (key) {
            case 'skills':
                return (
                    <CVSectionWrapper key="skills" section="skills" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-lg font-bold text-[#1a365d] uppercase border-b border-[#c2d4e8] pb-2 mb-4 flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Kỹ năng
                        </h3>
                        <div className="space-y-3 text-sm">
                            {skills.map((skill) => (
                                <div key={skill.id}>
                                    <div className="font-semibold text-gray-800 mb-1">{e.skillField(skill.id, 'name')}</div>
                                    <div className="w-full bg-[#dfe8f0] rounded-full h-2">
                                        <div
                                            className="h-full bg-[#1a365d] rounded-full"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );
            case 'languages':
                return languages && languages.length > 0 ? (
                    <CVSectionWrapper key="languages" section="languages" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-lg font-bold text-[#1a365d] uppercase border-b border-[#c2d4e8] pb-2 mb-4 flex items-center gap-2">
                            <Languages className="w-4 h-4" />
                            Ngôn ngữ
                        </h3>
                        <div className="space-y-2 text-sm">
                            {languages.map((lang) => (
                                <div key={lang.id} className="flex justify-between">
                                    <span className="font-medium text-gray-700">{e.langField(lang.id, 'name')}</span>
                                    <span className="text-gray-500 text-xs">{e.langField(lang.id, 'level')}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                ) : null;
            case 'awards':
                return awards && awards.length > 0 ? (
                    <CVSectionWrapper key="awards" section="awards" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-lg font-bold text-[#1a365d] uppercase border-b border-[#c2d4e8] pb-2 mb-4 flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            Danh hiệu & Giải thưởng
                        </h3>
                        <div className="space-y-3 text-sm">
                            {awards.map((award, awardIdx) => (
                                <div key={award.id}>
                                    <div className="font-bold text-gray-800">{e.awardField(awardIdx, 'title')}</div>
                                    <div className="text-gray-500 text-xs">{e.awardField(awardIdx, 'issuer')} · {e.awardField(awardIdx, 'date')}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                ) : null;
            default:
                return null;
        }
    };

    return (
        <div className="w-full bg-white min-h-[1000px] grid grid-cols-12 text-slate-800 font-sans">
            {/* Header - Full Width */}
            <div className="col-span-12 bg-[#1a365d] text-white p-8 flex items-center gap-8">
                {personalInfo.avatarUrl && (
                    <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg flex-shrink-0">
                        <img
                            src={personalInfo.avatarUrl}
                            alt={personalInfo.fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div>
                    <h1 className="text-3xl font-bold uppercase mb-2">{e.personalField('fullName')}</h1>
                    <p className="text-blue-200 uppercase tracking-widest text-sm font-medium">{e.personalField('title')}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-100 mt-4">
                        {personalInfo.phone && (
                            <div className="flex items-center gap-1.5">
                                <Phone className="w-4 h-4" />
                                <span>{e.personalField('phone')}</span>
                            </div>
                        )}
                        {personalInfo.email && (
                            <div className="flex items-center gap-1.5">
                                <Mail className="w-4 h-4" />
                                <span>{e.personalField('email')}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                <span>{e.personalField('location')}</span>
                            </div>
                        )}
                        {personalInfo.socials?.map(social => (
                            <div key={social.id} className="flex items-center gap-1.5">
                                <Globe className="w-4 h-4" />
                                <a href={`https://${social.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {social.url}
                                </a>
                            </div>
                        ))}
                        {personalInfo.additionalInfo?.map((info, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>{info.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content - Left */}
            <div className="col-span-8 p-8 space-y-0">
                {sortedMain.map(s => renderMainSection(s.key, sortedMain.map(x => x.key)))}
            </div>

            {/* Sidebar - Right */}
            <div className="col-span-4 bg-[#f0f4f8] p-6 space-y-8">
                {sortedSidebar.map(s => renderSidebarSection(s.key, sortedSidebar.map(x => x.key)))}
            </div>
        </div>
    );
}
