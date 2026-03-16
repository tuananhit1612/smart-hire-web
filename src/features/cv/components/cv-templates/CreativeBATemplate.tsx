import React from 'react';
import { CVData } from '../../types/types';
import { Mail, Phone, MapPin, Linkedin, Calendar, Globe, Award, FileText } from 'lucide-react';

interface TemplateProps {
    data: CVData;
}

export function CreativeBATemplate({ data }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    return (
        <div className="w-full bg-[#fffcf5] min-h-[1000px] grid grid-cols-12 text-slate-800 font-sans">

            {/* Left Column (Main Content) - 8 Cols */}
            <div className="col-span-8 p-10 space-y-10">

                {/* Header (Text Only, matching Image 4 Style) */}
                {/* Actually used text header in sidebar? No, image 4 shows Name in Dark Right Sidebar. Main content has Summary etc. */}
                {/* Wait, Image 4 top right has Name block. Let's look closer. */}
                {/* Image 4: Top entire block is split. Left is Yellowish "Muc tieu nghe nghiep". Right is Dark Grey with Name. */}
                {/* Below that: Left is Main Content. Right is Sidebar. */}

                {/* Re-evaluating layout based on Image 4 */}
                {/* It seems to be a 2-column layout where the Right Column is the dark sidebar containing profile photo, contact, skills. */}
                {/* The Header Name is actually inside the Right Sidebar at the top. */}

                {/* Summary Section - Highlighted background box? */}
                {summary && (
                    <section className="bg-[#fff3cd] p-6 rounded-lg border-l-4 border-[#e9bc2e]">
                        <h3 className="text-xl font-bold text-[#d4a017] uppercase mb-3">
                            Mục tiêu nghề nghiệp
                        </h3>
                        <p className="text-slate-700 leading-relaxed text-justify text-sm">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold text-[#d4a017] uppercase border-b-2 border-[#e9bc2e] pb-2 mb-6 flex items-center gap-2">
                            <span>Học vấn</span>
                            <div className="flex-1 h-[1px] bg-[#e9bc2e]"></div>
                        </h3>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id} className="flex justify-between">
                                    <div className="space-y-1">
                                        <div className="font-bold text-slate-900 text-lg">{edu.school}</div>
                                        <div className="text-slate-600 font-medium">{edu.degree}</div>
                                        <div className="text-slate-500 italic text-sm">{edu.field}</div>
                                    </div>
                                    <div className="text-slate-900 font-bold whitespace-nowrap">
                                        {edu.startDate} - {edu.endDate}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience - Timeline Style */}
                {experience.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold text-[#d4a017] uppercase border-b-2 border-[#e9bc2e] pb-2 mb-8 flex items-center gap-2">
                            <span>Kinh nghiệm làm việc</span>
                            <div className="flex-1 h-[1px] bg-[#e9bc2e]"></div>
                        </h3>
                        <div className="space-y-0 relative border-l-2 border-[#e9bc2e00] pl-0 ml-2">
                            {/* Vertical Line */}
                            <div className="absolute left-[7px] top-2 bottom-0 w-[2px] bg-[#e9bc2e]/30"></div>

                            {experience.map((exp) => (
                                <div key={exp.id} className="relative pl-10 pb-10 group last:pb-0">
                                    {/* Timeline Dot */}
                                    <div className="absolute left-[0px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#e9bc2e] z-10 group-hover:scale-125 transition-transform"></div>

                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                        <h4 className="font-bold text-slate-900 text-lg uppercase group-hover:text-[#d4a017] transition-colors">{exp.company}</h4>
                                        <span className="text-slate-500 font-mono text-sm bg-[#fff3cd] px-2 py-1 rounded">
                                            {exp.startDate} - {exp.endDate}
                                        </span>
                                    </div>
                                    <div className="text-[#d4a017] font-bold mb-3 uppercase tracking-wide text-sm">{exp.position}</div>
                                    <div className="text-slate-600 whitespace-pre-line leading-relaxed text-sm text-justify">
                                        {exp.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Right Sidebar - Dark Grey Theme */}
            <div className="col-span-4 bg-[#333333] text-white p-8 space-y-10 border-l border-gray-600">
                {/* Header Block in Sidebar */}
                <div className="text-center pt-8">
                    <h1 className="text-2xl font-bold uppercase mb-2 text-[#e9bc2e]">
                        {personalInfo.fullName}
                    </h1>
                    <p className="text-white uppercase tracking-widest text-sm font-medium mb-8">
                        {personalInfo.title}
                    </p>

                    {personalInfo.avatarUrl && (
                        <div className="w-40 h-40 mx-auto rounded-full border-4 border-[#e9bc2e] overflow-hidden mb-8 bg-white">
                            <img
                                src={personalInfo.avatarUrl}
                                alt={personalInfo.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Contact */}
                <div className="space-y-4 text-sm text-gray-300">
                    {personalInfo.phone && (
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-[#e9bc2e]" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.email && (
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-[#e9bc2e]" />
                            <span className="truncate">{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.location && (
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-[#e9bc2e]" />
                            <span>{personalInfo.location}</span>
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

                {/* Skills - Progress Bars */}
                {skills.length > 0 && (
                    <section>
                        <h3 className="text-white font-bold uppercase border-b border-gray-500 pb-2 mb-6">
                            Kỹ năng
                        </h3>
                        <div className="space-y-5">
                            {skills.map((skill) => (
                                <div key={skill.id}>
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="text-gray-200">{skill.name}</span>
                                    </div>
                                    <div className="w-full bg-gray-600 h-2.5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#e9bc2e]"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Awards / Certs */}
                {projects.length > 0 && (
                    <section>
                        <h3 className="text-[#e9bc2e] font-bold uppercase border-b border-gray-500 pb-2 mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            Danh hiệu & Giải thưởng
                        </h3>
                        <div className="space-y-4 text-sm">
                            {projects.map((proj) => (
                                <div key={proj.id}>
                                    <div className="font-bold text-white mb-1">{proj.description.split('-')[0]}</div>
                                    <div className="text-gray-400 text-xs">{proj.name}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
