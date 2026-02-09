import React from 'react';
import { CVData } from '../../types/types';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';

interface TemplateProps {
    data: CVData;
}

export function ModernSalesTemplate({ data }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects } = data;

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
                    <h1 className="text-2xl font-bold uppercase mb-1">{personalInfo.fullName}</h1>
                    <p className="text-blue-100 uppercase tracking-widest text-xs font-semibold">{personalInfo.title}</p>
                </div>

                {/* Contact */}
                <section>
                    <h3 className="text-lg font-bold uppercase border-b border-blue-400 pb-2 mb-4 flex items-center gap-2">
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
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span>{personalInfo.location}</span>
                            </div>
                        )}
                        {/* Social Links */}
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

                {/* Summary inside Sidebar? No, normally main. Image 3 has Summary in Sidebar (Muc tieu nghe nghiep). */}
                {summary && (
                    <section>
                        <h3 className="text-lg font-bold uppercase border-b border-blue-400 pb-2 mb-4">
                            Mục tiêu nghề nghiệp
                        </h3>
                        <p className="text-sm text-blue-50 leading-relaxed">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase border-b border-blue-400 pb-2 mb-4">
                            Kỹ năng
                        </h3>
                        <div className="space-y-3">
                            {skills.map((skill) => (
                                <div key={skill.id}>
                                    <div className="flex justify-between text-sm font-semibold mb-1">
                                        <span>{skill.name}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <div
                                                key={star}
                                                className={`h-2.5 w-6 rounded-sm ${star * 20 <= getSkillLevel(skill.level) ? 'bg-white' : 'bg-blue-800/30'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Main Content */}
            <div className="col-span-8 p-10 space-y-10 bg-[#f4f7f6]">
                {/* Header for Main Content? No, already in sidebar. */}

                {/* Key Achievements Grid - Sales Specific */}
                {projects.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold text-[#0fa3b1] uppercase flex items-center gap-3 mb-6">
                            <span className="p-2 bg-[#0fa3b1] text-white rounded-lg"><Award className="w-5 h-5" /></span>
                            Thành tích nổi bật
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {projects.map((proj) => (
                                <div key={proj.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center text-center hover:shadow-md transition-shadow">
                                    <div className="text-3xl font-bold text-[#0fa3b1] mb-1">{proj.name}</div>
                                    <div className="text-xs text-slate-500 font-medium uppercase">{proj.description}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold text-[#0fa3b1] uppercase flex items-center gap-3 mb-6">
                            <span className="p-2 bg-[#0fa3b1] text-white rounded-lg"><Briefcase className="w-5 h-5" /></span>
                            Kinh nghiệm làm việc
                        </h3>
                        <div className="space-y-8 border-l-2 border-slate-200 pl-6 ml-4">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative group">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#0fa3b1] group-hover:scale-125 transition-transform" />

                                    {/* Date */}
                                    <div className="absolute -left-[100px] top-1 w-16 text-right text-xs font-bold text-slate-400 hidden sm:block">
                                        <div className="bg-slate-200 px-2 py-1 rounded inline-block">{exp.endDate}</div>
                                        <div className="my-1 text-center opacity-50">to</div>
                                        <div className="bg-slate-200 px-2 py-1 rounded inline-block">{exp.startDate}</div>
                                    </div>

                                    <div className="font-bold text-gray-800 text-lg uppercase mb-1">{exp.company}</div>
                                    <div className="text-[#0fa3b1] font-bold mb-2 uppercase tracking-wide text-sm">{exp.position}</div>

                                    {/* Mobile Date */}
                                    <div className="sm:hidden text-xs font-bold text-slate-500 mb-2">{exp.startDate} - {exp.endDate}</div>

                                    <div className="text-slate-600 whitespace-pre-line leading-relaxed text-sm bg-white p-5 rounded-xl shadow-sm border-l-4 border-l-[#0fa3b1]">
                                        {exp.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold text-[#0fa3b1] uppercase flex items-center gap-3 mb-6 mt-8">
                            <span className="p-2 bg-[#0fa3b1] text-white rounded-lg"><GraduationCap className="w-5 h-5" /></span>
                            Học vấn
                        </h3>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-gray-800 text-lg">{edu.school}</div>
                                        <div className="text-[#0fa3b1] font-semibold text-sm">{edu.degree}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-slate-500 text-xs font-bold bg-slate-100 px-2 py-1 rounded">{edu.startDate} - {edu.endDate}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
