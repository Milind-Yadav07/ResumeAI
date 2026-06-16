import React from 'react';
import { ResumeData } from '@/types';

interface TemplateProps {
    data: ResumeData;
}

const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personalInfo, skills, experience, education, projects, achievements } = data;

    return (
        <div className="p-[0.5in] text-[#1a1a1a] leading-normal min-h-full bg-transparent font-serif">
            {(personalInfo.name || personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.links) && (
                <header className="text-center pb-0 mb-[8pt]">
                    <h1 className="text-[20pt] mt-0 mb-1 font-bold text-center text-slate-900">{personalInfo.name}</h1>
                    <div className="flex justify-center gap-[12pt] text-[9.5pt] text-slate-600 mb-0">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                        {personalInfo.links && (
                            <a href={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} target="_blank" rel="noopener noreferrer" className="text-[9.5pt] text-blue-600 font-medium no-underline">
                                {personalInfo.links}
                            </a>
                        )}
                    </div>
                </header>
            )}

            {personalInfo.summary && (
                <section className="mb-[15pt]">
                    <h2 className="text-[11pt] border-b-[1.5pt] border-slate-900 mt-[15pt] mb-[8pt] text-slate-900 font-bold uppercase tracking-wider pb-[2pt]">ABOUT</h2>
                    <p className="text-[10pt] text-justify my-[4pt] text-slate-700">{personalInfo.summary}</p>
                </section>
            )}

            {skills && skills.length > 0 && (
                <section className="mb-[15pt]">
                    <h2 className="text-[11pt] border-b-[1.5pt] border-slate-900 mt-[15pt] mb-[8pt] text-slate-900 font-bold uppercase tracking-wider pb-[2pt]">SKILLS</h2>
                    <div className="flex flex-wrap gap-[6pt]">
                        {skills.map((skill, i) => skill && <span key={i} className="bg-slate-50/50 px-[8pt] py-[3pt] rounded text-[9.5pt] text-slate-700 border border-slate-200">{skill}</span>)}
                    </div>
                </section>
            )}

            {experience && experience.length > 0 && (
                <section className="mb-[15pt]">
                    <h2 className="text-[11pt] border-b-[1.5pt] border-slate-900 mt-[15pt] mb-[8pt] text-slate-900 font-bold uppercase tracking-wider pb-[2pt]">EXPERIENCE</h2>
                    {experience.map((exp, i) => (
                        <div key={exp.id || i} className="mb-[15pt] last:mb-0">
                            <div className="flex justify-between items-baseline text-[10.5pt] mb-0.5">
                                <strong className="font-bold text-slate-900">{exp.role}</strong>
                                <span>{exp.duration}</span>
                            </div>
                            <div className="text-[10pt] text-slate-700 italic mb-1">{exp.company}</div>
                            <p className="text-[10pt] text-justify my-[4pt] text-slate-700">{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {education && education.length > 0 && (
                <section className="mb-[15pt]">
                    <h2 className="text-[11pt] border-b-[1.5pt] border-slate-900 mt-[15pt] mb-[8pt] text-slate-900 font-bold uppercase tracking-wider pb-[2pt]">EDUCATION</h2>
                    {education.map((edu, i) => (
                        <div key={edu.id || i} className="mb-[15pt] last:mb-0">
                            <div className="flex justify-between items-baseline text-[10.5pt] mb-0.5">
                                <strong className="font-bold text-slate-900">{edu.degree}</strong>
                                <span>{edu.year}</span>
                            </div>
                            <div className="text-[10pt] text-slate-700 italic mb-1">{edu.school}</div>
                        </div>
                    ))}
                </section>
            )}

            {projects && projects.length > 0 && (
                <section className="mb-[15pt]">
                    <h2 className="text-[11pt] border-b-[1.5pt] border-slate-900 mt-[15pt] mb-[8pt] text-slate-900 font-bold uppercase tracking-wider pb-[2pt]">PROJECTS</h2>
                    {projects.map((proj, i) => (
                        <div key={proj.id || i} className="mb-[15pt] last:mb-0">
                            <div className="flex justify-between items-baseline text-[10.5pt] mb-0.5">
                                <strong className="font-bold text-slate-900">{proj.title}</strong>
                                {proj.link && (
                                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[9.5pt] text-blue-600 ml-2.5 no-underline">
                                        View Project
                                    </a>
                                )}
                            </div>
                            <p className="text-[10pt] text-justify my-[4pt] text-slate-700">{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {achievements && achievements.length > 0 && (
                <section className="mb-[15pt]">
                    <h2 className="text-[11pt] border-b-[1.5pt] border-slate-900 mt-[15pt] mb-[8pt] text-slate-900 font-bold uppercase tracking-wider pb-[2pt]">ACHIEVEMENTS</h2>
                    {achievements.map((ach, i) => (
                        <div key={ach.id || i} className="mb-[15pt] last:mb-0">
                            <div className="flex justify-between items-baseline text-[10.5pt] mb-0.5">
                                <strong className="font-bold text-slate-900">{ach.title}</strong>
                            </div>
                            <p className="text-[10pt] text-justify my-[4pt] text-slate-700">{ach.description}</p>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};

export default ExecutiveTemplate;
