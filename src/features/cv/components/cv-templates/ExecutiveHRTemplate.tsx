import React from 'react';
import { CVData } from '../../types/types';
import { Mail, Phone, MapPin, Globe, Linkedin, Award, Briefcase, GraduationCap } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface TemplateProps {
    data: CVData;
}

export function ExecutiveHRTemplate({ data }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    return (
        <div className="w-full bg-slate-50 min-h-[1000px] text-slate-800 font-sans p-8">
            <div className="bg-white shadow-xl rounded-xl overflow-hidden min-h-[950px]">
                {/* Header - Dark Green Clean */}
                <header className="bg-emerald-900 text-white p-10 flex gap-8 items-center relative overflow-hidden">
                    {/* Decor Circle */}
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-800 rounded-full opacity-50 blur-2xl"></div>

                    {personalInfo.avatarUrl && (
                        <div className="w-32 h-32 rounded-full border-4 border-emerald-700 shadow-2xl flex-shrink-0 z-10 overflow-hidden">
                            <img
                                src={personalInfo.avatarUrl}
                                alt={personalInfo.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-1 z-10">
                        <h1 className="text-4xl font-serif font-bold tracking-wide mb-2">
                            {personalInfo.fullName?.toUpperCase()}
                        </h1>
                        <p className="text-emerald-300 text-lg font-medium tracking-widest uppercase mb-6">
                            {personalInfo.title}
                        </p>

                        <div className="flex flex-wrap gap-5 text-emerald-100 text-sm">
                            {personalInfo.email && (
                                <div className="flex items-center gap-2">
                                    <div className="p-1 bg-emerald-800 rounded"><Mail className="w-3 h-3" /></div>
                                    {personalInfo.email}
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-center gap-2">
                                    <div className="p-1 bg-emerald-800 rounded"><Phone className="w-3 h-3" /></div>
                                    {personalInfo.phone}
                                </div>
                            )}
                            {personalInfo.location && (
                                <div className="flex items-center gap-2">
                                    <div className="p-1 bg-emerald-800 rounded"><MapPin className="w-3 h-3" /></div>
                                    {personalInfo.location}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="p-10 grid grid-cols-12 gap-10">
                    {/* Left Panel - Main Info */}
                    <div className="col-span-8 space-y-10">
                        {summary && (
                            <section>
                                <h3 className="text-xl font-serif font-bold text-emerald-900 border-b-2 border-emerald-100 pb-2 mb-4">
                                    Hồ sơ năng lực
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-justify">
                                    {summary}
                                </p>
                            </section>
                        )}

                        {experience.length > 0 && (
                            <section>
                                <h3 className="text-xl font-serif font-bold text-emerald-900 border-b-2 border-emerald-100 pb-2 mb-6 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-emerald-600" />
                                    Kinh nghiệm làm việc
                                </h3>
                                <div className="border-l-2 border-emerald-100 pl-8 space-y-8 ml-2">
                                    {experience.map((exp) => (
                                        <div key={exp.id} className="relative">
                                            {/* Dot */}
                                            <div className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-sm"></div>

                                            <div className="mb-2">
                                                <h4 className="text-lg font-bold text-slate-800">{exp.position}</h4>
                                                <div className="flex justify-between items-center text-emerald-700 font-medium text-sm">
                                                    <span>{exp.company}</span>
                                                    <span className="italic bg-emerald-50 px-3 py-0.5 rounded-full">{exp.startDate} - {exp.isCurrent ? "Hiện tại" : exp.endDate}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                                {exp.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects embedded in main column for Executive feel */}
                        {projects.length > 0 && (
                            <section>
                                <h3 className="text-xl font-serif font-bold text-emerald-900 border-b-2 border-emerald-100 pb-2 mb-6 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-emerald-600" />
                                    Dự án tiêu biểu
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {projects.map(p => (
                                        <div key={p.id} className="bg-slate-50 p-4 rounded-lg border border-emerald-100/50">
                                            <h4 className="font-bold text-emerald-900">{p.name}</h4>
                                            <p className="text-sm text-slate-600 mt-1">{p.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Panel - Supporting Info */}
                    <div className="col-span-4 space-y-8">
                        {education.length > 0 && (
                            <section>
                                <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-emerald-600" />
                                    Học vấn
                                </h3>
                                <div className="space-y-4">
                                    {education.map(edu => (
                                        <div key={edu.id} className="bg-emerald-50/50 p-4 rounded-lg">
                                            <h4 className="font-bold text-slate-800 text-sm">{edu.school}</h4>
                                            <div className="text-xs text-emerald-700 font-semibold mt-1">{edu.degree}</div>
                                            <div className="text-xs text-slate-500 mt-1">{edu.startDate} - {edu.endDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {skills.length > 0 && (
                            <section>
                                <h3 className="text-lg font-bold text-emerald-900 mb-4">Các kỹ năng</h3>
                                <div className="space-y-4">
                                    {/* Tech/Hard Skills as Progress Bars */}
                                    <div className="space-y-3">
                                        {skills.filter(s => s.category === 'technical').map(skill => (
                                            <div key={skill.id}>
                                                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                                                    <span>{skill.name}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${typeof skill.level === 'number' ? skill.level : 80}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Soft Skills as Tags */}
                                    <div className="pt-4">
                                        <h4 className="text-sm font-semibold text-slate-500 mb-2 uppercase text-xs">Kỹ năng lãnh đạo</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.filter(s => s.category === 'soft').map(skill => (
                                                <span key={skill.id} className="px-3 py-1 bg-white border border-slate-200 text-xs font-medium text-slate-600 rounded shadow-sm">
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {personalInfo.additionalInfo && (
                            <section>
                                <h3 className="text-lg font-bold text-emerald-900 mb-4">Thông tin thêm</h3>
                                <div className="space-y-2">
                                    {personalInfo.additionalInfo.map((info, idx) => (
                                        <div key={idx} className="flex justify-between text-sm border-b border-dashed border-emerald-100 pb-2">
                                            <span className="text-slate-500">{info.label}</span>
                                            <span className="font-semibold text-emerald-900">{info.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
