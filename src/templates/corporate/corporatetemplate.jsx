import React from 'react';

const CorporateTemplate = ({ data }) => {
    const { personalInfo, skills, experience, education, projects, achievements } = data;

    return (
        <div className="p-[0.5in] text-[#111827] leading-normal min-h-full bg-transparent font-serif relative z-10">
            {(personalInfo.name || personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.links || personalInfo.photo) && (
                <header className="flex items-center border-b-2 border-[#111827] pb-[20pt] mb-[20pt] bg-transparent">
                    <div className="mr-[25pt]">
                        {personalInfo.photo && (
                            <div className="w-[90pt] h-[90pt] rounded-full overflow-hidden border-2 border-[#111827] flex justify-center items-center bg-white shadow-sm">
                                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-left mb-[8pt] text-[24pt] mt-0 font-extrabold text-[#111827] tracking-tight">{personalInfo.name}</h1>
                        <div className="flex justify-start gap-[15pt] text-[10.5pt] text-gray-700 mb-0 flex-wrap font-semibold">
                            {personalInfo.email && <span>{personalInfo.email}</span>}
                            {personalInfo.phone && <span>{personalInfo.phone}</span>}
                            {personalInfo.location && <span>{personalInfo.location}</span>}
                            {personalInfo.links && (
                                <a href={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 no-underline font-bold">
                                    {personalInfo.links}
                                </a>
                            )}
                        </div>
                    </div>
                </header>
            )}

            {personalInfo.summary && (
                <section className="mb-[16pt] last:mb-0">
                    <h2 className="border-b-0 uppercase tracking-widest text-[11pt] mt-[18pt] mb-[8pt] text-[#111827] font-extrabold pb-[4pt]">PROFESSIONAL SUMMARY</h2>
                    <p className="text-[10.5pt] text-justify my-[5pt] leading-relaxed text-gray-700">{personalInfo.summary}</p>
                </section>
            )}

            {skills && skills.length > 0 && (
                <section className="mb-[16pt] last:mb-0">
                    <h2 className="border-b-0 uppercase tracking-widest text-[11pt] mt-[18pt] mb-[8pt] text-[#111827] font-extrabold pb-[4pt]">SKILLS</h2>
                    <div className="flex flex-wrap gap-[10px] mt-[5pt]">
                        {skills.map((skill, i) => skill && <span key={i} className="bg-gray-100/70 px-[12px] py-[5px] rounded-md text-[10pt] font-semibold text-[#111827] border border-gray-300">{skill}</span>)}
                    </div>
                </section>
            )}

            {experience && experience.length > 0 && (
                <section className="mb-[16pt] last:mb-0">
                    <h2 className="border-b-0 uppercase tracking-widest text-[11pt] mt-[18pt] mb-[8pt] text-[#111827] font-extrabold pb-[4pt]">PROFESSIONAL EXPERIENCE</h2>
                    {experience.map((exp, i) => (
                        <div key={i} className="mb-[16pt] last:mb-0">
                            <div className="flex justify-between items-baseline text-[11pt] mb-[3pt]">
                                <strong className="font-extrabold text-[#111827]">{exp.role}</strong>
                                <span className="text-[10pt] text-gray-500 font-semibold">{exp.duration}</span>
                            </div>
                            <div className="text-[10.5pt] text-gray-600 mb-[4pt] font-bold">{exp.company}</div>
                            <p className="text-[10.5pt] text-justify my-[5pt] leading-relaxed text-gray-700">{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {projects && projects.length > 0 && (
                <section className="mb-[16pt] last:mb-0">
                    <h2 className="border-b-0 uppercase tracking-widest text-[11pt] mt-[18pt] mb-[8pt] text-[#111827] font-extrabold pb-[4pt]">PROJECTS</h2>
                    {projects.map((proj, i) => (
                        <div key={i} className="mb-[16pt] last:mb-0">
                            <div className="flex justify-between items-baseline text-[11pt] mb-[3pt]">
                                <strong className="font-extrabold text-[#111827]">{proj.title}</strong>
                                {proj.link && (
                                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[9.5pt] text-blue-600 ml-[12px] no-underline font-bold px-[6px] py-[2px] bg-blue-50 rounded">
                                        View Project
                                    </a>
                                )}
                            </div>
                            <p className="text-[10.5pt] text-justify my-[5pt] leading-relaxed text-gray-700">{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {education && education.length > 0 && (
                <section className="mb-[16pt] last:mb-0">
                    <h2 className="border-b-0 uppercase tracking-widest text-[11pt] mt-[18pt] mb-[8pt] text-[#111827] font-extrabold pb-[4pt]">EDUCATION</h2>
                    {education.map((edu, i) => (
                        <div key={i} className="mb-[16pt] last:mb-0">
                            <div className="flex justify-between items-baseline text-[11pt] mb-[3pt]">
                                <strong className="font-extrabold text-[#111827]">{edu.degree}</strong>
                                <span className="text-[10pt] text-gray-500 font-semibold">{edu.year}</span>
                            </div>
                            <div className="text-[10.5pt] text-gray-600 mb-[4pt] font-bold">{edu.school}</div>
                        </div>
                    ))}
                </section>
            )}

            {achievements && achievements.length > 0 && (
                <section className="mb-[16pt] last:mb-0">
                    <h2 className="border-b-0 uppercase tracking-widest text-[11pt] mt-[18pt] mb-[8pt] text-[#111827] font-extrabold pb-[4pt]">AWARDS & ACHIEVEMENTS</h2>
                    {achievements.map((ach, i) => (
                        <div key={i} className="mb-[16pt] last:mb-0">
                            <div className="flex justify-between items-baseline text-[11pt] mb-[3pt]">
                                <strong className="font-extrabold text-[#111827]">{ach.title}</strong>
                            </div>
                            <p className="text-[10.5pt] text-justify my-[5pt] leading-relaxed text-gray-700">{ach.description}</p>
                        </div>
                    ))}
                </section>
            )}


        </div>
    );
};

export default CorporateTemplate;
