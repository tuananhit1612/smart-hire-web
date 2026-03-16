import React from 'react';
import { CVData } from '../../types/types';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateProps {
    data: CVData;
}

export function MinimalCleanTemplate({ data }: TemplateProps) {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    return (
        <div className="w-full bg-white min-h-[1000px] p-12 text-gray-800 font-sans max-w-[210mm] mx-auto">
            {/* Header - Centered & Minimal */}
            <header className="text-center mb-10">
                {personalInfo.avatarUrl && (
                    <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-100 bg-gray-50 mx-auto mb-6">
                        <img
                            src={personalInfo.avatarUrl}
                            alt={personalInfo.fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3 uppercase">
                    {personalInfo.fullName || 'YOUR NAME'}
                </h1>
                <h2 className="text-lg text-gray-500 font-medium tracking-widest uppercase mb-6">
                    {personalInfo.title || 'Professional Title'}
                </h2>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
                    {personalInfo.email && (
                        <span className="flex items-center gap-1.5">
                            {personalInfo.email}
                        </span>
                    )}
                    {personalInfo.phone && (
                        <span className="flex items-center gap-1.5">
                            {personalInfo.phone}
                        </span>
                    )}
                    {personalInfo.location && (
                        <span className="flex items-center gap-1.5">
                            {personalInfo.location}
                        </span>
                    )}
                    {personalInfo.socials?.map(social => (
                        <span key={social.id} className="flex items-center gap-1.5">
                            <a href={`https://${social.url}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 border-b border-gray-200 hover:border-gray-900 transition-all">
                                {social.url}
                            </a>
                        </span>
                    ))}
                </div>
            </header>

            {/* Content - Single Column Streamlined */}
            <div className="space-y-8">
                {/* Summary */}
                {summary && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                            About Me
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 pb-2">
                            Experience
                        </h3>
                        <div className="space-y-6">
                            {experience.map((exp) => (
                                <div key={exp.id} className="grid grid-cols-12 gap-4">
                                    <div className="col-span-3 text-right pr-4">
                                        <div className="text-sm font-bold text-gray-900">{exp.company}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                                        </div>
                                    </div>
                                    <div className="col-span-9 border-l border-gray-100 pl-6 pb-2">
                                        <h4 className="text-sm font-bold text-gray-800 mb-2">{exp.position}</h4>
                                        <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 pb-2">
                            Projects
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            {projects.map((project) => (
                                <div key={project.id} className="group">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-sm text-gray-900 group-hover:text-green-600 transition-colors">
                                            {project.name}
                                        </h4>
                                        {project.link && (
                                            <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-green-500" />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.map(tech => (
                                            <span key={tech} className="text-[10px] text-gray-400">
                                                #{tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-12">
                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-100 pb-2">
                                Education
                            </h3>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-sm font-bold text-gray-900">{edu.school}</h4>
                                            <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</span>
                                        </div>
                                        <div className="text-sm text-gray-700">{edu.degree}</div>
                                        <div className="text-xs text-gray-500">{edu.field}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-100 pb-2">
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-x-2 gap-y-2">
                                {skills.map((skill) => (
                                    <span key={skill.id} className="text-sm text-gray-700 border-b border-gray-100 pb-0.5">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
