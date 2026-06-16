import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { ResumeData } from '@/types';
import { renderDescription } from '../utils/renderDescription';

interface TemplateProps {
    data: ResumeData;
}

const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personalInfo = { name: '', email: '', phone: '', location: '', links: '', summary: '', photo: '' }, skills = [], experience = [], education = [], projects = [], achievements = [] } = data;

    return (
        <div className="p-0 text-slate-700 leading-relaxed min-h-full grid grid-cols-[31%_69%] bg-transparent font-serif">
            <div className="bg-transparent text-slate-700 p-[0.5in_0.4in] border-r-0 z-10">
                <div className="sidebar-content">
                    {personalInfo.photo && (
                        <div className="flex justify-center mb-[20pt]">
                            <img src={personalInfo.photo} alt="Profile" className="w-[120px] h-[120px] rounded-xl object-cover border-[3px] border-slate-50 shadow-md" />
                        </div>
                    )}
                    {personalInfo.name && <h1 className="text-[20pt] mt-0 mb-[8pt] font-semibold text-center text-slate-900 tracking-tight">{personalInfo.name}</h1>}

                    {(personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.links) && (
                        <div className="flex flex-col gap-[10pt] mb-[25pt]">
                            <h3 className="text-[9.5pt] tracking-widest uppercase mt-[15pt] mb-[12pt] text-slate-900 font-bold relative pb-[5pt] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[20px] after:h-[2px] after:bg-blue-500">CONTACT</h3>
                            {personalInfo.email && (
                                <div className="flex items-center gap-[8pt] text-[9.5pt] text-slate-600">
                                    <Mail size={14} className="text-blue-500 shrink-0" />
                                    <span>{personalInfo.email}</span>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-center gap-[8pt] text-[9.5pt] text-slate-600">
                                    <Phone size={14} className="text-blue-500 shrink-0" />
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}
                            {personalInfo.location && (
                                <div className="flex items-center gap-[8pt] text-[9.5pt] text-slate-600">
                                    <MapPin size={14} className="text-blue-500 shrink-0" />
                                    <span>{personalInfo.location}</span>
                                </div>
                            )}
                            {personalInfo.links && (
                                <div className="flex items-center gap-[8pt] text-[9.5pt] text-slate-600">
                                    <Globe size={14} className="text-blue-500 shrink-0" />
                                    <a href={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} target="_blank" rel="noopener noreferrer" className="text-[9.5pt] text-blue-500 break-all no-underline">
                                        {personalInfo.links}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {skills && skills.length > 0 && skills.some(s => s && s.trim()) && (
                        <div className="mb-[25pt]">
                            <h3 className="text-[9.5pt] tracking-widest uppercase mt-[15pt] mb-[12pt] text-slate-900 font-bold relative pb-[5pt] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[20px] after:h-[2px] after:bg-blue-500">SKILLS</h3>
                            <div className="flex flex-wrap gap-[6pt] mt-[5pt]">
                                {skills.map((skill, i) => skill && skill.trim() && <div key={`skill-${i}`} className="text-[9pt] text-slate-600 bg-slate-200/50 px-[8pt] py-[3pt] rounded font-medium border border-slate-200">{skill}</div>)}
                            </div>
                        </div>
                    )}

                    {education && education.length > 0 && education.some(edu => edu.degree || edu.school) && (
                        <div className="mb-[25pt]">
                            <h3 className="text-[9.5pt] tracking-widest uppercase mt-[15pt] mb-[12pt] text-slate-900 font-bold relative pb-[5pt] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[20px] after:h-[2px] after:bg-blue-500">EDUCATION</h3>
                            {education.filter(edu => edu.degree || edu.school).map((edu, i) => (
                                <div key={edu.id || i} className="mb-[18pt] last:mb-0">
                                    <div className="flex justify-between items-baseline text-[11pt] mb-0.5">
                                        <strong className="font-semibold text-slate-900">{edu.degree}</strong>
                                    </div>
                                    <div className="text-[9pt] text-slate-400 font-medium">{edu.year}</div>
                                    <div className="text-[10pt] text-slate-800 font-medium mb-[6pt]">{edu.school}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="p-[0.5in] bg-transparent z-10">
                {personalInfo.summary && (
                    <section className="mb-[18pt] last:mb-0">
                        <h2 className="text-[13pt] tracking-wider uppercase mt-0 mb-[12pt] text-slate-900 font-semibold relative pb-[6pt] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[30px] after:h-[2px] after:bg-blue-500">ABOUT</h2>
                        <p className="text-[10.5pt] text-slate-600 my-[4pt] leading-relaxed">{personalInfo.summary}</p>
                    </section>
                )}

                {experience && experience.length > 0 && experience.some(exp => exp.role || exp.company) && (
                    <section className="mb-[18pt] last:mb-0">
                        <h2 className="text-[13pt] tracking-wider uppercase mt-[15pt] mb-[12pt] text-slate-900 font-semibold relative pb-[6pt] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[30px] after:h-[2px] after:bg-blue-500">EXPERIENCE</h2>
                        {experience.filter(exp => exp.role || exp.company).map((exp, i) => (
                            <div key={exp.id || i} className="mb-[18pt] last:mb-0">
                                <div className="flex justify-between items-baseline text-[11pt] mb-0.5">
                                    <strong className="font-semibold text-slate-900">{exp.role}</strong>
                                    <span className="text-[9pt] text-slate-400 font-medium">{exp.duration}</span>
                                </div>
                                <div className="text-[10pt] text-slate-800 font-medium mb-[6pt]">{exp.company}</div>
                                {renderDescription(exp.description)}
                            </div>
                        ))}
                    </section>
                )}

                {projects && projects.length > 0 && projects.some(proj => proj.title) && (
                    <section className="mb-[18pt] last:mb-0">
                        <h2 className="text-[13pt] tracking-wider uppercase mt-[15pt] mb-[12pt] text-slate-900 font-semibold relative pb-[6pt] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[30px] after:h-[2px] after:bg-blue-500">PROJECTS</h2>
                        {projects.filter(proj => proj.title).map((proj, i) => (
                            <div key={proj.id || i} className="mb-[18pt] last:mb-0">
                                <div className="flex justify-between items-baseline text-[11pt] mb-0.5">
                                    <strong className="font-semibold text-slate-900">{proj.title}</strong>
                                    {proj.link && (
                                        <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[9pt] text-blue-500 no-underline font-medium flex items-center">
                                            <ExternalLink size={12} className="mr-1" />
                                            View Project
                                        </a>
                                    )}
                                </div>
                                {renderDescription(proj.description)}
                            </div>
                        ))}
                    </section>
                )}

                {achievements && achievements.length > 0 && achievements.some(ach => ach.title) && (
                    <section className="mb-[18pt] last:mb-0">
                        <h2 className="text-[13pt] tracking-wider uppercase mt-[15pt] mb-[12pt] text-slate-900 font-semibold relative pb-[6pt] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[30px] after:h-[2px] after:bg-blue-500">ACHIEVEMENTS</h2>
                        {achievements.filter(ach => ach.title).map((ach, i) => (
                            <div key={ach.id || i} className="mb-[18pt] last:mb-0">
                                <div className="flex justify-between items-baseline text-[11pt] mb-0.5">
                                    <strong className="font-semibold text-slate-900">{ach.title}</strong>
                                </div>
                                {renderDescription(ach.description)}
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
};

export default MinimalistTemplate;
