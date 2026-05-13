import React from 'react';

const ShowcaseTemplate = ({ data }) => {
    const { personalInfo, skills, experience, education, projects, achievements } = data;

    return (
        <div className="w-[189mm] p-[10pt] text-black leading-normal bg-transparent relative z-10 box-border font-serif">
            <header className="text-center p-[10pt_0_20pt_0] mb-[45pt] bg-transparent mt-0 ml-0 mr-0 rounded-0 min-h-[100pt] flex flex-col justify-center box-border overflow-hidden">
                <h1 className="text-[35pt] mt-[-15pt] mb-[18pt] font-extrabold text-black tracking-wider">{personalInfo.name}</h1>
                <div className="flex justify-center gap-[15pt] text-[12pt] text-black mb-[5pt] flex-wrap font-semibold">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.links && (
                        <a href={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} target="_blank" rel="noopener noreferrer" className="text-[12pt] text-blue-600 font-semibold no-underline hover:underline">
                            {personalInfo.links}
                        </a>
                    )}
                </div>
            </header>

            {personalInfo.summary && (
                <section className="mb-[20pt] last:mb-0">
                    <h2 className="text-[14pt] m-[10pt_0_10pt_0] text-black font-extrabold border-b-[0.75pt] border-[#a1811a] pb-[4pt] uppercase tracking-wide">Professional Summary</h2>
                    <p className="pl-[20pt] text-[10.5pt] text-justify my-[5pt] leading-relaxed text-black">{personalInfo.summary}</p>
                </section>
            )}

            {skills && skills.length > 0 && (
                <section className="mb-[20pt] last:mb-0">
                    <h2 className="text-[14pt] m-[10pt_0_10pt_0] text-black font-extrabold border-b-[0.75pt] border-[#a1811a] pb-[4pt] uppercase tracking-wide">Skills</h2>
                    <div className="pl-[20pt] flex flex-wrap gap-[12px] mt-[10px]">
                        {skills.map((skill, i) => skill && <span key={i} className="bg-white/70 border-[1.5px] border-violet-300 text-black px-[15px] py-[5px] rounded-[20px] text-[10pt] font-bold shadow-[0_2px_4px_rgba(196,181,253,0.2)]">{skill}</span>)}
                    </div>
                </section>
            )}

            {experience && experience.length > 0 && (
                <section className="mb-[20pt] last:mb-0">
                    <h2 className="text-[14pt] m-[10pt_0_10pt_0] text-black font-extrabold border-b-[0.75pt] border-[#a1811a] pb-[4pt] uppercase tracking-wide">Experience</h2>
                    {experience.map((exp, i) => (
                        <div key={i} className="mb-[18pt] pl-[20pt] last:mb-0">
                            <div className="flex justify-between items-baseline text-[11.5pt] font-extrabold text-black mb-[3pt]">
                                <span>{exp.role}</span>
                                <span className="text-[10pt] text-black font-semibold">{exp.duration}</span>
                            </div>
                            <div className="text-[10.5pt] text-black mb-[5pt] font-semibold italic">{exp.company}</div>
                            <p className="text-[10.5pt] text-justify my-[5pt] leading-relaxed text-black">{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {projects && projects.length > 0 && (
                <section className="mb-[20pt] last:mb-0">
                    <h2 className="text-[14pt] m-[10pt_0_10pt_0] text-black font-extrabold border-b-[0.75pt] border-[#a1811a] pb-[4pt] uppercase tracking-wide">Projects</h2>
                    {projects.map((proj, i) => (
                        <div key={i} className="mb-[18pt] pl-[20pt] last:mb-0">
                            <div className="flex justify-between items-baseline text-[11.5pt] font-extrabold text-black mb-[3pt]">
                                <span className="text-black font-extrabold">{proj.title}</span>
                                {proj.link && (
                                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[9.5pt] text-blue-600 font-bold no-underline hover:underline">
                                        View Project
                                    </a>
                                )}
                            </div>
                            <p className="text-[10.5pt] text-justify my-[5pt] leading-relaxed text-black">{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {education && education.length > 0 && (
                <section className="mb-[20pt] last:mb-0">
                    <h2 className="text-[14pt] m-[10pt_0_10pt_0] text-black font-extrabold border-b-[0.75pt] border-[#a1811a] pb-[4pt] uppercase tracking-wide">Educational Background</h2>
                    {education.map((edu, i) => (
                        <div key={i} className="mb-[18pt] pl-[20pt] last:mb-0">
                            <div className="flex justify-between items-baseline text-[11.5pt] font-extrabold text-black mb-[3pt]">
                                <span>{edu.degree}</span>
                                <span className="text-[10pt] text-black font-semibold">{edu.year}</span>
                            </div>
                            <div className="text-[10.5pt] text-black mb-[5pt] font-semibold italic">{edu.school}</div>
                        </div>
                    ))}
                </section>
            )}

            {achievements && achievements.length > 0 && (
                <section className="mb-[20pt] last:mb-0">
                    <h2 className="text-[14pt] m-[10pt_0_10pt_0] text-black font-extrabold border-b-[0.75pt] border-[#a1811a] pb-[4pt] uppercase tracking-wide">Notable Achievements</h2>
                    {achievements.map((ach, i) => (
                        <div key={i} className="mb-[18pt] pl-[20pt] last:mb-0">
                            <div className="flex justify-between items-baseline text-[11.5pt] font-extrabold text-black mb-[3pt]">
                                <span>{ach.title}</span>
                            </div>
                            <p className="text-[10.5pt] text-justify my-[5pt] leading-relaxed text-black">{ach.description}</p>
                        </div>
                    ))}
                </section>
            )}


        </div>
    );
};

export default ShowcaseTemplate;
