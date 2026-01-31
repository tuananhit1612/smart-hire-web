import React from 'react';
import { CVData } from '../../types/types';
import { Mail, Phone, MapPin, Globe, Calendar, User, Award, BookOpen } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface TemplateProps {
    data: CVData;
}

export function ProfessionalSalesTemplate({ data }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects } = data;

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

                {/* Personal Contact */}
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

                {/* Education */}
                {education.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold text-[#8e5252] uppercase border-b border-[#ddb8a9] pb-2 mb-4">
                            Học vấn
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline font-bold text-slate-800">
                                        <span>{edu.school}</span>
                                        <span className="text-xs text-slate-600">{edu.startDate} - {edu.endDate}</span>
                                    </div>
                                    <div className="text-sm text-slate-700 mt-1">{edu.degree}</div>
                                    <div className="text-sm text-slate-600 italic">{edu.field}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold text-[#8e5252] uppercase border-b border-[#ddb8a9] pb-2 mb-4">
                            Kỹ năng
                        </h3>
                        <div className="space-y-4 text-sm">
                            {skills.map((skill) => (
                                <div key={skill.id}>
                                    <div className="font-bold text-slate-800 mb-1">{skill.name}</div>
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
                )}
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

                {/* Summary */}
                {summary && (
                    <section>
                        <h3 className="text-xl font-bold text-[#8e5252] uppercase mb-3 flex items-center gap-2">
                            Mục tiêu nghề nghiệp
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-justify">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
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
                                            {exp.startDate} - {exp.endDate}
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
                )}

                {/* Awards / Certificates */}
                {projects.length > 0 && (
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
                )}
            </div>
        </div>
    );
}
