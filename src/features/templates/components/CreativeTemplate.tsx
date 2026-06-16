import React from 'react';
import { ResumeData } from '@/types';

interface TemplateProps {
    data: ResumeData;
}

const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personalInfo, skills, experience, education, projects, achievements } = data;

    return (
        <div className="p-0 text-[#1a1a1a] leading-normal min-h-full grid grid-cols-[2.8in_1fr] bg-transparent font-serif relative z-10">
            <div className="bg-transparent text-[#1a1a1a] p-[0.5in_0.4in] border-r-0">
                <div className="sidebar-content">
                    {personalInfo.name && <h1 className="text-[20pt] mt-0 mb-[20pt] font-bold text-left text-slate-900">{personalInfo.name}</h1>}
                    {(personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.links) && (
                        <div className="flex flex-col items-stretch gap-[5pt] text-slate-700 text-[10pt] mb-[25pt]">
                            <h3 className="text-[11pt] border-b-[1.5pt] border-slate-900/30 mt-[15pt] mb-[10pt] text-slate-900 font-bold uppercase tracking-wider pb-0.5">PERSONAL INFO</h3>
                            <p className="m-0">{personalInfo.email}</p>
                            <p className="m-0">{personalInfo.phone}</p>
                            <p className="m-0">{personalInfo.location}</p>
                            {personalInfo.links && (
                                <a href={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} target="_blank" rel="noopener noreferrer" className="text-[10pt] text-blue-600 no-underline">
                                    {personalInfo.links}
                                </a>
                            )}
                        </div>
                    )}

                    {skills && skills.length > 0 && (
                        <div className="mb-[25pt]">
                            <h3 className="text-[11pt] border-b-[1.5pt] border-slate-900/30 mt-[15pt] mb-[10pt] text-slate-900 font-bold uppercase tracking-wider pb-0.5">SKILLS</h3>
                            <div className="grid grid-cols-1 gap-[8pt] mt-[10pt]">
                                {skills.map((skill, i) => skill && <div key={`skill-${i}`} className="text-[10pt] text-slate-700">• {skill}</div>)}
                            </div>
                        </div>
                    )}

                    {education && education.length > 0 && (
                        <div className="mb-[25pt]">
                            <h3 className="text-[11pt] border-b-[1.5pt] border-slate-900/30 mt-[15pt] mb-[10pt] text-slate-900 font-bold uppercase tracking-wider pb-0.5">EDUCATION</h3>
                            {education.map((edu, i) => (
                                <div key={edu.id || i} className="mb-[20pt] last:mb-0">
                                    <div className="flex justify-between items-baseline text-[11pt] font-bold text-slate-900 mb-[3pt]">
                                        <strong>{edu.degree}</strong>
                                        <span>{edu.year}</span>
                                    </div>
                                    <div className="text-[10.5pt] text-slate-500 italic mb-[5pt]">{edu.school}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="p-[0.5in_0.4in]">
                {personalInfo.summary && (
                    <section className="mb-[20pt] last:mb-0">
                        <h2 className="text-[11pt] border-b-2 border-slate-900 mt-[15pt] mb-[10pt] text-slate-900 font-bold uppercase tracking-wider pb-0.5">ABOUT</h2>
                        <p className="text-[10.5pt] text-justify my-[5pt] text-slate-700">{personalInfo.summary}</p>
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section className="mb-[20pt] last:mb-0">
                        <h2 className="text-[11pt] border-b-2 border-slate-900 mt-[15pt] mb-[10pt] text-slate-900 font-bold uppercase tracking-wider pb-0.5">EXPERIENCE</h2>
                        {experience.map((exp, i) => (
                            <div key={exp.id || i} className="mb-[20pt] last:mb-0">
                                <div className="flex justify-between items-baseline text-[11pt] font-bold text-slate-900 mb-[3pt]">
                                    <strong>{exp.role}</strong>
                                    <span>{exp.duration}</span>
                                </div>
                                <div className="text-[10.5pt] text-slate-600 italic mb-[5pt]">{exp.company}</div>
                                <p className="text-[10.5pt] text-justify my-[5pt] text-slate-700">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {projects && projects.length > 0 && (
                    <section className="mb-[20pt] last:mb-0">
                        <h2 className="text-[11pt] border-b-2 border-slate-900 mt-[15pt] mb-[10pt] text-slate-900 font-bold uppercase tracking-wider pb-0.5">PROJECTS</h2>
                        {projects.map((proj, i) => (
                            <div key={proj.id || i} className="mb-[20pt] last:mb-0">
                                <div className="flex justify-between items-baseline text-[11pt] font-bold text-slate-900 mb-[3pt]">
                                    <strong>{proj.title}</strong>
                                    {proj.link && (
                                        <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[10pt] text-blue-600 inline-block no-underline mt-[4pt]">
                                            View Project
                                        </a>
                                    )}
                                </div>
                                <p className="text-[10.5pt] text-justify my-[5pt] text-slate-700">{proj.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {achievements && achievements.length > 0 && (
                    <section className="mb-[20pt] last:mb-0">
                        <h2 className="text-[11pt] border-b-2 border-slate-900 mt-[15pt] mb-[10pt] text-slate-900 font-bold uppercase tracking-wider pb-0.5">ACHIEVEMENTS</h2>
                        {achievements.map((ach, i) => (
                            <div key={ach.id || i} className="mb-[20pt] last:mb-0">
                                <div className="flex justify-between items-baseline text-[11pt] font-bold text-slate-900 mb-[3pt]">
                                    <strong>{ach.title}</strong>
                                </div>
                                <p className="text-[10.5pt] text-justify my-[5pt] text-slate-700">{ach.description}</p>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
};

export default CreativeTemplate;
