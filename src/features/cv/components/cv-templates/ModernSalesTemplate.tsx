import React from 'react';
import { CVData } from '../../types/types';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Languages, ShieldCheck } from 'lucide-react';
import { formatDateRange } from '../../utils/format-date';
import type { TemplateProps } from './template-props';
import { useEditableCV } from '../../hooks/useEditableCV';
import { useSectionLayout, CVSection } from '../../hooks/useSectionLayout';
import { CVSectionWrapper } from '../CVSectionWrapper';

export function ModernSalesTemplate({ data, editable, onDataChange, sectionOrder, hiddenSections, showSectionToolbar, onSectionAction, onRestoreSection }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects, languages, certifications, awards } = data;
    const e = useEditableCV({ data, editable, onDataChange });
    const { isVisible, sectionIndex, totalVisible } = useSectionLayout(sectionOrder, hiddenSections);

    // Helper to convert skill level to number (0-100)
    const getSkillLevel = (level: number | string): number => {
        if (typeof level === 'number') return level;
        switch (level) {
            case 'beginner': return 20;
            case 'intermediate': return 50;
            case 'advanced': return 80;
            case 'expert': return 100;
            default: return 50;
        }
    };

    // Define sidebar (left) sections and main content (right) sections
    const sidebarSections: { key: CVSection; visible: boolean }[] = [
        { key: 'summary', visible: isVisible('summary') && !!summary },
        { key: 'skills', visible: isVisible('skills') && skills.length > 0 },
        { key: 'languages', visible: isVisible('languages') && !!languages && languages.length > 0 },
    ];

    const mainSections: { key: CVSection; visible: boolean }[] = [
        { key: 'projects', visible: isVisible('projects') && projects.length > 0 },
        { key: 'experience', visible: isVisible('experience') && experience.length > 0 },
        { key: 'education', visible: isVisible('education') && education.length > 0 },
        { key: 'certifications', visible: isVisible('certifications') && !!certifications && certifications.length > 0 },
        { key: 'awards', visible: isVisible('awards') && !!awards && awards.length > 0 },
    ];

    const sortedSidebar = sidebarSections.filter(s => s.visible).sort((a, b) => sectionIndex(a.key) - sectionIndex(b.key));
    const sortedMain = mainSections.filter(s => s.visible).sort((a, b) => sectionIndex(a.key) - sectionIndex(b.key));

    // Sidebar section renderer
    const renderSidebarSection = (key: CVSection, columnItems: CVSection[]) => {
        const colIndex = columnItems.indexOf(key);
        const colTotal = columnItems.length;
        switch (key) {
            case 'summary':
                return (
                    <CVSectionWrapper key="summary" section="summary" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-lg font-bold uppercase border-b border-emerald-400 pb-2 mb-4">
                            Mục tiêu nghề nghiệp
                        </h3>
                        <p className="text-sm text-emerald-50 leading-relaxed">
                            {e.summaryField()}
                        </p>
                    </section>
                    </CVSectionWrapper>
                );
            case 'skills':
                return (
                    <CVSectionWrapper key="skills" section="skills" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-lg font-bold uppercase border-b border-emerald-400 pb-2 mb-4">
                            Kỹ năng
                        </h3>
                        <div className="space-y-3">
                            {skills.map((skill) => (
                                <div key={skill.id}>
                                    <div className="flex justify-between text-sm font-semibold mb-1">
                                        <span>{e.skillField(skill.id, 'name')}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <div
                                                key={star}
                                                className={`h-2.5 w-6 rounded-sm ${star * 20 <= getSkillLevel(skill.level) ? 'bg-white' : 'bg-emerald-800/30'}`}
                                            />
                                        ))}
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
                        <h3 className="text-lg font-bold uppercase border-b border-emerald-400 pb-2 mb-4 flex items-center gap-2">
                            <Languages className="w-5 h-5" />
                            Ngôn ngữ
                        </h3>
                        <div className="space-y-2 text-sm">
                            {languages.map((lang) => (
                                <div key={lang.id} className="flex justify-between">
                                    <span>{e.langField(lang.id, 'name')}</span>
                                    <span className="text-emerald-200 text-xs">{e.langField(lang.id, 'level')}</span>
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
    const renderMainSection = (key: CVSection, columnItems: CVSection[]) => {
        const colIndex = columnItems.indexOf(key);
        const colTotal = columnItems.length;
        switch (key) {
            case 'projects':
                return (
                    <CVSectionWrapper key="projects" section="projects" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-xl font-bold text-[#0fa3b1] uppercase flex items-center gap-3 mb-6">
                            <span className="p-2 bg-[#0fa3b1] text-white rounded-lg"><Award className="w-5 h-5" /></span>
                            Thành tích nổi bật
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {projects.map((proj, idx) => (
                                <div key={proj.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center text-center hover:shadow-md transition-shadow">
                                    <div className="text-3xl font-bold text-[#0fa3b1] mb-1">{e.projectField(idx, 'name')}</div>
                                    <div className="text-xs text-slate-500 font-medium uppercase">{e.projectField(idx, 'description')}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    </CVSectionWrapper>
                );
            case 'experience':
                return (
                    <CVSectionWrapper key="experience" section="experience" index={colIndex} total={colTotal} columnSections={columnItems} showToolbar={showSectionToolbar} onAction={onSectionAction} hiddenSections={hiddenSections} onRestoreSection={onRestoreSection}>
                    <section>
                        <h3 className="text-xl font-bold text-[#0fa3b1] uppercase flex items-center gap-3 mb-6">
                            <span className="p-2 bg-[#0fa3b1] text-white rounded-lg"><Briefcase className="w-5 h-5" /></span>
                            Kinh nghiệm làm việc
                        </h3>
                        <div className="space-y-8 border-l-2 border-slate-200 pl-6 ml-4">
                            {experience.map((exp, idx) => (
                                <div key={exp.id} className="relative group">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#0fa3b1] group-hover:scale-125 transition-transform" />

                                    <div className="font-bold text-gray-800 text-lg uppercase mb-1">{e.expField(idx, 'company')}</div>
                                    <div className="text-[#0fa3b1] font-bold mb-2 uppercase tracking-wide text-sm">{e.expField(idx, 'position')}</div>

                                    <div className="text-xs font-bold text-slate-500 mb-2">
                                        {formatDateRange(exp.startDate, exp.isCurrent ? undefined : exp.endDate, exp.isCurrent)}
                                    </div>

                                    <div className="text-slate-600 whitespace-pre-line leading-relaxed text-sm bg-white p-5 rounded-xl shadow-sm border-l-4 border-l-[#0fa3b1]">
                                        {e.expField(idx, 'description')}
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
                        <h3 className="text-xl font-bold text-[#0fa3b1] uppercase flex items-center gap-3 mb-6 mt-8">
                            <span className="p-2 bg-[#0fa3b1] text-white rounded-lg"><GraduationCap className="w-5 h-5" /></span>
                            Học vấn
                        </h3>
                        <div className="space-y-6">
                            {education.map((edu, idx) => (
                                <div key={edu.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-gray-800 text-lg">{e.eduField(idx, 'school')}</div>
                                        <div className="text-[#0fa3b1] font-semibold text-sm">{e.eduField(idx, 'degree')}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-slate-500 text-xs font-bold bg-slate-100 px-2 py-1 rounded">
                                            {formatDateRange(edu.startDate, edu.endDate)}
                                        </div>
                                    </div>
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
                        <h3 className="text-xl font-bold text-[#0fa3b1] uppercase flex items-center gap-3 mb-6 mt-8">
                            <span className="p-2 bg-[#0fa3b1] text-white rounded-lg"><ShieldCheck className="w-5 h-5" /></span>
                            Chứng chỉ
                        </h3>
                        <div className="space-y-4">
                            {certifications.map((cert, idx) => (
                                <div key={cert.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                    <div className="font-bold text-gray-800">{e.certField(idx, 'name')}</div>
                                    <div className="text-sm text-slate-500">{e.certField(idx, 'issuer')} · {e.certField(idx, 'date')}</div>
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
                        <h3 className="text-xl font-bold text-[#0fa3b1] uppercase flex items-center gap-3 mb-6 mt-8">
                            <span className="p-2 bg-[#0fa3b1] text-white rounded-lg"><Award className="w-5 h-5" /></span>
                            Danh hiệu & Giải thưởng
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {awards.map((award, idx) => (
                                <div key={award.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                    <div className="font-bold text-gray-800">{e.awardField(idx, 'title')}</div>
                                    <div className="text-sm text-slate-500">{e.awardField(idx, 'issuer')} · {e.awardField(idx, 'date')}</div>
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
            {/* Left Sidebar - Blue Theme */}
            <div className="col-span-4 bg-[#0fa3b1] text-white p-6 space-y-8 flex flex-col h-full">
                {/* Photo - Square with border radius */}
                <div className="w-48 h-48 mx-auto bg-white rounded-3xl overflow-hidden shadow-lg p-1">
                    {personalInfo.avatarUrl && (
                        <img
                            src={personalInfo.avatarUrl}
                            alt={personalInfo.fullName}
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    )}
                </div>

                {/* Name Block in Sidebar */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold uppercase mb-1">{e.personalField('fullName')}</h1>
                    <p className="text-emerald-100 uppercase tracking-widest text-xs font-semibold">{e.personalField('title')}</p>
                </div>

                {/* Contact */}
                <section>
                    <h3 className="text-lg font-bold uppercase border-b border-emerald-400 pb-2 mb-4 flex items-center gap-2">
                        Thông tin liên hệ
                    </h3>
                    <div className="space-y-3 text-sm">
                        {personalInfo.additionalInfo?.map((info, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                                <span>{info.value}</span>
                            </div>
                        ))}
                        {personalInfo.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <span>{e.personalField('phone')}</span>
                            </div>
                        )}
                        {personalInfo.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{e.personalField('email')}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span>{e.personalField('location')}</span>
                            </div>
                        )}
                        {personalInfo.socials?.map((social) => (
                            <div key={social.id} className="flex items-center gap-2">
                                <span className="font-bold text-[10px] w-4 text-center">{social.network === 'LinkedIn' ? 'IN' : social.network[0]}</span>
                                <a href={`https://${social.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                                    {social.url}
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Dynamic sidebar sections */}
                {sortedSidebar.map(s => renderSidebarSection(s.key, sortedSidebar.map(x => x.key)))}
            </div>

            {/* Main Content */}
            <div className="col-span-8 p-10 space-y-10 bg-[#f4f7f6]">
                {sortedMain.map(s => renderMainSection(s.key, sortedMain.map(x => x.key)))}
            </div>
        </div>
    );
}
