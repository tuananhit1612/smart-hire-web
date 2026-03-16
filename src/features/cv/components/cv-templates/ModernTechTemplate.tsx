import React from 'react';
import { CVData } from '../../types/types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface TemplateProps {
    data: CVData;
}

export function ModernTechTemplate({ data }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    return (
        <div className="w-full bg-white min-h-[1000px] text-slate-800 font-sans tracking-tight">
            {/* Header with subtle gradient background */}
            <header className="bg-gradient-to-r from-slate-50 to-white pt-10 pb-8 px-10 border-b border-slate-200">
                <div className="flex items-center gap-8">
                    {personalInfo.avatarUrl && (
                        <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-white shadow-lg flex-shrink-0 ring-1 ring-slate-100">
                            <img
                                src={personalInfo.avatarUrl}
                                alt={personalInfo.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-1">
                        <h1 className="text-4xl font-extrabold uppercase tracking-tight mb-2 text-slate-900 group-hover:text-rose-600 transition-colors">
                            {personalInfo.fullName || 'YOUR NAME'}
                        </h1>
                        <h2 className="text-lg text-rose-600 font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <div className="h-0.5 w-8 bg-rose-600"></div>
                            {personalInfo.title || 'Professional Title'}
                        </h2>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 font-medium">
                            {personalInfo.email && (
                                <div className="flex items-center gap-2 hover:text-rose-600 transition-colors">
                                    <div className="p-1.5 bg-rose-50 rounded-full text-rose-600"><Mail className="w-3.5 h-3.5" /></div>
                                    <span>{personalInfo.email}</span>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-center gap-2 hover:text-rose-600 transition-colors">
                                    <div className="p-1.5 bg-rose-50 rounded-full text-rose-600"><Phone className="w-3.5 h-3.5" /></div>
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}
                            {personalInfo.location && (
                                <div className="flex items-center gap-2 hover:text-rose-600 transition-colors">
                                    <div className="p-1.5 bg-rose-50 rounded-full text-rose-600"><MapPin className="w-3.5 h-3.5" /></div>
                                    <span>{personalInfo.location}</span>
                                </div>
                            )}
                            {personalInfo.socials?.map(social => (
                                <div key={social.id} className="flex items-center gap-2 hover:text-rose-600 transition-colors">
                                    <div className="p-1.5 bg-rose-50 rounded-full text-rose-600"><Globe className="w-3.5 h-3.5" /></div>
                                    <a href={`https://${social.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{social.url}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-0">
                {/* Left Column (Sidebar) */}
                <div className="col-span-4 bg-slate-50/50 p-10 space-y-10 border-r border-slate-100 min-h-[1000px]">
                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-200 pb-3 mb-5">
                                Education
                            </h3>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h4 className="font-bold text-slate-900 text-base">{edu.school}</h4>
                                        <div className="text-sm text-rose-600 font-semibold mb-1">{edu.degree}</div>
                                        <div className="text-xs text-slate-500 italic mb-2 relative top-[-2px]">
                                            {edu.startDate} - {edu.endDate}
                                        </div>
                                        <div className="text-xs text-slate-600 leading-snug">{edu.field}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-200 pb-3 mb-5">
                                Skills
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-extrabold text-slate-400 uppercase mb-3 tracking-wider">Technical</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.filter(s => s.category === 'technical').map((skill) => (
                                            <span key={skill.id} className="text-xs px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-semibold shadow-sm">
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-extrabold text-slate-400 uppercase mb-3 tracking-wider">Soft Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.filter(s => s.category === 'soft').map((skill) => (
                                            <span key={skill.id} className="text-xs px-3 py-1.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg font-semibold">
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Main Content) */}
                <div className="col-span-8 p-10 space-y-10 pl-12">
                    {/* Summary */}
                    {summary && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                                Professional Summary
                            </h3>
                            <p className="text-sm text-slate-700 leading-7 text-justify font-medium">
                                {summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                                Work Experience
                            </h3>
                            <div className="space-y-8 relative">
                                <div className="absolute left-[-29px] top-2 bottom-2 w-[1px] bg-slate-100 hidden"></div>
                                {experience.map((exp) => (
                                    <div key={exp.id} className="relative group">
                                        <div className="absolute -left-[33px] top-1.5 w-2 h-2 rounded-full bg-slate-200 border-2 border-white ring-1 ring-slate-200 group-hover:bg-rose-500 group-hover:ring-rose-200 transition-all hidden"></div>

                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-slate-900 text-lg group-hover:text-rose-700 transition-colors">{exp.position}</h4>
                                            <span className="text-xs text-slate-500 font-bold bg-slate-50 px-2 py-1 rounded">
                                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm text-rose-600 font-bold mb-3 uppercase tracking-wide">{exp.company}</div>
                                        <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed border-l-2 border-rose-100 pl-4">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                                Key Projects
                            </h3>
                            <div className="grid grid-cols-1 gap-5">
                                {projects.map((project) => (
                                    <div key={project.id} className="bg-slate-50 p-5 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-slate-800 text-sm">{project.name}</h4>
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noreferrer" className="text-[10px] text-rose-600 hover:underline flex items-center gap-1 bg-white px-2 py-0.5 rounded-full shadow-sm">
                                                    Link <Globe className="w-3 h-3" />
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {project.technologies.map((tech) => (
                                                <span key={tech} className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded-md text-slate-600 font-semibold shadow-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
