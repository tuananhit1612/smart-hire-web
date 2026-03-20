import React from 'react';
import { CVData } from '../../types/types';
import { Mail, Phone, MapPin, Globe, Calendar, User, Award, BookOpen, Languages, ShieldCheck } from 'lucide-react';
import { formatDateRange } from '../../utils/format-date';
import type { TemplateProps } from './template-props';
import { useEditableCV } from '../../hooks/useEditableCV';
import { useSectionLayout, CVSection } from '../../hooks/useSectionLayout';
import { CVSectionWrapper } from '../CVSectionWrapper';

export function ProfessionalSalesTemplate({ data, editable, onDataChange, sectionOrder, hiddenSections, showSectionToolbar, onSectionAction, onRestoreSection }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects, languages, certifications, awards } = data;
    const e = useEditableCV({ data, editable, onDataChange });
    const { isVisible, sectionIndex, totalVisible } = useSectionLayout(sectionOrder, hiddenSections);

    // Define sidebar (left) sections and main content (right) sections
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

    // Column-relative helpers for column-aware reordering
    const sidebarItems = sortedSidebar.map(s => s.key);
    const mainItems = sortedMain.map(s => s.key);

    // Sidebar section renderer
    const renderSidebarSection = (key: CVSection, colIndex: number) => {
        const colTotal = sidebarItems.length;
        switch (key) {
            case 'education':
                return (
                    <CVSectionWrapper key="education" section="education" index={colIndex} total={colTotal} columnSections={sidebarItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-lg font-bold text-[#8e5252] uppercase border-b border-[#ddb8a9] pb-2 mb-4">
                            Học vấn
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline font-bold text-slate-800">
                                        <span>{edu.school}</span>
                                        <span className="text-xs text-slate-600">{formatDateRange(edu.startDate, edu.endDate)}</span>
                                    </div>
                                    <div className="text-sm text-slate-700 mt-1">{edu.degree}</div>
                                    <div className="text-sm text-slate-600 italic">{edu.field}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );
            case 'skills':
                return (
                    <CVSectionWrapper key="skills" section="skills" index={colIndex} total={colTotal} columnSections={sidebarItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-lg font-bold text-[#8e5252] uppercase border-b border-[#ddb8a9] pb-2 mb-4">
                            Kỹ năng
                        </h3>
                        <div className="space-y-4 text-sm">
                            {skills.map((skill) => (
                                <div key={skill.id}>
                                    <div className="font-bold text-slate-800 mb-1">{e.skillField(skill.id, 'name')}</div>
                                    <div className="w-full bg-[#fcece6] border border-[#eddcd2] rounded-full h-2">
                                        <div
                                            className="h-full bg-[#8e5252] rounded-full"
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
                    <CVSectionWrapper key="languages" section="languages" index={colIndex} total={colTotal} columnSections={sidebarItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-lg font-bold text-[#8e5252] uppercase border-b border-[#ddb8a9] pb-2 mb-4 flex items-center gap-2">
                            <Languages className="w-5 h-5" />
                            Ngôn ngữ
                        </h3>
                        <div className="space-y-2 text-sm text-slate-700">
                            {languages.map((lang) => (
                                <div key={lang.id} className="flex justify-between">
                                    <span className="font-medium">{e.langField(lang.id, 'name')}</span>
                                    <span className="text-slate-500 text-xs">{e.langField(lang.id, 'level')}</span>
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

    // Main content section renderer
    const renderMainSection = (key: CVSection, colIndex: number) => {
        const colTotal = mainItems.length;
        switch (key) {
            case 'summary':
                return (
                    <CVSectionWrapper key="summary" section="summary" index={colIndex} total={colTotal} columnSections={mainItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-xl font-bold text-[#8e5252] uppercase mb-3 flex items-center gap-2">
                            Mục tiêu nghề nghiệp
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-justify">
                            {summary}
                        </p>
                    </section>
                    </CVSectionWrapper>
                );
            case 'experience':
                return (
                    <CVSectionWrapper key="experience" section="experience" index={colIndex} total={colTotal} columnSections={mainItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-xl font-bold text-[#8e5252] uppercase mb-4 flex items-center gap-2">
                            Kinh nghiệm làm việc
                        </h3>
                        <div className="space-y-6">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-end mb-1">
                                        <h4 className="font-bold text-slate-900 text-lg uppercase">{exp.position}</h4>
                                        <span className="text-slate-500 font-medium italic">
                                            {formatDateRange(exp.startDate, exp.isCurrent ? undefined : exp.endDate, exp.isCurrent)}
                                        </span>
                                    </div>
                                    <div className="text-[#8e5252] font-bold mb-2">{exp.company}</div>
                                    <p className="text-slate-600 whitespace-pre-line leading-relaxed text-sm">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );
            case 'certifications':
                return certifications && certifications.length > 0 ? (
                    <CVSectionWrapper key="certifications" section="certifications" index={colIndex} total={colTotal} columnSections={mainItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-xl font-bold text-[#8e5252] uppercase mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5" />
                            Chứng chỉ
                        </h3>
                        <div className="space-y-4">
                            {certifications.map((cert) => (
                                <div key={cert.id} className="border-l-4 border-[#fcede8] pl-4">
                                    <div className="font-bold text-slate-800">{e.certFieldById(cert.id, 'name')}</div>
                                    <div className="text-sm text-slate-600">{e.certFieldById(cert.id, 'issuer')} · {e.certFieldById(cert.id, 'date')}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                ) : null;
            case 'awards':
                return awards && awards.length > 0 ? (
                    <CVSectionWrapper key="awards" section="awards" index={colIndex} total={colTotal} columnSections={mainItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-xl font-bold text-[#8e5252] uppercase mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            Danh hiệu & Giải thưởng
                        </h3>
                        <div className="space-y-4">
                            {awards.map((award) => (
                                <div key={award.id} className="border-l-4 border-[#fcede8] pl-4">
                                    <div className="font-bold text-slate-800">{award.title}</div>
                                    <div className="text-sm text-slate-600">{award.issuer} · {award.date}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                ) : null;
            case 'projects':
                return (
                    <CVSectionWrapper key="projects" section="projects" index={colIndex} total={colTotal} columnSections={mainItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-xl font-bold text-[#8e5252] uppercase mb-4 flex items-center gap-2">
                            Danh hiệu & Giải thưởng
                        </h3>
                        <div className="space-y-4">
                            {projects.map((proj) => (
                                <div key={proj.id} className="border-l-4 border-[#fcede8] pl-4">
                                    <div className="flex justify-between font-bold text-slate-800">
                                        <span>{proj.name}</span>
                                    </div>
                                    <div className="text-sm text-slate-600">{proj.description}</div>
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
        <div className="w-full bg-white min-h-[1000px] grid grid-cols-12 text-slate-800 font-sans">
            {/* Left Sidebar - Pink Theme */}
            <div className="col-span-4 bg-[#fcede8] p-6 space-y-8 flex flex-col h-full border-r border-[#eddcd2]">
                {/* Header / Avatar */}
                <div className="text-center">
                    {personalInfo.avatarUrl && (
                        <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#8e5252] overflow-hidden mb-4 shadow-xl">
                            <img
                                src={personalInfo.avatarUrl}
                                alt={personalInfo.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Personal Contact (always shown, not reorderable) */}
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
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#8e5252]" />
                                <span className="truncate">{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#8e5252]" />
                                <span>{personalInfo.location}</span>
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

                {/* Dynamic sidebar sections */}
                {sortedSidebar.map((s, i) => renderSidebarSection(s.key, i))}
            </div>

            {/* Main Content */}
            <div className="col-span-8 p-8 space-y-8 bg-white">
                {/* Top Name Section */}
                <div className="border-b-2 border-[#fcede8] pb-6">
                    <h1 className="text-4xl font-bold text-[#5c3a3a] uppercase tracking-wide mb-2">
                        {personalInfo.fullName}
                    </h1>
                    <h2 className="text-xl text-[#8e5252] font-semibold uppercase tracking-widest">
                        {personalInfo.title}
                    </h2>
                </div>

                {/* Dynamic main sections */}
                {sortedMain.map((s, i) => renderMainSection(s.key, i))}
            </div>
        </div>
    );
}
