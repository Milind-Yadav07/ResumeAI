import React from 'react';

const AnalystTemplate = ({ data }) => {
    const { personalInfo, skills, experience, education, projects, achievements } = data;

    return (
        <div className="relative p-0 text-[#1a1a1a] leading-normal min-h-full w-full grid grid-cols-[32%_1fr] bg-transparent font-serif items-stretch">
            <div className="bg-transparent text-white p-[0.5in_0.3in] self-stretch z-10 flex flex-col">
                <div className="flex flex-col">
                    {personalInfo.photo && (
                        <div className="flex justify-center mb-[20pt]">
                            <img src={personalInfo.photo} alt="Profile" className="w-[110px] h-[110px] rounded-full object-cover border-[3px] border-[#c9a84c] shadow-lg" />
                        </div>
                    )}
                    {personalInfo.name && <h1 className="text-[20pt] m-[0_0_20pt_0] font-bold text-center text-white tracking-wide">{personalInfo.name}</h1>}

                    {(personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.links) && (
                        <div className="mb-[22pt]">
                            <h3 className="text-[11pt] font-bold uppercase tracking-[1.5pt] text-[#c9a84c] mb-[10pt] pb-[5pt] border-b border-[#c9a84c]/50">Contact</h3>
                            {personalInfo.email && (
                                <div className="flex items-start gap-[8pt] text-[9.5pt] mb-1.5 text-slate-100 leading-tight">
                                    <span className="text-[#c9a84c] text-[10pt] shrink-0 w-[12pt] text-center">✉</span>
                                    <span>{personalInfo.email}</span>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-start gap-[8pt] text-[9.5pt] mb-1.5 text-slate-100 leading-tight">
                                    <span className="text-[#c9a84c] text-[10pt] shrink-0 w-[12pt] text-center">✆</span>
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}
                            {personalInfo.location && (
                                <div className="flex items-start gap-[8pt] text-[9.5pt] mb-1.5 text-slate-100 leading-tight">
                                    <span className="text-[#c9a84c] text-[10pt] shrink-0 w-[12pt] text-center">⌖</span>
                                    <span>{personalInfo.location}</span>
                                </div>
                            )}
                            {personalInfo.links && (
                                <div className="flex items-start gap-[8pt] text-[9.5pt] mb-1.5 text-slate-100 leading-tight">
                                    <span className="text-[#c9a84c] text-[10pt] shrink-0 w-[12pt] text-center">⌘</span>
                                    <a href={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} target="_blank" rel="noopener noreferrer" className="text-blue-300 break-all no-underline">
                                        {personalInfo.links}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {skills && skills.length > 0 && (
                        <div className="mb-[22pt]">
                            <h3 className="text-[11pt] font-bold uppercase tracking-[1.5pt] text-[#c9a84c] mb-[10pt] pb-[5pt] border-b border-[#c9a84c]/50">Skills</h3>
                            <div className="flex flex-col gap-1.5">
                                {skills.map((skill, i) => skill && (
                                    <div key={i} className="flex items-center gap-[7pt] text-[10pt] text-slate-100">
                                        <span className="w-[5pt] h-[5pt] rounded-full bg-[#c9a84c] shrink-0"></span>
                                        <span>{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {education && education.length > 0 && (
                        <div className="mb-[22pt]">
                            <h3 className="text-[11pt] font-bold uppercase tracking-[1.5pt] text-[#c9a84c] mb-[10pt] pb-[5pt] border-b border-[#c9a84c]/50">Education</h3>
                            {education.map((edu, i) => (
                                <div key={i} className="mb-[12pt]">
                                    <strong className="text-[10pt] text-white block mb-0.5">{edu.degree}</strong>
                                    <div className="text-[9.5pt] text-slate-300">{edu.school}</div>
                                    <div className="text-[9pt] text-[#c9a84c] mt-0.5">{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="p-[0.5in] bg-transparent z-10">
                {personalInfo.summary && (
                    <section className="mb-[20pt]">
                        <h2 className="text-[12pt] font-bold uppercase tracking-[1.2pt] text-[#1b2a4a] mb-[10pt] pb-[6pt] border-b-2 border-[#1b2a4a] flex items-center gap-[8pt]">
                            <span className="text-[#c9a84c] text-[11pt]">◈</span>
                            Professional Profile
                        </h2>
                        <p className="text-[10.5pt] text-justify my-[4pt] text-slate-700 leading-relaxed">{personalInfo.summary}</p>
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section className="mb-[20pt]">
                        <h2 className="text-[12pt] font-bold uppercase tracking-[1.2pt] text-[#1b2a4a] mb-[10pt] pb-[6pt] border-b-2 border-[#1b2a4a] flex items-center gap-[8pt]">
                            <span className="text-[#c9a84c] text-[11pt]">◈</span>
                            Professional Experience
                        </h2>
                        {experience.map((exp, i) => (
                            <div key={i} className="mb-[14pt]">
                                <div className="flex justify-between items-baseline text-[11pt] mb-[3pt]">
                                    <strong className="text-[#1b2a4a]">{exp.role}</strong>
                                    <span className="text-[9.5pt] text-slate-500 shrink-0 ml-[10pt]">{exp.duration}</span>
                                </div>
                                <div className="text-[10pt] text-[#c9a84c] mb-1 font-semibold">{exp.company}</div>
                                <p className="text-[10.5pt] text-justify my-[4pt] text-slate-700 leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {projects && projects.length > 0 && (
                    <section className="mb-[20pt]">
                        <h2 className="text-[12pt] font-bold uppercase tracking-[1.2pt] text-[#1b2a4a] mb-[10pt] pb-[6pt] border-b-2 border-[#1b2a4a] flex items-center gap-[8pt]">
                            <span className="text-[#c9a84c] text-[11pt]">◈</span>
                            Projects & Analysis
                        </h2>
                        {projects.map((proj, i) => (
                            <div key={i} className="mb-[14pt]">
                                <div className="flex justify-between items-baseline text-[11pt] mb-[3pt]">
                                    <strong className="text-[#1b2a4a]">{proj.title}</strong>
                                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[9pt] text-blue-600 font-normal no-underline border-b border-blue-600/30">
                                        View Project
                                    </a>
                                </div>
                                <p className="text-[10.5pt] text-justify my-[4pt] text-slate-700 leading-relaxed">{proj.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {achievements && achievements.length > 0 && (
                    <section className="mb-[20pt]">
                        <h2 className="text-[12pt] font-bold uppercase tracking-[1.2pt] text-[#1b2a4a] mb-[10pt] pb-[6pt] border-b-2 border-[#1b2a4a] flex items-center gap-[8pt]">
                            <span className="text-[#c9a84c] text-[11pt]">◈</span>
                            Awards & Certifications
                        </h2>
                        {achievements.map((ach, i) => (
                            <div key={i} className="mb-[14pt]">
                                <strong className="text-[#1b2a4a]">{ach.title}</strong>
                                <p className="text-[10.5pt] text-justify my-[4pt] text-slate-700 leading-relaxed">{ach.description}</p>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
};

export default AnalystTemplate;
